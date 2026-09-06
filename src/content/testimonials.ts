import type { Bi } from "../i18n";
import type { MarketKey } from "./work";

/**
 * آراء العملاء.
 *
 * **لا يُكتب هنا إلا ما قاله عميل فعلًا.** الرأي المؤلَّف يُكتشف —
 * لا بأداة بل بالنبرة: كلّها تمدح نفس الشيء بنفس الإيقاع. وحين
 * يُكتشف يخسر الموقع ما بناه كلّه لا هذه الفقرة وحدها.
 *
 * ولهذا لا يُعلَن أيٌّ منها في البيانات المنظّمة كـ `Review`:
 * التقييم الذي يكتبه صاحب الموقع عن نفسه مخالف صريح لإرشادات
 * جوجل، والتقييم الحقيقي مكانه خرائط جوجل حيث يكتبه صاحبه بنفسه.
 *
 * القائمة فارغة عمدًا حتى تصل الآراء الحقيقية. القسم لا يظهر ما
 * دامت فارغة — لا مكان خاليًا ولا نصّ مؤقّت.
 */

export type Testimonial = {
  quote: Bi;
  /** الاسم كما يقبل صاحبه نشره */
  name: string;
  role: Bi;
  company: Bi;
  market: MarketKey;
  /** الخدمة التي يتحدّث عنها — منها يُرشَّح على صفحة الخدمة */
  service?: string;
  /** مفتاح العمل في `work.ts` إن كان مرتبطًا بمشروع بعينه */
  work?: string;
};

export const testimonials: Testimonial[] = [
  /* مثال على الشكل المطلوب — احذف هذا التعليق وأضف الآراء الحقيقية:
  {
    quote: {
      ar: "…نصّ ما قاله العميل حرفيًا…",
      en: "…the same, in English…",
    },
    name: "…",
    role: { ar: "المدير التنفيذي", en: "CEO" },
    company: { ar: "…", en: "…" },
    market: "sa",
    service: "web-development",
  },
  */
];

/** آراء سوق بعينه. */
export const testimonialsIn = (market: MarketKey) =>
  testimonials.filter((t) => t.market === market);

/** آراء خدمة بعينها، مع تفضيل سوقٍ إن طُلب. */
export function testimonialsFor(service?: string, market?: MarketKey): Testimonial[] {
  let list = testimonials;
  if (service) list = list.filter((t) => t.service === service);
  if (market) {
    const local = list.filter((t) => t.market === market);
    if (local.length) return local;
  }
  return list;
}
