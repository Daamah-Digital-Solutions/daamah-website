import type { Bi } from "../i18n";

/**
 * الحلول — بديل صفحة الباقات.
 *
 * الباقات القديمة كانت مبنيّة على ما نبيعه (هوية / موقع / متكاملة).
 * وهي طريقة تُلزم العميل بأن يترجم وضعه إلى قائمة خدمات بنفسه، ثم
 * يقارن القوائم فيختار الأرخص — وهو قرار سعرٍ لا قرار حلّ.
 *
 * هنا الوحدة هي **الوضع** لا الخدمة. لكل حلّ وضعٌ يعرفه صاحب الشركة
 * عن نفسه فور قراءته، ثم يقرأ ماذا يتغيّر وماذا نبني ولماذا.
 *
 * ولا رقم في هذا الملف: السعر يُبنى على النطاق، والنطاق يُحدَّد في
 * جلسة. عرضه هنا يحوّل الصفحة إلى مقارنة أسعار.
 */

export type SolutionSlug = "foundation" | "presence" | "demand" | "operations";

export type Solution = {
  slug: SolutionSlug;
  no: string;
  /** اسم من كلمة واحدة — نتيجةٌ لا درجة في سلّم */
  name: Bi;
  /** الجملة التي يقولها صاحب الشركة عن نفسه — نصّ زرّ المُرشد */
  voice: Bi;
  /** لمن يصلح هذا الحلّ */
  fits: Bi;
  /** الوضع قبل العمل */
  situation: Bi;
  /** التحوّل: من ... إلى ... */
  shift: Bi;
  /** ما نبنيه — لا قائمة تحقّق ميكانيكية */
  builds: Bi[];
  /** ما يصير عليه الوضع بعد التنفيذ */
  outcome: Bi;
  /** متى تختاره — لجدول التوجيه */
  when: Bi;
};

export const solutions = {
  label: { ar: "الحلول", en: "Solutions" } as Bi,

  title: {
    ar: ["ابدأ من وضعك،", "لا من قائمة خدمات."],
    en: ["Start from where you are,", "not from a list of services."],
  } as Bi<string[]>,

  intro: {
    ar: "الشركة التي تُبنى من الصفر ليست كالشركة التي يتأخّر حضورها عن سمعتها، ولا كالتي تحتاج أن ينتظم عملها من الداخل. هذه أربعة أوضاع نراها متكرّرة في السوق، لكلٍّ منها حلّ مختلف — اقرأ الأقرب إلى وضعكم.",
    en: "A company being built from nothing is not the same as one whose presence lags behind its reputation, nor the same as one that needs its work organised internally. These are four situations we see repeatedly, each with a different answer — read the one closest to yours.",
  } as Bi,

  /* ── المُرشد ── */
  selector: {
    label: { ar: "أين تقفون اليوم", en: "Where you stand today" } as Bi,
    question: {
      ar: "أيّ هذه أقرب إلى وضعكم؟",
      en: "Which of these is closest to your situation?",
    } as Bi,
    hint: {
      ar: "اختر الجملة التي تصف حالكم، ننقلك إلى الحلّ الذي بُني لها.",
      en: "Pick the sentence that describes you; we'll take you to the solution built for it.",
    } as Bi,
  },

  /* ── تسميات الحقول داخل كل حلّ ── */
  fitsLabel: { ar: "لمن يصلح", en: "Who it fits" } as Bi,
  situationLabel: { ar: "الوضع الآن", en: "The situation now" } as Bi,
  shiftLabel: { ar: "ما يتغيّر", en: "What changes" } as Bi,
  buildsLabel: { ar: "ما نبنيه", en: "What we build" } as Bi,
  outcomeLabel: { ar: "النتيجة", en: "The outcome" } as Bi,

  cta: { ar: "اطلب نطاق عمل لهذا الحلّ", en: "Request a scope for this" } as Bi,

  items: [
    {
      slug: "foundation",
      no: "01",
      name: { ar: "الأساس", en: "Foundation" },
      voice: {
        ar: "شركتنا في بدايتها، ونريد أن نظهر باحتراف من أول يوم.",
        en: "We're early, and we want to look established from day one.",
      },
      fits: {
        ar: "شركات في سنتها الأولى أو الثانية، أو شركة قائمة بلا هوية موحّدة.",
        en: "Companies in their first or second year, or an established one with no coherent identity.",
      },
      situation: {
        ar: "لا يوجد شكل ثابت للشركة: كل عرض سعر بخطّ مختلف، وكل موظّف يرسل ملفًا صمّمه بنفسه. والعميل الأول يحكم عليكم من هذه التفاصيل قبل أن يسمع عرضكم.",
        en: "There is no fixed look: every quote uses a different typeface, and each employee sends a file they made themselves. Your first client judges you on those details before hearing the offer.",
      },
      shift: {
        ar: "من شركة تبدو مؤقّتة، إلى شركة تبدو مؤسَّسة — قبل أن تكبر فعلًا.",
        en: "From a company that looks provisional to one that looks established — before it actually grows.",
      },
      builds: [
        {
          ar: "هوية بصرية متكاملة، بدليل استخدام يمنع اجتهاد كل موظّف.",
          en: "A complete visual identity, with a usage guide that ends each employee improvising.",
        },
        {
          ar: "ملف تعريفي جاهز للتأهيل وعروض الأسعار.",
          en: "A company profile ready for qualification files and proposals.",
        },
        {
          ar: "موقع تعريفي يشرح ما تقدّمونه بوضوح، لا أكثر.",
          en: "A site that explains what you do clearly — and no more than that.",
        },
        {
          ar: "ملفات مفتوحة وحسابات مسجّلة باسم الشركة.",
          en: "Open source files and accounts registered in the company's name.",
        },
      ],
      outcome: {
        ar: "شكل واحد ثابت في كل مكان، وملفّ ترسلونه دون أن تعتذروا عنه.",
        en: "One consistent look everywhere, and a profile you send without apologising for it.",
      },
      when: {
        ar: "لا توجد هوية، أو توجد واحدة لا يلتزم بها أحد.",
        en: "There is no identity, or one nobody follows.",
      },
    },
    {
      slug: "presence",
      no: "02",
      name: { ar: "الحضور", en: "Presence" },
      voice: {
        ar: "شركتنا قائمة ولها سمعة، لكن حضورها الرقمي لا يعكس حجمها.",
        en: "We're established with a real reputation, but our digital presence doesn't show it.",
      },
      fits: {
        ar: "شركات لها سجلّ ومشاريع وسمعة، وما يظهر عنها على الإنترنت أقلّ من مستواها.",
        en: "Companies with a track record and a reputation, whose online presence sits below their level.",
      },
      situation: {
        ar: "السمعة تنتقل بالكلام بين العملاء، ثم يبحث العميل الجديد عن اسمكم فيجد موقعًا قديمًا أو حسابًا متوقّفًا منذ شهور. الفجوة بين الواقع والانطباع تكلّفكم صفقات لا تعرفون أنكم خسرتموها.",
        en: "Reputation travels by word of mouth, then a new client searches your name and finds a dated site or an account silent for months. The gap between the reality and the impression costs you deals you never knew you lost.",
      },
      shift: {
        ar: "من شركة قويّة على الأرض وضعيفة على الشاشة، إلى حضور يطابق حجمها.",
        en: "From strong on the ground and weak on screen, to a presence that matches the company.",
      },
      builds: [
        {
          ar: "تحديث الهوية أو إعادة بنائها على أساس السوق لا الذوق.",
          en: "Refreshing or rebuilding the identity from the market, not from taste.",
        },
        {
          ar: "موقع يعرض المشاريع والسجلّ بالشكل الذي يليق بها.",
          en: "A site that presents the projects and the record as they deserve.",
        },
        {
          ar: "ملف تعريفي محدّث يصلح للتأهيل والمناقصات.",
          en: "An updated profile fit for qualification and tenders.",
        },
        {
          ar: "حضور منتظم على السوشيال ميديا يثبت أن الشركة تعمل.",
          en: "A steady social presence that proves the company is working.",
        },
      ],
      outcome: {
        ar: "من يبحث عنكم يجد شركة بحجم سمعتها، لا أقلّ.",
        en: "Whoever searches for you finds a company the size of its reputation.",
      },
      when: {
        ar: "السمعة أكبر ممّا يظهر على الإنترنت.",
        en: "The reputation is bigger than what shows online.",
      },
    },
    {
      slug: "demand",
      no: "03",
      name: { ar: "الفرص", en: "Demand" },
      voice: {
        ar: "شكلنا جيّد، لكن الموقع والسوشيال لا يجلبان فرصًا.",
        en: "We look fine, but the site and social bring in nothing.",
      },
      fits: {
        ar: "شركات حضورها الرقمي مقبول شكلًا، لكنه لا يُنتج تواصلًا ولا طلبات.",
        en: "Companies whose presence looks acceptable but produces no enquiries.",
      },
      situation: {
        ar: "الموقع موجود والحسابات تنشر، ولا أحد يتصل. المحتوى يتكلّم عنكم بدل أن يتكلّم عن مشكلة العميل، والموقع يعرض ولا يطلب من الزائر خطوةً واحدة واضحة.",
        en: "The site exists and the accounts post, and nobody calls. The content talks about you instead of the client's problem, and the site displays without asking the visitor for one clear step.",
      },
      shift: {
        ar: "من حضور يُشاهَد، إلى حضور يُنتج فرصًا يمكن قياسها.",
        en: "From a presence that gets seen, to one that produces opportunities you can measure.",
      },
      builds: [
        {
          ar: "إعادة بناء الموقع حول خطوة واحدة يطلبها من الزائر.",
          en: "Rebuilding the site around a single step it asks the visitor to take.",
        },
        {
          ar: "محتوى سوشيال ميديا يخاطب المشتري لا الجمهور العام.",
          en: "Social content addressed to the buyer, not to a general audience.",
        },
        {
          ar: "صفحات مخصّصة لكل خدمة أو مدينة تستهدفونها.",
          en: "Dedicated pages for each service or city you target.",
        },
        {
          ar: "قياس يصل إلى مصدر كل طلب، لا إلى عدد الزيارات.",
          en: "Measurement that reaches the source of each enquiry, not the visit count.",
        },
      ],
      outcome: {
        ar: "تعرفون من أين يأتي كل عميل، وأيّ قناة تستحقّ الإنفاق.",
        en: "You know where each client comes from, and which channel deserves the spend.",
      },
      when: {
        ar: "الحضور موجود، والطلبات غائبة.",
        en: "The presence is there; the enquiries are not.",
      },
    },
    {
      slug: "operations",
      no: "04",
      name: { ar: "النظام", en: "Operations" },
      voice: {
        ar: "العمل كبر، والمتابعة ما زالت على الواتساب وجداول متفرّقة.",
        en: "The business grew, and we still track everything on WhatsApp and scattered sheets.",
      },
      fits: {
        ar: "شركات نمت، وصار عدد العملاء والطلبات أكبر من أن يُتابَع يدويًا.",
        en: "Companies that have grown past what can be followed by hand.",
      },
      situation: {
        ar: "المتابعة موزّعة بين واتساب وجداول ودفاتر. العميل يسأل عن طلبه فيدور السؤال بين ثلاثة موظّفين، والصفقة تُنسى لأن أحدًا لم يكن مسؤولًا عنها بالاسم.",
        en: "Follow-up is split across WhatsApp, spreadsheets, and notebooks. A client asks about an order and the question circles three employees, and a deal is forgotten because nobody owned it by name.",
      },
      shift: {
        ar: "من متابعة تعتمد على ذاكرة الأشخاص، إلى نظام يعرف حالة كل عميل.",
        en: "From follow-up that depends on people's memory, to a system that knows every client's state.",
      },
      builds: [
        {
          ar: "نظام CRM مهيّأ على طريقة عملكم، لا قالب جاهز تُجبرون على اتّباعه.",
          en: "A CRM shaped to how you actually work, not a template you must bend to.",
        },
        {
          ar: "مراحل بيع واضحة، ولكل مرحلة مسؤول بالاسم.",
          en: "Clear sales stages, each with an owner by name.",
        },
        {
          ar: "نقل بيانات العملاء الحالية إلى النظام لا البدء من فراغ.",
          en: "Migrating your existing client data in, rather than starting empty.",
        },
        {
          ar: "تدريب الفريق، ومتابعة معكم في الشهر الأول.",
          en: "Training the team, and staying with you through the first month.",
        },
      ],
      outcome: {
        ar: "لا تضيع صفقة لأن أحدًا نسيها، وتعرفون حالة كل عميل في شاشة واحدة.",
        en: "No deal is lost to forgetfulness, and every client's state sits on one screen.",
      },
      when: {
        ar: "العملاء أكثر ممّا يُتابَع بالذاكرة.",
        en: "There are more clients than memory can follow.",
      },
    },
  ] satisfies Solution[] as Solution[],

  /* ── ما يشترك فيه كل حلّ ──
     يحلّ محلّ السعر في بناء الثقة: الصفحة بلا أرقام، فما يطمئن
     العميل هو معرفة كيف يُدار العمل لا كم يكلّف. */
  shared: {
    label: { ar: "في كل حلّ", en: "In every solution" } as Bi,
    title: {
      ar: ["كيف نعمل،", "بغضّ النظر عن الحلّ."],
      en: ["How we work,", "whichever solution it is."],
    } as Bi<string[]>,
    items: [
      {
        ar: "بحث قبل التنفيذ — نفهم قطاعكم ومنافسيكم قبل أول قرار بصري.",
        en: "Research before execution — your sector and competitors, before the first visual decision.",
      },
      {
        ar: "نطاق مكتوب قبل البدء — ما هو داخل العمل وما هو خارجه، بالتاريخ.",
        en: "A written scope before we start — what is in, what is out, and by when.",
      },
      {
        ar: "مراجعة عند كل مرحلة — لا تسليم مفاجئ في النهاية.",
        en: "Review at every stage — nothing lands as a surprise at the end.",
      },
      {
        ar: "ملفات مفتوحة وحسابات باسمكم — ما نبنيه ملككم لا رهينة عندنا.",
        en: "Open files and accounts in your name — what we build is yours, not held with us.",
      },
      {
        ar: "متابعة بعد التسليم — الشراكة لا تنتهي عند التسليم.",
        en: "Follow-up after handover — the partnership does not end at delivery.",
      },
    ] as Bi[],
  },

  /* ── جدول توجيه: متى تختار ماذا ── */
  guide: {
    label: { ar: "الفرق في سطر", en: "The difference in a line" } as Bi,
    colSolution: { ar: "الحلّ", en: "Solution" } as Bi,
    colWhen: { ar: "متى تختاره", en: "When to choose it" } as Bi,
    colOutcome: { ar: "ما يتغيّر", en: "What changes" } as Bi,
    note: {
      ar: "الحلول ليست مراحل متتابعة ولا درجات. شركة عمرها عشرون سنة قد تحتاج «الأساس»، وشركة عمرها سنتان قد تحتاج «النظام». اختر بالوضع لا بالأقدمية.",
      en: "These are not sequential stages or tiers. A twenty-year-old company may need Foundation; a two-year-old may need Operations. Choose by situation, not seniority.",
    } as Bi,
  },

  /* ── أسئلة تمنع القرار ── */
  faq: {
    label: { ar: "قبل أن تقرّروا", en: "Before you decide" } as Bi,
    items: [
      {
        q: { ar: "كيف أعرف أيّ حلّ يناسب شركتي؟", en: "How do I know which solution fits?" },
        a: {
          ar: "اقرأ جملة «الوضع الآن» في كل حلّ؛ الأقرب إلى واقعكم هو الأقرب إليكم. وإن ترددتم بين اثنين، فالجلسة الأولى تحسمها في نصف ساعة — نسأل عن وضعكم ونقول رأينا حتى لو كان أنكم لا تحتاجون شيئًا الآن.",
          en: "Read the \"situation now\" line in each; the one closest to your reality is the one. If two feel close, a first call settles it in half an hour — we ask about your situation and say what we think, even if the answer is that you need nothing right now.",
        },
      },
      {
        q: { ar: "هل يمكن تعديل مكوّنات الحلّ؟", en: "Can the components be changed?" },
        a: {
          ar: "نعم. ما تقرؤونه هو الشكل الأكثر تكرارًا لكل وضع، لا قائمة مغلقة. نُضيف ما تحتاجونه ونحذف ما لا يخدمكم — والنطاق النهائي يُكتب قبل البدء لا بعده.",
          en: "Yes. What you read is the most common shape for each situation, not a closed list. We add what you need and drop what does not serve you — and the final scope is written before we start, not after.",
        },
      },
      {
        q: { ar: "هل نحتاج كل ما في الحلّ؟", en: "Do we need everything in it?" },
        a: {
          ar: "غالبًا لا. أكثر ما نقوله للعملاء هو «هذا يمكن تأجيله». نبدأ بما يغيّر النتيجة أولًا، ونترك الباقي لمرحلة تالية إن احتجتموه.",
          en: "Usually not. The thing we say most often is \"this can wait\". We start with what moves the outcome, and leave the rest for later if you still want it.",
        },
      },
      {
        q: { ar: "كيف يُحدَّد نطاق العمل والسعر؟", en: "How are scope and price decided?" },
        a: {
          ar: "في جلسة نفهم فيها وضعكم وحجم العمل، ثم يصلكم عرض مكتوب: ما سنسلّمه، ومتى، وبسعر ثابت لا يتغيّر ما لم يتغيّر النطاق باتفاق مكتوب. لهذا لا نعرض أسعارًا هنا: السعر بلا نطاق رقمٌ لا معنى له.",
          en: "In a call where we understand your situation and the size of the work, followed by a written proposal: what we deliver, by when, at a fixed price that does not move unless the scope moves in writing. That is why no prices appear here — a price without a scope is a meaningless number.",
        },
      },
      {
        q: { ar: "ماذا لو احتجنا أكثر من حلّ؟", en: "What if we need more than one?" },
        a: {
          ar: "يحدث كثيرًا. نرتّبها بحسب ما يعطي أثرًا أسرع، وننفّذ على مراحل بدل أن نفتح كل شيء دفعةً واحدة — أهدأ عليكم ماليًا، وأوضح في قياس ما نجح.",
          en: "It happens often. We order them by what shows results soonest and run them in phases rather than opening everything at once — easier on cash flow, and clearer about what worked.",
        },
      },
      {
        q: { ar: "ما الخطوة التالية بعد التواصل؟", en: "What happens after we get in touch?" },
        a: {
          ar: "نرد خلال يوم عمل، ونتّفق على جلسة قصيرة. بعدها يصلكم ملخّص مكتوب لما فهمناه والحلّ المقترح ونطاقه — تقرؤونه على مهل، بلا التزام.",
          en: "We reply within one business day and agree a short call. After it you receive a written summary of what we understood, the proposed solution, and its scope — to read at your own pace, with no commitment.",
        },
      },
    ] as { q: Bi; a: Bi }[],
  },

  /* ── الختام ── */
  closing: {
    lines: {
      ar: ["لستم متأكدين", "أيّها يناسبكم؟"],
      en: ["Not sure which", "one fits you?"],
    } as Bi<string[]>,
    body: {
      ar: "اكتبوا لنا وضعكم في سطرين، ونرجع باقتراح الحلّ الأقرب وسبب اختياره. وإن لم يكن أيٌّ منها مناسبًا لكم الآن، نقول ذلك.",
      en: "Tell us your situation in two lines and we'll come back with the closest solution and why. And if none of them fits you right now, we'll say so.",
    } as Bi,
    primary: { ar: "احجز جلسة تحديد النطاق", en: "Book a scoping call" } as Bi,
    secondary: { ar: "تحدّثوا معنا مباشرة", en: "Talk to us directly" } as Bi,
  },
};
