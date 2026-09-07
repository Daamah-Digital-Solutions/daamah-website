import type { Bi } from "../i18n";

/**
 * محتوى الصفحة الرئيسية — ثنائي اللغة.
 * النسخة الإنجليزية ليست ترجمة حرفية: كل لغة مكتوبة بإيقاعها.
 * المكوّنات لا تحتوي أي نصّ ثابت — كل شيء يمرّ من هنا.
 */

/**
 * رقم منشور، موسومٌ بسوقه.
 *
 * الأرقام قائمة لا حقلًا واحدًا: الرقم المحلي يرفع الثقة والردّ في
 * سوقه، فحين يُضاف رقم سعودي يظهر للسوق السعودي وحده دون أن يتغيّر
 * شيء في المكوّنات.
 */
export type Phone = {
  market: "sa" | "ae" | "eg" | "intl";
  display: string;
  raw: string;
  whatsapp: string;
};

export const brand = {
  name: { ar: "دَعمة للحلول الرقمية", en: "Daamah Digital Solutions" } as Bi,
  short: { ar: "دَعمة", en: "Daamah" } as Bi,
  founded: 2018,
  domain: "daamah.net",
  email: "info@daamah.net",
  /** وصف واحد للعلامة — يُقرأ في البيانات المنظّمة وفي وسوم المشاركة */
  description: {
    ar: "منذ 2018 نبني حضورًا رقميًا متكاملًا للشركات في السعودية والخليج ومصر وأوروبا: هوية بصرية، مواقع إلكترونية، سوشيال ميديا، وتسويق رقمي يحقق نتائج.",
    en: "Since 2018 we have built complete digital presence for companies across Saudi Arabia, the Gulf, Egypt, and Europe: brand identity, websites, social media, and marketing that performs.",
  } as Bi,
  phones: [
    {
      market: "intl",
      display: "+971 56 605 1140",
      raw: "+971566051140",
      whatsapp: "https://wa.me/971566051140",
    },
  ] as Phone[],
  social: [
    "https://instagram.com/daamah.digital.solutions",
    "https://facebook.com/daamah.digital.solutions",
  ],
} as const;

/**
 * الرقم المناسب لسوق — وإلا الدولي.
 *
 * السوق السعودي هو الافتراضي لأنه وجهة التوسّع؛ حين يُضاف رقم سعودي
 * إلى `brand.phones` يلتقطه الموقع كلّه من هنا.
 */
export function phoneFor(market: Phone["market"] = "sa"): Phone {
  return (
    brand.phones.find((p) => p.market === market) ??
    brand.phones.find((p) => p.market === "intl") ??
    brand.phones[0]
  );
}

/** حضورنا في السوق السعودي — إشارات ثقة تتكرّر عبر الصفحات. */
export const saudi = {
  since: 2019,
  note: {
    ar: "نعمل مع شركات سعودية منذ 2019 — بمواعيد وتسليم على توقيت الرياض.",
    en: "We have worked with Saudi companies since 2019 — scheduled and delivered on Riyadh time.",
  } as Bi,
};

export const navItems: { href: string; label: Bi }[] = [
  { href: "/about", label: { ar: "من نحن", en: "About" } },
  { href: "/services", label: { ar: "خدماتنا", en: "Services" } },
  { href: "/work", label: { ar: "أعمالنا", en: "Work" } },
  { href: "/process", label: { ar: "كيف نعمل", en: "Process" } },
  { href: "/solutions", label: { ar: "الحلول", en: "Solutions" } },
  { href: "/blog", label: { ar: "المدوّنة", en: "Journal" } },
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
    ar: "حضور يليق بشركتك، ووصول إلى العملاء المناسبين، ونظام يمسك الفرص قبل أن تضيع — منظومة واحدة تُبنى على فهم سوقك، لا على التخمين.",
    en: "A presence worthy of your company, reach to the right clients, and a system that holds opportunities before they slip — one system, built on understanding your market rather than guessing at it.",
  } as Bi,
  primary: { ar: "ابدأ مشروعك", en: "Start a project" } as Bi,
  secondary: { ar: "شاهد أعمالنا", en: "See our work" } as Bi,
  markets: {
    ar: "السعودية · الإمارات · مصر · أوروبا",
    en: "Saudi Arabia · UAE · Egypt · Europe",
  } as Bi,
};

/**
 * شريط الأعمال أسفل الهيرو — إثبات بصري قبل أي كلام.
 *
 * مفاتيح لا صور: الصورة والاسم يأتيان من `workItems`، فلا يبقى
 * وصف العمل في مكانين يفترقان — وكل بطاقة تعرف صفحتها فتُفتح
 * بالضغط بدل أن تمرّ أمام العين بلا وجهة.
 */
export const stripSlugs = [
  "building-line",
  "fragancia",
  "eco-vista",
  "amlak",
  "vibrant-design",
  "elitegate",
  "sky-shooter",
  "basmat-alomran",
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
      slug: "company-profile",
      name: { ar: "الملف التعريفي", en: "Company Profile" } as Bi,
      en: "Company Profile",
      desc: {
        ar: "ملف يعرّف شركتك ويصلح للتأهيل والعروض — مكتوب ليُقرأ، لا ليُصفّ فيه كل شيء.",
        en: "A profile that introduces your company and holds up in qualification files — written to be read, not to list everything.",
      } as Bi,
    },
    {
      no: "03",
      slug: "web-development",
      name: { ar: "تطوير المواقع", en: "Web Development" } as Bi,
      en: "Web Development",
      desc: {
        ar: "مواقع سريعة ومتجاوبة تعرض خدماتك بوضوح وتحوّل الزائر إلى عميل.",
        en: "Fast, responsive sites that present your services clearly and turn visitors into clients.",
      } as Bi,
    },
    {
      no: "04",
      slug: "seo",
      name: { ar: "تحسين محركات البحث", en: "SEO" } as Bi,
      en: "SEO",
      desc: {
        ar: "أن يجدك من يبحث عن خدمتك في جوجل — ببحث كلمات عربية حقيقي، ومحتوى يُنشر بانتظام.",
        en: "Being found by people searching for what you do — real Arabic keyword research and content published consistently.",
      } as Bi,
    },
    {
      no: "05",
      slug: "social-media",
      name: { ar: "إدارة السوشيال ميديا", en: "Social Media" } as Bi,
      en: "Social Media",
      desc: {
        ar: "محتوى بصري منتظم يبني حضورك ويتكلّم بلغة جمهورك.",
        en: "Consistent visual content that builds your presence and speaks your audience's language.",
      } as Bi,
    },
    {
      no: "06",
      slug: "digital-marketing",
      name: { ar: "التسويق الرقمي", en: "Digital Marketing" } as Bi,
      en: "Digital Marketing",
      desc: {
        ar: "استراتيجيات مبنية على بيانات سوقك، لا على تخمين — بأهداف ومؤشرات واضحة.",
        en: "Strategies built on your market's data rather than a guess — with clear goals and metrics.",
      } as Bi,
    },
    {
      no: "07",
      slug: "media-buying",
      name: { ar: "شراء المساحات الإعلانية", en: "Media Buying" } as Bi,
      en: "Media Buying",
      desc: {
        ar: "إدارة الحملات باحتراف للوصول إلى جمهورك بدقّة وبأقل تكلفة ممكنة.",
        en: "Campaigns managed to reach precisely the right audience at the lowest viable cost.",
      } as Bi,
    },
    {
      no: "08",
      slug: "performance-marketing",
      name: { ar: "تسويق الأداء", en: "Performance Marketing" } as Bi,
      en: "Performance Marketing",
      desc: {
        ar: "تحسين مستمر للأداء لتحقيق أعلى عائد ممكن من كل ريال تنفقه.",
        en: "Continuous optimisation to get the highest possible return on every unit you spend.",
      } as Bi,
    },
    {
      no: "09",
      slug: "crm",
      name: { ar: "أنظمة إدارة الشركات", en: "CRM & Internal Systems" } as Bi,
      en: "CRM & Systems",
      desc: {
        ar: "نظام يعرف حالة كل عميل وكل طلب — مهيّأ على طريقة عملكم لا على قالب جاهز.",
        en: "A system that knows every client and every request — shaped to how you work, not to a template.",
      } as Bi,
    },
  ],
};

/* ─────────────────────────────────────────────
   (03) الأعمال
   ───────────────────────────────────────────── */
/**
 * نصوص قسم الأعمال. البيانات نفسها — الأعمال وتصنيفها وقصص العملاء —
 * في `work.ts`، لأنها صارت أكبر من أن تعيش وسط نصوص الصفحة.
 */
export const work = {
  index: "03",
  label: { ar: "أعمالنا", en: "Work" } as Bi,
  lede: {
    ar: ["أكثر من 150 مشروعًا", "في 10 قطاعات."],
    en: ["More than 150 projects", "across 10 sectors."],
  } as Bi<string[]>,

  /* المرشِّحان: القطاع أوّلًا — «أفهم مجالك» تسبق «أتقن هذه الخدمة» */
  sectorLabel: { ar: "القطاع", en: "Sector" } as Bi,
  serviceLabel: { ar: "الخدمة", en: "Service" } as Bi,
  all: { ar: "الكل", en: "All" } as Bi,
  clear: { ar: "إعادة الضبط", en: "Reset" } as Bi,
  of: { ar: "من", en: "of" } as Bi,

  /* شارة العمل الذي هو فصل من قصّة أطول */
  storyOf: { ar: "من قصة", en: "Part of" } as Bi,
  storyServices: { ar: "خدمات", en: "services" } as Bi,
  /* عدد صور المشروع على البطاقة — يَعِد بما وراءها فيصير للنقر سبب */
  shots: { ar: "صورة", en: "images" } as Bi,
  storyRead: { ar: "اقرأ القصّة كاملة", en: "Read the full story" } as Bi,

  empty: {
    ar: "لا أعمال تطابق هذا الاختيار بعد.",
    en: "Nothing matches this selection yet.",
  } as Bi,
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
export const faq = {
  index: "06",
  label: { ar: "أسئلة متكررة", en: "FAQ" } as Bi,
  lede: {
    ar: ["أسئلة،", "وإجاباتها."],
    en: ["Questions,", "answered."],
  } as Bi<string[]>,
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
  profileTitle: { ar: "ملفنا التعريفي", en: "Our profile" } as Bi,
  contactTitle: { ar: "تواصل", en: "Contact" } as Bi,
  saudiTitle: { ar: "في السعودية", en: "In Saudi Arabia" } as Bi,
  privacyTitle: { ar: "الخصوصية", en: "Privacy" } as Bi,
  socialTitle: { ar: "تابعنا", en: "Follow" } as Bi,
  rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" } as Bi,
  social: [
    { label: "Instagram", href: "https://instagram.com/daamah.digital.solutions" },
    { label: "Facebook", href: "https://facebook.com/daamah.digital.solutions" },
  ],
};
