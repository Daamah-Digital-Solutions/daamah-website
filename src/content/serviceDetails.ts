import type { Bi } from "../i18n";

/**
 * محتوى صفحة كل خدمة — المفتاح هو slug الخدمة في `home.ts`.
 *
 * كانت الصفحة مقدّمةً وقائمتين قصيرتين، فتُقرأ فارغة. الآن تجيب عن
 * أسئلة المشتري بترتيبها: هل هذه الخدمة لي؟ ماذا تشمل بالضبط؟ كيف
 * تسير؟ ماذا أستلم؟ ولماذا أنتم؟
 *
 * لا مُدَد هنا ولا أعداد لا نلتزم بها: المدّة تُتّفق مع كل عميل في
 * جلسة النطاق، ورقمٌ عامّ على الصفحة وعدٌ لا نملكه.
 */

export type Point = { title: Bi; desc: Bi };

export type ServiceDetail = {
  intro: Bi;
  /** علامات أنك تحتاج هذه الخدمة — تُقرأ بصيغة «تحتاجها إن…» */
  signs: Bi[];
  includes: Point[];
  steps: Point[];
  deliverables: Bi[];
  why: Point[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  branding: {
    intro: {
      ar: "الهوية ليست لوجو. هي نظام كامل — لون وخطّ وأسلوب صورة ونبرة — يجعل شركتك تُعرَف قبل أن يُقرأ اسمها. نبنيها من فهم سوقك لا من ذوق المصمّم.",
      en: "An identity is not a logo. It's a complete system — colour, type, image style, tone — that makes your company recognisable before its name is read. We build it from your market, not from a designer's taste.",
    },
    signs: [
      { ar: "شعارك صُمّم على عجل في البداية، ولم يعد يشبه حجم شركتك اليوم", en: "Your logo was made in a hurry at the start and no longer matches the company you've become" },
      { ar: "كل تصميم يخرج بشكل مختلف، لأنه لا توجد قواعد يرجع إليها أحد", en: "Every design comes out differently, because there are no rules anyone refers to" },
      { ar: "تدخل سوقًا جديدًا أو تستهدف عملاء أكبر من المعتاد", en: "You're entering a new market or going after bigger clients than usual" },
      { ar: "يُخلط بينك وبين منافسيك لأن شكلكم متشابه", en: "People confuse you with competitors because you all look alike" },
    ],
    includes: [
      {
        title: { ar: "بحث في القطاع والمنافسين", en: "Sector and competitor research" },
        desc: { ar: "نقرأ كيف يظهر منافسوك وما الذي يتوقّعه عميلك، لنعرف أين تقف علامتك وكيف تتميّز قبل رسم أي خط.", en: "We study how competitors present themselves and what your client expects, so we know where your brand stands and how it can stand apart before a single line is drawn." },
      },
      {
        title: { ar: "تصميم اللوجو ونظامه", en: "Logo and its system" },
        desc: { ar: "الشعار بصيغه الكاملة — الأساسية والمختصرة والأيقونة — مع مساحات الأمان والأحجام الدنيا، ليعمل على لافتة كبيرة وعلى أيقونة تطبيق.", en: "The logo in its full set — primary, compact and icon — with clear space and minimum sizes, so it holds up on a large sign and on an app icon." },
      },
      {
        title: { ar: "نظام ألوان وخطوط كامل", en: "Full colour and type system" },
        desc: { ar: "ألوان أساسية وثانوية بقيمها للطباعة والشاشة، وخطوط عربية وإنجليزية متناسقة، وتدرّج واضح للعناوين والنصوص.", en: "Primary and secondary colours with print and screen values, matched Arabic and English typefaces, and a clear hierarchy for headings and text." },
      },
      {
        title: { ar: "أسلوب الصورة والأيقونات", en: "Image and icon style" },
        desc: { ar: "قواعد لاختيار الصور ومعالجتها، ومجموعة أيقونات بنفس الروح، حتى يبدو كل ما تنشره صادرًا من جهة واحدة.", en: "Rules for choosing and treating imagery, and an icon set in the same spirit, so everything you publish looks like it comes from one place." },
      },
      {
        title: { ar: "تطبيقات ومطبوعات", en: "Applications and print" },
        desc: { ar: "تطبيق الهوية على ما تستعمله فعلًا: بطاقات العمل، والأوراق الرسمية، وقوالب السوشيال، وواجهة الملف التعريفي.", en: "The identity applied to what you actually use: business cards, stationery, social templates and the profile cover." },
      },
    ],
    steps: [
      { title: { ar: "الاكتشاف", en: "Discovery" }, desc: { ar: "جلسة نفهم فيها شركتك وجمهورك وما تريد أن يُقال عنك، ثم بحث في السوق والمنافسين.", en: "A session to understand your company, your audience and what you want said about you, followed by market and competitor research." } },
      { title: { ar: "الاتجاهات", en: "Directions" }, desc: { ar: "اتجاهان أو ثلاثة مختلفة فعلًا، لكلٍّ منها منطق مكتوب يشرح لماذا يناسبك.", en: "Two or three genuinely different directions, each with a written rationale for why it fits you." } },
      { title: { ar: "التطوير", en: "Development" }, desc: { ar: "نطوّر الاتجاه الذي تختاره حتى يكتمل، مع جولتَي تعديل ضمن النطاق.", en: "We develop the direction you choose until it's complete, with two revision rounds included." } },
      { title: { ar: "النظام والتسليم", en: "System and handover" }, desc: { ar: "نبني دليل الاستخدام ونطبّق الهوية على موادك، ثم نسلّمك الهوية كاملة جاهزة للاستخدام.", en: "We build the usage guide, apply the identity to your materials, then hand over the complete identity, ready to use." } },
    ],
    deliverables: [
      { ar: "دليل استخدام العلامة", en: "Brand usage guide" },
      { ar: "الشعار بكل صيغه للطباعة والشاشة", en: "The logo in every format for print and screen" },
      { ar: "قوالب السوشيال والمطبوعات الأساسية", en: "Social templates and core print items" },
    ],
    why: [
      { title: { ar: "من السوق لا من الذوق", en: "From the market, not from taste" }, desc: { ar: "كل قرار بصري له سبب يمكن شرحه: ما يحتاج عميلك أن يشعر به، لا ما يعجب المصمّم.", en: "Every visual decision has a reason you can explain: what your client needs to feel, not what the designer likes." } },
      { title: { ar: "نظام لا شعار فقط", en: "A system, not just a logo" }, desc: { ar: "تستلم قواعد يستطيع أي مصمّم بعدنا أن يعمل بها دون أن تتفكّك الهوية.", en: "You get rules any designer after us can work with without the identity falling apart." } },
      { title: { ar: "هوية تتّسع معك", en: "An identity that grows with you" }, desc: { ar: "نظام مرن يتّسع لخدمات وفروع ومنتجات جديدة، دون أن تحتاج إلى هوية جديدة.", en: "A flexible system that stretches to new services, branches and products without needing a new identity." } },
    ],
  },

  "company-profile": {
    intro: {
      ar: "الملف التعريفي ليس كتيّبًا يجمع كل ما تفعلونه. هو وثيقة تُقرأ في خمس دقائق قبل اجتماع أو داخل ملف تأهيل، فتترك انطباعًا بأن أمام القارئ شركة منظّمة تعرف ما تقول.",
      en: "A company profile is not a booklet listing everything you do. It is a document read in five minutes before a meeting or inside a qualification file, leaving the reader with the impression of an organised company that knows what it is saying.",
    },
    signs: [
      { ar: "تدخل مناقصات أو ملفات تأهيل، ويُطلب منك ما يعرّف بالشركة", en: "You bid for tenders or pre-qualification and are asked for something that presents the company" },
      { ar: "ملفّك الحالي قديم، أو صفحات مصفوفة بلا ترتيب", en: "Your current profile is outdated, or just pages stacked with no order" },
      { ar: "تعرض على عملاء كبار وتحتاج ما يسبقك إلى الاجتماع", en: "You pitch to large clients and need something that arrives before you do" },
      { ar: "مشاريعك قوية، لكنها لا تظهر مرتّبة في مكان واحد", en: "Your projects are strong, but never shown together in one place" },
    ],
    includes: [
      {
        title: { ar: "ترتيب المحتوى بحسب القارئ", en: "Content ordered for the reader" },
        desc: { ar: "نحدّد من سيقرأ الملف — لجنة تأهيل أو عميل أو شريك — ونرتّب الصفحات على الأسئلة التي يحملها هو، لا بحسب تاريخ الشركة.", en: "We decide who will read it — a qualification committee, a client or a partner — and order the pages around their questions, not around your company's history." },
      },
      {
        title: { ar: "كتابة النصوص", en: "Copywriting" },
        desc: { ar: "من أنتم، وماذا تقدّمون، ولماذا أنتم — نصوص مختصرة نكتبها معك انطلاقًا من جلسة ومن موادك الحالية، بدل فقرات عامة تصلح لأي شركة.", en: "Who you are, what you offer and why you — concise copy we write with you from a session and your existing material, instead of generic paragraphs that fit any company." },
      },
      {
        title: { ar: "عرض المشاريع والسجلّ", en: "Projects and track record" },
        desc: { ar: "مشاريعك وعملاؤك وشهاداتك معروضة بصريًا وبالأرقام حيث توجد، حتى يُقرأ سجلّك في نظرة.", en: "Your projects, clients and certificates presented visually, with numbers where they exist, so your record reads at a glance." },
      },
      {
        title: { ar: "تصميم عربي وإنجليزي", en: "Arabic and English design" },
        desc: { ar: "تصميم على هويتك البصرية يُبنى بالعربية والإنجليزية معًا، فلا تبدو إحدى النسختين ترجمة مستعجلة للأخرى.", en: "Designed on your identity and built in Arabic and English together, so neither version reads like a rushed translation of the other." },
      },
    ],
    steps: [
      { title: { ar: "جمع المادة", en: "Gathering material" }, desc: { ar: "نستلم ما لديك من ملفات ومشاريع وشهادات، ونجلس معك لنعرف لمن يُكتب الملف ولأي غرض.", en: "We collect your files, projects and certificates, and sit with you to agree who the profile is for and what it must do." } },
      { title: { ar: "الهيكل والنص", en: "Structure and copy" }, desc: { ar: "نقترح ترتيب الصفحات ونكتب النصوص، وتراجعها قبل أن يبدأ التصميم.", en: "We propose the page order and write the copy, and you review it before design begins." } },
      { title: { ar: "التصميم", en: "Design" }, desc: { ar: "نصمّم الصفحات على هويتك، ونعرضها عليك للمراجعة والتعديل.", en: "We design the pages on your identity and present them to you for review." } },
      { title: { ar: "التسليم", en: "Handover" }, desc: { ar: "نسلّم نسخة الطباعة ونسخة الإرسال.", en: "We deliver the print version and the sending version." } },
    ],
    deliverables: [
      { ar: "نسخة للطباعة ونسخة للإرسال بحجم أخفّ", en: "A print version and a lighter one for sending" },
      { ar: "نسخة قابلة للتحديث دون العودة إلينا", en: "A version you can update without coming back to us" },
    ],
    why: [
      { title: { ar: "يُكتب ليُقرأ", en: "Written to be read" }, desc: { ar: "نحذف ما لا يحتاجه القارئ، لأن ملفًا يُقرأ في خمس دقائق يفعل أكثر من ملف لا يُكمَل.", en: "We cut what the reader doesn't need, because a profile read in five minutes does more than one nobody finishes." } },
      { title: { ar: "الكتابة جزء من الخدمة", en: "Writing is part of the service" }, desc: { ar: "لا نصمّم فوق نصوص ضعيفة؛ نكتب المحتوى ونرتّبه قبل أن نصمّم.", en: "We don't design on top of weak copy; we write and structure the content before we design it." } },
      { title: { ar: "ملفّنا نفسه أمامك", en: "Our own profile is right here" }, desc: { ar: "يمكنك قراءة ملف دَعمة التعريفي كاملًا على الموقع قبل أن تقرّر.", en: "You can read Daamah's own company profile in full on this site before you decide." } },
    ],
  },

  "web-development": {
    intro: {
      ar: "موقع يُقرأ بسرعة على الموبايل قبل الديسكتوب، ويقود الزائر إلى خطوة واضحة. نبنيه بكود نظيف لا بقوالب جاهزة، فيبقى قابلًا للتطوير معك.",
      en: "A site that reads fast on mobile before desktop, and leads the visitor to one clear next step. Built with clean code rather than a template, so it can grow with you.",
    },
    signs: [
      { ar: "موقعك بطيء، أو يظهر مكسورًا على الموبايل", en: "Your site is slow, or looks broken on mobile" },
      { ar: "الزوّار يدخلون ولا يتواصل منهم أحد", en: "Visitors arrive and nobody gets in touch" },
      { ar: "لا تستطيع تعديل نص أو صورة دون الرجوع إلى مطوّر", en: "You can't change a line or an image without calling a developer" },
      { ar: "لا تعرف من أين يأتي زوّارك ولا ماذا يفعلون", en: "You don't know where visitors come from or what they do" },
    ],
    includes: [
      {
        title: { ar: "بنية معلومات وخريطة صفحات", en: "Information architecture and sitemap" },
        desc: { ar: "نحدّد الصفحات التي يحتاجها زائرك، ومسار انتقاله بينها، وأين تقع خطوة التواصل في كل صفحة.", en: "We define the pages your visitor needs, how they move between them, and where the contact step sits on each page." },
      },
      {
        title: { ar: "تصميم واجهات متجاوب", en: "Responsive interface design" },
        desc: { ar: "تصميم يبدأ من شاشة الموبايل ثم يتّسع، على هويتك، وبالعربية والإنجليزية حيث تحتاج.", en: "Design that starts from the phone screen and scales up, on your identity, in Arabic and English where you need both." },
      },
      {
        title: { ar: "تطوير بكود نظيف", en: "Clean-code development" },
        desc: { ar: "بناء سريع ومنظّم بلا قوالب ثقيلة، يسهل تطويره وإضافة صفحات إليه لاحقًا.", en: "A fast, well-organised build without heavy templates, easy to extend with new pages later." },
      },
      {
        title: { ar: "تهيئة أساسية للسيو", en: "Baseline SEO setup" },
        desc: { ar: "عنوان ووصف لكل صفحة، وخريطة موقع، وبيانات منظّمة، وربط بـ Search Console.", en: "A title and description for every page, a sitemap, structured data, and Search Console connected." },
      },
      {
        title: { ar: "ربط أدوات القياس", en: "Analytics wiring" },
        desc: { ar: "أدوات التحليل وتتبّع نقرات الواتساب والنماذج، حتى تعرف ما الذي يجلب العملاء فعلًا.", en: "Analytics plus tracking for WhatsApp clicks and forms, so you know what actually brings clients in." },
      },
    ],
    steps: [
      { title: { ar: "الهيكل", en: "Structure" }, desc: { ar: "خريطة الصفحات والمحتوى المطلوب لكل صفحة، نتّفق عليها قبل التصميم.", en: "The sitemap and the content each page needs, agreed before design." } },
      { title: { ar: "التصميم", en: "Design" }, desc: { ar: "تصميم الصفحات الأساسية على الموبايل والديسكتوب، مع جولات مراجعة.", en: "Key pages designed for mobile and desktop, with review rounds." } },
      { title: { ar: "التطوير والمحتوى", en: "Build and content" }, desc: { ar: "نبني الموقع ونُدخل المحتوى، ونختبره على المتصفحات والمقاسات المختلفة.", en: "We build the site, load the content, and test it across browsers and screen sizes." } },
      { title: { ar: "الإطلاق والتسليم", en: "Launch and handover" }, desc: { ar: "ننشر الموقع ونربطه بالقياس، ونسلّمك لوحة التحكّم مع تدريب.", en: "We publish the site, connect measurement, and hand over the control panel with training." } },
    ],
    deliverables: [
      { ar: "موقع متجاوب على كل المقاسات", en: "A site responsive at every size" },
      { ar: "لوحة تحكّم للمحتوى", en: "Content management access" },
      { ar: "الدومين والاستضافة باسمك", en: "Domain and hosting in your name" },
      { ar: "تدريب على الاستخدام", en: "Handover and training" },
    ],
    why: [
      { title: { ar: "للموبايل أولًا", en: "Mobile first" }, desc: { ar: "أغلب الزوّار يأتون من هواتفهم، فنصمّم لها أولًا لا نُصلح لها في النهاية.", en: "Most visitors come from their phones, so we design for them first rather than patching at the end." } },
      { title: { ar: "كل صفحة تقود لخطوة", en: "Every page leads somewhere" }, desc: { ar: "لكل صفحة غاية واضحة: تواصل، أو طلب عرض، أو انتقال إلى الخدمة المناسبة.", en: "Each page has one clear purpose: a message, a quote request, or the right next service." } },
      { title: { ar: "الموقع ملكك", en: "The site is yours" }, desc: { ar: "الدومين والاستضافة مسجّلان باسمك لا باسمنا، والموقع ملكك بالكامل.", en: "Domain and hosting are registered in your name, not ours — the site is entirely yours." } },
    ],
  },

  seo: {
    intro: {
      ar: "السيو ليس وعدًا بالمركز الأول، بل عملٌ متّصل: تدقيق تقني يُصلح ما يمنع الفهرسة، وبحث كلمات مبنيّ على كيف يبحث السعودي فعلًا لا على ترجمة قائمة إنجليزية، ومحتوى عربي مكتوب يُنشر بانتظام. النتائج التقنية تظهر خلال أسابيع، والترتيب على الكلمات التي تجلب عملاء يحتاج من أربعة إلى تسعة أشهر — نقولها قبل أن نبدأ لا بعدها.",
      en: "SEO is not a promise of the top spot; it is connected work: a technical audit that fixes what blocks indexing, keyword research built on how Saudis actually search rather than a translated English list, and Arabic content written and published consistently. Technical gains show within weeks; ranking for terms that bring clients takes four to nine months — we say so before we start, not after.",
    },
    signs: [
      { ar: "منافسوك يظهرون في جوجل وأنت لا", en: "Competitors show up on Google and you don't" },
      { ar: "موقعك موجود منذ مدّة ولا يجلب زيارات تُذكر", en: "Your site has been live for a while and brings almost no visits" },
      { ar: "تعتمد كليًا على الإعلانات المدفوعة لتصل إلى العملاء", en: "You rely entirely on paid ads to reach clients" },
      { ar: "لا تعرف الكلمات التي يبحث بها عملاؤك فعلًا", en: "You don't know the words your clients actually search with" },
    ],
    includes: [
      {
        title: { ar: "تدقيق تقني كامل للموقع", en: "Full technical site audit" },
        desc: { ar: "نفحص السرعة والفهرسة والروابط المكسورة والصفحات المكرّرة، ونرتّب ما يمنع جوجل من فهم موقعك بحسب أولويته.", en: "We check speed, indexing, broken links and duplicate pages, and rank what stops Google understanding your site by priority." },
      },
      {
        title: { ar: "بحث كلمات عربية لسوقك", en: "Arabic keyword research for your market" },
        desc: { ar: "كلمات مبنية على كيف يكتب عميلك في بحثه فعلًا، بصيغها ولهجاتها، لا ترجمة لقائمة إنجليزية.", en: "Keywords built on how your client really types, phrasings and dialect included — not a translated English list." },
      },
      {
        title: { ar: "تحسين الصفحات والبنية الداخلية", en: "On-page and internal structure" },
        desc: { ar: "عنوان كل صفحة ووصفها ومحتواها، والروابط الداخلية التي تربط الصفحات ببعضها.", en: "Each page's title, description and content, and the internal links that tie pages together." },
      },
      {
        title: { ar: "بيانات منظّمة وخريطة موقع", en: "Structured data and sitemap" },
        desc: { ar: "ما يساعد جوجل على فهم نشاطك وخدماتك وأسئلتك، وعرضها أوضح في النتائج.", en: "What helps Google understand your business, services and questions, and show them more clearly in results." },
      },
      {
        title: { ar: "خطة محتوى شهرية", en: "A monthly content plan" },
        desc: { ar: "مقالات وصفحات تُكتب بالعربية على الأسئلة التي يبحث عنها عملاؤك، وتُنشر بانتظام.", en: "Articles and pages written in Arabic around the questions your clients search for, published consistently." },
      },
      {
        title: { ar: "ضبط نشاطك على خرائط جوجل", en: "Google Business Profile" },
        desc: { ar: "ملف نشاط تجاري مكتمل ومحدّث، لتظهر لمن يبحث عن خدمتك بالقرب منه.", en: "A complete, up-to-date business profile, so you appear to people searching for your service nearby." },
      },
    ],
    steps: [
      { title: { ar: "التدقيق", en: "Audit" }, desc: { ar: "نفحص الموقع تقنيًا ونراجع وضعه الحالي في البحث.", en: "We audit the site technically and review where it stands in search today." } },
      { title: { ar: "البحث والخطة", en: "Research and plan" }, desc: { ar: "نبحث الكلمات، ونربط كل مجموعة منها بصفحة، ونضع خطة المحتوى.", en: "We research keywords, map each group to a page, and set the content plan." } },
      { title: { ar: "الإصلاح والنشر", en: "Fix and publish" }, desc: { ar: "ننفّذ الإصلاحات التقنية، ونحسّن الصفحات، ونبدأ نشر المحتوى.", en: "We carry out the technical fixes, improve the pages, and start publishing content." } },
      { title: { ar: "القياس الشهري", en: "Monthly measurement" }, desc: { ar: "تقرير كل شهر بما تحرّك وما لم يتحرّك، وتعديل الخطة على أساسه.", en: "A report every month on what moved and what didn't, and the plan adjusted accordingly." } },
    ],
    deliverables: [
      { ar: "تقرير التدقيق بأولويات واضحة", en: "An audit report with clear priorities" },
      { ar: "خطة كلمات مفتاحية بنيّة البحث", en: "A keyword plan mapped to search intent" },
      { ar: "محتوى عربي منشور على موقعك", en: "Arabic content published on your site" },
      { ar: "تقرير شهري بما تحرّك وما لم يتحرّك", en: "A monthly report on what moved and what didn't" },
    ],
    why: [
      { title: { ar: "لا وعود بالمركز الأول", en: "No top-spot promises" }, desc: { ar: "نقول ما يمكن توقّعه قبل أن نبدأ، ونلتزم بالعمل نفسه لا بترتيب لا يملكه أحد.", en: "We tell you what to expect before we start, and commit to the work itself — not to a ranking nobody controls." } },
      { title: { ar: "محتوى مكتوب لا مترجم", en: "Written, not translated" }, desc: { ar: "العربية التي يقرؤها عميلك ويبحث بها، مكتوبة من البداية.", en: "The Arabic your client reads and searches in, written that way from the start." } },
      { title: { ar: "تقرير صريح", en: "Honest reporting" }, desc: { ar: "ترى كل شهر ما تحسّن وما لم يتحسّن ولماذا، لا لقطات منتقاة.", en: "Every month you see what improved, what didn't and why — not hand-picked screenshots." } },
    ],
  },

  "social-media": {
    intro: {
      ar: "المحتوى المنتظم يبني الثقة أكثر من الحملة الواحدة الكبيرة. نضع خطة شهرية، وننتج التصاميم والنصوص، ونتابع التفاعل ونعدّل على أساسه.",
      en: "Consistent content builds more trust than one big campaign. We set a monthly plan, produce the designs and copy, then read engagement and adjust.",
    },
    signs: [
      { ar: "حساباتك متوقّفة، أو تُنشر فيها منشورات متفرّقة بلا خطة", en: "Your accounts have gone quiet, or post at random with no plan" },
      { ar: "التصاميم لا تشبه بعضها ولا تشبه هويتك", en: "The designs don't match each other or your identity" },
      { ar: "المتابعون موجودون لكن التفاعل ضعيف", en: "You have followers but little engagement" },
      { ar: "لا يوجد في فريقك من يتفرّغ للمحتوى", en: "Nobody on your team has time for content" },
    ],
    includes: [
      {
        title: { ar: "خطة محتوى شهرية", en: "Monthly content plan" },
        desc: { ar: "تقويم بالمواضيع والمواعيد، تراه وتوافق عليه قبل التنفيذ.", en: "A calendar of topics and dates you see and approve before production." },
      },
      {
        title: { ar: "تصميم البوستات والقصص", en: "Post and story design" },
        desc: { ar: "تصاميم على هويتك بقوالب ثابتة تجعل حسابك معروفًا من أول نظرة.", en: "Designs on your identity with consistent templates that make your account recognisable at first glance." },
      },
      {
        title: { ar: "كتابة النصوص", en: "Copywriting" },
        desc: { ar: "نصوص بلغة جمهورك: بالفصحى المبسّطة أو باللهجة الأقرب إليه.", en: "Copy in your audience's language: simplified Standard Arabic or the dialect closest to them." },
      },
      {
        title: { ar: "جدولة النشر", en: "Publishing schedule" },
        desc: { ar: "نشر في مواعيد منتظمة على المنصّات المتّفق عليها.", en: "Posting on a regular schedule across the agreed platforms." },
      },
      {
        title: { ar: "تقرير أداء شهري", en: "Monthly performance report" },
        desc: { ar: "ما وصل، وما تفاعل معه الجمهور، وما سنغيّره في الشهر التالي.", en: "What reached people, what they engaged with, and what we'll change next month." },
      },
    ],
    steps: [
      { title: { ar: "الجمهور والنبرة", en: "Audience and tone" }, desc: { ar: "نحدّد جمهورك ونبرة الحساب والمحاور التي يدور حولها المحتوى.", en: "We define your audience, the account's tone, and the themes the content will revolve around." } },
      { title: { ar: "التقويم", en: "The calendar" }, desc: { ar: "خطة شهرية بالمواضيع تراجعها قبل الإنتاج.", en: "A monthly plan of topics you review before production." } },
      { title: { ar: "الإنتاج والنشر", en: "Production and publishing" }, desc: { ar: "تصميم وكتابة ونشر في المواعيد المتّفق عليها.", en: "Design, copy and publishing on the agreed schedule." } },
      { title: { ar: "القراءة والتعديل", en: "Read and adjust" }, desc: { ar: "نقرأ التفاعل ونعدّل خطة الشهر التالي على أساسه.", en: "We read engagement and adjust next month's plan around it." } },
    ],
    deliverables: [
      { ar: "مكتبة تصاميم جاهزة", en: "A library of ready designs" },
      { ar: "دليل نبرة الحساب", en: "Account tone guide" },
      { ar: "تقويم محتوى شهري", en: "A monthly content calendar" },
      { ar: "تقارير تفاعل", en: "Engagement reports" },
    ],
    why: [
      { title: { ar: "الاستمرار قبل الضجّة", en: "Consistency over noise" }, desc: { ar: "حضور منتظم شهرًا بعد شهر يبني ثقة لا تبنيها حملة واحدة.", en: "Showing up month after month builds trust no single campaign can." } },
      { title: { ar: "هوية ثابتة", en: "A steady identity" }, desc: { ar: "كل منشور يُبنى على نظام بصري واحد، فيعرفك الجمهور قبل أن يقرأ الاسم.", en: "Every post sits on one visual system, so people know it's you before they read the name." } },
      { title: { ar: "سجلّ يمكنك رؤيته", en: "A record you can see" }, desc: { ar: "حسابات نديرها منذ شهور متواصلة معروضة في أعمالنا، بتصاميمها الفعلية.", en: "Accounts we've run for months on end are in our work, with their actual designs." } },
    ],
  },

  "digital-marketing": {
    intro: {
      ar: "استراتيجية مبنية على بيانات سوقك: من هو عميلك، أين يبحث، وما الذي يوقفه عن الشراء. ثم خطة قنوات بأهداف ومؤشرات واضحة.",
      en: "A strategy built on your market's data: who your customer is, where they search, and what stops them buying. Then a channel plan with clear goals and metrics.",
    },
    signs: [
      { ar: "تنفق على التسويق ولا تعرف ما الذي يعمل منه", en: "You spend on marketing and can't tell what's working" },
      { ar: "كل قناة تُدار وحدها، بلا خطة تجمعها", en: "Each channel runs on its own, with no plan tying them together" },
      { ar: "لا أهداف ولا أرقام متّفق عليها للحكم على النتائج", en: "There are no agreed goals or numbers to judge results by" },
      { ar: "تريد دخول سوق جديد ولا تعرف من أين تبدأ", en: "You want to enter a new market and don't know where to begin" },
    ],
    includes: [
      {
        title: { ar: "تحليل الجمهور والمنافسين", en: "Audience and competitor analysis" },
        desc: { ar: "من هو عميلك، وأين يقضي وقته، وكيف يخاطبه منافسوك.", en: "Who your client is, where they spend their time, and how competitors speak to them." },
      },
      {
        title: { ar: "تحديد القنوات والرسائل", en: "Channels and messages" },
        desc: { ar: "القنوات التي تستحق ميزانيتك، والرسالة المناسبة لكل مرحلة من قرار الشراء.", en: "The channels worth your budget, and the right message for each stage of the buying decision." },
      },
      {
        title: { ar: "خطة تنفيذ مرتّبة", en: "A prioritised execution plan" },
        desc: { ar: "خطوات مرتّبة بالأولوية: ماذا يُنفَّذ أولًا، ومن يتولّاه، وبأي ميزانية.", en: "Steps in order of priority: what happens first, who owns it, and with what budget." },
      },
      {
        title: { ar: "مؤشرات أداء متّفق عليها", en: "Agreed performance indicators" },
        desc: { ar: "أرقام قليلة واضحة نتّفق عليها من البداية، ويُقاس بها النجاح.", en: "A few clear numbers agreed at the start that success is measured by." },
      },
    ],
    steps: [
      { title: { ar: "التشخيص", en: "Diagnosis" }, desc: { ar: "نراجع ما تفعله حاليًا وأرقامه، ونحلّل السوق والمنافسين.", en: "We review what you do today and its numbers, and analyse the market and competitors." } },
      { title: { ar: "الاستراتيجية", en: "Strategy" }, desc: { ar: "نحدّد الجمهور والقنوات والرسائل والأهداف.", en: "We define the audience, channels, messages and goals." } },
      { title: { ar: "خطة التنفيذ", en: "Execution plan" }, desc: { ar: "نحوّل الاستراتيجية إلى خطة عملية بأولويات وميزانيات.", en: "We turn the strategy into a practical plan with priorities and budgets." } },
      { title: { ar: "المتابعة", en: "Follow-through" }, desc: { ar: "لوحة لمتابعة النتائج، ومراجعة دورية للخطة على أساسها.", en: "A dashboard to track results, and regular reviews of the plan against it." } },
    ],
    deliverables: [
      { ar: "وثيقة استراتيجية", en: "Strategy document" },
      { ar: "خطة قنوات ومحتوى", en: "Channel and content plan" },
      { ar: "لوحة متابعة النتائج", en: "Results dashboard" },
    ],
    why: [
      { title: { ar: "بيانات لا تخمين", en: "Data, not guesswork" }, desc: { ar: "كل قناة ورسالة في الخطة لها سبب من سوقك أنت، لا من قالب يصلح لأي شركة.", en: "Every channel and message in the plan has a reason rooted in your market, not a template that fits anyone." } },
      { title: { ar: "قنوات تعمل معًا", en: "Channels that work together" }, desc: { ar: "الإعلان والمحتوى والموقع يخدمون هدفًا واحدًا، بدل أن يعمل كلٌّ منها وحده.", en: "Ads, content and the website serve one goal instead of each running on its own." } },
      { title: { ar: "أهداف تُقاس", en: "Goals you can measure" }, desc: { ar: "نتّفق على الأرقام من البداية، فيكون الحكم على النتيجة واضحًا للطرفين.", en: "We agree the numbers up front, so judging the result is clear for both sides." } },
    ],
  },

  "media-buying": {
    intro: {
      ar: "الإعلان الجيد ليس الأكثر إنفاقًا بل الأدقّ استهدافًا. ندير حملاتك على المنصّات المناسبة لجمهورك، ونراقب التكلفة يوميًا لا شهريًا.",
      en: "Good advertising isn't the biggest spend, it's the sharpest targeting. We run your campaigns on the platforms your audience actually uses, and watch cost daily rather than monthly.",
    },
    signs: [
      { ar: "تروّج المنشورات بزرّ الترويج ولا تعرف كم يكلّفك العميل", en: "You boost posts and don't know what a client costs you" },
      { ar: "الميزانية تُصرف، والرسائل التي تصلك من غير المهتمّين", en: "The budget gets spent and the messages come from people who aren't interested" },
      { ar: "لا يوجد تتبّع يربط الإعلان بالمحادثات أو المبيعات", en: "Nothing links the ads to conversations or sales" },
      { ar: "تريد التوسّع في الإعلان دون أن تتضاعف التكلفة", en: "You want to scale ads without the cost doubling" },
    ],
    includes: [
      {
        title: { ar: "اختيار المنصّات والجمهور", en: "Platform and audience selection" },
        desc: { ar: "المنصّات التي يوجد عليها جمهورك فعلًا، وشرائح استهداف مدروسة بدل الاستهداف الواسع.", en: "The platforms your audience is really on, and considered targeting segments instead of broad reach." },
      },
      {
        title: { ar: "إعداد الحملات والتتبّع", en: "Campaign and tracking setup" },
        desc: { ar: "هيكلة الحملات، وربط البكسل وأحداث التحويل، حتى يُقاس كل ما يُنفق.", en: "Campaign structure, pixels and conversion events connected, so everything spent is measured." },
      },
      {
        title: { ar: "إنتاج مواد الإعلان", en: "Ad creative production" },
        desc: { ar: "تصاميم وفيديوهات قصيرة ونصوص، بأكثر من نسخة للاختبار.", en: "Designs, short videos and copy, in several versions for testing." },
      },
      {
        title: { ar: "متابعة يومية وتعديل", en: "Daily monitoring and adjustment" },
        desc: { ar: "نراقب التكلفة والنتائج يوميًا، ونوقف ما لا يعمل مبكرًا.", en: "We watch cost and results every day, and stop what isn't working early." },
      },
    ],
    steps: [
      { title: { ar: "الإعداد", en: "Setup" }, desc: { ar: "مراجعة الحسابات، وربط التتبّع، وتحديد الأهداف والميزانية.", en: "Account review, tracking connected, goals and budget set." } },
      { title: { ar: "المواد", en: "Creative" }, desc: { ar: "إنتاج نسخ إعلانية متعدّدة للاختبار.", en: "Several ad variations produced for testing." } },
      { title: { ar: "الإطلاق", en: "Launch" }, desc: { ar: "تشغيل الحملات على الجمهور والمنصّات المختارة.", en: "Campaigns go live on the chosen audiences and platforms." } },
      { title: { ar: "المتابعة والتقارير", en: "Monitoring and reports" }, desc: { ar: "تعديل يومي، وتقرير بالإنفاق والنتائج، وتوصيات للجولة التالية.", en: "Daily adjustment, a report on spend and results, and recommendations for the next round." } },
    ],
    deliverables: [
      { ar: "حملات مضبوطة ومربوطة بالقياس", en: "Campaigns wired to measurement" },
      { ar: "مواد إعلانية بأكثر من نسخة", en: "Ad creative in several versions" },
      { ar: "تقارير إنفاق وعائد", en: "Spend and return reports" },
      { ar: "توصيات للجولة التالية", en: "Recommendations for the next round" },
    ],
    why: [
      { title: { ar: "تقارير تُقرأ", en: "Reports you can read" }, desc: { ar: "تقرير بالإنفاق والنتائج بلغة واضحة، لا لقطات من لوحات المنصّات.", en: "Spend and results reported in plain language, not screenshots from platform dashboards." } },
      { title: { ar: "متابعة يومية", en: "Watched daily" }, desc: { ar: "الإنفاق الذي لا يعمل يُكتشف في يومه، لا في تقرير آخر الشهر.", en: "Spend that isn't working is caught the same day, not in an end-of-month report." } },
      { title: { ar: "الإدارة منفصلة عن الإنفاق", en: "Management separate from spend" }, desc: { ar: "أجر الإدارة منفصل عن الميزانية الإعلانية، فترى إنفاقك على المنصّات كما هو.", en: "Our fee is separate from the ad budget, so you see your platform spend exactly as it is." } },
    ],
  },

  "performance-marketing": {
    intro: {
      ar: "بعد الإطلاق يبدأ الشغل الحقيقي: نقرأ الأرقام، ونجرّب نسخًا مختلفة، ونتخلّص ممّا لا يعمل — حتى يصير كل ما يُنفق أعلى عائدًا ممّا سبقه.",
      en: "The real work starts after launch: reading the numbers, testing variants, and cutting what doesn't work — until every unit spent returns more than the last.",
    },
    signs: [
      { ar: "حملاتك تعمل، لكن العائد ثابت لا يتحسّن", en: "Your campaigns run, but the return never improves" },
      { ar: "تكلفة العميل ترتفع شهرًا بعد شهر", en: "The cost per client climbs month after month" },
      { ar: "الزيارات تصل إلى صفحة لا تحوّل", en: "Traffic lands on a page that doesn't convert" },
      { ar: "القرارات تُتّخذ بالانطباع لا بالأرقام", en: "Decisions are made on gut feeling, not numbers" },
    ],
    includes: [
      {
        title: { ar: "قياس دقيق للتحويلات", en: "Accurate conversion tracking" },
        desc: { ar: "نتأكّد أن كل تحويل مهم — طلب، أو محادثة، أو شراء — يُسجَّل بدقّة قبل أن نحكم على أي شيء.", en: "We make sure every conversion that matters — a request, a chat, a purchase — is recorded correctly before we judge anything." },
      },
      {
        title: { ar: "اختبارات A/B مستمرة", en: "Continuous A/B testing" },
        desc: { ar: "نختبر العناوين والمواد والجماهير والعروض، واحدًا تلو الآخر، ونبقي على الأفضل.", en: "We test headlines, creative, audiences and offers one at a time, and keep what wins." },
      },
      {
        title: { ar: "تحسين صفحات الهبوط", en: "Landing page optimisation" },
        desc: { ar: "نعدّل الصفحة التي يصل إليها الزائر حتى ترتفع نسبة من يتحوّل منهم إلى عملاء.", en: "We refine the page visitors land on so more of them become clients." },
      },
      {
        title: { ar: "إعادة توزيع الميزانية", en: "Budget reallocation" },
        desc: { ar: "ننقل الإنفاق من الحملات الأضعف إلى ما يُثبت عائده بالأرقام.", en: "We move spend away from weaker campaigns towards what proves its return in the numbers." },
      },
    ],
    steps: [
      { title: { ar: "ضبط القياس", en: "Fix measurement" }, desc: { ar: "نراجع التتبّع ونُصلحه، حتى تكون الأرقام التي نبني عليها صحيحة.", en: "We review and repair tracking, so the numbers we build on are right." } },
      { title: { ar: "تحديد الفرص", en: "Find the gaps" }, desc: { ar: "نقرأ البيانات لنجد أين يتسرّب العملاء في الطريق.", en: "We read the data to find where clients drop off along the way." } },
      { title: { ar: "الاختبار", en: "Test" }, desc: { ar: "تجارب منظّمة، لكلٍّ منها فرضية واضحة ومعيار للحكم.", en: "Structured experiments, each with a clear hypothesis and a way to judge it." } },
      { title: { ar: "التوسيع", en: "Scale" }, desc: { ar: "نوسّع ما ثبت نجاحه، ونوقف ما لم يثبت.", en: "We scale what has proven itself and stop what hasn't." } },
    ],
    deliverables: [
      { ar: "تقرير عائد شهري", en: "Monthly return report" },
      { ar: "سجلّ الاختبارات ونتائجها", en: "Test log and outcomes" },
      { ar: "خطة تحسين للمرحلة القادمة", en: "An optimisation plan for the next phase" },
    ],
    why: [
      { title: { ar: "الأرقام تقرّر", en: "The numbers decide" }, desc: { ar: "لا نغيّر شيئًا لأنه يبدو أفضل؛ نغيّره لأن الاختبار أثبت ذلك.", en: "We don't change something because it looks better; we change it because a test proved it." } },
      { title: { ar: "سجلّ لكل تجربة", en: "Every test on record" }, desc: { ar: "كل اختبار ونتيجته مكتوبان، فلا يُعاد ما جُرّب ولا تضيع المعرفة.", en: "Every test and its result is written down, so nothing is repeated and nothing learned is lost." } },
      { title: { ar: "الصفحة جزء من الحملة", en: "The page is part of the campaign" }, desc: { ar: "لا نحسّن الإعلان وحده؛ ما يحدث بعد النقرة يحدّد العائد بقدر الإعلان نفسه.", en: "We don't optimise the ad alone; what happens after the click decides the return as much as the ad does." } },
    ],
  },

  crm: {
    intro: {
      ar: "النظام لا يُشترى، يُهيَّأ. نبدأ من طريقة عملكم الحالية — كيف يصل العميل، ومن يتابعه، ومتى يُعتبر الطلب مغلقًا — ثم نبني عليها نظامًا يعرف حالة كل عميل، بدل أن نجبركم على قالب جاهز.",
      en: "A system isn't bought, it's shaped. We start from how you already work — how a client arrives, who follows up, when a request counts as closed — then build a system that knows every client's state, instead of forcing you into a template.",
    },
    signs: [
      { ar: "بيانات العملاء موزّعة بين الواتساب والجداول والدفاتر", en: "Client data is scattered across WhatsApp, spreadsheets and notebooks" },
      { ar: "صفقات تُنسى لأن أحدًا لا يتذكّر موعد المتابعة", en: "Deals are forgotten because nobody remembers to follow up" },
      { ar: "لا تعرف كم طلبًا دخل هذا الشهر، ولا أين توقّف", en: "You can't say how many requests came in this month, or where they stalled" },
      { ar: "كل موظف يتابع العملاء بطريقته", en: "Every employee follows up with clients their own way" },
    ],
    includes: [
      {
        title: { ar: "قراءة مسار العميل كما هو اليوم", en: "Your client journey as it runs today" },
        desc: { ar: "نجلس مع من يتعامل مع العملاء فعلًا، لنرسم الطريق من أول تواصل حتى الإغلاق.", en: "We sit with the people who actually handle clients and map the path from first contact to close." },
      },
      {
        title: { ar: "مراحل بيع واضحة بمسؤول لكل مرحلة", en: "Clear sales stages, each with an owner" },
        desc: { ar: "مراحل تطابق طريقة عملكم، ولكل طلب مسؤول بالاسم وحالة معروفة.", en: "Stages that match how you work, with a named owner and a known status for every request." },
      },
      {
        title: { ar: "نقل بيانات العملاء الحالية", en: "Migrating existing client data" },
        desc: { ar: "ننقل ما لديكم من الجداول والمحادثات إلى النظام مرتّبًا، فلا تبدأون من الصفر.", en: "We move what you have out of sheets and chats into the system, organised, so you don't start from zero." },
      },
      {
        title: { ar: "تنبيهات للمتابعة", en: "Follow-up reminders" },
        desc: { ar: "تذكيرات بالمواعيد والمتابعات للفريق، حتى لا تُنسى صفقة.", en: "Reminders of appointments and follow-ups for the team, so no deal is forgotten." },
      },
      {
        title: { ar: "تقارير تقرأها الإدارة بلا وسيط", en: "Reports management reads directly" },
        desc: { ar: "عدد الطلبات، ومراحلها، ونسب الإغلاق — في لوحة تُقرأ مباشرة.", en: "Request volume, stages and close rates — on a dashboard read directly." },
      },
    ],
    steps: [
      { title: { ar: "الفهم", en: "Understand" }, desc: { ar: "نرسم مسار العميل ونحدّد ما يحتاجه كل دور في الفريق.", en: "We map the client journey and what each role on the team needs." } },
      { title: { ar: "التهيئة", en: "Configure" }, desc: { ar: "نهيّئ المراحل والحقول والصلاحيات والتنبيهات.", en: "We set up the stages, fields, permissions and reminders." } },
      { title: { ar: "نقل البيانات", en: "Migrate" }, desc: { ar: "ننقل بيانات العملاء الحالية ونتحقّق منها معكم.", en: "We move existing client data across and check it with you." } },
      { title: { ar: "التدريب والمتابعة", en: "Train and support" }, desc: { ar: "ندرّب الفريق على الاستعمال، ونبقى معكم في الشهر الأول.", en: "We train the team and stay with you through the first month." } },
    ],
    deliverables: [
      { ar: "نظام مهيّأ وجاهز للاستخدام", en: "A configured, working system" },
      { ar: "بيانات العملاء الحالية منقولة ومرتّبة", en: "Existing client data migrated and organised" },
      { ar: "تدريب الفريق على استعماله", en: "Team training on how to use it" },
      { ar: "متابعة معكم في الشهر الأول", en: "We stay with you through the first month" },
    ],
    why: [
      { title: { ar: "على طريقتكم لا على قالب", en: "Your way, not a template" }, desc: { ar: "النظام يتبع طريقة عملكم، لا العكس.", en: "The system follows how you work, not the other way round." } },
      { title: { ar: "بسيط ليُستعمل", en: "Simple enough to be used" }, desc: { ar: "نظام لا يستعمله الفريق لا قيمة له، فنبنيه بأقل خطوات ممكنة.", en: "A system the team doesn't use is worthless, so we build it with as few steps as possible." } },
      { title: { ar: "الإدارة ترى كل شيء", en: "Management sees everything" }, desc: { ar: "حالة كل عميل وكل طلب واضحة، دون انتظار أحد ليجمعها.", en: "Every client's and every request's status is visible, without waiting for someone to compile it." } },
    ],
  },
};

/** نصوص صفحة الخدمة وقائمة الخدمات. */
export const serviceUi = {
  signsLabel: { ar: "هل هذه الخدمة لك؟", en: "Is this for you?" } as Bi,
  signsTitle: { ar: "تحتاجها إن كان…", en: "You need it if…" } as Bi,
  includesLabel: { ar: "ما يشمله", en: "What's included" } as Bi,
  stepsLabel: { ar: "كيف نعمل عليها", en: "How we run it" } as Bi,
  deliverablesLabel: { ar: "ما تستلمه", en: "What you receive" } as Bi,
  whyLabel: { ar: "ما يميّز طريقتنا", en: "What sets our approach apart" } as Bi,
  faqLabel: { ar: "أسئلة عن هذه الخدمة", en: "Questions about this service" } as Bi,
  siblingsLabel: { ar: "خدمات تكمّلها", en: "Services that complete it" } as Bi,
  ask: { ar: "اسأل عن هذه الخدمة", en: "Ask about this service" } as Bi,
  allFaq: { ar: "كل الأسئلة عن دَعمة", en: "All questions about Daamah" } as Bi,
  seeWork: { ar: "شاهد الأعمال", en: "See the work" } as Bi,
  count: { ar: "خدمات", en: "services" } as Bi,

  /* /services — طرق التعاون */
  engageLabel: { ar: "طرق العمل معنا", en: "Ways to work with us" } as Bi,
  engageTitle: {
    ar: ["ابدأ بما تحتاجه الآن،", "ووسّع حين تحتاج."],
    en: ["Start with what you need now,", "expand when you need to."],
  } as Bi<string[]>,
  engage: [
    {
      title: { ar: "مشروع محدّد", en: "A defined project" } as Bi,
      desc: {
        ar: "خدمة واحدة بنطاق واضح وتسليم نهائي: هوية، أو ملف تعريفي، أو موقع، أو نظام لإدارة العملاء.",
        en: "One service with a clear scope and a final handover: an identity, a company profile, a website or a client management system.",
      } as Bi,
      href: "/contact",
      link: { ar: "احكِ لنا عن مشروعك", en: "Tell us about your project" } as Bi,
    },
    {
      title: { ar: "منظومة متكاملة", en: "A connected system" } as Bi,
      desc: {
        ar: "أكثر من خدمة تُبنى معًا على خطة واحدة، حين يكون الضعف في أكثر من جزء.",
        en: "Several services built together on one plan, when the weakness sits in more than one part.",
      } as Bi,
      href: "/solutions",
      link: { ar: "اقرأ الحلول", en: "See the solutions" } as Bi,
    },
    {
      title: { ar: "شراكة شهرية", en: "A monthly partnership" } as Bi,
      desc: {
        ar: "السوشيال ميديا والسيو والإعلانات وتسويق الأداء تُدار شهريًا، بخطة وتقرير كل شهر.",
        en: "Social media, SEO, advertising and performance marketing run monthly, with a plan and a report every month.",
      } as Bi,
      href: "/process",
      link: { ar: "كيف نعمل", en: "How we work" } as Bi,
    },
  ],
  workLabel: { ar: "من أعمالنا", en: "From our work" } as Bi,
  faqTeaser: {
    ar: "عندك سؤال قبل أن تبدأ؟ جمعنا إجابات الأسئلة التي تصلنا أكثر عن دَعمة وطريقة عملها.",
    en: "Have a question before you start? We've gathered answers to what we're asked most about Daamah and how we work.",
  } as Bi,
};
