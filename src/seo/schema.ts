import { withLang, type Bi, type Lang } from "../i18n";
import { brand, phoneFor, saudi, services } from "../content/home";
import { faqItemsFor } from "../content/faq";
import { markets, sectorMeta, workItems } from "../content/work";
import { serviceDetails } from "../content/pages";
import { OG_IMAGE, SITE_URL, findRoute, type RouteMeta } from "./../content/seo";

/**
 * البيانات المنظّمة — رسم واحد لكل صفحة.
 *
 * دالة نقية بلا `document`: تُستدعى وقت البناء فتُكتب نتيجتها داخل
 * HTML الثابت، وتُستدعى وقت التشغيل عند التنقّل بين الصفحات. المصدر
 * واحد فلا يمكن أن يختلف ما يقرأه الزاحف عمّا يراه الزائر.
 *
 * ما لا نصرّح به عمدًا:
 * - `LocalBusiness` و`address`: لا مكتب لنا في السعودية، والادّعاء
 *   بعنوان لا وجود له يُسقِط بطاقة النشاط كلها لا هذا الحقل وحده.
 * - `Review` و`AggregateRating`: التقييم الذي يكتبه صاحب الموقع عن
 *   نفسه مخالف صريح لإرشادات جوجل.
 */

type Json = Record<string, unknown>;

const abs = (p: string) => `${SITE_URL}${p}`;
const ORG = `${SITE_URL}/#org`;
const SITE = `${SITE_URL}/#website`;

const pick = <T,>(v: Bi<T>, lang: Lang): T => v[lang];

/** المنظّمة — عقدة واحدة يشير إليها الباقي بـ `@id`. */
function organization(lang: Lang): Json {
  const tel = phoneFor();
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG,
    name: pick(brand.name, lang),
    alternateName: pick(brand.name, lang === "ar" ? "en" : "ar"),
    description: pick(brand.description, lang),
    url: abs(withLang("/", lang)),
    logo: {
      "@type": "ImageObject",
      url: abs("/assets/logo-wordmark.png"),
      width: 2035,
      height: 544,
    },
    image: abs(OG_IMAGE),
    email: brand.email,
    telephone: tel.raw,
    foundingDate: String(brand.founded),
    sameAs: brand.social,
    knowsLanguage: ["ar", "en"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: tel.raw,
        email: brand.email,
        areaServed: ["SA", "AE", "EG"],
        availableLanguage: ["ar", "en"],
      },
    ],
    /* المدن مذكورة صراحةً لا مكتفىً بالدولة: «يخدم السعودية» أضعف
       إشارةً محليةً من «يخدم الرياض» حين يبحث أحدهم من الرياض */
    areaServed: [
      { "@type": "Country", name: pick(markets.sa, lang) },
      { "@type": "City", name: lang === "ar" ? "الرياض" : "Riyadh" },
      { "@type": "City", name: lang === "ar" ? "جدة" : "Jeddah" },
      { "@type": "City", name: lang === "ar" ? "الدمام" : "Dammam" },
      { "@type": "Country", name: pick(markets.ae, lang) },
      { "@type": "Country", name: pick(markets.eg, lang) },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: lang === "ar" ? "خدمات دَعمة" : "Daamah services",
      itemListElement: services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": abs(`/services/${s.slug}#service`),
          name: pick(s.name, lang),
          description: pick(s.desc, lang),
        },
      })),
    },
  };
}

function website(lang: Lang): Json {
  return {
    "@type": "WebSite",
    "@id": SITE,
    url: abs(withLang("/", lang)),
    name: pick(brand.name, lang),
    description: pick(brand.description, lang),
    inLanguage: lang,
    publisher: { "@id": ORG },
  };
}

/** فتات الخبز — يُبنى بتتبّع `parent` حتى الجذر. */
function breadcrumbs(route: RouteMeta, lang: Lang): Json | null {
  const chain: RouteMeta[] = [];
  let node: RouteMeta | undefined = route;
  while (node) {
    chain.unshift(node);
    node = node.parent ? findRoute(node.parent) : undefined;
  }
  const home = findRoute("/");
  if (home && chain[0]?.path !== "/") chain.unshift(home);
  if (chain.length < 2) return null;

  return {
    "@type": "BreadcrumbList",
    itemListElement: chain.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name:
        r.path === "/"
          ? pick(brand.short, lang)
          : pick(r.title, lang).split("—")[0].trim(),
      item: abs(withLang(r.path, lang)),
    })),
  };
}

/** صفحة خدمة — الخدمة نفسها كعقدة، مربوطةً بمن يقدّمها. */
function service(slug: string, lang: Lang): Json | null {
  const item = services.items.find((s) => s.slug === slug);
  if (!item) return null;
  const detail = serviceDetails[slug];
  return {
    "@type": "Service",
    "@id": abs(`/services/${slug}#service`),
    name: pick(item.name, lang),
    serviceType: item.en,
    description: pick(detail?.intro ?? item.desc, lang),
    provider: { "@id": ORG },
    areaServed: [
      { "@type": "Country", name: pick(markets.sa, lang) },
      { "@type": "Country", name: pick(markets.ae, lang) },
      { "@type": "Country", name: pick(markets.eg, lang) },
    ],
    availableLanguage: ["ar", "en"],
  };
}

/** عمل منفّذ — يُصرَّح كعمل إبداعي بصورته وقطاعه وسوقه. */
function creativeWork(slug: string, lang: Lang): Json | null {
  const w = workItems.find((x) => x.slug === slug);
  if (!w) return null;
  return {
    "@type": "CreativeWork",
    "@id": abs(`/work/${slug}#work`),
    name: pick(w.name, lang),
    creator: { "@id": ORG },
    about: pick(sectorMeta(w.sector).label, lang),
    inLanguage: lang,
    image: {
      "@type": "ImageObject",
      url: abs(w.image),
      width: 1400,
      height: 933,
    },
    locationCreated: w.markets.map((m) => ({
      "@type": "Country",
      name: pick(markets[m], lang),
    })),
  };
}

/** أسئلة الصفحة — نفس ما يُعرض حرفيًا، لا نسخة موازية. */
function faqPage(bare: string, lang: Lang): Json | null {
  const items = faqItemsFor(bare);
  if (!items.length) return null;
  return {
    "@type": "FAQPage",
    "@id": abs(`${bare}#faq`),
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: pick(f.q, lang),
      acceptedAnswer: { "@type": "Answer", text: pick(f.a, lang) },
    })),
  };
}

/**
 * رسم الصفحة كاملًا.
 * `bare` مسار مجرّد من بادئة اللغة.
 */
export function graphFor(bare: string, lang: Lang): Json {
  const route = findRoute(bare);
  const graph: Json[] = [organization(lang), website(lang)];

  if (!route) return { "@context": "https://schema.org", "@graph": graph };

  const crumbs = breadcrumbs(route, lang);
  if (crumbs) graph.push(crumbs);

  switch (route.kind) {
    case "home":
      graph.push(faqPage(bare, lang)!);
      break;
    case "service": {
      const s = service(bare.replace("/services/", ""), lang);
      if (s) graph.push(s);
      const f = faqPage(bare, lang);
      if (f) graph.push(f);
      break;
    }
    case "workItem": {
      const w = creativeWork(bare.replace("/work/", ""), lang);
      if (w) graph.push(w);
      break;
    }
  }

  return { "@context": "https://schema.org", "@graph": graph.filter(Boolean) };
}

/** سنوات الخبرة في السوق السعودي — تُقرأ في نصوص الثقة. */
export const saudiYears = () => new Date().getFullYear() - saudi.since;
