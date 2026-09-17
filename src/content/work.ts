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
  | "events"
  | "travel";

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
  { key: "health", label: { ar: "صحّة ولياقة", en: "Health & fitness" } },
  { key: "auto", label: { ar: "سيارات ونقل", en: "Automotive & transport" } },
  { key: "events", label: { ar: "معارض وفعاليات", en: "Events & exhibitions" } },
  { key: "travel", label: { ar: "سياحة وسفر", en: "Travel & tourism" } },
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
  /**
   * شهور المحتوى المنشور — لأعمال السوشيال وحدها.
   *
   * هنا وحدها يكون للعدد معنى واحد لا يلتبس: شهرٌ من المحتوى
   * المنشور. ووضعه على هوية أو موقع يجعله مدّة تنفيذٍ تُقرأ بطئًا
   * لا التزامًا. وهو أصدق ما نملك: «عميل نفّذنا له» يقولها الجميع،
   * و«ثمانية وأربعون شهرًا معه» لا تُدَّعى.
   */
  months?: number;
};

const allWork: WorkItem[] = [
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
    client: "amlak",
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
    markets: ["sa"],
    image: "/assets/work/social-greenflash.jpg",
  },
  {
    slug: "ahl-alquran",
    service: "social",
    months: 13,
    name: { ar: "أكاديمية أهل القرآن", en: "Ahl Alquran Academy" },
    sector: "education",
    markets: ["us", "eu"],
    image: "/assets/work/social-ahlalquran.jpg",
  },
  {
    slug: "adg-social",
    service: "social",
    months: 9,
    name: { ar: "إيه دي جي العقارية", en: "ADG Realestate" },
    sector: "realestate",
    markets: ["ge"],
    image: "/assets/work/social-adg.jpg",
    client: "adg",
  },
  {
    slug: "amlak-social",
    service: "social",
    name: { ar: "أملاك العقارية — المحتوى", en: "Amlak Real Estate — Content" },
    sector: "realestate",
    markets: ["ge", "sa", "eg"],
    note: { ar: "استثمار عقاري", en: "Property investment" },
    image: "/assets/work/social-amlak.jpg",
    client: "amlak",
    months: 28,
  },
  {
    slug: "amlak-revamp",
    service: "social",
    name: { ar: "أملاك العقارية — بعد التجديد", en: "Amlak Real Estate — After the rebrand" },
    sector: "realestate",
    markets: ["ge", "sa"],
    note: { ar: "هوية جديدة", en: "New identity" },
    image: "/assets/work/social-amlak-revamp.jpg",
    client: "amlak",
    months: 7,
  },
  {
    slug: "xtreme-blue",
    service: "social",
    name: { ar: "إكستريم بلو", en: "Xtreme Blue" },
    sector: "energy",
    markets: ["eg"],
    note: { ar: "كيماويات عطرية", en: "Fragrance chemicals" },
    image: "/assets/work/social-xtremeblue.jpg",
    months: 25,
  },
  {
    slug: "muri",
    service: "social",
    name: { ar: "موري العقارية", en: "Muri Real Estate" },
    sector: "realestate",
    markets: ["eg"],
    image: "/assets/work/social-muri.jpg",
    months: 19,
  },
  {
    slug: "swissroll",
    service: "social",
    name: { ar: "سويسرول", en: "Swiss Roll" },
    sector: "food",
    markets: ["eg"],
    note: { ar: "حلويات", en: "Patisserie" },
    image: "/assets/work/social-swissroll.jpg",
    months: 19,
  },
  {
    slug: "vida",
    service: "social",
    name: { ar: "فيدا فيتنس كلوب", en: "Vida Fitness Club" },
    sector: "health",
    markets: ["eg"],
    note: { ar: "نادٍ رياضي", en: "Fitness club" },
    image: "/assets/work/social-vida.jpg",
    months: 16,
  },
  {
    slug: "atm-realestate",
    service: "social",
    name: { ar: "إيه تي إم للتطوير العقاري", en: "ATM Real Estate Development" },
    sector: "realestate",
    markets: ["eg"],
    image: "/assets/work/social-atm.jpg",
    months: 16,
  },
  {
    slug: "nasea",
    service: "social",
    name: { ar: "ناصع", en: "Nasea" },
    sector: "energy",
    markets: ["eg"],
    note: { ar: "منظّفات", en: "Cleaning products" },
    image: "/assets/work/social-nasea.jpg",
    months: 13,
  },
  {
    slug: "godran",
    service: "social",
    name: { ar: "غدران العقارية", en: "Godran Real Estate" },
    sector: "realestate",
    markets: ["eg"],
    image: "/assets/work/social-godran.jpg",
    months: 14,
  },
  {
    slug: "alawael",
    service: "social",
    name: { ar: "أملاك الأوائل", en: "Amlak Alawael" },
    sector: "realestate",
    markets: ["ge", "sa"],
    image: "/assets/work/social-alawael.jpg",
    months: 11,
  },
  {
    slug: "royal-consultant",
    service: "social",
    name: { ar: "رويال كونسلتنتس", en: "Royal Consultants" },
    sector: "business",
    markets: ["eg"],
    note: { ar: "أنظمة إدارة", en: "Business systems" },
    image: "/assets/work/social-royalconsultant.jpg",
    months: 7,
  },
  {
    slug: "alhaitham",
    service: "social",
    name: { ar: "الهيثم للاستشارات", en: "Al Haitham Consultancy" },
    sector: "business",
    markets: ["eg"],
    note: { ar: "استشارات قانونية", en: "Legal consultancy" },
    image: "/assets/work/social-alhaitham.jpg",
  },
  {
    slug: "almuttahida",
    service: "social",
    name: { ar: "المتحدة للخدمات الجمركية", en: "United Customs Services" },
    sector: "business",
    markets: ["eg"],
    note: { ar: "تخليص جمركي", en: "Customs clearance" },
    image: "/assets/work/social-almuttahida.jpg",
  },
  {
    slug: "corpenta",
    service: "social",
    name: { ar: "كوربنتا", en: "Corpenta" },
    sector: "business",
    markets: ["sa"],
    note: { ar: "تأسيس شركات", en: "Company formation" },
    image: "/assets/work/social-corpenta.jpg",
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
    months: 48,
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

  /* ── سوشيال من أرشيف العملاء — مجمّع بالشهر (scripts/import-social.mjs).
     `months` عدد الشهور الموثّقة في الأرشيف، ويُترك لما دون ثلاثة:
     «شهر واحد متواصل» لا يقول شيئًا ── */
  {
    slug: "saif-events",
    service: "social",
    months: 7,
    name: { ar: "سيف للفعاليات", en: "Saif Events" },
    sector: "events",
    markets: ["sa"],
    note: { ar: "تنظيم فعاليات", en: "Event management" },
    image: "/assets/work/social-saifevents.jpg",
  },
  {
    slug: "dr-asmaa-saeed",
    service: "social",
    months: 12,
    name: { ar: "د. أسماء سعيد", en: "Dr. Asmaa Saeed" },
    sector: "health",
    markets: [],
    note: { ar: "صحّة نفسية", en: "Mental health" },
    image: "/assets/work/social-asmaasaeed.jpg",
  },
  {
    slug: "eliodoro-derma",
    service: "social",
    months: 10,
    name: { ar: "إليودورو ديرما", en: "Eliodoro Derma" },
    sector: "health",
    markets: ["eg"],
    note: { ar: "عناية بالبشرة", en: "Skincare" },
    image: "/assets/work/social-eliodoro.jpg",
  },
  {
    slug: "alamein-social",
    service: "social",
    months: 10,
    name: { ar: "مصنع هياكل العلمين — المحتوى", en: "Alamein Trailers — Content" },
    sector: "energy",
    markets: ["sa"],
    note: { ar: "مقطورات", en: "Trailers" },
    image: "/assets/work/social-alamein.jpg",
  },
  {
    slug: "alraghad-social",
    service: "social",
    months: 14,
    name: { ar: "الرغد — المحتوى", en: "Al Raghad — Content" },
    sector: "ecommerce",
    markets: ["eg"],
    note: { ar: "مجوهرات", en: "Jewellery" },
    image: "/assets/work/social-alraghad.jpg",
  },
  {
    slug: "alqalaa",
    service: "social",
    months: 13,
    name: { ar: "القلعة للكيماويات", en: "Alqalaa Chemicals" },
    sector: "energy",
    markets: ["eg"],
    note: { ar: "كيماويات", en: "Chemicals" },
    image: "/assets/work/social-alqalaa.jpg",
  },
  {
    slug: "capimax",
    service: "social",
    months: 7,
    name: { ar: "كابيماكس للاستثمار", en: "Capimax Investments" },
    sector: "finance",
    markets: [],
    note: { ar: "استثمار", en: "Investment" },
    image: "/assets/work/social-capimax.jpg",
  },
  {
    slug: "amr-elkazaz",
    service: "social",
    months: 8,
    name: { ar: "أكاديمية عمرو القزاز", en: "Amr El-Kazaz Fitness Academy" },
    sector: "health",
    markets: ["eg"],
    note: { ar: "لياقة وتأهيل", en: "Fitness & training" },
    image: "/assets/work/social-amrelkazaz.jpg",
  },
  {
    slug: "dr-hesham-omar",
    service: "social",
    months: 5,
    name: { ar: "صيدلية د. هشام عمر", en: "Dr. Hesham Omar Pharmacy" },
    sector: "health",
    markets: ["eg"],
    note: { ar: "صيدليات", en: "Pharmacy" },
    image: "/assets/work/social-heshamomar.jpg",
  },
  {
    slug: "ems-elriadh",
    service: "social",
    months: 4,
    name: { ar: "إي إم إس الرياض", en: "EMS Elriadh" },
    sector: "health",
    markets: ["sa"],
    note: { ar: "تدريب EMS", en: "EMS training" },
    image: "/assets/work/social-emselriadh.jpg",
  },
  {
    slug: "almohandes-travels",
    service: "social",
    months: 4,
    name: { ar: "المهندس للسياحة", en: "Almohandes Travels" },
    sector: "travel",
    markets: ["eg"],
    image: "/assets/work/social-almohandes.jpg",
  },
  {
    slug: "natwan",
    service: "social",
    months: 3,
    name: { ar: "نطوان", en: "Natwan" },
    sector: "travel",
    markets: ["sa"],
    note: { ar: "شقق فندقية", en: "Serviced apartments" },
    image: "/assets/work/social-natwan.jpg",
  },
  {
    slug: "techcare-social",
    service: "social",
    months: 3,
    name: { ar: "معامل تك كير — المحتوى", en: "Tech Care Labs — Content" },
    sector: "health",
    markets: ["eg"],
    note: { ar: "تحاليل طبية", en: "Medical labs" },
    image: "/assets/work/social-techcare.jpg",
  },
  {
    slug: "mardi-holding",
    service: "social",
    name: { ar: "ماردي القابضة", en: "Mardi Holding" },
    sector: "realestate",
    markets: ["ge", "sa"],
    note: { ar: "استثمار عقاري", en: "Property investment" },
    image: "/assets/work/social-mardi.jpg",
  },
  {
    slug: "hedaya-dental",
    service: "social",
    name: { ar: "مركز هداية لطب الأسنان", en: "Hedaya Dental Center" },
    sector: "health",
    markets: ["eg"],
    note: { ar: "طب أسنان", en: "Dentistry" },
    image: "/assets/work/social-hedaya.jpg",
  },
  {
    slug: "mohamed-gamal-law",
    service: "social",
    name: { ar: "مكتب محمد جمال للمحاماة", en: "Mohamed Gamal Law Office" },
    sector: "business",
    markets: ["eg"],
    note: { ar: "محاماة", en: "Law" },
    image: "/assets/work/social-mohamedgamal.jpg",
  },
  {
    slug: "profitmax-social",
    service: "social",
    name: { ar: "بروفيت ماكس — المحتوى", en: "Profit Max — Content" },
    sector: "finance",
    markets: ["eu", "ae"],
    image: "/assets/work/social-profitmax.jpg",
    client: "profitmax",
  },
  {
    slug: "trustech-social",
    service: "social",
    name: { ar: "تراستك — المحتوى", en: "Trustech — Content" },
    sector: "construction",
    markets: ["ae", "eu"],
    image: "/assets/work/social-trustech.jpg",
    client: "trustech",
  },
  {
    slug: "4k-studio",
    service: "social",
    name: { ar: "4K ستوديو", en: "4K Studio" },
    sector: "media",
    markets: [],
    note: { ar: "تصوير أفراح", en: "Wedding photography" },
    image: "/assets/work/social-4kstudio.jpg",
  },
  {
    slug: "emaar-alryada",
    service: "social",
    name: { ar: "إعمار الريادة العقارية", en: "Emaar Alryada Real Estate" },
    sector: "realestate",
    markets: [],
    image: "/assets/work/social-emaaralryada.jpg",
  },
  {
    slug: "dr-mohamed-ewida",
    service: "social",
    name: { ar: "د. محمد عويضة لطب الأسنان", en: "Dr. Mohamed Ewida Dental Clinic" },
    sector: "health",
    markets: [],
    note: { ar: "طب أسنان", en: "Dentistry" },
    image: "/assets/work/social-ewida.jpg",
  },
  {
    slug: "fragancia-social",
    service: "social",
    name: { ar: "فراجانسيا — المحتوى", en: "Fragancia — Content" },
    sector: "ecommerce",
    markets: [],
    note: { ar: "عناية وجمال", en: "Beauty & care" },
    image: "/assets/work/social-fragancia.jpg",
  },
  {
    slug: "vibrant-social",
    service: "social",
    name: { ar: "فايبرانت ديزاين — المحتوى", en: "Vibrant Design — Content" },
    sector: "interior",
    markets: [],
    image: "/assets/work/social-vibrant.jpg",
  },
  {
    slug: "bird-area",
    service: "social",
    name: { ar: "بيرد إيريا", en: "Bird Area" },
    sector: "ecommerce",
    markets: [],
    note: { ar: "مستلزمات الحيوانات الأليفة", en: "Pet supplies" },
    image: "/assets/work/social-birdarea.jpg",
  },
];

/**
 * ترتيب العرض بالسوق: العالمي أوّلًا — أوروبا وأمريكا، ثم جورجيا
 * ولبنان — ثم السعودية، ثم الإمارات، ثم مصر، وما لا سوق معروفًا له
 * أخيرًا. رتبة العمل هي أعلى أسواقه، فمشروع لجورجيا والسعودية معًا
 * يُحسب بجورجيا.
 *
 * الترتيب هنا لا في الصفحات: صفحة الأعمال والرئيسية وصفحة الخدمة
 * و«العمل التالي» تقرأ القائمة كما هي، فيتّفق الترتيب في كل مكان.
 * والفرز مستقرّ، فداخل السوق الواحد يبقى الترتيب المكتوب أعلاه.
 */
const MARKET_RANK: Record<MarketKey, number> = { us: 0, eu: 0, ge: 1, lb: 1, sa: 2, ae: 3, eg: 4 };
const rankOf = (w: WorkItem) =>
  w.markets.length ? Math.min(...w.markets.map((m) => MARKET_RANK[m])) : 5;

export const workItems: WorkItem[] = [...allWork].sort((a, b) => rankOf(a) - rankOf(b));

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
    slug: "amlak",
    name: { ar: "أملاك العقارية", en: "Amlak Real Estate" },
    sector: "realestate",
    markets: ["ge", "sa", "eg"],
    since: 2023,
    lede: {
      ar: "شركة تبيع عقارًا في جورجيا لمستثمر خليجي ومصري — أي أن كل منشور يخاطب من لم يرَ المدينة ولا المشروع. بدأ العمل بهوية، ثم ثمانية وعشرين شهرًا متّصلة من المحتوى عبر عشرة مشاريع مسمّاة. ثم كبرت الشركة على شكلها الأول، فبُنيت لها هوية أخرى واستأنف المحتوى بها — وهذان مشروعان لا مشروع بشقّين: العميل واحد والعلامة اثنتان.",
      en: "A company selling property in Georgia to Gulf and Egyptian investors — meaning every post addresses someone who has seen neither the city nor the project. It began with an identity, then twenty-eight unbroken months of content across ten named developments. Then the company outgrew its first look, a second identity was built, and the content resumed inside it — two projects rather than one in two halves: one client, two brands.",
    },
    results: [
      { ar: "خمسة وثلاثون شهرًا متّصلة، بلا شهر منقطع", en: "Thirty-five unbroken months, with no month missed" },
      { ar: "عشرة مشاريع مسمّاة، لكلٍّ لغته البصرية داخل الهوية", en: "Ten named developments, each with its own visual line inside the identity" },
      { ar: "علامة ثانية حين كبرت الشركة على الأولى — والمحتوى لم ينقطع", en: "A second brand once the company outgrew the first — and the content never paused" },
    ],
  },
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
