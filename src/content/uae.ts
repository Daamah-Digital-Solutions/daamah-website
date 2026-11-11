import type { Bi } from "../i18n";
import type { City, CityPage } from "./saudi";

/**
 * الطبقة الإماراتية — صفحة لكل (خدمة × مدينة)، بنفس قواعد `saudi.ts`.
 *
 * مكتبنا في عجمان، وبطاقة Google Business Profile مسجّلة عليه. البطاقة
 * تُرتَّب بالقرب، والصفحات تغطّي الإمارات السبع: أبوظبي ودبي بكل الخدمات، ثم البقية. وهي
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
    key: "abu-dhabi",
    market: "ae",
    name: { ar: "أبوظبي", en: "Abu Dhabi" },
    inCity: { ar: "في أبوظبي", en: "in Abu Dhabi" },
    blurb: {
      ar: "العاصمة: جهات حكومية وشبه حكومية، وطاقة وصناعة، ومناطق حرّة مثل سوق أبوظبي العالمي وكيزاد ومدينة مصدر. الشراء فيها بتسجيل مورّدين ولجان، والعربية فيها لغة رسمية لا ترجمة.",
      en: "The capital: government and semi-government entities, energy and industry, and free zones such as ADGM, KEZAD and Masdar City. Buying runs through vendor registration and committees, and Arabic is an official language here, not a translation.",
    },
  },
  {
    key: "dubai",
    market: "ae",
    name: { ar: "دبي", en: "Dubai" },
    inCity: { ar: "في دبي", en: "in Dubai" },
    blurb: {
      ar: "أعلى منافسة على الظهور في المنطقة: عقارات وضيافة وتجارة إلكترونية وشركات مناطق حرّة. جمهور يقرأ بالإنجليزية أولًا، ومشتريات تبدأ بملف وتسجيل مورّد.",
      en: "The most contested visibility in the region: real estate, hospitality, e-commerce and free zone companies. An audience that reads English first, and procurement that starts with a file and vendor registration.",
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
    key: "umm-al-quwain",
    market: "ae",
    name: { ar: "أم القيوين", en: "Umm Al Quwain" },
    inCity: { ar: "في أم القيوين", en: "in Umm Al Quwain" },
    blurb: {
      ar: "إمارة صغيرة بمنطقة حرّة يُرخَّص منها كثير من الشركات التي تعمل في كل الدولة وخارجها. لشركاتها، الموقع هو المكتب الذي يراه العميل.",
      en: "A small emirate with a free zone that licenses many companies operating across the country and beyond. For them, the website is the office the customer sees.",
    },
  },
  {
    key: "ras-al-khaimah",
    market: "ae",
    name: { ar: "رأس الخيمة", en: "Ras Al Khaimah" },
    inCity: { ar: "في رأس الخيمة", en: "in Ras Al Khaimah" },
    blurb: {
      ar: "صناعة ومحاجر ومنطقة حرّة كبيرة (راكز)، وسياحة وضيافة تنمو بسرعة. مصنّعون يبيعون للخارج، وفنادق ومطاعم تبيع للزائر قبل أن يصل.",
      en: "Industry, quarries and a large free zone (RAKEZ), with fast-growing tourism and hospitality. Manufacturers selling abroad, and hotels and restaurants selling to visitors before they arrive.",
    },
  },
  {
    key: "fujairah",
    market: "ae",
    name: { ar: "الفجيرة", en: "Fujairah" },
    inCity: { ar: "في الفجيرة", en: "in Fujairah" },
    blurb: {
      ar: "ميناء على الساحل الشرقي: شحن وتزويد سفن ولوجستيات، ومنطقة حرّة، وسياحة جبلية وساحلية. عملاء كثيرون يقرّرون من خارج الدولة.",
      en: "A port on the east coast: shipping, bunkering and logistics, a free zone, and mountain and coastal tourism. Many customers decide from outside the country.",
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
  /* ─────────── دبي × المواقع ─────────── */
  {
    service: "web-development",
    city: "dubai",
    title: {
      ar: "شركة تصميم مواقع في دبي",
      en: "Web design company in Dubai",
    },
    description: {
      ar: "تصميم مواقع الشركات في دبي: إنجليزية مكتوبة أولًا وعربية بجانبها، سرعة على الجوال، وصفحات تحوّل الزائر المقارِن إلى طلب — لا موقع يشبه عشرين غيره.",
      en: "Company websites in Dubai: written English first with Arabic alongside, fast on mobile, and pages that turn a comparing visitor into an enquiry — not a site that looks like twenty others.",
    },
    h1: {
      ar: ["موقع لشركتك في دبي", "لا يشبه العشرين قبله."],
      en: ["A website for your Dubai company", "that doesn't look like the last twenty."],
    },
    intro: {
      ar: "تصميم مواقع الشركات في دبي يواجه مشكلة لا توجد في سوق آخر بهذه الحدّة: زائرك رأى اليوم عشرين موقعًا يشبه موقعك. نفس القالب، ونفس الصورة الجوية للأبراج، ونفس جملة «حلول مبتكرة لعملائنا». وهو يقرّر في ثوانٍ، وبالإنجليزية غالبًا، أيّ هذه الشركات تفهم عمله. لذلك نبدأ من الشيء الذي لا يملكه غيرك: عملاؤك الفعليون، ومشاريعك بأرقامها، وطريقتك في العمل، ونبني الصفحة الأولى لتقوله بلا مقدّمات. نكتب الإنجليزية كتابةً لا ترجمةً، ونضع العربية بجانبها لمن يقرأ بها، ولكل لغة رابطها الذي تفهرسه محركات البحث. ونبني الموقع سريعًا على الجوال لأن أغلب الزيارات الأولى تأتي منه، ونربط كل زر تواصل بمصدره، فتعرف أي صفحة جلبت أي طلب. والدومين والاستضافة باسم شركتك من اليوم الأول.",
      en: "Designing company websites in Dubai faces a problem no other market has this sharply: today your visitor has already seen twenty sites that look like yours. The same template, the same aerial shot of towers, the same line about \"innovative solutions for our clients\". They decide in seconds, usually in English, which of these companies understands their business. So we start from what nobody else has: your actual clients, your projects and their numbers, the way you work — and we build the first screen to say it without preamble. We write the English as an original rather than a translation, place Arabic alongside it for those who read it, and give each language its own URL that search engines index. We build fast on mobile because most first visits come from a phone, and tie every contact button to its source, so you know which page brought which enquiry. Domain and hosting are in your company's name from day one.",
    },
    painPoints: [
      {
        title: { ar: "قالب يعرفه الزائر", en: "A template the visitor recognises" },
        body: {
          ar: "في دبي يرى المشتري المواقع الجاهزة كل يوم، ويتعرّف عليها من الشاشة الأولى. والموقع الذي يبدو كغيره يُقرأ على أن الشركة مثل غيرها.",
          en: "In Dubai buyers see off-the-shelf sites every day and recognise them from the first screen. A site that looks like the rest reads as a company like the rest.",
        },
      },
      {
        title: { ar: "إنجليزية لا تقنع", en: "English that doesn't persuade" },
        body: {
          ar: "جمهورك من عشرات الجنسيات، والإنجليزية لغتهم المشتركة. نصّ مترجم أو عام يفقد القارئ الذي يقارن بينك وبين شركة عالمية.",
          en: "Your audience comes from dozens of nationalities, and English is their common language. Translated or generic copy loses the reader comparing you with an international firm.",
        },
      },
      {
        title: { ar: "زيارات بلا طلبات", en: "Visits without enquiries" },
        body: {
          ar: "الإعلانات تجلب الزوّار، والموقع لا يحوّلهم. حين لا يوجد طريق واضح من الصفحة إلى الرسالة، تدفع ثمن الزيارة مرّتين.",
          en: "Ads bring visitors and the site doesn't convert them. When there's no clear path from page to message, you pay for each visit twice.",
        },
      },
    ],
    approach: [
      {
        ar: "نبني الصفحة الأولى على ما يميّزك فعلًا: عملاء، ومشاريع، وأرقام — لا شعارات عامة.",
        en: "We build the first screen on what genuinely sets you apart: clients, projects, numbers — not general slogans.",
      },
      {
        ar: "الإنجليزية تُكتب كتابةً، والعربية بجانبها، ولكل لغة رابطها المفهرس.",
        en: "English is written as an original, Arabic sits alongside it, and each language has its own indexed URL.",
      },
      {
        ar: "كل زر تواصل يحمل مصدره، فتعرف أي صفحة وأي حملة جلبت كل طلب.",
        en: "Every contact button carries its source, so you know which page and which campaign brought each enquiry.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تعملون مع شركات المناطق الحرّة في دبي؟", en: "Do you work with Dubai free zone companies?" },
        a: {
          ar: "نعم، مع شركات المناطق الحرّة وشركات البرّ. الموقع نفسه لا يختلف، لكننا نعرض النشاط والترخيص بالطريقة التي يسأل عنها عملاؤك وشركاؤك.",
          en: "Yes, with free zone and mainland companies. The site itself doesn't change, but we present activity and licence details the way your customers and partners ask for them.",
        },
      },
      {
        q: { ar: "هل يمكن أن يكون الموقع بالإنجليزية فقط؟", en: "Can the site be English only?" },
        a: {
          ar: "يمكن، ونقترحه أحيانًا لشركات جمهورها لا يقرأ العربية. لكننا نذكّرك أن نسخة عربية مكتوبة تفتح لك بحثًا عربيًا منافسته في دبي أقل بكثير.",
          en: "It can, and we sometimes suggest it for companies whose audience doesn't read Arabic. But a properly written Arabic version opens Arabic search for you, where competition in Dubai is far lower.",
        },
      },
      {
        q: { ar: "أين نلتقي؟", en: "Where do we meet?" },
        a: {
          ar: "مكتبنا في عجمان، ونلتقي في مكتبك في دبي بموعد مسبق، أو عن بُعد إن كان ذلك أنسب لك.",
          en: "Our office is in Ajman; we meet at your Dubai office by appointment, or remotely if that suits you better.",
        },
      },
    ],
  },

  /* ─────────── دبي × الهوية ─────────── */
  {
    service: "branding",
    city: "dubai",
    title: {
      ar: "تصميم هوية بصرية في دبي",
      en: "Brand identity design in Dubai",
    },
    description: {
      ar: "تصميم هوية بصرية لشركات دبي: علامة تعمل بالعربية والإنجليزية بوزن واحد، ونظام ألوان وخطوط يصمد على الشاشة والمطبوع، ودليل يمنع تشتّتها لاحقًا.",
      en: "Brand identity design for Dubai companies: a mark that works in Arabic and English at one weight, a colour and type system that holds on screen and in print, and a guide that stops it drifting.",
    },
    h1: {
      ar: ["هوية لشركتك في دبي", "تُعرف من بعيد."],
      en: ["An identity for your Dubai company", "recognisable from across the room."],
    },
    intro: {
      ar: "في دبي تبدأ شركتك سباقها مع شركات عالمية تملك هويات صُرف عليها الملايين، وتقف بجانبها في المعرض نفسه، وعلى صفحة البحث نفسها، وفي صندوق بريد المشتري نفسه. الهوية التي تبدو مؤقتة أو مستعارة تجعل الشركة الجادّة تبدو صغيرة، وهذا فرق حقيقي في السعر الذي يُعرض عليك والثقة التي تُمنح لك. نصمّم الهوية لتحمل هذا الوزن: علامة تعمل بالعربية والإنجليزية بنفس الثقل البصري — لا شعارًا لاتينيًا أُلصقت به كلمة عربية — ونظام ألوان وخطوط يصمد على الشاشة الصغيرة وعلى واجهة المعرض، ودليل استخدام يمنع التشتّت حين ينفّذ غيرنا لاحقًا. ثم نطبّقها على ما يراه عميلك فعلًا: الموقع، والبروفايل، والسوشيال، وبطاقة العمل الرقمية. ونبدأ من سؤال واحد: ماذا يجب أن يشعر به عميلك حين يرى اسمك أول مرّة؟",
      en: "In Dubai your company starts its race against international firms whose identities cost millions, standing beside them at the same exhibition, on the same search page and in the same buyer's inbox. An identity that looks temporary or borrowed makes a serious company look small, and that is a real difference in the price you're offered and the trust you're given. We design the identity to carry that weight: a mark that works in Arabic and English at the same visual weight — not a Latin logo with an Arabic word bolted on — a colour and type system that holds on a small screen and on an exhibition stand, and a usage guide that prevents drift when someone else executes later. Then we apply it to what your customer actually sees: the website, the company profile, social media and a digital business card. And we start from one question: what should your customer feel the first time they see your name?",
    },
    painPoints: [
      {
        title: { ar: "شعار لاتيني بكلمة عربية ملصقة", en: "A Latin logo with Arabic bolted on" },
        body: {
          ar: "أكثر ما نراه: شعار صُمّم بالإنجليزية، ثم أضيفت له العربية بخطّ لا يناسبه. في سوق ثنائي اللغة يظهر هذا الضعف في كل مطبوعة.",
          en: "What we see most: a mark designed in English, with Arabic added later in a typeface that doesn't match. In a bilingual market the weakness shows on every printed piece.",
        },
      },
      {
        title: { ar: "هوية بلا نظام", en: "An identity without a system" },
        body: {
          ar: "شعار جميل ثم كل منشور بألوان وخطوط مختلفة. بعد سنة لا يتعرّف أحد على العلامة إلا من الشعار وحده.",
          en: "A good logo, then every post in different colours and fonts. A year later nobody recognises the brand except by the logo alone.",
        },
      },
      {
        title: { ar: "تصميم يتبع الموضة", en: "Design that follows the trend" },
        body: {
          ar: "ما يبدو حديثًا هذا العام يبدو قديمًا بعد ثلاث سنوات. الهوية التي تُبنى على اتجاه عابر تُعاد من الصفر قبل أن تستردّ تكلفتها.",
          en: "What looks modern this year looks dated in three. An identity built on a passing trend gets redone from scratch before it has paid for itself.",
        },
      },
    ],
    approach: [
      {
        ar: "نبدأ من جمهورك ومنافسيك، ونحدّد ما يجب أن تقوله العلامة قبل أن نرسم خطًا.",
        en: "We start from your audience and competitors, and define what the brand must say before drawing a line.",
      },
      {
        ar: "العربية والإنجليزية تُصمّمان معًا بوزن واحد، لا واحدة بعد الأخرى.",
        en: "Arabic and English are designed together at one weight, not one after the other.",
      },
      {
        ar: "نسلّم دليل استخدام وملفات مصدرية باسمك، فتبقى الهوية ثابتة مهما تغيّر المنفّذ.",
        en: "We hand over a usage guide and source files in your name, so the identity stays consistent whoever executes it.",
      },
    ],
    faq: [
      {
        q: { ar: "ماذا نستلم في نهاية المشروع؟", en: "What do we receive at the end?" },
        a: {
          ar: "الشعار بنسخه العربية والإنجليزية والمركّبة، ونظام الألوان والخطوط، ودليل الاستخدام، والتطبيقات المتفق عليها، وكل الملفات المصدرية باسم شركتك.",
          en: "The mark in Arabic, English and combined versions, the colour and type system, the usage guide, the agreed applications, and all source files in your company's name.",
        },
      },
      {
        q: { ar: "هل تطوّرون هوية موجودة بدل البدء من الصفر؟", en: "Can you evolve an existing identity rather than start over?" },
        a: {
          ar: "نعم، وكثيرًا ما يكون هذا الأصحّ لشركة لها عملاء يعرفون شعارها. نحافظ على ما يتعرّف عليه الناس ونصلح ما يُضعفه.",
          en: "Yes, and for a company whose clients already know its mark it's often the right call. We keep what people recognise and fix what weakens it.",
        },
      },
      {
        q: { ar: "كم يستغرق تصميم الهوية؟", en: "How long does an identity take?" },
        a: {
          ar: "يعتمد على عدد التطبيقات وجولات المراجعة. نحدّد المدّة والمراحل مكتوبةً في العرض قبل البدء.",
          en: "It depends on the number of applications and review rounds. We set the timeline and stages in writing in the proposal before starting.",
        },
      },
    ],
  },

  /* ─────────── دبي × التسويق الرقمي ─────────── */
  {
    service: "digital-marketing",
    city: "dubai",
    title: {
      ar: "شركة تسويق رقمي في دبي",
      en: "Digital marketing agency in Dubai",
    },
    description: {
      ar: "تسويق رقمي في دبي يُقاس بتكلفة الطلب لا بالوصول: استهداف دقيق في أغلى سوق إعلاني بالمنطقة، وصفحات هبوط تحوّل، وتقرير شهري يقول ما نجح وما لم ينجح.",
      en: "Digital marketing in Dubai measured by cost per enquiry, not reach: precise targeting in the region's most expensive ad market, landing pages that convert, and a monthly report on what worked and what didn't.",
    },
    h1: {
      ar: ["تسويق رقمي في دبي", "بحساب كل درهم."],
      en: ["Digital marketing in Dubai,", "accountable for every dirham."],
    },
    intro: {
      ar: "النقرة في دبي من الأغلى في المنطقة، لأن كل شركة عقارات وعيادة ومطعم وشركة خدمات تتنافس على الجمهور نفسه وفي الساعات نفسها. في هذا السوق لا تكسب الحملة الأكبر، بل الحملة الأدقّ: الجمهور الصحيح، والرسالة التي تخصّه، والصفحة التي تحوّله بعد النقرة. نبدأ بتحديد من يشتري منك فعلًا — القطاع والمنطقة واللغة والجنسية حين تكون مهمّة — ثم نبني الحملات على بحث جوجل حيث نيّة الشراء أوضح، وعلى ميتا ولينكدإن حيث يصحّ ذلك لقطاعك. ونربط كل حملة بصفحة هبوط مكتوبة لها لا بالصفحة الرئيسية، ونقيس النتيجة بالطلبات ورسائل الواتساب والاتصالات وتكلفة كل طلب. وكل شهر تستلم تقريرًا بلغة الأعمال: كم صرفنا، وكم طلبًا جاء، وبكم، وما الذي سنوقفه أو نضاعفه — بما في ذلك ما لم ينجح.",
      en: "A click in Dubai is among the most expensive in the region, because every real estate firm, clinic, restaurant and service company competes for the same audience at the same hours. In this market the biggest campaign doesn't win — the most precise one does: the right audience, the message meant for them, and the page that converts them after the click. We start by defining who actually buys from you — sector, area, language and nationality where it matters — then build campaigns on Google search, where buying intent is clearest, and on Meta and LinkedIn where they suit your sector. We tie every campaign to a landing page written for it rather than the home page, and measure results in enquiries, WhatsApp messages, calls and cost per enquiry. Every month you get a report in business terms: how much we spent, how many enquiries came in, at what cost, and what we'll pause or double — including what didn't work.",
    },
    painPoints: [
      {
        title: { ar: "ميزانية تذوب في جمهور عام", en: "Budget melting into a broad audience" },
        body: {
          ar: "استهداف «دبي، 25–55، مهتمّون بالأعمال» يصرف الميزانية على من لن يشتري أبدًا. في سوق بهذا الغلاء، الدقّة هي الفرق بين الربح والخسارة.",
          en: "Targeting \"Dubai, 25–55, interested in business\" spends the budget on people who will never buy. In a market this expensive, precision is the difference between profit and loss.",
        },
      },
      {
        title: { ar: "كل الحملات إلى الصفحة الرئيسية", en: "Every campaign pointed at the home page" },
        body: {
          ar: "الزائر الذي نقر على إعلان عن خدمة بعينها يصل إلى صفحة عامة، فيبحث، ثم يغادر. صفحة هبوط واحدة مكتوبة للحملة قد تضاعف الطلبات بنفس الميزانية.",
          en: "A visitor who clicked an ad for a specific service lands on a general page, searches, then leaves. One landing page written for the campaign can multiply enquiries on the same budget.",
        },
      },
      {
        title: { ar: "تقارير بالمشاهدات", en: "Reports in impressions" },
        body: {
          ar: "مئات الآلاف من الظهور، وآلاف النقرات، ولا أحد يعرف كم طلبًا جاء ولا بكم. التقرير الذي لا يصل إلى الطلب لا يساعدك على قرار.",
          en: "Hundreds of thousands of impressions, thousands of clicks, and nobody knows how many enquiries came in or at what cost. A report that doesn't reach the enquiry doesn't help you decide.",
        },
      },
    ],
    approach: [
      {
        ar: "نحدّد المشتري الفعلي أولًا، ونبني الاستهداف عليه لا على تصنيفات المنصّة العامة.",
        en: "We define the actual buyer first, and build targeting on them rather than the platform's broad categories.",
      },
      {
        ar: "لكل حملة صفحة هبوط مكتوبة لها، وكل طلب يحمل وسم مصدره.",
        en: "Every campaign gets a landing page written for it, and every enquiry carries its source tag.",
      },
      {
        ar: "تقرير شهري بتكلفة الطلب، وقرارات واضحة: ما نوقفه وما نضاعفه.",
        en: "A monthly report on cost per enquiry, with clear decisions: what we pause and what we double.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تديرون الحملات على جوجل وميتا ولينكدإن؟", en: "Do you run campaigns on Google, Meta and LinkedIn?" },
        a: {
          ar: "نعم، ونختار المنصّة بحسب قطاعك وطريقة شراء عميلك: جوجل حين يبحث العميل عن الخدمة، ولينكدإن حين يكون المشتري شركة، وميتا حين يشتري الفرد.",
          en: "Yes, and we choose the platform by your sector and how your customer buys: Google when they search for the service, LinkedIn when the buyer is a company, Meta when an individual buys.",
        },
      },
      {
        q: { ar: "هل تبقى الحسابات الإعلانية باسمنا؟", en: "Do the ad accounts stay in our name?" },
        a: {
          ar: "نعم. الحسابات الإعلانية وأدوات القياس باسم شركتك، ونعمل عليها بصلاحية تمنحها أنت وتستطيع سحبها في أي وقت.",
          en: "Yes. Ad accounts and analytics are in your company's name, and we work on them with access you grant and can revoke at any time.",
        },
      },
      {
        q: { ar: "متى تظهر النتائج؟", en: "When do results show?" },
        a: {
          ar: "الحملات المدفوعة تعطي أرقامًا من الأسابيع الأولى، لكن الأرقام التي يُبنى عليها قرار تحتاج عادة شهرًا كاملًا من الاختبار. نقول لك ذلك قبل البدء لا بعده.",
          en: "Paid campaigns produce numbers within the first weeks, but numbers you can base a decision on usually need a full month of testing. We tell you that before starting, not after.",
        },
      },
    ],
  },

  /* ─────────── دبي × السيو ─────────── */
  {
    service: "seo",
    city: "dubai",
    title: {
      ar: "شركة سيو في دبي",
      en: "SEO company in Dubai",
    },
    description: {
      ar: "تحسين محركات البحث في دبي بالعربية والإنجليزية: كلمات بنيّة شراء لا كلمات عامة مستحيلة، وصفحات تجيب ما يبحث عنه عميلك، وظهور في الخرائط وإجابات الذكاء الاصطناعي.",
      en: "SEO in Dubai in Arabic and English: buyer-intent keywords rather than impossible generic ones, pages that answer what your customer searches, and visibility in Maps and AI answers.",
    },
    h1: {
      ar: ["سيو في دبي", "يبدأ من الكلمة التي تشتري."],
      en: ["SEO in Dubai", "starts from the keyword that buys."],
    },
    intro: {
      ar: "السيو في دبي يفشل غالبًا لسبب واحد: الشركة تريد أن تتصدّر كلمة عامة مثل «شركة تسويق في دبي» تتنافس عليها مئات الشركات منذ سنوات، فتصرف عامًا كاملًا ولا تصل. الطريق الأقصر هو الكلمات التي يكتبها عميلك حين يكون جاهزًا للشراء: الخدمة بعينها، في منطقته، لقطاعه، وبلغته. والعربية هنا فرصة يتركها أغلب المنافسين، لأن البحث العربي في دبي منافسته أقل بكثير من الإنجليزي وجمهوره حقيقي. نبدأ ببحث كلمات فعلي من بيانات جوجل، ثم نبني أو نعيد كتابة صفحة لكل نيّة شراء مهمّة، ونصلح ما يمنع الفهرسة والسرعة، ونربط الموقع ببطاقة خرائط جوجل، ونجهّز المحتوى ليُقتبس في إجابات الذكاء الاصطناعي التي صار كثيرون يسألونها بدل البحث. ونقيس النجاح بالزيارات التي تحوّلت إلى طلبات، لا بترتيب كلمة لا تجلب أحدًا.",
      en: "SEO in Dubai usually fails for one reason: the company wants to top a generic keyword like \"marketing agency in Dubai\" that hundreds of firms have fought over for years, spends a whole year and never gets there. The shorter road is the keywords your customer types when ready to buy: the specific service, in their area, for their sector, in their language. Arabic is an opportunity most competitors leave on the table here, because Arabic search in Dubai is far less contested than English and its audience is real. We start with genuine keyword research from Google's data, then build or rewrite a page for each important buying intent, fix what holds back indexing and speed, connect the site to your Google Maps listing, and prepare the content to be quoted in the AI answers many people now ask instead of searching. And we measure success in visits that became enquiries, not the ranking of a keyword that brings nobody.",
    },
    painPoints: [
      {
        title: { ar: "مطاردة كلمة مستحيلة", en: "Chasing an impossible keyword" },
        body: {
          ar: "كلمة عامة واحدة يتنافس عليها مئات، وعشرات الكلمات المحدّدة التي يكتبها المشتري الجاهز متروكة بلا صفحة تجيب عنها.",
          en: "One generic keyword fought over by hundreds, while dozens of specific ones typed by ready buyers are left without a page to answer them.",
        },
      },
      {
        title: { ar: "صفحات لا تُفهرس", en: "Pages that never get indexed" },
        body: {
          ar: "مواقع تبني نصّها بالجافاسكربت بعد التحميل تبدو فارغة لكثير من الزواحف. المحتوى الجيّد لا ينفع إن لم يقرأه محرّك البحث.",
          en: "Sites that build their text with JavaScript after load look empty to many crawlers. Good content is useless if the search engine never reads it.",
        },
      },
      {
        title: { ar: "غياب عن البحث العربي", en: "Absent from Arabic search" },
        body: {
          ar: "موقع بالإنجليزية وحدها يترك كل من يبحث بالعربية في دبي لمنافس واحد كتب صفحة عربية لائقة.",
          en: "An English-only site hands everyone searching in Arabic in Dubai to the one competitor who wrote a decent Arabic page.",
        },
      },
    ],
    approach: [
      {
        ar: "بحث كلمات من بيانات جوجل الفعلية، ونبدأ بالكلمات ذات نيّة الشراء والمنافسة الممكنة.",
        en: "Keyword research from actual Google data, starting with buyer-intent terms where competition is winnable.",
      },
      {
        ar: "صفحة لكل نيّة مهمّة بالعربية والإنجليزية، مكتوبة لتجيب لا لتحشو كلمات.",
        en: "A page for each important intent in Arabic and English, written to answer rather than stuff keywords.",
      },
      {
        ar: "تقرير شهري من Search Console: الظهور والنقرات والطلبات، وما نعمل عليه بعدها.",
        en: "A monthly report from Search Console: impressions, clicks, enquiries, and what we work on next.",
      },
    ],
    faq: [
      {
        q: { ar: "كم يستغرق السيو ليُظهر نتيجة؟", en: "How long does SEO take to show results?" },
        a: {
          ar: "الإصلاحات التقنية والصفحات الجديدة تبدأ بالظهور عادة خلال أسابيع، والترتيب على الكلمات المهمّة يحتاج شهورًا. لا نعد بمركز محدّد في تاريخ محدّد، ومن يعد بذلك لا يملكه.",
          en: "Technical fixes and new pages usually start appearing within weeks; rankings on important keywords take months. We don't promise a specific position by a specific date — whoever does doesn't control it.",
        },
      },
      {
        q: { ar: "هل تشترون روابط؟", en: "Do you buy links?" },
        a: {
          ar: "لا. الروابط المشتراة مخالفة لإرشادات جوجل وتعرّض الموقع كله للعقوبة. نبني الروابط من أدلة موثوقة وشراكات وحالات عملاء حقيقية.",
          en: "No. Bought links break Google's guidelines and put the whole site at risk. We build links from reputable directories, partnerships and real client stories.",
        },
      },
      {
        q: { ar: "هل تعملون على موقع لم تبنوه أنتم؟", en: "Will you work on a site you didn't build?" },
        a: {
          ar: "نعم. نبدأ بفحص تقني ومحتوى، ونقول لك بوضوح ما يمكن إصلاحه في موقعك الحالي وما يحتاج إعادة بناء — إن احتاج.",
          en: "Yes. We start with a technical and content audit, and tell you plainly what can be fixed on your current site and what needs rebuilding — if anything does.",
        },
      },
    ],
  },

  /* ─────────── أبوظبي × المواقع ─────────── */
  {
    service: "web-development",
    city: "abu-dhabi",
    title: {
      ar: "شركة تصميم مواقع في أبوظبي",
      en: "Web design company in Abu Dhabi",
    },
    description: {
      ar: "تصميم مواقع الشركات في أبوظبي بمعيار تسجيل المورّدين: عربية رسمية مكتوبة وإنجليزية بجانبها، وبيانات الترخيص والخبرة ظاهرة، وموقع يمرّ من لجنة التقييم.",
      en: "Company websites in Abu Dhabi built for vendor registration: properly written formal Arabic with English alongside, licence and experience in plain view, and a site that clears the evaluation committee.",
    },
    h1: {
      ar: ["موقع لشركتك في أبوظبي", "يُقيَّم قبل أن يُتّصل بك."],
      en: ["A website for your Abu Dhabi company,", "evaluated before anyone calls."],
    },
    intro: {
      ar: "في أبوظبي يُفتح موقع شركتك غالبًا لسبب محدّد: جهة حكومية أو شبه حكومية أو شركة طاقة كبرى تراجع ملفك ضمن تسجيل مورّدين أو تأهيل لمشروع. ومن يفتحه موظف مشتريات أو لجنة تقييم تبحث عن أشياء بعينها: الترخيص والنشاط، وسنوات الخبرة، والمشاريع المماثلة بأحجامها، والشهادات وأنظمة الجودة والسلامة، وطريقة التواصل الرسمية. الموقع الذي يعرض صورًا جميلة ويخفي هذه الأشياء يُستبعد بهدوء ولا يعرف صاحبه السبب. نبني الموقع بترتيب أسئلة اللجنة: صفحة تعريف تجيب بلا التفاف، ومشاريع مفصّلة بقطاعاتها وأرقامها، وصفحة للشهادات والسياسات، وبروفايل قابل للتحميل لأن كثيرًا من الجهات تطلبه ملفًا. والعربية هنا لغة رسمية تُكتب بعناية لا ترجمة آلية، والإنجليزية بجانبها بنفس المستوى. والدومين والاستضافة باسم شركتك من اليوم الأول.",
      en: "In Abu Dhabi your company's website is usually opened for a specific reason: a government or semi-government entity, or a major energy company, reviewing your file during vendor registration or pre-qualification for a project. The person opening it is a procurement officer or an evaluation committee looking for particular things: licence and activity, years of experience, similar projects and their size, certifications and quality and safety systems, and an official way to make contact. A site that shows beautiful pictures and hides these things is quietly set aside, and its owner never learns why. We build the site in the order of the committee's questions: an about page that answers without circling, projects detailed by sector and figures, a page for certifications and policies, and a downloadable profile because many entities want it as a file. Arabic here is an official language, written with care rather than machine-translated, with English alongside at the same standard. Domain and hosting are in your company's name from day one.",
    },
    painPoints: [
      {
        title: { ar: "الموقع لا يجيب أسئلة التأهيل", en: "The site doesn't answer qualification questions" },
        body: {
          ar: "الترخيص، والخبرات، والشهادات، والمشاريع المماثلة — أسئلة في كل نموذج تأهيل. حين لا يجدها المقيِّم في الموقع، يفترض أنها غير موجودة.",
          en: "Licence, experience, certifications, similar projects — asked on every qualification form. When the evaluator can't find them on the site, they assume they don't exist.",
        },
      },
      {
        title: { ar: "عربية ضعيفة أمام جهة رسمية", en: "Weak Arabic in front of an official entity" },
        body: {
          ar: "النصّ العربي المترجم آليًا يُقرأ فورًا على أنه كذلك. أمام جهة حكومية، هذا أول ما يُضعف صورة شركة جادّة.",
          en: "Machine-translated Arabic reads as exactly that. In front of a government entity, it's the first thing to undermine a serious company's image.",
        },
      },
      {
        title: { ar: "مشاريع بلا سياق", en: "Projects without context" },
        body: {
          ar: "صور مشاريع بلا عميل ولا حجم ولا دور. اللجنة تريد أن تعرف إن كنت نفّذت ما يشبه مشروعها، لا أن ترى ألبومًا.",
          en: "Project photos with no client, scale or role. The committee wants to know whether you've delivered something like their project, not browse an album.",
        },
      },
    ],
    approach: [
      {
        ar: "نبني بنية الموقع على أسئلة التأهيل وتسجيل المورّدين التي تواجهها فعلًا.",
        en: "We build the site's structure on the qualification and vendor-registration questions you actually face.",
      },
      {
        ar: "العربية تُكتب بلغة رسمية سليمة، والإنجليزية بجانبها بنفس المستوى.",
        en: "Arabic is written in sound formal language, with English alongside at the same standard.",
      },
      {
        ar: "بروفايل قابل للتحميل ومحدّث من الموقع نفسه، فلا تتناقض النسختان.",
        en: "A downloadable profile kept in step with the site itself, so the two versions never contradict each other.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تعملون مع شركات تورّد لجهات حكومية؟", en: "Do you work with companies supplying government entities?" },
        a: {
          ar: "نعم. نبني الموقع ليعرض ما تطلبه ملفات التأهيل عادةً. لا نتقدّم بالعطاءات نيابةً عنك، لكننا نجهّز ما يُرفق بها.",
          en: "Yes. We build the site to show what qualification files usually require. We don't bid on your behalf, but we prepare what gets attached.",
        },
      },
      {
        q: { ar: "هل تخدمون العين أيضًا؟", en: "Do you also serve Al Ain?" },
        a: {
          ar: "نعم، نخدم الشركات في إمارة أبوظبي كلها، ومنها العين. أغلب العمل يتم عن بُعد، والاجتماعات الحضورية بموعد مسبق.",
          en: "Yes, we serve companies across the Emirate of Abu Dhabi, including Al Ain. Most of the work is remote, with in-person meetings by appointment.",
        },
      },
      {
        q: { ar: "كيف تتم الاجتماعات؟", en: "How do meetings work?" },
        a: {
          ar: "مكتبنا في عجمان. نعقد الاجتماعات عن بُعد في الغالب، ونلتقي في أبوظبي حين يحتاج المشروع ذلك بموعد مسبق.",
          en: "Our office is in Ajman. Meetings are mostly remote, and we meet in Abu Dhabi by appointment when the project calls for it.",
        },
      },
    ],
  },

  /* ─────────── أبوظبي × الهوية ─────────── */
  {
    service: "branding",
    city: "abu-dhabi",
    title: {
      ar: "تصميم هوية بصرية في أبوظبي",
      en: "Brand identity design in Abu Dhabi",
    },
    description: {
      ar: "تصميم هوية بصرية لشركات أبوظبي: علامة رصينة بالعربية والإنجليزية تليق بالتعامل مع جهات كبرى، ونظام يصمد على المستندات الرسمية والمعارض والشاشة.",
      en: "Brand identity for Abu Dhabi companies: a composed mark in Arabic and English fit for dealing with major entities, and a system that holds on formal documents, exhibitions and screens.",
    },
    h1: {
      ar: ["هوية لشركتك في أبوظبي", "بوزن من تتعامل معهم."],
      en: ["An identity for your Abu Dhabi company,", "with the weight of those you deal with."],
    },
    intro: {
      ar: "الشركة في أبوظبي تُرى أول مرّة غالبًا على مستند: عرض فنّي في عطاء، أو ملف تأهيل، أو جناح في معرض كبير بجانب شركات وطنية وعالمية. وفي هذه اللحظة تقول الهوية شيئًا قبل أن يُقرأ سطر واحد: هل هذه شركة مستقرّة يمكن الاعتماد عليها لسنوات، أم شركة جديدة تجرّب. نصمّم الهوية لتقول الأولى بصدق: علامة رصينة تعمل بالعربية والإنجليزية بوزن بصري واحد، لأن العربية في أبوظبي تظهر أولًا على المستندات الرسمية لا تحت الإنجليزية، ونظام ألوان وخطوط يصمد على الورق الرسمي والعروض الفنية وواجهة المعرض والشاشة. ثم دليل استخدام واضح يُسلَّم مع ملفات مصدرية باسمك، فتبقى الهوية ثابتة حين يطبّقها فريقك أو مطبعة أو شركة معارض لاحقًا. ونطبّقها على ما تحتاجه فعلًا: البروفايل، والعروض، والموقع، والقرطاسية.",
      en: "A company in Abu Dhabi is usually first seen on a document: a technical proposal in a tender, a qualification file, or a stand at a major exhibition beside national and international firms. In that moment the identity says something before a single line is read: is this a stable company that can be relied on for years, or a new one trying things out? We design the identity to say the first, honestly: a composed mark that works in Arabic and English at one visual weight — because in Abu Dhabi Arabic appears first on official documents, not beneath the English — and a colour and type system that holds on letterhead, technical proposals, exhibition stands and screens. Then a clear usage guide, delivered with source files in your name, so the identity stays consistent when your team, a printer or an exhibition contractor applies it later. And we apply it to what you actually need: the company profile, proposals, the website and stationery.",
    },
    painPoints: [
      {
        title: { ar: "العربية في المرتبة الثانية", en: "Arabic in second place" },
        body: {
          ar: "شعار صُمّم بالإنجليزية وأضيفت له العربية لاحقًا. على مستند رسمي تتقدّم فيه العربية، يظهر هذا الخلل في كل صفحة.",
          en: "A mark designed in English with Arabic added later. On an official document where Arabic leads, the flaw shows on every page.",
        },
      },
      {
        title: { ar: "عروض فنية بلا هوية", en: "Technical proposals without an identity" },
        body: {
          ar: "الهوية تُطبَّق على الموقع والسوشيال، والعروض الفنية تُعدّ في قالب وورد عام. وهي المستند الذي يُقرَّر به العقد.",
          en: "The identity goes on the website and social media, while technical proposals are made in a generic Word template. Yet that's the document the contract is decided on.",
        },
      },
      {
        title: { ar: "هوية تتغيّر مع كل منفّذ", en: "An identity that changes with every supplier" },
        body: {
          ar: "بلا دليل استخدام، كل مطبعة وكل شركة معارض تفسّر الهوية بطريقتها، وبعد عام تملك الشركة خمس نسخ من نفسها.",
          en: "Without a usage guide, every printer and exhibition contractor interprets the identity their own way, and a year later the company owns five versions of itself.",
        },
      },
    ],
    approach: [
      {
        ar: "نصمّم العربية والإنجليزية معًا، والعربية قادرة على أن تتقدّم على المستند الرسمي.",
        en: "We design Arabic and English together, with Arabic able to lead on an official document.",
      },
      {
        ar: "نطبّق الهوية على العروض الفنية والبروفايل، لا على الموقع والسوشيال وحدهما.",
        en: "We apply the identity to technical proposals and the profile, not just the website and social media.",
      },
      {
        ar: "دليل استخدام وملفات مصدرية باسمك، فتبقى الهوية واحدة مهما تعدّد المنفّذون.",
        en: "A usage guide and source files in your name, so the identity stays one whoever executes it.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تصمّمون قوالب العروض الفنية؟", en: "Do you design technical proposal templates?" },
        a: {
          ar: "نعم، قوالب قابلة للتعديل يستخدمها فريقك في كل عطاء، بنفس نظام الهوية، فلا يحتاج كل عرض إلى مصمّم.",
          en: "Yes — editable templates your team uses for every tender, in the same identity system, so each proposal doesn't need a designer.",
        },
      },
      {
        q: { ar: "هل تطوّرون هوية قائمة؟", en: "Can you evolve an existing identity?" },
        a: {
          ar: "نعم، ونقترح ذلك حين يكون للشركة اسم معروف لدى عملائها. نحافظ على ما يتعرّف عليه الناس ونصلح ما يُضعفه.",
          en: "Yes, and we recommend it when the company's name is already known to its clients. We keep what people recognise and fix what weakens it.",
        },
      },
    ],
  },

  /* ─────────── أبوظبي × التسويق الرقمي ─────────── */
  {
    service: "digital-marketing",
    city: "abu-dhabi",
    title: {
      ar: "شركة تسويق رقمي في أبوظبي",
      en: "Digital marketing agency in Abu Dhabi",
    },
    description: {
      ar: "تسويق رقمي لشركات أبوظبي: حملات بحث ولينكدإن تصل إلى صانع القرار في الشركات والجهات، ومحتوى عربي رصين، وتقرير شهري يربط الإنفاق بالطلبات المؤهّلة.",
      en: "Digital marketing for Abu Dhabi companies: search and LinkedIn campaigns that reach decision-makers in companies and entities, measured Arabic content, and a monthly report tying spend to qualified enquiries.",
    },
    h1: {
      ar: ["تسويق رقمي في أبوظبي", "يصل إلى من يقرّر."],
      en: ["Digital marketing in Abu Dhabi", "that reaches whoever decides."],
    },
    intro: {
      ar: "كثير من الشركات في أبوظبي تبيع لشركات أخرى وجهات، لا لأفراد. والمشتري هنا مدير مشتريات أو مدير مشروع أو لجنة، لا يتأثّر بإعلان لامع على إنستغرام، بل يبحث عن الخدمة حين يحتاجها، ويقرأ عن الشركة قبل أن يضعها على قائمة المورّدين. لذلك نبني التسويق الرقمي لشركات أبوظبي على ثلاثة أشياء: الظهور في بحث جوجل على الكلمات التي يكتبها المشتري حين يحتاج خدمتك، والوصول إلى صنّاع القرار عبر لينكدإن بحسب القطاع والمسمّى الوظيفي، ومحتوى عربي وإنجليزي رصين يجيب أسئلتهم ويبني الثقة قبل أول اجتماع. ونقيس النتيجة بالطلبات المؤهّلة — من شركات في قطاعك وبحجم يناسبك — لا بعدد النقرات. وكل شهر تستلم تقريرًا يقول بوضوح: كم صرفنا، وكم طلبًا مؤهّلًا جاء، ومن أين، وما الذي سنغيّره.",
      en: "Many Abu Dhabi companies sell to other companies and entities, not to individuals. The buyer here is a procurement manager, a project manager or a committee, unmoved by a glossy Instagram ad; they search for the service when they need it and read about the company before adding it to a vendor list. So we build digital marketing for Abu Dhabi companies on three things: visibility in Google search on the keywords a buyer types when they need your service, reaching decision-makers through LinkedIn by sector and job title, and measured Arabic and English content that answers their questions and builds trust before the first meeting. We measure results in qualified enquiries — from companies in your sector and of a size that suits you — not in clicks. Every month you get a report that says plainly how much we spent, how many qualified enquiries came in, from where, and what we'll change.",
    },
    painPoints: [
      {
        title: { ar: "إعلانات للأفراد وشراء الشركات", en: "Consumer ads for a business purchase" },
        body: {
          ar: "حملات مصمّمة للمستهلك تصل إلى آلاف الأفراد، وصانع القرار في الشركة التي تشتري منك لا يراها أصلًا.",
          en: "Campaigns designed for consumers reach thousands of individuals, while the decision-maker at the company that buys from you never sees them.",
        },
      },
      {
        title: { ar: "طلبات كثيرة غير مؤهّلة", en: "Lots of unqualified enquiries" },
        body: {
          ar: "رسائل من خارج قطاعك أو بحجم لا يناسبك تستهلك وقت فريق المبيعات. عدد الطلبات وحده رقم مضلّل.",
          en: "Messages from outside your sector or of a size that doesn't fit eat your sales team's time. Enquiry count alone is a misleading number.",
        },
      },
      {
        title: { ar: "محتوى لا يناسب جمهورًا رسميًا", en: "Content that doesn't suit a formal audience" },
        body: {
          ar: "نبرة خفيفة تصلح لعلامة استهلاكية تبدو غير جادّة أمام جهة حكومية أو شركة طاقة.",
          en: "A light tone that suits a consumer brand looks unserious to a government entity or an energy company.",
        },
      },
    ],
    approach: [
      {
        ar: "نحدّد المشتري المؤسسي ومسمّاه الوظيفي، ونختار القنوات التي يستخدمها فعلًا.",
        en: "We define the institutional buyer and their job title, and choose the channels they actually use.",
      },
      {
        ar: "نقيس الطلبات المؤهّلة لا كل الطلبات، ونرشّح ما لا يناسبك قبل أن يصل إلى فريقك.",
        en: "We measure qualified enquiries rather than all enquiries, filtering what doesn't fit before it reaches your team.",
      },
      {
        ar: "محتوى عربي وإنجليزي بنبرة رصينة، يجيب أسئلة المشتري قبل الاجتماع.",
        en: "Arabic and English content in a measured tone, answering the buyer's questions before the meeting.",
      },
    ],
    faq: [
      {
        q: { ar: "هل لينكدإن مناسب لشركتنا؟", en: "Is LinkedIn right for our company?" },
        a: {
          ar: "إن كنت تبيع لشركات أو جهات، فهو غالبًا أدقّ قناة للوصول إلى صانع القرار، رغم أن نقرته أغلى. نختبره بميزانية صغيرة أولًا ونقرّر بالأرقام.",
          en: "If you sell to companies or entities, it's often the most precise way to reach the decision-maker, even though clicks cost more. We test it on a small budget first and decide by the numbers.",
        },
      },
      {
        q: { ar: "هل تبقى الحسابات باسمنا؟", en: "Do the accounts stay in our name?" },
        a: {
          ar: "نعم. الحسابات الإعلانية وأدوات القياس باسم شركتك، ونعمل عليها بصلاحية تمنحها وتستطيع سحبها في أي وقت.",
          en: "Yes. Ad accounts and analytics are in your company's name, and we work on them with access you grant and can revoke at any time.",
        },
      },
    ],
  },

  /* ─────────── أبوظبي × السيو ─────────── */
  {
    service: "seo",
    city: "abu-dhabi",
    title: {
      ar: "شركة سيو في أبوظبي",
      en: "SEO company in Abu Dhabi",
    },
    description: {
      ar: "تحسين محركات البحث لشركات أبوظبي: أن يجدك المشتري المؤسسي حين يبحث عن خدمتك بالعربية أو الإنجليزية، بصفحات تجيب أسئلته وموقع تقرؤه محركات البحث كاملًا.",
      en: "SEO for Abu Dhabi companies: being found by institutional buyers when they search for your service in Arabic or English, with pages that answer their questions and a site search engines read in full.",
    },
    h1: {
      ar: ["سيو لشركتك في أبوظبي", "حين يبحث عنك المشتري."],
      en: ["SEO for your Abu Dhabi company,", "for when the buyer searches."],
    },
    intro: {
      ar: "قبل أن تدعو جهة في أبوظبي شركةً إلى تسجيل مورّد أو تقديم عرض، يبحث أحد موظفيها غالبًا عن الخدمة في جوجل ليعرف من يقدّمها. وإن لم تظهر شركتك في تلك اللحظة، فهي ليست على القائمة أصلًا، مهما كانت خبرتها. السيو لشركة في أبوظبي يعني أن تكون موجودًا في هذه اللحظة: على الكلمات التي يكتبها المشتري المؤسسي، بالعربية والإنجليزية، ومعها اسم الإمارة أو القطاع. نبدأ ببحث كلمات من بيانات جوجل الفعلية، ونفحص الموقع تقنيًا لنتأكّد أن محركات البحث تقرأ كل صفحاته، ثم نبني صفحة لكل خدمة وقطاع مهمّ تجيب الأسئلة التي يطرحها المشتري قبل أن يتواصل: الخبرة، والمشاريع، والشهادات، وطريقة العمل. ونجهّز المحتوى ليُقتبس في إجابات الذكاء الاصطناعي، ونقيس النجاح بالطلبات التي جاءت من البحث، لا بترتيب كلمة لا يبحث عنها أحد.",
      en: "Before an Abu Dhabi entity invites a company to register as a vendor or submit a proposal, someone there usually searches Google for the service to see who provides it. If your company doesn't appear in that moment, it isn't on the list at all, however experienced it is. SEO for an Abu Dhabi company means being present in that moment: on the keywords an institutional buyer types, in Arabic and English, alongside the emirate or sector name. We start with keyword research from actual Google data, audit the site technically to make sure search engines read every page, then build a page for each important service and sector that answers what the buyer asks before getting in touch: experience, projects, certifications, ways of working. We prepare the content to be quoted in AI answers, and measure success in enquiries that came from search, not the ranking of a keyword nobody searches for.",
    },
    painPoints: [
      {
        title: { ar: "غياب في لحظة البحث", en: "Absent at the moment of search" },
        body: {
          ar: "المشتري يبحث مرّة واحدة حين يحتاج الخدمة. الشركة التي لا تظهر حينها لا تدخل المقارنة أصلًا.",
          en: "A buyer searches once, when they need the service. A company that doesn't appear then never enters the comparison.",
        },
      },
      {
        title: { ar: "صفحة واحدة لكل الخدمات", en: "One page for every service" },
        body: {
          ar: "صفحة «خدماتنا» تعدّد عشر خدمات في سطور. محرك البحث لا يعرف بأيّها يُظهرك، فلا يُظهرك في أيّها.",
          en: "A \"Services\" page listing ten services in a few lines. The search engine can't tell which to show you for, so it shows you for none.",
        },
      },
      {
        title: { ar: "موقع لا تقرؤه محركات البحث كاملًا", en: "A site search engines can't fully read" },
        body: {
          ar: "مشكلات تقنية صامتة — صفحات محجوبة أو محتوى يُبنى بعد التحميل — تُخفي نصف الموقع عن جوجل دون أن يلاحظ أحد.",
          en: "Silent technical problems — blocked pages or content built after load — hide half the site from Google without anyone noticing.",
        },
      },
    ],
    approach: [
      {
        ar: "فحص تقني أولًا، لنتأكّد أن كل صفحة يمكن أن تُفهرس قبل أن نكتب حرفًا.",
        en: "A technical audit first, to make sure every page can be indexed before we write a word.",
      },
      {
        ar: "صفحة لكل خدمة وقطاع مهمّ، بالعربية والإنجليزية، تجيب أسئلة المشتري المؤسسي.",
        en: "A page for each important service and sector, in Arabic and English, answering the institutional buyer's questions.",
      },
      {
        ar: "تقرير شهري من Search Console بالظهور والنقرات والطلبات.",
        en: "A monthly Search Console report on impressions, clicks and enquiries.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تضمنون المركز الأول؟", en: "Do you guarantee the first position?" },
        a: {
          ar: "لا، ولا يستطيع أحد أن يضمنه بصدق. نضمن عملًا واضحًا وقياسًا شفّافًا، ونقول لك كل شهر ما تغيّر وما لم يتغيّر.",
          en: "No, and nobody can honestly guarantee it. We guarantee clear work and transparent measurement, and tell you each month what changed and what didn't.",
        },
      },
      {
        q: { ar: "هل نحتاج إلى مدوّنة؟", en: "Do we need a blog?" },
        a: {
          ar: "ليس دائمًا. لشركة تبيع لجهات، صفحات الخدمات والقطاعات والمشاريع أهمّ غالبًا من مقالات عامة. نقترح المدوّنة حين يبحث جمهورك عن أسئلة تستحق الإجابة.",
          en: "Not always. For a company selling to entities, service, sector and project pages usually matter more than general articles. We suggest a blog when your audience searches for questions worth answering.",
        },
      },
    ],
  },

  /* ─────────── أبوظبي × البروفايل ─────────── */
  {
    service: "company-profile",
    city: "abu-dhabi",
    title: {
      ar: "تصميم بروفايل شركات في أبوظبي",
      en: "Company profile design in Abu Dhabi",
    },
    description: {
      ar: "تصميم بروفايل الشركات في أبوظبي لتسجيل المورّدين والتأهيل لدى الجهات الحكومية وشركات الطاقة: عربية رسمية وإنجليزية، ومشاريع بأرقامها، وشهادات ظاهرة.",
      en: "Company profile design in Abu Dhabi for vendor registration and pre-qualification with government entities and energy companies: formal Arabic and English, projects with figures, certifications in view.",
    },
    h1: {
      ar: ["بروفايل لشركتك في أبوظبي", "يجتاز التأهيل من القراءة الأولى."],
      en: ["A company profile in Abu Dhabi", "that passes pre-qualification on first read."],
    },
    intro: {
      ar: "في أبوظبي يكاد كل عقد مع جهة حكومية أو شبه حكومية أو شركة طاقة يبدأ بالبروفايل: يُرفع على بوّابة تسجيل المورّدين، أو يُرفق بملف التأهيل، أو يُرسل قبل الاجتماع الأول. ومن يقرؤه لجنة تراجع ملفات كثيرة بقائمة تحقّق واضحة: الترخيص والنشاط، والهيكل الإداري والفريق، والمشاريع المماثلة بقيمتها ومدّتها ودورك فيها، والشهادات مثل أنظمة الجودة والسلامة والبيئة، والسياسات. البروفايل الذي يخبّئ هذه البنود بين صفحات الرؤية والقيم يأخذ درجة أقل، حتى لو كانت الشركة مؤهّلة تمامًا. نصمّم البروفايل بترتيب قائمة التحقّق نفسها، بعربية رسمية مكتوبة بعناية وإنجليزية بنفس المستوى، ومشاريع مفصّلة في جداول تُقرأ بسرعة، وصفحة للشهادات لا تُفوَّت. ونسلّمه بنسختين: خفيفة للرفع على البوّابات بحدود حجمها، وكاملة للطباعة والاجتماعات.",
      en: "In Abu Dhabi almost every contract with a government or semi-government entity or energy company begins with the company profile: uploaded to a vendor-registration portal, attached to a pre-qualification file, or sent before the first meeting. Its reader is a committee working through many files against a clear checklist: licence and activity, management structure and team, similar projects with their value, duration and your role, certifications such as quality, safety and environmental systems, and policies. A profile that hides these items between pages of vision and values scores lower, even when the company is fully qualified. We design the profile in the order of that checklist, in carefully written formal Arabic with English at the same standard, projects set out in tables that read quickly, and a certifications page nobody can miss. We deliver it in two versions: a light one for uploading within portal size limits, and a full one for print and meetings.",
    },
    painPoints: [
      {
        title: { ar: "ملف أكبر من حدّ البوّابة", en: "A file bigger than the portal allows" },
        body: {
          ar: "بوّابات تسجيل المورّدين تحدّد حجم الملف. بروفايل ثقيل يُضغط في آخر لحظة فتتشوّه صوره، أو يُرفض الرفع أصلًا.",
          en: "Vendor portals cap file size. A heavy profile gets compressed at the last minute and its images break, or the upload is rejected outright.",
        },
      },
      {
        title: { ar: "الشهادات في صفحة أخيرة", en: "Certifications on the last page" },
        body: {
          ar: "شهادات الجودة والسلامة من أوّل ما تبحث عنه اللجنة، وكثيرًا ما تأتي في صفحة أخيرة صغيرة أو لا تُذكر.",
          en: "Quality and safety certifications are among the first things a committee looks for, and they often sit on a small last page or aren't mentioned at all.",
        },
      },
      {
        title: { ar: "مشاريع لا تُقارَن", en: "Projects that can't be compared" },
        body: {
          ar: "قائمة مشاريع بأسماء فقط لا تساعد اللجنة على المقارنة. القيمة والمدّة والدور هي ما يحسم التقييم.",
          en: "A list of project names alone doesn't help a committee compare. Value, duration and role are what settle the evaluation.",
        },
      },
    ],
    approach: [
      {
        ar: "نرتّب البروفايل بقائمة التحقّق التي تستخدمها الجهات التي تتقدّم إليها.",
        en: "We order the profile by the checklist the entities you apply to actually use.",
      },
      {
        ar: "نسخة خفيفة ضمن حدود البوّابات، ونسخة كاملة للطباعة، من تصميم واحد.",
        en: "A light version within portal limits and a full print version, from one design.",
      },
      {
        ar: "عربية رسمية مكتوبة وإنجليزية بنفس المستوى، ولا يدخل رقم لم تعتمده.",
        en: "Formal Arabic written with care and English at the same standard, with no figure going in that you haven't approved.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تكتبون محتوى البروفايل؟", en: "Do you write the profile content?" },
        a: {
          ar: "نعم، من اجتماع معك ومن مستنداتك: الترخيص، وقائمة المشاريع، والشهادات، والسير الذاتية للفريق. أنت تراجع وتعتمد قبل التصميم النهائي.",
          en: "Yes, from a meeting with you and your documents: licence, project list, certifications, and team CVs. You review and approve before the final design.",
        },
      },
      {
        q: { ar: "هل يصلح بروفايل واحد لأكثر من جهة؟", en: "Can one profile serve several entities?" },
        a: {
          ar: "نبني ملفًا أساسيًا، ونُعدّ منه نسخًا مختصرة لجهات أو قطاعات بعينها حين تختلف متطلّباتها.",
          en: "We build a master file and derive shorter versions for specific entities or sectors when their requirements differ.",
        },
      },
      {
        q: { ar: "كم يستغرق البروفايل؟", en: "How long does a profile take?" },
        a: {
          ar: "يعتمد على عدد الصفحات وجاهزية المعلومات. نحدّد المدّة مكتوبةً في العرض، وأطول ما يؤخّر البروفايل عادةً هو جمع بيانات المشاريع، فنبدأ به.",
          en: "It depends on page count and how ready the information is. We set the timeline in writing in the proposal; the usual hold-up is gathering project data, so we start there.",
        },
      },
    ],
  },

  /* ─────────── الشارقة × البروفايل ─────────── */
  {
    service: "company-profile",
    city: "sharjah",
    title: {
      ar: "تصميم بروفايل شركات في الشارقة",
      en: "Company profile design in Sharjah",
    },
    description: {
      ar: "تصميم بروفايل المصانع والموردين في الشارقة: منتجات وطاقة إنتاجية وشهادات في ملف عربي وإنجليزي، يُرسل للموزّع والمشتري في الداخل والخارج ويُطبع للمعارض.",
      en: "Company profile design for Sharjah manufacturers and suppliers: products, capacity and certifications in an Arabic and English file sent to distributors and buyers at home and abroad, and printed for exhibitions.",
    },
    h1: {
      ar: ["بروفايل لمصنعك أو شركتك في الشارقة", "يبيع قبل أن تزور."],
      en: ["A profile for your Sharjah factory or firm", "that sells before you visit."],
    },
    intro: {
      ar: "البروفايل في الشارقة يُكتب غالبًا لقارئ مختلف عن دبي وأبوظبي: موزّع في مدينة أخرى، أو مشترٍ في دولة خليجية أو أفريقية، أو سلسلة متاجر تبحث عن مورّد، أو مقاول يحتاج موادّ بكمّيات ومواصفات ثابتة. هذا القارئ لا يريد أن يعرف رؤيتك أولًا، بل: ماذا تصنع أو تورّد، وبأي مواصفات ومقاسات، وما طاقتك الإنتاجية، وما الشهادات التي يحملها منتجك، وفي أي أسواق يُباع، وكيف يطلب منك. نصمّم بروفايل المصانع والموردين في الشارقة حول هذه الأسئلة: منتجات معروضة ككتالوج مختصر بصورها ومواصفاتها، وصفحة للطاقة الإنتاجية والمرافق، وصفحة للشهادات والجودة، وخريطة للأسواق، وصفحة طلب واضحة. بالعربية والإنجليزية معًا لأن نصف قرّائه غالبًا خارج الدولة، ونسخة خفيفة للإرسال على الواتساب والبريد ونسخة للطباعة في المعارض.",
      en: "In Sharjah a company profile is usually written for a different reader than in Dubai or Abu Dhabi: a distributor in another city, a buyer in another Gulf or African country, a retail chain looking for a supplier, or a contractor needing materials in steady quantities and specifications. That reader doesn't want your vision first, but: what you make or supply, to what specifications and sizes, what your production capacity is, what certifications your product carries, which markets it sells in, and how to order. We design profiles for Sharjah manufacturers and suppliers around those questions: products shown like a short catalogue with photos and specifications, a page on capacity and facilities, a page on certifications and quality, a map of markets, and a clear ordering page. In Arabic and English together, because half its readers are often outside the country, with a light version for WhatsApp and email and a print version for exhibitions.",
    },
    painPoints: [
      {
        title: { ar: "منتجات بلا مواصفات", en: "Products without specifications" },
        body: {
          ar: "صور منتجات جميلة بلا مقاسات ولا موادّ ولا شهادات. المشتري الجادّ يحتاج المواصفات ليطلب عرض سعر.",
          en: "Attractive product photos with no sizes, materials or certifications. A serious buyer needs the specifications to request a quote.",
        },
      },
      {
        title: { ar: "الطاقة الإنتاجية غائبة", en: "Production capacity missing" },
        body: {
          ar: "الموزّع يسأل أولًا: هل تستطيع التوريد بالكمّية التي أحتاجها وبانتظام؟ بروفايل لا يجيب يُستبعد لصالح مصنع أصغر أجاب.",
          en: "A distributor's first question: can you supply the quantity I need, reliably? A profile that doesn't answer loses to a smaller factory that did.",
        },
      },
      {
        title: { ar: "ملف بلغة واحدة لمشترٍ أجنبي", en: "A one-language file for a foreign buyer" },
        body: {
          ar: "بروفايل عربي فقط يُرسَل لمشترٍ في الخارج، فيُترجم بأداة آلية ويفقد كل ما كان مقنعًا فيه.",
          en: "An Arabic-only profile sent to a buyer abroad gets run through a machine translator and loses everything that made it convincing.",
        },
      },
    ],
    approach: [
      {
        ar: "نبدأ بالمنتجات ومواصفاتها والطاقة الإنتاجية، ثم نضع التاريخ حيث يبني الثقة لا حيث يؤخّر القارئ.",
        en: "We start with products, specifications and capacity, then place the history where it builds trust rather than where it delays the reader.",
      },
      {
        ar: "العربية والإنجليزية في ملف واحد متوازن، ولكلٍّ منهما نصّ مكتوب لا مترجم.",
        en: "Arabic and English in one balanced file, each written as an original rather than translated.",
      },
      {
        ar: "نسخة خفيفة للواتساب والبريد، ونسخة للطباعة في المعارض.",
        en: "A light version for WhatsApp and email, and a print version for exhibitions.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تصوّرون المنتجات والمصنع؟", en: "Do you photograph the products and factory?" },
        a: {
          ar: "نرتّب التصوير حين يحتاجه المشروع، أو نعمل على صورك الحالية ونقول لك بصراحة إن كانت تكفي أم تُضعف الملف.",
          en: "We arrange photography when the project needs it, or work with your existing photos and tell you honestly whether they're enough or weaken the file.",
        },
      },
      {
        q: { ar: "هل يمكن أن نلتقي؟", en: "Can we meet in person?" },
        a: {
          ar: "نعم، مكتبنا في عجمان على بُعد دقائق من الشارقة، ونزور المصنع حين يحتاج المشروع ذلك بموعد مسبق.",
          en: "Yes, our office in Ajman is minutes from Sharjah, and we visit the factory by appointment when the project needs it.",
        },
      },
    ],
  },

  /* ─────────── الشارقة × التسويق الرقمي ─────────── */
  {
    service: "digital-marketing",
    city: "sharjah",
    title: {
      ar: "شركة تسويق رقمي في الشارقة",
      en: "Digital marketing agency in Sharjah",
    },
    description: {
      ar: "تسويق رقمي لشركات الشارقة: محتوى عربي يحترم جمهور الإمارة، وحملات بحث وخرائط تصل إلى عميل قريب، وقياس بالرسائل والاتصالات لا بالإعجابات.",
      en: "Digital marketing for Sharjah companies: Arabic content that respects the emirate's audience, search and Maps campaigns that reach nearby customers, and measurement in messages and calls rather than likes.",
    },
    h1: {
      ar: ["تسويق رقمي في الشارقة", "بلغة جمهورها."],
      en: ["Digital marketing in Sharjah,", "in its audience's language."],
    },
    intro: {
      ar: "جمهور الشارقة عائلي في أغلبه، عربي أولًا، يقدّر المحتوى المحترم ويبتعد عن الإعلان الصاخب. وهذا ما تتجاهله حملات كثيرة تُنسخ من دبي كما هي: نفس الصور ونفس النبرة ونفس الاستهداف، فتصرف الميزانية ولا تصل. نبني التسويق الرقمي لشركات الشارقة على ما يناسب سوقها فعلًا: محتوى عربي مكتوب بنبرة تحترم الجمهور وقيمه، وحضور قوي على خرائط جوجل لأن كثيرًا من البحث في الإمارة محلّي وقريب، وحملات بحث تستهدف من يبحث عن خدمتك في الشارقة وما حولها. ولأن كثيرًا من شركات الشارقة مدارس ومراكز تعليمية وعيادات ومحلّات وموردون، نبني الحملة على طريقة شراء عميلك تحديدًا: ولي أمر يقارن بين مدارس، أو مقاول يبحث عن مورّد، أو عائلة تبحث عن عيادة قريبة. ونقيس النتيجة بالرسائل والاتصالات وطلبات الزيارة، ونرسل لك تقريرًا شهريًا واضحًا بما نجح وما لم ينجح.",
      en: "Sharjah's audience is largely family-oriented and Arabic-first, values respectful content and steers away from loud advertising. Many campaigns ignore this, copied from Dubai as they are: same images, same tone, same targeting — spending the budget without reaching anyone. We build digital marketing for Sharjah companies on what actually suits its market: Arabic content written in a tone that respects the audience and its values, a strong Google Maps presence because much searching in the emirate is local and nearby, and search campaigns targeting people looking for your service in and around Sharjah. Because many Sharjah businesses are schools and education centres, clinics, shops and suppliers, we build the campaign on how your specific customer buys: a parent comparing schools, a contractor looking for a supplier, a family searching for a nearby clinic. We measure results in messages, calls and visit requests, and send you a clear monthly report on what worked and what didn't.",
    },
    painPoints: [
      {
        title: { ar: "حملات منسوخة من دبي", en: "Campaigns copied from Dubai" },
        body: {
          ar: "نبرة وصور صُمّمت لجمهور آخر تبدو غريبة على جمهور الشارقة، فيتجاهلها حتى من يحتاج الخدمة.",
          en: "A tone and imagery designed for another audience feel out of place to Sharjah's, so even people who need the service ignore them.",
        },
      },
      {
        title: { ar: "غياب عن البحث القريب", en: "Missing from nearby search" },
        body: {
          ar: "من يبحث عن خدمة «قريبة منّي» في الشارقة يرى الخرائط أولًا. بطاقة غير مكتملة تعني أن العميل القريب يذهب لغيرك.",
          en: "Someone searching for a service \"near me\" in Sharjah sees Maps first. An incomplete listing means the nearby customer goes elsewhere.",
        },
      },
      {
        title: { ar: "نتائج لا تُقاس", en: "Results nobody measures" },
        body: {
          ar: "إعجابات ومتابعون، ولا أحد يعرف كم اتصالًا أو زيارة جاءت من الحملة. بلا قياس، القرار التالي تخمين.",
          en: "Likes and followers, and nobody knows how many calls or visits the campaign brought. Without measurement, the next decision is a guess.",
        },
      },
    ],
    approach: [
      {
        ar: "محتوى عربي مكتوب لجمهور الشارقة، بنبرة تحترمه وتخاطبه مباشرة.",
        en: "Arabic content written for Sharjah's audience, in a tone that respects and speaks to it directly.",
      },
      {
        ar: "خرائط جوجل وحملات بحث محلّية أولًا، لأنها أقرب طريق إلى عميل قريب.",
        en: "Google Maps and local search campaigns first, as the shortest route to a nearby customer.",
      },
      {
        ar: "تقرير شهري بالاتصالات والرسائل وتكلفة كل طلب.",
        en: "A monthly report on calls, messages and cost per enquiry.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تعملون مع المدارس والمراكز التعليمية؟", en: "Do you work with schools and education centres?" },
        a: {
          ar: "نعم، ونبني حملاتها على مواسم التسجيل وأسئلة أولياء الأمور الفعلية، مع الالتزام بما تشترطه الجهات المنظّمة في الإعلان التعليمي.",
          en: "Yes, and we build their campaigns around enrolment seasons and parents' real questions, while respecting what regulators require of education advertising.",
        },
      },
      {
        q: { ar: "ما أقل ميزانية تنصحون بها؟", en: "What's the smallest budget you'd recommend?" },
        a: {
          ar: "نقترح شهر اختبار بميزانية محدودة بعد دراسة سوقك، ونقرّر التوسّع بالأرقام بعده لا قبله.",
          en: "We suggest a one-month test on a limited budget after studying your market, and decide on scaling with the numbers afterwards, not before.",
        },
      },
    ],
  },

  /* ─────────── عجمان × الهوية ─────────── */
  {
    service: "branding",
    city: "ajman",
    title: {
      ar: "تصميم هوية بصرية في عجمان",
      en: "Brand identity design in Ajman",
    },
    description: {
      ar: "تصميم هوية بصرية لشركات عجمان من مكتبنا في الراشدية: علامة بالعربية والإنجليزية تجعل الشركة الصغيرة تُعامل بجدّية، ودليل استخدام وملفات مصدرية باسمك.",
      en: "Brand identity design for Ajman companies from our Al Rashidiya office: an Arabic and English mark that gets a small company taken seriously, with a usage guide and source files in your name.",
    },
    h1: {
      ar: ["هوية لشركتك في عجمان", "تجعلها تُعامل بحجم أكبر."],
      en: ["An identity for your Ajman company", "that gets it treated as bigger."],
    },
    intro: {
      ar: "أغلب الشركات التي نعمل معها في عجمان صغيرة أو متوسطة، تنافس شركات في دبي والشارقة أكبر منها حجمًا وميزانية. والهوية البصرية هي أرخص طريقة لسدّ جزء من هذه الفجوة: العميل لا يرى عدد موظفيك ولا مساحة مكتبك، بل يرى شعارك وبطاقتك وموقعك وبروفايلك، ويحكم من خلالها. الهوية المرتجلة — شعار من موقع قوالب، وألوان تتغيّر من منشور لآخر — تجعل الشركة الجادّة تبدو مؤقتة. نصمّم هوية تعمل بالعربية والإنجليزية بوزن واحد، بنظام ألوان وخطوط بسيط يستطيع فريقك الصغير الالتزام به دون مصمّم، ونطبّقها على ما يراه عميلك أولًا: بطاقة الأعمال الرقمية، وصفحات السوشيال، والموقع، والبروفايل، والواجهة إن وُجدت. ونسلّم دليل استخدام مختصرًا وكل الملفات المصدرية باسمك. ومكتبنا في الراشدية، فنجلس معك ونرسم من فهم حقيقي لعملك.",
      en: "Most of the companies we work with in Ajman are small or mid-sized, competing with Dubai and Sharjah firms bigger in size and budget. A brand identity is the cheapest way to close part of that gap: a customer doesn't see your headcount or office size, but your logo, card, website and profile — and judges by them. An improvised identity — a logo from a template site, colours that change from post to post — makes a serious company look temporary. We design an identity that works in Arabic and English at one weight, with a simple colour and type system your small team can keep to without a designer, and apply it to what your customer sees first: a digital business card, social media pages, the website, the company profile, and your shopfront if you have one. We hand over a short usage guide and all source files in your name. And our office is in Al Rashidiya, so we sit with you and design from a real understanding of your business.",
    },
    painPoints: [
      {
        title: { ar: "شعار من قالب جاهز", en: "A logo from a template" },
        body: {
          ar: "الشعار المأخوذ من مكتبة قوالب يستخدمه آخرون أيضًا، ولا يمكن تسجيله كعلامة تجارية بثقة، ولا يقول شيئًا عن شركتك.",
          en: "A logo from a template library is used by others too, can't be registered as a trademark with confidence, and says nothing about your company.",
        },
      },
      {
        title: { ar: "هوية يصعب الالتزام بها", en: "An identity too hard to keep to" },
        body: {
          ar: "نظام معقّد بعشرة ألوان وأربعة خطوط لا يستطيع فريق صغير تطبيقه، فيُهجر بعد شهرين.",
          en: "A complex system with ten colours and four typefaces a small team can't apply, so it's abandoned within two months.",
        },
      },
      {
        title: { ar: "العربية ملحقة بالإنجليزية", en: "Arabic tacked onto English" },
        body: {
          ar: "في سوق ثنائي اللغة، الشعار الذي لا يعمل إلا بلغة واحدة يضعف في نصف استخداماته.",
          en: "In a bilingual market, a mark that only works in one language is weak in half its uses.",
        },
      },
    ],
    approach: [
      {
        ar: "نجلس معك في مكتبنا بعجمان ونفهم عملك وعملاءك قبل أي رسم.",
        en: "We sit with you at our Ajman office and understand your business and customers before drawing anything.",
      },
      {
        ar: "نظام بسيط يلتزم به فريق صغير: ألوان قليلة وخطّان، بالعربية والإنجليزية.",
        en: "A simple system a small team can keep to: few colours and two typefaces, in Arabic and English.",
      },
      {
        ar: "دليل استخدام مختصر وملفات مصدرية باسمك.",
        en: "A short usage guide and source files in your name.",
      },
    ],
    faq: [
      {
        q: { ar: "هل يمكن تصميم الهوية والموقع معًا؟", en: "Can you design the identity and website together?" },
        a: {
          ar: "نعم، وهو الأوفر غالبًا: الهوية تُبنى وهي تعرف أين ستُستخدم، والموقع يُبنى على هوية جاهزة لا تتغيّر في منتصفه.",
          en: "Yes, and it's usually the better value: the identity is built knowing where it will be used, and the site is built on an identity that won't change halfway through.",
        },
      },
      {
        q: { ar: "هل يمكن أن نزوركم؟", en: "Can we visit you?" },
        a: {
          ar: "نعم، مكتبنا في برج أمبرجيم بالراشدية 3 في عجمان، ونرتّب الموعد عبر الواتساب.",
          en: "Yes, our office is in Amber Gem Tower, Al Rashidiya 3, Ajman, and we arrange appointments over WhatsApp.",
        },
      },
    ],
  },

  /* ─────────── عجمان × السيو ─────────── */
  {
    service: "seo",
    city: "ajman",
    title: {
      ar: "شركة سيو في عجمان",
      en: "SEO company in Ajman",
    },
    description: {
      ar: "تحسين محركات البحث لشركات عجمان: أن تظهر أولًا في الخرائط والبحث حين يكتب عميلك خدمتك مع «عجمان» أو «الشارقة»، بصفحات محلّية وبطاقة جوجل مكتملة.",
      en: "SEO for Ajman companies: showing up first in Maps and search when customers type your service with \"Ajman\" or \"Sharjah\", with local pages and a complete Google listing.",
    },
    h1: {
      ar: ["سيو لشركتك في عجمان", "حيث المنافسة ما زالت ممكنة."],
      en: ["SEO for your Ajman company,", "where competition is still winnable."],
    },
    intro: {
      ar: "السيو في عجمان فرصة يغفل عنها كثيرون: المنافسة على البحث فيها أقل بكثير من دبي، والعملاء يبحثون باسم المدينة فعلًا — «شركة … في عجمان»، و«… قريب منّي»، و«… عجمان الشارقة». الشركة التي تبني صفحات واضحة لهذه البحوث، وتكمل بطاقتها على خرائط جوجل، يمكن أن تظهر في أعلى النتائج خلال شهور لا سنوات. وهذا ما نفعله نحن لأنفسنا قبل عملائنا: مكتبنا في الراشدية، وبطاقتنا على الخرائط، وصفحاتنا المحلية تُبنى بنفس الطريقة. نبدأ ببحث كلمات من بيانات جوجل لنعرف ما يكتبه عملاؤك فعلًا وبأي لغة، ثم نكمل بطاقة خرائط جوجل — الفئات والخدمات والصور وطلب التقييمات من عملائك الحقيقيين — ونبني صفحة لكل خدمة ومنطقة مهمّة، ونتأكّد أن الاسم والعنوان والهاتف متطابقة في كل مكان. ونقيس النجاح بالاتصالات والرسائل التي جاءت من البحث والخرائط، لا بترتيب كلمة لا تجلب أحدًا.",
      en: "SEO in Ajman is an opportunity many overlook: search competition here is far lower than in Dubai, and customers really do search by city name — \"… company in Ajman\", \"… near me\", \"… Ajman Sharjah\". A company that builds clear pages for these searches and completes its Google Maps listing can reach the top results in months, not years. It's what we do for ourselves before our clients: our office is in Al Rashidiya, our listing is on Maps, and our local pages are built the same way. We start with keyword research from Google's data to learn what your customers actually type and in which language, then complete your Google Maps listing — categories, services, photos, and asking real customers for reviews — build a page for each important service and area, and make sure your name, address and phone match everywhere. And we measure success in calls and messages that came from search and Maps, not the ranking of a keyword that brings nobody.",
    },
    painPoints: [
      {
        title: { ar: "بطاقة خرائط غير مكتملة", en: "An incomplete Maps listing" },
        body: {
          ar: "فئة واحدة عامة، بلا خدمات ولا صور ولا ردود على التقييمات. البطاقة الناقصة تخسر أمام منافس أكملها، حتى لو كان أبعد.",
          en: "One generic category, no services, no photos, no review replies. An incomplete listing loses to a competitor who completed theirs, even one further away.",
        },
      },
      {
        title: { ar: "موقع لا يذكر المدينة", en: "A site that never names the city" },
        body: {
          ar: "الموقع الذي لا يقول أين تعمل لا يظهر لمن يبحث باسم المدينة، وهو أقرب عميل إليك.",
          en: "A site that doesn't say where you work doesn't appear for people searching by city name — your nearest customers.",
        },
      },
      {
        title: { ar: "بيانات متضاربة", en: "Conflicting details" },
        body: {
          ar: "عنوان في الموقع، وآخر في الخرائط، وثالث في فيسبوك. جوجل يقرأ هذا التضارب على أنه ضعف في الثقة.",
          en: "One address on the website, another on Maps, a third on Facebook. Google reads that inconsistency as weak trust.",
        },
      },
    ],
    approach: [
      {
        ar: "بطاقة خرائط جوجل أولًا: الفئات والخدمات والصور والتقييمات الحقيقية.",
        en: "Google Maps listing first: categories, services, photos and genuine reviews.",
      },
      {
        ar: "صفحة لكل خدمة ومنطقة مهمّة، تذكر المدينة وتجيب أسئلة العميل المحلي.",
        en: "A page for each important service and area, naming the city and answering the local customer's questions.",
      },
      {
        ar: "اسم وعنوان وهاتف متطابقة في الموقع والخرائط والأدلة.",
        en: "Name, address and phone that match across the site, Maps and directories.",
      },
    ],
    faq: [
      {
        q: { ar: "كم يستغرق الظهور في الخرائط؟", en: "How long does it take to show up in Maps?" },
        a: {
          ar: "إكمال البطاقة يُحدث فرقًا خلال أسابيع غالبًا، والترتيب يتحسّن مع التقييمات والصفحات المحلية. لا نعد بمركز محدّد في تاريخ محدّد.",
          en: "Completing the listing usually makes a difference within weeks, and rankings improve with reviews and local pages. We don't promise a specific position by a specific date.",
        },
      },
      {
        q: { ar: "هل تكتبون تقييمات لنا؟", en: "Will you write reviews for us?" },
        a: {
          ar: "لا. التقييمات المكتوبة أو المشتراة مخالفة لسياسات جوجل وقد تُسقط البطاقة كلها. نساعدك أن تطلبها من عملائك الحقيقيين بطريقة سهلة.",
          en: "No. Written or bought reviews break Google's policies and can take down the whole listing. We help you ask your real customers for them in an easy way.",
        },
      },
    ],
  },

  /* ─────────── رأس الخيمة × المواقع ─────────── */
  {
    service: "web-development",
    city: "ras-al-khaimah",
    title: {
      ar: "شركة تصميم مواقع في رأس الخيمة",
      en: "Web design company in Ras Al Khaimah",
    },
    description: {
      ar: "تصميم مواقع لشركات رأس الخيمة: مصانع تصدّر للخارج بكتالوج ومواصفات بالإنجليزية، وفنادق ومطاعم تبيع للزائر قبل وصوله — مواقع سريعة بالعربية والإنجليزية.",
      en: "Websites for Ras Al Khaimah companies: manufacturers exporting abroad with an English catalogue and specs, and hotels and restaurants selling to visitors before they arrive — fast Arabic and English sites.",
    },
    h1: {
      ar: ["موقع لشركتك في رأس الخيمة", "يبيع لمن لم يصل بعد."],
      en: ["A website for your Ras Al Khaimah company", "that sells to people who haven't arrived yet."],
    },
    intro: {
      ar: "عميل كثير من شركات رأس الخيمة ليس في رأس الخيمة. المصنع في المنطقة الصناعية أو المنطقة الحرّة يبيع لمشترين في الخليج وأفريقيا وآسيا يقرّرون من مكاتبهم دون زيارة، والفندق أو المطعم أو منظّم الرحلات يبيع لزائر يخطّط من دبي أو من خارج الدولة قبل أن يصل. في الحالتين، الموقع هو أول ما يراه هذا العميل وأحيانًا الشيء الوحيد. لذلك نبني لشركات رأس الخيمة مواقع على طريقة شراء عميلها: للمصانع والموردين كتالوج منظّم بالإنجليزية أولًا ومعه العربية، فيه المواصفات والشهادات والطاقة الإنتاجية وطلب عرض سعر قصير؛ وللسياحة والضيافة صفحات بصور حقيقية، وأسئلة الزائر مجابة مسبقًا، وطريق مباشر إلى الحجز أو الواتساب. وفي الحالتين موقع سريع على الجوال، مهيّأ ليظهر في البحث باسم الإمارة، ومربوط بأدوات قياس تقول لك من أين جاء كل طلب.",
      en: "Many Ras Al Khaimah companies' customers aren't in Ras Al Khaimah. A factory in the industrial area or free zone sells to buyers in the Gulf, Africa and Asia who decide from their offices without visiting; a hotel, restaurant or tour operator sells to a visitor planning from Dubai or abroad before they arrive. Either way, the website is the first thing that customer sees and sometimes the only thing. So we build Ras Al Khaimah companies sites around how their customer buys: for manufacturers and suppliers, an organised catalogue in English first with Arabic alongside, carrying specifications, certifications, capacity and a short quote request; for tourism and hospitality, pages with real photos, the visitor's questions answered in advance, and a direct path to booking or WhatsApp. Either way, a site fast on mobile, set up to appear in searches naming the emirate, and wired to analytics that tell you where each enquiry came from.",
    },
    painPoints: [
      {
        title: { ar: "مشترٍ أجنبي لا يجد المواصفات", en: "A foreign buyer can't find specifications" },
        body: {
          ar: "المشتري في الخارج لا يتّصل ليسأل؛ يغلق الموقع ويذهب لمصنع آخر عرض مواصفاته وشهاداته بالإنجليزية بوضوح.",
          en: "A buyer abroad doesn't call to ask; they close the site and go to another factory that showed its specs and certifications clearly in English.",
        },
      },
      {
        title: { ar: "زائر يخطّط ولا يجد إجابة", en: "A visitor planning with no answers" },
        body: {
          ar: "الأسعار، والمواعيد، والموقع، وطريقة الحجز — حين لا يجدها الزائر يحجز في المكان الذي وجدها فيه.",
          en: "Prices, hours, location, how to book — when a visitor can't find them, they book wherever they did.",
        },
      },
      {
        title: { ar: "صور لا تشبه الواقع", en: "Photos that don't match reality" },
        body: {
          ar: "صور جاهزة من مكتبات الصور يتعرّف عليها الزائر، وتجعله يشكّ في كل ما بعدها.",
          en: "Stock photos a visitor recognises, which make them doubt everything after.",
        },
      },
    ],
    approach: [
      {
        ar: "نبني الموقع على طريقة شراء عميلك: كتالوج ومواصفات للمصنع، وإجابات وحجز للضيافة.",
        en: "We build the site on how your customer buys: catalogue and specs for a factory, answers and booking for hospitality.",
      },
      {
        ar: "الإنجليزية والعربية مكتوبتان كتابةً، ولكلٍّ منهما رابطها المفهرس.",
        en: "English and Arabic both written as originals, each with its own indexed URL.",
      },
      {
        ar: "كل طلب أو حجز يحمل مصدره، فتعرف أي صفحة وأي سوق يجلب العملاء.",
        en: "Every enquiry or booking carries its source, so you know which page and market brings customers.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تعملون مع شركات راكز؟", en: "Do you work with RAKEZ companies?" },
        a: {
          ar: "نعم، مع شركات المنطقة الحرّة والبرّ في رأس الخيمة. أغلب العمل يتم عن بُعد، ونلتقي بموعد مسبق حين يحتاج المشروع.",
          en: "Yes, with free zone and mainland companies in Ras Al Khaimah. Most work is remote, and we meet by appointment when the project needs it.",
        },
      },
      {
        q: { ar: "هل يمكن ربط الموقع بنظام حجز؟", en: "Can the site connect to a booking system?" },
        a: {
          ar: "نعم، نربطه بنظام الحجز الذي تستخدمه، أو نجعل الواتساب طريق الحجز المباشر حين يكون ذلك أنسب لحجم عملك.",
          en: "Yes, we connect it to the booking system you use, or make WhatsApp the direct booking route when that suits the size of your business better.",
        },
      },
    ],
  },

  /* ─────────── الفجيرة × المواقع ─────────── */
  {
    service: "web-development",
    city: "fujairah",
    title: {
      ar: "شركة تصميم مواقع في الفجيرة",
      en: "Web design company in Fujairah",
    },
    description: {
      ar: "تصميم مواقع لشركات الفجيرة في الشحن والخدمات البحرية واللوجستيات والسياحة: إنجليزية أولًا لعميل يقرّر من الخارج، وعربية بجانبها، وطلب خدمة في خطوة واحدة.",
      en: "Websites for Fujairah companies in shipping, marine services, logistics and tourism: English first for clients deciding from abroad, Arabic alongside, and a one-step service request.",
    },
    h1: {
      ar: ["موقع لشركتك في الفجيرة", "يقنع عميلًا في ميناء آخر."],
      en: ["A website for your Fujairah company", "that convinces a client in another port."],
    },
    intro: {
      ar: "كثير من شركات الفجيرة تعمل حول الميناء: شحن ووكالات بحرية، وتزويد سفن، وخدمات فنية، ولوجستيات وتخزين. وعميلها مالك سفينة أو مدير أسطول أو وكيل في دولة أخرى، يختار مزوّد الخدمة في ساعات وأحيانًا في دقائق، ويقرأ بالإنجليزية، ويريد أن يعرف بسرعة: ما الخدمات التي تقدّمها في الفجيرة تحديدًا، وما شهاداتك وموافقاتك، ومنذ متى تعمل، وكيف يصل إليك الآن. الموقع الذي يحتاج دقائق ليجيب عن ذلك يخسر الطلب لمنافس أسرع. نبني لشركات الفجيرة مواقع تجيب في الشاشة الأولى: الخدمات مقسّمة بوضوح، والشهادات والموافقات ظاهرة، وأرقام التواصل والواتساب على مدار اليوم حين يكون ذلك صحيحًا، ونموذج طلب خدمة قصير. بالإنجليزية أولًا والعربية بجانبها. وللسياحة على الساحل الشرقي — الفنادق والغوص والرحلات الجبلية — نبني صفحات بصور حقيقية وطريق مباشر إلى الحجز.",
      en: "Many Fujairah companies work around the port: shipping and marine agencies, bunkering, technical services, logistics and storage. Their client is a ship owner, fleet manager or agent in another country who picks a service provider in hours, sometimes minutes, reads English, and wants to know quickly: which services you provide in Fujairah specifically, what certifications and approvals you hold, how long you've operated, and how to reach you now. A site that takes minutes to answer that loses the job to a faster competitor. We build Fujairah companies sites that answer on the first screen: services clearly divided, certifications and approvals visible, round-the-clock phone and WhatsApp contact where that's true, and a short service-request form. In English first with Arabic alongside. And for east-coast tourism — hotels, diving, mountain trips — we build pages with real photos and a direct path to booking.",
    },
    painPoints: [
      {
        title: { ar: "عميل مستعجل وموقع بطيء", en: "An urgent client and a slow site" },
        body: {
          ar: "طلب خدمة لسفينة في الميناء لا ينتظر. موقع بطيء أو مزدحم يعني أن الطلب ذهب لمن ردّ أولًا.",
          en: "A service request for a vessel in port doesn't wait. A slow or cluttered site means the job went to whoever answered first.",
        },
      },
      {
        title: { ar: "خدمات بلا تفاصيل", en: "Services without detail" },
        body: {
          ar: "قائمة خدمات بأسماء عامة لا تقول ما تقدّمه في الفجيرة تحديدًا ولا بأي موافقات. العميل الأجنبي يحتاج التفاصيل ليثق.",
          en: "A list of services by generic name that doesn't say what you provide in Fujairah specifically or under which approvals. A foreign client needs detail to trust you.",
        },
      },
      {
        title: { ar: "إنجليزية لا تليق بعميل دولي", en: "English unfit for an international client" },
        body: {
          ar: "قطاع الشحن دولي بطبيعته. نصّ إنجليزي ضعيف يضع الشركة في درجة أقل من منافسيها مهما كانت خبرتها.",
          en: "Shipping is international by nature. Weak English copy ranks the company below its competitors, whatever its experience.",
        },
      },
    ],
    approach: [
      {
        ar: "الشاشة الأولى تجيب: ماذا تقدّم في الفجيرة، وبأي موافقات، وكيف يصل إليك العميل الآن.",
        en: "The first screen answers: what you provide in Fujairah, under which approvals, and how a client reaches you now.",
      },
      {
        ar: "الإنجليزية تُكتب بمستوى عميل دولي، والعربية بجانبها.",
        en: "English written to an international client's standard, with Arabic alongside.",
      },
      {
        ar: "طلب خدمة قصير يصل فورًا إلى الواتساب أو البريد، ومعه مصدره.",
        en: "A short service request that reaches WhatsApp or email immediately, with its source.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تعملون مع شركات المنطقة الحرّة في الفجيرة؟", en: "Do you work with Fujairah free zone companies?" },
        a: {
          ar: "نعم، مع شركات المنطقة الحرّة والبرّ. أغلب العمل يتم عن بُعد، ونلتقي في الفجيرة بموعد مسبق حين يحتاج المشروع.",
          en: "Yes, with free zone and mainland companies. Most work is remote, and we meet in Fujairah by appointment when the project needs it.",
        },
      },
      {
        q: { ar: "هل يمكن أن يكون الموقع بالإنجليزية فقط؟", en: "Can the site be English only?" },
        a: {
          ar: "يمكن، وهو منطقي أحيانًا لشركات الشحن. لكن نسخة عربية مكتوبة تفيدك مع العملاء والجهات المحلية وفي البحث العربي.",
          en: "It can, and for shipping firms it sometimes makes sense. But a written Arabic version helps with local clients and entities, and in Arabic search.",
        },
      },
    ],
  },

  /* ─────────── أم القيوين × المواقع ─────────── */
  {
    service: "web-development",
    city: "umm-al-quwain",
    title: {
      ar: "شركة تصميم مواقع في أم القيوين",
      en: "Web design company in Umm Al Quwain",
    },
    description: {
      ar: "تصميم مواقع لشركات أم القيوين ومنطقتها الحرّة: شركة مرخّصة في الإمارة وتعمل في كل الدولة تحتاج موقعًا يكون مكتبها أمام العميل — بالعربية والإنجليزية.",
      en: "Websites for Umm Al Quwain and free zone companies: a company licensed in the emirate and working across the country needs a site that serves as its office in front of the client — in Arabic and English.",
    },
    h1: {
      ar: ["موقع لشركتك في أم القيوين", "هو مكتبك أمام العميل."],
      en: ["A website for your Umm Al Quwain company", "is your office in front of the client."],
    },
    intro: {
      ar: "كثير من الشركات المرخّصة في أم القيوين، وخاصة في منطقتها الحرّة، لا يزورها عملاؤها أبدًا: تعمل عن بُعد، أو تخدم عملاء في دبي والشارقة وخارج الدولة، أو تبيع عبر الإنترنت. لهذه الشركات، الموقع ليس واجهة إضافية بل هو المكتب الذي يدخله العميل، ومنه يقرّر إن كانت شركة حقيقية يمكن أن يدفع لها. وأول ما يبحث عنه: من أنتم، وما الذي تقدّمونه بالتفصيل، ومن عملاؤكم، وما رقم الترخيص، وكيف أتواصل مع شخص حقيقي. الموقع الذي يتهرّب من هذه الأسئلة يُقرأ على أنه شركة لا يُعتمد عليها. نبني لشركات أم القيوين مواقع تجيب عنها بوضوح: صفحة تعريف بأشخاص حقيقيين، وخدمات مفصّلة بأسعار تقريبية حين يكون ذلك ممكنًا، وأعمال وعملاء حقيقيون، وبيانات الترخيص، وطرق تواصل مباشرة. بالعربية والإنجليزية، سريعًا على الجوال، ومهيّأً ليظهر في البحث. والدومين والاستضافة باسم شركتك.",
      en: "Many companies licensed in Umm Al Quwain, especially in its free zone, are never visited by their customers: they work remotely, serve clients in Dubai, Sharjah and abroad, or sell online. For these companies the website isn't an extra storefront — it is the office the customer walks into, and where they decide whether this is a real company they can pay. The first things they look for: who you are, what exactly you offer, who your clients are, your licence number, and how to reach a real person. A site that dodges these questions reads as a company that can't be relied on. We build Umm Al Quwain companies sites that answer them plainly: an about page with real people, detailed services with indicative prices where possible, real work and clients, licence details, and direct ways to get in touch. In Arabic and English, fast on mobile, and set up to appear in search. Domain and hosting are in your company's name.",
    },
    painPoints: [
      {
        title: { ar: "شركة بلا وجوه", en: "A company without faces" },
        body: {
          ar: "موقع بلا أسماء ولا صور فريق ولا عنوان واضح يجعل العميل يتردّد قبل أن يدفع لشركة لم يرها.",
          en: "A site with no names, team photos or clear address makes a client hesitate before paying a company they've never seen.",
        },
      },
      {
        title: { ar: "خدمات غامضة", en: "Vague services" },
        body: {
          ar: "«حلول متكاملة لعملائنا» لا تقول شيئًا. العميل الذي لا يفهم ما تبيعه في ثوانٍ لا يسأل، بل يغادر.",
          en: "\"Integrated solutions for our clients\" says nothing. A customer who can't grasp what you sell in seconds doesn't ask — they leave.",
        },
      },
      {
        title: { ar: "لا طريق مباشر للتواصل", en: "No direct way to make contact" },
        body: {
          ar: "نموذج تواصل فقط بلا واتساب ولا هاتف يجعل الشركة تبدو بعيدة، وهي أصلًا شركة لا يزورها أحد.",
          en: "A contact form alone, with no WhatsApp or phone, makes a company feel distant — and it's already one nobody visits.",
        },
      },
    ],
    approach: [
      {
        ar: "نجعل الموقع يجيب أسئلة الثقة أولًا: من أنتم، وما ترخيصكم، ومن عملاؤكم.",
        en: "We make the site answer trust questions first: who you are, your licence, your clients.",
      },
      {
        ar: "خدمات مفصّلة بلغة العميل، وأسعار تقريبية حين يكون ذلك ممكنًا.",
        en: "Services detailed in the customer's language, with indicative prices where possible.",
      },
      {
        ar: "واتساب وهاتف وبريد ظاهرة في كل صفحة، وكل طلب يحمل مصدره.",
        en: "WhatsApp, phone and email visible on every page, with every enquiry carrying its source.",
      },
    ],
    faq: [
      {
        q: { ar: "هل تعملون مع شركات المنطقة الحرّة في أم القيوين؟", en: "Do you work with Umm Al Quwain free zone companies?" },
        a: {
          ar: "نعم، ومكتبنا في عجمان قريب من أم القيوين. نلتقي بموعد مسبق أو نعمل عن بُعد بالكامل.",
          en: "Yes, and our Ajman office is close to Umm Al Quwain. We meet by appointment or work fully remotely.",
        },
      },
      {
        q: { ar: "هل نحتاج متجرًا إلكترونيًا؟", en: "Do we need an online store?" },
        a: {
          ar: "إن كنت تبيع منتجات مباشرة للمستهلك فغالبًا نعم. وإن كنت تبيع خدمات أو لشركات، فموقع يقود إلى طلب عرض سعر يكون أنسب.",
          en: "If you sell products directly to consumers, usually yes. If you sell services or to businesses, a site that leads to a quote request fits better.",
        },
      },
    ],
  },
];

/* ── صفحة «خدماتنا في الإمارات» ── */
export const uaeHub = {
  label: { ar: "الإمارات", en: "UAE" } as Bi,
  title: {
    ar: ["مكتبنا في عجمان،", "وعملاؤنا في الإمارات السبع."],
    en: ["Our office is in Ajman,", "our clients across all seven emirates."],
  } as Bi<string[]>,
  intro: {
    ar: "دَعمة شركة عالمية مكتبها في الإمارات في عجمان، في برج أمبرجيم بالراشدية. نخدم الشركات في الإمارات السبع — أبوظبي، ودبي، والشارقة، وعجمان، وأم القيوين، ورأس الخيمة، والفجيرة — بالهوية البصرية، والمواقع، وبروفايلات الشركات، والسيو، والتسويق الرقمي. هذه الصفحة تجمع ما نقدّمه في كل إمارة والأعمال التي نفّذناها في السوق الإماراتي.",
    en: "Daamah is a global company whose UAE office is in Ajman, in Amber Gem Tower, Al Rashidiya. We serve companies across all seven emirates — Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah — with brand identity, websites, company profiles, SEO and digital marketing. This page gathers what we offer in each emirate and the work we've delivered in the UAE market.",
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
