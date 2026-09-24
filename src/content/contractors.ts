import type { Bi } from "../i18n";
import type { FaqItem } from "./faq";

/**
 * صفحة شركات المقاولات — `/contractors`.
 *
 * لماذا صفحة قطاع لا صفحة خدمة: المقاول لا يبحث عن «ملف تعريفي» بل
 * عن «بروفايل شركة مقاولات» يجتاز به التأهيل. الصفحات التي تتصدّر
 * هذا البحث اليوم مقالات عامة تقسّم المقاولين بالتخصّص، ولا واحدة
 * منها تشرح ما تطلبه لجنة التأهيل فعلًا. هذه الصفحة تبدأ من هناك.
 *
 * بنود التأهيل أدناه هي الأكثر تكرارًا في استبيانات تأهيل المقاولين
 * والمنافسات الحكومية — لا نصًّا رسميًّا لجهة بعينها. ولهذا تقول
 * الصفحة صراحةً إن المتطلبات تختلف، وإننا لا نُصدر هذه الوثائق.
 *
 * لا أسعار ولا مُدد هنا، كبقية صفحات الخدمات: العرض يُحدَّد بعد جلسة
 * النطاق. أسعار السوق العامة في مقال التكلفة.
 */

export type PrequalArea = { title: Bi; items: Bi };
export type Build = { title: Bi; body: Bi; href: string; link: Bi };

export const contractorsPath = "/contractors";

export const contractorsPage = {
  label: { ar: "شركات المقاولات", en: "Contractors" } as Bi,
  meta: {
    title: {
      ar: "بروفايل وموقع شركة مقاولات للتأهيل والمنافسات | دَعمة",
      en: "Contractor company profile & website for prequalification | Daamah",
    } as Bi,
    description: {
      ar: "تصميم بروفايل شركة مقاولات وموقعها بما تطلبه ملفات التأهيل: التصنيف والسجل والمشاريع بقيمها والمعدّات والسلامة والجودة، مرتّبة كما تقرؤها اللجنة.",
      en: "Company profiles and websites for contractors, built around what prequalification asks for: classification, projects with values, equipment, HSE and QA, in committee order.",
    } as Bi,
  },
  h1: {
    ar: ["بروفايل شركة المقاولات", "يُقرأ كما تقرؤه لجنة التأهيل."],
    en: ["A contractor's company profile,", "read the way a prequalification committee reads it."],
  } as Bi<string[]>,
  intro: {
    ar: "بروفايل شركة المقاولات ليس كتيّب صور مشاريع. هو أول مستند تفتحه لجنة التأهيل أو إدارة المشتريات، وتبحث فيه عن أشياء محدّدة: التصنيف والسجل التجاري، والمشاريع المنفّذة بقيمها وجهاتها، والمعدّات والكوادر، وسياسة السلامة والجودة. نصمّم لشركات المقاولات البروفايل والموقع الإلكتروني معًا على هذا الترتيب، بالعربية والإنجليزية، فيجد المراجع ما يبحث عنه في الصفحة التي يتوقّعها، ولا يُستبعد ملفك لأن معلومة موجودة لم تُعرض.",
    en: "A contractor's company profile is not a booklet of project photos. It is the first document a prequalification committee or procurement team opens, and they look for specific things: classification and commercial registration, completed projects with their values and owners, equipment and manpower, and the safety and quality policy. We design the profile and the website for contracting companies together in that order, in Arabic and English, so the reviewer finds what they're looking for on the page they expect it, and your file isn't set aside because something you have was never shown.",
  } as Bi,

  prequalLabel: { ar: "ما تطلبه ملفات التأهيل عادةً", en: "What prequalification usually asks for" } as Bi,
  prequalNote: {
    ar: "تختلف المتطلبات بين المنافسات الحكومية عبر منصة اعتماد، واستبيانات تأهيل المقاولين لدى الشركات الكبرى مثل أرامكو السعودية، وملفات المطوّرين العقاريين. هذه البنود هي الأكثر تكرارًا بينها. لا نُصدر هذه الوثائق ولا نتقدّم للمنافسات نيابةً عنك؛ عملنا أن تُعرض كاملة بترتيب واضح، وأن يُكتب ما حولها بلغة تُقنع.",
    en: "Requirements differ between government tenders on the Etimad platform, contractor prequalification questionnaires at large companies such as Saudi Aramco, and real estate developers' vendor files. These are the items that recur most across them. We don't issue these documents or bid on your behalf; our job is to present them completely and in a clear order, with the writing around them doing its part.",
  } as Bi,
  prequal: [
    {
      title: { ar: "النظامي", en: "Legal" },
      items: {
        ar: "السجل التجاري، وشهادة تصنيف المقاولين، وشهادات الزكاة والضريبة والتأمينات الاجتماعية، وعضوية الغرفة التجارية، والرخص البلدية.",
        en: "Commercial registration, contractor classification certificate, Zakat, VAT and GOSI certificates, Chamber of Commerce membership, and municipal licences.",
      },
    },
    {
      title: { ar: "التنظيم والكوادر", en: "Organisation and manpower" },
      items: {
        ar: "الهيكل التنظيمي، والسير الذاتية للكوادر الرئيسية، وأعداد العمالة موزّعة على التخصّصات.",
        en: "Organisation chart, CVs of key staff, and manpower broken down by trade.",
      },
    },
    {
      title: { ar: "الخبرة والمشاريع", en: "Experience and projects" },
      items: {
        ar: "مشاريع السنوات الأخيرة بقيمة كل عقد والجهة المالكة وتواريخ التنفيذ، وجهة يمكن الرجوع إليها في كل مشروع.",
        en: "Recent projects with each contract's value, the owner and the dates, plus a reference contact for each.",
      },
    },
    {
      title: { ar: "المعدّات", en: "Equipment" },
      items: {
        ar: "قائمة المعدّات المملوكة وحالتها، وما يُستأجر عند الحاجة.",
        en: "A list of owned equipment and its condition, and what is hired as needed.",
      },
    },
    {
      title: { ar: "السلامة", en: "Health and safety" },
      items: {
        ar: "سياسة السلامة وإجراءاتها والتدريب عليها، وإحصاءات الحوادث وساعات العمل.",
        en: "The HSE policy, procedures and training, with incident statistics and man-hours.",
      },
    },
    {
      title: { ar: "الجودة", en: "Quality" },
      items: {
        ar: "شهادات الأيزو إن وُجدت، وخطة ضبط الجودة وتأكيدها.",
        en: "ISO certificates where held, and the QA/QC plan.",
      },
    },
    {
      title: { ar: "المالية", en: "Financial" },
      items: {
        ar: "القوائم المالية المدقّقة، وخطابات البنوك، والالتزامات التعاقدية القائمة.",
        en: "Audited financial statements, bank letters, and current contractual commitments.",
      },
    },
  ] as PrequalArea[],

  buildsLabel: { ar: "ما نبنيه لشركات المقاولات", en: "What we build for contractors" } as Bi,
  builds: [
    {
      title: { ar: "بروفايل التأهيل", en: "The prequalification profile" },
      body: {
        ar: "بروفايل شركة مقاولات بالعربية والإنجليزية، مرتّب على بنود التأهيل لا على تاريخ الشركة. المشاريع معروضة بقيمها وجهاتها، ونسخة للطباعة وأخرى خفيفة للإرسال، ونسخة تحدّثها بنفسك حين يُضاف مشروع.",
        en: "A contractor's company profile in Arabic and English, ordered by prequalification items rather than company history. Projects shown with their values and owners, a print version and a light one for sending, and a version you update yourself when a project is added.",
      },
      href: "/services/company-profile",
      link: { ar: "تفاصيل خدمة البروفايل", en: "Company profile service" },
    },
    {
      title: { ar: "موقع الشركة", en: "The company website" },
      body: {
        ar: "موقع شركة مقاولات يجيب أسئلة المشتريات قبل أن تُطرح: السجل والتصنيف والعنوان الوطني، والمشاريع بقطاعاتها، والبروفايل قابلًا للتحميل، وواتساب مباشر لمن يريد السؤال. سريع على الجوال، والدومين باسمك.",
        en: "A contractor's website that answers procurement's questions before they're asked: registration, classification and national address, projects by sector, the profile ready to download, and direct WhatsApp for anyone with a question. Fast on mobile, with the domain in your name.",
      },
      href: "/services/web-development",
      link: { ar: "تفاصيل خدمة المواقع", en: "Website service" },
    },
    {
      title: { ar: "الحضور على المنصّات", en: "Presence on the platforms" },
      body: {
        ar: "صفحة شركة مكتملة على لينكدإن حيث يبحث الاستشاريون والمطوّرون، ومحتوى يعرض المشاريع أثناء التنفيذ لا بعد التسليم فقط، فيبقى اسمك حاضرًا بين منافسة وأخرى.",
        en: "A complete LinkedIn company page where consultants and developers look, and content that shows projects during execution rather than only at handover, so your name stays present between one tender and the next.",
      },
      href: "/services/social-media",
      link: { ar: "تفاصيل خدمة السوشيال ميديا", en: "Social media service" },
    },
  ] as Build[],

  painLabel: { ar: "ما نراه يتكرّر في ملفات المقاولين", en: "What we keep seeing in contractors' files" } as Bi,
  pain: [
    {
      title: { ar: "مشاريع بلا أرقام", en: "Projects without numbers" },
      body: {
        ar: "صورة مشروع بلا قيمة عقد ولا جهة مالكة ولا مدّة تنفيذ لا تفرّق بين من نفّذ فيلا ومن نفّذ مجمّعًا. اللجنة تقرأ الأرقام قبل الصور.",
        en: "A project photo with no contract value, owner or duration can't tell a villa from a compound. The committee reads numbers before pictures.",
      },
    },
    {
      title: { ar: "بروفايل مكتوب لكل الناس", en: "A profile written for everyone" },
      body: {
        ar: "فقرة «الجودة والالتزام والخبرة الطويلة» يكتبها كل مقاول، فلا يقرؤها أحد. الشهادات والإحصاءات والمشاريع المرجعية هي ما يُقرأ.",
        en: "The paragraph about \"quality, commitment and long experience\" is written by every contractor, so nobody reads it. Certificates, statistics and reference projects are what get read.",
      },
    },
    {
      title: { ar: "الموقع والبروفايل يتناقضان", en: "The website and the profile disagree" },
      body: {
        ar: "عدد مشاريع أو سنة تأسيس أو تصنيف مختلف بين المستندين يثير سؤالًا لا تريده في مرحلة التأهيل. نبنيهما من مصدر واحد.",
        en: "A different project count, founding year or classification between the two documents raises a question you don't want at prequalification. We build both from one source.",
      },
    },
  ],

  stepsLabel: { ar: "كيف نعمل", en: "How we work" } as Bi,
  steps: [
    {
      title: { ar: "جمع المستندات", en: "Gathering documents" },
      body: {
        ar: "نستلم ما لديك من شهادات ومشاريع وقوائم، ونحدّد معك الجهة التي يُكتب لها الملف أولًا.",
        en: "We collect your certificates, projects and lists, and agree with you which entity the file is written for first.",
      },
    },
    {
      title: { ar: "الترتيب والكتابة", en: "Structure and writing" },
      body: {
        ar: "نرتّب الأقسام على بنود تلك الجهة، ونكتب النصوص، وتراجعها قبل التصميم.",
        en: "We order the sections around that entity's items, write the copy, and you review it before design.",
      },
    },
    {
      title: { ar: "التصميم بلغتين", en: "Design in two languages" },
      body: {
        ar: "نصمّم العربية والإنجليزية معًا على هويتك، ونبني الموقع من المصدر نفسه.",
        en: "We design Arabic and English together on your identity, and build the website from the same source.",
      },
    },
    {
      title: { ar: "التسليم", en: "Handover" },
      body: {
        ar: "نسخة طباعة، ونسخة إرسال، ونسخة قابلة للتحديث، والموقع منشورًا باسمك.",
        en: "A print version, a sending version, an editable version, and the website live in your name.",
      },
    },
  ],

  workLabel: { ar: "من أعمالنا مع شركات المقاولات", en: "From our work with contractors" } as Bi,
  readLabel: { ar: "للقراءة قبل أن تبدأ", en: "Worth reading first" } as Bi,
  reads: [
    { href: "/blog/what-belongs-in-a-company-profile", label: { ar: "ماذا يجب أن يحتوي ملف الشركة التعريفي حتى يفوز بالمناقصات؟", en: "What a company profile needs to win tenders (Arabic)" } },
    { href: "/blog/cost-of-a-company-profile-in-saudi-arabia", label: { ar: "كم تكلفة تصميم بروفايل شركة في السعودية؟", en: "What a company profile costs in Saudi Arabia (Arabic)" } },
  ] as { href: string; label: Bi }[],

  faqLabel: { ar: "أسئلة المقاولين", en: "Contractors' questions" } as Bi,
  faq: [
    {
      q: { ar: "هل تجهّزون ملف التأهيل كاملًا؟", en: "Do you prepare the whole prequalification file?" },
      a: {
        ar: "نكتب البروفايل ونصمّمه ونرتّب مرفقاته على بنود الجهة. أمّا الوثائق نفسها — التصنيف والقوائم المالية والشهادات — فتصدر من جهاتها، ونعرضها كما هي.",
        en: "We write and design the profile and order its attachments around the entity's items. The documents themselves — classification, financial statements, certificates — come from their issuers, and we present them as they are.",
      },
    },
    {
      q: { ar: "هل يختلف البروفايل بين المنافسات الحكومية والشركات الخاصة؟", en: "Does the profile differ between government tenders and private companies?" },
      a: {
        ar: "الترتيب يختلف أكثر من المحتوى. المنافسة الحكومية تبدأ بالنظامي والتصنيف، والمطوّر الخاص يبدأ غالبًا بالمشاريع المشابهة. نبني نسخة أساسية واحدة، ونرتّبها لكل جهة عند الحاجة.",
        en: "The order differs more than the content. A government tender starts with legal documents and classification; a private developer usually starts with similar projects. We build one core version and reorder it per entity when needed.",
      },
    },
    {
      q: { ar: "بالعربية أم بالإنجليزية؟", en: "Arabic or English?" },
      a: {
        ar: "بالاثنتين، مصمّمتين معًا لا مترجمتين. كثير من الاستشاريين وإدارات المشتريات في الشركات الكبرى يقرؤون بالإنجليزية، والجهات الحكومية بالعربية.",
        en: "Both, designed together rather than translated. Many consultants and procurement teams at large companies read in English, and government entities in Arabic.",
      },
    },
    {
      q: { ar: "ليست لدينا صور احترافية لمشاريعنا، هل هذه مشكلة؟", en: "We don't have professional photos of our projects. Is that a problem?" },
      a: {
        ar: "لا. نعمل بما لديك ونقترح ما يستحق التصوير. في ملف التأهيل تُقرأ قيمة العقد والجهة والمدّة قبل الصورة، والجدول الواضح يعوّض كثيرًا من الصور الضعيفة.",
        en: "No. We work with what you have and suggest what's worth photographing. In a prequalification file the contract value, owner and duration are read before the photo, and a clear table makes up for a lot of weak pictures.",
      },
    },
    {
      q: { ar: "كم يستغرق تجهيز البروفايل والموقع؟", en: "How long do the profile and website take?" },
      a: {
        ar: "يتحدّد بجاهزية المستندات وعدد المشاريع المعروضة، ولهذا نضع الجدول بعد جلسة النطاق. أكثر ما يؤخّر ملفات المقاولين انتظار قوائم المشاريع والشهادات، فنتّفق على جدولها قبل أن نبدأ.",
        en: "It depends on how ready the documents are and how many projects are shown, so we set the timeline after the scoping call. What delays contractors' files most is waiting for project lists and certificates, so we agree their schedule before we start.",
      },
    },
    {
      q: { ar: "هل تعملون مع مقاولين خارج الرياض وجدة؟", en: "Do you work with contractors outside Riyadh and Jeddah?" },
      a: {
        ar: "نعم. نعمل عن بُعد بالكامل، والاجتماعات على توقيت السعودية، ومع شركات مقاولات في السعودية والإمارات.",
        en: "Yes. We work fully remotely, with meetings on Saudi time, and with contracting companies in Saudi Arabia and the UAE.",
      },
    },
  ] as FaqItem[],

  cta: {
    ar: ["شركتك تستعد لتأهيل أو منافسة؟", "نبدأ بمراجعة ملفك الحالي."],
    en: ["Preparing for a prequalification or tender?", "We start by reviewing your current file."],
  } as Bi<string[]>,
  wa: { ar: "بروفايل وموقع لشركة مقاولات", en: "a contractor's profile and website" } as Bi,
};
