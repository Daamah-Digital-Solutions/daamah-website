import type { Bi } from "../i18n";
import { phoneFor } from "./home";

/**
 * روابط واتساب برسالة تحمل مصدرها.
 *
 * كل نداء في الموقع كان يذهب إلى صفحة التواصل، فتصل المحادثة بلا
 * سياق: «مرحبًا» ولا نعرف من أين جاء صاحبها ولا ماذا كان يقرأ. ومع
 * كل خطوة إضافية بين القراءة والرسالة يسقط جزء من الزوّار.
 *
 * هنا يفتح النداء واتساب مباشرةً برسالة **مكتوبة بصوت الزائر** — هو
 * من يرسلها، فلا تصحّ فيها نبرة الشركة — تذكر الصفحة أو الحلّ الذي
 * جاء منه. فتُقرأ نيّته من أول سطر قبل أن يُسأل عنها.
 *
 * صفحة التواصل تبقى قائمة بنموذجها لمن يفضّل الكتابة المنظّمة؛
 * الواتساب هو الباب الأول لا الوحيد.
 */

/** يبني رابط واتساب برسالة معبّأة. */
export function waHref(message: string): string {
  const number = phoneFor().raw.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

const open = { ar: "السلام عليكم،", en: "Hello," };

/**
 * رسائل الزائر حسب مصدره.
 *
 * تُبقى قصيرة عمدًا: الرسالة الطويلة المعبّأة سلفًا تبدو آليةً
 * فيمسحها الزائر ويكتب «مرحبًا» — فيضيع السياق الذي أردناه.
 */
export const waMessage = {
  /** الهيدر والهيرو — نيّة عامة */
  general: {
    ar: `${open.ar} أرغب في بدء مشروع مع دَعمة.`,
    en: `${open.en} I'd like to start a project with Daamah.`,
  } as Bi,

  /** خاتمة صفحة الحلول — لم يحسم أيّها يناسبه */
  unsure: {
    ar: `${open.ar} لست متأكدًا أيّ حلّ يناسب شركتنا، وأحتاج مساعدة في تحديده.`,
    en: `${open.en} I'm not sure which solution fits us, and I'd like help working it out.`,
  } as Bi,

  /** من داخل حلّ بعينه */
  solution: (name: Bi): Bi => ({
    ar: `${open.ar} أتواصل معكم بخصوص حلّ «${name.ar}».`,
    en: `${open.en} I'm getting in touch about the "${name.en}" solution.`,
  }),

  /** من صفحة خدمة */
  service: (name: Bi): Bi => ({
    ar: `${open.ar} أستفسر عن خدمة ${name.ar}.`,
    en: `${open.en} I'd like to ask about your ${name.en} service.`,
  }),

  /** من صفحة (خدمة × مدينة) — أعلى نيّة في الموقع */
  city: (service: Bi, city: Bi): Bi => ({
    ar: `${open.ar} أبحث عن ${service.ar} في ${city.ar}.`,
    en: `${open.en} I'm looking for ${service.en} in ${city.en}.`,
  }),

  /** من عمل أو حالة دراسية */
  work: (name: Bi): Bi => ({
    ar: `${open.ar} شاهدت مشروع ${name.ar} ضمن أعمالكم، وأرغب في شيء مشابه لشركتنا.`,
    en: `${open.en} I saw the ${name.en} project in your work and would like something similar.`,
  }),

  /** من مقال */
  post: (title: Bi): Bi => ({
    ar: `${open.ar} قرأت مقالكم «${title.ar}» وأرغب في التحدّث.`,
    en: `${open.en} I read your article "${title.en}" and would like to talk.`,
  }),

  /** من صفحة السوق السعودي */
  saudi: {
    ar: `${open.ar} شركتنا في السعودية، وأرغب في معرفة كيف يمكنكم مساعدتنا.`,
    en: `${open.en} Our company is in Saudi Arabia and I'd like to know how you can help.`,
  } as Bi,

  /** من صفحة التواصل نفسها */
  contact: {
    ar: `${open.ar} أرغب في التحدّث عن مشروعنا.`,
    en: `${open.en} I'd like to talk about our project.`,
  } as Bi,
};
