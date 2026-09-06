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

/**
 * فهرس المسارات وبيانات رأس كل صفحة.
 *
 * يُقرأ مرّتين: من التطبيق وقت التشغيل لضبط الوسوم، ومن إضافة البناء
 * في `vite.config.ts` لتوليد ملف HTML ثابت لكل مسار وخريطة الموقع.
 * مصدر واحد يمنع اختلاف ما يراه الزائر عمّا يراه الزاحف.
 */

export const SITE_URL = `https://${brand.domain}`;

/** صورة المعاينة الافتراضية عند مشاركة رابط. */
export const OG_IMAGE = "/assets/og-default.png";

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
    en: "Daamah Digital Solutions | Branding, Websites & Digital Marketing",
  },
  description: {
    ar: "منذ 2018 نبني حضورًا رقميًا متكاملًا للشركات في السعودية والخليج ومصر وأوروبا: هوية بصرية، مواقع إلكترونية، سوشيال ميديا، وتسويق رقمي يحقق نتائج.",
    en: "Since 2018 we have built complete digital presence for companies across Saudi Arabia, the Gulf, Egypt, and Europe: brand identity, websites, social media, and marketing that performs.",
  },
  priority: 1,
  kind: "home",
};

/** يبني عنوانًا موحّدًا: «اسم الصفحة — اسم الشركة» */
function titled(label: Bi): Bi {
  return { ar: `${label.ar} — ${brand.name.ar}`, en: `${label.en} — ${brand.name.en}` };
}

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
    description: aboutPage.intro,
    priority: 0.8,
    kind: "page",
  },
  {
    path: "/services",
    title: titled(servicesPage.label),
    description: servicesPage.intro,
    priority: 0.9,
    kind: "services",
  },
  ...services.items.map<RouteMeta>((s) => ({
    path: `/services/${s.slug}`,
    title: titled(s.name),
    description: serviceDetails[s.slug]?.intro ?? s.desc,
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
    description: c.lede,
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
    description: packagesPage.intro,
    priority: 0.8,
    kind: "page",
  },
  {
    path: "/contact",
    title: titled(contactPage.label),
    description: contactPage.intro,
    priority: 0.9,
    kind: "page",
  },
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
