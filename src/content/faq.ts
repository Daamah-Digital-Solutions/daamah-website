import type { Bi } from "../i18n";
import { nationalDay, offerPath } from "./nationalDay";
import { faqGroups, faqPath } from "./faqAbout";

/**
 * الأسئلة المتكررة — مصدر واحد للصفحة وللبيانات المنظّمة.
 *
 * جوجل يعرض بطاقة الأسئلة في النتائج فقط إن كان ما في `FAQPage`
 * مطابقًا لما يقرأه الزائر على الصفحة نفسها. مصدران منفصلان يفترقان
 * عند أول تعديل، فتُسحب البطاقة أو تُعدّ محتوًى مضلّلًا — لذلك
 * `faqItemsFor` هي التي تُغذّي الاثنين معًا.
 */

export type FaqItem = { q: Bi; a: Bi };

/** أسئلة عامّة — الرئيسية وصفحة التواصل. */
export const general: FaqItem[] = [
  {
    q: { ar: "كم يستغرق تنفيذ المشروع؟", en: "How long does a project take?" },
    a: {
      ar: "يتحدّد بنطاق المشروع وحجم المحتوى، لذلك لا نعطي مدّة عامة قبل أن نفهم ما تحتاجه. بعد جلسة النطاق نضع جدولًا زمنيًا مكتوبًا ونلتزم به.",
      en: "It depends on the scope and the amount of content, so we don't quote a general duration before we understand what you need. After the scoping call we agree a written timeline and hold to it.",
    },
  },
  {
    q: { ar: "ماذا لو كان لديّ هوية بالفعل؟", en: "What if I already have an identity?" },
    a: {
      ar: "نشتغل عليها كما هي. نطوّر الموقع والمحتوى بما يتماشى مع هويتك الحالية، ولو احتاجت تحديثًا نقترح ما يلزم قبل أن نبدأ.",
      en: "We work with it as it stands. We build the site and content to match your current identity, and if it needs updating we'll say so before we start.",
    },
  },
  {
    q: {
      ar: "كيف يتم العمل معكم خطوةً بخطوة؟",
      en: "How does working with you actually run?",
    },
    a: {
      ar: "اجتماع بداية نفهم فيه شركتك وسوقك، ثم مراجعة مكتوبة عند كل مرحلة، ثم تسليم وتدريب. نعمل مع شركات في الخليج ومصر وأوروبا، والاجتماعات تُجدوَل على توقيتك أنت. التعاقد والدفع بالتحويل البنكي أو عبر منصّات الدفع الدولية.",
      en: "A kickoff meeting where we learn your business and your market, a written review at every stage, then handover and training. We work with companies across the Gulf, Egypt and Europe, and meetings are scheduled in your time zone. Contracting and payment go by bank transfer or the usual international platforms.",
    },
  },
  {
    q: { ar: "كيف تتم عملية الدفع؟", en: "How does payment work?" },
    a: {
      ar: "دفعة أولى عند بدء المشروع والباقي عند التسليم. لا رسوم مخفية — كل ما هو داخل الباقة موضّح قبل التوقيع.",
      en: "A deposit at kickoff and the balance on delivery. No hidden fees — everything included is documented before you sign.",
    },
  },
  {
    q: { ar: "ماذا بعد التسليم؟", en: "What happens after delivery?" },
    a: {
      ar: "نتابع معك بعد الإطلاق: نراقب الأداء ونقترح تحسينات. الشراكة المستمرة جزء أساسي من طريقة عملنا.",
      en: "We stay with you after launch: tracking performance and proposing improvements. Ongoing partnership is core to how we work.",
    },
  },
];

/**
 * أسئلة كل خدمة — تُعرض في صفحتها.
 * الخدمة التي لا أسئلة لها تعرض العامّة، فلا صفحة بلا إجابات.
 */
export const byService: Record<string, FaqItem[]> = {
  "company-profile": [
    {
      q: { ar: "هل تكتبون المحتوى أم أرسله أنا؟", en: "Do you write the content, or do I send it?" },
      a: {
        ar: "نكتبه نحن انطلاقًا من جلسة معك ومن موادك الحالية، وتراجعه قبل أن يبدأ التصميم. وإن كان لديك نص جاهز، نحرّره ونرتّبه بدل أن نصمّم فوقه كما هو.",
        en: "We write it, starting from a session with you and your existing material, and you review it before design begins. If you already have copy, we edit and restructure it rather than designing on top of it as is.",
      },
    },
    {
      q: { ar: "هل يصلح الملف للمناقصات وملفات التأهيل؟", en: "Does the profile work for tenders and pre-qualification?" },
      a: {
        ar: "نعم. نرتّبه على ما يبحث عنه القارئ في هذه الحالة: التعريف بالشركة، والخبرات، والمشاريع، والشهادات حيث توجد.",
        en: "Yes. We order it around what that reader looks for: the company overview, experience, projects, and certificates where you have them.",
      },
    },
    {
      q: { ar: "هل يمكنني تحديثه لاحقًا بنفسي؟", en: "Can I update it myself later?" },
      a: {
        ar: "نعم. نسلّمك نسخة قابلة للتحديث، فتضيف مشروعًا جديدًا أو تغيّر رقمًا دون الرجوع إلينا.",
        en: "Yes. You receive an editable version, so you can add a new project or change a figure without coming back to us.",
      },
    },
  ],
  "media-buying": [
    {
      q: { ar: "على أي منصّات تديرون الإعلانات؟", en: "Which platforms do you run ads on?" },
      a: {
        ar: "نختار المنصّات بحسب مكان جمهورك لا بحسب العادة — مثل ميتا وجوجل وسناب شات وتيك توك — ونحدّد ذلك في جلسة النطاق قبل صرف أي ميزانية.",
        en: "We choose platforms by where your audience is, not by habit — Meta, Google, Snapchat or TikTok, for example — and settle that in the scoping call before any budget is spent.",
      },
    },
    {
      q: { ar: "هل الميزانية الإعلانية ضمن أجر الإدارة؟", en: "Is the ad budget part of the management fee?" },
      a: {
        ar: "لا. الإنفاق الإعلاني يُدفع للمنصّات مباشرة، وأجر الإدارة منفصل عنه، فترى إنفاقك كما هو.",
        en: "No. Ad spend is paid to the platforms directly and our management fee is separate, so you see your spend exactly as it is.",
      },
    },
  ],
  "performance-marketing": [
    {
      q: { ar: "ما الفرق بين تسويق الأداء وشراء المساحات الإعلانية؟", en: "How is performance marketing different from media buying?" },
      a: {
        ar: "شراء المساحات هو إطلاق الحملات وإدارتها. تسويق الأداء هو ما بعد ذلك: قياس دقيق للتحويلات، واختبارات منظّمة، وتحسين لصفحات الهبوط وتوزيع الميزانية حتى يرتفع العائد.",
        en: "Media buying is launching and running campaigns. Performance marketing is what comes after: accurate conversion tracking, structured tests, and improving landing pages and budget allocation until the return rises.",
      },
    },
    {
      q: { ar: "هل تحتاجون إلى الوصول لموقعنا؟", en: "Do you need access to our website?" },
      a: {
        ar: "غالبًا نعم، لضبط تتبّع التحويلات وتعديل صفحات الهبوط. نعمل بصلاحيات تمنحونها أنتم وتسحبونها متى شئتم.",
        en: "Usually, yes — to set up conversion tracking and adjust landing pages. We work with access you grant and can revoke at any time.",
      },
    },
    {
      q: { ar: "متى نحكم على نتيجة اختبار؟", en: "When is a test result judged?" },
      a: {
        ar: "حين يجمع بيانات كافية للحكم، لا بعد يوم أو يومين. ونسجّل كل اختبار ونتيجته، حتى لا يُعاد ما جُرّب.",
        en: "When it has gathered enough data to judge — not after a day or two. Every test and its result is recorded, so nothing gets repeated.",
      },
    },
  ],
  crm: [
    {
      q: { ar: "هل ستُنقل بياناتنا الحالية إلى النظام؟", en: "Will our existing data move into the system?" },
      a: {
        ar: "نعم. ننقل بيانات العملاء من الجداول والمحادثات إلى النظام مرتّبة، ونتحقّق منها معكم قبل أن يبدأ الفريق العمل عليه.",
        en: "Yes. We move client data out of spreadsheets and chats into the system, organised, and check it with you before the team starts working in it.",
      },
    },
    {
      q: { ar: "هل يحتاج فريقنا خبرة تقنية لاستعماله؟", en: "Does our team need technical skills to use it?" },
      a: {
        ar: "لا. نهيّئه بأقل خطوات ممكنة على طريقة عملكم، وندرّب الفريق على استعماله، ونبقى معكم في الشهر الأول لنعدّل ما يحتاج تعديلًا.",
        en: "No. We set it up with as few steps as possible around how you work, train the team, and stay with you through the first month to adjust whatever needs it.",
      },
    },
    {
      q: { ar: "هل علينا تغيير طريقة عملنا؟", en: "Will we have to change how we work?" },
      a: {
        ar: "لا. نبدأ من طريقتكم الحالية ونبني النظام عليها، ولا نقترح تغييرًا إلا حين يكون سببًا مباشرًا في ضياع العملاء — ونشرح السبب قبل تنفيذه.",
        en: "No. We start from how you work today and build the system on it, suggesting a change only where it directly causes lost clients — and we explain why before making it.",
      },
    },
  ],
  branding: [
    {
      q: { ar: "ماذا تشمل الهوية البصرية بالضبط؟", en: "What exactly is in a brand identity?" },
      a: {
        ar: "الشعار بصيغه المختلفة، ونظام الألوان والخطوط، وقواعد الاستخدام، وتطبيقات أساسية (بطاقة، ورق رسمي، قوالب سوشيال، واجهة الملف التعريفي). كل ذلك في دليل استخدام واحد.",
        en: "The logo in its variants, a colour and type system, usage rules, and core applications (card, letterhead, social templates, profile cover). All of it in one usage guide.",
      },
    },
    {
      q: { ar: "كم عدد المقترحات التي أراها؟", en: "How many directions do I see?" },
      a: {
        ar: "مقترحان أو ثلاثة اتجاهات مختلفة فعلًا لا تنويعات على فكرة واحدة، ثم نطوّر الاتجاه الذي تختاره حتى يكتمل. جولتا تعديل داخل السعر، وما بعدهما يُتّفق عليه.",
        en: "Two or three genuinely different directions rather than variations on one idea, then we develop the one you pick until it's complete. Two revision rounds are included; anything beyond is agreed separately.",
      },
    },
    {
      q: { ar: "هل تسجّلون العلامة التجارية؟", en: "Do you register the trademark?" },
      a: {
        ar: "لا نقوم بالتسجيل نيابةً عنك، لكننا نسلّمك الملفات بالمواصفات التي تطلبها الجهات المختصة — بما فيها الهيئة السعودية للملكية الفكرية — ونرشدك إلى الخطوات.",
        en: "We don't file on your behalf, but we hand over files in the formats the registries require — including the Saudi Authority for Intellectual Property — and walk you through the steps.",
      },
    },
  ],
  "web-development": [
    {
      q: { ar: "هل الموقع يظهر في جوجل؟", en: "Will the site show up on Google?" },
      a: {
        ar: "نسلّم الموقع مهيّأً تقنيًا: صفحات سريعة، عناوين ووصف لكل صفحة، خريطة موقع، وبيانات منظّمة، وربط بـ Search Console. الظهور على الكلمات التنافسية يحتاج محتوى مستمرًا — وهذه خدمة السيو المنفصلة.",
        en: "We ship the site technically ready: fast pages, per-page titles and descriptions, a sitemap, structured data, and Search Console wired up. Ranking for competitive terms needs ongoing content — that's the separate SEO service.",
      },
    },
    {
      q: { ar: "هل أستطيع تعديل المحتوى بنفسي؟", en: "Can I edit the content myself?" },
      a: {
        ar: "نعم. نسلّم لوحة تحكّم بسيطة بالعربية تُغيّر منها النصوص والصور والأسعار بلا خبرة تقنية، مع جلسة تدريب مسجّلة.",
        en: "Yes. You get a simple Arabic control panel for text, images, and prices with no technical background needed, plus a recorded training session.",
      },
    },
    {
      q: { ar: "الاستضافة والدومين على من؟", en: "Who handles hosting and the domain?" },
      a: {
        ar: "نجهّزهما لك ونسجّلهما باسمك أنت لا باسمنا — الموقع ملكك بالكامل. بعض الباقات تشمل السنة الأولى مجانًا، والتجديد يبقى عليك مباشرةً بلا وسيط.",
        en: "We set both up and register them in your name, not ours — the site is entirely yours. Some packages include the first year; renewal stays directly with you, no middleman.",
      },
    },
  ],
  seo: [
    {
      q: { ar: "متى أرى نتائج السيو؟", en: "When do I see SEO results?" },
      a: {
        ar: "التحسينات التقنية تظهر أثرها خلال أسابيع، أما الترتيب على الكلمات التنافسية فيحتاج عادةً من أربعة إلى تسعة أشهر من المحتوى المنتظم. من يعدك بالصدارة خلال شهر يبيعك وهمًا.",
        en: "Technical fixes show within weeks; ranking for competitive keywords usually takes four to nine months of consistent content. Anyone promising page one in a month is selling you a fiction.",
      },
    },
    {
      q: {
        ar: "هل تضمنون المركز الأول في جوجل؟",
        en: "Do you guarantee the number one spot?",
      },
      a: {
        ar: "لا، ولا يستطيع أحد — جوجل نفسه يقول ذلك. ما نضمنه هو العمل نفسه: تدقيق تقني، وخطة كلمات مبنية على بحث فعلي في سوقك أنت، ومحتوى منشور، وتقرير شهري يوضّح ما تحرّك وما لم يتحرّك.",
        en: "No, and nobody can — Google says so itself. What we guarantee is the work: a technical audit, a keyword plan built on real research in your own market, published content, and a monthly report showing what moved and what didn't.",
      },
    },
    {
      q: {
        ar: "هل تكتبون المحتوى العربي بأنفسكم؟",
        en: "Do you write the Arabic content yourselves?",
      },
      a: {
        ar: "نعم، ومكتوب لا مترجم. المحتوى المترجم آليًا يُقرأ غريبًا على العميل الخليجي ولا يطابق كيف يبحث فعلًا — والبحث العربي مليء بصيغ لا تظهر في أي أداة إنجليزية.",
        en: "Yes, and written rather than translated. Machine-translated content reads oddly to a Gulf client and doesn't match how they actually search — Arabic queries are full of phrasings no English tool surfaces.",
      },
    },
  ],
  "social-media": [
    {
      q: { ar: "كم منشورًا شهريًا؟", en: "How many posts per month?" },
      a: {
        ar: "يُتّفق عليه قبل البدء — عادةً من اثني عشر إلى عشرين منشورًا شهريًا بين تصميم وفيديو قصير، مع تقويم محتوى تراه وتوافق عليه قبل التنفيذ.",
        en: "Agreed before we start — typically twelve to twenty pieces a month across design and short video, with a content calendar you see and approve before production.",
      },
    },
    {
      q: {
        ar: "هل تكتبون المحتوى باللهجة الخليجية؟",
        en: "Do you write in Gulf dialect?",
      },
      a: {
        ar: "نكتب بما يناسب جمهورك: العربية الفصحى المبسّطة للقطاعات الرسمية، واللهجة الخليجية حيث تكون أقرب. القرار يُتّخذ في مرحلة الاستراتيجية لا أثناء التنفيذ.",
        en: "We write for your audience: simplified Modern Standard Arabic for formal sectors, Gulf dialect where it lands closer. That's decided at the strategy stage, not mid-production.",
      },
    },
  ],
  "digital-marketing": [
    {
      q: { ar: "ما أقل ميزانية إعلانية معقولة؟", en: "What's a sensible minimum ad budget?" },
      a: {
        ar: "الحدّ المعقول يختلف بين سوق وسوق وبين قطاع وقطاع: ما يكفي في سوق لا يكفي في آخر، والعقار غير التجارة الإلكترونية. والقاعدة واحدة — الميزانية تكفي حين تجمع بيانات تسمح بالتحسين، وأقل من ذلك إنفاقٌ بلا تعلّم. نحدّدها لسوقك في جلسة النطاق، وإدارة الحملة تُحسب منفصلةً عن الإنفاق الإعلاني.",
        en: "The sensible floor differs by market and by sector: what is enough in one market is not in another, and real estate is not e-commerce. The rule holds either way — a budget is enough when it gathers data you can optimise on, and below that it is spending without learning. We set it for your market in the scoping call, and management is billed separately from the spend itself.",
      },
    },
    {
      q: { ar: "هل تنفّذون الخطة أم تكتبونها فقط؟", en: "Do you carry out the plan, or only write it?" },
      a: {
        ar: "الاثنان ممكنان. نسلّم الخطة مكتوبة بأولوياتها ليعمل بها فريقك، أو ننفّذها معك عبر خدمات السوشيال ميديا والإعلانات والسيو.",
        en: "Either. We deliver the written plan with its priorities for your team to run, or carry it out with you through our social media, advertising and SEO services.",
      },
    },
  ],
};

/**
 * أسئلة صفحة بعينها من مسارها المجرّد.
 * تقرأها الصفحة وقارئ البيانات المنظّمة معًا.
 */
export function faqItemsFor(barePath: string): FaqItem[] {
  /* صفحة العرض تعرض أسئلتها هي — فتُعلَن هي لا العامّة */
  if (barePath === offerPath) return nationalDay.faq;
  /* صفحة الأسئلة عن دَعمة — مجموعاتها مسطّحةً بترتيب عرضها */
  if (barePath === faqPath) return faqGroups.flatMap((g) => g.items);
  const service = barePath.match(/^\/services\/([^/]+)/)?.[1];
  if (service && byService[service]) return byService[service];
  return general;
}
