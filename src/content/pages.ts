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
      { ar: "متابعة تضيع بين الواتساب والجداول", en: "Follow-up lost between WhatsApp and spreadsheets" } as Bi,
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
      { ar: "نظام يمسك كل فرصة تدخل", en: "A system that holds every opportunity that arrives" } as Bi,
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

/* ── /profile ── */
/**
 * ملفّنا نحن.
 *
 * الملف التعريفي خدمةٌ نبيعها، وأقوى إثبات عليها أن نُري ملفّنا:
 * من يبيع ملفات تعريفية ولا يملك واحدًا يقول عن نفسه ما لا يريد.
 */
export const profilePage = {
  label: { ar: "ملفنا التعريفي", en: "Our profile" } as Bi,
  title: {
    ar: ["نبيع ملفات تعريفية،", "فهذا ملفّنا."],
    en: ["We build company profiles,", "so here is ours."],
  } as Bi<string[]>,
  intro: {
    ar: "الملف التعريفي وثيقة تُقرأ في خمس دقائق قبل اجتماع أو داخل ملف تأهيل. هذا ملفّنا كاملًا كما نرسله — اقرأه كما يقرأه عميلٌ يزن قراره.",
    en: "A company profile is a document read in five minutes before a meeting or inside a qualification file. This is ours in full, exactly as we send it — read it the way a client weighing a decision reads it.",
  } as Bi,
  deckLabel: { ar: "الملف التعريفي", en: "The company profile" } as Bi,
  socialLabel: { ar: "بورتفوليو السوشيال ميديا", en: "Social media portfolio" } as Bi,
  socialNote: {
    ar: "تصاميم منشورة لعملاء في قطاعات مختلفة — عيّنة مما نسلّمه شهريًا، لا مختارات.",
    en: "Published designs for clients across sectors — a sample of what we deliver monthly, not a highlight reel.",
  } as Bi,
  ctaLines: {
    ar: ["ملفّكم يستحقّ", "أن يُرسَل دون اعتذار."],
    en: ["Your profile deserves", "to be sent without apology."],
  } as Bi<string[]>,
};

/* ── /services ── */
export const servicesPage = {
  label: { ar: "خدماتنا", en: "Services" } as Bi,
  /* العدد لا يُكتب في العنوان: كان «سبع» فوق تسع خدمات — كل إضافة
     خدمة كانت ستكذّبه من جديد */
  title: {
    ar: ["شركتك لا تحتاج خدماتٍ أكثر،", "بل أجزاءً تعمل معًا."],
    en: ["You don't need more services,", "you need parts that work together."],
  } as Bi<string[]>,
  intro: {
    ar: "نبني ما يجعل شركتك تظهر، وتصل، وتعمل بشكل أفضل. كل خدمة هنا جزء من أحد هذه الثلاثة — تبدأ بواحد وتوسّع حين تحتاج.",
    en: "We build what makes your company appear, reach, and run better. Each service belongs to one of those three — start with one and expand when you need to.",
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
  "company-profile": {
    intro: {
      ar: "الملف التعريفي ليس كتيّبًا يجمع كل ما تفعلونه. هو وثيقة تُقرأ في خمس دقائق قبل اجتماع أو داخل ملف تأهيل، فتترك انطباعًا بأن أمام القارئ شركة منظّمة تعرف ما تقول.",
      en: "A company profile is not a booklet listing everything you do. It is a document read in five minutes before a meeting or inside a qualification file, leaving the reader with the impression of an organised company that knows what it is saying.",
    },
    includes: [
      { ar: "ترتيب المحتوى بحسب ما يبحث عنه القارئ لا بحسب تاريخكم", en: "Content ordered by what the reader looks for, not by your history" },
      { ar: "كتابة النصوص: من أنتم، وماذا تقدّمون، ولماذا أنتم", en: "Writing: who you are, what you offer, and why you" },
      { ar: "عرض المشاريع والسجلّ بأرقام حيث توجد", en: "Projects and record presented with numbers where they exist" },
      { ar: "تصميم على هويّتكم البصرية، عربي وإنجليزي", en: "Designed on your identity, in Arabic and English" },
    ],
    deliverables: [
      { ar: "نسخة للطباعة ونسخة للإرسال بحجم أخفّ", en: "A print version and a lighter one for sending" },
      { ar: "نسخة قابلة للتحديث دون العودة إلينا", en: "A version you can update without coming back to us" },
      { ar: "ملفات مفتوحة", en: "Open source files" },
    ],
  },
  crm: {
    intro: {
      ar: "النظام لا يُشترى، يُهيَّأ. نبدأ من طريقة عملكم الحالية — كيف يصل العميل، ومن يتابعه، ومتى يُعتبر الطلب مغلقًا — ثم نبني عليها نظامًا يعرف حالة كل عميل، بدل أن نجبركم على قالب جاهز.",
      en: "A system isn't bought, it's shaped. We start from how you already work — how a client arrives, who follows up, when a request counts as closed — then build a system that knows every client's state, instead of forcing you into a template.",
    },
    includes: [
      { ar: "قراءة مسار العميل عندكم كما هو اليوم", en: "Reading your client journey exactly as it runs today" },
      { ar: "مراحل بيع واضحة، ولكل مرحلة مسؤول بالاسم", en: "Clear sales stages, each with an owner by name" },
      { ar: "نقل بيانات العملاء الحالية من الجداول والمحادثات", en: "Migrating existing client data out of sheets and chats" },
      { ar: "تنبيهات للمتابعة حتى لا تُنسى صفقة", en: "Follow-up reminders so no deal is forgotten" },
      { ar: "تقارير تقرأها الإدارة بلا وسيط", en: "Reports management can read without a middleman" },
    ],
    deliverables: [
      { ar: "نظام مهيّأ وجاهز للاستخدام", en: "A configured, working system" },
      { ar: "تدريب الفريق على استعماله", en: "Team training on how to use it" },
      { ar: "متابعة معكم في الشهر الأول", en: "We stay with you through the first month" },
    ],
  },
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
      ar: "بعد الإطلاق يبدأ الشغل الحقيقي: نقرأ الأرقام، ونجرّب نسخًا مختلفة، ونتخلّص ممّا لا يعمل — حتى يصير كل ما يُنفق أعلى عائدًا ممّا سبقه.",
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
  /* العنوان يصالح الرقم مع المعروض: 150+ مشروعًا حقيقة، و16 نموذجًا
     مختارًا منها — لا «150» فوق عدّاد يقول 16 */
  title: {
    ar: ["نماذج مختارة", "من أكثر من 150 مشروعًا."],
    en: ["Selected work", "from over 150 projects."],
  } as Bi<string[]>,
  intro: {
    ar: "منذ 2018، في 10 قطاعات — من المقاولات والعقارات إلى التعليم والتجارة الإلكترونية. اختر مجالك لترى الأقرب إلى شركتك.",
    en: "Since 2018, across 10 sectors — from construction and real estate to education and e-commerce. Pick your sector to see the closest to your company.",
  } as Bi,
  resultsLabel: { ar: "النتائج", en: "Results" } as Bi,
  galleryLabel: { ar: "من المشروع", en: "From the project" } as Bi,
  monthsLabel: { ar: "المدّة", en: "Running" } as Bi,
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
  "amlak-social": {
    desc: {
      ar: "شركة تبيع عقارًا في باتومي لمستثمر لم يزر المدينة. فالمنشور هنا ليس إعلانًا بل جولةً: يقول أين المشروع، وماذا يطلّ عليه، ولماذا جورجيا أصلًا. ثمانية وعشرون شهرًا متّصلة عبر عشرة مشاريع مسمّاة — بانوراما، سي فيو، جرين تاون، ماردي أكوا بارك، نوفوتيل باتومي وغيرها — لكلٍّ لغته البصرية داخل هوية واحدة.",
      en: "A company selling property in Batumi to investors who have never visited the city. So a post here is not an advert but a tour: where the project sits, what it looks onto, and why Georgia at all. Twenty-eight unbroken months across ten named developments — Panorama, Sea View, Green Town, Mardi Aqua Park, Novotel Batumi and others — each with its own visual line inside one identity.",
    },
    results: [
      { ar: "ثمانية وعشرون شهرًا متّصلة من المحتوى", en: "Twenty-eight unbroken months of content" },
      { ar: "عشرة مشاريع مسمّاة بلغة بصرية لكلٍّ منها", en: "Ten named developments, each with its own visual line" },
      { ar: "محتوى بثلاثة أرقام تواصل لثلاثة أسواق", en: "Content carrying three contact numbers for three markets" },
    ],
  },
  "amlak-revamp": {
    desc: {
      ar: "بعد ثمانية وعشرين شهرًا، كبرت الشركة على علامتها الأولى فبُنيت لها أخرى: من السداسي الذهبي إلى علامة زرقاء أهدأ تحتمل مشاريع أكبر. سبعة أشهر من المحتوى داخل العلامة الجديدة — رمادا ريزيدنسيز، ماردي أكوا بارك، ويندام، أركي — بنَفَس واحد يثبت أن التجديد شكلٌ جديد لا شركة جديدة.",
      en: "After twenty-eight months the company outgrew its first mark, so a second was built: from the gold hexagon to a quieter blue mark able to carry larger developments. Seven months of content inside the new brand — Ramada Residences, Mardi Aqua Park, Wyndham, Archi — in one voice, proving a rebrand is a new look and not a new company.",
    },
    results: [
      { ar: "سبعة أشهر من المحتوى داخل العلامة الجديدة", en: "Seven months of content inside the new brand" },
      { ar: "انتقال بلا انقطاع: لا شهر بين العلامتين", en: "A handover with no gap: not one month between the two brands" },
      { ar: "لغة بصرية أهدأ تحتمل مشاريع أكبر", en: "A quieter visual language able to carry larger developments" },
    ],
  },
  "profitmax-profile": {
    desc: {
      ar: "شركة استثمار تعمل من بريطانيا والإمارات. الملف يشرح عقود الاستثمار وضماناتها بلغة المستثمر لا بلغة النشرة — مدّة العقد، والعائد، وما الذي يضمنه، صفحةً بعد صفحة.",
      en: "An investment firm operating out of the UK and the UAE. The profile explains the investment contracts and their guarantees in the investor's language rather than a brochure's — contract term, return, and what backs it, page after page.",
    },
    results: [
      { ar: "ملف من ثلاث عشرة صفحة", en: "A thirteen-page profile" },
      { ar: "شرح عقود الاستثمار وضماناتها", en: "The investment contracts and their guarantees explained" },
      { ar: "بنَفَس الهوية والموقع نفسه", en: "In the same breath as the identity and the site" },
    ],
  },
  "hcc-profile": {
    desc: {
      ar: "شركة تأمين دولية مقرّها لندن. الملف يشرح السندات والضمانات لمشترٍ محترف يقرأ التفاصيل قبل أن يقرّر — أنواع التغطية، ونطاقها القانوني، وما يجعلها معترفًا بها دوليًا.",
      en: "A London-based international insurer. The profile explains bonds and guarantees to a professional buyer who reads the detail before deciding — types of cover, legal scope, and what makes them internationally recognised.",
    },
    results: [
      { ar: "ملف من سبع عشرة صفحة", en: "A seventeen-page profile" },
      { ar: "شرح كل نوع تغطية على حدة", en: "Each line of cover explained on its own" },
      { ar: "امتداد لموقعها بالرسالة نفسها", en: "An extension of the site, with the same message" },
    ],
  },
  "trustech-profile": {
    desc: {
      ar: "مجموعة مقاولات وتطوير بين الإمارات وبريطانيا. ملف مشروع «سكاي فيو» يُرسَل إلى المستثمر: الشركاء المنفّذون، والموقع ومسافاته، ومميزات الوحدة، والمخططات، والشهادات — ما يسأل عنه من يضع ماله لا من يتفرّج.",
      en: "A contracting and development group between the UAE and the UK. The Sky View project profile goes to an investor: the delivery partners, the location and its distances, the unit features, the plans, the certificates — what someone putting money in asks, not someone browsing.",
    },
    results: [
      { ar: "ملف مشروع من سبع عشرة صفحة", en: "A seventeen-page project profile" },
      { ar: "الشركاء والمخططات والشهادات", en: "Partners, plans, and certificates" },
      { ar: "عربي وإنجليزي لسوقين", en: "Arabic and English for two markets" },
    ],
  },
  "tdh-profile": {
    desc: {
      ar: "مشروع سكني في عجمان من ثلاث وثلاثين صفحة. الملف يمشي بالمستثمر من الشركاء العالميين إلى موقع المشروع إلى كل نمط وحدة بمخططاته ومساحاته — حتى يقرّر وهو يعرف ما يشتريه بالمتر.",
      en: "A thirty-three-page residential project in Ajman. The profile walks an investor from the international partners to the site to every unit type with its plans and areas — so the decision is made knowing what is bought, to the square metre.",
    },
    results: [
      { ar: "ملف مشروع من ثلاث وثلاثين صفحة", en: "A thirty-three-page project profile" },
      { ar: "مخططات ومساحات لكل نمط وحدة", en: "Plans and areas for every unit type" },
      { ar: "ماستر بلان ومميزات المجمّع", en: "A master plan and the compound's features" },
    ],
  },
  "hennawy-profile": {
    desc: {
      ar: "شركة تصنيع مناديل ورقية وكيماويات. الملف موجّه لمشترٍ صناعي: خطوط الإنتاج، والمنتجات، ومعايير الجودة، والشراكات — لا صور مصنع بلا معنى.",
      en: "A tissue-paper and chemicals manufacturer. The profile is written for an industrial buyer: production lines, products, quality standards, partnerships — not factory photography without meaning.",
    },
    results: [
      { ar: "ملف من اثنتي عشرة صفحة", en: "A twelve-page profile" },
      { ar: "خطوط الإنتاج والمنتجات ومعايير الجودة", en: "Production lines, products, and quality standards" },
      { ar: "بهوية الشركة التي بنيناها", en: "In the identity we built for the company" },
    ],
  },
  "alamein-profile": {
    desc: {
      ar: "مصنع هياكل ومقطورات في السعودية. الملف كتالوج بقدر ما هو تعريف: كل نوع مقطورة بصوره ومواصفاته، لأن المشتري هنا يقارن بالمواصفة لا بالكلام.",
      en: "A trailer and truck-body plant in Saudi Arabia. The profile is as much a catalogue as an introduction: every trailer type with its photographs and specification, because this buyer compares on spec, not on prose.",
    },
    results: [
      { ar: "ملف من ثمانٍ وعشرين صفحة", en: "A twenty-eight-page profile" },
      { ar: "كل نوع مقطورة بصوره ومواصفاته", en: "Every trailer type with photographs and specification" },
      { ar: "قالب ثابت يحتمل إضافة منتجات", en: "A fixed template that absorbs new products" },
    ],
  },
  "connect-profile": {
    desc: {
      ar: "شركة سعودية لتصميم وتنفيذ أجنحة المعارض. الملف نصفه تعريف ونصفه معرض أعمال: ثمانية عشر جناحًا منفّذًا لعلامات معروفة — لأن هذا القطاع يُشترى بالعين لا بالوصف.",
      en: "A Saudi exhibition-stand design and build company. Half the profile introduces, half of it shows: eighteen delivered stands for recognised brands — because this category is bought with the eye, not from a description.",
    },
    results: [
      { ar: "ملف من ثمانٍ وعشرين صفحة", en: "A twenty-eight-page profile" },
      { ar: "ثمانية عشر جناحًا منفّذًا بصورها", en: "Eighteen delivered stands, photographed" },
      { ar: "ربط الشركة برؤية السعودية 2030", en: "The company tied to Saudi Vision 2030" },
    ],
  },
  "sara-younis-brand": {
    desc: {
      ar: "علامة أزياء نسائية طلبت الاقتصاد والرقيّ معًا. بنينا الشعار على حرفين داخل شكل بيضاوي بلا زخرفة — علامة تحتمل أن تُطبع على البطاقة واللافتة والعبوة وتظلّ هي نفسها.",
      en: "A womenswear label that asked for restraint and refinement at once. We built the mark on two letters inside an oval with no ornament — a mark that can be printed on a card, a sign, and a package and stay itself.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات المتجر والعبوات", en: "Store and packaging applications" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  "expert-estate": {
    desc: {
      ar: "شركة استثمار عقاري. بنينا الشعار على حرف E مكرّرًا ومعكوسًا حتى يُقرأ مبنى — فيقول مجال الشركة قبل أن يُقرأ اسمها، بذهبٍ على داكن يليق بحجم الصفقة.",
      en: "A property investment firm. We built the mark on the letter E, repeated and mirrored until it reads as a building — stating the line of business before the name is read, in gold on dark to match the size of the deal.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  "hennawy-brand": {
    desc: {
      ar: "شركة ورق وصناعات كيماوية. جمعنا في الشعار حرف H وأنبوب اختبار وورقة نبات: الحرف للاسم، والأنبوب للكيمياء، والورقة للبيئة التي يقوم عليها ادّعاء الشركة — ثلاث إشارات في شكل واحد.",
      en: "A paper and chemical company. We folded the letter H, a test tube, and a leaf into one mark: the letter for the name, the tube for the chemistry, the leaf for the environmental claim the company rests on — three signals in one shape.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات صناعية وعبوات", en: "Industrial and packaging applications" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  "adg-profile": {
    desc: {
      ar: "شركة عقارات تربط المستثمر الخليجي بالسوق الجورجي. الملف يُرسَل إلى مستثمر يزن قراره بمئات الآلاف، فبُني على ما يسأل عنه: من أنتم، ولماذا جورجيا، وبأي أرقام — لا على سرد إنجازات. الهوية التي بنيناها للشركة هي نفسها التي يتكلّم بها الملف.",
      en: "A real estate firm connecting Gulf investors to the Georgian market. The profile goes to an investor weighing a decision worth hundreds of thousands, so it is built on what they ask — who you are, why Georgia, and on what numbers — rather than on a list of achievements. The identity we built for the company is the one the profile speaks in.",
    },
    results: [
      { ar: "ملف تعريفي من ثماني صفحات، عربي", en: "An eight-page company profile, in Arabic" },
      { ar: "قسم سوق بأرقام ومصادر معلنة", en: "A market section with figures and named sources" },
      { ar: "نسخة جاهزة للإرسال ونسخة للطباعة", en: "A version to send and a version to print" },
    ],
  },
  "profitmax-brand": {
    desc: {
      ar: "شركة استثمار تعمل من بريطانيا والإمارات. بنينا هوية تجمع حرف الاسم بسهم صاعد، فيقول الشعار تخصّص الشركة قبل أن يُقرأ اسمها، بلوحة ألوان تفصلها عن رمادية القطاع المالي.",
      en: "An investment firm operating out of the UK and the UAE. We built an identity folding the initial into a rising arrow, so the mark states the specialism before the name is read — with a palette that separates it from the greyness of the sector.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات ومطبوعات", en: "Applications and print" },
    ],
  },
  "alhayat-brand": {
    desc: {
      ar: "مزرعة دواجن في الرياض. بنينا الهوية من عناصر المزرعة نفسها — شمس وسنبلة قمح وأرض زراعية — لتقول جودة المنتج ونقاء بيئته دون ادّعاء مكتوب.",
      en: "A poultry farm in Riyadh. We built the identity from the farm's own elements — a sun, a wheat spike, cultivated land — so it states the quality of the product and the purity of its environment without a written claim.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تصميم العبوات والتغليف", en: "Packaging design" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  sedra: {
    desc: {
      ar: "علامة إكسسوارات فاخرة. بنينا الشعار على خطّ عربي مخصّص لكلمة «سدرة» — انسياب الحروف نفسه هو ما يقول رقّة المنتج، فلا يحتاج شرحًا.",
      en: "A luxury accessories brand. We built the mark on custom Arabic lettering of the word «Sedra» — the flow of the script itself carries the delicacy of the product, so it needs no explaining.",
    },
    results: [
      { ar: "شعار بخطّ عربي مخصّص", en: "A logo in custom Arabic lettering" },
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  alraghad: {
    desc: {
      ar: "علامة مجوهرات. جمعنا حرفي الاسم في شكل خاتم داخل إطار مقوّس، بلمسة ذهبية على خلفية داكنة — لغة القطاع نفسها، لكن بعلامة تُميَّز لا تُشبَّه.",
      en: "A jewellery brand. We folded the two initials into the shape of a ring inside an arched frame, gold on a dark ground — the language of the category, but a mark that is recognised rather than merely resembling.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات ومطبوعات", en: "Applications and print" },
    ],
  },
  "tech-care": {
    desc: {
      ar: "معامل تحاليل طبية. المطلوب شعار يقول الثقة والراحة معًا، فبنيناه على قطرة داخل حرف C وجزيئات تحليل، بأزرق طبّي يفصله عن حِدّة القطاع.",
      en: "A medical laboratory. The brief asked for a mark carrying both trust and reassurance, so we built it on a droplet inside the letter C with analysis particles, in a medical blue that softens the edge of the category.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  "vip-limo": {
    desc: {
      ar: "خدمة ليموزين في شيكاغو. بنينا الهوية على حرفي الاسم في صيغة شخصٍ واقف، ثم امتدّ العمل إلى واجهات التطبيق نفسه — الهوية والاستخدام من مصدر واحد.",
      en: "A limousine service in Chicago. We built the identity on the two initials read as a standing figure, then the work extended into the screens of the app itself — identity and use from one source.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "واجهات التطبيق (UI/UX)", en: "App interface design (UI/UX)" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  "auto-crazy-car": {
    desc: {
      ar: "خدمات سيارات. هوية عالية التباين تحمل حركةً وسرعة — الحرف المشقوق في الوسط يقول الطاقة قبل أن يُقرأ الاسم.",
      en: "An automotive service. A high-contrast identity carrying movement and speed — the split letter at its centre states the energy before the name is read.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  "caffeine-kiss": {
    desc: {
      ar: "علامة قهوة. الشعار فنجانٌ يُقرأ ابتسامةً في آنٍ واحد — فكرة واحدة تحمل اسم العلامة ومزاجها معًا، بلا زخرفة زائدة.",
      en: "A coffee brand. The mark is a cup that reads as a smile at the same time — one idea carrying both the name and the mood, with no decoration to spare.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات المقهى والعبوات", en: "Café and packaging applications" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  daughters: {
    desc: {
      ar: "شركة تجارة عامة. بنينا الشعار على صندوق شحن يُقرأ حرف الاسم الأول، فيقول مجال الشركة في لمحة واحدة دون سطر تعريفي.",
      en: "A general trading company. We built the mark on a shipping crate that reads as the initial, so it states the line of business at a glance without a descriptor line.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات ومطبوعات", en: "Applications and print" },
    ],
  },
  "profitmax-web": {
    desc: {
      ar: "موقع شركة استثمار تعمل من بريطانيا والإمارات. بنيناه ثنائي اللغة يعرض الخدمات وعقود التأمين، ويقود الزائر إلى حجز استشارة بدل أن يتركه يقرأ ويغادر.",
      en: "A site for an investment firm operating out of the UK and the UAE. We built it bilingual, presenting the services and contract insurance, and leading the visitor to book a consultation rather than read and leave.",
    },
    results: [
      { ar: "موقع ثنائي اللغة", en: "A bilingual site" },
      { ar: "صفحات خدمات مفصّلة", en: "Detailed service pages" },
      { ar: "مسار واضح لحجز الاستشارة", en: "A clear path to booking a consultation" },
    ],
  },
  "utility-vision": {
    desc: {
      ar: "شركة مقاولات في جدة. بنينا موقعًا يعرض المشاريع والخدمات بلغة القطاع، مع مسار «اطلب عرض سعر» ظاهر في كل صفحة لا في صفحة التواصل وحدها.",
      en: "A contracting company in Jeddah. We built a site presenting the projects and services in the language of the sector, with a request-a-quote path visible on every page rather than on the contact page alone.",
    },
    results: [
      { ar: "موقع يعرض المشاريع والخدمات", en: "A site presenting projects and services" },
      { ar: "نسخة جوّال مبنيّة لا مصغّرة", en: "A mobile version built, not shrunk" },
      { ar: "مسار طلب عرض السعر في كل صفحة", en: "A quote-request path on every page" },
    ],
  },
  "future-axis": {
    desc: {
      ar: "شركة مقاولات في السعودية. الموقع يعرض السجلّ والموردين والمشاريع الأخيرة — ما يسأل عنه المقاول الباحث عن شريك تنفيذ، لا ما يبدو جميلًا في العرض.",
      en: "A Saudi contracting company. The site presents the record, the suppliers, and the latest projects — what a contractor looking for a delivery partner asks about, not what looks good in a showreel.",
    },
    results: [
      { ar: "موقع بسجلّ مشاريع ومورّدين", en: "A site with a project and supplier record" },
      { ar: "صفحات خدمات مفصّلة", en: "Detailed service pages" },
      { ar: "نموذج استشارة مجانية", en: "A free-consultation form" },
    ],
  },
  "alhayat-web": {
    desc: {
      ar: "مزرعة دواجن في الرياض. بنينا متجرًا إلكترونيًا يعرض المنتجات ويستقبل الطلبات، بالهوية نفسها التي بنيناها للمزرعة — فما على العبوة هو ما على الشاشة.",
      en: "A poultry farm in Riyadh. We built an online store that presents the products and takes orders, in the same identity we built for the farm — so what is on the pack is what is on screen.",
    },
    results: [
      { ar: "متجر إلكتروني يستقبل الطلبات", en: "An online store taking orders" },
      { ar: "صفحات منتجات ومعرض", en: "Product pages and a gallery" },
      { ar: "امتداد للهوية لا نسخة منها", en: "An extension of the identity, not a copy of it" },
    ],
  },
  greenmark: {
    desc: {
      ar: "شركة تأسيس شركات وتخليص أوراق في دبي. أدرنا حضورها على السوشيال بمحتوى يجيب أسئلة العميل الفعلية — كم تستغرق؟ ما التراخيص؟ كيف تُستخرج التأشيرة؟ — بدل إعلانات عامّة.",
      en: "A company-formation and document-clearing firm in Dubai. We ran its social presence on content answering the questions clients actually ask — how long it takes, which licences, how a visa is issued — instead of generic advertising.",
    },
    results: [
      { ar: "محتوى شهري بالعربية والإنجليزية", en: "Monthly content in Arabic and English" },
      { ar: "تصاميم تجيب أسئلة العميل مباشرةً", en: "Designs answering client questions directly" },
      { ar: "حضور منتظم على المنصّات", en: "A steady presence across the platforms" },
    ],
  },
  rahiq: {
    desc: {
      ar: "علامة عسل ومنتجات طبيعية في مصر. بنينا محتوى شهريًا يربط المنتج بمناسبات السنة وفوائده الغذائية، فصار المنشور سببًا للشراء لا صورةً للمنتج.",
      en: "A honey and natural-products brand in Egypt. We built monthly content tying the product to the occasions of the year and to its nutritional value, so a post became a reason to buy rather than a picture of the product.",
    },
    results: [
      { ar: "محتوى شهري متّصل بمناسبات السنة", en: "Monthly content tied to the occasions of the year" },
      { ar: "قالب بصري ثابت للعلامة", en: "A consistent visual template for the brand" },
      { ar: "حضور منتظم على المنصّات", en: "A steady presence across the platforms" },
    ],
  },
  "sat-leaders": {
    desc: {
      ar: "أكاديمية تحضير لاختبارات SAT وACT وEST في مصر. بنينا محتوى يخاطب قلق الطالب وولي الأمر معًا — الدرجة والمدّة والطريقة — بلغة واضحة لا بشعارات تعليمية.",
      en: "An academy preparing students for the SAT, ACT and EST in Egypt. We built content addressing the anxiety of both student and parent — the score, the timeline, the method — in plain language rather than educational slogans.",
    },
    results: [
      { ar: "محتوى شهري لمواسم الاختبارات", en: "Monthly content across the exam seasons" },
      { ar: "قالب بصري ثابت للأكاديمية", en: "A consistent visual template for the academy" },
      { ar: "حضور منتظم على المنصّات", en: "A steady presence across the platforms" },
    ],
  },
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
  "trustech-web": {
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
  "hcc-insurance": {
    desc: {
      ar: "شركة تأمين دولية مقرّها لندن. بنينا موقعًا مؤسسيًا يقوم على رسالة الثقة والقوة المالية عبر خمسة عقود من الخبرة، بصفحات خدمات تشرح كل نوع تأمين على حدة.",
      en: "An international insurance company based in London. We built a corporate site on a message of trust and financial strength across five decades, with service pages explaining each line of cover on its own.",
    },
    results: [
      { ar: "موقع مؤسسي", en: "Corporate site" },
      { ar: "صفحات خدمات", en: "Service pages" },
      { ar: "نماذج تواصل", en: "Contact forms" },
    ],
  },
  "sara-younis-web": {
    desc: {
      ar: "علامة أزياء نسائية. بنينا متجرًا بتصميم مينيمال أبيض وأسود يترك الصورة تتكلّم، ويقصّر الطريق من التصفّح إلى الشراء بدل أن يزيّن الصفحة.",
      en: "A womenswear label. We built a store in a minimal black-and-white design that lets the photography speak, and shortens the path from browsing to buying rather than decorating the page.",
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
  label: { ar: "الحلول", en: "Solutions" } as Bi,
  title: {
    ar: ["ابدأ من وضعك،", "لا من قائمة خدمات."],
    en: ["Start from where you are,", "not from a list of services."],
  } as Bi<string[]>,
  intro: {
    ar: "أربعة أوضاع نراها متكرّرة في السوق، لكلٍّ منها حلّ مختلف — اقرأ الأقرب إلى وضعكم.",
    en: "Four situations we see repeatedly, each with a different answer — read the one closest to yours.",
  } as Bi,
  ctaLines: {
    ar: ["لستم متأكدين", "أيّها يناسبكم؟"],
    en: ["Not sure which", "one fits you?"],
  } as Bi<string[]>,
  ctaPrimary: { ar: "احجز جلسة تحديد النطاق", en: "Book a scoping call" } as Bi,
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
  /* لكل سوق توقيته: «أوقات العمل» بلا منطقة زمنية سؤالٌ مفتوح على
     من يقرأ من مدينة أخرى — ونحن نُجدوِل على توقيت العميل لا توقيتنا. */
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
    ar: "مقالات عن الهوية والمواقع والتسويق الرقمي — بأرقام وأمثلة من مشاريع فعلية في الخليج ومصر وأوروبا، لا نصائح عامّة.",
    en: "Notes on branding, websites, and digital marketing — with numbers and examples from real projects across the Gulf, Egypt and Europe, rather than general advice.",
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
