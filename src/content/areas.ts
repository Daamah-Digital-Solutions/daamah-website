import type { Bi } from "../i18n";

/**
 * العوامل الثلاثة — سردية دَعمة الأساسية.
 *
 * قائمة الخدمات المسطّحة تقرأ «وكالة تعمل أي شيء». وتقسيمها إلى ثلاث
 * مجموعات وحده لا يكفي: يبقى تصنيفًا لا موقفًا.
 *
 * ما يجعله موقفًا هو الادّعاء السببي بينها: العوامل تتضاعف ولا تُجمع.
 * إعلانات تصبّ في موقع ضعيف إنفاقٌ مهدور، وحضور ممتاز بلا وصول لا يراه
 * أحد، ووصول ممتاز بلا نظام فرصٌ تدخل وتضيع. عاملٌ واحد بصفر يُصفّر
 * الناتج مهما كان الباقي.
 *
 * ومن هنا يأتي سبب اتّساع الخدمات: لا لأننا نبيع كل شيء، بل لأن إصلاح
 * عاملٍ واحد وحده لا يغيّر النتيجة.
 *
 * هذا الملف يحمل السردية والانتماء فقط؛ الخدمات نفسها تبقى في
 * `home.ts`، وربطها هنا بالمفتاح لا بالنسخ.
 */

export type AreaKey = "appear" | "reach" | "operate";

export const areas = {
  label: { ar: "كيف نعمل معك", en: "How we work with you" } as Bi,

  title: {
    ar: ["شركتك لا تحتاج خدماتٍ أكثر،", "بل أجزاءً تعمل معًا."],
    en: ["Your company doesn't need more services,", "it needs parts that work together."],
  } as Bi<string[]>,

  intro: {
    ar: "نبني ما يجعل شركتك تظهر، وتصل، وتعمل بشكل أفضل: حضور يليق بها، ووصول إلى العملاء المناسبين، وتنظيم للعمل والنمو داخلها.",
    en: "We build what makes your company appear, reach, and run better: a presence worthy of it, access to the right clients, and order in how the work and the growth are run.",
  } as Bi,

  /** السؤال الذي يفتح قائمة الخدمات — يستبدل عنوان «خدماتنا» المسطّح */
  question: {
    ar: "ما الذي تحتاجه شركتك الآن؟",
    en: "What does your company need right now?",
  } as Bi,

  items: [
    {
      key: "appear" as AreaKey,
      no: "01",
      name: { ar: "الظهور وبناء الثقة", en: "Appearing, and earning trust" } as Bi,
      /** جملة الوعد — تُقرأ وحدها في السردية */
      promise: { ar: "حضور احترافي يبني الثقة.", en: "A professional presence that earns trust." } as Bi,
      desc: {
        ar: "قبل أن يسمع العميل عرضكم، يكون قد حكم على شكلكم. هنا نبني ما يُرى أولًا.",
        en: "Before a client hears your offer, they have judged how you look. This is where we build what is seen first.",
      } as Bi,
      services: ["branding", "company-profile", "web-development"],
    },
    {
      key: "reach" as AreaKey,
      no: "02",
      name: { ar: "الوصول وخلق الفرص", en: "Reaching, and creating demand" } as Bi,
      promise: { ar: "وصول مستمر يخلق فرصًا.", en: "Steady reach that creates opportunities." } as Bi,
      desc: {
        ar: "الحضور الجيّد لا يكفي إن لم يره أحد. هنا نلتقط من يبحث عنكم، ونعرّف من لم يبحث بعد.",
        en: "A good presence is not enough if nobody sees it. Here we capture those searching for you, and introduce you to those who haven't looked yet.",
      } as Bi,
      services: [
        "seo",
        "social-media",
        "digital-marketing",
        "media-buying",
        "performance-marketing",
      ],
    },
    {
      key: "operate" as AreaKey,
      no: "03",
      name: { ar: "تنظيم العمل والنمو", en: "Running the work, and the growth" } as Bi,
      promise: { ar: "نظام يمنع الفرص من الضياع.", en: "A system that stops opportunities slipping." } as Bi,
      desc: {
        ar: "الفرص التي تدخل ولا يمسكها أحد تُنسى. هنا ننظّم ما يحدث بعد أن يتواصل العميل.",
        en: "Opportunities that arrive and nobody holds are forgotten. Here we organise what happens after a client gets in touch.",
      } as Bi,
      services: ["crm"],
    },
  ],

  /** الادّعاء السببي — يُقرأ بعد الأجزاء الثلاثة، لا قبلها */
  proof: {
    ar: "لأنّ أيّ جزء لا يعمل يؤثّر في النتيجة كلّها: إعلانات تصبّ في موقع ضعيف إنفاقٌ مهدور، وحضور لا يراه أحد لا يُنتج شيئًا، وفرص تدخل بلا نظام تضيع. الأجزاء تتضاعف ولا تُجمع.",
    en: "Because any part that doesn't work drags the whole result down: ads pointed at a weak site are wasted spend, a presence nobody sees produces nothing, and opportunities arriving with no system are lost. The parts multiply — they do not add.",
  } as Bi,
};

/** المنطقة التي تنتمي إليها خدمة — يُقرأ في صفحة الخدمة لتربطها بالسردية. */
export function areaOf(serviceSlug: string) {
  return areas.items.find((a) => a.services.includes(serviceSlug));
}
