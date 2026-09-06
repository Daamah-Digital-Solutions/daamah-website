import type { Bi } from "../i18n";

/**
 * نصوص نموذج طلب عرض السعر — ثنائية اللغة كبقيّة المحتوى.
 * لا نصّ ثابت داخل المكوّن، ولا رسالة خطأ مكتوبة في الكود.
 */

export const form = {
  label: { ar: "اطلب عرض سعر", en: "Request a quote" } as Bi,
  title: {
    ar: ["احكِ لنا عن مشروعك", "في دقيقة."],
    en: ["Tell us about the project", "in a minute."],
  } as Bi<string[]>,
  intro: {
    ar: "املأ ما تعرفه الآن — الباقي نسأل عنه في المكالمة. الرسالة تصلنا على واتساب مباشرةً، ونرجع لك خلال يوم عمل.",
    en: "Fill in what you know now — we'll ask about the rest on a call. It reaches us on WhatsApp directly, and we reply within one business day.",
  } as Bi,

  fields: {
    name: {
      label: { ar: "الاسم", en: "Name" } as Bi,
      placeholder: { ar: "اسمك الكامل", en: "Your full name" } as Bi,
    },
    company: {
      label: { ar: "الشركة", en: "Company" } as Bi,
      optional: true,
      placeholder: { ar: "اسم الشركة أو النشاط", en: "Company or venture" } as Bi,
    },
    phone: {
      label: { ar: "رقم التواصل", en: "Contact number" } as Bi,
      placeholder: { ar: "+966 5X XXX XXXX", en: "+966 5X XXX XXXX" } as Bi,
    },
    interest: {
      label: { ar: "ما الذي تحتاجه؟", en: "What do you need?" } as Bi,
      placeholder: { ar: "اختر…", en: "Choose…" } as Bi,
      /* مجموعتان في القائمة: باقة جاهزة أو خدمة مفردة */
      packagesGroup: { ar: "الباقات", en: "Packages" } as Bi,
      servicesGroup: { ar: "الخدمات", en: "Services" } as Bi,
      other: { ar: "شيء آخر", en: "Something else" } as Bi,
    },
    budget: {
      label: { ar: "الميزانية التقريبية", en: "Approximate budget" } as Bi,
      optional: true,
      /* النبرة في الموقع أن السعر يأتي بعد الفهم — فالحقل اختياري
         وفيه دائمًا مخرج لمن لا يريد ذكر رقم. */
      options: [
        { key: "unsure", label: { ar: "أفضّل المناقشة", en: "Rather discuss it" } as Bi },
        { key: "lt3k", label: { ar: "أقل من 3,000$", en: "Under $3,000" } as Bi },
        { key: "3-8k", label: { ar: "3,000$ – 8,000$", en: "$3,000 – $8,000" } as Bi },
        { key: "8-20k", label: { ar: "8,000$ – 20,000$", en: "$8,000 – $20,000" } as Bi },
        { key: "gt20k", label: { ar: "أكثر من 20,000$", en: "Over $20,000" } as Bi },
      ],
    },
    message: {
      label: { ar: "تفاصيل المشروع", en: "Project details" } as Bi,
      placeholder: {
        ar: "ما طبيعة نشاطك؟ وما الذي تريد الوصول إليه؟",
        en: "What does your business do, and where do you want it to get?",
      } as Bi,
    },
  },

  submit: { ar: "أرسِل على واتساب", en: "Send on WhatsApp" } as Bi,
  submitting: { ar: "جارٍ الفتح…", en: "Opening…" } as Bi,

  /* يُعرض بعد فتح واتساب — النافذة قد تُحجب فنترك رابطًا بديلًا */
  sent: {
    title: { ar: "فتحنا لك واتساب.", en: "WhatsApp is open." } as Bi,
    body: {
      ar: "راجع الرسالة واضغط إرسال. لو لم تُفتح النافذة، افتحها من الرابط التالي.",
      en: "Review the message and hit send. If the window didn't open, use the link below.",
    } as Bi,
    retry: { ar: "افتح واتساب", en: "Open WhatsApp" } as Bi,
    again: { ar: "أرسِل طلبًا آخر", en: "Send another" } as Bi,
  },

  errors: {
    name: { ar: "اكتب اسمك من فضلك.", en: "Please enter your name." } as Bi,
    phone: {
      ar: "اكتب رقمًا يمكننا التواصل عليه.",
      en: "Enter a number we can reach you on.",
    } as Bi,
    message: {
      ar: "اكتب سطرين عن مشروعك على الأقل.",
      en: "Tell us a couple of lines about the project.",
    } as Bi,
  },

  /* ترويسة الرسالة التي تصل على واتساب */
  wa: {
    heading: { ar: "طلب عرض سعر", en: "Quote request" } as Bi,
    name: { ar: "الاسم", en: "Name" } as Bi,
    company: { ar: "الشركة", en: "Company" } as Bi,
    phone: { ar: "الهاتف", en: "Phone" } as Bi,
    interest: { ar: "المطلوب", en: "Needs" } as Bi,
    budget: { ar: "الميزانية", en: "Budget" } as Bi,
    message: { ar: "التفاصيل", en: "Details" } as Bi,
    city: { ar: "المدينة", en: "City" } as Bi,
    source: { ar: "المصدر", en: "Source" } as Bi,
    campaign: { ar: "الحملة", en: "Campaign" } as Bi,
  },

  optionalTag: { ar: "اختياري", en: "optional" } as Bi,
} as const;
