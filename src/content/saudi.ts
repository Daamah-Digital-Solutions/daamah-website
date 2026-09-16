import type { Bi } from "../i18n";
import type { FaqItem } from "./faq";

/**
 * الطبقة السعودية — صفحة لكل (خدمة × مدينة).
 *
 * من يبحث من الرياض عن «شركة تصميم مواقع» يرى نتائج تذكر الرياض.
 * صفحةٌ لا تقول اسم المدينة لا تظهر له مهما كانت جيّدة.
 *
 * لكن الصفحة التي تكرّر النصّ نفسه ويتبدّل فيها اسم المدينة هي
 * «صفحة بوّابة» (doorway page) — مخالفة صريحة تُسقط الموقع كلّه لا
 * الصفحة وحدها. لذلك كل حقل هنا مكتوب لهذه المدينة ولهذه الخدمة:
 * مشكلات عملائها هي مشكلاتهم فعلًا، وأسئلتها أسئلتهم.
 *
 * وحارس البناء في `vite.config.ts` يرفض وصفين متطابقين، فالتكرار
 * يُكشف عند البناء لا بعد شهر من الفهرسة.
 *
 * الإثبات لا يُكتب هنا: الأعمال تُشتقّ من `work.ts` بمرشّح
 * `markets: "sa"`، وآراء العملاء من `testimonials.ts`. مصدر واحد
 * فلا يتناقض ما تقوله الصفحة مع ما يعرضه الموقع.
 */

export type CityKey = "riyadh" | "jeddah";

/** الخدمات التي لنا فيها ما نقوله محليًا — لا كل الخدمات. */
export type CityServiceSlug = "web-development" | "branding" | "digital-marketing" | "seo";

export const cities: { key: CityKey; name: Bi; inCity: Bi; blurb: Bi }[] = [
  {
    key: "riyadh",
    name: { ar: "الرياض", en: "Riyadh" },
    /* الصيغة المجرورة تُستعمل داخل الجُمل: «في الرياض» */
    inCity: { ar: "في الرياض", en: "in Riyadh" },
    blurb: {
      ar: "مقرّات الشركات الكبرى والجهات شبه الحكومية. القرار فيها لجنة لا شخص، والمنافسة على الظهور أعلى ما تكون في المملكة.",
      en: "Head offices and semi-government entities. Decisions are made by committees rather than individuals, and visibility is more contested here than anywhere else in the Kingdom.",
    },
  },
  {
    key: "jeddah",
    name: { ar: "جدة", en: "Jeddah" },
    inCity: { ar: "في جدة", en: "in Jeddah" },
    blurb: {
      ar: "مدينة تجارة وموانئ وضيافة. بيوت تجارية عريقة تنتقل إلى الرقمي، وقطاع تجزئة ومطاعم يعيش على الموسم.",
      en: "A city of trade, ports, and hospitality. Long-established merchant families moving online, and a retail and food scene that lives by the season.",
    },
  },
];

export const cityMeta = (key: CityKey) => cities.find((c) => c.key === key)!;

export type CityPage = {
  service: CityServiceSlug;
  city: CityKey;
  title: Bi;
  description: Bi;
  h1: Bi<string[]>;
  /** لا يقلّ عن 400 حرف — الحارس في البناء يرفض ما دونه */
  intro: Bi;
  painPoints: { title: Bi; body: Bi }[];
  approach: Bi[];
  faq: FaqItem[];
};

export const cityPages: CityPage[] = [
  /* ─────────── الرياض × المواقع ─────────── */
  {
    service: "web-development",
    city: "riyadh",
    title: {
      ar: "تصميم وتطوير مواقع الشركات في الرياض",
      en: "Company website design and development in Riyadh",
    },
    description: {
      ar: "مواقع شركات في الرياض تصمد أمام لجنة مشتريات: عربية أولًا، سريعة على الجوال، وفيها ما تسأل عنه الجهات قبل التعاقد. نعمل مع عملاء سعوديين منذ 2019.",
      en: "Company websites in Riyadh built to survive a procurement committee: Arabic-first, fast on mobile, and carrying what entities ask for before contracting.",
    },
    h1: {
      ar: ["موقع شركتك في الرياض", "يُقرأ قبل أن يُقيَّم."],
      en: ["Your Riyadh company site,", "read before it's judged."],
    },
    intro: {
      ar: "في الرياض لا يفتح موقعك عميلٌ واحد بل لجنة: مسؤول مشتريات يبحث عن السجل التجاري والعنوان الوطني، ومهندس يقرأ المشاريع السابقة، ومدير يريد أن يعرف من أنتم في دقيقة. الموقع الذي يخدم واحدًا منهم ويُهمل الباقين يُستبعد قبل أن يصل إلى مرحلة السعر. نبني الموقع على هذا الترتيب: صفحة تعريف تجيب سؤال «من أنتم» بلا التفاف، ومشاريع مفصّلة بأرقامها وقطاعاتها لا صورًا بلا سياق، وملف تعريفي جاهز للتحميل لأن كثيرًا من الجهات تطلبه ملفًا لا رابطًا، وبيانات تواصل ظاهرة في كل صفحة. والعربية هي اللغة الأولى لا ترجمةً للإنجليزية — النصّ المترجم آليًا يُقرأ فورًا على أنه كذلك، وهو أول ما يُفقد الثقة.",
      en: "In Riyadh your website is not opened by one person but by a committee: a procurement officer looking for the commercial registration and national address, an engineer reading past projects, and a manager who wants to know who you are inside a minute. A site that serves one of them and neglects the rest is set aside before price is ever discussed. We build in that order: an about page that answers \"who are you\" without circling, projects detailed with their numbers and sectors rather than pictures without context, a downloadable company profile because many entities want a file rather than a link, and contact details visible on every page. Arabic comes first, not as a translation of English — machine-translated text reads as exactly that, and it is the first thing to cost you trust.",
    },
    painPoints: [
      {
        title: {
          ar: "الموقع لا يجيب أسئلة المشتريات",
          en: "The site doesn't answer procurement's questions",
        },
        body: {
          ar: "السجل التجاري، والعنوان الوطني، وسنوات الخبرة، وقطاعات العمل — أسئلة تُطرح في كل تأهيل، والبحث عنها في موقع لا يذكرها ينتهي بإغلاق التبويب.",
          en: "Commercial registration, national address, years in business, sectors served — asked at every qualification stage. Hunting for them on a site that doesn't state them ends with a closed tab.",
        },
      },
      {
        title: { ar: "معرض أعمال بلا أرقام", en: "A portfolio without numbers" },
        body: {
          ar: "صور مشاريع بلا حجم ولا مدّة ولا نتيجة لا تفرّق بين من نفّذ مشروعًا بمليون ومن نفّذه بعشرة. المشتري المحترف يقرأ الأرقام أولًا.",
          en: "Project photos with no scale, duration, or outcome don't distinguish a one-million project from a ten-million one. A professional buyer reads the numbers first.",
        },
      },
      {
        title: { ar: "بطء على شبكة الجوال", en: "Slow on mobile networks" },
        body: {
          ar: "أغلب الفتح الأول يحدث من الجوال بين اجتماعين. موقع يحتاج خمس ثوانٍ ليعرض أول سطر يخسر الزائر قبل أن يعرف ماذا تقدّم.",
          en: "Most first visits happen on a phone between meetings. A site that needs five seconds to show its first line loses the visitor before they learn what you do.",
        },
      },
    ],
    approach: [
      {
        ar: "نبدأ بترتيب الأسئلة التي يطرحها مشتريك الفعلي، ونبني بنية الصفحات عليها.",
        en: "We start from the questions your actual buyer asks, and build the page structure on them.",
      },
      {
        ar: "المحتوى العربي يُكتب كتابةً، والإنجليزية تُبنى عليه لا العكس.",
        en: "Arabic content is written as Arabic; English is built from it, not the reverse.",
      },
      {
        ar: "الموقع يُسلَّم مهيّأً تقنيًا للفهرسة ومربوطًا بأدوات القياس، والدومين والاستضافة باسمك.",
        en: "The site ships indexable and wired to analytics, with domain and hosting in your name.",
      },
    ],
    faq: [
      {
        q: {
          ar: "هل تتعاملون مع شركات تعمل مع جهات حكومية؟",
          en: "Do you work with companies that serve government entities?",
        },
        a: {
          ar: "نعم. نبني الموقع بحيث يعرض ما تطلبه ملفات التأهيل عادةً: السجل، والخبرات، والمشاريع بقطاعاتها، وملف تعريفي قابلًا للتحميل. لا نتقدّم بالمناقصات نيابةً عنك، لكننا نجهّز ما يُرفَق بها.",
          en: "Yes. We build the site to show what qualification files usually ask for: registration, experience, projects with their sectors, and a downloadable profile. We don't bid on your behalf, but we prepare what gets attached.",
        },
      },
      {
        q: {
          ar: "كيف تتم الاجتماعات والمتابعة؟",
          en: "How do meetings and follow-up work?",
        },
        a: {
          ar: "على توقيت الرياض. اجتماع بداية، ثم مراجعة مكتوبة عند كل مرحلة، ثم تسليم وتدريب مسجّل. عملنا بهذه الطريقة مع شركات سعودية منذ 2019، والتعاقد والدفع يتمّان بالتحويل البنكي أو عبر منصّات الدفع المعتادة.",
          en: "On Riyadh time. A kickoff meeting, written review at each stage, then handover with a recorded training session. We've worked this way with Saudi companies since 2019; contracting and payment go by bank transfer or the usual payment platforms.",
        },
      },
      {
        q: { ar: "كم يستغرق موقع شركة؟", en: "How long does a company site take?" },
        a: {
          ar: "من ثلاثة إلى خمسة أسابيع حسب عدد الصفحات وجاهزية المحتوى. أكبر سبب للتأخير ليس التطوير بل انتظار النصوص والصور، ولهذا نتّفق على جدول تسليم المحتوى قبل أن نبدأ.",
          en: "Three to five weeks depending on page count and content readiness. The biggest cause of delay isn't development but waiting on text and images, which is why we agree a content schedule before starting.",
        },
      },
    ],
  },

  /* ─────────── جدة × المواقع ─────────── */
  {
    service: "web-development",
    city: "jeddah",
    title: {
      ar: "تصميم مواقع ومتاجر إلكترونية في جدة",
      en: "Websites and online stores in Jeddah",
    },
    description: {
      ar: "مواقع ومتاجر إلكترونية لشركات جدة: كتالوج يُتصفَّح من الجوال، طلب عبر واتساب، ومحتوى عربي يبيع. خبرة مع عملاء سعوديين منذ 2019.",
      en: "Websites and stores for Jeddah businesses: a catalogue that browses on a phone, ordering over WhatsApp, and Arabic content that sells.",
    },
    h1: {
      ar: ["متجرك في جدة", "يبيع من الجوال."],
      en: ["Your Jeddah store,", "selling from a phone."],
    },
    intro: {
      ar: "تجارة جدة تبدأ من الجوال وتنتهي في الواتساب. العميل يرى منتجًا في إنستجرام، يفتح الموقع ليتأكّد من السعر والمقاس والتوصيل، ثم يسأل عن التفاصيل في محادثة. أي انقطاع في هذه السلسلة يُنهي البيع: صورة بلا سعر، أو صفحة تحتاج تكبيرًا لتُقرأ، أو زرّ طلب يفتح نموذجًا طويلًا بدل محادثة. نبني الموقع على هذا السلوك لا ضدّه — كتالوج يُتصفَّح بإبهام واحد، وسعر وتوفّر ظاهران في البطاقة نفسها، وطلب ينتقل إلى واتساب برسالة تحمل اسم المنتج فلا يبدأ البائع من الصفر. ولمن يبيع فعلًا لا يعرض فقط: ربط ببوابة دفع سعودية، وصفحات سياسات يطلبها المشتري ويطلبها التسجيل في «معروف»، ومحتوى منتجات مكتوب بالعربية يظهر في البحث بدل أن يبقى داخل الصور.",
      en: "Trade in Jeddah starts on a phone and ends in WhatsApp. A customer sees a product on Instagram, opens the site to check price, size, and delivery, then asks the details in a chat. Any break in that chain ends the sale: an image with no price, a page that needs pinching to read, or an order button that opens a long form instead of a conversation. We build for that behaviour rather than against it — a catalogue you can browse with one thumb, price and availability on the card itself, and an order that moves to WhatsApp carrying the product name so the seller doesn't start from nothing. And for those actually selling rather than only showing: a Saudi payment gateway, the policy pages buyers expect and Maroof registration requires, and Arabic product content that appears in search instead of staying locked inside images.",
    },
    painPoints: [
      {
        title: { ar: "الكتالوج داخل الصور", en: "The catalogue lives inside images" },
        body: {
          ar: "أسماء المنتجات وأسعارها مكتوبة داخل صور التصميم، فلا يقرؤها جوجل ولا تظهر في البحث. المتجر موجود لمن يعرفه فقط.",
          en: "Product names and prices are baked into design images, so Google can't read them and they never surface in search. The store exists only for those who already know it.",
        },
      },
      {
        title: { ar: "الطلب يتوقّف عند النموذج", en: "The order stalls at the form" },
        body: {
          ar: "مشتري جدة يفضّل المحادثة على النموذج. زرّ «أرسل طلبك» الذي يفتح عشرة حقول يخسر أكثر مما يجمع.",
          en: "A Jeddah buyer prefers a conversation to a form. A \"submit your order\" button that opens ten fields loses more than it collects.",
        },
      },
      {
        title: { ar: "لا توصيل ولا سياسة إرجاع", en: "No delivery or returns policy" },
        body: {
          ar: "أول سؤالين قبل الشراء: متى يوصل، وماذا لو لم يناسبني. غيابهما عن الموقع يحوّل كل عملية بيع إلى محادثة تبدأ بالشكّ.",
          en: "The first two questions before buying: when does it arrive, and what if it doesn't suit me. Their absence turns every sale into a conversation that starts in doubt.",
        },
      },
    ],
    approach: [
      {
        ar: "المنتج نصٌّ لا صورة: اسم وسعر ووصف يقرؤها البحث.",
        en: "A product is text, not an image: name, price, and description that search can read.",
      },
      {
        ar: "الطلب ينتقل إلى واتساب برسالة جاهزة تحمل تفاصيل المنتج.",
        en: "Ordering moves to WhatsApp with a prepared message carrying the product details.",
      },
      {
        ar: "صفحات التوصيل والإرجاع والسياسات تُكتب من البداية لا تُضاف عند أول مشكلة.",
        en: "Delivery, returns, and policy pages are written from the start, not added at the first dispute.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تربطون بوابات دفع سعودية؟", en: "Do you connect Saudi payment gateways?" },
        a: {
          ar: "نعم، ونربط ما يناسب حجمك: مدى وآبل باي عبر مزوّد محلي، أو منصّة متجر جاهزة إن كان العدد صغيرًا. الحساب البنكي والاتفاق مع المزوّد يبقيان باسمك أنت.",
          en: "Yes, matched to your size: Mada and Apple Pay through a local provider, or a ready store platform if volumes are small. The bank account and the provider agreement stay in your name.",
        },
      },
      {
        q: {
          ar: "عندي حساب إنستجرام فقط — هل أحتاج موقعًا؟",
          en: "I only have Instagram — do I need a site?",
        },
        a: {
          ar: "إنستجرام يجلب من يعرفك، والموقع يجلب من يبحث عن منتجك ولا يعرفك. الفرق أن المنشور يختفي بعد أيام بينما صفحة المنتج تبقى تجلب طلبات لسنوات. وإن كان نشاطك صغيرًا نبدأ بصفحة واحدة تُظهر المنتجات والأسعار والتواصل، وتكبر لاحقًا.",
          en: "Instagram brings people who already know you; a site brings people searching for your product who don't. A post disappears in days, while a product page keeps pulling orders for years. If the business is small we start with one page showing products, prices, and contact, and grow it later.",
        },
      },
      {
        q: { ar: "هل تساعدون في التسجيل بمعروف؟", en: "Do you help with Maroof registration?" },
        a: {
          ar: "نجهّز ما تحتاجه الصفحة من سياسات وبيانات تواصل واضحة، ونرشدك إلى خطوات التسجيل. التسجيل نفسه يتمّ باسمك ومن حسابك.",
          en: "We prepare what the site needs — policies and clear contact details — and walk you through the steps. The registration itself is done in your name from your account.",
        },
      },
    ],
  },

  /* ─────────── الرياض × الهوية ─────────── */
  {
    service: "branding",
    city: "riyadh",
    title: { ar: "تصميم هوية بصرية لشركات الرياض", en: "Brand identity for Riyadh companies" },
    description: {
      ar: "هوية بصرية لشركات الرياض تُقرأ مؤسّسيةً لا ناشئة: لوجو عربي-إنجليزي متّزن، ودليل استخدام، وملف تعريفي جاهز للتأهيل.",
      en: "Brand identity for Riyadh companies that reads established, not new: a balanced Arabic–English mark, a usage guide, and a profile for qualification files.",
    },
    h1: {
      ar: ["هوية تُقرأ", "بحجم شركتك."],
      en: ["An identity that reads", "at your company's size."],
    },
    intro: {
      ar: "في سوق الرياض تُقاس الشركة بمظهرها قبل أن تُقاس بعملها، لأن أول لقاء غالبًا ورقة: عرض في اجتماع، أو ملف مرفق بطلب تأهيل، أو لوحة في معرض. الهوية التي تبدو ناشئة تجعل شركةً عمرها عشر سنوات تُعامَل كأنها في سنتها الأولى، وذلك فرق حقيقي في السعر الذي يُعرض عليك. نبني الهوية لتحمل هذا الوزن: علامة تشتغل بالعربية والإنجليزية بوزن بصري واحد — لا لوجو لاتيني أُلحقت به كلمة عربية — ونظام لون وخطّ يصمد على ورق المطبوعات كما يصمد على الشاشة، ودليل استخدام يمنع الانحراف حين يتولّى غيرنا التنفيذ لاحقًا. ثم ملف تعريفي مبنيّ على النظام نفسه، لأنه المستند الذي يُرسل فعلًا حين يُطلب منك أن تعرّف بنفسك.",
      en: "In the Riyadh market a company is measured by how it looks before it is measured by what it does, because the first encounter is usually a document: a deck in a meeting, a file attached to a qualification request, a stand at an exhibition. An identity that looks like a startup's gets a ten-year-old company treated as if it were in its first year — and that is a real difference in the price you're offered. We build the identity to carry that weight: a mark that works in Arabic and English at one visual weight — not a Latin logo with an Arabic word bolted on — a colour and type system that holds on print as well as on screen, and a usage guide that prevents drift when someone else executes later. Then a company profile built on the same system, because that is the document actually sent when you're asked to introduce yourself.",
    },
    painPoints: [
      {
        title: { ar: "لوجو عربي مُلحق", en: "An Arabic logo bolted on" },
        body: {
          ar: "علامة صُمّمت باللاتينية ثم أُضيف نصّها العربي لاحقًا تبدو غير متّزنة في كل تطبيق عربي — وهو أغلب ما يُطبع في الرياض.",
          en: "A mark designed in Latin with Arabic added afterwards looks unbalanced in every Arabic application — which is most of what gets printed in Riyadh.",
        },
      },
      {
        title: { ar: "لا دليل استخدام", en: "No usage guide" },
        body: {
          ar: "بلا قواعد مكتوبة يتغيّر اللون والخطّ مع كل مصمّم يتعاقب على الحساب، فتفقد العلامة تراكمها خلال سنة.",
          en: "Without written rules, colour and type drift with every designer who touches the account, and the brand loses a year of accumulated recognition.",
        },
      },
      {
        title: { ar: "ملف تعريفي لا يشبه العلامة", en: "A profile that doesn't match the brand" },
        body: {
          ar: "الملف الذي يُرسل مع طلبات التأهيل غالبًا مصمَّم في وقت آخر وبألوان أخرى، فيبدو كأنه لشركة ثانية.",
          en: "The file sent with qualification requests was usually designed at another time in other colours, and reads as though it belongs to a different company.",
        },
      },
    ],
    approach: [
      {
        ar: "نبدأ ببحث في قطاعك ومنافسيك في السوق السعودي قبل أول قرار بصري.",
        en: "We start with research into your sector and Saudi competitors before the first visual decision.",
      },
      {
        ar: "العربية والإنجليزية تُصمَّمان معًا لا تباعًا، فيتّزن الوزن البصري في الاثنتين.",
        en: "Arabic and Latin are designed together rather than in sequence, so both carry the same visual weight.",
      },
      {
        ar: "دليل استخدام يشرح التطبيق، فتبقى العلامة متّسقة مهما تعدّد من ينفّذها.",
        en: "A usage guide that explains application, so the brand stays consistent however many people execute it.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تسجّلون العلامة في «سِـدايا» أو الهيئة؟", en: "Do you register the trademark?" },
        a: {
          ar: "لا نقوم بالتسجيل نيابةً عنك، لكننا نسلّم الملفات بالمواصفات التي تطلبها الهيئة السعودية للملكية الفكرية ونرشدك إلى الخطوات.",
          en: "We don't file on your behalf, but we deliver files in the formats the Saudi Authority for Intellectual Property requires and walk you through the steps.",
        },
      },
      {
        q: { ar: "عندنا هوية قديمة — نطوّرها أم نبدأ من جديد؟", en: "We have an old identity — evolve or restart?" },
        a: {
          ar: "نرى أولًا ما الذي يعرفه عملاؤك عنك بصريًا. إن كان في العلامة عنصر متراكم يستحق البقاء طوّرناه وحافظنا على التعرّف، وإن كانت العلامة لا تحمل شيئًا قلنا ذلك صراحةً قبل أن نبدأ.",
          en: "First we look at what your customers already recognise. If there's an accumulated element worth keeping, we evolve it and preserve recognition; if the mark carries nothing, we say so plainly before starting.",
        },
      },
      {
        q: { ar: "كم تستغرق الهوية الكاملة؟", en: "How long does a full identity take?" },
        a: {
          ar: "من أسبوعين إلى ثلاثة للهوية، وأسبوع إضافي للملف التعريفي. تصلك اتجاهات مختلفة فعلًا لا تنويعات على فكرة واحدة، ثم نطوّر ما تختاره حتى يكتمل.",
          en: "Two to three weeks for the identity, and a further week for the company profile. You see genuinely different directions rather than variations on one idea, then we develop the one you pick.",
        },
      },
    ],
  },

  /* ─────────── جدة × الهوية ─────────── */
  {
    service: "branding",
    city: "jeddah",
    title: { ar: "تصميم هوية بصرية للعلامات في جدة", en: "Brand identity for Jeddah brands" },
    description: {
      ar: "هوية بصرية لمتاجر ومطاعم وبيوت تجارية في جدة: علامة تعمل على اللافتة والعبوة والشاشة معًا، بدليل استخدام واضح.",
      en: "Brand identity for Jeddah retailers, restaurants, and merchant houses: a mark that works on signage, packaging, and screen alike — with a clear usage guide.",
    },
    h1: {
      ar: ["علامة تُعرَف", "من على الرفّ."],
      en: ["A brand recognised", "from across the shelf."],
    },
    intro: {
      ar: "علامة في جدة تُختبر في أماكن لا تُختبر فيها علامة مكتبية: لافتة تُقرأ من سيارة تمرّ، وعبوة تُلتقط من رفّ بين عشر عبوات، وصورة مربّعة في إنستجرام يراها الناس بحجم إبهام. الشعار الذي يبدو أنيقًا على شاشة المصمّم قد ينهار في هذه المواضع الثلاثة — يدقّ خطّه فيختفي على اللافتة، أو يزدحم تفصيله فيتحوّل إلى بقعة في الصورة الصغيرة. نصمّم من هذه النهايات إلى الوراء: نختبر العلامة صغيرةً وبلون واحد قبل أن نراها كبيرة وملوّنة، ونبني نظامًا يبقى متماسكًا حين ينفّذه صانع لافتات أو مطبعة عبوات لا مصمّم. وللبيوت التجارية العريقة سؤال إضافي: كم من الإرث نُبقي؟ نجيب عنه بالبحث في ما يعرفه زبونك فعلًا لا بما يُعجب الجيل الجديد في الإدارة.",
      en: "A brand in Jeddah is tested in places an office brand never is: signage read from a passing car, packaging picked off a shelf among ten others, and a square image on Instagram seen at thumbnail size. A logo that looks elegant on the designer's screen can collapse in all three — its strokes too fine to survive on a sign, its detail too busy to be anything but a smudge when small. We design backwards from those endings: testing the mark small and in one colour before seeing it large and coloured, and building a system that holds when a sign maker or a packaging printer executes it rather than a designer. Long-established merchant houses carry one more question: how much of the heritage stays? We answer it by researching what your customer actually recognises, not what the newer generation in management happens to like.",
    },
    painPoints: [
      {
        title: { ar: "لوجو ينهار صغيرًا", en: "A logo that collapses when small" },
        body: {
          ar: "خطوط رفيعة وتفاصيل كثيرة تختفي على اللافتة وفي صورة الملف الشخصي — وهما أكثر موضعين يراك فيهما الناس.",
          en: "Fine strokes and busy detail vanish on signage and in a profile picture — the two places people see you most.",
        },
      },
      {
        title: { ar: "لون لا يُطبع كما يظهر", en: "Colour that doesn't print as it looks" },
        body: {
          ar: "لون اختير على الشاشة بلا مقابل مطبوع يخرج من مطبعة العبوات مختلفًا، فتبدو المنتجات كأنها من دفعتين.",
          en: "A colour chosen on screen with no print equivalent comes back different from the packaging printer, and products look like two separate batches.",
        },
      },
      {
        title: { ar: "الإرث يُرمى أو يُتمسَّك به كاملًا", en: "Heritage either dropped or kept whole" },
        body: {
          ar: "بيت تجاري يمسح تاريخه كلّه يخسر من يعرفه، ومن يُبقي كل شيء يبقى قديمًا. القرار يحتاج بحثًا لا ذوقًا.",
          en: "A merchant house that erases its history loses the people who knew it; one that keeps everything stays dated. That decision needs research, not taste.",
        },
      },
    ],
    approach: [
      {
        ar: "نختبر العلامة صغيرةً وبلون واحد أولًا — إن نجحت هناك نجحت في كل مكان.",
        en: "We test the mark small and in one colour first — if it works there it works everywhere.",
      },
      {
        ar: "لكل لون مقابله المطبوع، فما تراه على الشاشة هو ما يخرج من المطبعة.",
        en: "Every colour has a print equivalent, so what you see on screen is what leaves the press.",
      },
      {
        ar: "الدليل يشرح التطبيق على اللافتة والعبوة والسوشيال، لا على الورق الرسمي وحده.",
        en: "The guide covers signage, packaging, and social — not just letterhead.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تصمّمون العبوات واللافتات؟", en: "Do you design packaging and signage?" },
        a: {
          ar: "نصمّم النظام وتطبيقاته الأساسية بما فيها العبوة واللافتة بمقاساتها، ونسلّم الملفات جاهزةً للمطبعة أو لصانع اللافتات. التنفيذ نفسه يتمّ عندك محليًا لأنه يحتاج قياسًا على الموقع.",
          en: "We design the system and its core applications including packaging and signage at real sizes, and hand over files ready for the printer or sign maker. Production itself happens locally with you, since it needs on-site measurement.",
        },
      },
      {
        q: { ar: "عندنا اسم عائلة في العلامة — كيف تتعاملون معه؟", en: "Our brand carries a family name — how do you handle it?" },
        a: {
          ar: "اسم العائلة أصل لا عبء: هو ما يعرفه زبونك ويثق به. نحافظ عليه ونعيد بناء ما حوله — الخطّ ونظام اللون والتطبيق — فيبقى التعرّف ويتجدّد المظهر.",
          en: "A family name is an asset, not a burden: it's what your customer knows and trusts. We keep it and rebuild what surrounds it — type, colour system, application — so recognition stays while the look moves on.",
        },
      },
    ],
  },

  /* ─────────── الرياض × التسويق الرقمي ─────────── */
  {
    service: "digital-marketing",
    city: "riyadh",
    title: { ar: "التسويق الرقمي للشركات في الرياض", en: "Digital marketing for Riyadh companies" },
    description: {
      ar: "تسويق رقمي لشركات B2B في الرياض: حملات تُقاس بالطلبات المؤهّلة لا بالمشاهدات، وتقرير شهري يربط الإنفاق بالنتيجة.",
      en: "B2B digital marketing in Riyadh: campaigns measured in qualified enquiries rather than impressions, with a monthly report tying spend to outcome.",
    },
    h1: {
      ar: ["حملات تُقاس", "بالطلبات لا بالمشاهدات."],
      en: ["Campaigns measured", "in enquiries, not views."],
    },
    intro: {
      ar: "البيع للشركات في الرياض دورة طويلة: من يبحث اليوم قد يوقّع بعد ثلاثة أشهر، والقرار يمرّ على أكثر من شخص. الحملة التي تُقاس بالمشاهدات في هذا السياق تقيس شيئًا لا علاقة له بالإيراد، ويمكن أن تبدو ناجحة تمامًا بينما لا يصل طلب واحد جادّ. نبني القياس أولًا: ما الذي نعدّه طلبًا مؤهّلًا، وكم يكلّف، ومن أين جاء — ثم نبني الحملات على هذا التعريف. البحث في جوجل يلتقط من يبحث عن حلّ الآن، ولينكدإن يصل إلى من يقرّر ولو لم يبحث بعد، والسوشيال يبني المعرفة التي تجعل اسمك مألوفًا حين يأتي وقت القرار. ونفصل الإنفاق الإعلاني عن أتعاب الإدارة في كل عرض وكل تقرير، فتعرف كم وصل إلى المنصّة وكم بقي عندنا.",
      en: "Selling to companies in Riyadh is a long cycle: someone searching today may sign three months out, and the decision passes through more than one person. A campaign measured in impressions here measures something unrelated to revenue, and can look entirely successful while not a single serious enquiry arrives. So we build the measurement first: what counts as a qualified enquiry, what it costs, and where it came from — then build campaigns on that definition. Google Search catches people looking for a solution now; LinkedIn reaches the people who decide even before they search; social builds the familiarity that makes your name recognisable when the decision comes. We separate ad spend from management fees in every quote and every report, so you know how much reached the platform and how much stayed with us.",
    },
    painPoints: [
      {
        title: { ar: "تقرير بلا رقم يهمّ", en: "A report with no number that matters" },
        body: {
          ar: "مشاهدات ووصول وتفاعل ترتفع كلها بينما لا يتغيّر عدد الطلبات. الأرقام صحيحة لكنها لا تقيس ما تدفع من أجله.",
          en: "Impressions, reach, and engagement all climb while the number of enquiries doesn't move. The figures are true but they don't measure what you're paying for.",
        },
      },
      {
        title: { ar: "الإنفاق والإدارة في رقم واحد", en: "Spend and management in one number" },
        body: {
          ar: "«خمسة آلاف شهريًا» بلا فصل تعني أنك لا تعرف كم وصل فعلًا إلى جوجل، ولا تستطيع مقارنة عرض بآخر.",
          en: "\"Five thousand a month\" with no split means you don't know how much actually reached Google, and can't compare one quote against another.",
        },
      },
      {
        title: { ar: "طلبات كثيرة غير مؤهّلة", en: "Plenty of unqualified enquiries" },
        body: {
          ar: "استهداف واسع يجلب عددًا كبيرًا يبدو جيدًا في التقرير ويستهلك وقت فريق المبيعات بلا عقد واحد.",
          en: "Broad targeting brings volume that looks good in a report and burns the sales team's time without a single contract.",
        },
      },
    ],
    approach: [
      {
        ar: "نتّفق على تعريف الطلب المؤهّل وتكلفته المستهدفة قبل أن نصرف ريالًا.",
        en: "We agree what a qualified enquiry is, and its target cost, before spending anything.",
      },
      {
        ar: "نختبر الرسائل والجماهير على دفعات صغيرة، ثم نوسّع ما يجلب طلبات مؤهّلة.",
        en: "We test messages and audiences in small batches, then scale what brings qualified enquiries.",
      },
      {
        ar: "التقرير الشهري يفصل الإنفاق عن الأتعاب ويقول ما لم ينجح كما يقول ما نجح.",
        en: "The monthly report separates spend from fees, and says what didn't work as plainly as what did.",
      },
    ],
    faq: [
      {
        q: { ar: "ما أقل ميزانية إعلانية معقولة؟", en: "What's a sensible minimum ad budget?" },
        a: {
          ar: "لا رقم واحد يصلح للجميع: الحدّ يتغيّر بالقطاع وبالمنافسة على الكلمة نفسها. والقاعدة ثابتة — الميزانية تكفي حين تجمع بيانات تسمح بالتحسين، وأقلّ من ذلك دفعٌ بلا تعلّم. نحدّدها لحالتك في جلسة النطاق، وأتعاب الإدارة تُحسب منفصلةً عن الإنفاق الإعلاني.",
          en: "No single figure fits everyone: the floor moves with the sector and with how contested the keyword is. The rule holds either way — a budget is enough when it gathers data you can optimise on, and below that you pay without learning. We set it for your case in the scoping call, and management is billed separately from the spend.",
        },
      },
      {
        q: { ar: "متى أرى أول نتيجة؟", en: "When do I see the first result?" },
        a: {
          ar: "الحملات المدفوعة تجلب أول طلبات خلال أسابيع، لكن أول شهر يُقرأ كاختبار لا كحكم: نتعلّم منه أي الكلمات والجماهير تستحق. الحكم العادل بعد ثلاثة أشهر.",
          en: "Paid campaigns bring first enquiries within weeks, but month one reads as a test rather than a verdict: it tells us which keywords and audiences deserve budget. A fair judgement comes at three months.",
        },
      },
      {
        q: { ar: "هل تديرون حسابات منافسين في نفس القطاع؟", en: "Do you manage competitors in the same sector?" },
        a: {
          ar: "نخبرك صراحةً إن كان لدينا عميل ينافسك مباشرةً في نفس المدينة والخدمة، ونترك القرار لك. لا نعمل على حسابين متنافسين بنفس الفريق.",
          en: "We tell you plainly if we have a client competing directly with you in the same city and service, and leave the decision to you. We don't run two competing accounts with the same team.",
        },
      },
    ],
  },

  /* ─────────── جدة × التسويق الرقمي ─────────── */
  {
    service: "digital-marketing",
    city: "jeddah",
    title: { ar: "التسويق الرقمي للمتاجر والمطاعم في جدة", en: "Digital marketing for Jeddah retail and food" },
    description: {
      ar: "تسويق رقمي لتجزئة ومطاعم جدة: حملات تتبع الموسم، ومحتوى بلهجة جمهورك، وقياس يصل إلى الطلب لا إلى الإعجاب.",
      en: "Digital marketing for Jeddah retail and restaurants: campaigns that follow the season, content in your audience's voice, and measurement that reaches the order.",
    },
    h1: {
      ar: ["حملات تعرف", "موسمها."],
      en: ["Campaigns that know", "their season."],
    },
    intro: {
      ar: "تجارة جدة موسمية بطبعها: رمضان يقلب ساعات الشراء رأسًا على عقب، والصيف يفرغ المدينة ويملؤها بزوّار آخرين، ومواسم العمرة تجلب جمهورًا لا يعرف المدينة ويبحث بالعربية وبلغات أخرى. الحملة التي تُدار بنفس الرسالة وبنفس الميزانية طوال السنة تدفع في الأوقات التي لا يشتري فيها أحد، وتنفد ميزانيتها في الأسبوع الذي كان يمكن أن يعوّض الشهر كلّه. نبني التقويم أولًا: متى يرتفع الطلب في قطاعك، وما الرسالة التي تناسب كل موسم، وأين ينفَق أكثر ومتى يُخفَّض. ثم نبني القياس حتى الطلب نفسه — لا حتى الإعجاب: أي منشور جلب محادثة واتساب، وأي إعلان جلب زيارة للفرع، وكم كلّف الطلب الواحد. والمحتوى يُكتب بالنبرة التي يتكلّم بها جمهورك فعلًا؛ نقرّر ذلك في مرحلة الاستراتيجية لا في منتصف التنفيذ.",
      en: "Jeddah's trade is seasonal by nature: Ramadan turns buying hours upside down, summer empties the city and fills it with different visitors, and Umrah seasons bring an audience that doesn't know the city and searches in Arabic and other languages. A campaign run with the same message and the same budget all year pays during the weeks nobody buys, and runs out of budget in the one week that could have covered the month. So we build the calendar first: when demand rises in your category, what message fits each season, where to spend more and when to pull back. Then we build measurement all the way to the order rather than to the like: which post produced a WhatsApp conversation, which ad produced a branch visit, and what a single order cost. Content is written in the voice your audience actually uses; that's decided at the strategy stage, not mid-production.",
    },
    painPoints: [
      {
        title: { ar: "ميزانية ثابتة في سوق موسمي", en: "A flat budget in a seasonal market" },
        body: {
          ar: "الإنفاق نفسه في رمضان وفي أهدأ أسبوع من السنة يعني دفعًا زائدًا حين لا أحد يشتري، ونقصًا حين يشتري الجميع.",
          en: "The same spend in Ramadan and in the quietest week of the year means overpaying when nobody buys and underspending when everyone does.",
        },
      },
      {
        title: { ar: "القياس يتوقّف عند الإعجاب", en: "Measurement stops at the like" },
        body: {
          ar: "المنشور الذي يجمع تفاعلًا كبيرًا وصفرَ محادثات ليس ناجحًا. بلا ربط بين الإعلان والطلب لا تعرف أيّ نصف ميزانيتك يعمل.",
          en: "A post with strong engagement and zero conversations isn't a success. Without a link between ad and order, you can't tell which half of the budget works.",
        },
      },
      {
        title: { ar: "محتوى بنبرة غريبة", en: "Content in a borrowed voice" },
        body: {
          ar: "نصّ مترجم أو فصحى ثقيلة في حساب مطعم أو متجر يُقرأ كإعلان شركة كبيرة، ويبعد الجمهور الذي يتكلّم بغير ذلك.",
          en: "Translated text or heavy formal Arabic on a restaurant or shop account reads like a corporate notice, and pushes away an audience that doesn't speak that way.",
        },
      },
    ],
    approach: [
      {
        ar: "نبني تقويمًا موسميًا لقطاعك ونوزّع الميزانية عليه بدل توزيعها بالتساوي.",
        en: "We build a seasonal calendar for your category and weight the budget to it rather than spreading it evenly.",
      },
      {
        ar: "القياس يصل إلى محادثة الواتساب والطلب، لا إلى التفاعل.",
        en: "Measurement runs through to the WhatsApp conversation and the order, not to engagement.",
      },
      {
        ar: "النبرة تُحسم في الاستراتيجية: فصحى مبسّطة أو لهجة، بحسب جمهورك لا بحسب الكاتب.",
        en: "Voice is settled at the strategy stage — simplified formal Arabic or dialect — by your audience, not the writer.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تديرون سناب شات وتيك توك؟", en: "Do you run Snapchat and TikTok?" },
        a: {
          ar: "ندير المنصّات التي يوجد فيها جمهورك فعلًا. في التجزئة والمطاعم بجدة يكون ذلك عادةً إنستجرام وتيك توك وسناب شات، ونقرّر بعد النظر في بيانات حسابك الحالي لا بافتراض.",
          en: "We run the platforms your audience is actually on. For Jeddah retail and food that's usually Instagram, TikTok, and Snapchat — decided by looking at your existing account data rather than assuming.",
        },
      },
      {
        q: { ar: "هل تصوّرون المحتوى؟", en: "Do you shoot the content?" },
        a: {
          ar: "نضع الخطة والسيناريوهات ونوجّه التصوير، والتصوير نفسه يتمّ محليًا لديك أو مع مصوّر في جدة نتّفق عليه — الحضور في الفرع شرط لمحتوى يبدو حقيقيًا.",
          en: "We plan and script and direct, while the shoot itself happens locally with you or a Jeddah videographer we agree on — being in the branch is what makes content look real.",
        },
      },
      {
        q: { ar: "كيف أعرف أن الإعلان جلب زبونًا للفرع؟", en: "How do I know an ad brought someone to the branch?" },
        a: {
          ar: "نستعمل روابط موسومة وأرقام واتساب مخصّصة للحملة وأكواد خصم لكل قناة، فيصل كل طلب ومعه مصدره. القياس ليس كاملًا في العالم الحقيقي، لكنه يكفي لمعرفة أي قناة تستحق.",
          en: "Tagged links, campaign-specific WhatsApp numbers, and a discount code per channel, so every order arrives with its source attached. Offline measurement is never perfect, but it's enough to tell which channel earns its budget.",
        },
      },
    ],
  },

  /* ─────────── الرياض × السيو ─────────── */
  {
    service: "seo",
    city: "riyadh",
    title: { ar: "خدمات السيو وتحسين محركات البحث في الرياض", en: "SEO services in Riyadh" },
    description: {
      ar: "سيو لشركات الرياض: تدقيق تقني، وبحث كلمات عربية حقيقي، ومحتوى يُنشر بانتظام. بلا وعود بالمركز الأول ولا تقارير بلا رقم.",
      en: "SEO for Riyadh companies: a technical audit, real Arabic keyword research, and content published consistently. No promises of page one, no empty reports.",
    },
    h1: {
      ar: ["أن يجدك", "من يبحث عنك."],
      en: ["Being found", "by the people searching."],
    },
    intro: {
      ar: "المنافسة على عبارات مثل «شركة مقاولات الرياض» أو «مكتب استشارات هندسية» عالية، ومن يتصدّرها اليوم يفعل ذلك بمحتوى تراكم على سنوات لا بحيلة تقنية. لكن أمام هذه العبارات المزدحمة تقف عشرات العبارات الأطول التي يكتبها المشتري الجادّ — عن التكلفة، والمدّة، والفرق بين خيارين، والمتطلبات النظامية — وأغلبها بلا إجابة عربية جيّدة في نتائج البحث. هذه هي مساحتنا. نبدأ بتدقيق تقني يزيل ما يمنع الفهرسة أصلًا، ثم ببحث كلمات مبنيّ على كيف يكتب السعودي فعلًا: بلا همزات أحيانًا، وبلهجة أحيانًا، وبمصطلح إنجليزي داخل جملة عربية أحيانًا — وهي صيغ لا تظهر في الأدوات الإنجليزية ولا في قائمة مترجَمة. ثم خطة محتوى شهرية تجيب سؤالًا حقيقيًا في كل مقال، وتقرير يقول ما تحرّك وما لم يتحرّك.",
      en: "Competition for phrases like \"contracting company Riyadh\" or \"engineering consultancy\" is high, and whoever leads them today does so on content accumulated over years rather than a technical trick. But standing in front of those crowded phrases are dozens of longer ones a serious buyer types — about cost, duration, the difference between two options, regulatory requirements — and most have no good Arabic answer in the results. That is our space. We start with a technical audit that removes whatever blocks indexing at all, then keyword research built on how Saudis actually type: sometimes without hamzas, sometimes in dialect, sometimes with an English term inside an Arabic sentence — forms that appear in no English tool and no translated list. Then a monthly content plan that answers one real question per article, and a report that says what moved and what didn't.",
    },
    painPoints: [
      {
        title: { ar: "الموقع لا يُقرأ بلا جافاسكربت", en: "The site can't be read without JavaScript" },
        body: {
          ar: "كثير من المواقع الحديثة تصل إلى الزاحف بصفحة فارغة، فلا يُفهرس نصّها مهما كان جيّدًا. يُكشف ذلك في التدقيق التقني أولًا.",
          en: "Many modern sites reach the crawler as an empty page, so their text is never indexed however good it is. The technical audit finds this first.",
        },
      },
      {
        title: { ar: "كلمات مترجمة لا كلمات مبحوثة", en: "Translated keywords, not researched ones" },
        body: {
          ar: "قائمة إنجليزية مترجمة إلى العربية تُنتج عبارات سليمة نحويًا لا يكتبها أحد في مربّع البحث.",
          en: "An English list translated into Arabic produces grammatically correct phrases that nobody types into a search box.",
        },
      },
      {
        title: { ar: "صفحة واحدة لكل النيّات", en: "One page for every intent" },
        body: {
          ar: "صفحة تحاول أن تخدم من يسأل عن السعر ومن يريد التعاقد معًا لا تُرضي أيًّا منهما، ولا ترتّبها جوجل لأيٍّ منهما.",
          en: "A page trying to serve both the price question and the hiring decision satisfies neither, and Google ranks it for neither.",
        },
      },
    ],
    approach: [
      {
        ar: "تدقيق تقني أولًا: ما لا يُفهرس لا يُرتَّب مهما أُنفق عليه.",
        en: "Technical audit first: what isn't indexed can't rank, whatever is spent on it.",
      },
      {
        ar: "الكلمات من ثلاثة مصادر: اقتراحات جوجل، وSearch Console بعد شهرين، وأسئلة عملائك الفعلية.",
        en: "Keywords from three sources: Google's own suggestions, Search Console after two months, and the questions your clients actually ask.",
      },
      {
        ar: "صفحة لكل نيّة بحث، ومقال شهري يجيب سؤالًا واحدًا إجابةً كاملة.",
        en: "A page per search intent, and a monthly article that answers one question completely.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تضمنون المركز الأول؟", en: "Do you guarantee the top spot?" },
        a: {
          ar: "لا، ولا يستطيع أحد — جوجل نفسه يقول ذلك. ما نضمنه هو العمل: تدقيق، وخطة كلمات، ومحتوى منشور، وتقرير شهري صريح. من يضمن لك ترتيبًا يبيعك وهمًا أو يستهدف عبارات لا ينافس عليها أحد.",
          en: "No, and nobody can — Google says so itself. What we guarantee is the work: an audit, a keyword plan, published content, and a frank monthly report. Anyone guaranteeing a rank is selling a fiction, or targeting phrases nobody competes for.",
        },
      },
      {
        q: { ar: "متى أرى نتائج؟", en: "When do I see results?" },
        a: {
          ar: "الإصلاحات التقنية يظهر أثرها خلال أسابيع. الترتيب على العبارات التي تجلب عملاء يحتاج عادةً من أربعة إلى تسعة أشهر من نشر منتظم، والمدّة تطول كلّما زادت المنافسة على العبارة.",
          en: "Technical fixes show within weeks. Ranking for phrases that bring clients usually takes four to nine months of consistent publishing, and longer the more contested the phrase.",
        },
      },
      {
        q: { ar: "هل تكتبون المحتوى أم نكتبه نحن؟", en: "Do you write the content or do we?" },
        a: {
          ar: "نكتبه، بالعربية كتابةً لا ترجمة، ونعرضه عليك قبل النشر. وإن كان لديكم خبير في المجال نأخذ منه المادة الفنية في مقابلة قصيرة ونحوّلها إلى مقال — وهو ما يُنتج أفضل محتوى عادةً.",
          en: "We write it — Arabic written as Arabic, not translated — and you review before publishing. If you have an in-house expert we take the technical substance in a short interview and turn it into an article, which usually produces the best content.",
        },
      },
    ],
  },

  /* ─────────── جدة × السيو ─────────── */
  {
    service: "seo",
    city: "jeddah",
    title: { ar: "خدمات السيو وتحسين الظهور المحلي في جدة", en: "SEO and local visibility in Jeddah" },
    description: {
      ar: "سيو محلي لأنشطة جدة: الظهور في خرائط جوجل وعبارات «قريب مني»، وصفحات فروع، ومحتوى موسمي يلتقط الطلب في وقته.",
      en: "Local SEO for Jeddah businesses: showing up in Maps and \"near me\" searches, branch pages, and seasonal content that catches demand when it happens.",
    },
    h1: {
      ar: ["أن تظهر", "لمن هو قريب."],
      en: ["Showing up", "for whoever's nearby."],
    },
    intro: {
      ar: "أغلب البحث التجاري في جدة محلّي ومستعجل: «مطعم قريب مني»، «محل قطع غيار حي السلامة»، «صيانة مكيفات جدة» — ومن يبحث هكذا يقرّر خلال دقائق ولا يفتح الصفحة الثانية. المعركة هنا ليست على ترتيب الموقع وحده بل على البطاقة التي تظهر في الخريطة: اكتمال بياناتها، وصحّة ساعات عملها، وعدد تقييماتها وحداثتها، والصور التي تُظهر المكان فعلًا. نبدأ من هناك لأنه أسرع أثرًا، ثم نبني صفحة لكل فرع بمحتواها الخاص — لا نسخة واحدة يتبدّل فيها اسم الحي، فتلك تتنافس مع نفسها ولا ترتّبها جوجل. ثم نضيف الطبقة الموسمية: عبارات رمضان والصيف والعمرة ترتفع في أسابيع محدّدة، والمحتوى الذي يُنشر قبلها بشهر يلتقط الموجة، والذي يُنشر أثناءها يصل متأخّرًا.",
      en: "Most commercial search in Jeddah is local and urgent: \"restaurant near me\", \"spare parts shop Al Salamah\", \"AC maintenance Jeddah\" — and whoever searches that way decides within minutes and never opens page two. The contest here isn't only your site's rank but the card that appears on the map: how complete its details are, whether its hours are right, how many reviews it has and how recent, and whether the photos show the actual place. We start there because it moves fastest, then build a page per branch with its own content — not one template with the district name swapped, which competes with itself and ranks for nothing. Then the seasonal layer: Ramadan, summer, and Umrah phrases spike in specific weeks, and content published a month ahead catches the wave while content published during it arrives late.",
    },
    painPoints: [
      {
        title: { ar: "بطاقة الخريطة ناقصة", en: "An incomplete map listing" },
        body: {
          ar: "ساعات عمل قديمة، أو صور مأخوذة قبل التجديد، أو تصنيف نشاط خاطئ — كلّها تُنزل ترتيبك في الخريطة قبل أن يبدأ الموقع دوره.",
          en: "Stale opening hours, photos from before the refit, or the wrong business category — each pushes you down the map before the website even plays its part.",
        },
      },
      {
        title: { ar: "صفحة واحدة لعدّة فروع", en: "One page for several branches" },
        body: {
          ar: "قائمة عناوين في صفحة «اتصل بنا» لا ترتّب أي فرع. من يبحث عن حيّه لا يجدك رغم أن لك فرعًا فيه.",
          en: "A list of addresses on a contact page ranks no branch at all. Someone searching their district doesn't find you, even though you have a branch there.",
        },
      },
      {
        title: { ar: "المحتوى الموسمي متأخّر", en: "Seasonal content arrives late" },
        body: {
          ar: "صفحة عروض رمضان تُنشر في أول رمضان تحتاج أسابيع لتُفهرس وترتّب — أي أنها تجهز بعد أن ينتهي الموسم.",
          en: "A Ramadan offers page published on the first day of Ramadan needs weeks to index and rank — it's ready after the season ends.",
        },
      },
    ],
    approach: [
      {
        ar: "نبدأ ببطاقة النشاط على خرائط جوجل: بيانات مكتملة وصور حقيقية وتصنيف صحيح.",
        en: "We start with the Google Business Profile: complete details, real photos, the right category.",
      },
      {
        ar: "صفحة لكل فرع بمحتوى خاصّ بحيّه وخدماته، لا نسخة يتبدّل فيها الاسم.",
        en: "A page per branch with content specific to its district and services, not a template with the name swapped.",
      },
      {
        ar: "التقويم الموسمي يُبنى بحيث يُنشر المحتوى قبل الموسم بوقت يكفي لفهرسته.",
        en: "The seasonal calendar publishes content early enough before the season to be indexed in time.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تديرون بطاقة النشاط على خرائط جوجل؟", en: "Do you manage the Google Business Profile?" },
        a: {
          ar: "نضبطها ونحسّنها: التصنيف، والخدمات، وساعات العمل، والصور، والأسئلة الشائعة. الملكية تبقى بحسابك أنت، ونعمل عليها بصلاحية مدير.",
          en: "We set it up and improve it: category, services, hours, photos, and Q&A. Ownership stays on your account; we work with manager access.",
        },
      },
      {
        q: { ar: "كيف نحصل على تقييمات أكثر؟", en: "How do we get more reviews?" },
        a: {
          ar: "برابط طلب تقييم يُرسل بعد الخدمة مباشرةً، ورد منتظم على كل تقييم بما فيه السلبي. لا نشتري تقييمات ولا نكتبها — جوجل يكشفها، والعقوبة أثقل من الفائدة.",
          en: "A review link sent right after the service, and a consistent reply to every review including the negative ones. We don't buy or write reviews — Google detects them, and the penalty outweighs the gain.",
        },
      },
      {
        q: { ar: "عندي فرعان فقط — هل يستحق؟", en: "I only have two branches — is it worth it?" },
        a: {
          ar: "نعم، ولعلّه أوضح عائد في السيو المحلي: بطاقتان مضبوطتان وصفحتا فرع مكتوبتان جيدًا تلتقطان بحثًا مستعجلًا لا ينافس عليه غيرك في حيّك بالضرورة.",
          en: "Yes — it's often the clearest return in local SEO: two well-kept listings and two properly written branch pages catch urgent searches that may have little competition in your district.",
        },
      },
    ],
  },
];

/** صفحة (خدمة × مدينة) بعينها. */
export const findCityPage = (service: string, city: string) =>
  cityPages.find((p) => p.service === service && p.city === city);

/** المدن التي لهذه الخدمة صفحةٌ فيها — منها تُبنى الروابط الداخلية. */
export const citiesForService = (service: string): CityKey[] =>
  cityPages.filter((p) => p.service === service).map((p) => p.city);

/* ── صفحة «خدماتنا في السعودية» ── */
export const saudiHub = {
  label: { ar: "السعودية", en: "Saudi Arabia" } as Bi,
  title: {
    ar: ["نعمل مع شركات سعودية", "منذ 2019."],
    en: ["Working with Saudi companies", "since 2019."],
  } as Bi<string[]>,
  intro: {
    ar: "شركة عالمية أغلب عملائها في السعودية. نعمل بمواعيد على توقيت الرياض: اجتماع بداية، ومراجعة مكتوبة عند كل مرحلة، ومتابعة بعد التسليم. هذه الصفحة تجمع ما نقدّمه للسوق السعودي وأين نعرف تفاصيله.",
    en: "A global company with most of its clients in Saudi Arabia. We schedule on Riyadh time: a kickoff meeting, written review at every stage, and follow-up after handover. This page gathers what we do for the Saudi market and where we know its details.",
  } as Bi,
  trustLabel: { ar: "ما يمكن الاعتماد عليه", en: "What you can rely on" } as Bi,
  trust: [
    {
      title: { ar: "بتوقيت الرياض", en: "On Riyadh time" } as Bi,
      body: {
        ar: "الاجتماعات والردود داخل يوم عملك، من الأحد إلى الخميس.",
        en: "Meetings and replies inside your working day, Sunday to Thursday.",
      } as Bi,
    },
    {
      title: { ar: "الملكية لك", en: "You own it" } as Bi,
      body: {
        ar: "الدومين والاستضافة باسمك من اليوم الأول.",
        en: "Domain and hosting are in your name from day one.",
      } as Bi,
    },
    {
      title: { ar: "عربية مكتوبة", en: "Arabic written, not translated" } as Bi,
      body: {
        ar: "كل نصّ عربي يُكتب أصلًا. المترجم آليًا يُقرأ فورًا على أنه كذلك.",
        en: "Every Arabic text is written as Arabic. Machine translation reads as exactly that.",
      } as Bi,
    },
    {
      title: { ar: "أرقام لا وعود", en: "Numbers, not promises" } as Bi,
      body: {
        ar: "نقول المدّة المتوقّعة والتكلفة قبل البدء، ونقول ما لم ينجح في التقرير.",
        en: "We state expected timelines and costs before starting, and say what didn't work in the report.",
      } as Bi,
    },
  ],
  servicesLabel: { ar: "خدماتنا في السعودية", en: "What we do in Saudi Arabia" } as Bi,
  citiesLabel: { ar: "أين نعمل", en: "Where we work" } as Bi,
  workLabel: { ar: "أعمال في السوق السعودي", en: "Work in the Saudi market" } as Bi,
  ctaLines: {
    ar: ["احكِ لنا عن", "مشروعك في السعودية."],
    en: ["Tell us about", "your Saudi project."],
  } as Bi<string[]>,
};

/* ── نصوص مشتركة لصفحات (خدمة × مدينة) ── */
export const cityUi = {
  painLabel: { ar: "ما نراه يتكرّر", en: "What we see repeatedly" } as Bi,
  approachLabel: { ar: "كيف نعالجه", en: "How we handle it" } as Bi,
  workLabel: { ar: "من أعمالنا في السعودية", en: "From our Saudi work" } as Bi,
  faqLabel: { ar: "أسئلة متكررة", en: "Common questions" } as Bi,
  otherCities: { ar: "نفس الخدمة في مدن أخرى", en: "The same service elsewhere" } as Bi,
  serviceLink: { ar: "تفاصيل الخدمة كاملة", en: "Full service details" } as Bi,
  cta: { ar: "اطلب عرض سعر", en: "Request a quote" } as Bi,
};
