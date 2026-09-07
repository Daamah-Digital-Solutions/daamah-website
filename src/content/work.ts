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
  { key: "profile", label: { ar: "ملف تعريفي", en: "Company profile" }, page: "company-profile" },
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
  | "education"
  | "food"
  | "business"
  | "health"
  | "auto"
  | "events";

export const sectors: { key: SectorKey; label: Bi }[] = [
  { key: "construction", label: { ar: "مقاولات", en: "Construction" } },
  { key: "realestate", label: { ar: "عقارات واستثمار", en: "Real estate" } },
  { key: "ecommerce", label: { ar: "تجارة إلكترونية", en: "E-commerce" } },
  { key: "interior", label: { ar: "تصميم داخلي", en: "Interior design" } },
  { key: "finance", label: { ar: "تأمين ومال", en: "Insurance & finance" } },
  { key: "energy", label: { ar: "صناعة وطاقة", en: "Industrial & energy" } },
  { key: "media", label: { ar: "إنتاج وتصوير", en: "Production & filming" } },
  { key: "education", label: { ar: "تعليم", en: "Education" } },
  { key: "food", label: { ar: "أغذية ومزارع", en: "Food & farming" } },
  { key: "business", label: { ar: "تجارة وخدمات أعمال", en: "Trade & business services" } },
  { key: "health", label: { ar: "رعاية صحية", en: "Healthcare" } },
  { key: "auto", label: { ar: "سيارات ونقل", en: "Automotive & transport" } },
  { key: "events", label: { ar: "معارض وفعاليات", en: "Events & exhibitions" } },
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
    slug: "profitmax-brand",
    service: "brand",
    name: { ar: "بروفيت ماكس للاستثمار", en: "Profit Max Investments" },
    sector: "finance",
    markets: ["eu", "ae"],
    image: "/assets/work/brand-profitmax.jpg",
    client: "profitmax",
  },
  {
    slug: "alhayat-brand",
    service: "brand",
    name: { ar: "مزرعة الحياة للدواجن", en: "Alhayat Poultry Farm" },
    sector: "food",
    markets: ["sa"],
    image: "/assets/work/brand-alhayat.jpg",
    client: "alhayat",
  },
  {
    slug: "sedra",
    service: "brand",
    name: { ar: "سدرة", en: "Sedra" },
    sector: "ecommerce",
    markets: [],
    note: { ar: "إكسسوارات", en: "Accessories" },
    image: "/assets/work/brand-sedra.jpg",
  },
  {
    slug: "alraghad",
    service: "brand",
    name: { ar: "الرغد", en: "Al Raghad" },
    sector: "ecommerce",
    markets: [],
    note: { ar: "مجوهرات", en: "Jewellery" },
    image: "/assets/work/brand-alraghad.jpg",
  },
  {
    slug: "tech-care",
    service: "brand",
    name: { ar: "معامل تك كير", en: "Tech Care Labs" },
    sector: "health",
    markets: [],
    note: { ar: "تحاليل طبية", en: "Medical labs" },
    image: "/assets/work/brand-techcare.jpg",
  },
  {
    slug: "vip-limo",
    service: "brand",
    name: { ar: "في آي بي ليمو", en: "VIP Limo" },
    sector: "auto",
    markets: ["us"],
    note: { ar: "ليموزين", en: "Limousine" },
    image: "/assets/work/brand-viplimo.jpg",
  },
  {
    slug: "auto-crazy-car",
    service: "brand",
    name: { ar: "أوتو كريزي كار", en: "Auto Crazy Car" },
    sector: "auto",
    markets: [],
    image: "/assets/work/brand-autocrazycar.jpg",
  },
  {
    slug: "caffeine-kiss",
    service: "brand",
    name: { ar: "كافيين كيس", en: "A Caffeine Kiss" },
    sector: "food",
    markets: [],
    note: { ar: "قهوة", en: "Coffee" },
    image: "/assets/work/brand-caffeinekiss.jpg",
  },
  {
    slug: "daughters",
    service: "brand",
    name: { ar: "دوترز للتجارة", en: "Daughters Trading" },
    sector: "business",
    markets: [],
    image: "/assets/work/brand-daughters.jpg",
  },
  {
    slug: "sara-younis-brand",
    service: "brand",
    name: { ar: "سارة يونس — الهوية", en: "Sara Younis — Identity" },
    sector: "ecommerce",
    markets: [],
    note: { ar: "أزياء", en: "Fashion" },
    image: "/assets/work/brand-sarayounis.jpg",
    client: "sara-younis",
  },
  {
    slug: "expert-estate",
    service: "brand",
    name: { ar: "إكسبرت إستيت", en: "Expert Estate" },
    sector: "realestate",
    markets: [],
    image: "/assets/work/brand-expertestate.jpg",
  },
  {
    slug: "hennawy-brand",
    service: "brand",
    name: { ar: "الحناوي للورق والكيماويات", en: "Al Hennawy Co." },
    sector: "energy",
    markets: [],
    note: { ar: "ورق وكيماويات", en: "Paper & chemicals" },
    image: "/assets/work/brand-hennawy.jpg",
    client: "hennawy",
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
    slug: "trustech-web",
    service: "web",
    name: { ar: "تراستك للمقاولات", en: "Trustech Building Contracting" },
    sector: "construction",
    markets: ["ae", "eu"],
    image: "/assets/work/web-contracting.jpg",
    client: "trustech",
  },
  {
    slug: "hcc-insurance",
    service: "web",
    name: { ar: "إتش سي سي للتأمين الدولي", en: "HCC International Insurance" },
    sector: "finance",
    markets: ["eu"],
    image: "/assets/work/web-insurance.jpg",
    client: "hcc",
  },
  {
    slug: "sara-younis-web",
    service: "web",
    name: { ar: "سارة يونس", en: "SY — Sara Younis" },
    sector: "ecommerce",
    markets: [],
    note: { ar: "أزياء", en: "Fashion" },
    image: "/assets/work/web-fashion.jpg",
  },
  {
    slug: "profitmax-web",
    service: "web",
    name: { ar: "بروفيت ماكس للاستثمار", en: "Profit Max Investments" },
    sector: "finance",
    markets: ["eu", "ae"],
    image: "/assets/work/web-profitmax.jpg",
    client: "profitmax",
  },
  {
    slug: "utility-vision",
    service: "web",
    name: { ar: "يوتيليتي فيجن للمقاولات", en: "Utility Vision Contracting" },
    sector: "construction",
    markets: ["sa"],
    image: "/assets/work/web-utilityvision.jpg",
  },
  {
    slug: "future-axis",
    service: "web",
    name: { ar: "فيوتشر أكسس للمقاولات", en: "Future Axis Contracting" },
    sector: "construction",
    markets: ["sa"],
    image: "/assets/work/web-futureaxis.jpg",
  },
  {
    slug: "alhayat-web",
    service: "web",
    name: { ar: "مزرعة الحياة للدواجن", en: "Alhayat Poultry Farm" },
    sector: "food",
    markets: ["sa"],
    note: { ar: "متجر إلكتروني", en: "Online store" },
    image: "/assets/work/web-alhayat.jpg",
    client: "alhayat",
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
  {
    slug: "adg-profile",
    service: "profile",
    name: { ar: "إيه دي جي — الملف التعريفي", en: "ADG — Company Profile" },
    sector: "realestate",
    markets: ["ge", "lb"],
    image: "/assets/work/profile-adg.jpg",
    client: "adg",
  },
  {
    slug: "profitmax-profile",
    service: "profile",
    name: { ar: "بروفيت ماكس — الملف التعريفي", en: "Profit Max — Company Profile" },
    sector: "finance",
    markets: ["eu", "ae"],
    image: "/assets/work/profile-profitmax.jpg",
    client: "profitmax",
  },
  {
    slug: "hcc-profile",
    service: "profile",
    name: { ar: "إتش سي سي — الملف التعريفي", en: "HCC — Company Profile" },
    sector: "finance",
    markets: ["eu"],
    image: "/assets/work/profile-hcc.jpg",
    client: "hcc",
  },
  {
    slug: "trustech-profile",
    service: "profile",
    name: { ar: "تراستك — ملف مشروع سكاي فيو", en: "Trustech — Sky View Project" },
    sector: "construction",
    markets: ["ae", "eu"],
    image: "/assets/work/profile-trustech.jpg",
    client: "trustech",
  },
  {
    slug: "tdh-profile",
    service: "profile",
    name: { ar: "تي دي إتش — سكاي فيو ريزيدنس", en: "TDH — Sky View Residence" },
    sector: "realestate",
    markets: ["ae"],
    image: "/assets/work/profile-tdh.jpg",
  },
  {
    slug: "hennawy-profile",
    service: "profile",
    name: { ar: "الحناوي — الملف التعريفي", en: "Al Hennawy — Company Profile" },
    sector: "energy",
    markets: ["eg"],
    image: "/assets/work/profile-hennawy.jpg",
    client: "hennawy",
  },
  {
    slug: "alamein-profile",
    service: "profile",
    name: { ar: "مصنع هياكل العلمين", en: "Alamein Trailers" },
    sector: "energy",
    markets: ["sa"],
    note: { ar: "مقطورات", en: "Trailers" },
    image: "/assets/work/profile-alamein.jpg",
  },
  {
    slug: "connect-profile",
    service: "profile",
    name: { ar: "كونكت لأجنحة المعارض", en: "Connect Exhibition Stands" },
    sector: "events",
    markets: ["sa"],
    image: "/assets/work/profile-connect.jpg",
  },
  {
    slug: "greenmark",
    service: "social",
    name: { ar: "جرين مارك", en: "Green Mark" },
    sector: "business",
    markets: ["ae"],
    note: { ar: "تأسيس شركات", en: "Company setup" },
    image: "/assets/work/social-greenmark.jpg",
  },
  {
    slug: "rahiq",
    service: "social",
    name: { ar: "رحيق", en: "Rahiq" },
    sector: "food",
    markets: ["eg"],
    note: { ar: "عسل", en: "Honey" },
    image: "/assets/work/social-rahiq.jpg",
  },
  {
    slug: "sat-leaders",
    service: "social",
    name: { ar: "أكاديمية سات ليدرز", en: "SAT Leaders Academy" },
    sector: "education",
    markets: ["eg"],
    image: "/assets/work/social-satleaders.jpg",
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
    slug: "hcc",
    name: { ar: "إتش سي سي للتأمين الدولي", en: "HCC International Insurance" },
    sector: "finance",
    markets: ["eu"],
    lede: {
      ar: "شركة تأمين دولية مقرّها لندن، تبيع ضمانات وسندات لشركات تتعامل بعقود كبيرة. القارئ هنا لا يشتري بالانطباع بل بالتفصيل — فبُني الموقع والملف على القاعدة نفسها: اشرح ما تغطّيه بالضبط، ثم اترك الثقة تُبنى من الوضوح.",
      en: "A London-based international insurer selling bonds and guarantees to companies working on large contracts. This reader does not buy on impression but on detail — so the site and the profile were built on one rule: explain exactly what is covered, then let the trust build from the clarity.",
    },
    results: [
      { ar: "موقع مؤسسي بصفحة لكل نوع تغطية", en: "A corporate site with a page per line of cover" },
      { ar: "ملف تعريفي يشرح السندات بلغة المشتري", en: "A profile explaining bonds in the buyer's language" },
      { ar: "رسالة واحدة على الشاشة وفي الورق", en: "One message on screen and on paper" },
    ],
  },
  {
    slug: "trustech",
    name: { ar: "تراستك للمقاولات", en: "Trustech Building Contracting" },
    sector: "construction",
    markets: ["ae", "eu"],
    lede: {
      ar: "مجموعة مقاولات وتطوير عقاري بين الإمارات وبريطانيا، سجلّها يمتدّ منذ 1982. بنينا موقعها الذي يعرض هذا السجلّ، ثم ملف مشروع «سكاي فيو» الذي يُرسَل إلى المستثمر — الموقع يقول من هم، والملف يقول ما يعرضونه الآن.",
      en: "A contracting and property development group between the UAE and the UK, with a record going back to 1982. We built the site that presents that record, then the Sky View project profile sent to investors — the site says who they are, the profile says what they are offering now.",
    },
    results: [
      { ar: "موقع يعرض سجلًّا يمتدّ أربعة عقود", en: "A site presenting a four-decade record" },
      { ar: "ملف مشروع بالشركاء والمخططات والوحدات", en: "A project profile with partners, plans, and unit types" },
      { ar: "مادة تصلح للمستثمر لا للزائر العابر", en: "Material fit for an investor, not a passing visitor" },
    ],
  },
  {
    slug: "hennawy",
    name: { ar: "شركة الحناوي", en: "Al Hennawy Co." },
    sector: "energy",
    markets: ["eg"],
    lede: {
      ar: "شركة تصنيع مناديل ورقية وكيماويات تبيع لشركات لا لأفراد. بنينا هويتها على ثلاث إشارات في شكل واحد — حرف الاسم وأنبوب اختبار وورقة نبات — ثم ملفًّا تعريفيًا يمشي بالمشتري من المصنع إلى المنتج إلى الشراكات.",
      en: "A tissue-paper and chemicals manufacturer selling to businesses, not consumers. We built its identity on three signals in one shape — the initial, a test tube, a leaf — then a profile that walks a buyer from the plant to the product to the partnerships.",
    },
    results: [
      { ar: "علامة تحمل الصناعة والبيئة معًا", en: "A mark carrying both the industry and the environment" },
      { ar: "ملف تعريفي موجّه لمشترٍ صناعي", en: "A profile written for an industrial buyer" },
      { ar: "العلامة نفسها على المصنع والورق", en: "The same brand on the plant and on paper" },
    ],
  },
  {
    slug: "sara-younis",
    name: { ar: "سارة يونس", en: "Sara Younis" },
    sector: "ecommerce",
    markets: [],
    lede: {
      ar: "علامة أزياء نسائية أرادت أن تبدو مقتصدة وراقية في آنٍ. بنينا الهوية على هذا القيد — حرفان وشكل بيضاوي ولا زخرفة — ثم بنينا المتجر على القاعدة نفسها: الصورة تتكلّم والواجهة تصمت.",
      en: "A womenswear label that wanted to look restrained and premium at once. We built the identity on that constraint — two letters, an oval, no ornament — then built the store on the same rule: the photography speaks and the interface keeps quiet.",
    },
    results: [
      { ar: "هوية مقتصدة تحتمل التكرار اليومي", en: "A restrained identity that survives daily repetition" },
      { ar: "متجر يقصّر الطريق من التصفّح إلى الشراء", en: "A store that shortens the path from browsing to buying" },
      { ar: "العلامة نفسها على المتجر والعبوة", en: "The same brand on the store and the packaging" },
    ],
  },
  {
    slug: "profitmax",
    name: { ar: "بروفيت ماكس للاستثمار", en: "Profit Max Investments" },
    sector: "finance",
    markets: ["eu", "ae"],
    lede: {
      ar: "شركة استثمار تعمل من بريطانيا والإمارات. بدأ العمل من الهوية — شعارٌ يجمع حرف الاسم بسهم صاعد يقول تخصّصها دون شرح — ثم امتدّ إلى موقع ثنائي اللغة، ثم إلى ملف تعريفي يُرسَل إلى المستثمر. ثلاثة مخرجات، وعلامة واحدة تتكلّم فيها كلّها.",
      en: "An investment firm operating out of the UK and the UAE. It began with the identity — a mark folding the initial into a rising arrow that states the specialism without explaining it — then extended into a bilingual site, then into a profile sent to investors. Three outputs, one brand speaking in all of them.",
    },
    results: [
      { ar: "هوية وموقع وملف بنَفَس واحد", en: "Identity, site, and profile in one breath" },
      { ar: "حضور يخاطب سوقين بلغتين", en: "A presence addressing two markets in two languages" },
      { ar: "مسار واضح من الزيارة إلى الاستشارة", en: "A clear path from visit to consultation" },
    ],
  },
  {
    slug: "alhayat",
    name: { ar: "مزرعة الحياة للدواجن", en: "Alhayat Poultry Farm" },
    sector: "food",
    markets: ["sa"],
    lede: {
      ar: "مزرعة دواجن في الرياض. بنينا الهوية من عناصر المزرعة نفسها — شمس وسنبلة وأرض زراعية — ثم متجرًا إلكترونيًا يعرض المنتجات ويستقبل الطلبات، فصار ما يراه العميل على العبوة هو نفسه ما يراه على الشاشة.",
      en: "A poultry farm in Riyadh. We built the identity from the farm's own elements — sun, wheat spike, cultivated land — then an online store that presents the products and takes orders, so what a customer sees on the pack is what they see on screen.",
    },
    results: [
      { ar: "هوية مبنيّة على طبيعة المزرعة لا على قوالب", en: "An identity built from the farm, not from templates" },
      { ar: "متجر يستقبل الطلبات مباشرةً", en: "A store that takes orders directly" },
      { ar: "علامة واحدة على العبوة والشاشة", en: "One brand on the pack and on screen" },
    ],
  },
  {
    slug: "adg",
    name: { ar: "إيه دي جي", en: "ADG Real Estate" },
    sector: "realestate",
    markets: ["ge", "lb"],
    lede: {
      ar: "بدأ التعاون بهوية بصرية لشركة عقارات تعمل في جورجيا ولبنان، ثم امتدّ إلى ملف تعريفي يُرسَل إلى المستثمرين، ثم إلى إدارة حضورها على السوشيال ميديا. العلامة التي بنيناها هي التي تتكلّم في الملف وفي المحتوى اليومي — ولهذا تُقرأ الثلاثة كصوت واحد.",
      en: "The relationship began with an identity for a real estate company working across Georgia and Lebanon, then extended into a company profile sent to investors, then into running its social presence. The brand we built is the one that speaks in the profile and in the daily content — which is why the three read as one voice.",
    },
    results: [
      { ar: "هوية موحّدة عبر سوقين", en: "One identity across two markets" },
      { ar: "ملف تعريفي يُرسَل إلى المستثمر دون اعتذار", en: "A profile sent to an investor without apology" },
      { ar: "محتوى يبرز الفرص الاستثمارية بوضوح", en: "Content that presents investment opportunities clearly" },
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
