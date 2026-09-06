import type { Bi } from "../i18n";

/**
 * محتوى الصفحات الداخلية — ثنائي اللغة.
 * الرئيسية تعرض ملخّصات؛ هنا التفصيل الذي لا يتّسع له الملخّص.
 * المصدر: "Daamah Company Profile.pdf".
 */

/* ── /about ── */
export const aboutPage = {
  label: { ar: "من نحن", en: "About" } as Bi,
  title: {
    ar: ["نبني حضورًا", "لا نُجمّله."],
    en: ["We build presence,", "we don't decorate it."],
  } as Bi<string[]>,
  intro: {
    ar: "في عالم رقمي سريع، الظهور الاحترافي لم يعد خيارًا بل ضرورة. منذ 2018 ونحن نعمل مع شركات في مصر والخليج وأوروبا لنحوّل أفكارها إلى حضور رقمي واضح.",
    en: "In a fast-moving digital world, looking professional is no longer optional. Since 2018 we have worked with companies across Egypt, the Gulf, and Europe, turning their ideas into a clear digital presence.",
  } as Bi,

  vision: {
    label: { ar: "رؤيتنا", en: "Vision" } as Bi,
    body: {
      ar: "في عالم مزدحم بالعلامات التجارية لا يتم اختيار الأفضل دائمًا، بل يتم اختيار الأوضح والأقرب والأكثر حضورًا. نؤمن أن كل شركة تمتلك قصة تستحق أن تُرى، لكن القليل فقط ينجح في إيصالها بالشكل الصحيح. رؤيتنا أن نكون القوة التي تقف خلف هذه القصص — نحوّلها إلى حضور رقمي واضح ومؤثر، وعلامات تُرى وتُفهم وتُختار.",
      en: "In a market crowded with brands, the best does not always win — the clearest, closest, and most present does. We believe every company has a story worth seeing, but few manage to tell it properly. Our vision is to be the force behind those stories, turning them into a presence that is clear and effective, and brands that get seen, understood, and chosen.",
    } as Bi,
  },
  mission: {
    label: { ar: "رسالتنا", en: "Mission" } as Bi,
    body: {
      ar: "نحن لا نبدأ من التنفيذ. نفهم مشروعك، ونحلّل سوقك، وندرك كيف يفكّر عميلك — ثم نحوّل ذلك إلى هوية بصرية تعبّر عنك، وموقع يعرضك باحتراف، واستراتيجية تسويقية تجلب لك النتائج. في دَعمة لا نُجمّل الحضور الرقمي، بل نبنيه ليعمل ويؤثّر ويحقّق نموًّا حقيقيًا.",
      en: "We do not start with execution. We study your business, analyse your market, and understand how your customer thinks — then turn that into an identity that represents you, a website that presents you properly, and a marketing strategy that delivers. At Daamah we don't decorate a digital presence; we build one that works, lands, and grows the business.",
    } as Bi,
  },

  problem: {
    label: { ar: "المشكلة", en: "The problem" } as Bi,
    lead: {
      ar: "شركات كثيرة تمتلك مشاريع قوية لكنها لا تظهر بالشكل الذي تستحقه.",
      en: "Plenty of companies have strong businesses that simply don't look the part.",
    } as Bi,
    items: [
      { ar: "موقع ضعيف", en: "A weak website" } as Bi,
      { ar: "هوية غير واضحة", en: "An unclear identity" } as Bi,
      { ar: "تسويق بلا نتائج", en: "Marketing without results" } as Bi,
    ],
    outcome: { ar: "والنتيجة؟ فرص ضائعة يوميًا.", en: "The result? Opportunities lost daily." } as Bi,
  },
  solution: {
    label: { ar: "الحل", en: "The solution" } as Bi,
    lead: {
      ar: "نبني لك منظومة رقمية متكاملة، لا قطعًا منفصلة.",
      en: "We build you one connected digital system, not detached pieces.",
    } as Bi,
    items: [
      { ar: "موقع يعرض خدماتك بوضوح", en: "A site that presents your services clearly" } as Bi,
      { ar: "هوية تعكس قوة مشروعك", en: "An identity that reflects your strength" } as Bi,
      { ar: "تسويق يجلب لك عملاء حقيقيين", en: "Marketing that brings real customers" } as Bi,
    ],
    outcome: { ar: "ابدأ في بناء حضورك الصحيح.", en: "Start building the presence you deserve." } as Bi,
  },

  whyUs: {
    label: { ar: "لماذا دَعمة", en: "Why Daamah" } as Bi,
    items: [
      {
        no: "01",
        title: { ar: "نفهم السوق قبل أن نبدأ", en: "We understand the market first" } as Bi,
      },
      { no: "02", title: { ar: "نركّز على النتائج", en: "We focus on results" } as Bi },
      {
        no: "03",
        title: { ar: "نبني حلولًا تناسب كل مشروع", en: "We build to fit each project" } as Bi,
      },
      {
        no: "04",
        title: { ar: "خبرة في قطاعات متعددة", en: "Experience across many sectors" } as Bi,
      },
      {
        no: "05",
        title: { ar: "شراكة مستمرة مع عملائنا", en: "An ongoing partnership" } as Bi,
      },
      {
        no: "06",
        title: {
          ar: "خبرة كبيرة في السوق الخليجي والأوروبي",
          en: "Deep experience in Gulf and European markets",
        } as Bi,
      },
    ],
  },
};

/* ── /services ── */
export const servicesPage = {
  label: { ar: "خدماتنا", en: "Services" } as Bi,
  title: {
    ar: ["سبع خدمات،", "منظومة واحدة."],
    en: ["Seven services,", "one system."],
  } as Bi<string[]>,
  intro: {
    ar: "لا نبيع خدمات منفصلة. كل خدمة هنا جزء من منظومة تخدم هدفًا واحدًا: أن يراك عميلك، ويفهمك، ويختارك. يمكنك أن تبدأ بواحدة وتوسّع لاحقًا.",
    en: "We don't sell detached services. Each one is part of a system serving a single goal: that your customer sees you, understands you, and chooses you. Start with one and expand later.",
  } as Bi,
  detailLabel: { ar: "ما يشمله", en: "What's included" } as Bi,
  relatedLabel: { ar: "أعمال من هذه الخدمة", en: "Work from this service" } as Bi,
  backLabel: { ar: "كل الخدمات", en: "All services" } as Bi,
};

/** تفصيل كل خدمة — المفتاح هو slug الخدمة في home.ts */
export const serviceDetails: Record<
  string,
  { intro: Bi; includes: Bi[]; deliverables: Bi[] }
> = {
  branding: {
    intro: {
      ar: "الهوية ليست لوجو. هي نظام كامل — لون وخطّ وأسلوب صورة ونبرة — يجعل شركتك تُعرَف قبل أن يُقرأ اسمها. نبنيها من فهم سوقك لا من ذوق المصمّم.",
      en: "An identity is not a logo. It's a complete system — colour, type, image style, tone — that makes your company recognisable before its name is read. We build it from your market, not from a designer's taste.",
    },
    includes: [
      { ar: "بحث في القطاع والمنافسين", en: "Sector and competitor research" },
      { ar: "تصميم اللوجو ونظامه", en: "Logo and its system" },
      { ar: "نظام ألوان وخطوط كامل", en: "Full colour and type system" },
      { ar: "أسلوب الصورة والأيقونات", en: "Image and icon style" },
      { ar: "تطبيقات ومطبوعات", en: "Applications and print" },
    ],
    deliverables: [
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "ملفات مفتوحة Ai + PSD", en: "Open Ai + PSD files" },
      { ar: "ملف تعريفي احترافي", en: "Company profile" },
    ],
  },
  "web-development": {
    intro: {
      ar: "موقع يُقرأ بسرعة على الموبايل قبل الديسكتوب، ويقود الزائر إلى خطوة واضحة. نبنيه بكود نظيف لا بقوالب جاهزة، فيبقى قابلًا للتطوير معك.",
      en: "A site that reads fast on mobile before desktop, and leads the visitor to one clear next step. Built with clean code rather than a template, so it can grow with you.",
    },
    includes: [
      { ar: "بنية معلومات وخريطة صفحات", en: "Information architecture and sitemap" },
      { ar: "تصميم واجهات متجاوب", en: "Responsive interface design" },
      { ar: "تطوير بكود نظيف", en: "Clean-code development" },
      { ar: "تهيئة أساسية للسيو", en: "Baseline SEO setup" },
      { ar: "ربط أدوات القياس", en: "Analytics wiring" },
    ],
    deliverables: [
      { ar: "موقع متجاوب على كل المقاسات", en: "A site responsive at every size" },
      { ar: "لوحة تحكّم للمحتوى", en: "Content management access" },
      { ar: "تدريب على الاستخدام", en: "Handover and training" },
    ],
  },
  seo: {
    intro: {
      ar: "السيو ليس وعدًا بالمركز الأول، بل عملٌ متّصل: تدقيق تقني يُصلح ما يمنع الفهرسة، وبحث كلمات مبنيّ على كيف يبحث السعودي فعلًا لا على ترجمة قائمة إنجليزية، ومحتوى عربي مكتوب يُنشر بانتظام. النتائج التقنية تظهر خلال أسابيع، والترتيب على الكلمات التي تجلب عملاء يحتاج من أربعة إلى تسعة أشهر — نقولها قبل أن نبدأ لا بعدها.",
      en: "SEO is not a promise of the top spot; it is connected work: a technical audit that fixes what blocks indexing, keyword research built on how Saudis actually search rather than a translated English list, and Arabic content written and published consistently. Technical gains show within weeks; ranking for terms that bring clients takes four to nine months — we say so before we start, not after.",
    },
    includes: [
      { ar: "تدقيق تقني كامل للموقع", en: "Full technical site audit" },
      { ar: "بحث كلمات عربية للسوق السعودي", en: "Arabic keyword research for the Saudi market" },
      { ar: "تحسين الصفحات والبنية الداخلية", en: "On-page and internal structure work" },
      { ar: "بيانات منظّمة وخريطة موقع", en: "Structured data and sitemap" },
      { ar: "خطة محتوى شهرية", en: "A monthly content plan" },
      { ar: "ضبط نشاطك على خرائط جوجل", en: "Google Business Profile setup" },
    ],
    deliverables: [
      { ar: "تقرير التدقيق بأولويات واضحة", en: "An audit report with clear priorities" },
      { ar: "خطة كلمات مفتاحية بنيّة البحث", en: "A keyword plan mapped to search intent" },
      { ar: "تقرير شهري بما تحرّك وما لم يتحرّك", en: "A monthly report on what moved and what didn't" },
    ],
  },
  "social-media": {
    intro: {
      ar: "المحتوى المنتظم يبني الثقة أكثر من الحملة الواحدة الكبيرة. نضع خطة شهرية، وننتج التصاميم والنصوص، ونتابع التفاعل ونعدّل على أساسه.",
      en: "Consistent content builds more trust than one big campaign. We set a monthly plan, produce the designs and copy, then read engagement and adjust.",
    },
    includes: [
      { ar: "خطة محتوى شهرية", en: "Monthly content plan" },
      { ar: "تصميم البوستات والقصص", en: "Post and story design" },
      { ar: "كتابة النصوص", en: "Copywriting" },
      { ar: "جدولة النشر", en: "Publishing schedule" },
      { ar: "تقرير أداء شهري", en: "Monthly performance report" },
    ],
    deliverables: [
      { ar: "مكتبة تصاميم جاهزة", en: "A library of ready designs" },
      { ar: "دليل نبرة الحساب", en: "Account tone guide" },
      { ar: "تقارير تفاعل", en: "Engagement reports" },
    ],
  },
  "digital-marketing": {
    intro: {
      ar: "استراتيجية مبنية على بيانات سوقك: من هو عميلك، أين يبحث، وما الذي يوقفه عن الشراء. ثم خطة قنوات بأهداف ومؤشرات واضحة.",
      en: "A strategy built on your market's data: who your customer is, where they search, and what stops them buying. Then a channel plan with clear goals and metrics.",
    },
    includes: [
      { ar: "تحليل الجمهور والمنافسين", en: "Audience and competitor analysis" },
      { ar: "تحديد القنوات والرسائل", en: "Channel and message definition" },
      { ar: "خطة تنفيذ بجدول زمني", en: "Execution plan with timeline" },
      { ar: "مؤشرات أداء متّفق عليها", en: "Agreed performance indicators" },
    ],
    deliverables: [
      { ar: "وثيقة استراتيجية", en: "Strategy document" },
      { ar: "خطة قنوات ومحتوى", en: "Channel and content plan" },
      { ar: "لوحة متابعة النتائج", en: "Results dashboard" },
    ],
  },
  "media-buying": {
    intro: {
      ar: "الإعلان الجيد ليس الأكثر إنفاقًا بل الأدقّ استهدافًا. ندير حملاتك على المنصّات المناسبة لجمهورك، ونراقب التكلفة يوميًا لا شهريًا.",
      en: "Good advertising isn't the biggest spend, it's the sharpest targeting. We run your campaigns on the platforms your audience actually uses, and watch cost daily rather than monthly.",
    },
    includes: [
      { ar: "اختيار المنصّات والجمهور", en: "Platform and audience selection" },
      { ar: "إعداد الحملات والتتبّع", en: "Campaign and tracking setup" },
      { ar: "إنتاج مواد الإعلان", en: "Ad creative production" },
      { ar: "متابعة يومية وتعديل", en: "Daily monitoring and adjustment" },
    ],
    deliverables: [
      { ar: "حملات مضبوطة ومربوطة بالقياس", en: "Campaigns wired to measurement" },
      { ar: "تقارير إنفاق وعائد", en: "Spend and return reports" },
      { ar: "توصيات للجولة التالية", en: "Recommendations for the next round" },
    ],
  },
  "performance-marketing": {
    intro: {
      ar: "بعد الإطلاق يبدأ الشغل الحقيقي: نقرأ الأرقام، ونجرّب نسخًا مختلفة، ونتخلّص ممّا لا يعمل — حتى يصير كل ريال منفق أعلى عائدًا من سابقه.",
      en: "The real work starts after launch: reading the numbers, testing variants, and cutting what doesn't work — until every unit spent returns more than the last.",
    },
    includes: [
      { ar: "قياس دقيق للتحويلات", en: "Accurate conversion tracking" },
      { ar: "اختبارات A/B مستمرة", en: "Continuous A/B testing" },
      { ar: "تحسين صفحات الهبوط", en: "Landing page optimisation" },
      { ar: "إعادة توزيع الميزانية على الأفضل", en: "Budget shifted to what performs" },
    ],
    deliverables: [
      { ar: "تقرير عائد شهري", en: "Monthly return report" },
      { ar: "سجلّ الاختبارات ونتائجها", en: "Test log and outcomes" },
      { ar: "خطة تحسين للربع القادم", en: "Next-quarter optimisation plan" },
    ],
  },
};

/* ── /work ── */
export const workPage = {
  label: { ar: "أعمالنا", en: "Work" } as Bi,
  title: {
    ar: ["أعمال تتكلّم", "عن نفسها."],
    en: ["Work that speaks", "for itself."],
  } as Bi<string[]>,
  intro: {
    ar: "أكثر من 150 مشروعًا في 10 قطاعات منذ 2018 — من المقاولات والعقارات إلى التعليم والتجارة الإلكترونية. هذه نماذج مختارة.",
    en: "More than 150 projects across 10 sectors since 2018 — from construction and real estate to education and e-commerce. A selection follows.",
  } as Bi,
  resultsLabel: { ar: "النتائج", en: "Results" } as Bi,
  sectorLabel: { ar: "القطاع", en: "Sector" } as Bi,
  serviceLabel: { ar: "الخدمة", en: "Service" } as Bi,
  backLabel: { ar: "كل الأعمال", en: "All work" } as Bi,
  nextLabel: { ar: "المشروع التالي", en: "Next project" } as Bi,
  marketsLabel: { ar: "الأسواق", en: "Markets" } as Bi,
  ctaLines: {
    ar: ["مشروعك التالي", "يبدأ من هنا."],
    en: ["Your next project", "starts here."],
  } as Bi<string[]>,
  detailCtaLines: {
    ar: ["تريد نتيجة", "مثل هذه؟"],
    en: ["Want a result", "like this?"],
  } as Bi<string[]>,
};

/* ── /clients/:slug — قصّة عميل ── */
export const clientPage = {
  label: { ar: "قصة عميل", en: "Client story" } as Bi,
  chaptersLabel: { ar: "فصول العلاقة", en: "The relationship" } as Bi,
  resultsLabel: { ar: "أثر العلاقة", en: "What it produced" } as Bi,
  sinceLabel: { ar: "منذ", en: "Since" } as Bi,
  servicesLabel: { ar: "الخدمات المنفّذة", en: "Services delivered" } as Bi,
  backLabel: { ar: "كل الأعمال", en: "All work" } as Bi,
  ctaLines: {
    ar: ["علاقة مثل هذه", "تبدأ بمشروع واحد."],
    en: ["A relationship like this", "starts with one project."],
  } as Bi<string[]>,
};

/** تفصيل كل عمل — المفتاح هو slug العمل في home.ts */
export const workDetails: Record<string, { desc: Bi; results: Bi[] }> = {
  "building-line": {
    desc: {
      ar: "شركة مقاولات في السعودية. طوّرنا هوية بصرية تعكس الاحترافية والصلابة والثقة، بما يتماشى مع طبيعة القطاع الإنشائي.",
      en: "A Saudi construction company. We developed an identity conveying professionalism, solidity, and trust, matched to the nature of the sector.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  amlak: {
    desc: {
      ar: "شركة عقارات تعمل في جورجيا والسعودية. طوّرنا هوية تعكس الاحترافية والمصداقية مع إبراز الطابع الاستثماري والبعد الدولي للعلامة.",
      en: "A real estate company operating in Georgia and Saudi Arabia. We built an identity conveying credibility while carrying its investment focus and international reach.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "مطبوعات ولافتات", en: "Print and signage" },
    ],
  },
  elitegate: {
    desc: {
      ar: "شركة استثمار عقاري. طوّرنا هوية تعكس الطابع الاستثماري الراقي وتعزّز مفاهيم الثقة والاحترافية.",
      en: "A property investment firm. We developed an identity carrying a refined investment character while reinforcing trust and professionalism.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  "basmat-alomran": {
    desc: {
      ar: "شركة مقاولات في السعودية. طوّرنا هوية تعكس قوة التنفيذ والطابع الهندسي الحديث مع إبراز الموثوقية.",
      en: "A Saudi construction company. We built an identity conveying delivery strength and a modern engineering character alongside reliability.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  inmaa: {
    desc: {
      ar: "شركة مقاولات. طوّرنا هوية بصرية تعكس الاعتمادية والاحترافية، مع إبراز قوة التنفيذ والالتزام بالمواعيد.",
      en: "A construction company. We developed an identity conveying dependability and professionalism, highlighting delivery strength and punctuality.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "ملفات Ai + PSD", en: "Ai + PSD files" },
    ],
  },
  "adg-brand": {
    desc: {
      ar: "شركة عقارات في جورجيا ولبنان. طوّرنا هوية حديثة وقوية تعكس الثقة وقيمة الاستثمار والنمو في كلا السوقين.",
      en: "A real estate company in Georgia and Lebanon. We built a modern, confident identity reflecting trust, investment value, and growth in both markets.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "مطبوعات ولافتات", en: "Print and signage" },
    ],
  },
  fragancia: {
    desc: {
      ar: "متجر إلكتروني للعطور والعناية، بتجربة تسوّق راقية تعكس الأناقة وتُبرز المنتج بوضوح.",
      en: "An e-commerce store for fragrance and care products, with a refined shopping experience that puts the product first.",
    },
    results: [
      { ar: "متجر إلكتروني متكامل", en: "Complete online store" },
      { ar: "صفحات منتجات", en: "Product pages" },
      { ar: "تجربة شراء مبسّطة", en: "Streamlined checkout" },
    ],
  },
  "vibrant-design": {
    desc: {
      ar: "موقع لشركة ديكور وتصميم داخلي يعرض المشاريع بأسلوب بصري أنيق بالأبيض والأسود.",
      en: "A site for an interior design studio presenting projects in an elegant black-and-white visual style.",
    },
    results: [
      { ar: "موقع أعمال", en: "Portfolio site" },
      { ar: "معرض مشاريع", en: "Project gallery" },
      { ar: "تصميم متجاوب", en: "Responsive design" },
    ],
  },
  "web-contracting": {
    desc: {
      ar: "موقع مؤسسي يبرز إرث 42 عامًا من الخبرة في المقاولات والتطوير العقاري داخل الإمارات.",
      en: "A corporate site carrying 42 years of experience in contracting and property development in the UAE.",
    },
    results: [
      { ar: "موقع مؤسسي", en: "Corporate site" },
      { ar: "عرض المشاريع", en: "Project showcase" },
      { ar: "تصميم متجاوب", en: "Responsive design" },
    ],
  },
  insurance: {
    desc: {
      ar: "موقع مؤسسي لشركة تأمين يقوم على رسالة الثقة والقوة المالية عبر خمسة عقود من الخبرة.",
      en: "A corporate site for an insurance group built on a message of trust and financial strength across five decades.",
    },
    results: [
      { ar: "موقع مؤسسي", en: "Corporate site" },
      { ar: "صفحات خدمات", en: "Service pages" },
      { ar: "نماذج تواصل", en: "Contact forms" },
    ],
  },
  "fashion-store": {
    desc: {
      ar: "متجر أزياء بتصميم مينيمال أبيض وأسود يركّز على المنتج وتجربة الشراء.",
      en: "A fashion store in a minimal black-and-white design focused on the product and the buying experience.",
    },
    results: [
      { ar: "متجر إلكتروني", en: "Online store" },
      { ar: "تصميم مينيمال", en: "Minimal design" },
      { ar: "آراء العملاء", en: "Customer reviews" },
    ],
  },
  "eco-vista": {
    desc: {
      ar: "شركة مقاولات تعمل في السعودية. أنشأنا محتوى سوشيال ميديا متكامل يبرز المشاريع والخدمات بشكل احترافي ويبني حضورًا رقميًا قويًا.",
      en: "A Saudi construction company. We produced a full social content programme presenting projects and services professionally and building a strong presence.",
    },
    results: [
      { ar: "حضور رقمي أقوى", en: "A stronger digital presence" },
      { ar: "زيادة التفاعل", en: "Higher engagement" },
      { ar: "جذب فرص عمل جديدة", en: "New business enquiries" },
    ],
  },
  "sky-shooter": {
    desc: {
      ar: "شركة تصوير جوي في الإمارات. صمّمنا محتوى بصري ديناميكي يعكس جودة التصوير ويبرز تميّز الشركة في عرض المشاريع.",
      en: "An aerial filming company in the UAE. We designed dynamic visual content reflecting the quality of the footage and how it presents projects.",
    },
    results: [
      { ar: "زيادة التفاعل", en: "Higher engagement" },
      { ar: "إبراز جودة الأعمال", en: "Work quality brought forward" },
      { ar: "جذب عملاء جدد", en: "New clients" },
    ],
  },
  "green-flash": {
    desc: {
      ar: "شركة في قطاع الصناعة والطاقة. طوّرنا محتوى بصريًا قويًا يعكس حجم المشاريع وجودة التنفيذ ويعزّز صورة الشركة في السوق.",
      en: "A company in the industrial and energy sector. We produced strong visual content reflecting project scale and delivery quality.",
    },
    results: [
      { ar: "تحسين صورة الشركة", en: "An improved market image" },
      { ar: "زيادة التفاعل", en: "Higher engagement" },
      { ar: "تعزيز الثقة بالسوق", en: "Greater market trust" },
    ],
  },
  "ahl-alquran": {
    desc: {
      ar: "أكاديمية تعليم قرآن تستهدف الجاليات المسلمة في أمريكا وأوروبا. أنشأنا محتوى بصريًا يعكس الرسالة التعليمية بأسلوب حديث وبسيط.",
      en: "A Quran academy serving Muslim communities in the US and Europe. We created visual content carrying its educational message in a modern, simple style.",
    },
    results: [
      { ar: "زيادة التفاعل مع المحتوى التعليمي", en: "Higher engagement with educational content" },
      { ar: "وصول أفضل للجمهور المستهدف", en: "Better reach into the target audience" },
      { ar: "زيادة الاستفسارات والتسجيل", en: "More enquiries and sign-ups" },
    ],
  },
  "adg-social": {
    desc: {
      ar: "شركة متخصّصة في الاستثمار العقاري داخل جورجيا. طوّرنا محتوى بصريًا يعكس الثقة ويبرز الفرص الاستثمارية بوضوح.",
      en: "A firm specialising in property investment in Georgia. We developed visual content conveying trust and presenting investment opportunities clearly.",
    },
    results: [
      { ar: "زيادة التفاعل على المحتوى", en: "Higher content engagement" },
      { ar: "تحسين وضوح العروض العقارية", en: "Clearer property offers" },
      { ar: "جذب استفسارات من عملاء مهتمين", en: "Enquiries from qualified prospects" },
    ],
  },
};

/* ── /process ── */
export const processPage = {
  label: { ar: "كيف نعمل", en: "Process" } as Bi,
  title: {
    ar: ["طريقة عمل", "بلا مفاجآت."],
    en: ["A way of working", "with no surprises."],
  } as Bi<string[]>,
  intro: {
    ar: "خمس خطوات نمرّ بها في كل مشروع، مهما كان حجمه. تعرف في كل لحظة أين نحن وما الخطوة التالية ومتى تستلم.",
    en: "Five steps we go through on every project, whatever its size. At any moment you know where we are, what comes next, and when you receive it.",
  } as Bi,
  durationLabel: { ar: "المدّة المعتادة", en: "Typical duration" } as Bi,
  outputLabel: { ar: "ما تستلمه", en: "What you receive" } as Bi,
  details: [
    {
      duration: { ar: "3 – 5 أيام", en: "3 – 5 days" } as Bi,
      output: { ar: "ملخّص الفهم وتحليل السوق", en: "A brief and market analysis" } as Bi,
    },
    {
      duration: { ar: "أسبوع", en: "One week" } as Bi,
      output: { ar: "خطة بأهداف وجدول زمني", en: "A plan with goals and a timeline" } as Bi,
    },
    {
      duration: { ar: "2 – 4 أسابيع", en: "2 – 4 weeks" } as Bi,
      output: { ar: "التصاميم والمواد النهائية", en: "Final designs and assets" } as Bi,
    },
    {
      duration: { ar: "أيام", en: "A few days" } as Bi,
      output: { ar: "المشروع منشور ومربوط بالقياس", en: "Live, wired to measurement" } as Bi,
    },
    {
      duration: { ar: "مستمرّة", en: "Ongoing" } as Bi,
      output: { ar: "تقارير أداء وتوصيات", en: "Performance reports and recommendations" } as Bi,
    },
  ],
};

/* ── /packages ── */
export const packagesPage = {
  label: { ar: "باقاتنا", en: "Packages" } as Bi,
  title: {
    ar: ["اختر نقطة البداية،", "ووسّع بعدها."],
    en: ["Pick a starting point,", "expand from there."],
  } as Bi<string[]>,
  intro: {
    ar: "الباقات نقاط بداية شائعة لا قوالب مغلقة. نبني على حجم مشروعك وسوقك، والسعر يُحدَّد بعد أن نفهم ما تحتاجه فعلًا.",
    en: "These are common starting points, not closed templates. We build around the size of your project and your market, and the price follows once we understand what you actually need.",
  } as Bi,
  ctaLines: {
    ar: ["لم تجد ما", "تبحث عنه؟"],
    en: ["Not finding", "what you need?"],
  } as Bi<string[]>,
  ctaPrimary: { ar: "اطلب عرضًا مخصّصًا", en: "Request a custom quote" } as Bi,
};

/* ── /contact ── */
export const contactPage = {
  label: { ar: "تواصل معنا", en: "Contact" } as Bi,
  title: {
    ar: ["احكِ لنا", "عن مشروعك."],
    en: ["Tell us about", "your project."],
  } as Bi<string[]>,
  intro: {
    ar: "استشارة أولى مجانية وبدون التزام. احكِ لنا أين أنت الآن وأين تريد أن تصل، ونرجع لك بخطة واضحة وسعر محدّد. عادةً نرد خلال يوم عمل واحد.",
    en: "A free first consultation with no commitment. Tell us where you are and where you want to be, and we'll come back with a clear plan and a firm price. We usually reply within one business day.",
  } as Bi,
  channelsLabel: { ar: "القنوات المباشرة", en: "Direct channels" } as Bi,
  detailsLabel: { ar: "تفاصيل", en: "Details" } as Bi,
  hoursLabel: { ar: "أوقات العمل", en: "Working hours" } as Bi,
  hours: { ar: "الأحد – الخميس · 9ص – 6م", en: "Sunday – Thursday · 9am – 6pm" } as Bi,
  marketsLabel: { ar: "الأسواق", en: "Markets" } as Bi,
  markets: {
    ar: "السعودية · الإمارات · مصر · أوروبا · جورجيا",
    en: "Saudi Arabia · UAE · Egypt · Europe · Georgia",
  } as Bi,
  responseLabel: { ar: "زمن الرد", en: "Response time" } as Bi,
  response: { ar: "خلال يوم عمل", en: "Within one business day" } as Bi,
  /* الأسواق مرتّبة بالأولوية: السعودية أولًا، وبتوقيتها.
     «أوقات العمل» بلا منطقة زمنية سؤالٌ مفتوح لعميل في الرياض. */
  regionsLabel: { ar: "أين نعمل", en: "Where we work" } as Bi,
  regions: [
    {
      key: "sa",
      label: { ar: "السعودية", en: "Saudi Arabia" } as Bi,
      hours: { ar: "الأحد – الخميس · 9ص – 6م", en: "Sunday – Thursday · 9am – 6pm" } as Bi,
      tz: { ar: "بتوقيت الرياض", en: "Riyadh time" } as Bi,
    },
    {
      key: "ae",
      label: { ar: "الإمارات", en: "UAE" } as Bi,
      hours: { ar: "الأحد – الخميس · 9ص – 6م", en: "Sunday – Thursday · 9am – 6pm" } as Bi,
      tz: { ar: "بتوقيت دبي", en: "Dubai time" } as Bi,
    },
    {
      key: "eg",
      label: { ar: "مصر", en: "Egypt" } as Bi,
      hours: { ar: "الأحد – الخميس · 9ص – 6م", en: "Sunday – Thursday · 9am – 6pm" } as Bi,
      tz: { ar: "بتوقيت القاهرة", en: "Cairo time" } as Bi,
    },
  ],
};

/* ── سياسة الخصوصية ──
   صفحة لازمة لا تجميلية: سياسات Google Ads وMeta تشترط رابط خصوصية
   على أي موقع يشغّل وسومهما، وبدونها تُرفض الحملة. */
export const privacyPage = {
  label: { ar: "الخصوصية", en: "Privacy" } as Bi,
  title: {
    ar: ["كيف نتعامل", "مع بياناتك."],
    en: ["How we handle", "your data."],
  } as Bi<string[]>,
  intro: {
    ar: "صفحة قصيرة تشرح ما نجمعه ولماذا. باختصار: لا نبيع بياناتك، ولا نجمع منها إلا ما يلزم للرد عليك وقياس أداء الموقع.",
    en: "A short page on what we collect and why. In brief: we don't sell your data, and we collect only what's needed to reply to you and measure how the site performs.",
  } as Bi,
  updatedLabel: { ar: "آخر تحديث", en: "Last updated" } as Bi,
  updated: { ar: "سبتمبر 2026", en: "September 2026" } as Bi,
  sections: [
    {
      title: { ar: "ما الذي نجمعه", en: "What we collect" } as Bi,
      body: {
        ar: "ما تكتبه بنفسك في نموذج طلب عرض السعر: الاسم، والشركة، ورقم التواصل، ونوع الخدمة، والميزانية التقديرية، ونصّ رسالتك. لا حقول مخفية ولا جمع خارج ما تراه أمامك.",
        en: "Whatever you type into the quote form yourself: name, company, contact number, service type, estimated budget, and your message. No hidden fields and nothing collected beyond what you see.",
      } as Bi,
    },
    {
      title: { ar: "إلى أين يذهب", en: "Where it goes" } as Bi,
      body: {
        ar: "النموذج لا يمرّ بخادم لنا: يفتح واتساب برسالة جاهزة ترسلها أنت إلى الرقم المعلن. أي بيانات ترسلها تخضع بعدها لسياسة خصوصية واتساب أيضًا.",
        en: "The form doesn't pass through a server of ours: it opens WhatsApp with a prepared message that you send to the published number. Anything you send is then also covered by WhatsApp's own privacy policy.",
      } as Bi,
    },
    {
      title: { ar: "القياس والكوكيز", en: "Analytics and cookies" } as Bi,
      body: {
        ar: "نستخدم Google Analytics و Meta Pixel لقياس عدد الزيارات ومصادرها وأي الصفحات تُقرأ. القياس لا يعمل إطلاقًا إذا كان متصفحك يرسل إشارة «عدم التتبّع» أو Global Privacy Control — نفحصها قبل تحميل أي وسم.",
        en: "We use Google Analytics and the Meta Pixel to measure visits, their sources, and which pages get read. None of it loads at all if your browser sends Do Not Track or Global Privacy Control — we check before loading any tag.",
      } as Bi,
    },
    {
      title: { ar: "حقوقك", en: "Your rights" } as Bi,
      body: {
        ar: "يمكنك أن تطلب حذف أي بيانات أرسلتها إلينا، أو نسخةً منها، برسالة إلى بريدنا. نستجيب خلال أسبوع على الأكثر ولا نطلب سببًا.",
        en: "You can ask us to delete anything you've sent, or for a copy of it, by emailing us. We respond within a week at most and don't ask for a reason.",
      } as Bi,
    },
    {
      title: { ar: "روابط خارجية", en: "External links" } as Bi,
      body: {
        ar: "الموقع يشير إلى حساباتنا على إنستجرام وفيسبوك وإلى واتساب. ما يحدث بعد مغادرتك الموقع تحكمه سياسات تلك المنصّات لا سياستنا.",
        en: "The site links to our Instagram and Facebook accounts and to WhatsApp. What happens after you leave the site is governed by those platforms' policies, not ours.",
      } as Bi,
    },
  ],
  contactNote: {
    ar: "لأي سؤال عن الخصوصية أو طلب حذف بيانات، راسلنا على:",
    en: "For any privacy question or a deletion request, email us at:",
  } as Bi,
};

/* ── المدوّنة ── */
export const blogPage = {
  label: { ar: "المدوّنة", en: "Journal" } as Bi,
  title: {
    ar: ["ما تعلّمناه،", "مكتوبًا."],
    en: ["What we've learned,", "written down."],
  } as Bi<string[]>,
  intro: {
    ar: "مقالات عن الهوية والمواقع والتسويق الرقمي في السوق السعودي والخليجي — بأرقام وأمثلة من مشاريع فعلية، لا نصائح عامّة.",
    en: "Notes on branding, websites, and digital marketing in the Saudi and Gulf markets — with numbers and examples from real projects rather than general advice.",
  } as Bi,
  allTags: { ar: "كل المواضيع", en: "All topics" } as Bi,
  readingTime: { ar: "دقائق قراءة", en: "min read" } as Bi,
  publishedOn: { ar: "نُشر في", en: "Published" } as Bi,
  updatedOn: { ar: "حُدّث في", en: "Updated" } as Bi,
  related: { ar: "اقرأ أيضًا", en: "Read next" } as Bi,
  backToBlog: { ar: "كل المقالات", en: "All articles" } as Bi,
  tagTitle: { ar: "مقالات عن", en: "Articles on" } as Bi,
  empty: {
    ar: "لا مقالات في هذا الموضوع بعد.",
    en: "Nothing on this topic yet.",
  } as Bi,
  /* المقال المتاح بلغة واحدة: نقول ذلك بدل أن نصمت */
  onlyInArabic: {
    ar: "",
    en: "This article is available in Arabic only.",
  } as Bi,
  onlyInEnglish: {
    ar: "هذا المقال متاح بالإنجليزية فقط.",
    en: "",
  } as Bi,
  ctaLines: {
    ar: ["عندك مشروع", "يشبه هذا؟"],
    en: ["Have a project", "like this one?"],
  } as Bi<string[]>,
};

/* ── 404 ── */
export const notFound = {
  label: { ar: "خطأ 404", en: "Error 404" } as Bi,
  title: {
    ar: ["هذه الصفحة", "غير موجودة."],
    en: ["This page", "doesn't exist."],
  } as Bi<string[]>,
  intro: {
    ar: "ربما تغيّر الرابط أو في العنوان خطأ. يمكنك العودة إلى الرئيسية أو تصفّح أعمالنا.",
    en: "The link may have changed, or there's a typo in the address. Head back home, or take a look at our work.",
  } as Bi,
  home: { ar: "الرئيسية", en: "Home" } as Bi,
  work: { ar: "شاهد أعمالنا", en: "See our work" } as Bi,
};
