import type { Bi } from "../i18n";

/**
 * صفحة الأسئلة عن دَعمة — مجموعات، لا قائمة واحدة طويلة.
 *
 * كل إجابة هنا مستندة إلى ما يقوله الموقع في مكانه: الأسواق من
 * الفوتر، وزمن الرد من صفحة التواصل، والملكية والدفع من أسئلة
 * الخدمات. لا مُدَد عامة ولا أسعار: كلاهما يُحدَّد لكل مشروع.
 *
 * يقرأها `faqItemsFor("/faq")` مسطّحةً، فيطابق `FAQPage` ما يُعرض.
 */

type Item = { q: Bi; a: Bi };

export const faqPath = "/faq";

export const faqPage = {
  label: { ar: "الأسئلة الشائعة", en: "FAQ" } as Bi,
  title: {
    ar: ["كل ما تسأل عنه", "قبل أن تبدأ معنا."],
    en: ["Everything you'd ask", "before working with us."],
  } as Bi<string[]>,
  intro: {
    ar: "من نحن، وكيف نعمل، وكيف تُسعَّر المشاريع، ومن يملك ماذا بعد التسليم — إجابات مباشرة عن الأسئلة التي تصلنا أكثر من غيرها.",
    en: "Who we are, how we work, how projects are priced, and who owns what after handover — straight answers to the questions we're asked most.",
  } as Bi,
  description: {
    ar: "إجابات مباشرة عن دَعمة: من نحن وأين نعمل، وكيف يبدأ المشروع ويسير، والأسعار والدفع، والملكية، وما بعد التسليم.",
    en: "Straight answers about Daamah: who we are and where we work, how a project starts and runs, pricing and payment, ownership, and what happens after handover.",
  } as Bi,
  groupsLabel: { ar: "المحاور", en: "Topics" } as Bi,
  questions: { ar: "سؤال", en: "questions" } as Bi,
  askTitle: { ar: "لم تجد سؤالك؟", en: "Didn't find your question?" } as Bi,
  askBody: {
    ar: "اسألنا مباشرة على واتساب. عادةً نرد خلال يوم عمل واحد.",
    en: "Ask us directly on WhatsApp. We usually reply within one business day.",
  } as Bi,
  askCta: { ar: "اسأل على واتساب", en: "Ask on WhatsApp" } as Bi,
  ctaLines: {
    ar: ["عرفت ما تحتاج معرفته؟", "لنبدأ الحديث."],
    en: ["Got what you needed?", "Let's start talking."],
  } as Bi<string[]>,
};

export const faqGroups: { key: string; label: Bi; items: Item[] }[] = [
  {
    key: "about",
    label: { ar: "عن دَعمة", en: "About Daamah" },
    items: [
      {
        q: { ar: "ما هي دَعمة؟", en: "What is Daamah?" },
        a: {
          ar: "دَعمة للحلول الرقمية شركة تبني الحضور الرقمي للشركات منذ 2018: الهوية البصرية والملف التعريفي، والمواقع الإلكترونية، والسيو والسوشيال ميديا والإعلانات، وأنظمة إدارة العملاء. نتعامل معها كأجزاء مترابطة لا خدمات منفصلة، لأن جزءًا واحدًا ضعيفًا يُضعف النتيجة كلّها.",
          en: "Daamah Digital Solutions has been building companies' digital presence since 2018: brand identity and company profiles, websites, SEO, social media and advertising, and client management systems. We treat them as connected parts rather than separate services, because one weak part drags the whole result down.",
        },
      },
      {
        q: { ar: "في أي دول تعملون؟", en: "Which countries do you work in?" },
        a: {
          ar: "نخدم شركات في السعودية والإمارات ودول الخليج ومصر وأوروبا، ونُجدوِل الاجتماعات على توقيتك أنت لا توقيتنا.",
          en: "We serve companies in Saudi Arabia, the UAE, the wider Gulf, Egypt and Europe, and schedule meetings in your time zone, not ours.",
        },
      },
      {
        q: { ar: "في أي قطاعات عملتم؟", en: "Which sectors have you worked in?" },
        a: {
          ar: "أكثر من 150 مشروعًا في أكثر من 10 قطاعات، منها المقاولات، والعقارات والاستثمار، والتأمين والمال، والصناعة والطاقة، والتعليم، والتجارة الإلكترونية، والأغذية، والصحّة. ويمكنك تصفية أعمالنا بحسب القطاع لترى ما يشبه مجالك.",
          en: "More than 150 projects across more than 10 sectors, including construction, real estate and investment, insurance and finance, industry and energy, education, e-commerce, food and health. You can filter our work by sector to see what's close to yours.",
        },
      },
      {
        q: { ar: "أين أرى أعمالكم السابقة؟", en: "Where can I see your past work?" },
        a: {
          ar: "في صفحة أعمالنا: مشاريع حقيقية بصورها الكاملة، وقصص عملاء عملنا معهم على أكثر من خدمة. ويمكنك أيضًا قراءة ملف دَعمة التعريفي كاملًا على الموقع.",
          en: "On our work page: real projects with their full image sets, and stories of clients we've worked with across several services. You can also read Daamah's own company profile in full on the site.",
        },
      },
      {
        q: { ar: "ما الذي يميّزكم عن غيركم؟", en: "What makes you different?" },
        a: {
          ar: "لا نبدأ من التنفيذ. نفهم شركتك وسوقك وكيف يفكّر عميلك قبل أول قرار، ونصمّم لنتيجة يمكن قياسها لا للإعجاب، ونبقى بعد الإطلاق نقرأ الأرقام ونحسّن.",
          en: "We don't start with execution. We understand your business, your market and how your client thinks before the first decision, design for a result you can measure rather than for applause, and stay after launch to read the numbers and improve.",
        },
      },
    ],
  },
  {
    key: "start",
    label: { ar: "البدء والعمل معنا", en: "Starting and working with us" },
    items: [
      {
        q: { ar: "كيف أبدأ معكم؟", en: "How do I get started?" },
        a: {
          ar: "راسلنا على واتساب أو من صفحة التواصل، واحكِ لنا أين أنت الآن وأين تريد أن تصل. الاستشارة الأولى مجانية وبدون التزام، ونرجع لك بخطة واضحة وسعر محدّد. عادةً نرد خلال يوم عمل واحد.",
          en: "Message us on WhatsApp or through the contact page and tell us where you are and where you want to be. The first consultation is free with no commitment, and we come back with a clear plan and a firm price. We usually reply within one business day.",
        },
      },
      {
        q: { ar: "هل يمكنني طلب خدمة واحدة فقط؟", en: "Can I ask for just one service?" },
        a: {
          ar: "نعم. يمكنك البدء بخدمة واحدة — هوية أو موقع مثلًا — والتوسّع حين تحتاج. وإن رأينا أن جزءًا آخر سيُضعف نتيجة ما تطلبه، نقول ذلك بوضوح قبل البدء.",
          en: "Yes. You can start with one service — an identity or a website, say — and expand when you need to. If we see another part that would weaken the result of what you're asking for, we'll say so clearly before we start.",
        },
      },
      {
        q: { ar: "كيف يسير المشروع بعد الاتفاق؟", en: "How does a project run once we agree?" },
        a: {
          ar: "خمس خطوات: الفهم والتحليل، ثم التخطيط الاستراتيجي، ثم التنفيذ، ثم الإطلاق، ثم المتابعة والتحسين. وعند كل مرحلة مراجعة مكتوبة تعرف منها أين وصلنا وما الخطوة التالية.",
          en: "Five steps: understanding and analysis, strategy, execution, launch, then follow-up and optimisation. Each stage comes with a written review, so you always know where we are and what comes next.",
        },
      },
      {
        q: { ar: "كم يستغرق المشروع؟", en: "How long does a project take?" },
        a: {
          ar: "يتحدّد بنطاق المشروع وحجم المحتوى، لذلك لا نعطي مدّة عامة قبل أن نفهم ما تحتاجه. بعد جلسة النطاق نضع جدولًا زمنيًا مكتوبًا يلتزم به الطرفان.",
          en: "It depends on the scope and the amount of content, so we don't quote a general duration before we understand what you need. After the scoping call we set a written timeline both sides commit to.",
        },
      },
      {
        q: { ar: "كيف نتواصل أثناء المشروع؟", en: "How do we communicate during the project?" },
        a: {
          ar: "عبر واتساب والبريد الإلكتروني، واجتماعات تُجدوَل على توقيتك. أوقات عملنا من الأحد إلى الخميس، من 9 صباحًا إلى 6 مساءً.",
          en: "Over WhatsApp and email, with meetings scheduled in your time zone. Our working hours are Sunday to Thursday, 9am to 6pm.",
        },
      },
      {
        q: { ar: "هل تعملون بالعربية والإنجليزية؟", en: "Do you work in Arabic and English?" },
        a: {
          ar: "نعم. نكتب ونصمّم بالعربية والإنجليزية، وحين يحتاج المشروع اللغتين تُبنى النسختان معًا من البداية، فلا تبدو إحداهما ترجمة مستعجلة للأخرى.",
          en: "Yes. We write and design in Arabic and English, and when a project needs both, the two versions are built together from the start so neither reads like a rushed translation of the other.",
        },
      },
      {
        q: { ar: "ماذا لو كان لديّ هوية أو موقع بالفعل؟", en: "What if I already have an identity or a website?" },
        a: {
          ar: "نشتغل على ما لديك كما هو، ونبني الجديد بما يتماشى معه. وإن احتاج شيء منه إلى تحديث، نقترح ما يلزم قبل أن نبدأ لا بعد.",
          en: "We work with what you have and build the new parts to match it. If something needs updating, we'll propose it before we start, not after.",
        },
      },
    ],
  },
  {
    key: "pricing",
    label: { ar: "الأسعار والدفع", en: "Pricing and payment" },
    items: [
      {
        q: { ar: "كم تكلّف خدماتكم؟", en: "How much do your services cost?" },
        a: {
          ar: "لا ننشر قائمة أسعار ثابتة، لأن نطاق كل مشروع مختلف: هوية لشركة ناشئة ليست كهوية لمجموعة شركات. بعد الاستشارة الأولى نرسل لك سعرًا محدّدًا ومكتوبًا بما يشمله بالتفصيل.",
          en: "We don't publish a fixed price list, because every project's scope is different: an identity for a start-up is not an identity for a group of companies. After the first consultation we send a firm, written price with everything it covers.",
        },
      },
      {
        q: { ar: "كيف تتم عملية الدفع؟", en: "How does payment work?" },
        a: {
          ar: "دفعة أولى عند بدء المشروع والباقي عند التسليم. لا رسوم مخفية — كل ما هو داخل النطاق موضّح قبل التوقيع.",
          en: "A deposit at kickoff and the balance on delivery. No hidden fees — everything in scope is documented before you sign.",
        },
      },
      {
        q: { ar: "ما طرق الدفع المتاحة؟", en: "Which payment methods do you accept?" },
        a: {
          ar: "التحويل البنكي، أو منصّات الدفع الدولية المعتادة. والتعاقد يتم قبل بدء العمل.",
          en: "Bank transfer, or the usual international payment platforms. The contract is signed before work begins.",
        },
      },
      {
        q: { ar: "هل الميزانية الإعلانية ضمن السعر؟", en: "Is the ad budget included in the price?" },
        a: {
          ar: "لا. الإنفاق الإعلاني يُدفع للمنصّات مباشرة، وأجر إدارة الحملات منفصل عنه، فترى إنفاقك كما هو. ونحدّد معك الميزانية المناسبة لسوقك في جلسة النطاق.",
          en: "No. Ad spend is paid to the platforms directly, and our campaign management fee is separate, so you see your spend exactly as it is. We set the right budget for your market with you in the scoping call.",
        },
      },
    ],
  },
  {
    key: "after",
    label: { ar: "الملكية وما بعد التسليم", en: "Ownership and after handover" },
    items: [
      {
        q: { ar: "من يملك الموقع والدومين؟", en: "Who owns the website and the domain?" },
        a: {
          ar: "أنت. نسجّل الدومين والاستضافة باسمك، فيبقى كل شيء معك لو انتهت الشراكة.",
          en: "You do. We register the domain and hosting in your name, so everything stays with you if the partnership ends.",
        },
      },
      {
        q: { ar: "هل تدرّبون فريقنا؟", en: "Do you train our team?" },
        a: {
          ar: "نعم. التسليم يشمل تدريبًا على ما سيستعمله فريقك بنفسه، مثل لوحة تحكّم الموقع أو نظام إدارة العملاء.",
          en: "Yes. Handover includes training on whatever your team will use themselves, such as the website's control panel or the client management system.",
        },
      },
      {
        q: { ar: "ماذا بعد التسليم؟", en: "What happens after handover?" },
        a: {
          ar: "نتابع معك بعد الإطلاق: نراقب الأداء ونقترح تحسينات. الشراكة المستمرة جزء أساسي من طريقة عملنا.",
          en: "We stay with you after launch, tracking performance and proposing improvements. Ongoing partnership is core to how we work.",
        },
      },
      {
        q: { ar: "هل تقدّمون خدمات شهرية مستمرة؟", en: "Do you offer ongoing monthly services?" },
        a: {
          ar: "نعم. السوشيال ميديا والسيو وإدارة الإعلانات وتسويق الأداء تُدار شهريًا، بخطة وتقرير كل شهر، ويمكن أن تبدأ بعد تسليم مشروع أو وحدها.",
          en: "Yes. Social media, SEO, ad management and performance marketing run monthly, with a plan and a report each month, either after a project is delivered or on their own.",
        },
      },
    ],
  },
];
