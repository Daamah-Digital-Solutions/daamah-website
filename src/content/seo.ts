import type { Bi, Lang } from "../i18n";
import { brand, services } from "./home";
import { clientStories, sectorMeta, workItems } from "./work";
import {
  aboutPage,
  blogPage,
  contactPage,
  packagesPage,
  privacyPage,
  processPage,
  serviceDetails,
  servicesPage,
  workDetails,
  workPage,
} from "./pages";
import { allTags, langsOf, posts } from "./blog";
import { tagLabel } from "./blog/tags";
import { cityPages, saudiHub } from "./saudi";

/**
 * فهرس المسارات وبيانات رأس كل صفحة.
 *
 * يُقرأ مرّتين: من التطبيق وقت التشغيل لضبط الوسوم، ومن إضافة البناء
 * في `vite.config.ts` لتوليد ملف HTML ثابت لكل مسار وخريطة الموقع.
 * مصدر واحد يمنع اختلاف ما يراه الزائر عمّا يراه الزاحف.
 */

export { SITE_URL, OG_IMAGE } from "../seo/site";

/** نوع الصفحة — منه يعرف مولّد البيانات المنظّمة ما يُصرّح به. */
export type RouteKind =
  | "home"
  | "page"
  | "services"
  | "service"
  | "work"
  | "workItem"
  | "client"
  | "blog"
  | "post"
  | "tag"
  | "saudi"
  | "city"
  | "legal";

export type RouteMeta = {
  /** المسار المجرّد بلا بادئة لغة */
  path: string;
  title: Bi;
  description: Bi;
  /** أولوية المسار في خريطة الموقع */
  priority: number;
  kind: RouteKind;
  /** المسار الأب — منه يُبنى مسار فتات الخبز */
  parent?: string;
  /** اللغات المتاحة. الغياب يعني الاثنتين معًا. */
  langs?: Lang[];
  /** آخر تعديل — يدخل خريطة الموقع حين يوجد */
  lastmod?: string;
  /** صورة تمثّل الصفحة — لخريطة الموقع ولوسوم المشاركة */
  image?: string;
};

const home: RouteMeta = {
  path: "/",
  title: {
    ar: "دَعمة للحلول الرقمية | هوية بصرية ومواقع وتسويق رقمي",
    en: "Daamah Digital Solutions | Branding, Websites & Marketing",
  },
  description: {
    ar: "منذ 2018 نبني حضورًا رقميًا متكاملًا للشركات في السعودية والخليج ومصر وأوروبا: هوية بصرية، مواقع إلكترونية، سوشيال ميديا، وتسويق رقمي يحقق نتائج.",
    en: "Brand identity, websites, social media, and marketing for companies in Saudi Arabia, the Gulf, Egypt, and Europe. Building digital presence since 2018.",
  },
  priority: 1,
  kind: "home",
};

/** يبني عنوانًا موحّدًا: «اسم الصفحة — اسم الشركة» */
function titled(label: Bi): Bi {
  return { ar: `${label.ar} — ${brand.name.ar}`, en: `${label.en} — ${brand.name.en}` };
}

/**
 * وصفٌ مكتوب للنتائج، لمن مقدّمته أطول ممّا يُعرض.
 *
 * الوصف الافتراضي هو مقدّمة الصفحة الظاهرة — وهي مكتوبة لتُقرأ على
 * الصفحة لا لتُختصر في سطرين. جوجل يقتطع بعد نحو 160 حرفًا، فوصف
 * من 287 حرفًا ينتهي مبتورًا في منتصف جملة. هنا نسخة مختصرة تحلّ
 * محلّها في الرأس وحده؛ نصّ الصفحة لا يتغيّر.
 *
 * المفتاح هو المسار المجرّد. ما لا مفتاح له يبقى على مقدّمته.
 */
const META: Record<string, Bi> = {
  /* أوصاف الأعمال الجديدة: نصّ الصفحة يشرح، والوصف هنا يُقتطع في
     نتائج البحث إن طال — فيُكتب قصيرًا بدل أن يُبتر */
  "/work/hcc-insurance": {
    ar: "موقع مؤسسي لشركة تأمين دولية مقرّها لندن، على رسالة الثقة والقوة المالية عبر خمسة عقود.",
    en: "A corporate site for a London-based international insurer, on a message of trust and financial strength.",
  },
  "/work/sara-younis": {
    ar: "متجر علامة أزياء نسائية بتصميم مينيمال يترك الصورة تتكلّم ويقصّر الطريق إلى الشراء.",
    en: "A womenswear store in a minimal design that lets the photography speak and shortens the path to buying.",
  },
  "/work/profitmax-brand": {
    ar: "هوية شركة استثمار تعمل من بريطانيا والإمارات — شعار يجمع حرف الاسم بسهم صاعد يقول التخصّص قبل أن يُقرأ الاسم.",
    en: "Identity for an investment firm in the UK and the UAE — a mark folding the initial into a rising arrow.",
  },
  "/work/profitmax-web": {
    ar: "موقع ثنائي اللغة لشركة استثمار تعمل من بريطانيا والإمارات، يعرض الخدمات ويقود الزائر إلى حجز استشارة.",
    en: "A bilingual site for an investment firm in the UK and the UAE, leading visitors to book a consultation.",
  },
  "/work/alhayat-brand": {
    ar: "هوية مزرعة دواجن في الرياض، مبنيّة من عناصر المزرعة نفسها: شمس وسنبلة قمح وأرض زراعية.",
    en: "Identity for a poultry farm in Riyadh, built from the farm's own elements: sun, wheat spike, and land.",
  },
  "/work/alhayat-web": {
    ar: "متجر إلكتروني لمزرعة دواجن في الرياض يعرض المنتجات ويستقبل الطلبات، بامتداد هويّتها لا بنسخة منها.",
    en: "An online store for a poultry farm in Riyadh, presenting products and taking orders in its own identity.",
  },
  "/work/utility-vision": {
    ar: "موقع شركة مقاولات في جدة يعرض المشاريع والخدمات، بمسار طلب عرض سعر ظاهر في كل صفحة.",
    en: "A site for a contracting company in Jeddah presenting projects and services, with a quote path on every page.",
  },
  "/work/future-axis": {
    ar: "موقع شركة مقاولات سعودية يعرض السجلّ والمورّدين والمشاريع الأخيرة، لا صور عرض فقط.",
    en: "A site for a Saudi contracting company showing the record, the suppliers, and the latest projects.",
  },
  "/work/greenmark": {
    ar: "إدارة حضور شركة تأسيس شركات وتخليص أوراق في دبي، بمحتوى يجيب أسئلة العميل الفعلية.",
    en: "Social presence for a company-formation firm in Dubai, on content that answers real client questions.",
  },
  "/work/rahiq": {
    ar: "محتوى شهري لعلامة عسل ومنتجات طبيعية في مصر، يربط المنتج بمناسبات السنة وفوائده الغذائية.",
    en: "Monthly content for an Egyptian honey brand, tying the product to the year's occasions and its benefits.",
  },
  "/work/sat-leaders": {
    ar: "محتوى شهري لأكاديمية تحضير اختبارات SAT وACT وEST في مصر، يخاطب قلق الطالب وولي الأمر معًا.",
    en: "Monthly content for a SAT, ACT and EST prep academy in Egypt, addressing student and parent alike.",
  },
  "/work/sedra": {
    ar: "هوية علامة إكسسوارات فاخرة، مبنيّة على خطّ عربي مخصّص لكلمة «سدرة».",
    en: "Identity for a luxury accessories brand, built on custom Arabic lettering of the word Sedra.",
  },
  "/work/alraghad": {
    ar: "هوية علامة مجوهرات — حرفان يجتمعان في شكل خاتم داخل إطار مقوّس، ذهبٌ على خلفية داكنة.",
    en: "Identity for a jewellery brand — two initials folded into a ring inside an arched frame.",
  },
  "/work/tech-care": {
    ar: "هوية معامل تحاليل طبية — قطرة داخل حرف C وجزيئات تحليل، بأزرق طبّي يقول الثقة والراحة.",
    en: "Identity for a medical laboratory — a droplet inside the letter C, in a blue that carries reassurance.",
  },
  "/work/vip-limo": {
    ar: "هوية خدمة ليموزين في شيكاغو، وواجهات تطبيقها — الهوية والاستخدام من مصدر واحد.",
    en: "Identity and app interface design for a limousine service in Chicago.",
  },
  "/work/auto-crazy-car": {
    ar: "هوية خدمات سيارات، عالية التباين تحمل حركةً وسرعة قبل أن يُقرأ الاسم.",
    en: "Identity for an automotive service — high contrast, carrying movement before the name is read.",
  },
  "/work/caffeine-kiss": {
    ar: "هوية علامة قهوة — فنجانٌ يُقرأ ابتسامةً في آنٍ واحد، فكرة واحدة تحمل الاسم والمزاج.",
    en: "Identity for a coffee brand — a cup that reads as a smile, one idea carrying name and mood.",
  },
  "/work/daughters": {
    ar: "هوية شركة تجارة عامة — صندوق شحن يُقرأ حرف الاسم الأول، فيقول المجال في لمحة.",
    en: "Identity for a general trading company — a shipping crate that reads as the initial.",
  },
  "/clients/profitmax": {
    ar: "هوية ثم موقع لشركة استثمار تعمل من بريطانيا والإمارات — علاقة امتدّت من العلامة إلى حضورها الكامل.",
    en: "Identity then website for an investment firm in the UK and the UAE — from the mark to the full presence.",
  },
  "/clients/alhayat": {
    ar: "هوية ثم متجر إلكتروني لمزرعة دواجن في الرياض — ما يراه العميل على العبوة هو ما يراه على الشاشة.",
    en: "Identity then online store for a poultry farm in Riyadh — the pack and the screen say the same thing.",
  },
  "/about": {
    ar: "منذ 2018 ودَعمة تحوّل أفكار الشركات إلى حضور رقمي واضح — نعمل مع عملاء في مصر والخليج وأوروبا.",
    en: "Since 2018 Daamah has turned companies' ideas into a clear digital presence, working across Egypt, the Gulf, and Europe.",
  },
  "/services": {
    ar: "خدمات دَعمة في ثلاثة عوامل: الظهور وبناء الثقة، والوصول وخلق الفرص، وتنظيم العمل والنمو — هوية ومواقع وسيو وإعلانات وأنظمة CRM.",
    en: "Daamah's services across three factors: appearing and earning trust, reaching and creating demand, and running the work — branding, websites, SEO, ads, and CRM.",
  },
  "/services/branding": {
    ar: "نظام هوية كامل — لون وخطّ وأسلوب صورة ونبرة — مبنيّ على فهم سوقك. يشمل دليل استخدام وملفات مفتوحة.",
    en: "A complete identity system — colour, type, image style, and tone — built from your market. Includes a usage guide and open files.",
  },
  "/services/company-profile": {
    ar: "ملف تعريفي يُقرأ في خمس دقائق ويصلح للتأهيل والعروض — مكتوب ومصمّم على هويّتكم، عربي وإنجليزي.",
    en: "A company profile read in five minutes that holds up in qualification files — written and designed on your identity, in Arabic and English.",
  },
  "/services/crm": {
    ar: "نظام CRM مهيّأ على طريقة عملكم: مراحل بيع واضحة، ومسؤول لكل مرحلة، وتقارير تقرأها الإدارة بلا وسيط.",
    en: "A CRM shaped to how you work: clear sales stages, an owner for each, and reports management reads without a middleman.",
  },
  "/services/seo": {
    ar: "تدقيق تقني، وبحث كلمات مبنيّ على كيف يبحث السعودي فعلًا، ومحتوى عربي يُنشر بانتظام. نتائج تقنية خلال أسابيع، وترتيب خلال 4–9 أشهر.",
    en: "Technical audit, Arabic keyword research based on how Saudis really search, and content published consistently. Technical gains in weeks, rankings in 4–9 months.",
  },
  "/services/media-buying": {
    ar: "حملات على المنصّات التي يستعملها جمهورك فعلًا، بمتابعة يومية للتكلفة لا شهرية. الاستهداف الدقيق أهمّ من الإنفاق الكبير.",
    en: "Campaigns on the platforms your audience actually uses, with cost watched daily rather than monthly. Sharp targeting beats big spend.",
  },
  "/solutions": {
    ar: "أربعة حلول مبنيّة على وضع الشركة لا على قائمة خدمات: الأساس، الحضور، الفرص، والنظام. اقرأ الأقرب إلى وضعكم.",
    en: "Four solutions built around your company's situation rather than a service list: Foundation, Presence, Demand, and Operations.",
  },
  "/contact": {
    ar: "استشارة أولى مجانية بدون التزام. احكِ لنا عن مشروعك ونرجع لك بخطة واضحة وسعر محدّد — عادةً خلال يوم عمل.",
    en: "A free first consultation, no commitment. Tell us about your project and we'll reply with a clear plan and a firm price — usually within one business day.",
  },
  "/saudi": {
    ar: "ما نقدّمه للسوق السعودي: هوية بصرية، مواقع، سيو، وتسويق. مواعيد على توقيت الرياض، وتسليم بملفات مفتوحة وحسابات باسمك.",
    en: "What we offer the Saudi market: branding, websites, SEO, and marketing. Riyadh-time scheduling, with open files and accounts in your name.",
  },
  "/clients/adg": {
    ar: "هوية بصرية لشركة عقارات في جورجيا ولبنان، ثم إدارة حضورها على السوشيال — العلامة التي بنيناها هي التي تتكلّم يوميًا.",
    en: "Identity for a real estate company across Georgia and Lebanon, then its social presence — the brand we built is the one that speaks daily.",
  },
};

/** الوصف المكتوب للنتائج إن وُجد، وإلا مقدّمة الصفحة. */
const describe = (path: string, fallback: Bi): Bi => META[path] ?? fallback;

/**
 * مسارات المدوّنة — تُشتقّ من الملفات لا تُكتب.
 *
 * المقال المكتوب بلغة واحدة يحمل `langs` بها وحدها، فلا يُولَّد له
 * `hreflang` يَعِد جوجل بنسخةٍ غير موجودة، ولا صفحة فارغة باللغة
 * الأخرى. عنوان صفحة المقال هو عنوان المقال نفسه لا اسمه ملحقًا
 * باسم الشركة: العنوان الطويل يُقتطع في النتائج.
 */
const blogRoutes: RouteMeta[] = [
  ...[...new Set(posts.map((p) => p.slug))].map<RouteMeta>((slug) => {
    const langs = langsOf(slug);
    const ar = posts.find((p) => p.slug === slug && p.lang === "ar");
    const en = posts.find((p) => p.slug === slug && p.lang === "en");
    /* اللغة الغائبة تأخذ نصّ الموجودة: الصفحة لا تُولَّد لها أصلًا،
       لكن النوع يطلب الوجهين */
    const any = (ar ?? en)!;
    return {
      path: `/blog/${slug}`,
      title: { ar: (ar ?? any).title, en: (en ?? any).title },
      description: { ar: (ar ?? any).description, en: (en ?? any).description },
      priority: 0.7,
      kind: "post",
      parent: "/blog",
      langs,
      lastmod: any.updated ?? any.date,
      image: any.cover,
    };
  }),
  /* صفحات الوسوم: تُولَّد للغة التي فيها مقال بذلك الوسم فقط */
  ...[...new Set(posts.flatMap((p) => p.tags))].map<RouteMeta>((tag) => {
    const langs = (["ar", "en"] as Lang[]).filter((l) =>
      allTags(l).some((x) => x.tag === tag),
    );
    const label = tagLabel(tag);
    return {
      path: `/blog/tag/${tag}`,
      title: {
        ar: `${blogPage.tagTitle.ar} ${label.ar} — ${brand.name.ar}`,
        en: `${blogPage.tagTitle.en} ${label.en} — ${brand.name.en}`,
      },
      description: {
        ar: `مقالات دَعمة عن ${label.ar} — تجربة عملية من مشاريع في السعودية والخليج ومصر.`,
        en: `Daamah articles on ${label.en} — practical experience from projects across Saudi Arabia, the Gulf, and Egypt.`,
      },
      priority: 0.4,
      kind: "tag",
      parent: "/blog",
      langs,
    };
  }),
];

export const routes: RouteMeta[] = [
  home,
  {
    path: "/about",
    title: titled(aboutPage.label),
    description: describe("/about", aboutPage.intro),
    priority: 0.8,
    kind: "page",
  },
  {
    path: "/services",
    title: titled(servicesPage.label),
    description: describe("/services", servicesPage.intro),
    priority: 0.9,
    kind: "services",
  },
  ...services.items.map<RouteMeta>((s) => ({
    path: `/services/${s.slug}`,
    title: titled(s.name),
    description: describe(`/services/${s.slug}`, serviceDetails[s.slug]?.intro ?? s.desc),
    priority: 0.8,
    kind: "service" as const,
    parent: "/services",
  })),
  {
    path: "/work",
    title: titled(workPage.label),
    description: workPage.intro,
    priority: 0.9,
    kind: "work",
  },
  ...workItems.map<RouteMeta>((w) => ({
    path: `/work/${w.slug}`,
    title: titled(w.name),
    description: describe(`/work/${w.slug}`, workDetails[w.slug]?.desc ?? sectorMeta(w.sector).label),
    priority: 0.6,
    kind: "workItem" as const,
    parent: "/work",
    image: w.image,
  })),
  /* قصص العملاء أعلى أولويةً من العمل المفرد: هي ما نريد أن يُقرأ */
  ...clientStories.map<RouteMeta>((c) => ({
    path: `/clients/${c.slug}`,
    title: titled(c.name),
    description: describe(`/clients/${c.slug}`, c.lede),
    priority: 0.7,
    kind: "client" as const,
    parent: "/work",
  })),
  {
    path: "/process",
    title: titled(processPage.label),
    description: processPage.intro,
    priority: 0.7,
    kind: "page",
  },
  {
    path: "/solutions",
    title: titled(packagesPage.label),
    description: describe("/solutions", packagesPage.intro),
    priority: 0.8,
    kind: "page",
  },
  {
    path: "/contact",
    title: titled(contactPage.label),
    description: describe("/contact", contactPage.intro),
    priority: 0.9,
    kind: "page",
  },
  {
    path: "/saudi",
    title: {
      ar: `خدماتنا في السعودية — ${brand.name.ar}`,
      en: `Our services in Saudi Arabia — ${brand.name.en}`,
    },
    description: describe("/saudi", saudiHub.intro),
    priority: 0.9,
    kind: "saudi",
  },
  /* صفحات (خدمة × مدينة) — عنوانها ووصفها مكتوبان لكل زوج على حدة
     في `saudi.ts`؛ حارس البناء يرفض تكرار وصف بين صفحتين */
  ...cityPages.map<RouteMeta>((p) => ({
    path: `/services/${p.service}/${p.city}`,
    title: {
      ar: `${p.title.ar} — ${brand.short.ar}`,
      en: `${p.title.en} — ${brand.short.en}`,
    },
    description: p.description,
    priority: 0.8,
    kind: "city" as const,
    parent: `/services/${p.service}`,
  })),
  {
    path: "/blog",
    title: titled(blogPage.label),
    description: blogPage.intro,
    priority: 0.9,
    kind: "blog",
  },
  ...blogRoutes,
  {
    path: "/privacy",
    title: titled(privacyPage.label),
    description: privacyPage.intro,
    priority: 0.2,
    kind: "legal",
  },
];

/** يبحث عن بيانات مسار مجرّد. */
export function findRoute(path: string): RouteMeta | undefined {
  return routes.find((r) => r.path === path);
}
