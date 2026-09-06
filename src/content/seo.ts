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
  "/about": {
    ar: "منذ 2018 ودَعمة تحوّل أفكار الشركات إلى حضور رقمي واضح — نعمل مع عملاء في مصر والخليج وأوروبا.",
    en: "Since 2018 Daamah has turned companies' ideas into a clear digital presence, working across Egypt, the Gulf, and Europe.",
  },
  "/services": {
    ar: "هوية بصرية، مواقع، سوشيال ميديا، تسويق رقمي، شراء إعلانات، وسيو — ست خدمات تعمل كمنظومة واحدة.",
    en: "Branding, websites, social media, digital marketing, media buying, and SEO — six services that work as one system.",
  },
  "/services/branding": {
    ar: "نظام هوية كامل — لون وخطّ وأسلوب صورة ونبرة — مبنيّ على فهم سوقك. يشمل دليل استخدام وملفات مفتوحة.",
    en: "A complete identity system — colour, type, image style, and tone — built from your market. Includes a usage guide and open files.",
  },
  "/services/seo": {
    ar: "تدقيق تقني، وبحث كلمات مبنيّ على كيف يبحث السعودي فعلًا، ومحتوى عربي يُنشر بانتظام. نتائج تقنية خلال أسابيع، وترتيب خلال 4–9 أشهر.",
    en: "Technical audit, Arabic keyword research based on how Saudis really search, and content published consistently. Technical gains in weeks, rankings in 4–9 months.",
  },
  "/services/media-buying": {
    ar: "حملات على المنصّات التي يستعملها جمهورك فعلًا، بمتابعة يومية للتكلفة لا شهرية. الاستهداف الدقيق أهمّ من الإنفاق الكبير.",
    en: "Campaigns on the platforms your audience actually uses, with cost watched daily rather than monthly. Sharp targeting beats big spend.",
  },
  "/packages": {
    ar: "أربعة حلول مبنيّة على وضع الشركة لا على قائمة خدمات: الأساس، الحضور، الفرص، والنظام. اقرأ الأقرب إلى وضعكم.",
    en: "Four solutions built around your company's situation rather than a service list: Foundation, Presence, Demand, and Operations.",
  },
  "/contact": {
    ar: "استشارة أولى مجانية بدون التزام. احكِ لنا عن مشروعك ونرجع لك بخطة واضحة وسعر محدّد — عادةً خلال يوم عمل.",
    en: "A free first consultation, no commitment. Tell us about your project and we'll reply with a clear plan and a firm price — usually within one business day.",
  },
  "/saudi": {
    ar: "ما نقدّمه للسوق السعودي: هوية بصرية، مواقع، سيو، وتسويق. عمل عن بُعد بتوقيت الرياض، وتسليم بملفات مفتوحة وحسابات باسمك.",
    en: "What we offer the Saudi market: branding, websites, SEO, and marketing. Fully remote on Riyadh time, with open files and accounts in your name.",
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
    description: workDetails[w.slug]?.desc ?? sectorMeta(w.sector).label,
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
    path: "/packages",
    title: titled(packagesPage.label),
    description: describe("/packages", packagesPage.intro),
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
