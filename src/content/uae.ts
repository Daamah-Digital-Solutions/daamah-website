import type { Bi } from "../i18n";
import type { City, CityPage } from "./saudi";

/**
 * الطبقة الإماراتية — صفحة لكل (خدمة × مدينة)، بنفس قواعد `saudi.ts`.
 *
 * مكتبنا في عجمان، وبطاقة Google Business Profile مسجّلة عليه. البطاقة
 * تُرتَّب بالقرب: من يبحث من عجمان والشارقة يراها قبل غيره. هذه الصفحات
 * هي ما تفتحه البطاقة حين يبحث أحدهم عن الخدمة باسم مدينته.
 *
 * كل حقل مكتوب لهذه المدينة ولهذه الخدمة: لا نصّ يتكرّر ويتبدّل فيه
 * اسم المدينة (صفحات البوّابة تُسقط الموقع كلّه). والإثبات لا يُكتب
 * هنا: الأعمال تُشتقّ من `work.ts` بمرشّح `markets: "ae"`.
 *
 * يُستورد هذا الملف من `saudi.ts` — والأنواع وحدها تُستورد في الاتجاه
 * الآخر، فلا حلقة في التشغيل.
 */

export const uaeCities: City[] = [
  {
    key: "ajman",
    market: "ae",
    name: { ar: "عجمان", en: "Ajman" },
    inCity: { ar: "في عجمان", en: "in Ajman" },
    blurb: {
      ar: "حيث مكتبنا. سوق شركات صغيرة ومتوسطة، ومنطقة حرّة، ومشاريع عقارية جديدة — وأغلب عملائها يأتون من الشارقة ودبي على بُعد دقائق.",
      en: "Where our office is. A market of small and mid-sized companies, a free zone, and new real estate projects — with most of its customers coming from Sharjah and Dubai minutes away.",
    },
  },
  {
    key: "sharjah",
    market: "ae",
    name: { ar: "الشارقة", en: "Sharjah" },
    inCity: { ar: "في الشارقة", en: "in Sharjah" },
    blurb: {
      ar: "مصانع ومناطق صناعية، ومؤسسات تعليمية، وشركات عائلية عمرها عقود. جمهور عربي أولًا، يقرأ قبل أن يتّصل.",
      en: "Factories and industrial areas, educational institutions, and family businesses decades old. An Arabic-first audience that reads before it calls.",
    },
  },
  {
    key: "dubai",
    market: "ae",
    name: { ar: "دبي", en: "Dubai" },
    inCity: { ar: "في دبي", en: "in Dubai" },
    blurb: {
      ar: "أعلى منافسة على الظهور في المنطقة، ومشتريات تقرأ بالإنجليزية أولًا، وتسجيل موردين لدى المطوّرين والمقاولين الرئيسيين يبدأ بملف.",
      en: "The most contested visibility in the region, procurement that reads English first, and vendor registration with developers and main contractors that starts with a file.",
    },
  },
];

export const uaeCityPages: CityPage[] = [
  /* ─────────── عجمان × المواقع ─────────── */
  {
    service: "web-development",
    city: "ajman",
    title: {
      ar: "شركة تصميم مواقع في عجمان",
      en: "Web design company in Ajman",
    },
    description: {
      ar: "تصميم مواقع الشركات في عجمان من مكتبنا في الراشدية: موقع عربي وإنجليزي سريع، يظهر في بحث جوجل والخرائط، ويحوّل الزائر إلى رسالة واتساب.",
      en: "Company websites in Ajman from our Al Rashidiya office: fast Arabic and English sites that show up in Google search and Maps and turn visitors into WhatsApp enquiries.",
    },
    h1: {
      ar: ["موقع لشركتك في عجمان،", "يجيب قبل أن يُسأل."],
      en: ["A website for your Ajman company", "that answers before it's asked."],
    },
    intro: {
      ar: "تصميم مواقع الشركات في عجمان نعمله من مكتبنا في الراشدية، على بُعد دقائق من عملائك. وأول ما نعرفه عن هذا السوق أن عميل الشركة في عجمان نادرًا ما يكون من عجمان وحدها: يأتي من الشارقة ودبي ومن خارج الدولة، ويقارن بينك وبين ثلاث شركات أخرى في جلسة واحدة على جواله. لذلك لا يكفي موقع جميل؛ يحتاج موقعًا يقول في الشاشة الأولى ماذا تقدّم ولمن وبأي سعر تقريبي، ويعرض أعمالًا حقيقية لا صورًا جاهزة، ويضع زرّ الواتساب حيث تبحث عنه العين. نبني الموقع بالعربية والإنجليزية معًا، سريعًا على شبكة الجوال، مربوطًا ببطاقتك على خرائط جوجل، ومهيّأً ليظهر حين يبحث أحدهم عن خدمتك باسم المدينة. والدومين والاستضافة باسم شركتك من اليوم الأول.",
      en: "We design company websites in Ajman from our office in Al Rashidiya, minutes from your customers. The first thing we know about this market is that an Ajman company's customer is rarely from Ajman alone: they come from Sharjah, from Dubai and from abroad, and compare you with three other companies in one sitting on their phone. So a good-looking site isn't enough; it has to say on the first screen what you offer, to whom and at roughly what price, show real work rather than stock photos, and put the WhatsApp button where the eye looks for it. We build in Arabic and English together, fast on mobile networks, connected to your Google Maps listing, and set up to appear when someone searches for your service by city name. Domain and hosting are in your company's name from day one.",
    },
    painPoints: [
      {
        title: { ar: "الموقع لا يظهر لمن يبحث باسم المدينة", en: "The site doesn't appear for city searches" },
        body: {
          ar: "من يبحث عن «شركة … في عجمان» يرى الخرائط أولًا ثم المواقع التي تذكر عجمان صراحة. موقع لا يذكر المدينة ولا يرتبط ببطاقة الخرائط غائب عن البحث الذي يأتي منه أقرب العملاء.",
          en: "Someone searching \"… company in Ajman\" sees Maps first, then sites that name Ajman explicitly. A site that doesn't mention the city or link to its Maps listing is absent from the search your nearest customers use.",
        },
      },
      {
        title: { ar: "زائر يقارن ولا يجد السعر ولا المدّة", en: "A visitor comparing, with no price or timeline" },
        body: {
          ar: "العميل الذي يقارن بين أربع شركات يغلق الموقع الذي لا يعطيه فكرة عن السعر والمدّة، ويكلّم من أعطاه. «تواصل معنا للتفاصيل» وحدها تخسر أغلب الزوّار.",
          en: "A customer comparing four companies closes the site that gives no sense of price or timeline, and calls the one that did. \"Contact us for details\" on its own loses most visitors.",
        },
      },
      {
        title: { ar: "موقع بلغة واحدة لسوق بلغتين", en: "A one-language site for a two-language market" },
        body: {
          ar: "نصف عملاء الشركات في عجمان يقرؤون بالإنجليزية والنصف الآخر بالعربية. موقع بلغة واحدة، أو بترجمة آلية للأخرى، يخسر نصف السوق قبل أول رسالة.",
          en: "Half of Ajman companies' customers read English and the other half Arabic. A one-language site — or one machine-translated into the other — loses half the market before the first message.",
        },
      },
    ],
    approach: [
      {
        ar: "نبدأ بما يبحث عنه عميلك فعلًا، ونكتب الصفحة الأولى لتجيب عنه في عشر ثوانٍ.",
        en: "We start from what your customer actually searches for, and write the first screen to answer it in ten seconds.",
      },
      {
        ar: "العربية والإنجليزية تُكتبان كتابةً، ولكل لغة رابطها الخاص الذي تفهرسه محركات البحث.",
        en: "Arabic and English are both written, not translated, and each has its own URL that search engines index.",
      },
      {
        ar: "نربط الموقع ببطاقة خرائط جوجل وبأدوات القياس، فتعرف كم رسالة جاءت من الموقع ومن أي صفحة.",
        en: "We connect the site to your Google Maps listing and to analytics, so you know how many enquiries came from the site and from which page.",
      },
    ],
    faq: [
      {
        q: { ar: "هل يمكن أن نلتقي في مكتبكم؟", en: "Can we meet at your office?" },
        a: {
          ar: "نعم. مكتبنا في برج أمبرجيم بالراشدية 3 في عجمان، ونرتّب الاجتماع بموعد مسبق عبر الواتساب. ونعمل أيضًا عن بُعد بالكامل لمن يفضّل ذلك.",
          en: "Yes. Our office is in Amber Gem Tower, Al Rashidiya 3, Ajman, and we arrange meetings by appointment over WhatsApp. We also work fully remotely for those who prefer it.",
        },
      },
      {
        q: { ar: "كم يستغرق موقع شركة؟", en: "How long does a company website take?" },
        a: {
          ar: "يعتمد على عدد الصفحات واللغات وجاهزية المحتوى. نحدّد المدّة مكتوبةً في العرض قبل البدء، ونلتزم بها بمراحل مراجعة واضحة.",
          en: "It depends on the number of pages, the languages, and how ready the content is. We put the timeline in writing in the proposal before starting, and keep to it with clear review stages.",
        },
      },
      {
        q: { ar: "هل تعملون مع شركات المنطقة الحرّة؟", en: "Do you work with free zone companies?" },
        a: {
          ar: "نعم، مع شركات المنطقة الحرّة وشركات البرّ على السواء. الموقع نفسه لا يختلف، لكننا نعرض بيانات الترخيص والنشاط بالطريقة التي يسأل عنها عملاؤك وشركاؤك.",
          en: "Yes, with free zone and mainland companies alike. The site itself doesn't change, but we present licence and activity details the way your customers and partners ask for them.",
        },
      },
    ],
  },

  /* ─────────── عجمان × التسويق الرقمي ─────────── */
  {
    service: "digital-marketing",
    city: "ajman",
    title: {
      ar: "شركة تسويق رقمي في عجمان",
      en: "Digital marketing agency in Ajman",
    },
    description: {
      ar: "تسويق رقمي لشركات عجمان: ظهور على خرائط جوجل، وحملات تُقاس برسائل واتساب واتصالات لا بالمشاهدات، وتقرير شهري يربط الإنفاق بالنتيجة.",
      en: "Digital marketing for Ajman companies: Google Maps visibility, campaigns measured in WhatsApp enquiries and calls rather than views, and a monthly report tying spend to results.",
    },
    h1: {
      ar: ["تسويق لشركتك في عجمان", "يُقاس بالرسائل لا بالإعجابات."],
      en: ["Marketing for your Ajman company,", "measured in enquiries, not likes."],
    },
    intro: {
      ar: "التسويق الرقمي لشركة في عجمان يبدأ من حقيقة بسيطة: ميزانيتك أصغر من ميزانيات منافسيك في دبي، وجمهورك على بُعد دقائق منك. فالرابح ليس من يصرف أكثر، بل من يظهر أولًا لمن يبحث قريبًا منه، ويقيس كل درهم بما جلبه. نبدأ من بطاقتك على خرائط جوجل لأنها أرخص قناة وأقربها إلى نيّة الشراء: فئات صحيحة، وخدمات مكتوبة، وصور أعمال حقيقية، وتقييمات من عملاء فعليين. ثم نبني حملات بحث وسوشيال تستهدف عجمان والشارقة ودبي بنطاق مدروس، ونقيس النتيجة برسائل الواتساب والاتصالات وطلبات العروض لا بعدد المشاهدات. وكل شهر تستلم تقريرًا يقول بوضوح: كم صرفنا، وكم طلبًا جاء، ومن أين، وما الذي سنغيّره في الشهر التالي — بما في ذلك ما لم ينجح.",
      en: "Digital marketing for an Ajman company starts from a simple fact: your budget is smaller than your Dubai competitors', and your audience is minutes away. So the winner isn't whoever spends most, but whoever shows up first to people searching nearby, and measures every dirham by what it brought in. We start with your Google Maps listing because it is the cheapest channel and the closest to buying intent: correct categories, written services, photos of real work, and reviews from actual customers. Then we build search and social campaigns that target Ajman, Sharjah and Dubai with a deliberate radius, and measure results in WhatsApp messages, calls and quote requests rather than view counts. Every month you get a report that says plainly how much we spent, how many enquiries came in, from where, and what we'll change next month — including what didn't work.",
    },
    painPoints: [
      {
        title: { ar: "إعلانات تُرى ولا تُتّصل", en: "Ads that are seen but never called" },
        body: {
          ar: "آلاف المشاهدات وعشرات الإعجابات ولا رسالة واحدة. الحملة التي تُقاس بالوصول تنجح على الورق وتفشل في الحساب البنكي.",
          en: "Thousands of views, dozens of likes, and not one message. A campaign measured by reach succeeds on paper and fails in the bank account.",
        },
      },
      {
        title: { ar: "بطاقة خرائط مهملة", en: "A neglected Maps listing" },
        body: {
          ar: "بطاقة بلا صور ولا خدمات ولا ردود على التقييمات تخسر لمن يبحث «قريب مني» — وهو أقرب عميل إلى الشراء وأرخصهم وصولًا.",
          en: "A listing with no photos, no services and no replies to reviews loses \"near me\" searches — the customer closest to buying and cheapest to reach.",
        },
      },
      {
        title: { ar: "لا أحد يعرف من أين جاء العميل", en: "Nobody knows where the customer came from" },
        body: {
          ar: "حين لا يُسجَّل مصدر كل رسالة، يُقطع الإنفاق عن القناة الناجحة ويستمر على الفاشلة. القرار بلا قياس تخمين مكلف.",
          en: "When the source of each enquiry isn't recorded, spend gets cut from the channel that works and continues on the one that doesn't. Decisions without measurement are expensive guesses.",
        },
      },
    ],
    approach: [
      {
        ar: "نضبط بطاقة خرائط جوجل أولًا، لأنها أسرع طريق إلى عميل يبحث قريبًا منك.",
        en: "We fix your Google Maps listing first, because it's the fastest route to a customer searching near you.",
      },
      {
        ar: "كل رابط وكل حملة يحمل وسم مصدره، فتعرف أي رسالة جاءت من أين.",
        en: "Every link and every campaign carries its source tag, so you know which enquiry came from where.",
      },
      {
        ar: "تقرير شهري بلغة الأعمال: إنفاق، وطلبات، وتكلفة الطلب، وما سنغيّره.",
        en: "A monthly report in business terms: spend, enquiries, cost per enquiry, and what we'll change.",
      },
    ],
    faq: [
      {
        q: { ar: "ما أقل ميزانية إعلانية تنصحون بها؟", en: "What's the smallest ad budget you'd recommend?" },
        a: {
          ar: "تختلف بالقطاع والمنافسة. نقترح ميزانية اختبار لشهر واحد بعد دراسة سوقك، ونقرّر بعدها بالأرقام إن كان التوسّع يستحق — لا قبلها.",
          en: "It varies by sector and competition. We suggest a one-month test budget after studying your market, and decide on scaling with the numbers afterwards — not before.",
        },
      },
      {
        q: { ar: "هل تديرون البطاقة على خرائط جوجل؟", en: "Do you manage the Google Maps listing?" },
        a: {
          ar: "نعم: الفئات والخدمات والوصف والصور والمنشورات والردّ على التقييمات. ولا نكتب تقييمات ولا نشتريها؛ نساعدك أن تطلبها من عملائك الحقيقيين.",
          en: "Yes: categories, services, description, photos, posts and review replies. We don't write or buy reviews; we help you ask your real customers for them.",
        },
      },
      {
        q: { ar: "هل يمكن استهداف الشارقة ودبي أيضًا؟", en: "Can you target Sharjah and Dubai too?" },
        a: {
          ar: "نعم، وكثيرًا ما يكون ذلك منطقيًا لشركة في عجمان. نحدّد النطاق بحسب من يشتري منك فعلًا، ونوسّعه حين تقول الأرقام إن التوسّع مربح.",
          en: "Yes, and for an Ajman company it often makes sense. We set the radius by who actually buys from you, and widen it when the numbers say it pays.",
        },
      },
    ],
  },

  /* ─────────── عجمان × البروفايل ─────────── */
  {
    service: "company-profile",
    city: "ajman",
    title: {
      ar: "تصميم بروفايل شركات في عجمان",
      en: "Company profile design in Ajman",
    },
    description: {
      ar: "تصميم بروفايل الشركات في عجمان بالعربية والإنجليزية: ملف يُرسَل على الواتساب ويُطبع للاجتماع، ويجيب أسئلة المطوّر والمقاول والشريك قبل أن يسألها.",
      en: "Company profile design in Ajman, Arabic and English: a file you can send on WhatsApp and print for the meeting, answering the developer's, contractor's and partner's questions first.",
    },
    h1: {
      ar: ["بروفايل لشركتك في عجمان", "يُفتح على الجوال ويُقنع في الاجتماع."],
      en: ["A profile for your Ajman company", "that opens on a phone and convinces in the room."],
    },
    intro: {
      ar: "بروفايل الشركة في عجمان يُرسَل في أغلب الأحيان على الواتساب قبل أي اجتماع: إلى مطوّر عقاري يختار مقاول باطن، أو إلى شركة في دبي تبحث عن مورّد، أو إلى شريك من خارج الدولة. وقارئه يفتحه على جواله، ويقرّر في دقيقتين إن كان سيكمل. لذلك نصمّم البروفايل بنسختين من نظام واحد: نسخة خفيفة للإرسال تُفتح بسرعة على الجوال، ونسخة للطباعة تُوضع على طاولة الاجتماع. ونرتّب المحتوى بترتيب أسئلة القارئ: من أنتم وما ترخيصكم، وما المشاريع التي نفّذتموها بأرقامها، ومن عملاؤكم، وكيف يُطلب منكم. بالعربية والإنجليزية في ملف واحد متوازن، لأن قارئ البروفايل في الإمارات قد يكون من أي جنسية. ومن أعمالنا القريبة بروفايل تي دي إتش للتطوير العقاري لمشروعها في عجمان.",
      en: "In Ajman a company profile is usually sent on WhatsApp before any meeting: to a developer choosing a subcontractor, a Dubai company looking for a supplier, or a partner from abroad. Its reader opens it on a phone and decides within two minutes whether to keep going. So we design the profile as two versions of one system: a light version for sending that opens quickly on a phone, and a print version for the meeting table. We order the content by the reader's questions: who you are and under what licence, which projects you've delivered and their numbers, who your clients are, and how to order from you. In Arabic and English in one balanced file, because a profile reader in the UAE could be of any nationality. Among our nearby work is the profile for TDH Real Estate Development's project in Ajman.",
    },
    painPoints: [
      {
        title: { ar: "ملف ثقيل لا يُفتح على الجوال", en: "A heavy file that won't open on a phone" },
        body: {
          ar: "بروفايل بحجم خمسين ميجا يصل على الواتساب ولا يُفتح، أو يُفتح بعد دقيقة من الانتظار. القارئ لا ينتظر؛ ينتقل إلى الملف التالي.",
          en: "A fifty-megabyte profile arrives on WhatsApp and doesn't open, or opens after a minute's wait. The reader doesn't wait; they move to the next file.",
        },
      },
      {
        title: { ar: "صفحات عن الرؤية قبل المشاريع", en: "Pages of vision before any projects" },
        body: {
          ar: "الرؤية والرسالة والقيم في خمس صفحات أولى، والمشاريع في آخر الملف. من يختار مورّدًا يريد أن يرى ما نفّذته، لا ما تطمح إليه.",
          en: "Vision, mission and values across the first five pages, and the projects at the very end. Someone choosing a supplier wants to see what you've delivered, not what you aspire to.",
        },
      },
      {
        title: { ar: "ترجمة تكشف نفسها", en: "A translation that gives itself away" },
        body: {
          ar: "نسخة إنجليزية مترجمة حرفيًا من العربية تُقرأ فورًا على أنها كذلك، وتُضعف ثقة قارئ أجنبي في شركة جادّة.",
          en: "An English version translated word for word from Arabic reads as exactly that, and weakens a foreign reader's trust in a serious company.",
        },
      },
    ],
    approach: [
      {
        ar: "نرتّب الملف بأسئلة قارئه: الترخيص، والمشاريع بأرقامها، والعملاء، وطريقة الطلب.",
        en: "We order the file by its reader's questions: licence, projects with numbers, clients, and how to order.",
      },
      {
        ar: "نسخة للإرسال خفيفة على الجوال، ونسخة للطباعة، من نظام تصميم واحد.",
        en: "A light version for sending on a phone and a print version, from one design system.",
      },
      {
        ar: "العربية والإنجليزية مكتوبتان كتابةً، بتوازن بصري واحد في الصفحة.",
        en: "Arabic and English both written as originals, with one visual balance on the page.",
      },
    ],
    faq: [
      {
        q: { ar: "ما الذي تحتاجونه منّا للبدء؟", en: "What do you need from us to start?" },
        a: {
          ar: "الرخصة التجارية، وقائمة المشاريع بأرقامها وصورها، وأسماء العملاء الذين يمكن ذكرهم، والشعار. ونكتب النصوص نحن من اجتماع واحد معك.",
          en: "Your trade licence, a list of projects with figures and photos, the client names you're allowed to mention, and your logo. We write the copy ourselves from one meeting with you.",
        },
      },
      {
        q: { ar: "هل يصلح البروفايل لتسجيل المورّدين لدى المطوّرين؟", en: "Will the profile work for vendor registration with developers?" },
        a: {
          ar: "نصمّمه ليحمل ما تطلبه ملفات التسجيل عادةً: الترخيص، والخبرات، والمشاريع، وفريق العمل. أما المستندات الرسمية نفسها فتُرفَق كما هي.",
          en: "We design it to carry what registration files usually ask for: licence, experience, projects and team. The official documents themselves are attached as they are.",
        },
      },
      {
        q: { ar: "هل تصمّمون بروفايل لشركة ما زالت جديدة؟", en: "Do you design profiles for new companies?" },
        a: {
          ar: "نعم. حين لا توجد مشاريع كثيرة بعد، نبني الملف على الخبرة الفعلية للفريق والخدمات بتفاصيلها، دون اختراع أعمال لم تُنفَّذ.",
          en: "Yes. When there aren't many projects yet, we build the file on the team's real experience and detailed services, without inventing work that hasn't been done.",
        },
      },
    ],
  },

  /* ─────────── الشارقة × المواقع ─────────── */
  {
    service: "web-development",
    city: "sharjah",
    title: {
      ar: "شركة تصميم مواقع في الشارقة",
      en: "Web design company in Sharjah",
    },
    description: {
      ar: "تصميم مواقع الشركات والمصانع في الشارقة: عربية أولًا بلغة مكتوبة، كتالوج منتجات واضح، وطلب عرض سعر بخطوة واحدة — من مكتبنا القريب في عجمان.",
      en: "Websites for Sharjah companies and manufacturers: Arabic-first and properly written, a clear product catalogue, and a one-step quote request — from our office next door in Ajman.",
    },
    h1: {
      ar: ["موقع لشركتك في الشارقة", "يقرؤه المشتري قبل أن يتّصل."],
      en: ["A website for your Sharjah company,", "read by buyers before they call."],
    },
    intro: {
      ar: "تصميم مواقع الشركات في الشارقة يختلف عن دبي في قارئه أولًا. كثير من شركات الشارقة مصانع وشركات توريد وشركات عائلية في المناطق الصناعية، ومشتريها مسؤول مشتريات أو صاحب ورشة أو موزّع، يقرأ بالعربية ويريد أن يعرف بسرعة: ماذا تصنعون أو تورّدون، وبأي مواصفات، وأين المصنع أو المستودع، وكيف يطلب عرض سعر. موقع مبنيّ كإعلان، بصور كبيرة وجمل عامة، لا يجيب عن أيٍّ من ذلك. نبني موقعًا يعمل ككتالوج منظّم: منتجات أو خدمات مصنّفة بمواصفاتها، وصفحة لكل قطاع تخدمونه، وطلب عرض سعر قصير يصل إلى الواتساب مع اسم المنتج الذي كان الزائر يقرأ عنه. بالعربية المكتوبة أولًا والإنجليزية بجانبها، وسريعًا على الجوال. ومكتبنا في عجمان على بُعد دقائق إن فضّلت أن نلتقي.",
      en: "Designing company websites in Sharjah differs from Dubai first in who reads them. Many Sharjah companies are factories, suppliers and family businesses in the industrial areas, and their buyer is a procurement officer, a workshop owner or a distributor who reads Arabic and wants to know quickly: what you make or supply, to what specifications, where the factory or warehouse is, and how to request a quote. A site built like an advert, with big pictures and general sentences, answers none of that. We build a site that works like an organised catalogue: products or services classified with their specifications, a page for each sector you serve, and a short quote request that arrives on WhatsApp with the name of the product the visitor was reading about. Written in Arabic first with English alongside, and fast on mobile. Our office in Ajman is minutes away if you'd rather meet.",
    },
    painPoints: [
      {
        title: { ar: "منتجات بلا مواصفات", en: "Products without specifications" },
        body: {
          ar: "صورة منتج وجملة «جودة عالية» لا تساعد مسؤول مشتريات يقارن بين ثلاثة مورّدين. المواصفات والمقاسات والشهادات هي ما يقرأه فعلًا.",
          en: "A product photo and the phrase \"high quality\" don't help a procurement officer comparing three suppliers. Specifications, sizes and certifications are what they actually read.",
        },
      },
      {
        title: { ar: "طلب عرض سعر طويل", en: "A long quote request" },
        body: {
          ar: "نموذج من خمسة عشر حقلًا يُترك في منتصفه. المشتري يريد أن يرسل اسم المنتج والكمية ورقمه، ويتلقّى الرد.",
          en: "A fifteen-field form gets abandoned halfway. A buyer wants to send the product name, quantity and their number, and get a reply.",
        },
      },
      {
        title: { ar: "عربية ضعيفة في سوق عربي", en: "Weak Arabic in an Arabic-first market" },
        body: {
          ar: "مواقع كثيرة تُكتب بالإنجليزية ثم تُترجم آليًا. في الشارقة، حيث القارئ عربي أولًا، يُقرأ ذلك على أنه قلّة اهتمام.",
          en: "Many sites are written in English and then machine-translated. In Sharjah, where the reader is Arabic-first, that reads as a lack of care.",
        },
      },
    ],
    approach: [
      {
        ar: "نبني بنية الموقع على منتجاتك أو خدماتك ومواصفاتها، لا على صفحات عامة.",
        en: "We build the site's structure around your products or services and their specifications, not generic pages.",
      },
      {
        ar: "طلب عرض السعر قصير ويصل إلى الواتساب ومعه الصفحة التي جاء منها الزائر.",
        en: "The quote request is short and arrives on WhatsApp with the page the visitor came from.",
      },
      {
        ar: "العربية تُكتب أولًا، والإنجليزية تُبنى عليها لمن يقرأ من خارج الدولة.",
        en: "Arabic is written first, and English is built from it for readers outside the country.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تستطيعون عرض كتالوج كبير من المنتجات؟", en: "Can you handle a large product catalogue?" },
        a: {
          ar: "نعم. نصنّف المنتجات بحسب ما يبحث به المشتري — الفئة أو الاستخدام أو المقاس — ونجعل الإضافة والتعديل سهلين لفريقك بعد التسليم.",
          en: "Yes. We classify products by how buyers search — category, use or size — and make adding and editing easy for your team after handover.",
        },
      },
      {
        q: { ar: "هل يحتاج الموقع إلى متجر إلكتروني؟", en: "Does the site need to be an online store?" },
        a: {
          ar: "ليس دائمًا. أغلب المصانع والموردين يبيعون بعرض سعر لا بسلّة شراء. نقترح المتجر فقط حين يكون البيع المباشر منطقيًا لمنتجك.",
          en: "Not always. Most factories and suppliers sell by quotation, not by shopping cart. We suggest a store only when direct selling makes sense for your product.",
        },
      },
      {
        q: { ar: "هل يمكن أن نلتقي؟", en: "Can we meet in person?" },
        a: {
          ar: "نعم، مكتبنا في الراشدية بعجمان على بُعد دقائق من الشارقة، ونرتّب الموعد عبر الواتساب. ونعمل عن بُعد بالكامل أيضًا.",
          en: "Yes, our office in Al Rashidiya, Ajman is minutes from Sharjah, and we arrange appointments over WhatsApp. We also work fully remotely.",
        },
      },
    ],
  },

  /* ─────────── دبي × البروفايل ─────────── */
  {
    service: "company-profile",
    city: "dubai",
    title: {
      ar: "تصميم بروفايل شركات في دبي",
      en: "Company profile design in Dubai",
    },
    description: {
      ar: "تصميم بروفايل الشركات في دبي لتسجيل الموردين والمناقصات: إنجليزية أولًا بلغة مكتوبة وعربية بجانبها، ومشاريع بأرقامها، وملف يمرّ من لجنة المشتريات.",
      en: "Company profile design in Dubai for vendor registration and tenders: English-first, properly written, with Arabic alongside, projects with their figures, and a file that clears procurement.",
    },
    h1: {
      ar: ["بروفايل لشركتك في دبي", "يمرّ من لجنة المشتريات."],
      en: ["A company profile in Dubai", "that clears procurement."],
    },
    intro: {
      ar: "في دبي يبدأ كثير من العقود بملف: تسجيل مورّد لدى مطوّر عقاري، أو تأهيل لدى مقاول رئيسي، أو مناقصة لدى جهة كبيرة. ومن يقرأ الملف لجنة مشتريات تقرأ بالإنجليزية أولًا، وتراجع عشرات الملفات في الأسبوع، وتبحث عن أشياء محدّدة: الترخيص والنشاط، والمشاريع المماثلة بأحجامها ومدّتها، والعملاء الذين يمكن الرجوع إليهم، والشهادات وأنظمة الجودة والسلامة، والفريق. البروفايل الذي يخبّئ هذه الأشياء بين صفحات الرؤية والقيم يُستبعد قبل أن يُقرأ. نصمّم بروفايل الشركة في دبي بترتيب أسئلة اللجنة، بإنجليزية مكتوبة لا مترجمة وعربية بجانبها لمن يحتاجها، ومشاريع مفصّلة بأرقامها، ونسخة خفيفة للإرسال بالبريد ونسخة للطباعة. ونعمل من مكتبنا في عجمان، ونلتقي في دبي بموعد.",
      en: "In Dubai many contracts begin with a file: vendor registration with a developer, pre-qualification with a main contractor, or a tender with a large entity. The reader is a procurement committee that reads English first, reviews dozens of files a week, and looks for specific things: licence and activity, similar projects with their size and duration, clients who can be referenced, certifications and quality and safety systems, and the team. A profile that hides these between pages of vision and values is set aside before it's read. We design company profiles in Dubai in the order of the committee's questions, in English that is written rather than translated with Arabic alongside where needed, with projects detailed by their figures, and a light version for email alongside a print version. We work from our office in Ajman and meet in Dubai by appointment.",
    },
    painPoints: [
      {
        title: { ar: "الملف لا يجيب أسئلة التسجيل", en: "The file doesn't answer registration questions" },
        body: {
          ar: "الترخيص، والمشاريع المماثلة، والشهادات، وفريق العمل — أسئلة في كل نموذج تسجيل. البحث عنها في ملف لا يذكرها ينتهي بالاستبعاد.",
          en: "Licence, similar projects, certifications, team — asked on every registration form. Hunting for them in a file that doesn't state them ends in rejection.",
        },
      },
      {
        title: { ar: "مشاريع بصور بلا أحجام", en: "Projects with pictures but no scale" },
        body: {
          ar: "صور جميلة لمشاريع بلا قيمة ولا مدّة ولا دور واضح. اللجنة تريد أن تعرف إن كنت نفّذت مشروعًا بحجم مشروعها.",
          en: "Beautiful photos of projects with no value, duration or clear role. The committee wants to know whether you've delivered a project the size of theirs.",
        },
      },
      {
        title: { ar: "إنجليزية مترجمة", en: "Translated English" },
        body: {
          ar: "قارئ اللجنة في دبي كثيرًا ما يكون من غير العرب. الإنجليزية المترجمة حرفيًا تبدو غير احترافية مهما كان التصميم جيّدًا.",
          en: "The committee reader in Dubai is often not Arab. Literal translated English looks unprofessional however good the design.",
        },
      },
    ],
    approach: [
      {
        ar: "نبدأ من نماذج التسجيل التي تتقدّم إليها فعلًا، ونبني الملف ليجيب عنها بالترتيب.",
        en: "We start from the registration forms you actually apply to, and build the file to answer them in order.",
      },
      {
        ar: "الإنجليزية تُكتب كتابةً، والعربية بجانبها حيث يحتاجها القارئ.",
        en: "English is written as an original, with Arabic alongside where the reader needs it.",
      },
      {
        ar: "نسخة خفيفة للبريد وبوابات التسجيل، ونسخة للطباعة، من نظام واحد.",
        en: "A light version for email and registration portals, and a print version, from one system.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تكتبون المحتوى أم نكتبه نحن؟", en: "Do you write the content, or do we?" },
        a: {
          ar: "نكتبه نحن من اجتماع معك ومن مستنداتك: الرخصة، وقائمة المشاريع، والشهادات. أنت تراجع وتعتمد، ولا يُنشر رقم لا تقرّه.",
          en: "We write it, from a meeting with you and your documents: licence, project list, certifications. You review and approve, and no figure goes in that you haven't confirmed.",
        },
      },
      {
        q: { ar: "هل يصلح البروفايل لأكثر من نوع من التسجيل؟", en: "Can one profile serve several kinds of registration?" },
        a: {
          ar: "نعم. نبني ملفًا أساسيًا ونُعدّ منه نسخًا مختصرة لقطاعات أو جهات بعينها حين تختلف متطلّباتها.",
          en: "Yes. We build a master file and derive shorter versions for specific sectors or entities when their requirements differ.",
        },
      },
      {
        q: { ar: "أين تلتقون بنا؟", en: "Where do we meet?" },
        a: {
          ar: "مكتبنا في عجمان، ونلتقي في مكتبك في دبي بموعد مسبق، أو عن بُعد إن كان ذلك أنسب لك.",
          en: "Our office is in Ajman; we meet at your Dubai office by appointment, or remotely if that suits you better.",
        },
      },
    ],
  },
];

/* ── صفحة «خدماتنا في الإمارات» ── */
export const uaeHub = {
  label: { ar: "الإمارات", en: "UAE" } as Bi,
  title: {
    ar: ["مكتبنا في عجمان،", "وعملاؤنا في كل الإمارات."],
    en: ["Our office is in Ajman,", "our clients across the UAE."],
  } as Bi<string[]>,
  intro: {
    ar: "دَعمة شركة عالمية مكتبها في الإمارات في عجمان، في برج أمبرجيم بالراشدية. نخدم الشركات في عجمان والشارقة ودبي وبقية الإمارات: هوية بصرية، ومواقع، وبروفايلات شركات، وتسويق رقمي. هذه الصفحة تجمع ما نقدّمه للسوق الإماراتي والأعمال التي نفّذناها فيه.",
    en: "Daamah is a global company whose UAE office is in Ajman, in Amber Gem Tower, Al Rashidiya. We serve companies in Ajman, Sharjah, Dubai and across the Emirates: brand identity, websites, company profiles and digital marketing. This page gathers what we offer the UAE market and the work we've delivered in it.",
  } as Bi,
  note: {
    ar: "نلتقي في مكتبنا في عجمان أو في مكتبك بموعد مسبق عبر الواتساب، ونعمل عن بُعد بالكامل لمن يفضّل ذلك.",
    en: "We meet at our Ajman office or yours by appointment over WhatsApp, and work fully remotely for those who prefer it.",
  } as Bi,
  trustLabel: { ar: "ما يمكن الاعتماد عليه", en: "What you can rely on" } as Bi,
  trust: [
    {
      title: { ar: "مكتب تزوره", en: "An office you can visit" } as Bi,
      body: {
        ar: "برج أمبرجيم، الراشدية 3، عجمان — على بُعد دقائق من الشارقة.",
        en: "Amber Gem Tower, Al Rashidiya 3, Ajman — minutes from Sharjah.",
      } as Bi,
    },
    {
      title: { ar: "الملكية لك", en: "You own it" } as Bi,
      body: {
        ar: "الدومين والاستضافة والملفات المصدرية باسمك من اليوم الأول.",
        en: "Domain, hosting and source files are in your name from day one.",
      } as Bi,
    },
    {
      title: { ar: "بلغتين مكتوبتين", en: "Two languages, both written" } as Bi,
      body: {
        ar: "العربية والإنجليزية تُكتبان كتابةً، لأن عميلك في الإمارات قد يقرأ أيًّا منهما.",
        en: "Arabic and English are both written as originals, because your UAE customer may read either.",
      } as Bi,
    },
    {
      title: { ar: "أرقام لا وعود", en: "Numbers, not promises" } as Bi,
      body: {
        ar: "نقول المدّة والتكلفة قبل البدء، ونقول ما لم ينجح في التقرير.",
        en: "We state timelines and costs before starting, and say what didn't work in the report.",
      } as Bi,
    },
  ],
  servicesLabel: { ar: "خدماتنا في الإمارات", en: "What we do in the UAE" } as Bi,
  citiesLabel: { ar: "أين نعمل", en: "Where we work" } as Bi,
  workLabel: { ar: "أعمال في السوق الإماراتي", en: "Work in the UAE market" } as Bi,
  ctaLines: {
    ar: ["احكِ لنا عن", "مشروعك في الإمارات."],
    en: ["Tell us about", "your UAE project."],
  } as Bi<string[]>,
};
