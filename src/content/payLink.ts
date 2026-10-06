import type { Bi } from "../i18n";

/**
 * روابط الدفع بأي مبلغ — أداة داخلية وصفحة شكرها.
 *
 * `/pay-link` لصاحب الحساب وحده: يكتب المبلغ والعملة فيخرج رابط دفع
 * يرسله لعميله. محميّة بكلمة سرّ يتحقّق منها الخادم (`/api/link`).
 *
 * اللغة تتبع العملة: الريال والدرهم صفحة دفع وشكر بالعربية، والدولار
 * بالإنجليزية — فلصفحة الشكر مسار تحت `/en` أيضًا.
 */
export const payLinkPath = "/pay-link";
export const payThanksPath = "/pay/thank-you";

export type PayCurrency = "SAR" | "AED" | "USD";

export const payCurrencies: { code: PayCurrency; label: string; lang: "ar" | "en" }[] = [
  { code: "SAR", label: "ريال سعودي", lang: "ar" },
  { code: "AED", label: "درهم إماراتي", lang: "ar" },
  { code: "USD", label: "دولار أمريكي", lang: "en" },
];

/** اسم العملة كما يُقرأ في صفحة الشكر */
export const currencyName: Record<string, Bi> = {
  SAR: { ar: "ريال سعودي", en: "SAR" },
  AED: { ar: "درهم إماراتي", en: "AED" },
  USD: { ar: "دولار أمريكي", en: "USD" },
};

/* الأداة — عربية فقط: يستخدمها صاحب الحساب */
export const payLink = {
  meta: {
    title: "رابط دفع — دَعمة",
    description: "أداة داخلية لإصدار روابط الدفع.",
  },
  title: "رابط دفع جديد",
  sub: "اكتب المبلغ واختر العملة، وأرسل الرابط لعميلك.",
  password: "كلمة السرّ",
  amount: "المبلغ",
  currency: "العملة",
  note: "وصف يظهر للعميل (اختياري)",
  noteHint: "بالإنجليزية والأرقام فقط، حتى 40 حرفًا — مثل: Invoice 104 أو اسم الشركة. Ziina لا يعرض العربية.",
  langAr: "صفحة الدفع والشكر بالعربية.",
  langEn: "صفحة الدفع والشكر بالإنجليزية.",
  submit: "أنشئ الرابط",
  sending: "جاري الإنشاء…",
  ready: "الرابط جاهز",
  copy: "نسخ الرابط",
  copied: "تم النسخ ✓",
  share: "أرسله على واتساب",
  open: "افتح صفحة الدفع",
  again: "رابط جديد",
  test: "وضع التجربة: هذا الرابط لا يخصم مبلغًا حقيقيًا.",
  errors: {
    unauthorized: "كلمة السرّ غير صحيحة.",
    invalid: "المبلغ غير صالح. الحدّ الأدنى 5 والأقصى 500,000.",
    not_configured: "الأداة غير مفعّلة بعد: كلمة السرّ أو مفتاح Ziina غير مضبوط في Vercel.",
    provider: "رفض Ziina الطلب. حاول مرة أخرى، أو غيّر الوصف.",
    network: "تعذّر الاتصال. تحقّق من الإنترنت وحاول مرة أخرى.",
  } as Record<string, string>,
  /** نصّ الرسالة التي تُرسل مع الرابط */
  shareText: {
    ar: (amount: string, currency: string, url: string) => `رابط الدفع — ${amount} ${currency}:\n${url}`,
    en: (amount: string, currency: string, url: string) => `Payment link — ${currency} ${amount}:\n${url}`,
  },
};

/* صفحة الشكر — باللغتين */
export const payThanks = {
  meta: {
    title: { ar: "تم استلام دفعتك — دَعمة", en: "Payment received — Daamah" } as Bi,
    description: {
      ar: "شكرًا لك. وصلتنا دفعتك وسنتواصل معك.",
      en: "Thank you. We've received your payment and will be in touch.",
    } as Bi,
  },
  done: {
    title: { ar: "تم استلام دفعتك ✅", en: "Payment received ✅" } as Bi,
    sub: { ar: "شكرًا لثقتك في دَعمة.", en: "Thank you for choosing Daamah." } as Bi,
    text: {
      ar: "وصلتنا دفعتك وسنتواصل معك لمتابعة العمل. لأي استفسار راسلنا على واتساب.",
      en: "We've received your payment and will be in touch to continue the work. For anything else, message us on WhatsApp.",
    } as Bi,
  },
  pending: {
    title: { ar: "جاري تأكيد الدفع…", en: "Confirming your payment…" } as Bi,
    text: {
      ar: "قد يستغرق التأكيد لحظات. إن لم تتحدّث الصفحة، راسلنا على واتساب ونتأكّد لك.",
      en: "This can take a moment. If the page doesn't update, message us on WhatsApp and we'll check for you.",
    } as Bi,
  },
  unknown: {
    title: { ar: "لم نتمكّن من تأكيد الدفع بعد", en: "We couldn’t confirm the payment yet" } as Bi,
    text: {
      ar: "إن كنت قد دفعت فلا تقلق — راسلنا على واتساب ونتأكّد لك خلال دقائق.",
      en: "If you’ve paid, don’t worry — message us on WhatsApp and we’ll confirm within minutes.",
    } as Bi,
  },
  cancelled: {
    title: { ar: "لم يتمّ الدفع", en: "Payment not completed" } as Bi,
    text: {
      ar: "لم يُخصم أي مبلغ. يمكنك المحاولة مرة أخرى من الرابط نفسه، أو مراسلتنا على واتساب.",
      en: "Nothing was charged. You can try again from the same link, or message us on WhatsApp.",
    } as Bi,
    retry: { ar: "حاول مرة أخرى", en: "Try again" } as Bi,
  },
  amountLabel: { ar: "المبلغ", en: "Amount" } as Bi,
  refLabel: { ar: "رقم العملية", en: "Reference" } as Bi,
  cta: { ar: "راسلنا على واتساب", en: "Message us on WhatsApp" } as Bi,
  wa: {
    paid: {
      ar: (amount: string, ref: string) => `السلام عليكم، تمّ الدفع: ${amount} — رقم العملية: ${ref}`,
      en: (amount: string, ref: string) => `Hello, I've completed the payment: ${amount} — reference: ${ref}`,
    },
    help: {
      ar: "السلام عليكم، أحتاج مساعدة في إتمام الدفع.",
      en: "Hello, I need help completing a payment.",
    } as Bi,
  },
};
