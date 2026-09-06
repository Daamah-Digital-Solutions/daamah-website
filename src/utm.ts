/**
 * مصدر الزيارة — يُلتقط مرّة ويبقى إلى نهاية الجلسة.
 *
 * النموذج يسلّم على واتساب لا على خادم، فلا يوجد مكان تُخزَّن فيه
 * البيانات ويُربط فيها الطلب بحملته لاحقًا. الحل أن يُكتب المصدر
 * في الرسالة نفسها: تصل مع الطلب، فيعرف صاحب العمل أي حملة جلبت
 * هذا العميل بلا لوحة ولا تقرير.
 *
 * ويُلتقط أول مرّة فقط: الزائر قد يجول في الموقع ثم يعود من رابط
 * مباشر، فلو أُخذ آخر مصدر لنُسب الطلب إلى «مباشر» ونُسيت الحملة
 * التي دفعنا مقابلها فعلًا.
 */

const KEY = "daamah:utm";

export type Touch = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  /** معرّف نقرة Google Ads — يصل حتى لو غابت وسوم utm */
  gclid?: string;
  /** أول صفحة دخل منها */
  landing?: string;
  /** من أين جاء، حين لا توجد وسوم */
  referrer?: string;
};

const read = (): Touch | null => {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Touch) : null;
  } catch {
    return null;
  }
};

/** يلتقط مصدر الجلسة إن لم يكن ملتقطًا. يُستدعى مرّة عند الإقلاع. */
export function captureUtm() {
  if (typeof window === "undefined") return;
  if (read()) return;

  const p = new URLSearchParams(window.location.search);
  const touch: Touch = {
    source: p.get("utm_source") ?? undefined,
    medium: p.get("utm_medium") ?? undefined,
    campaign: p.get("utm_campaign") ?? undefined,
    term: p.get("utm_term") ?? undefined,
    content: p.get("utm_content") ?? undefined,
    gclid: p.get("gclid") ?? undefined,
    landing: window.location.pathname,
  };

  const tagged = Object.values(touch).some((v, i) => i < 6 && v);
  if (!tagged) {
    // زيارة بلا وسوم: المُحيل هو كل ما نعرفه، وهو أفضل من لا شيء
    const ref = document.referrer;
    if (ref && !ref.startsWith(window.location.origin)) {
      try {
        touch.referrer = new URL(ref).hostname;
      } catch {
        /* مُحيل غير صالح — يُتجاهل */
      }
    }
  }

  try {
    sessionStorage.setItem(KEY, JSON.stringify(touch));
  } catch {
    /* تصفّح خاص — القياس يعمل، والنسبة وحدها تُفقد */
  }
}

/** المصدر الملتقط، إن وُجد. */
export const utm = (): Touch => read() ?? {};

/**
 * سطر المصدر كما يظهر في رسالة الواتساب.
 * يعود فارغًا حين لا يوجد ما يُقال — لا نُثقل الرسالة بلا فائدة.
 */
export function sourceLine(): string {
  const t = utm();
  const parts = [t.campaign, t.source, t.medium].filter(Boolean);
  if (t.gclid && !parts.length) parts.push("google-ads");
  if (!parts.length && t.referrer) parts.push(t.referrer);
  return parts.join(" · ");
}

/** المصدر كوسوم حدث — يُرفق بحدث `lead`. */
export function utmParams(): Record<string, string> {
  const t = utm();
  const out: Record<string, string> = {};
  if (t.source) out.utm_source = t.source;
  if (t.medium) out.utm_medium = t.medium;
  if (t.campaign) out.utm_campaign = t.campaign;
  if (t.gclid) out.gclid = t.gclid;
  return out;
}
