import type { Bi } from "../i18n";

/**
 * تصنيف الأعمال — مفاتيح لا نصوص.
 *
 * كان القطاع نصًّا حرًّا («مقاولات — السعودية») يخلط القطاع بالسوق،
 * فلا يصلح للترشيح رغم أنه أقوى ما يبحث به مشترٍ محترف: «أرِني أنك
 * تفهم قطاعي». وكانت الخدمة قيمةً **مفردة**، فالعميل الذي نفّذنا له
 * أكثر من خدمة كان ينشطر إلى بطاقتين لا رابط بينهما — كما حدث فعلًا
 * مع «إيه دي جي».
 *
 * الآن: العمل المنفّذ هو وحدة التصفّح (موقع، هوية، ملف، نظام)، فيعيد
 * مرشِّح «مواقع» مواقعَ لا عملاء. وقصّة العميل طبقة **فوق** هذه
 * الأعمال تجمع ما نُفِّذ له، لا مخزنٌ ثانٍ يكرّرها.
 */

/* ── الخدمات ── */

export type ServiceKey = "brand" | "profile" | "web" | "social" | "crm";

export const services: {
  key: ServiceKey;
  label: Bi;
  /** صفحة الخدمة المقابلة، إن وُجدت */
  page?: string;
}[] = [
  { key: "brand", label: { ar: "هوية بصرية", en: "Brand identity" }, page: "branding" },
  { key: "profile", label: { ar: "ملف تعريفي", en: "Company profile" } },
  { key: "web", label: { ar: "مواقع إلكترونية", en: "Websites" }, page: "web-development" },
  { key: "social", label: { ar: "سوشيال ميديا", en: "Social media" }, page: "social-media" },
  { key: "crm", label: { ar: "أنظمة إدارة", en: "Management systems" } },
];

/* ── القطاعات ── */

export type SectorKey =
  | "construction"
  | "realestate"
  | "ecommerce"
  | "interior"
  | "finance"
  | "energy"
  | "media"
  | "education";

export const sectors: { key: SectorKey; label: Bi }[] = [
  { key: "construction", label: { ar: "مقاولات", en: "Construction" } },
  { key: "realestate", label: { ar: "عقارات واستثمار", en: "Real estate" } },
  { key: "ecommerce", label: { ar: "تجارة إلكترونية", en: "E-commerce" } },
  { key: "interior", label: { ar: "تصميم داخلي", en: "Interior design" } },
  { key: "finance", label: { ar: "تأمين ومال", en: "Insurance & finance" } },
  { key: "energy", label: { ar: "صناعة وطاقة", en: "Industrial & energy" } },
  { key: "media", label: { ar: "إنتاج وتصوير", en: "Production & filming" } },
  { key: "education", label: { ar: "تعليم", en: "Education" } },
];

/* ── الأسواق ── */

export type MarketKey = "sa" | "ae" | "eg" | "ge" | "lb" | "eu" | "us";

export const markets: Record<MarketKey, Bi> = {
  sa: { ar: "السعودية", en: "Saudi Arabia" },
  ae: { ar: "الإمارات", en: "UAE" },
  eg: { ar: "مصر", en: "Egypt" },
  ge: { ar: "جورجيا", en: "Georgia" },
  lb: { ar: "لبنان", en: "Lebanon" },
  eu: { ar: "أوروبا", en: "Europe" },
  us: { ar: "الولايات المتحدة", en: "United States" },
};

/* ── الأعمال ── */

export type WorkItem = {
  slug: string;
  /** الخدمة المنفَّذة — هي ما يجعل مرشِّح الخدمة يعيد النوع الصحيح */
  service: ServiceKey;
  name: Bi;
  sector: SectorKey;
  markets: MarketKey[];
  /** تخصيص أدقّ من القطاع يظهر على البطاقة: «عطور»، «أزياء» */
  note?: Bi;
  image: string;
  /** مفتاح قصّة العميل حين يكون هذا العمل فصلًا منها */
  client?: string;
  /** سنة التنفيذ — منها يُرتَّب خطّ القصّة الزمني */
  year?: number;
};

export const workItems: WorkItem[] = [
  {
    slug: "building-line",
    service: "brand",
    name: { ar: "بيلدنج لاين", en: "Building Line" },
    sector: "construction",
    markets: ["sa"],
    image: "/assets/work/brand-buildingline.jpg",
  },
  {
    slug: "amlak",
    service: "brand",
    name: { ar: "أملاك العقارية", en: "Amlak Real Estate" },
    sector: "realestate",
    markets: ["ge", "sa"],
    image: "/assets/work/brand-amlak.jpg",
  },
  {
    slug: "elitegate",
    service: "brand",
    name: { ar: "إيليت جيت", en: "Elitegate Properties" },
    sector: "realestate",
    markets: [],
    image: "/assets/work/brand-elitegate.jpg",
  },
  {
    slug: "basmat-alomran",
    service: "brand",
    name: { ar: "بصمة العمران", en: "Basmat Alomran" },
    sector: "construction",
    markets: ["sa"],
    image: "/assets/work/brand-basmat.jpg",
  },
  {
    slug: "inmaa",
    service: "brand",
    name: { ar: "إنماء للمقاولات", en: "Inmaa Constructions" },
    sector: "construction",
    markets: [],
    image: "/assets/work/brand-inmaa.jpg",
  },
  {
    slug: "adg-brand",
    service: "brand",
    name: { ar: "إيه دي جي", en: "ADG Real Estate" },
    sector: "realestate",
    markets: ["ge", "lb"],
    image: "/assets/work/brand-adg.jpg",
    client: "adg",
  },
  {
    slug: "fragancia",
    service: "web",
    name: { ar: "فراجانسيا", en: "Fragancia" },
    sector: "ecommerce",
    markets: [],
    note: { ar: "عطور", en: "Fragrance" },
    image: "/assets/work/web-fragancia.jpg",
  },
  {
    slug: "vibrant-design",
    service: "web",
    name: { ar: "فايبرانت ديزاين", en: "Vibrant Design" },
    sector: "interior",
    markets: [],
    image: "/assets/work/web-vibrant.jpg",
  },
  {
    slug: "web-contracting",
    service: "web",
    name: { ar: "مجموعة مقاولات", en: "Contracting Group" },
    sector: "construction",
    markets: ["ae"],
    image: "/assets/work/web-contracting.jpg",
  },
  {
    slug: "insurance",
    service: "web",
    name: { ar: "شركة تأمين", en: "Insurance Group" },
    sector: "finance",
    markets: [],
    image: "/assets/work/web-insurance.jpg",
  },
  {
    slug: "fashion-store",
    service: "web",
    name: { ar: "علامة أزياء", en: "SV Fashion" },
    sector: "ecommerce",
    markets: [],
    note: { ar: "أزياء", en: "Fashion" },
    image: "/assets/work/web-fashion.jpg",
  },
  {
    slug: "eco-vista",
    service: "social",
    name: { ar: "إيكو فيستا", en: "Eco Vista" },
    sector: "construction",
    markets: ["sa"],
    image: "/assets/work/social-ecovista.jpg",
  },
  {
    slug: "sky-shooter",
    service: "social",
    name: { ar: "سكاي شوتر", en: "Sky Shooter" },
    sector: "media",
    markets: ["ae"],
    image: "/assets/work/social-skyshooter.jpg",
  },
  {
    slug: "green-flash",
    service: "social",
    name: { ar: "جرين فلاش", en: "Green Flash" },
    sector: "energy",
    markets: [],
    image: "/assets/work/social-greenflash.jpg",
  },
  {
    slug: "ahl-alquran",
    service: "social",
    name: { ar: "أكاديمية أهل القرآن", en: "Ahl Alquran Academy" },
    sector: "education",
    markets: ["us", "eu"],
    image: "/assets/work/social-ahlalquran.jpg",
  },
  {
    slug: "adg-social",
    service: "social",
    name: { ar: "إيه دي جي العقارية", en: "ADG Realestate" },
    sector: "realestate",
    markets: ["ge"],
    image: "/assets/work/social-adg.jpg",
    client: "adg",
  },
];

/* ── قصص العملاء ── */

export type ClientStory = {
  slug: string;
  name: Bi;
  sector: SectorKey;
  markets: MarketKey[];
  /** سنة أول تعاون — تُترك فارغة حتى تُعرف، فلا يُختلق تاريخ */
  since?: number;
  lede: Bi;
  /** أثر العلاقة ككل، لا أثر خدمة بعينها */
  results: Bi[];
};

/**
 * القصّة لا تكرّر الأعمال — تجمعها.
 *
 * فصولها هي عناصر `workItems` التي تحمل مفتاحها، مرتَّبةً بسنواتها.
 * فلا يوجد وصف في مكانين ولا خطر أن يفترقا.
 */
export const clientStories: ClientStory[] = [
  {
    slug: "adg",
    name: { ar: "إيه دي جي", en: "ADG Real Estate" },
    sector: "realestate",
    markets: ["ge", "lb"],
    lede: {
      ar: "بدأ التعاون بهوية بصرية لشركة عقارات تعمل في جورجيا ولبنان، ثم امتدّ إلى إدارة حضورها على السوشيال ميديا — العلامة نفسها التي بنيناها هي التي تتكلّم في المحتوى اليومي.",
      en: "The relationship began with an identity for a real estate company working across Georgia and Lebanon, then extended into running its social presence — the same brand we built is the one that speaks in the daily content.",
    },
    results: [
      { ar: "هوية موحّدة عبر سوقين", en: "One identity across two markets" },
      { ar: "محتوى يبرز الفرص الاستثمارية بوضوح", en: "Content that presents investment opportunities clearly" },
      { ar: "استفسارات من عملاء مهتمين", en: "Enquiries from qualified prospects" },
    ],
  },
];

/* ── مساعدات ── */

export const storyBySlug = (slug: string) => clientStories.find((c) => c.slug === slug);

export const itemBySlug = (slug: string) => workItems.find((w) => w.slug === slug);

/** فصول قصّة عميل — أعماله مرتَّبةً زمنيًا حين تُعرف السنوات. */
export function chaptersOf(clientSlug: string): WorkItem[] {
  return workItems
    .filter((w) => w.client === clientSlug)
    .sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
}

/** الخدمات المنفَّذة لعميل، بترتيب فصول قصّته. */
export function servicesOf(clientSlug: string): ServiceKey[] {
  return [...new Set(chaptersOf(clientSlug).map((w) => w.service))];
}

export const serviceMeta = (key: ServiceKey) => services.find((s) => s.key === key)!;
export const sectorMeta = (key: SectorKey) => sectors.find((s) => s.key === key)!;

/**
 * المرشّحات المتاحة — مشتقّة من الأعمال الموجودة لا مكتوبة يدويًا.
 * فلا يظهر مرشِّح يعيد لا شيء، ويظهر الجديد وحده حين يُضاف أول عمل له.
 */
export function facets(items: WorkItem[] = workItems) {
  const count = <K extends string>(pick: (w: WorkItem) => K) =>
    items.reduce<Partial<Record<K, number>>>(
      (acc, w) => ({ ...acc, [pick(w)]: (acc[pick(w)] ?? 0) + 1 }),
      {},
    );

  const byService = count((w) => w.service);
  const bySector = count((w) => w.sector);

  return {
    services: services.filter((s) => byService[s.key]).map((s) => ({ ...s, n: byService[s.key]! })),
    sectors: sectors.filter((s) => bySector[s.key]).map((s) => ({ ...s, n: bySector[s.key]! })),
  };
}
