import type { Bi } from "../i18n";
import { phoneFor } from "./home";

/**
 * روابط واتساب برسالة تحمل مصدرها.
 *
 * كل نداء في الموقع كان يذهب إلى صفحة التواصل، فتصل المحادثة بلا
 * سياق: «مرحبًا» ولا نعرف من أين جاء صاحبها ولا ماذا كان يقرأ. ومع
 * كل خطوة إضافية بين القراءة والرسالة يسقط جزء من الزوّار.
 *
 * الرسالة **مكتوبة بصوت الزائر** — هو من يرسلها، فلا تصحّ فيها نبرة
 * الشركة — وبنيتها واحدة: تحيّة، ثم سطر يذكر الصفحة أو الحلّ الذي
 * جاء منه، ثم حقول يملؤها، ثم طلب الجلسة.
 *
 * والحقول الفارغة مقصودة: الرسالة المكتملة يمسحها الزائر لأنها تبدو
 * آلية، أمّا الناقصة فتدعوه إلى إكمالها — فتصل مؤهَّلة، ويُعرف اسم
 * الشركة ومجالها وحاجتها قبل أول ردّ.
 *
 * صفحة التواصل تبقى قائمة بنموذجها لمن يفضّل الكتابة المنظّمة؛
 * الواتساب هو الباب الأول لا الوحيد.
 */

/** يبني رابط واتساب برسالة معبّأة. */
export function waHref(message: string): string {
  const number = phoneFor().raw.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * قالب واحد لكل الرسائل — السطر الثاني وحده هو ما يتغيّر.
 *
 * توحيد البنية يجعل الرسائل الواصلة قابلة للمسح بالعين: الموضوع في
 * مكانه دائمًا، والحقول في مكانها دائمًا.
 */
function compose(context: Bi): Bi {
  return {
    ar: [
      "السلام عليكم ورحمة الله وبركاته،",
      "",
      `أتواصل معكم من موقع دَعمة ${context.ar}`,
      "",
      "• اسم الشركة:",
      "• المجال:",
      "• أبرز ما نحتاجه:",
      "",
      "وأرغب في ترتيب جلسة لتحديد النطاق. وشكرًا لكم.",
    ].join("\n"),
    en: [
      "Hello,",
      "",
      `I'm getting in touch from the Daamah website ${context.en}`,
      "",
      "• Company:",
      "• Sector:",
      "• What we mainly need:",
      "",
      "I'd like to arrange a scoping call. Thank you.",
    ].join("\n"),
  };
}

export const waMessage = {
  /** الهيدر والهيرو والزرّ العائم — نيّة عامة */
  general: compose({
    ar: "وأرغب في بدء مشروع مع فريقكم.",
    en: "and I'd like to start a project with your team.",
  }),

  /** خاتمة صفحة الحلول — لم يحسم أيّها يناسبه */
  unsure: compose({
    ar: "ولست متأكدًا أيّ حلّ يناسب شركتنا، وأرغب في مساعدتكم في تحديده.",
    en: "and I'm not sure which solution fits us — I'd like your help working that out.",
  }),

  /**
   * من داخل حلّ بعينه.
   * `voice` هي جملة الوضع نفسها المعروضة في المُرشد، فتصل المحادثة
   * وقد وصف صاحبها حاله بالكلمات التي تعرّف عليها في الصفحة.
   */
  solution: (name: Bi, voice: Bi): Bi =>
    compose({
      ar: `بخصوص حلّ «${name.ar}»: ${voice.ar}`,
      en: `about the "${name.en}" solution: ${voice.en}`,
    }),

  /** من صفحة خدمة */
  service: (name: Bi): Bi =>
    compose({
      ar: `بخصوص خدمة ${name.ar}.`,
      en: `about your ${name.en} service.`,
    }),

  /** من صفحة (خدمة × مدينة) — أعلى نيّة في الموقع */
  city: (service: Bi, city: Bi): Bi =>
    compose({
      ar: `بحثًا عن ${service.ar} في ${city.ar}.`,
      en: `looking for ${service.en} in ${city.en}.`,
    }),

  /** من عمل أو حالة دراسية */
  work: (name: Bi): Bi =>
    compose({
      ar: `بعد اطّلاعي على مشروع ${name.ar} ضمن أعمالكم، وأرغب في نتيجة مشابهة لشركتنا.`,
      en: `after seeing the ${name.en} project in your work — we'd like a comparable result.`,
    }),

  /** من مقال */
  post: (title: Bi): Bi =>
    compose({
      ar: `بعد قراءة مقالكم «${title.ar}».`,
      en: `after reading your article "${title.en}".`,
    }),

  /** من صفحة السوق السعودي */
  saudi: compose({
    ar: "وشركتنا في السعودية، وأرغب في معرفة كيف يمكنكم العمل معنا.",
    en: "— our company is in Saudi Arabia and I'd like to know how you could work with us.",
  }),

  /**
   * العرض الخفيف — لمن ليس جاهزًا للكلام.
   *
   * ليس كويزًا ولا نموذجًا: في الخليج الواتساب نفسه هو الخطوة الخفيفة،
   * والزائر غير الجاهز لا يتجنّب المحادثة بل يسأل صامتًا «هل تستحقّون؟».
   * رأيٌ في سطرين على موقعه الحالي يجيب ذلك قبل أي التزام.
   */
  review: {
    ar: [
      "السلام عليكم ورحمة الله وبركاته،",
      "",
      "أرغب في رأيكم في حضورنا الحالي قبل أن نقرّر أي شيء.",
      "",
      "• رابط الموقع أو الحساب:",
      "• المجال:",
      "",
      "وشكرًا لكم.",
    ].join("\n"),
    en: [
      "Hello,",
      "",
      "I'd like your view on our current presence before we decide anything.",
      "",
      "• Website or account link:",
      "• Sector:",
      "",
      "Thank you.",
    ].join("\n"),
  } as Bi,

  /** من صفحة التواصل نفسها */
  contact: compose({
    ar: "وأرغب في التحدّث عن مشروعنا.",
    en: "and I'd like to talk about our project.",
  }),
};
