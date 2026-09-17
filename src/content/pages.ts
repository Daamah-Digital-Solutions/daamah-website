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
    ar: "دَعمة للحلول الرقمية شركة تبني الحضور الرقمي للشركات. في عالم رقمي سريع، الظهور الاحترافي لم يعد خيارًا بل ضرورة — ومنذ 2018 ونحن نعمل مع شركات في الخليج وأوروبا ومصر لنحوّل أفكارها إلى حضور رقمي واضح.",
    en: "Daamah Digital Solutions builds the digital presence of companies. In a fast-moving digital world, looking professional is no longer optional — and since 2018 we have worked with companies across the Gulf, Europe, and Egypt, turning their ideas into a clear digital presence.",
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

/* تفصيل كل خدمة انتقل إلى ملفّه — صار أكبر من أن يعيش وسط نصوص الصفحات */
export { serviceDetails } from "./serviceDetails";

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
  /* ── سوشيال من أرشيف العملاء — الوصف مما تقوله التصاميم نفسها ── */
  "saif-events": {
    desc: {
      ar: "سيف للفعاليات شركة سعودية لتنظيم الفعاليات والمؤتمرات بخبرة عشرين عامًا، اختارتها أسماء كبيرة لتدير مناسباتها من التخطيط حتى آخر تفصيلة في يوم الحدث.",
      en: "Saif Events is a Saudi events and conference company with twenty years of experience, chosen by major names to run their occasions from planning to the final detail on the day.",
    },
    results: [
      { ar: "سبعة أشهر متّصلة من المحتوى", en: "Seven unbroken months of content" },
      { ar: "محتوى يشرح طريقة العمل لا يعدّد الخدمات", en: "Content explaining the method, not listing services" },
      { ar: "لغة بصرية واحدة عبر الشهور", en: "One visual language across the months" },
    ],
  },
  "dr-asmaa-saeed": {
    desc: {
      ar: "د. أسماء سعيد اختصاصية في الصحة النفسية، تقدّم جلسات علاج وإرشاد نفسي قائمة على العلاج المعرفي السلوكي، وتعمل مع قضايا القلق والكمالية وأنماط التعلّق والعلاقات.",
      en: "Dr. Asmaa Saeed is a mental-health specialist offering therapy and counselling grounded in cognitive behavioural therapy, working with anxiety, perfectionism, attachment styles and relationships.",
    },
    results: [
      { ar: "محتوى توعوي يبني الثقة قبل الحجز", en: "Awareness content that builds trust before booking" },
      { ar: "سلاسل مترابطة حول موضوع واحد كل شهر", en: "Linked series around one theme each month" },
      { ar: "هوية بصرية هادئة تناسب الموضوع", en: "A calm visual identity suited to the subject" },
    ],
  },
  "eliodoro-derma": {
    desc: {
      ar: "إليودورو ديرما علامة مصرية للعناية العلاجية بالبشرة، قدّمت أول مجموعة متكاملة لعلاج حبّ الشباب للبشرة الدهنية والمختلطة، وأول لوشن جسم علاجي في السوق المصري.",
      en: "Eliodoro Derma is an Egyptian therapeutic skincare brand that introduced the first complete acne-treatment range for oily and combination skin, and the first therapeutic body lotion in the Egyptian market.",
    },
    results: [
      { ar: "المنتج مقدَّم كحلّ لمشكلة لا كصورة", en: "The product presented as a solution, not a picture" },
      { ar: "تصوير منتجات موحّد عبر الشهور", en: "Consistent product imagery across the months" },
      { ar: "روتينات جاهزة تُحفظ وتُشارك", en: "Ready routines made to be saved and shared" },
    ],
  },
  "alamein-social": {
    desc: {
      ar: "مصنع هياكل العلمين من مصانع الهياكل المعدنية والمقطورات الثقيلة في السعودية، يعمل منذ أكثر من اثني عشر عامًا ويورّد لشركات النقل والشحن هياكل مصمّمة لطرق المملكة وأحمالها.",
      en: "Alamein Trailers is a Saudi manufacturer of steel bodies and heavy trailers, operating for more than twelve years and supplying transport and haulage companies with bodies built for the Kingdom's roads and loads.",
    },
    results: [
      { ar: "محتوى صناعي يخاطب مشتري الأساطيل", en: "Industrial content aimed at fleet buyers" },
      { ar: "حضور في المناسبات الوطنية السعودية", en: "A presence across Saudi national occasions" },
      { ar: "ألوان العلامة ثابتة في كل منشور", en: "Brand colours held in every post" },
    ],
  },
  "alraghad-social": {
    desc: {
      ar: "الرغد علامة مجوهرات وذهب في مصر، تقدّم تشكيلات من الذهب والقطع المرصّعة تجمع بين الفخامة والتصميم العصري، لمن يشتري الذهب زينةً واستثمارًا معًا.",
      en: "Al Raghad is a gold and jewellery brand in Egypt offering gold and set pieces that combine luxury with contemporary design, for buyers who see gold as both adornment and investment.",
    },
    results: [
      { ar: "لغة بصرية فاخرة ثابتة", en: "A consistent luxury visual language" },
      { ar: "محتوى مرتبط بالمواسم والمناسبات", en: "Content tied to seasons and occasions" },
      { ar: "امتداد مباشر لهوية العلامة", en: "A direct extension of the brand identity" },
    ],
  },
  alqalaa: {
    desc: {
      ar: "القلعة لصناعة وتجارة الكيماويات شركة مصرية تورّد المواد الكيميائية والخامات للمصانع، وتعمل بخامات من IFF العالمية لقطاعات الروائح والنكهات.",
      en: "Alqalaa for Chemicals Manufacturing and Trading is an Egyptian company supplying chemicals and raw materials to factories, working with raw materials from global IFF for the fragrance and flavour sectors.",
    },
    results: [
      { ar: "محتوى B2B يخاطب أصحاب المصانع", en: "B2B content aimed at factory owners" },
      { ar: "عبوة المنتج بطلٌ بصري ثابت", en: "The product drum as a consistent visual hero" },
      { ar: "سلسلة منتجات بلون لكل رائحة", en: "A product series with a colour for each scent" },
    ],
  },
  capimax: {
    desc: {
      ar: "كابيماكس للاستثمار شركة استثمار تجمع الخبرة المحلية بالرؤية العالمية، وتقدّم فرصًا استثمارية وشراكات استراتيجية في وجهات عالمية، منها الاستثمار السياحي.",
      en: "Capimax Investments pairs local expertise with a global vision, offering investment opportunities and strategic partnerships in destinations worldwide, including tourism investment.",
    },
    results: [
      { ar: "محتوى ثنائي اللغة", en: "Bilingual content" },
      { ar: "كاروسيلات تشرح الفكرة خطوة بخطوة", en: "Carousels explaining ideas step by step" },
      { ar: "سبعة أشهر متّصلة من المحتوى", en: "Seven unbroken months of content" },
    ],
  },
  "amr-elkazaz": {
    desc: {
      ar: "أكاديمية عمرو القزاز أكاديمية لياقة بدنية في المنوفية، متخصّصة في تأهيل المتقدّمين للكليات العسكرية بدنيًا، إلى جانب برامج اللياقة وورش التدريب المتخصّصة.",
      en: "Amr El-Kazaz Fitness Academy is a fitness academy in Menoufia specialising in the physical preparation of military college applicants, alongside fitness programmes and specialist training workshops.",
    },
    results: [
      { ar: "محتوى يخاطب جمهورين: المتقدّم والرياضي", en: "Content for two audiences: applicants and athletes" },
      { ar: "إعلانات الورش والفعاليات", en: "Workshop and event announcements" },
      { ar: "صور حركة وطاقة بدل القوالب", en: "Energy and motion instead of templates" },
    ],
  },
  "dr-hesham-omar": {
    desc: {
      ar: "صيدلية د. هشام عمر صيدلية مصرية تخدم عملاءها منذ 2003، وتوفّر الأدوية ومنتجات العناية بالبشرة والتجميل والمكمّلات الغذائية من علامات عالمية.",
      en: "Dr. Hesham Omar Pharmacy has served its customers in Egypt since 2003, providing medicines along with skincare, beauty and supplement products from international brands.",
    },
    results: [
      { ar: "منشورات منتجات بعروض واضحة", en: "Product posts with clear offers" },
      { ar: "محتوى يبني الثقة المحلّية", en: "Content building local trust" },
      { ar: "قالب بصري ثابت للصيدلية", en: "A consistent visual template for the pharmacy" },
    ],
  },
  "ems-elriadh": {
    desc: {
      ar: "إي إم إس الرياض مركز تدريب بتقنية التحفيز الكهربائي للعضلات في الرياض، يقدّم جلسات تدريب مكثّفة مدّتها عشرون دقيقة تحت إشراف مدرّبين، لمن يريد نتيجة أسرع في وقت أقل.",
      en: "EMS Elriadh is an electrical muscle stimulation training studio in Riyadh, offering intensive twenty-minute sessions under trainer supervision for people who want faster results in less time.",
    },
    results: [
      { ar: "محتوى يشرح تقنية جديدة ببساطة", en: "Content explaining a new technology simply" },
      { ar: "لهجة سعودية تناسب الجمهور", en: "Saudi dialect suited to the audience" },
      { ar: "صور تدريب حقيقية", en: "Real training imagery" },
    ],
  },
  "almohandes-travels": {
    desc: {
      ar: "المهندس للسياحة شركة سياحة وسفر في مصر، تنظّم رحلات وبرامج سفر متكاملة إلى وجهات حول العالم — من المغرب والسعودية إلى أوروبا وآسيا.",
      en: "Almohandes Travels is a travel and tourism company in Egypt organising complete trips and travel programmes to destinations worldwide — from Morocco and Saudi Arabia to Europe and Asia.",
    },
    results: [
      { ar: "محتوى وجهات يُلهم بالسفر", en: "Destination content that inspires travel" },
      { ar: "عروض رحلات بتصميم موحّد", en: "Trip offers in a unified design" },
      { ar: "حضور في المناسبات الوطنية", en: "A presence on national occasions" },
    ],
  },
  natwan: {
    desc: {
      ar: "نطوان شقق فندقية في الدمام، تقدّم إقامة بمعايير نظافة وخدمة فندقية من فئة الخمس نجوم، للعائلات ورجال الأعمال والزوّار.",
      en: "Natwan offers serviced apartments in Dammam with five-star standards of cleanliness and hotel service, for families, business travellers and visitors.",
    },
    results: [
      { ar: "أفكار بصرية بدل صور الغرف المكرّرة", en: "Visual ideas instead of repetitive room photos" },
      { ar: "لهجة سعودية قريبة", en: "Approachable Saudi dialect" },
      { ar: "دعوة واضحة إلى الحجز", en: "A clear call to book" },
    ],
  },
  "techcare-social": {
    desc: {
      ar: "معامل تك كير للتحاليل الطبية معامل مصرية لها فرع في مدينة السادات، تقدّم التحاليل الشاملة والفحوصات الدورية للكبار والأطفال بأجهزة حديثة.",
      en: "Tech Care Labs are Egyptian medical laboratories with a branch in Sadat City, offering comprehensive tests and routine check-ups for adults and children on modern equipment.",
    },
    results: [
      { ar: "محتوى صحّي بلغة الناس", en: "Health content in everyday language" },
      { ar: "عروض فحوصات بتصميم واضح", en: "Test offers in a clear design" },
      { ar: "امتداد لهوية المعامل", en: "An extension of the labs' identity" },
    ],
  },
  "mardi-holding": {
    desc: {
      ar: "ماردي القابضة شركة تطوير عقاري في جورجيا بخبرة ثلاثين عامًا وأكثر من عشرة آلاف عميل، ومشاريعها في أفضل مواقع باتومي مثل ماردي هيلز وماردي أكوا بارك.",
      en: "Mardi Holding is a real estate developer in Georgia with thirty years of experience and more than ten thousand clients, with projects in Batumi's best locations such as Mardi Hills and Mardi Aqua Park.",
    },
    results: [
      { ar: "محتوى استثماري للمستثمر الخليجي", en: "Investment content for Gulf investors" },
      { ar: "الوجهة قبل الوحدة", en: "The destination before the unit" },
      { ar: "صور معمارية بمستوى القرار", en: "Architectural imagery matching the decision" },
    ],
  },
  "hedaya-dental": {
    desc: {
      ar: "مركز هداية لطب وجراحة الأسنان في طنطا، يضمّ أكبر فريق طبي للأسنان في المدينة، ويقدّم التقويم وتجميل الأسنان وجراحة الفم تحت سقف واحد.",
      en: "Hedaya Dental Center in Tanta houses the largest dental team in the city, offering orthodontics, cosmetic dentistry and oral surgery under one roof.",
    },
    results: [
      { ar: "محتوى توعوي وعروض علاج", en: "Awareness content and treatment offers" },
      { ar: "صور مفاهيمية بدل صور العيادة", en: "Conceptual imagery instead of clinic photos" },
      { ar: "ألوان العلامة في كل منشور", en: "Brand colours in every post" },
    ],
  },
  "mohamed-gamal-law": {
    desc: {
      ar: "مكتب محمد جمال للمحاماة والاستشارات القانونية في مصر، يتولّى القضايا الجنائية والمدنية ويقدّم الاستشارات القانونية للأفراد والشركات.",
      en: "Mohamed Gamal Law Office is an Egyptian law and legal consultancy firm handling criminal and civil cases and advising individuals and companies.",
    },
    results: [
      { ar: "محتوى قانوني رصين", en: "Measured legal content" },
      { ar: "صور رمزية بدل صور المكتب", en: "Symbolic imagery instead of office photos" },
      { ar: "لغة بصرية داكنة تناسب المهنة", en: "A dark visual language suited to the profession" },
    ],
  },
  "profitmax-social": {
    desc: {
      ar: "بروفيت ماكس للاستثمار شركة خدمات مالية تعمل من المملكة المتحدة والإمارات، بخبرة ستة عشر عامًا في إدارة الاستثمارات وحلول مالية متنوّعة مبدؤها الأمان أولًا.",
      en: "Profit Max Investments is a financial services company operating from the United Kingdom and the UAE, with sixteen years of investment management experience and diverse financial solutions built on security first.",
    },
    results: [
      { ar: "محتوى إنجليزي بمستوى مؤسسي", en: "Corporate-grade English content" },
      { ar: "امتداد للهوية والموقع والملف", en: "An extension of the identity, site and profile" },
      { ar: "تعريف بالفريق والخدمات", en: "Introducing the team and services" },
    ],
  },
  "trustech-social": {
    desc: {
      ar: "تراستك مجموعة مقاولات وتطوير عقاري بخبرة تتجاوز أربعين عامًا في البناء، تعمل في الإمارات وتوسّعت إلى المملكة المتحدة، وتقدّم صيانة سنوية مجانية لعشر سنوات على مشاريعها.",
      en: "Trustech is a contracting and real estate development group with more than forty years in construction, operating in the UAE and expanding into the United Kingdom, with ten years of free annual maintenance on its projects.",
    },
    results: [
      { ar: "محتوى إنجليزي لشركة مقاولات", en: "English content for a contracting firm" },
      { ar: "امتداد للموقع والملف التعريفي", en: "An extension of the website and profile" },
      { ar: "إبراز الخبرة والتوسّع", en: "Highlighting experience and expansion" },
    ],
  },
  "4k-studio": {
    desc: {
      ar: "4K ستوديو ستوديو متخصّص في تصوير الأفراح، يوثّق يوم الزفاف بأسلوب سينمائي ويخطّط مع العروسين كل لقطة قبل اليوم الكبير.",
      en: "4K Studio is a wedding photography studio that documents the wedding day in a cinematic style, planning every shot with the couple before the big day.",
    },
    results: [
      { ar: "محتوى إطلاق للاستوديو", en: "Launch content for the studio" },
      { ar: "صور الاستوديو نفسه بطل المنشور", en: "The studio's own photos as the hero" },
      { ar: "لغة بصرية رومانسية موحّدة", en: "A unified romantic visual language" },
    ],
  },
  "emaar-alryada": {
    desc: {
      ar: "إعمار الريادة شركة تطوير عقاري، ومن مشاريعها «رويال بالاس»: مجمّع سكني فاخر بطابع معماري كلاسيكي وحدائق ومسطّحات مائية.",
      en: "Emaar Alryada is a real estate developer whose projects include Royal Palace, a luxury residential compound with classical architecture, gardens and water features.",
    },
    results: [
      { ar: "محتوى يبيع أسلوب الحياة", en: "Content selling the lifestyle" },
      { ar: "لغة بصرية فاخرة للمشروع", en: "A luxury visual language for the project" },
      { ar: "إبراز مزايا المشروع واحدة واحدة", en: "The project's features shown one by one" },
    ],
  },
  "dr-mohamed-ewida": {
    desc: {
      ar: "عيادة د. محمد عويضة لطب الأسنان عيادة تخصّصية تقدّم علاجات الأسنان وتجميلها بتجهيزات حديثة وبروتوكولات تعقيم صارمة.",
      en: "Dr. Mohamed Ewida Dental Clinic is a specialist practice offering dental treatment and cosmetic dentistry with modern equipment and strict sterilisation protocols.",
    },
    results: [
      { ar: "محتوى افتتاح العيادة", en: "Clinic opening content" },
      { ar: "تعريف بالتجهيزات والخدمات", en: "Introducing equipment and services" },
      { ar: "ألوان العيادة في كل منشور", en: "The clinic's colours in every post" },
    ],
  },
  "fragancia-social": {
    desc: {
      ar: "فراجانسيا علامة مصرية للعناية الشخصية والجمال، تقدّم منتجات للعناية بالبشرة والشعر ومستحضرات تجميل لعميلات يبحثن عن جودة يُعتمد عليها.",
      en: "Fragancia is an Egyptian personal care and beauty brand offering skin and hair care and cosmetics for customers who want quality they can rely on.",
    },
    results: [
      { ar: "محتوى منتجات بلغة قريبة", en: "Product content in approachable language" },
      { ar: "امتداد للمتجر الإلكتروني", en: "An extension of the online store" },
      { ar: "تصوير منتجات ناعم وموحّد", en: "Soft, unified product photography" },
    ],
  },
  "vibrant-social": {
    desc: {
      ar: "فايبرانت ديزاين شركة تصميم داخلي وتنفيذ بخبرة تتجاوز عشرين عامًا ومئات المشاريع المنفّذة، متخصّصة في المساحات السكنية والتجارية الفاخرة.",
      en: "Vibrant Design is an interior design and fit-out company with more than twenty years of experience and hundreds of completed projects, specialising in luxury residential and commercial spaces.",
    },
    results: [
      { ar: "محتوى إنجليزي لشركة تصميم داخلي", en: "English content for an interior design firm" },
      { ar: "امتداد للموقع الإلكتروني", en: "An extension of the website" },
      { ar: "لغة بصرية دافئة وفاخرة", en: "A warm, luxurious visual language" },
    ],
  },
  "bird-area": {
    desc: {
      ar: "بيرد إيريا متجر متخصّص في مستلزمات الحيوانات الأليفة — الطيور والقطط والكلاب — من الأغذية إلى الإكسسوارات وأماكن النوم.",
      en: "Bird Area is a store specialising in pet supplies — for birds, cats and dogs — from food to accessories and beds.",
    },
    results: [
      { ar: "محتوى بيع مرح وقريب", en: "Playful, approachable selling content" },
      { ar: "لون العلامة ثابت", en: "The brand colour held throughout" },
      { ar: "منتجات معروضة بوضوح", en: "Products shown clearly" },
    ],
  },
  "xtreme-blue": {
    desc: {
      ar: "إكستريم بلو الموزّع الحصري في مصر لشركة IFF العالمية، إحدى كبرى شركات الروائح والنكهات في العالم، وتورّد الزيوت العطرية للمصانع وخطوط الإنتاج.",
      en: "Xtreme Blue is the exclusive distributor in Egypt for IFF, one of the world's leading fragrance and flavour companies, supplying fragrance oils to factories and production lines.",
    },
    results: [
      { ar: "خمسة وعشرون شهرًا متّصلة من المحتوى", en: "Twenty-five unbroken months of content" },
      { ar: "لغة تخاطب المشتري الصناعي والعلامة معًا", en: "A language addressing the industrial buyer and the brand at once" },
      { ar: "حضور منتظم في قطاع يندر فيه المحتوى", en: "A steady presence in a category that rarely publishes" },
    ],
  },
  muri: {
    desc: {
      ar: "موري للتطوير العقاري شركة مصرية تطوّر مشاريع سكنية، وتقدّم وحدات بأنظمة سداد مرنة لمن ينتقل من الإيجار إلى التملّك.",
      en: "Muri Real Estate is an Egyptian developer of residential projects, offering units with flexible payment plans for people moving from renting to owning.",
    },
    results: [
      { ar: "تسعة عشر شهرًا متّصلة من المحتوى", en: "Nineteen unbroken months of content" },
      { ar: "رسالة واحدة تتكرّر بصور مختلفة", en: "One message repeated through different images" },
      { ar: "حضور منتظم عبر مواسم السوق", en: "A steady presence across the market's seasons" },
    ],
  },
  swissroll: {
    desc: {
      ar: "سويسرول علامة حلويات شرقية وغربية انطلقت من شبين الكوم، تشتهر بالتورت والجاتوهات وحلويات المواسم، وتوصّل منتجاتها إلى البيوت.",
      en: "Swiss Roll is an oriental and western patisserie brand that started in Shebin El Kom, known for its cakes, gateaux and seasonal sweets, and delivers to customers' homes.",
    },
    results: [
      { ar: "سبعة عشر شهرًا متّصلة من المحتوى", en: "Seventeen unbroken months of content" },
      { ar: "تقويم مبنيّ على مواسم البيع لا على الأسبوع", en: "A calendar built on selling seasons rather than weeks" },
      { ar: "لغة بصرية واحدة عبر عشرات المنتجات", en: "One visual language across dozens of products" },
    ],
  },
  vida: {
    desc: {
      ar: "فيدا فيتنس كلوب نادٍ رياضي متكامل في مصر، يقدّم صالات تدريب وبرامج لياقة وتخسيس بأجهزة حديثة، مع أنظمة تقسيط عبر شركاء تمويل.",
      en: "Vida Fitness Club is a full-service gym in Egypt offering training floors, fitness and weight-loss programmes on modern equipment, with instalment plans through financing partners.",
    },
    results: [
      { ar: "ستّة عشر شهرًا متّصلة من المحتوى", en: "Sixteen unbroken months of content" },
      { ar: "محتوى مبنيّ على الاعتراض لا على العرض", en: "Content built on the objection rather than the offer" },
      { ar: "شركاء التقسيط في كل منشور", en: "Instalment partners present on every post" },
    ],
  },
  "atm-realestate": {
    desc: {
      ar: "إيه تي إم للتطوير العقاري شركة مصرية تقدّم تنوّعًا واسعًا في المساحات السكنية والإدارية والتجارية، مع نظام يتيح للمالك تفويض وحدته للإيجار.",
      en: "ATM Real Estate Development is an Egyptian developer offering a wide variety of residential, office and retail spaces, with a scheme that lets owners delegate their unit for rental.",
    },
    results: [
      { ar: "ستّة عشر شهرًا متّصلة من المحتوى", en: "Sixteen unbroken months of content" },
      { ar: "وعد واحد يتكرّر حتى يُحفظ", en: "One promise repeated until it sticks" },
      { ar: "لغة بصرية تفصله عن إعلانات القطاع", en: "A visual language that separates it from the category's advertising" },
    ],
  },
  nasea: {
    desc: {
      ar: "ناصع مصنع مصري للمنظّفات يبيع بالجملة للموزّعين والمخازن، ومنتجاته من أساسيات تجارة المنظّفات في السوق.",
      en: "Nasea is an Egyptian detergent manufacturer selling wholesale to distributors and warehouses, with products that are staples of the detergent trade.",
    },
    results: [
      { ar: "ثلاثة عشر شهرًا متّصلة من المحتوى", en: "Thirteen unbroken months of content" },
      { ar: "خطاب موجَّه إلى الموزّع لا إلى المستهلك", en: "Content addressed to the distributor, not the consumer" },
      { ar: "عرض المنتجات كخطّ لا كأصناف متفرّقة", en: "The range presented as a line rather than scattered items" },
    ],
  },
  godran: {
    desc: {
      ar: "غدران للاستشارات والتسويق العقاري في مصر، فريق بخبرة في السوق يرشد المشتري إلى المشروع المناسب، للسكن أو للاستثمار.",
      en: "Godran is a real estate consultancy and marketing firm in Egypt, with a team experienced in the market guiding buyers to the right project, for living or investment.",
    },
    results: [
      { ar: "أربعة عشر شهرًا متّصلة من المحتوى", en: "Fourteen unbroken months of content" },
      { ar: "بناء ثقة يسبق عرض الوحدة", en: "Trust built ahead of the unit being shown" },
      { ar: "حضور منتظم عبر موسمين كاملين", en: "A steady presence across two full seasons" },
    ],
  },
  alawael: {
    desc: {
      ar: "أملاك الأوائل شركة عقارية تفتح للمستثمر السعودي والخليجي باب التملّك في جورجيا، وترافقه من اختيار العقار حتى التملّك والإقامة.",
      en: "Amlak Alawael is a real estate company opening property ownership in Georgia to Saudi and Gulf investors, accompanying them from choosing the property through to ownership and residency.",
    },
    results: [
      { ar: "أحد عشر شهرًا متّصلة من المحتوى", en: "Eleven unbroken months of content" },
      { ar: "طمأنة على القانون والموقع والعائد معًا", en: "Reassurance on the legal, the location and the return together" },
      { ar: "محتوى يخاطب مشتريًا لا يعاين بنفسه", en: "Content for a buyer who never views in person" },
    ],
  },
  "royal-consultant": {
    desc: {
      ar: "رويال كونسلتنتس بيت استشارات وتحوّل رقمي في مصر، وشريك لأودو يطبّق أنظمة إدارة الشركات — المبيعات والمخازن والمحاسبة والفوترة الإلكترونية — للشركات والمستشفيات.",
      en: "Royal Consultants is a consulting and digital transformation firm in Egypt and an Odoo partner implementing business management systems — sales, inventory, accounting and e-invoicing — for companies and hospitals.",
    },
    results: [
      { ar: "سبعة أشهر من المحتوى المنتظم", en: "Seven months of steady content" },
      { ar: "خطاب يبدأ بالمشكلة لا بالمنتج", en: "Content that opens on the problem, not the product" },
      { ar: "هوية موحّدة عبر مناسبات السنة", en: "One consistent identity across the year's occasions" },
    ],
  },
  alhaitham: {
    desc: {
      ar: "الهيثم للاستشارات مكتب استشارات قانونية وهندسية في مصر، يتولّى ملفّات الخدمة العسكرية والقضايا العسكرية وتأسيس شركات الاستيراد والتصدير.",
      en: "Al Haitham Consultancy is a legal and engineering consultancy in Egypt handling military service files, military cases and the incorporation of import and export companies.",
    },
    results: [
      { ar: "محتوى مبنيّ على سؤال يُبحَث عنه", en: "Content built on a question people search for" },
      { ar: "لغة بصرية جادّة تناسب القطاع", en: "A serious visual language fit for the category" },
      { ar: "تخصّصات معروضة كلٌّ على حدة", en: "Each specialism presented on its own" },
    ],
  },
  almuttahida: {
    desc: {
      ar: "المتحدة للخدمات الجمركية شركة تخليص جمركي وشحن في مصر، تتولّى إجراءات الموانئ والجمارك والنقل للمستوردين والمصدّرين من الميناء حتى المخزن.",
      en: "United Customs Services is a customs clearance and shipping company in Egypt handling port, customs and transport procedures for importers and exporters, from the port to the warehouse.",
    },
    results: [
      { ar: "محتوى يبيع زوال القلق لا الخدمة", en: "Content selling the end of the worry, not the service" },
      { ar: "لغة بصرية من عالم الشحن نفسه", en: "A visual language taken from freight itself" },
      { ar: "حضور في قطاع يعتمد على العلاقات لا الإعلان", en: "A presence in a category that runs on relationships, not advertising" },
    ],
  },
  corpenta: {
    desc: {
      ar: "كوربنتا شركة متخصّصة في تأسيس الأعمال في السعودية للمستثمرين الأجانب، من ترخيص وزارة الاستثمار والسجل التجاري إلى الخدمات الحكومية، ضمن مستهدفات رؤية 2030.",
      en: "Corpenta specialises in setting up businesses in Saudi Arabia for foreign investors, from the Ministry of Investment licence and commercial registration to government services, in line with Vision 2030.",
    },
    results: [
      { ar: "محتوى مبنيّ على التوقيت لا على الإجراء", en: "Content built on the timing rather than the procedure" },
      { ar: "لغة إنجليزية تخاطب المستثمر الأجنبي", en: "English written for the foreign investor" },
      { ar: "هوية بصرية بمستوى القرار الذي تطلبه", en: "A visual language matching the size of the decision it asks for" },
    ],
  },
  "amlak-social": {
    desc: {
      ar: "أملاك العقارية شركة استثمار عقاري بخبرة عشر سنوات في السوق الجورجي، بفروع تخدم المستثمرين في جورجيا والسعودية ومصر، ومحفظة مشاريع في باتومي مثل بانوراما وسي فيو ونوفوتيل.",
      en: "Amlak Real Estate is a property investment company with ten years in the Georgian market, branches serving investors in Georgia, Saudi Arabia and Egypt, and a portfolio of Batumi projects such as Panorama, Sea View and Novotel.",
    },
    results: [
      { ar: "ثمانية وعشرون شهرًا متّصلة من المحتوى", en: "Twenty-eight unbroken months of content" },
      { ar: "عشرة مشاريع مسمّاة بلغة بصرية لكلٍّ منها", en: "Ten named developments, each with its own visual line" },
      { ar: "محتوى بثلاثة أرقام تواصل لثلاثة أسواق", en: "Content carrying three contact numbers for three markets" },
    ],
  },
  "amlak-revamp": {
    desc: {
      ar: "بعد عشر سنوات في جورجيا دخلت أملاك مرحلة أكبر: مشاريع تديرها علامات فندقية عالمية مثل رمادا وويندام، ومنتجعات عائلية مثل ماردي أكوا بارك في قلب باتومي.",
      en: "After ten years in Georgia, Amlak entered a bigger phase: projects managed by global hotel brands such as Ramada and Wyndham, and family resorts such as Mardi Aqua Park in the heart of Batumi.",
    },
    results: [
      { ar: "سبعة أشهر من المحتوى داخل العلامة الجديدة", en: "Seven months of content inside the new brand" },
      { ar: "انتقال بلا انقطاع: لا شهر بين العلامتين", en: "A handover with no gap: not one month between the two brands" },
      { ar: "لغة بصرية أهدأ تحتمل مشاريع أكبر", en: "A quieter visual language able to carry larger developments" },
    ],
  },
  "profitmax-profile": {
    desc: {
      ar: "شركة استثمار بريطانية إماراتية تبني علاقتها مع المستثمر على الوضوح: عقود محدّدة المدّة، وعوائد معلنة، وضمانات مكتوبة.",
      en: "A British-Emirati investment firm that builds its relationship with investors on clarity: fixed-term contracts, stated returns and written guarantees.",
    },
    results: [
      { ar: "ملف من ثلاث عشرة صفحة", en: "A thirteen-page profile" },
      { ar: "شرح عقود الاستثمار وضماناتها", en: "The investment contracts and their guarantees explained" },
      { ar: "بنَفَس الهوية والموقع نفسه", en: "In the same breath as the identity and the site" },
    ],
  },
  "hcc-profile": {
    desc: {
      ar: "إتش سي سي للتأمين الدولي شركة تأمين مقرّها لندن بخمسة عقود من الخبرة، تقدّم السندات والضمانات وحلول التأمين للمشاريع والشركات حول العالم.",
      en: "HCC International Insurance is a London-based insurer with five decades of experience, providing bonds, guarantees and insurance solutions for projects and companies worldwide.",
    },
    results: [
      { ar: "ملف من سبع عشرة صفحة", en: "A seventeen-page profile" },
      { ar: "شرح كل نوع تغطية على حدة", en: "Each line of cover explained on its own" },
      { ar: "امتداد لموقعها بالرسالة نفسها", en: "An extension of the site, with the same message" },
    ],
  },
  "trustech-profile": {
    desc: {
      ar: "سكاي فيو ريزيدنس مشروع سكني من تطوير تراستك، مجموعة المقاولات والتطوير ذات الأربعين عامًا بين الإمارات والمملكة المتحدة.",
      en: "Sky View Residence is a residential project developed by Trustech, the forty-year contracting and development group operating between the UAE and the United Kingdom.",
    },
    results: [
      { ar: "ملف مشروع من سبع عشرة صفحة", en: "A seventeen-page project profile" },
      { ar: "الشركاء والمخططات والشهادات", en: "Partners, plans, and certificates" },
      { ar: "عربي وإنجليزي لسوقين", en: "Arabic and English for two markets" },
    ],
  },
  "tdh-profile": {
    desc: {
      ar: "تي دي إتش للتطوير العقاري، ومشروعها «سكاي فيو ريزيدنس» في عجمان: برج سكني بشركاء تطوير عالميين وأنماط وحدات متعدّدة للسكن والاستثمار.",
      en: "TDH Real Estate Development and its Sky View Residence in Ajman: a residential tower with international development partners and multiple unit types for living and investment.",
    },
    results: [
      { ar: "ملف مشروع من ثلاث وثلاثين صفحة", en: "A thirty-three-page project profile" },
      { ar: "مخططات ومساحات لكل نمط وحدة", en: "Plans and areas for every unit type" },
      { ar: "ماستر بلان ومميزات المجمّع", en: "A master plan and the compound's features" },
    ],
  },
  "hennawy-profile": {
    desc: {
      ar: "الحناوي شركة مصرية لتصنيع المناديل الورقية والكيماويات، بخطوط إنتاج متعدّدة ومعايير جودة صناعية.",
      en: "Al Hennawy is an Egyptian manufacturer of tissue paper and chemicals, with multiple production lines and industrial quality standards.",
    },
    results: [
      { ar: "ملف من اثنتي عشرة صفحة", en: "A twelve-page profile" },
      { ar: "خطوط الإنتاج والمنتجات ومعايير الجودة", en: "Production lines, products, and quality standards" },
      { ar: "بهوية الشركة التي بنيناها", en: "In the identity we built for the company" },
    ],
  },
  "alamein-profile": {
    desc: {
      ar: "مصنع سعودي متخصّص في تصنيع الهياكل المعدنية والمقطورات، بتشكيلة واسعة من أنواع المقطورات ومواصفاتها تخدم شركات النقل والإنشاءات في المملكة.",
      en: "A Saudi factory specialising in steel bodies and trailers, with a wide range of trailer types and specifications serving transport and construction companies across the Kingdom.",
    },
    results: [
      { ar: "ملف من ثمانٍ وعشرين صفحة", en: "A twenty-eight-page profile" },
      { ar: "كل نوع مقطورة بصوره ومواصفاته", en: "Every trailer type with photographs and specification" },
      { ar: "قالب ثابت يحتمل إضافة منتجات", en: "A fixed template that absorbs new products" },
    ],
  },
  "connect-profile": {
    desc: {
      ar: "كونكت شركة سعودية لتصميم وتنفيذ أجنحة المعارض، نفّذت ثمانية عشر جناحًا لعلامات معروفة في معارض المملكة.",
      en: "Connect is a Saudi company designing and building exhibition stands, having delivered eighteen stands for well-known brands at exhibitions across the Kingdom.",
    },
    results: [
      { ar: "ملف من ثمانٍ وعشرين صفحة", en: "A twenty-eight-page profile" },
      { ar: "ثمانية عشر جناحًا منفّذًا بصورها", en: "Eighteen delivered stands, photographed" },
      { ar: "ربط الشركة برؤية السعودية 2030", en: "The company tied to Saudi Vision 2030" },
    ],
  },
  "sara-younis-brand": {
    desc: {
      ar: "سارة يونس علامة أزياء نسائية تجمع بين الأناقة والبساطة، وتقدّم تصاميم عصرية بجودة راقية.",
      en: "Sara Younis is a womenswear label combining elegance with simplicity, offering contemporary designs of refined quality.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات المتجر والعبوات", en: "Store and packaging applications" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  "expert-estate": {
    desc: {
      ar: "إكسبرت إستيت شركة استثمار عقاري تقدّم لعملائها فرصًا مختارة وخبرة في صفقات العقار عالية القيمة.",
      en: "Expert Estate is a property investment company offering clients selected opportunities and expertise in high-value real estate deals.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  "hennawy-brand": {
    desc: {
      ar: "الحناوي للورق والصناعات الكيماوية مجموعة صناعية مصرية تجمع صناعة الورق والكيماويات تحت علامة واحدة.",
      en: "Al Hennawy for Paper and Chemical Industries is an Egyptian industrial group bringing paper and chemicals manufacturing under one brand.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات صناعية وعبوات", en: "Industrial and packaging applications" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  "adg-profile": {
    desc: {
      ar: "إيه دي جي شركة عقارات تعمل بين جورجيا ولبنان، وتفتح للمستثمر الخليجي والعربي فرص الاستثمار العقاري في باتومي.",
      en: "ADG is a real estate company working between Georgia and Lebanon, opening property investment opportunities in Batumi to Gulf and Arab investors.",
    },
    results: [
      { ar: "ملف تعريفي من ثماني صفحات، عربي", en: "An eight-page company profile, in Arabic" },
      { ar: "قسم سوق بأرقام ومصادر معلنة", en: "A market section with figures and named sources" },
      { ar: "نسخة جاهزة للإرسال ونسخة للطباعة", en: "A version to send and a version to print" },
    ],
  },
  "profitmax-brand": {
    desc: {
      ar: "بروفيت ماكس للاستثمار مجموعة استثمارية بين المملكة المتحدة والإمارات، تقدّم لعملائها عقود استثمار وحلولًا مالية مصمّمة لنمو رأس المال.",
      en: "Profit Max Investments is an investment group between the United Kingdom and the UAE, offering clients investment contracts and financial solutions designed to grow capital.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات ومطبوعات", en: "Applications and print" },
    ],
  },
  "alhayat-brand": {
    desc: {
      ar: "مزرعة الحياة للدواجن مزرعة سعودية في الرياض تنتج دواجن طازجة من بيئة طبيعية، وتصل منتجاتها إلى البيوت والأسواق.",
      en: "Alhayat Poultry Farm is a Saudi farm in Riyadh producing fresh poultry in a natural environment, supplying homes and markets.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تصميم العبوات والتغليف", en: "Packaging design" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  sedra: {
    desc: {
      ar: "سدرة علامة إكسسوارات فاخرة تقدّم قطعًا مختارة بلمسة عربية راقية.",
      en: "Sedra is a luxury accessories brand offering curated pieces with a refined Arabic touch.",
    },
    results: [
      { ar: "شعار بخطّ عربي مخصّص", en: "A logo in custom Arabic lettering" },
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  alraghad: {
    desc: {
      ar: "الرغد اسم في تجارة الذهب والمجوهرات، يبني حضوره على الفخامة والثقة في قطعة تُشترى لتبقى العمر كلّه.",
      en: "Al Raghad is a name in the gold and jewellery trade, building its presence on luxury and trust in pieces bought to last a lifetime.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات ومطبوعات", en: "Applications and print" },
    ],
  },
  "tech-care": {
    desc: {
      ar: "معامل تك كير علامة مصرية في التشخيص المعملي، تبني ثقة مرضاها على دقّة النتائج وراحة التجربة داخل المعمل.",
      en: "Tech Care is an Egyptian laboratory diagnostics brand that builds patient trust on accurate results and a comfortable experience inside the lab.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  "vip-limo": {
    desc: {
      ar: "في آي بي ليمو شركة ليموزين ونقل فاخر في شيكاغو بالولايات المتحدة، تخدم رجال الأعمال والمناسبات بأسطول سيارات فاخرة وتطبيق حجز خاص.",
      en: "VIP Limo is a limousine and luxury transport company in Chicago, USA, serving executives and events with a fleet of luxury vehicles and its own booking app.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "واجهات التطبيق (UI/UX)", en: "App interface design (UI/UX)" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  "auto-crazy-car": {
    desc: {
      ar: "أوتو كريزي كار علامة خدمات سيارات تخاطب عشّاق السيارات والأداء.",
      en: "Auto Crazy Car is an automotive services brand speaking to car and performance enthusiasts.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  "caffeine-kiss": {
    desc: {
      ar: "كافيين كيس علامة قهوة تقدّم تجربة قهوة ودودة وعصرية.",
      en: "A Caffeine Kiss is a coffee brand offering a friendly, contemporary coffee experience.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "تطبيقات المقهى والعبوات", en: "Café and packaging applications" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  daughters: {
    desc: {
      ar: "دوترز للتجارة شركة تجارة عامة وتوريد وتوزيع.",
      en: "Daughters Trading is a general trading, supply and distribution company.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات ومطبوعات", en: "Applications and print" },
    ],
  },
  "profitmax-web": {
    desc: {
      ar: "بروفيت ماكس شركة استثمار وخدمات مالية تخدم مستثمرين من أسواق متعدّدة انطلاقًا من المملكة المتحدة والإمارات.",
      en: "Profit Max is an investment and financial services company serving investors from multiple markets out of the United Kingdom and the UAE.",
    },
    results: [
      { ar: "موقع ثنائي اللغة", en: "A bilingual site" },
      { ar: "صفحات خدمات مفصّلة", en: "Detailed service pages" },
      { ar: "مسار واضح لحجز الاستشارة", en: "A clear path to booking a consultation" },
    ],
  },
  "utility-vision": {
    desc: {
      ar: "يوتيليتي فيجن شركة مقاولات في جدة تنفّذ المشاريع الإنشائية وأعمال المرافق.",
      en: "Utility Vision is a contracting company in Jeddah delivering construction projects and utility works.",
    },
    results: [
      { ar: "موقع يعرض المشاريع والخدمات", en: "A site presenting projects and services" },
      { ar: "نسخة جوّال مبنيّة لا مصغّرة", en: "A mobile version built, not shrunk" },
      { ar: "مسار طلب عرض السعر في كل صفحة", en: "A quote-request path on every page" },
    ],
  },
  "future-axis": {
    desc: {
      ar: "فيوتشر أكسس للمقاولات شركة سعودية بسجلّ مشاريع وشبكة موردين، تعمل شريكَ تنفيذ في المشاريع الإنشائية.",
      en: "Future Axis Contracting is a Saudi company with a track record of projects and a supplier network, working as an execution partner on construction projects.",
    },
    results: [
      { ar: "موقع بسجلّ مشاريع ومورّدين", en: "A site with a project and supplier record" },
      { ar: "صفحات خدمات مفصّلة", en: "Detailed service pages" },
      { ar: "نموذج استشارة مجانية", en: "A free-consultation form" },
    ],
  },
  "alhayat-web": {
    desc: {
      ar: "الحياة للدواجن من مزارع الرياض المنتجة، تبيع منتجاتها مباشرة إلى المستهلك عبر متجرها الإلكتروني.",
      en: "Alhayat Poultry is a producing farm in Riyadh selling its products directly to consumers through its online store.",
    },
    results: [
      { ar: "متجر إلكتروني يستقبل الطلبات", en: "An online store taking orders" },
      { ar: "صفحات منتجات ومعرض", en: "Product pages and a gallery" },
      { ar: "امتداد للهوية لا نسخة منها", en: "An extension of the identity, not a copy of it" },
    ],
  },
  greenmark: {
    desc: {
      ar: "جرين مارك شركة في دبي لتأسيس الشركات والخدمات الحكومية والتأشيرات، ترافق روّاد الأعمال والمستثمرين من الرخصة حتى بدء النشاط.",
      en: "Green Mark is a Dubai company for business setup, government services and visas, accompanying entrepreneurs and investors from licence to launch.",
    },
    results: [
      { ar: "محتوى شهري بالعربية والإنجليزية", en: "Monthly content in Arabic and English" },
      { ar: "تصاميم تجيب أسئلة العميل مباشرةً", en: "Designs answering client questions directly" },
      { ar: "حضور منتظم على المنصّات", en: "A steady presence across the platforms" },
    ],
  },
  rahiq: {
    desc: {
      ar: "رحيق علامة مصرية للعسل والمنتجات الطبيعية، تقدّم أنواع عسل منتقاة ومنتجات نحل تصل إلى المستهلك مباشرة.",
      en: "Rahiq is an Egyptian honey and natural products brand offering selected honeys and bee products direct to consumers.",
    },
    results: [
      { ar: "محتوى شهري متّصل بمناسبات السنة", en: "Monthly content tied to the occasions of the year" },
      { ar: "قالب بصري ثابت للعلامة", en: "A consistent visual template for the brand" },
      { ar: "حضور منتظم على المنصّات", en: "A steady presence across the platforms" },
    ],
  },
  "sat-leaders": {
    desc: {
      ar: "سات ليدرز أكاديمية في مصر لتحضير اختبارات SAT وACT وEST والدبلومة الأمريكية ودورات اللغة الإنجليزية.",
      en: "SAT Leaders is an academy in Egypt preparing students for the SAT, ACT and EST and the American Diploma, with English language courses.",
    },
    results: [
      { ar: "محتوى شهري لمواسم الاختبارات", en: "Monthly content across the exam seasons" },
      { ar: "قالب بصري ثابت للأكاديمية", en: "A consistent visual template for the academy" },
      { ar: "حضور منتظم على المنصّات", en: "A steady presence across the platforms" },
    ],
  },
  "building-line": {
    desc: {
      ar: "بيلدنج لاين شركة مقاولات سعودية تنفّذ المشاريع الإنشائية بمعايير هندسية صارمة.",
      en: "Building Line is a Saudi contracting company delivering construction projects to rigorous engineering standards.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  amlak: {
    desc: {
      ar: "أملاك العقارية من الأسماء الراسخة في تسويق العقار الجورجي للمستثمر العربي، تعمل بين جورجيا والسعودية بفريق يرافق المستثمر حتى التملّك.",
      en: "Amlak Real Estate is an established name in marketing Georgian property to Arab investors, working between Georgia and Saudi Arabia with a team that accompanies investors through to ownership.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "مطبوعات ولافتات", en: "Print and signage" },
    ],
  },
  elitegate: {
    desc: {
      ar: "إيليت جيت شركة استثمار عقاري تقدّم فرصًا عقارية راقية لمستثمرين يبحثون عن قيمة طويلة الأجل.",
      en: "Elitegate Properties is a property investment company offering upscale real estate opportunities to investors seeking long-term value.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  "basmat-alomran": {
    desc: {
      ar: "بصمة العمران شركة مقاولات سعودية تجمع بين قوّة التنفيذ والطابع الهندسي الحديث.",
      en: "Basmat Alomran is a Saudi contracting company combining strong execution with a modern engineering character.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "تطبيقات وموك-أب", en: "Applications and mockups" },
    ],
  },
  inmaa: {
    desc: {
      ar: "إنماء للمقاولات شركة مقاولات تبني سمعتها على الاعتمادية والالتزام بمواعيد التسليم.",
      en: "Inmaa Constructions is a contracting company building its reputation on reliability and on-time delivery.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
    ],
  },
  "adg-brand": {
    desc: {
      ar: "إيه دي جي العقارية مجموعة استثمار عقاري في جورجيا ولبنان، تقدّم مشاريع فاخرة في باتومي بخطط سداد مرنة.",
      en: "ADG Real Estate is a property investment group in Georgia and Lebanon offering luxury projects in Batumi with flexible payment plans.",
    },
    results: [
      { ar: "هوية بصرية كاملة", en: "Complete visual identity" },
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "مطبوعات ولافتات", en: "Print and signage" },
    ],
  },
  fragancia: {
    desc: {
      ar: "فراجانسيا متجر للعطور ومنتجات العناية والجمال، يبيع إلكترونيًا بتجربة تسوّق تليق بفئة منتجاته.",
      en: "Fragancia is a fragrance, care and beauty store selling online with a shopping experience that matches the class of its products.",
    },
    results: [
      { ar: "متجر إلكتروني متكامل", en: "Complete online store" },
      { ar: "صفحات منتجات", en: "Product pages" },
      { ar: "تجربة شراء مبسّطة", en: "Streamlined checkout" },
    ],
  },
  "vibrant-design": {
    desc: {
      ar: "فايبرانت ديزاين استوديو ديكور وتصميم داخلي يحوّل المساحات إلى تجارب فاخرة بتوقيع واضح، من الفكرة حتى التسليم.",
      en: "Vibrant Design is an interior design studio turning spaces into luxury experiences with a clear signature, from concept to handover.",
    },
    results: [
      { ar: "موقع أعمال", en: "Portfolio site" },
      { ar: "معرض مشاريع", en: "Project gallery" },
      { ar: "تصميم متجاوب", en: "Responsive design" },
    ],
  },
  "trustech-web": {
    desc: {
      ar: "تراستك للمقاولات من شركات المقاولات والتطوير العقاري ذات الإرث الطويل في الإمارات — اثنان وأربعون عامًا من المشاريع — بحضور ممتد إلى المملكة المتحدة.",
      en: "Trustech Building Contracting is one of the long-established contracting and development firms in the UAE — forty-two years of projects — with a presence extending to the United Kingdom.",
    },
    results: [
      { ar: "موقع مؤسسي", en: "Corporate site" },
      { ar: "عرض المشاريع", en: "Project showcase" },
      { ar: "تصميم متجاوب", en: "Responsive design" },
    ],
  },
  "hcc-insurance": {
    desc: {
      ar: "إتش سي سي شركة تأمين دولية من لندن، تعتمد عليها الشركات والمقاولون في سندات الضمان والتغطيات المعترف بها دوليًا.",
      en: "HCC is an international insurer from London that companies and contractors rely on for surety bonds and internationally recognised cover.",
    },
    results: [
      { ar: "موقع مؤسسي", en: "Corporate site" },
      { ar: "صفحات خدمات", en: "Service pages" },
      { ar: "نماذج تواصل", en: "Contact forms" },
    ],
  },
  "sara-younis-web": {
    desc: {
      ar: "سارة يونس علامة أزياء نسائية تبيع تشكيلاتها إلكترونيًا لعميلات يبحثن عن قطع راقية بتصميم هادئ.",
      en: "Sara Younis is a womenswear label selling its collections online to customers looking for refined pieces with understated design.",
    },
    results: [
      { ar: "متجر إلكتروني", en: "Online store" },
      { ar: "تصميم مينيمال", en: "Minimal design" },
      { ar: "آراء العملاء", en: "Customer reviews" },
    ],
  },
  "eco-vista": {
    desc: {
      ar: "إيكو فيستا شركة مقاولات وبنية تحتية في السعودية، تنفّذ أعمال الحفر والإنشاءات والمشاريع المدنية بفرق ميدانية متخصّصة.",
      en: "Eco Vista is a contracting and infrastructure company in Saudi Arabia, carrying out excavation, construction and civil works with specialist field teams.",
    },
    results: [
      { ar: "حضور رقمي أقوى", en: "A stronger digital presence" },
      { ar: "زيادة التفاعل", en: "Higher engagement" },
      { ar: "جذب فرص عمل جديدة", en: "New business enquiries" },
    ],
  },
  "sky-shooter": {
    desc: {
      ar: "سكاي شوتر شركة تصوير جوي وإنتاج في الإمارات، تنفّذ التصوير بالدرون داخل المباني وخارجها للعقارات والإعلانات والأفلام، بفريق خبراء وتصاريح طيران كاملة.",
      en: "Sky Shooter is an aerial filming and production company in the UAE, flying drones indoors and outdoors for real estate, advertising and film, with an expert team and full flight permits.",
    },
    results: [
      { ar: "زيادة التفاعل", en: "Higher engagement" },
      { ar: "إبراز جودة الأعمال", en: "Work quality brought forward" },
      { ar: "جذب عملاء جدد", en: "New clients" },
    ],
  },
  "green-flash": {
    desc: {
      ar: "جرين فلاش شركة حلول هندسية وصناعية في السعودية، تعمل في مشاريع الطاقة والإنشاءات ضمن مستهدفات رؤية المملكة 2030.",
      en: "Green Flash is an engineering and industrial solutions company in Saudi Arabia, working on energy and construction projects aligned with Vision 2030.",
    },
    results: [
      { ar: "تحسين صورة الشركة", en: "An improved market image" },
      { ar: "زيادة التفاعل", en: "Higher engagement" },
      { ar: "تعزيز الثقة بالسوق", en: "Greater market trust" },
    ],
  },
  "ahl-alquran": {
    desc: {
      ar: "أكاديمية أهل القرآن أكاديمية إلكترونية لتعليم القرآن الكريم والتربية الإسلامية للأطفال، تخدم الأسر المسلمة في أمريكا وأوروبا بمعلّمين مؤهّلين ومتابعة دورية مع أولياء الأمور.",
      en: "Ahl Alquran Academy is an online academy teaching the Quran and Islamic studies to children, serving Muslim families in the US and Europe with qualified teachers and regular parent follow-up.",
    },
    results: [
      { ar: "زيادة التفاعل مع المحتوى التعليمي", en: "Higher engagement with educational content" },
      { ar: "وصول أفضل للجمهور المستهدف", en: "Better reach into the target audience" },
      { ar: "زيادة الاستفسارات والتسجيل", en: "More enquiries and sign-ups" },
    ],
  },
  "adg-social": {
    desc: {
      ar: "إيه دي جي العقارية تقدّم للمستثمر عنوانًا أيقونيًا في باتومي: مشروع بعشرين ألف متر مربع من الطبيعة وسط المدينة، بخطط تقسيط تبدأ من ألف دولار شهريًا.",
      en: "ADG Real Estate offers investors an iconic Batumi address: a project with twenty thousand square metres of nature in the city centre, with instalment plans from one thousand dollars a month.",
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
  /* بلا مُدَد: المدّة تُتّفق مع كل عميل على نطاق مشروعه، ورقمٌ عامّ
     على الصفحة وعدٌ لا نملكه قبل أن نفهم ما يحتاجه */
  intro: {
    ar: "خمس خطوات نمرّ بها في كل مشروع، مهما كان حجمه. تعرف في كل لحظة أين نحن، وما الخطوة التالية، وما الذي ستستلمه.",
    en: "Five steps we go through on every project, whatever its size. At any moment you know where we are, what comes next, and what you'll receive.",
  } as Bi,
  doLabel: { ar: "ما نقوم به", en: "What we do" } as Bi,
  outputLabel: { ar: "ما تستلمه", en: "What you receive" } as Bi,
  youLabel: { ar: "ما نحتاجه منك", en: "What we need from you" } as Bi,
  details: [
    {
      activities: [
        { ar: "جلسة بداية نفهم فيها شركتك وأهدافك", en: "A kickoff session on your business and goals" },
        { ar: "تحليل السوق والمنافسين والجمهور", en: "Market, competitor and audience analysis" },
        { ar: "مراجعة ما لديك: هوية، وموقع، وحسابات، وأرقام", en: "A review of what you have: identity, site, accounts, numbers" },
      ] as Bi[],
      output: { ar: "ملخّص الفهم وتحليل السوق", en: "A brief and market analysis" } as Bi,
      you: { ar: "جلسة البداية معنا، وما لديك من مواد وأرقام حالية.", en: "The kickoff session with us, plus whatever material and numbers you already have." } as Bi,
    },
    {
      activities: [
        { ar: "تحديد الأهداف وطريقة قياسها", en: "Setting goals and how they're measured" },
        { ar: "ترتيب الأولويات: ماذا يُبنى أولًا ولماذا", en: "Ordering priorities: what gets built first, and why" },
        { ar: "نطاق مكتوب بما يشمله العمل وما لا يشمله", en: "A written scope of what's included and what isn't" },
      ] as Bi[],
      output: { ar: "خطة بأهداف وجدول زمني", en: "A plan with goals and a timeline" } as Bi,
      you: { ar: "مراجعة الخطة والموافقة عليها قبل أن يبدأ التنفيذ.", en: "Reviewing and approving the plan before execution starts." } as Bi,
    },
    {
      activities: [
        { ar: "تصميم وتطوير وكتابة محتوى", en: "Design, development and content" },
        { ar: "عرض كل مرحلة عليك قبل الانتقال إلى ما بعدها", en: "Every stage shown to you before moving on" },
        { ar: "جولات تعديل ضمن النطاق المتّفق عليه", en: "Revision rounds within the agreed scope" },
      ] as Bi[],
      output: { ar: "التصاميم والمواد النهائية", en: "Final designs and assets" } as Bi,
      you: { ar: "ملاحظات مجمّعة وواضحة في كل جولة مراجعة.", en: "Clear, consolidated feedback in each review round." } as Bi,
    },
    {
      activities: [
        { ar: "النشر والاختبار على الأجهزة والمتصفحات", en: "Publishing and testing across devices and browsers" },
        { ar: "ربط أدوات القياس والتتبّع", en: "Connecting analytics and tracking" },
        { ar: "التسليم والتدريب على الاستخدام", en: "Handover and training" },
      ] as Bi[],
      output: { ar: "المشروع منشور ومربوط بالقياس", en: "Live, wired to measurement" } as Bi,
      you: { ar: "صلاحيات الوصول اللازمة، كالدومين والحسابات.", en: "The access we need, such as the domain and accounts." } as Bi,
    },
    {
      activities: [
        { ar: "مراقبة الأداء بعد الإطلاق", en: "Watching performance after launch" },
        { ar: "تقارير دورية بما تحرّك وما لم يتحرّك", en: "Regular reports on what moved and what didn't" },
        { ar: "توصيات ونسخ محسّنة على أساس الأرقام", en: "Recommendations and improved versions based on the numbers" },
      ] as Bi[],
      output: { ar: "تقارير أداء وتوصيات", en: "Performance reports and recommendations" } as Bi,
      you: { ar: "جلسة لمراجعة النتائج، وقرار في الخطوة التالية.", en: "A session to review results, and a decision on the next step." } as Bi,
    },
  ],
  principlesLabel: { ar: "في كل مشروع", en: "On every project" } as Bi,
  principlesTitle: {
    ar: ["ما تتوقّعه منّا،", "مهما كان حجم المشروع."],
    en: ["What to expect from us,", "whatever the project's size."],
  } as Bi<string[]>,
  principles: [
    {
      title: { ar: "مراجعة مكتوبة عند كل مرحلة", en: "A written review at every stage" } as Bi,
      desc: { ar: "لا تنتقل مرحلة إلى التي بعدها قبل أن تراها وتعرف ما الذي تغيّر.", en: "No stage moves on before you've seen it and know what changed." } as Bi,
    },
    {
      title: { ar: "اجتماعات على توقيتك", en: "Meetings in your time zone" } as Bi,
      desc: { ar: "نعمل مع شركات في الخليج ومصر وأوروبا، ونُجدوِل على توقيت العميل لا توقيتنا.", en: "We work with companies across the Gulf, Egypt and Europe, and schedule around the client's clock, not ours." } as Bi,
    },
    {
      title: { ar: "نطاق وسعر واضحان", en: "A clear scope and price" } as Bi,
      desc: { ar: "كل ما يشمله العمل مكتوب قبل التوقيع، بلا رسوم مخفية.", en: "Everything the work covers is written down before you sign, with no hidden fees." } as Bi,
    },
    {
      title: { ar: "متابعة بعد الإطلاق", en: "Follow-up after launch" } as Bi,
      desc: { ar: "دورنا لا ينتهي عند التسليم: نراقب الأداء ونقترح التحسينات.", en: "Our role doesn't end at handover: we track performance and propose improvements." } as Bi,
    },
  ],
  faqLine: {
    ar: "أسئلة عن المدّة والدفع والملكية؟ جمعنا إجاباتها في مكان واحد.",
    en: "Questions about timing, payment or ownership? We've answered them in one place.",
  } as Bi,
  faqLink: { ar: "الأسئلة الشائعة", en: "Read the FAQ" } as Bi,
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
    ar: "السعودية · الإمارات · أوروبا · مصر",
    en: "Saudi Arabia · UAE · Europe · Egypt",
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
