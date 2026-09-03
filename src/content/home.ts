import type { Bi } from "../i18n";

/**
 * محتوى الصفحة الرئيسية — ثنائي اللغة.
 * النسخة الإنجليزية ليست ترجمة حرفية: كل لغة مكتوبة بإيقاعها.
 * المكوّنات لا تحتوي أي نصّ ثابت — كل شيء يمرّ من هنا.
 */

export const brand = {
  name: { ar: "دَعمة للحلول الرقمية", en: "Daamah Digital Solutions" } as Bi,
  short: { ar: "دَعمة", en: "Daamah" } as Bi,
  founded: 2018,
  domain: "daamah.net",
  email: "info@daamah.net",
  phone: "+971 56 605 1140",
  phoneRaw: "+971566051140",
  whatsapp: "https://wa.me/971566051140",
} as const;

export const navItems: { href: string; label: Bi }[] = [
  { href: "/about", label: { ar: "من نحن", en: "About" } },
  { href: "/services", label: { ar: "خدماتنا", en: "Services" } },
  { href: "/work", label: { ar: "أعمالنا", en: "Work" } },
  { href: "/process", label: { ar: "كيف نعمل", en: "Process" } },
  { href: "/packages", label: { ar: "باقاتنا", en: "Packages" } },
];

export const ui = {
  navCta: { ar: "ابدأ مشروعك", en: "Start a project" } as Bi,
  menu: { ar: "القائمة", en: "Menu" } as Bi,
  close: { ar: "إغلاق", en: "Close" } as Bi,
  langLabel: { ar: "تغيير اللغة", en: "Change language" } as Bi,
  themeLabel: { ar: "تبديل الوضع الداكن", en: "Toggle dark mode" } as Bi,
  themeDark: { ar: "الوضع الداكن", en: "Dark mode" } as Bi,
  themeLight: { ar: "الوضع الفاتح", en: "Light mode" } as Bi,
  whatsappFab: { ar: "تواصل معنا", en: "Chat with us" } as Bi,
};

export const hero = {
  status: { ar: "نعمل منذ 2018", en: "Working since 2018" } as Bi,
  /* السطور مفصولة يدويًا — الكسر جزء من التصميم لا نتيجة له */
  headline: {
    ar: ["نبني حضورًا رقميًا", "يُرى، ويُفهم،", "ويُختار."],
    en: ["Presence that gets", "seen, understood,", "and chosen."],
  } as Bi<string[]>,
  /* السطر الأخير يحمل النقطة الحمراء — الأحمر الوحيد في الهيرو */
  intro: {
    ar: "هوية بصرية، موقع إلكتروني، ومحتوى يتكلّم عنك — منظومة رقمية واحدة تُبنى على فهم سوقك، لا على التخمين.",
    en: "Brand identity, websites, and content that speaks for you — one digital system, built on an understanding of your market rather than a guess at it.",
  } as Bi,
  primary: { ar: "ابدأ مشروعك", en: "Start a project" } as Bi,
  secondary: { ar: "شاهد أعمالنا", en: "See our work" } as Bi,
  markets: {
    ar: "السعودية · الإمارات · مصر · أوروبا",
    en: "Saudi Arabia · UAE · Egypt · Europe",
  } as Bi,
  scroll: { ar: "مرّر", en: "Scroll" } as Bi,
};

/** شريط الأعمال أسفل الهيرو — إثبات بصري قبل أي كلام. */
export const strip: { src: string; label: Bi }[] = [
  { src: "/assets/work/brand-buildingline.jpg", label: { ar: "بيلدنج لاين", en: "Building Line" } },
  { src: "/assets/work/web-fragancia.jpg", label: { ar: "فراجانسيا", en: "Fragancia" } },
  { src: "/assets/work/social-ecovista.jpg", label: { ar: "إيكو فيستا", en: "Eco Vista" } },
  { src: "/assets/work/brand-amlak.jpg", label: { ar: "أملاك العقارية", en: "Amlak" } },
  { src: "/assets/work/web-vibrant.jpg", label: { ar: "فايبرانت ديزاين", en: "Vibrant Design" } },
  { src: "/assets/work/brand-elitegate.jpg", label: { ar: "إيليت جيت", en: "Elitegate" } },
  { src: "/assets/work/social-skyshooter.jpg", label: { ar: "سكاي شوتر", en: "Sky Shooter" } },
  { src: "/assets/work/brand-basmat.jpg", label: { ar: "بصمة العمران", en: "Basmat Alomran" } },
];

export const about = {
  index: "01",
  label: { ar: "من نحن", en: "About" } as Bi,
  lede: {
    ar: ["في سوق مزدحم لا يفوز الأفضل دائمًا،", "بل الأوضح والأقرب", "والأكثر حضورًا."],
    en: ["In a crowded market the best", "rarely wins — the clearest", "and most present does."],
  } as Bi<string[]>,
  body: {
    ar: "منذ 2018 ونحن نعمل مع شركات في الخليج ومصر وأوروبا. لا نبدأ من التنفيذ: نفهم مشروعك، نحلّل سوقك، وندرك كيف يفكّر عميلك — ثم نحوّل ذلك إلى هوية تعبّر عنك، وموقع يعرضك باحتراف، وتسويق يجلب نتائج.",
    en: "Since 2018 we have worked with companies across the Gulf, Egypt, and Europe. We don't start with execution — we study your business, analyse your market, and learn how your customer thinks. Only then do we turn that into an identity, a website, and marketing that performs.",
  } as Bi,
  link: { ar: "اقرأ رسالتنا", en: "Read our mission" } as Bi,
  pillars: [
    {
      no: "01",
      title: { ar: "نفهم السوق قبل أن نبدأ", en: "We study the market first" } as Bi,
      desc: {
        ar: "بحث في القطاع والمنافسين والجمهور المستهدف قبل أول قرار بصري.",
        en: "Sector, competitors, and target audience — mapped before the first visual decision.",
      } as Bi,
    },
    {
      no: "02",
      title: { ar: "نصمّم للنتيجة لا للإعجاب", en: "We design for outcomes" } as Bi,
      desc: {
        ar: "كل عنصر في التصميم له غاية: وضوح، أو ثقة، أو تحويل.",
        en: "Every element earns its place through clarity, trust, or conversion.",
      } as Bi,
    },
    {
      no: "03",
      title: { ar: "نبقى بعد التسليم", en: "We stay past launch" } as Bi,
      desc: {
        ar: "نراقب الأداء بعد الإطلاق ونحسّنه — الشراكة لا تنتهي عند التسليم.",
        en: "We track performance after launch and keep improving it. Delivery isn't the end.",
      } as Bi,
    },
  ],
  stats: [
    { value: 7, suffix: "+", label: { ar: "سنوات خبرة", en: "Years" } as Bi },
    { value: 150, suffix: "+", label: { ar: "مشروع منجز", en: "Projects" } as Bi },
    { value: 100, suffix: "+", label: { ar: "عميل", en: "Clients" } as Bi },
    { value: 10, suffix: "+", label: { ar: "قطاعات", en: "Sectors" } as Bi },
  ],
};

/* ─────────────────────────────────────────────
   (02) الخدمات
   ───────────────────────────────────────────── */
export const services = {
  index: "02",
  label: { ar: "خدماتنا", en: "Services" } as Bi,
  lede: {
    ar: ["كل ما تحتاجه شركتك", "تحت سقف واحد."],
    en: ["Everything your company", "needs, under one roof."],
  } as Bi<string[]>,
  body: {
    ar: "لا نبيع خدمات منفصلة. كل خدمة هنا جزء من منظومة واحدة تخدم هدفًا واحدًا: أن يراك عميلك، ويفهمك، ويختارك.",
    en: "We don't sell detached services. Each one below is part of a single system serving a single goal: that your customer sees you, understands you, and chooses you.",
  } as Bi,
  items: [
    {
      no: "01",
      slug: "branding",
      name: { ar: "الهوية البصرية", en: "Branding" } as Bi,
      en: "Branding",
      desc: {
        ar: "هوية كاملة تعكس قوة مشروعك وتترك انطباعًا يبقى — بدليل استخدام وملفات مفتوحة.",
        en: "A complete identity that carries your weight and leaves a lasting impression — with a usage guide and open files.",
      } as Bi,
    },
    {
      no: "02",
      slug: "web-development",
      name: { ar: "تطوير المواقع", en: "Web Development" } as Bi,
      en: "Web Development",
      desc: {
        ar: "مواقع سريعة ومتجاوبة تعرض خدماتك بوضوح وتحوّل الزائر إلى عميل.",
        en: "Fast, responsive sites that present your services clearly and turn visitors into clients.",
      } as Bi,
    },
    {
      no: "03",
      slug: "social-media",
      name: { ar: "إدارة السوشيال ميديا", en: "Social Media" } as Bi,
      en: "Social Media",
      desc: {
        ar: "محتوى بصري منتظم يبني حضورك ويتكلّم بلغة جمهورك.",
        en: "Consistent visual content that builds your presence and speaks your audience's language.",
      } as Bi,
    },
    {
      no: "04",
      slug: "digital-marketing",
      name: { ar: "التسويق الرقمي", en: "Digital Marketing" } as Bi,
      en: "Digital Marketing",
      desc: {
        ar: "استراتيجيات مبنية على بيانات سوقك، لا على تخمين — بأهداف ومؤشرات واضحة.",
        en: "Strategies built on your market's data rather than a guess — with clear goals and metrics.",
      } as Bi,
    },
    {
      no: "05",
      slug: "media-buying",
      name: { ar: "شراء المساحات الإعلانية", en: "Media Buying" } as Bi,
      en: "Media Buying",
      desc: {
        ar: "إدارة الحملات باحتراف للوصول إلى جمهورك بدقّة وبأقل تكلفة ممكنة.",
        en: "Campaigns managed to reach precisely the right audience at the lowest viable cost.",
      } as Bi,
    },
    {
      no: "06",
      slug: "performance-marketing",
      name: { ar: "تسويق الأداء", en: "Performance Marketing" } as Bi,
      en: "Performance Marketing",
      desc: {
        ar: "تحسين مستمر للأداء لتحقيق أعلى عائد ممكن من كل ريال تنفقه.",
        en: "Continuous optimisation to get the highest possible return on every unit you spend.",
      } as Bi,
    },
  ],
};

/* ─────────────────────────────────────────────
   (03) الأعمال
   ───────────────────────────────────────────── */
export type WorkCategory = "brand" | "web" | "social";

export const work = {
  index: "03",
  label: { ar: "أعمالنا", en: "Work" } as Bi,
  lede: {
    ar: ["أكثر من 150 مشروعًا", "في 10 قطاعات."],
    en: ["More than 150 projects", "across 10 sectors."],
  } as Bi<string[]>,
  filters: [
    { key: "all", label: { ar: "الكل", en: "All" } as Bi },
    { key: "brand", label: { ar: "هوية بصرية", en: "Branding" } as Bi },
    { key: "web", label: { ar: "مواقع", en: "Websites" } as Bi },
    { key: "social", label: { ar: "سوشيال ميديا", en: "Social" } as Bi },
  ] as { key: WorkCategory | "all"; label: Bi }[],
  items: [
    {
      slug: "building-line",
      cat: "brand" as WorkCategory,
      name: { ar: "بيلدنج لاين", en: "Building Line" } as Bi,
      sector: { ar: "مقاولات — السعودية", en: "Construction — Saudi Arabia" } as Bi,
      image: "/assets/work/brand-buildingline.jpg",
    },
    {
      slug: "amlak",
      cat: "brand" as WorkCategory,
      name: { ar: "أملاك العقارية", en: "Amlak Real Estate" } as Bi,
      sector: { ar: "عقارات — جورجيا والسعودية", en: "Real estate — Georgia & Saudi" } as Bi,
      image: "/assets/work/brand-amlak.jpg",
    },
    {
      slug: "elitegate",
      cat: "brand" as WorkCategory,
      name: { ar: "إيليت جيت", en: "Elitegate Properties" } as Bi,
      sector: { ar: "استثمار عقاري", en: "Property investment" } as Bi,
      image: "/assets/work/brand-elitegate.jpg",
    },
    {
      slug: "basmat-alomran",
      cat: "brand" as WorkCategory,
      name: { ar: "بصمة العمران", en: "Basmat Alomran" } as Bi,
      sector: { ar: "مقاولات — السعودية", en: "Construction — Saudi Arabia" } as Bi,
      image: "/assets/work/brand-basmat.jpg",
    },
    {
      slug: "inmaa",
      cat: "brand" as WorkCategory,
      name: { ar: "إنماء للمقاولات", en: "Inmaa Constructions" } as Bi,
      sector: { ar: "مقاولات", en: "Construction" } as Bi,
      image: "/assets/work/brand-inmaa.jpg",
    },
    {
      slug: "adg-brand",
      cat: "brand" as WorkCategory,
      name: { ar: "إيه دي جي", en: "ADG Real Estate" } as Bi,
      sector: { ar: "عقارات — جورجيا ولبنان", en: "Real estate — Georgia & Lebanon" } as Bi,
      image: "/assets/work/brand-adg.jpg",
    },
    {
      slug: "fragancia",
      cat: "web" as WorkCategory,
      name: { ar: "فراجانسيا", en: "Fragancia" } as Bi,
      sector: { ar: "متجر إلكتروني — عطور", en: "E-commerce — fragrance" } as Bi,
      image: "/assets/work/web-fragancia.jpg",
    },
    {
      slug: "vibrant-design",
      cat: "web" as WorkCategory,
      name: { ar: "فايبرانت ديزاين", en: "Vibrant Design" } as Bi,
      sector: { ar: "تصميم داخلي", en: "Interior design" } as Bi,
      image: "/assets/work/web-vibrant.jpg",
    },
    {
      slug: "web-contracting",
      cat: "web" as WorkCategory,
      name: { ar: "مجموعة مقاولات", en: "Contracting Group" } as Bi,
      sector: { ar: "مقاولات — الإمارات", en: "Construction — UAE" } as Bi,
      image: "/assets/work/web-contracting.jpg",
    },
    {
      slug: "insurance",
      cat: "web" as WorkCategory,
      name: { ar: "شركة تأمين", en: "Insurance Group" } as Bi,
      sector: { ar: "تأمين ومال", en: "Insurance & finance" } as Bi,
      image: "/assets/work/web-insurance.jpg",
    },
    {
      slug: "fashion-store",
      cat: "web" as WorkCategory,
      name: { ar: "علامة أزياء", en: "SV Fashion" } as Bi,
      sector: { ar: "متجر إلكتروني — أزياء", en: "E-commerce — fashion" } as Bi,
      image: "/assets/work/web-fashion.jpg",
    },
    {
      slug: "eco-vista",
      cat: "social" as WorkCategory,
      name: { ar: "إيكو فيستا", en: "Eco Vista" } as Bi,
      sector: { ar: "مقاولات — السعودية", en: "Construction — Saudi Arabia" } as Bi,
      image: "/assets/work/social-ecovista.jpg",
    },
    {
      slug: "sky-shooter",
      cat: "social" as WorkCategory,
      name: { ar: "سكاي شوتر", en: "Sky Shooter" } as Bi,
      sector: { ar: "تصوير جوي — الإمارات", en: "Aerial filming — UAE" } as Bi,
      image: "/assets/work/social-skyshooter.jpg",
    },
    {
      slug: "green-flash",
      cat: "social" as WorkCategory,
      name: { ar: "جرين فلاش", en: "Green Flash" } as Bi,
      sector: { ar: "صناعي وطاقة", en: "Industrial & energy" } as Bi,
      image: "/assets/work/social-greenflash.jpg",
    },
    {
      slug: "ahl-alquran",
      cat: "social" as WorkCategory,
      name: { ar: "أكاديمية أهل القرآن", en: "Ahl Alquran Academy" } as Bi,
      sector: { ar: "تعليم — أمريكا وأوروبا", en: "Education — US & Europe" } as Bi,
      image: "/assets/work/social-ahlalquran.jpg",
    },
    {
      slug: "adg-social",
      cat: "social" as WorkCategory,
      name: { ar: "إيه دي جي العقارية", en: "ADG Realestate" } as Bi,
      sector: { ar: "استثمار عقاري — جورجيا", en: "Property investment — Georgia" } as Bi,
      image: "/assets/work/social-adg.jpg",
    },
  ],
  empty: { ar: "لا أعمال في هذه الفئة بعد.", en: "No work in this category yet." } as Bi,
  allLabel: { ar: "شاهد كل الأعمال", en: "See all work" } as Bi,
};

/* ─────────────────────────────────────────────
   (04) كيف نعمل
   ───────────────────────────────────────────── */
export const process = {
  index: "04",
  label: { ar: "كيف نعمل", en: "Process" } as Bi,
  lede: {
    ar: ["خمس خطوات واضحة", "من الفكرة إلى النتيجة."],
    en: ["Five clear steps", "from idea to outcome."],
  } as Bi<string[]>,
  steps: [
    {
      no: "01",
      title: { ar: "الفهم والتحليل", en: "Understand & analyse" } as Bi,
      desc: {
        ar: "نفهم مشروعك، ونحلّل سوقك وجمهورك المستهدف قبل أي قرار تنفيذي.",
        en: "We study your business and analyse your market and target audience before any execution decision.",
      } as Bi,
    },
    {
      no: "02",
      title: { ar: "التخطيط الاستراتيجي", en: "Strategy" } as Bi,
      desc: {
        ar: "نضع خطة واضحة بأهداف قابلة للقياس وجدول زمني تلتزم به الطرفان.",
        en: "A clear plan with measurable goals and a timeline both sides commit to.",
      } as Bi,
    },
    {
      no: "03",
      title: { ar: "التنفيذ", en: "Execution" } as Bi,
      desc: {
        ar: "نحوّل الخطة إلى واقع — تصميم وتطوير ومحتوى، بمراجعات في كل مرحلة.",
        en: "We turn the plan into reality — design, build, and content, with review at every stage.",
      } as Bi,
    },
    {
      no: "04",
      title: { ar: "الإطلاق", en: "Launch" } as Bi,
      desc: {
        ar: "نطلق المشروع ونراقب أداءه من اليوم الأول لا من الشهر الأول.",
        en: "We launch and watch performance from day one, not month one.",
      } as Bi,
    },
    {
      no: "05",
      title: { ar: "المتابعة والتحسين", en: "Optimise" } as Bi,
      desc: {
        ar: "نقرأ الأرقام ونحسّن باستمرار — الشراكة لا تنتهي عند التسليم.",
        en: "We read the numbers and keep improving. The partnership doesn't end at delivery.",
      } as Bi,
    },
  ],
};

/* ─────────────────────────────────────────────
   (05) الباقات
   بلا أسعار عمدًا: الباقة تُعرِّف النطاق وتُموضِع الخدمة، والسعر
   يُبنى على المشروع نفسه في المحادثة. `badge` يعلّم الباقة المميّزة.
   ───────────────────────────────────────────── */
export const packages = {
  index: "05",
  label: { ar: "باقاتنا", en: "Packages" } as Bi,
  lede: {
    ar: ["نطاق واضح،", "متّفق عليه قبل البدء."],
    en: ["A clear scope,", "agreed before we start."],
  } as Bi<string[]>,
  body: {
    ar: "كل باقة تُبنى على حجم مشروعك وسوقك، فالسعر يُحدَّد بعد أن نفهم ما تحتاجه فعلًا. لا بنود مخفية ولا مفاجآت في الفاتورة — كل ما هو داخل الباقة موضّح قبل التوقيع.",
    en: "Each package is shaped around the size of your project and your market, so the price follows once we understand what you actually need. No hidden line items and no surprises on the invoice.",
  } as Bi,
  cta: { ar: "اطلب عرض سعر", en: "Request a quote" } as Bi,
  note: {
    ar: "تحتاج شيئًا خارج الباقات؟ احكِ لنا عن مشروعك ونرجع لك بعرض مخصّص.",
    en: "Need something outside these? Tell us about the project and we'll quote it.",
  } as Bi,
  items: [
    {
      slug: "identity",
      no: "01",
      name: { ar: "الهويــة", en: "Identity" } as Bi,
      tagline: { ar: "ابدأ شركتك باحتراف", en: "Start out looking established" } as Bi,
      badge: null as Bi | null,
      featured: false,
      features: [
        { ar: "هوية بصرية كاملة", en: "Full visual identity" } as Bi,
        { ar: "ملف تعريفي احترافي", en: "Company profile" } as Bi,
        { ar: "دليل استخدام العلامة", en: "Brand usage guide" } as Bi,
        { ar: "ملفات مفتوحة Ai + PSD", en: "Open Ai + PSD files" } as Bi,
      ],
    },
    {
      slug: "full",
      no: "02",
      name: { ar: "الباقة المتكاملة", en: "Complete" } as Bi,
      tagline: { ar: "كل ما تحتاجه شركتك", en: "Everything your company needs" } as Bi,
      badge: { ar: "الأكثر طلبًا", en: "Most requested" } as Bi | null,
      featured: true,
      features: [
        { ar: "موقع إلكتروني متكامل", en: "Complete website" } as Bi,
        { ar: "هوية بصرية كاملة", en: "Full visual identity" } as Bi,
        { ar: "ملف تعريفي احترافي", en: "Company profile" } as Bi,
        { ar: "شات بوت 24 ساعة", en: "24/7 chatbot" } as Bi,
      ],
    },
    {
      slug: "website",
      no: "03",
      name: { ar: "الموقــع", en: "Website" } as Bi,
      tagline: { ar: "موقعك الإلكتروني صار ضرورة", en: "A website is no longer optional" } as Bi,
      badge: null as Bi | null,
      featured: false,
      features: [
        { ar: "موقع إلكتروني متجاوب", en: "Responsive website" } as Bi,
        { ar: "دومين مجاني", en: "Free domain" } as Bi,
        { ar: "استضافة مجانية", en: "Free hosting" } as Bi,
        { ar: "تهيئة أساسية للسيو", en: "Baseline SEO setup" } as Bi,
      ],
    },
  ],
};

/* ─────────────────────────────────────────────
   (06) أسئلة متكررة
   ───────────────────────────────────────────── */
export const faq = {
  index: "06",
  label: { ar: "أسئلة متكررة", en: "FAQ" } as Bi,
  lede: {
    ar: ["أسئلة،", "وإجاباتها."],
    en: ["Questions,", "answered."],
  } as Bi<string[]>,
  items: [
    {
      q: { ar: "كم يستغرق تنفيذ المشروع؟", en: "How long does a project take?" } as Bi,
      a: {
        ar: "الهوية البصرية من أسبوعين إلى ثلاثة، والموقع من ثلاثة إلى خمسة أسابيع حسب حجم المحتوى وعدد الصفحات. نضع جدولًا زمنيًا واضحًا قبل البدء ونلتزم به.",
        en: "Brand identity takes two to three weeks; a website three to five, depending on content volume and page count. We agree a clear timeline before starting and hold to it.",
      } as Bi,
    },
    {
      q: { ar: "هل أحصل على الملفات المفتوحة؟", en: "Do I get the source files?" } as Bi,
      a: {
        ar: "نعم. تستلم كل ملفات الهوية مفتوحة بصيغتَي Ai و PSD، مع دليل استخدام يشرح الألوان والخطوط وطريقة التطبيق.",
        en: "Yes. You receive every identity file open in Ai and PSD, plus a usage guide covering colours, type, and application.",
      } as Bi,
    },
    {
      q: { ar: "ماذا لو كان لديّ هوية بالفعل؟", en: "What if I already have an identity?" } as Bi,
      a: {
        ar: "نشتغل عليها كما هي. نطوّر الموقع والمحتوى بما يتماشى مع هويتك الحالية، ولو احتاجت تحديثًا نقترح ما يلزم قبل أن نبدأ.",
        en: "We work with it as it stands. We build the site and content to match your current identity, and if it needs updating we'll say so before we start.",
      } as Bi,
    },
    {
      q: { ar: "هل تعملون خارج السعودية؟", en: "Do you work outside Saudi Arabia?" } as Bi,
      a: {
        ar: "نعم. نعمل منذ 2018 مع شركات في السعودية والإمارات ومصر وأوروبا وجورجيا، والتواصل والتسليم يتمّان عن بُعد بالكامل.",
        en: "Yes. Since 2018 we've worked with companies in Saudi Arabia, the UAE, Egypt, Europe, and Georgia. Communication and delivery are fully remote.",
      } as Bi,
    },
    {
      q: { ar: "كيف تتم عملية الدفع؟", en: "How does payment work?" } as Bi,
      a: {
        ar: "دفعة أولى عند بدء المشروع والباقي عند التسليم. لا رسوم مخفية — كل ما هو داخل الباقة موضّح قبل التوقيع.",
        en: "A deposit at kickoff and the balance on delivery. No hidden fees — everything included is documented before you sign.",
      } as Bi,
    },
    {
      q: { ar: "ماذا بعد التسليم؟", en: "What happens after delivery?" } as Bi,
      a: {
        ar: "نتابع معك بعد الإطلاق: نراقب الأداء ونقترح تحسينات. الشراكة المستمرة جزء أساسي من طريقة عملنا.",
        en: "We stay with you after launch: tracking performance and proposing improvements. Ongoing partnership is core to how we work.",
      } as Bi,
    },
  ],
};

/* ─────────────────────────────────────────────
   التواصل والفوتر
   ───────────────────────────────────────────── */
export const contact = {
  label: { ar: "تواصل معنا", en: "Contact" } as Bi,
  lede: {
    ar: ["احكِ لنا عن مشروعك،", "ونرجع لك بخطة", "وسعر محدّد."],
    en: ["Tell us about your project,", "and we'll come back with", "a plan and a price."],
  } as Bi<string[]>,
  body: {
    ar: "استشارة أولى مجانية، وبدون التزام. عادةً نرد خلال يوم عمل واحد.",
    en: "First consultation is free, with no commitment. We usually reply within one business day.",
  } as Bi,
  emailLabel: { ar: "راسلنا", en: "Email us" } as Bi,
  whatsappLabel: { ar: "واتساب", en: "WhatsApp" } as Bi,
};

export const footer = {
  tagline: { ar: "الحلول الرقمية وتمكين العلامات", en: "Digital Solutions & Empowering Brands" } as Bi,
  navTitle: { ar: "الموقع", en: "Site" } as Bi,
  contactTitle: { ar: "تواصل", en: "Contact" } as Bi,
  socialTitle: { ar: "تابعنا", en: "Follow" } as Bi,
  rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" } as Bi,
  social: [
    { label: "Instagram", href: "https://instagram.com/daamah.digital.solutions" },
    { label: "Facebook", href: "https://facebook.com/daamah.digital.solutions" },
  ],
};
