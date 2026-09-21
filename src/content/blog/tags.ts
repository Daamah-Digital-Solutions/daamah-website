import type { Bi } from "../../i18n";

/**
 * تسميات الوسوم — المقال يحمل المفتاح، والعرض يأخذ اسمه من هنا.
 *
 * الوسم الذي لا تسمية له يُعرض بمفتاحه، فلا ينكسر شيء إن نُسي —
 * لكن صفحة الوسم تبقى موجودة، ولهذا يُفضَّل ألّا يُنسى.
 */
export const tagLabels: Record<string, Bi> = {
  seo: { ar: "تحسين محركات البحث", en: "SEO" },
  branding: { ar: "الهوية البصرية", en: "Branding" },
  web: { ar: "المواقع", en: "Websites" },
  ecommerce: { ar: "التجارة الإلكترونية", en: "E-commerce" },
  marketing: { ar: "التسويق الرقمي", en: "Digital marketing" },
  saudi: { ar: "السوق السعودي", en: "Saudi market" },
  pricing: { ar: "التكلفة", en: "Pricing" },
  ai: { ar: "الذكاء الاصطناعي", en: "AI" },
  profile: { ar: "الملف التعريفي", en: "Company profile" },
  crm: { ar: "إدارة علاقات العملاء", en: "CRM" },
  ads: { ar: "الإعلانات الممولة", en: "Paid ads" },
};

export const tagLabel = (tag: string): Bi =>
  tagLabels[tag] ?? { ar: tag, en: tag };
