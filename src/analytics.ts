/**
 * طبقة القياس — Google Analytics 4 و Google Ads و Meta Pixel.
 *
 * مبدآن يحكمان هذا الملف:
 *
 * الأول: لا شيء يُحمَّل بلا مُعرِّف. المتغيّرات تُضبط في بيئة النشر
 * وحدها، فلا يرسل التطوير المحلي حدثًا واحدًا إلى تقارير الإنتاج.
 *
 * الثاني: من طلب ألّا يُتتبَّع لا يُتتبَّع. نحترم `Do Not Track`
 * و`Global Privacy Control` قبل أن نحقن سطرًا واحدًا — لا بعده.
 *
 * وبقيّة الموقع لا تعرف شيئًا عن جوجل أو ميتا: تنادي `track()`
 * باسم حدث، وهذا الملف يترجمه إلى ما تفهمه كل منصّة.
 */

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: Window["fbq"];
  }
}

const GA_ID = import.meta.env.VITE_GA_ID;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
/** حساب Google Ads (`AW-…`) — منه تُرسل التحويلات إلى الإعلانات */
const ADS_ID = import.meta.env.VITE_GADS_ID;

/**
 * تسمية كل تحويل في Google Ads — من «الإجراءات التحويلية» في الحساب.
 * الحدث الذي بلا تسمية يصل إلى GA4 وحده.
 */
const ADS_LABEL: Partial<Record<EventName, string | undefined>> = {
  purchase: import.meta.env.VITE_GADS_PURCHASE_LABEL,
  whatsapp_click: import.meta.env.VITE_GADS_WHATSAPP_LABEL,
  pdf_download: import.meta.env.VITE_GADS_PDF_LABEL,
};

/** هل عبّر الزائر عن رفضه للتتبّع؟ */
function optedOut(): boolean {
  const nav = navigator as Navigator & {
    globalPrivacyControl?: boolean;
    msDoNotTrack?: string;
  };
  return (
    nav.globalPrivacyControl === true ||
    nav.doNotTrack === "1" ||
    nav.msDoNotTrack === "1" ||
    (window as Window & { doNotTrack?: string }).doNotTrack === "1"
  );
}

/** يحقن وسمًا برمجيًا خارجيًا مرّة واحدة. */
function script(src: string) {
  const el = document.createElement("script");
  el.async = true;
  el.src = src;
  document.head.appendChild(el);
}

let ready = false;

/**
 * يُحمِّل ما هو مضبوط منهما. يُنادى مرّة عند الإقلاع.
 *
 * `send_page_view: false` مقصود: في تطبيق ذي راوتر داخلي لا يُعاد
 * تحميل الصفحة، فلو تركنا جوجل ترسل المشاهدة تلقائيًا لسجّلت الزيارة
 * الأولى فقط وبقي بقيّة تصفّح الزائر غير مرئي.
 */
export function initAnalytics() {
  if (ready || optedOut()) return;
  ready = true;

  /* وسم جوجل واحد للاثنين: يُحمَّل مرّة، ولكلّ حساب `config` */
  if (GA_ID || ADS_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag تعتمد على `arguments` نفسها — لا تقبل مصفوفة
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    if (GA_ID) window.gtag("config", GA_ID, { send_page_view: false });
    if (ADS_ID) window.gtag("config", ADS_ID);
    script(`https://www.googletagmanager.com/gtag/js?id=${GA_ID ?? ADS_ID}`);
  }

  if (PIXEL_ID) {
    if (!window.fbq) {
      // الطابور يُستهلك لاحقًا من fbevents.js حين يصل
      const queue: unknown[] = [];
      const stub = Object.assign(
        (...args: unknown[]) => {
          const self = window.fbq!;
          if (self.callMethod) self.callMethod(...args);
          else queue.push(args);
        },
        { queue, loaded: true, version: "2.0" },
      );
      window.fbq = stub;
      window._fbq = stub;
    }
    window.fbq("init", PIXEL_ID);
    script("https://connect.facebook.net/en_US/fbevents.js");
  }
}

/** مشاهدة صفحة — تُرسل عند كل تغيّر مسار. */
export function pageView(path: string, title: string) {
  if (!ready) return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
  window.fbq?.("track", "PageView");
}

/**
 * أحداث الموقع — أسماؤها من لغة العمل لا من لغة المنصّات.
 *
 * `lead` هو الحدث الوحيد الذي يعنينا فعلًا: زائر أرسل طلب عرض سعر.
 * والبقيّة إشارات نيّة تسبقه، تفيد في معرفة أين يتوقّف الناس.
 */
export type EventName =
  | "lead"
  | "quote_form_open"
  | "whatsapp_click"
  | "email_click"
  /** نداء إجراء نُقر عليه — يحمل موضعه وخدمته ومدينته */
  | "cta_click"
  /** بلغ القارئ نصف المقال — أدقّ من «زيارة» في قياس المحتوى */
  | "blog_read"
  | "lang_switch"
  /** ضغط «احجز الآن» متّجهًا إلى صفحة الدفع */
  | "begin_checkout"
  /** دفعٌ تمّ — يُرسل من صفحة الشكر مرّة لكل عملية */
  | "purchase"
  | "pdf_download";

/** الحدث المقابل في Meta — ما لا مقابل له يُرسل كحدث مخصّص. */
const META_STANDARD: Partial<Record<EventName, string>> = {
  lead: "Lead",
  quote_form_open: "InitiateCheckout",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
};

export function track(name: EventName, params: Params = {}) {
  if (!ready) return;
  if (GA_ID) window.gtag?.("event", name, params);

  const label = ADS_LABEL[name];
  if (ADS_ID && label) {
    const { value, currency, transaction_id } = params;
    window.gtag?.("event", "conversion", {
      send_to: `${ADS_ID}/${label}`,
      ...(value !== undefined && { value, currency }),
      ...(transaction_id !== undefined && { transaction_id }),
    });
  }

  const standard = META_STANDARD[name];
  if (standard) window.fbq?.("track", standard, params);
  else window.fbq?.("trackCustom", name, params);
}
