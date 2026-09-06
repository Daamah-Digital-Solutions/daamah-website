import type { Bi } from "../i18n";
import { brand, services } from "./home";
import { clientStories, sectorMeta, workItems } from "./work";
import {
  aboutPage,
  contactPage,
  packagesPage,
  privacyPage,
  processPage,
  serviceDetails,
  servicesPage,
  workDetails,
  workPage,
} from "./pages";

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

export type RouteMeta = {
  /** المسار المجرّد بلا بادئة لغة */
  path: string;
  title: Bi;
  description: Bi;
  /** أولوية المسار في خريطة الموقع */
  priority: number;
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
};

/** يبني عنوانًا موحّدًا: «اسم الصفحة — اسم الشركة» */
function titled(label: Bi): Bi {
  return { ar: `${label.ar} — ${brand.name.ar}`, en: `${label.en} — ${brand.name.en}` };
}

export const routes: RouteMeta[] = [
  home,
  {
    path: "/about",
    title: titled(aboutPage.label),
    description: aboutPage.intro,
    priority: 0.8,
  },
  {
    path: "/services",
    title: titled(servicesPage.label),
    description: servicesPage.intro,
    priority: 0.9,
  },
  ...services.items.map<RouteMeta>((s) => ({
    path: `/services/${s.slug}`,
    title: titled(s.name),
    description: serviceDetails[s.slug]?.intro ?? s.desc,
    priority: 0.8,
  })),
  {
    path: "/work",
    title: titled(workPage.label),
    description: workPage.intro,
    priority: 0.9,
  },
  ...workItems.map<RouteMeta>((w) => ({
    path: `/work/${w.slug}`,
    title: titled(w.name),
    description: workDetails[w.slug]?.desc ?? sectorMeta(w.sector).label,
    priority: 0.6,
  })),
  /* قصص العملاء أعلى أولويةً من العمل المفرد: هي ما نريد أن يُقرأ */
  ...clientStories.map<RouteMeta>((c) => ({
    path: `/clients/${c.slug}`,
    title: titled(c.name),
    description: c.lede,
    priority: 0.7,
  })),
  {
    path: "/process",
    title: titled(processPage.label),
    description: processPage.intro,
    priority: 0.7,
  },
  {
    path: "/packages",
    title: titled(packagesPage.label),
    description: packagesPage.intro,
    priority: 0.8,
  },
  {
    path: "/contact",
    title: titled(contactPage.label),
    description: contactPage.intro,
    priority: 0.9,
  },
  {
    path: "/privacy",
    title: titled(privacyPage.label),
    description: privacyPage.intro,
    priority: 0.2,
  },
];

/** يبحث عن بيانات مسار مجرّد. */
export function findRoute(path: string): RouteMeta | undefined {
  return routes.find((r) => r.path === path);
}
