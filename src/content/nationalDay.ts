import type { Bi } from "../i18n";

/**
 * صفحة حملة «عرض اليوم الوطني» — عربية فقط، للإعلان وحده.
 *
 * صفحة هبوط لإعلانات مدفوعة، لا صفحة من شجرة الموقع: بلا هيدر ولا
 * فوتر ولا رابط يخرج بالزائر منها. جمهورها سعودي يصل من إعلان عربي،
 * فنصوصها سلاسل عربية لا `Bi` — عدا الأسئلة، لأن مولّد `FAQPage`
 * يقرأها بشكلها.
 *
 * قاعدة المحتوى: لا رقم ولا وعد لم يقله العرض نفسه. الأرقام الوحيدة
 * هنا هي ما في الإعلان: 5,000 ريال، 14 يوم عمل، 10 تصاميم. لا عدد
 * صفحات ولا حدّ تعديلات ولا مدّة فيديو، ولا تاريخ انتهاء ولا عدد
 * مقاعد: «لعدد محدود» كما قيل في الإعلان.
 */

export const offerPath = "/national-day";

/** مسارات تُعرض بلا هيدر ولا فوتر — صفحات الإعلانات */
export const barePaths = [offerPath];

const ar = (s: string): Bi => ({ ar: s, en: s });

export const PRICE = "5,000";
export const CURRENCY = "ريال";

/** صورة من معرض عمل (`galleries[slug][n-1]`) أو غلافه (`n` غائب) */
export type ShotRef = { slug: string; n?: number };

export const video = {
  offer: {
    src: "/assets/video/national-day-offer.mp4",
    poster: "/assets/video/national-day-offer-poster.jpg",
    vSrc: "/assets/video/national-day-offer-vertical.mp4",
    vPoster: "/assets/video/national-day-offer-vertical-poster.jpg",
  },
  intro: {
    src: "/assets/video/daamah-intro.mp4",
    poster: "/assets/video/daamah-intro-poster.jpg",
  },
};

export const nationalDay = {
  meta: {
    title: "عرض اليوم الوطني: حضور رقمي متكامل بـ 5,000 ريال — دَعمة",
    description:
      "موقع إلكتروني وCompany Profile وحسابات سوشيال ميديا و10 تصاميم وفيديو Motion تعريفي، جاهزة خلال 14 يوم عمل بـ 5,000 ريال. لعدد محدود من الشركات.",
  },

  badge: "عرض اليوم الوطني السعودي",
  topCta: "احجز مكانك",

  included: ["موقع إلكتروني", "Company Profile", "حسابات السوشيال ميديا", "10 تصاميم جاهزة للنشر", "فيديو Motion تعريفي"],

  scarcity: "العرض متاح لعدد محدود من الشركات خلال فترة اليوم الوطني.",

  hero: {
    title: ["كل ما تحتاجه شركتك رقميًا،", "بسعر موقع إلكتروني واحد."],
    intro:
      "في شركات تدفع 5,000 ريال على موقع إلكتروني فقط. مع دَعمة، نفس المبلغ يعطيك الأساس الرقمي كامل — جاهز خلال 14 يوم عمل.",
    priceLabel: "الباقة كاملة",
    was: "موقع إلكتروني فقط",
    primary: "احجز مكانك الآن",
    watch: "شاهد العرض",
    proof: "+150 مشروع · +100 عميل · منذ 2018",
  },

  clients: {
    label: "من عملائنا في السعودية",
    names: ["بصمة العمران", "بيلدنج لاين", "كونكت لأجنحة المعارض", "مصنع هياكل العلمين", "مزرعة الحياة للدواجن", "يوتيليتي فيجن", "فيوتشر أكسس", "كوربنتا"],
  },

  form: {
    title: "احجز مكانك",
    intro: "ثلاث خانات، ونكمل معك على واتساب.",
    fields: {
      name: { label: "الاسم", placeholder: "اسمك الكريم" },
      company: { label: "اسم الشركة", placeholder: "اسم شركتك" },
      activity: { label: "نشاط الشركة", placeholder: "مثال: مقاولات، عقارات، مطعم، عيادة" },
    },
    optional: "اختياري",
    errors: {
      name: "اكتب اسمك من فضلك.",
      activity: "اكتب نشاط شركتك من فضلك.",
    },
    submit: "احجز مكاني عبر واتساب",
    assurance: "بدون التزام — نرد عليك خلال يوم عمل.",
    sent: {
      title: "فتحنا لك واتساب برسالتك.",
      body: "اضغط «إرسال» في واتساب، ويتواصل معك فريق دَعمة لتأكيد حجزك.",
      retry: "افتح واتساب مرة ثانية",
      again: "تعديل البيانات",
    },
    wa: {
      heading: "حجز عرض اليوم الوطني",
      greeting: "السلام عليكم،",
      intent: "أرغب في حجز مكان لشركتنا في باقة اليوم الوطني المتكاملة (5,000 ريال).",
      name: "الاسم",
      company: "الشركة",
      activity: "النشاط",
      source: "الصفحة",
      campaign: "الحملة",
    },
  },

  compare: {
    label: "الفرق",
    title: ["نفس الـ 5,000 ريال،", "وفرق كبير في النتيجة."],
    before: { note: "ما تدفعه بعض الشركات", title: "موقع إلكتروني فقط" },
    after: { note: "عرض اليوم الوطني من دَعمة", title: "الباقة المتكاملة" },
  },

  items: {
    label: "ماذا تستلم",
    title: ["خمسة عناصر،", "وأساس رقمي واحد."],
    from: "من أعمالنا",
    list: [
      {
        no: "01",
        title: "موقع إلكتروني",
        lead: "يخلي عميلك يعرف شركتك وخدماتك، ويتواصل معك بسهولة.",
        points: ["تصميم خاص بشركتك وعلى هويتها", "يشتغل بسلاسة على الجوال والكمبيوتر", "طرق تواصل واضحة: واتساب ونموذج تواصل"],
        shots: [{ slug: "utility-vision", n: 1 }, { slug: "future-axis", n: 1 }, { slug: "alhayat-web", n: 3 }] as ShotRef[],
      },
      {
        no: "02",
        title: "Company Profile",
        lead: "يخليك تقدّم شركتك بشكل واضح ومرتّب في أي اجتماع أو عرض.",
        points: ["محتوى مكتوب يعرّف بشركتك وخدماتها", "تصميم على هوية شركتك", "ملف جاهز للطباعة وللإرسال"],
        shots: [{ slug: "connect-profile", n: 1 }, { slug: "tdh-profile", n: 4 }, { slug: "alamein-profile", n: 1 }] as ShotRef[],
      },
      {
        no: "03",
        title: "حسابات السوشيال ميديا",
        lead: "نجهّزها لك عشان يكون ظهور شركتك متناسق من أول يوم.",
        points: ["صورة وغلاف ونبذة بشكل متناسق", "هوية بصرية واحدة على منصّاتك"],
        shots: [{ slug: "amlak-revamp", n: 1 }, { slug: "amlak-social", n: 4 }, { slug: "royal-consultant", n: 4 }] as ShotRef[],
      },
      {
        no: "04",
        title: "10 تصاميم جاهزة للنشر",
        lead: "عشان ما تبدأ وحساباتك فاضية.",
        points: ["مصمّمة على هوية شركتك", "جاهزة للنشر مباشرة"],
        shots: [{ slug: "amlak-social", n: 8 }, { slug: "amlak-revamp", n: 6 }, { slug: "royal-consultant", n: 7 }] as ShotRef[],
      },
      {
        no: "05",
        title: "فيديو Motion تعريفي",
        lead: "يشرح شركتك وخدماتها بطريقة مختصرة وجذابة.",
        points: ["مبني على نشاطك وخدماتك", "يصلح للموقع والسوشيال والعروض"],
        shots: [] as ShotRef[],
      },
    ],
  },

  videos: {
    offer: { tab: "فيديو العرض", note: "إعلان هذا العرض — من تصميم فريق دَعمة." },
    intro: { tab: "تعرّف على دَعمة", note: "الفيديو التعريفي لدَعمة — من نحن في أقل من دقيقتين." },
    play: "شغّل الفيديو",
    sample: "أمثلة من فيديوهات Motion التي نصنعها",
  },

  showcase: {
    label: "أعمالنا",
    title: ["شغل حقيقي،", "لشركات حقيقية."],
    intro: "هذا نفس المستوى اللي يوصلك في الباقة. اضغط على أي تصميم لتشاهده بالحجم الكامل.",
    wall: [
      "utility-vision",
      "connect-profile",
      "basmat-alomran",
      "amlak-revamp",
      "future-axis",
      "tdh-profile",
      "building-line",
      "corpenta",
      "alhayat-web",
      "alamein-profile",
      "amlak",
      "greenmark",
      "profitmax-web",
      "trustech-profile",
      "alhayat-brand",
      "eco-vista",
    ],
    tabs: [
      {
        key: "web",
        label: "مواقع إلكترونية",
        shots: [
          { slug: "utility-vision", n: 1 },
          { slug: "utility-vision", n: 3 },
          { slug: "future-axis", n: 1 },
          { slug: "future-axis", n: 4 },
          { slug: "alhayat-web", n: 3 },
          { slug: "alhayat-web", n: 6 },
          { slug: "profitmax-web", n: 1 },
          { slug: "profitmax-web", n: 7 },
          { slug: "vibrant-design", n: 3 },
        ] as ShotRef[],
      },
      {
        key: "profile",
        label: "ملفات تعريفية",
        shots: [
          { slug: "connect-profile", n: 1 },
          { slug: "connect-profile", n: 8 },
          { slug: "alamein-profile", n: 1 },
          { slug: "alamein-profile", n: 8 },
          { slug: "tdh-profile", n: 1 },
          { slug: "tdh-profile", n: 6 },
          { slug: "trustech-profile", n: 1 },
          { slug: "profitmax-profile", n: 1 },
          { slug: "profitmax-profile", n: 4 },
        ] as ShotRef[],
      },
      {
        key: "brand",
        label: "هويات بصرية",
        shots: [
          { slug: "basmat-alomran" },
          { slug: "building-line" },
          { slug: "alhayat-brand", n: 6 },
          { slug: "alhayat-brand", n: 8 },
          { slug: "amlak" },
          { slug: "profitmax-brand", n: 1 },
          { slug: "expert-estate" },
          { slug: "sedra" },
        ] as ShotRef[],
      },
      {
        key: "social",
        label: "سوشيال ميديا",
        shots: [
          { slug: "amlak-revamp", n: 1 },
          { slug: "amlak-social", n: 4 },
          { slug: "corpenta" },
          { slug: "royal-consultant", n: 4 },
          { slug: "amlak-revamp", n: 3 },
          { slug: "greenmark" },
          { slug: "amlak-social", n: 7 },
          { slug: "eco-vista" },
          { slug: "royal-consultant", n: 7 },
        ] as ShotRef[],
      },
    ],
  },

  steps: {
    label: "كيف نعمل",
    title: ["من أول تواصل،", "إلى التسليم خلال 14 يوم عمل."],
    list: [
      { no: "01", title: "تحجز مكانك", desc: "تعبّئ النموذج أو تراسلنا على واتساب، ونتواصل معك لتأكيد الحجز." },
      { no: "02", title: "نفهم نشاطك", desc: "ندرس شركتك وخدماتك وجمهورك والسوق اللي تعمل فيه قبل أي تصميم." },
      { no: "03", title: "نصمّم وننفّذ", desc: "نبني العناصر الخمسة على هوية شركتك، ونراجعها معك." },
      { no: "04", title: "تستلم جاهز", desc: "تستلم الموقع والملف والحسابات والتصاميم والفيديو — جاهزة للاستخدام." },
    ],
  },

  about: {
    label: "من نحن",
    title: ["دَعمة للحلول الرقمية،", "منذ 2018."],
    body: "نعمل مع شركات في السعودية والخليج ومصر وأوروبا. لا نبدأ من التنفيذ: نفهم مشروعك، نحلّل سوقك، وندرك كيف يفكّر عميلك — ثم نحوّل ذلك إلى حضور رقمي يعبّر عنك.",
    watch: "شاهد الفيديو التعريفي لدَعمة",
  },

  faqLabel: "أسئلة شائعة",
  faqTitle: ["قبل أن تحجز."],
  faq: [
    {
      q: ar("ماذا تشمل باقة اليوم الوطني؟"),
      a: ar(
        "خمسة عناصر: موقع إلكتروني يعرّف بشركتك وخدماتها، وCompany Profile لاجتماعاتك وعروضك، وتجهيز حسابات السوشيال ميديا، و10 تصاميم جاهزة للنشر، وفيديو Motion تعريفي — كلها بـ 5,000 ريال.",
      ),
    },
    {
      q: ar("متى أستلم؟"),
      a: ar("خلال 14 يوم عمل. نبدأ بفهم نشاطك وجمهورك، ثم نصمّم وننفّذ، ونسلّمك العناصر كلها جاهزة للاستخدام."),
    },
    {
      q: ar("هل التصاميم خاصة بشركتي أم قوالب جاهزة؟"),
      a: ar("خاصة بشركتك. قبل أن نبدأ نفهم نشاطك وجمهورك والسوق الذي تعمل فيه، ونبني كل عنصر على هويتك."),
    },
    {
      q: ar("متى ينتهي العرض؟"),
      a: ar("العرض متاح خلال فترة اليوم الوطني، ولعدد محدود من الشركات. احجز مكانك الآن ونتواصل معك لتأكيد الحجز."),
    },
    {
      q: ar("كيف أحجز مكاني؟"),
      a: ar("عبّئ النموذج في هذه الصفحة أو راسلنا على واتساب مباشرة، ونتواصل معك لنفهم احتياجك ونبدأ."),
    },
    {
      q: ar("هل تعملون مع شركات في السعودية؟"),
      a: ar("نعم، نخدم شركات في السعودية والخليج منذ 2019، والاجتماعات تُجدوَل على توقيتك. وتجد بعض أعمالنا في السوق السعودي في هذه الصفحة."),
    },
  ] as { q: Bi; a: Bi }[],

  closing: {
    label: "احجز الآن",
    title: ["الأساس الرقمي لشركتك،", "بـ 5,000 ريال فقط."],
  },

  sticky: { label: "الباقة كاملة", cta: "احجز مكانك", whatsapp: "واتساب" },
};
