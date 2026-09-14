import type { Bi, Lang } from "../i18n";
import { brand, services } from "./home";
import { clientStories, sectorMeta, workItems } from "./work";
import {
  aboutPage,
  blogPage,
  contactPage,
  packagesPage,
  privacyPage,
  processPage,
  profilePage,
  serviceDetails,
  servicesPage,
  workDetails,
  workPage,
} from "./pages";
import { allTags, langsOf, posts } from "./blog";
import { tagLabel } from "./blog/tags";
import { cityPages, saudiHub } from "./saudi";
import { nationalDay, offerPath } from "./nationalDay";

/**
 * فهرس المسارات وبيانات رأس كل صفحة.
 *
 * يُقرأ مرّتين: من التطبيق وقت التشغيل لضبط الوسوم، ومن إضافة البناء
 * في `vite.config.ts` لتوليد ملف HTML ثابت لكل مسار وخريطة الموقع.
 * مصدر واحد يمنع اختلاف ما يراه الزائر عمّا يراه الزاحف.
 */

export { SITE_URL, OG_IMAGE } from "../seo/site";

/** نوع الصفحة — منه يعرف مولّد البيانات المنظّمة ما يُصرّح به. */
export type RouteKind =
  | "home"
  | "page"
  | "services"
  | "service"
  | "work"
  | "workItem"
  | "client"
  | "blog"
  | "post"
  | "tag"
  | "saudi"
  | "city"
  | "legal";

export type RouteMeta = {
  /** المسار المجرّد بلا بادئة لغة */
  path: string;
  title: Bi;
  description: Bi;
  /** أولوية المسار في خريطة الموقع */
  priority: number;
  kind: RouteKind;
  /** المسار الأب — منه يُبنى مسار فتات الخبز */
  parent?: string;
  /** اللغات المتاحة. الغياب يعني الاثنتين معًا. */
  langs?: Lang[];
  /** آخر تعديل — يدخل خريطة الموقع حين يوجد */
  lastmod?: string;
  /** صورة تمثّل الصفحة — لخريطة الموقع ولوسوم المشاركة */
  image?: string;
};

const home: RouteMeta = {
  path: "/",
  title: {
    ar: "دَعمة للحلول الرقمية | هوية بصرية ومواقع وتسويق رقمي",
    en: "Daamah Digital Solutions | Branding, Websites & Marketing",
  },
  description: {
    ar: "شركة عالمية تبني منذ 2018 حضورًا رقميًا متكاملًا: هوية بصرية، مواقع إلكترونية، سوشيال ميديا، وتسويق رقمي يحقق نتائج — للشركات في الخليج ومصر وأوروبا.",
    en: "A global company building complete digital presence since 2018 — brand identity, websites, social media, and marketing that performs."
  },
  priority: 1,
  kind: "home",
};

/** يبني عنوانًا موحّدًا: «اسم الصفحة — اسم الشركة» */
function titled(label: Bi): Bi {
  return { ar: `${label.ar} — ${brand.name.ar}`, en: `${label.en} — ${brand.name.en}` };
}

/**
 * وصفٌ مكتوب للنتائج، لمن مقدّمته أطول ممّا يُعرض.
 *
 * الوصف الافتراضي هو مقدّمة الصفحة الظاهرة — وهي مكتوبة لتُقرأ على
 * الصفحة لا لتُختصر في سطرين. جوجل يقتطع بعد نحو 160 حرفًا، فوصف
 * من 287 حرفًا ينتهي مبتورًا في منتصف جملة. هنا نسخة مختصرة تحلّ
 * محلّها في الرأس وحده؛ نصّ الصفحة لا يتغيّر.
 *
 * المفتاح هو المسار المجرّد. ما لا مفتاح له يبقى على مقدّمته.
 */
const META: Record<string, Bi> = {
  /* أوصاف الأعمال الجديدة: نصّ الصفحة يشرح، والوصف هنا يُقتطع في
     نتائج البحث إن طال — فيُكتب قصيرًا بدل أن يُبتر */
  "/work/hcc-insurance": {
    ar: "موقع مؤسسي لشركة تأمين دولية مقرّها لندن، على رسالة الثقة والقوة المالية عبر خمسة عقود.",
    en: "A corporate site for a London-based international insurer, on a message of trust and financial strength.",
  },
  "/work/sara-younis-web": {
    ar: "متجر علامة أزياء نسائية بتصميم مينيمال يترك الصورة تتكلّم ويقصّر الطريق إلى الشراء.",
    en: "A womenswear store in a minimal design that lets the photography speak and shortens the path to buying.",
  },
  "/work/adg-profile": {
    ar: "ملف تعريفي عربي لشركة عقارات تربط المستثمر الخليجي بالسوق الجورجي — مبنيّ على ما يسأل عنه المستثمر لا على سرد الإنجازات.",
    en: "An Arabic company profile for a firm connecting Gulf investors to the Georgian market — built on what an investor asks.",
  },
  "/work/sara-younis-brand": {
    ar: "هوية علامة أزياء نسائية — حرفان داخل شكل بيضاوي بلا زخرفة، تحتمل البطاقة واللافتة والعبوة.",
    en: "Identity for a womenswear label — two letters inside an oval, no ornament, built to survive every application.",
  },
  "/work/expert-estate": {
    ar: "هوية شركة استثمار عقاري — حرف E مكرّرًا ومعكوسًا حتى يُقرأ مبنى، ذهبٌ على داكن.",
    en: "Identity for a property investment firm — the letter E mirrored until it reads as a building, gold on dark.",
  },
  "/work/hennawy-brand": {
    ar: "هوية شركة ورق وكيماويات — حرف H وأنبوب اختبار وورقة نبات في شكل واحد.",
    en: "Identity for a paper and chemical company — the letter H, a test tube, and a leaf folded into one mark.",
  },
  "/work/profitmax-profile": {
    ar: "ملف تعريفي لشركة استثمار بين بريطانيا والإمارات — عقود الاستثمار وضماناتها بلغة المستثمر.",
    en: "A profile for an investment firm between the UK and the UAE — contracts and guarantees in the investor's language.",
  },
  "/work/hcc-profile": {
    ar: "ملف تعريفي لشركة تأمين دولية مقرّها لندن — السندات والضمانات لمشترٍ يقرأ التفاصيل قبل أن يقرّر.",
    en: "A profile for a London-based international insurer — bonds and guarantees for a buyer who reads the detail.",
  },
  "/work/trustech-profile": {
    ar: "ملف مشروع «سكاي فيو» لمجموعة مقاولات بين الإمارات وبريطانيا — الشركاء والمخططات والوحدات.",
    en: "The Sky View project profile for a contracting group between the UAE and the UK — partners, plans, and units.",
  },
  "/work/tdh-profile": {
    ar: "ملف مشروع سكني في عجمان — من الشركاء العالميين إلى مخططات كل نمط وحدة ومساحاته.",
    en: "A residential project profile in Ajman — from the international partners to the plans and areas of every unit type.",
  },
  "/work/hennawy-profile": {
    ar: "ملف تعريفي لشركة مناديل ورقية وكيماويات — خطوط الإنتاج والمنتجات ومعايير الجودة.",
    en: "A profile for a tissue-paper and chemicals manufacturer — production lines, products, and quality standards.",
  },
  "/work/alamein-profile": {
    ar: "ملف تعريفي لمصنع مقطورات في السعودية — كل نوع بصوره ومواصفاته، كتالوج بقدر ما هو تعريف.",
    en: "A profile for a Saudi trailer plant — every type with photographs and specification, as much catalogue as introduction.",
  },
  "/work/connect-profile": {
    ar: "ملف تعريفي لشركة أجنحة معارض سعودية — ثمانية عشر جناحًا منفّذًا لعلامات معروفة.",
    en: "A profile for a Saudi exhibition-stand company — eighteen delivered stands for recognised brands.",
  },
  "/clients/hcc": {
    ar: "موقع ثم ملف تعريفي لشركة تأمين دولية في لندن — رسالة واحدة على الشاشة وفي الورق.",
    en: "A site then a profile for a London international insurer — one message on screen and on paper.",
  },
  "/clients/trustech": {
    ar: "موقع ثم ملف مشروع لمجموعة مقاولات بين الإمارات وبريطانيا، سجلّها يمتدّ منذ 1982.",
    en: "A site then a project profile for a contracting group between the UAE and the UK, going back to 1982.",
  },
  "/clients/hennawy": {
    ar: "هوية ثم ملف تعريفي لشركة مناديل ورقية وكيماويات تبيع لشركات لا لأفراد.",
    en: "Identity then profile for a tissue-paper and chemicals manufacturer selling to businesses.",
  },
  "/work/xtreme-blue": {
    ar: "خمسة وعشرون شهرًا من المحتوى للموزّع الحصري لزيوت IFF العطرية في مصر — عبوة صناعية وعطر فاخر في منشور واحد.",
    en: "Twenty-five months of content for the exclusive Egyptian distributor of IFF fragrance oils — the industrial drum and the luxury bottle in one post.",
  },
  "/work/muri": {
    ar: "تسعة عشر شهرًا من المحتوى لمطوّر عقاري في مصر — رسالة واحدة: من يؤجّر يدفع، ومن يشتري يبني.",
    en: "Nineteen months of content for an Egyptian developer — one message: renting pays, buying builds.",
  },
  "/work/swissroll": {
    ar: "سبعة عشر شهرًا من المحتوى لمحلّ حلويات — تصوير قبل أن يكون تصميمًا، وتقويم مبنيّ على مواسم البيع.",
    en: "Seventeen months of content for a patisserie — photography before design, on a calendar built from selling seasons.",
  },
  "/work/vida": {
    ar: "ستّة عشر شهرًا من المحتوى لنادٍ رياضي — محتوى يزيل عذرًا لا يبيع اشتراكًا.",
    en: "Sixteen months of content for a fitness club — content that removes an excuse rather than selling a membership.",
  },
  "/work/atm-realestate": {
    ar: "ستّة عشر شهرًا من المحتوى لمطوّر عقاري — «نبني ذكرياتك» لا «نبيع وحدات»، والفرق يظهر في الصورة.",
    en: "Sixteen months of content for a developer — building memories, not selling units, and the difference shows in the image.",
  },
  "/work/nasea": {
    ar: "ثلاثة عشر شهرًا من المحتوى لمصنّع منظّفات يبيع للموزّعين — الصورة كرتونة وبالتة لا زجاجة على رفّ.",
    en: "Thirteen months of content for a cleaning-products maker selling to distributors — cartons and pallets, not a bottle on a shelf.",
  },
  "/work/godran": {
    ar: "أربعة عشر شهرًا من المحتوى لاستشارات عقارية — بناء ثقة يسبق عرض الوحدة.",
    en: "Fourteen months of content for a property consultancy — trust built ahead of the unit being shown.",
  },
  "/work/alawael": {
    ar: "أحد عشر شهرًا من المحتوى لشركة تربط المستثمر الخليجي بالعقار الجورجي — طمأنة على القانون والموقع والعائد.",
    en: "Eleven months of content for a firm linking Gulf investors to Georgian property — reassurance on law, location and return.",
  },
  "/work/royal-consultant": {
    ar: "سبعة أشهر من المحتوى لبيت استشارات وشريك أودو في السوق السعودي — يبدأ بالمشكلة لا بالنظام.",
    en: "Seven months of content for a consultancy and Odoo partner in Saudi Arabia — opening on the problem, not the system.",
  },
  "/work/alhaitham": {
    ar: "محتوى لمكتب استشارات قانونية وهندسية — الموضوع نفسه هو الإعلان، فيجيب سؤالًا يُبحَث عنه فعلًا.",
    en: "Content for a legal and engineering consultancy — the subject is the advertising, answering a question people actually search.",
  },
  "/work/almuttahida": {
    ar: "محتوى لشركة تخليص جمركي وشحن — يبيع زوال القلق من التعطيل لا الخدمة نفسها.",
    en: "Content for a customs clearance and freight firm — selling the end of the worry about delay, not the service.",
  },
  "/work/corpenta": {
    ar: "محتوى لشركة تأسيس أعمال تدخل بالمستثمر الأجنبي إلى السوق السعودي — مبنيّ على التوقيت لا على الإجراء.",
    en: "Content for a business-formation firm taking foreign investors into Saudi Arabia — built on the timing, not the paperwork.",
  },
  "/work/amlak-social": {
    ar: "ثمانية وعشرون شهرًا متّصلة من المحتوى لشركة تبيع عقارًا في باتومي لمستثمر لم يزر المدينة — عشرة مشاريع مسمّاة.",
    en: "Twenty-eight unbroken months of content for a firm selling Batumi property to investors who have never visited — ten named developments.",
  },
  "/work/amlak-revamp": {
    ar: "علامة ثانية لشركة كبرت على أولاها، وسبعة أشهر من المحتوى داخلها — تجديدٌ بلا انقطاع شهر واحد.",
    en: "A second brand for a company that outgrew its first, and seven months of content inside it — a rebrand without a single month's gap.",
  },
  "/clients/amlak": {
    ar: "هوية، ثم خمسة وثلاثون شهرًا من المحتوى، ثم تجديد الهوية — علاقة كاملة مع شركة استثمار عقاري في جورجيا.",
    en: "An identity, thirty-five months of content, then a rebrand — a full relationship with a Georgian property investment firm.",
  },
  "/work/profitmax-brand": {
    ar: "هوية شركة استثمار تعمل من بريطانيا والإمارات — شعار يجمع حرف الاسم بسهم صاعد يقول التخصّص قبل أن يُقرأ الاسم.",
    en: "Identity for an investment firm in the UK and the UAE — a mark folding the initial into a rising arrow.",
  },
  "/work/profitmax-web": {
    ar: "موقع ثنائي اللغة لشركة استثمار تعمل من بريطانيا والإمارات، يعرض الخدمات ويقود الزائر إلى حجز استشارة.",
    en: "A bilingual site for an investment firm in the UK and the UAE, leading visitors to book a consultation.",
  },
  "/work/alhayat-brand": {
    ar: "هوية مزرعة دواجن في الرياض، مبنيّة من عناصر المزرعة نفسها: شمس وسنبلة قمح وأرض زراعية.",
    en: "Identity for a poultry farm in Riyadh, built from the farm's own elements: sun, wheat spike, and land.",
  },
  "/work/alhayat-web": {
    ar: "متجر إلكتروني لمزرعة دواجن في الرياض يعرض المنتجات ويستقبل الطلبات، بامتداد هويّتها لا بنسخة منها.",
    en: "An online store for a poultry farm in Riyadh, presenting products and taking orders in its own identity.",
  },
  "/work/utility-vision": {
    ar: "موقع شركة مقاولات في جدة يعرض المشاريع والخدمات، بمسار طلب عرض سعر ظاهر في كل صفحة.",
    en: "A site for a contracting company in Jeddah presenting projects and services, with a quote path on every page.",
  },
  "/work/future-axis": {
    ar: "موقع شركة مقاولات سعودية يعرض السجلّ والمورّدين والمشاريع الأخيرة، لا صور عرض فقط.",
    en: "A site for a Saudi contracting company showing the record, the suppliers, and the latest projects.",
  },
  "/work/greenmark": {
    ar: "إدارة حضور شركة تأسيس شركات وتخليص أوراق في دبي، بمحتوى يجيب أسئلة العميل الفعلية.",
    en: "Social presence for a company-formation firm in Dubai, on content that answers real client questions.",
  },
  "/work/rahiq": {
    ar: "محتوى شهري لعلامة عسل ومنتجات طبيعية في مصر، يربط المنتج بمناسبات السنة وفوائده الغذائية.",
    en: "Monthly content for an Egyptian honey brand, tying the product to the year's occasions and its benefits.",
  },
  "/work/sat-leaders": {
    ar: "محتوى شهري لأكاديمية تحضير اختبارات SAT وACT وEST في مصر، يخاطب قلق الطالب وولي الأمر معًا.",
    en: "Monthly content for a SAT, ACT and EST prep academy in Egypt, addressing student and parent alike.",
  },
  "/work/sedra": {
    ar: "هوية علامة إكسسوارات فاخرة، مبنيّة على خطّ عربي مخصّص لكلمة «سدرة».",
    en: "Identity for a luxury accessories brand, built on custom Arabic lettering of the word Sedra.",
  },
  "/work/alraghad": {
    ar: "هوية علامة مجوهرات — حرفان يجتمعان في شكل خاتم داخل إطار مقوّس، ذهبٌ على خلفية داكنة.",
    en: "Identity for a jewellery brand — two initials folded into a ring inside an arched frame.",
  },
  "/work/tech-care": {
    ar: "هوية معامل تحاليل طبية — قطرة داخل حرف C وجزيئات تحليل، بأزرق طبّي يقول الثقة والراحة.",
    en: "Identity for a medical laboratory — a droplet inside the letter C, in a blue that carries reassurance.",
  },
  "/work/vip-limo": {
    ar: "هوية خدمة ليموزين في شيكاغو، وواجهات تطبيقها — الهوية والاستخدام من مصدر واحد.",
    en: "Identity and app interface design for a limousine service in Chicago.",
  },
  "/work/auto-crazy-car": {
    ar: "هوية خدمات سيارات، عالية التباين تحمل حركةً وسرعة قبل أن يُقرأ الاسم.",
    en: "Identity for an automotive service — high contrast, carrying movement before the name is read.",
  },
  "/work/caffeine-kiss": {
    ar: "هوية علامة قهوة — فنجانٌ يُقرأ ابتسامةً في آنٍ واحد، فكرة واحدة تحمل الاسم والمزاج.",
    en: "Identity for a coffee brand — a cup that reads as a smile, one idea carrying name and mood.",
  },
  "/work/daughters": {
    ar: "هوية شركة تجارة عامة — صندوق شحن يُقرأ حرف الاسم الأول، فيقول المجال في لمحة.",
    en: "Identity for a general trading company — a shipping crate that reads as the initial.",
  },
  "/clients/sara-younis": {
    ar: "هوية ثم متجر لعلامة أزياء نسائية — قاعدة واحدة: الصورة تتكلّم والواجهة تصمت.",
    en: "Identity then store for a womenswear label — one rule: the photography speaks, the interface keeps quiet.",
  },
  "/clients/profitmax": {
    ar: "هوية ثم موقع لشركة استثمار تعمل من بريطانيا والإمارات — علاقة امتدّت من العلامة إلى حضورها الكامل.",
    en: "Identity then website for an investment firm in the UK and the UAE — from the mark to the full presence.",
  },
  "/clients/alhayat": {
    ar: "هوية ثم متجر إلكتروني لمزرعة دواجن في الرياض — ما يراه العميل على العبوة هو ما يراه على الشاشة.",
    en: "Identity then online store for a poultry farm in Riyadh — the pack and the screen say the same thing.",
  },
  "/about": {
    ar: "منذ 2018 ودَعمة تحوّل أفكار الشركات إلى حضور رقمي واضح — نعمل مع عملاء في مصر والخليج وأوروبا.",
    en: "Since 2018 Daamah has turned companies' ideas into a clear digital presence, working across Egypt, the Gulf, and Europe.",
  },
  "/services": {
    ar: "خدمات دَعمة في ثلاثة عوامل: الظهور وبناء الثقة، والوصول وخلق الفرص، وتنظيم العمل والنمو — هوية ومواقع وسيو وإعلانات وأنظمة CRM.",
    en: "Daamah's services across three factors: appearing and earning trust, reaching and creating demand, and running the work — branding, websites, SEO, ads, and CRM.",
  },
  "/services/branding": {
    ar: "نظام هوية كامل — لون وخطّ وأسلوب صورة ونبرة — مبنيّ على فهم سوقك. يشمل دليل استخدام وملفات مفتوحة.",
    en: "A complete identity system — colour, type, image style, and tone — built from your market. Includes a usage guide and open files.",
  },
  "/services/company-profile": {
    ar: "ملف تعريفي يُقرأ في خمس دقائق ويصلح للتأهيل والعروض — مكتوب ومصمّم على هويّتكم، عربي وإنجليزي.",
    en: "A company profile read in five minutes that holds up in qualification files — written and designed on your identity, in Arabic and English.",
  },
  "/services/crm": {
    ar: "نظام CRM مهيّأ على طريقة عملكم: مراحل بيع واضحة، ومسؤول لكل مرحلة، وتقارير تقرأها الإدارة بلا وسيط.",
    en: "A CRM shaped to how you work: clear sales stages, an owner for each, and reports management reads without a middleman.",
  },
  "/services/seo": {
    ar: "تدقيق تقني، وبحث كلمات مبنيّ على كيف يبحث السعودي فعلًا، ومحتوى عربي يُنشر بانتظام. نتائج تقنية خلال أسابيع، وترتيب خلال 4–9 أشهر.",
    en: "Technical audit, Arabic keyword research based on how Saudis really search, and content published consistently. Technical gains in weeks, rankings in 4–9 months.",
  },
  "/services/media-buying": {
    ar: "حملات على المنصّات التي يستعملها جمهورك فعلًا، بمتابعة يومية للتكلفة لا شهرية. الاستهداف الدقيق أهمّ من الإنفاق الكبير.",
    en: "Campaigns on the platforms your audience actually uses, with cost watched daily rather than monthly. Sharp targeting beats big spend.",
  },
  "/solutions": {
    ar: "أربعة حلول مبنيّة على وضع الشركة لا على قائمة خدمات: الأساس، الحضور، الفرص، والنظام. اقرأ الأقرب إلى وضعكم.",
    en: "Four solutions built around your company's situation rather than a service list: Foundation, Presence, Demand, and Operations.",
  },
  "/contact": {
    ar: "استشارة أولى مجانية بدون التزام. احكِ لنا عن مشروعك ونرجع لك بخطة واضحة وسعر محدّد — عادةً خلال يوم عمل.",
    en: "A free first consultation, no commitment. Tell us about your project and we'll reply with a clear plan and a firm price — usually within one business day.",
  },
  "/saudi": {
    ar: "ما نقدّمه للسوق السعودي: هوية بصرية، مواقع، سيو، وتسويق. مواعيد على توقيت الرياض، وتسليم بملفات مفتوحة وحسابات باسمك.",
    en: "What we offer the Saudi market: branding, websites, SEO, and marketing. Riyadh-time scheduling, with open files and accounts in your name.",
  },
  "/clients/adg": {
    ar: "هوية بصرية لشركة عقارات في جورجيا ولبنان، ثم إدارة حضورها على السوشيال — العلامة التي بنيناها هي التي تتكلّم يوميًا.",
    en: "Identity for a real estate company across Georgia and Lebanon, then its social presence — the brand we built is the one that speaks daily.",
  },
};

/** الوصف المكتوب للنتائج إن وُجد، وإلا مقدّمة الصفحة. */
const describe = (path: string, fallback: Bi): Bi => META[path] ?? fallback;

/**
 * مسارات المدوّنة — تُشتقّ من الملفات لا تُكتب.
 *
 * المقال المكتوب بلغة واحدة يحمل `langs` بها وحدها، فلا يُولَّد له
 * `hreflang` يَعِد جوجل بنسخةٍ غير موجودة، ولا صفحة فارغة باللغة
 * الأخرى. عنوان صفحة المقال هو عنوان المقال نفسه لا اسمه ملحقًا
 * باسم الشركة: العنوان الطويل يُقتطع في النتائج.
 */
const blogRoutes: RouteMeta[] = [
  ...[...new Set(posts.map((p) => p.slug))].map<RouteMeta>((slug) => {
    const langs = langsOf(slug);
    const ar = posts.find((p) => p.slug === slug && p.lang === "ar");
    const en = posts.find((p) => p.slug === slug && p.lang === "en");
    /* اللغة الغائبة تأخذ نصّ الموجودة: الصفحة لا تُولَّد لها أصلًا،
       لكن النوع يطلب الوجهين */
    const any = (ar ?? en)!;
    return {
      path: `/blog/${slug}`,
      title: { ar: (ar ?? any).title, en: (en ?? any).title },
      description: { ar: (ar ?? any).description, en: (en ?? any).description },
      priority: 0.7,
      kind: "post",
      parent: "/blog",
      langs,
      lastmod: any.updated ?? any.date,
      image: any.cover,
    };
  }),
  /* صفحات الوسوم: تُولَّد للغة التي فيها مقال بذلك الوسم فقط */
  ...[...new Set(posts.flatMap((p) => p.tags))].map<RouteMeta>((tag) => {
    const langs = (["ar", "en"] as Lang[]).filter((l) =>
      allTags(l).some((x) => x.tag === tag),
    );
    const label = tagLabel(tag);
    return {
      path: `/blog/tag/${tag}`,
      title: {
        ar: `${blogPage.tagTitle.ar} ${label.ar} — ${brand.name.ar}`,
        en: `${blogPage.tagTitle.en} ${label.en} — ${brand.name.en}`,
      },
      description: {
        ar: `مقالات دَعمة عن ${label.ar} — تجربة عملية من مشاريع في السعودية والخليج ومصر.`,
        en: `Daamah articles on ${label.en} — practical experience from projects across Saudi Arabia, the Gulf, and Egypt.`,
      },
      priority: 0.4,
      kind: "tag",
      parent: "/blog",
      langs,
    };
  }),
];

export const routes: RouteMeta[] = [
  home,
  {
    path: "/about",
    title: titled(aboutPage.label),
    description: describe("/about", aboutPage.intro),
    priority: 0.8,
    kind: "page",
  },
  {
    path: "/services",
    title: titled(servicesPage.label),
    description: describe("/services", servicesPage.intro),
    priority: 0.9,
    kind: "services",
  },
  ...services.items.map<RouteMeta>((s) => ({
    path: `/services/${s.slug}`,
    title: titled(s.name),
    description: describe(`/services/${s.slug}`, serviceDetails[s.slug]?.intro ?? s.desc),
    priority: 0.8,
    kind: "service" as const,
    parent: "/services",
  })),
  {
    path: "/work",
    title: titled(workPage.label),
    description: workPage.intro,
    priority: 0.9,
    kind: "work",
  },
  ...workItems.map<RouteMeta>((w) => ({
    path: `/work/${w.slug}`,
    title: titled(w.name),
    description: describe(`/work/${w.slug}`, workDetails[w.slug]?.desc ?? sectorMeta(w.sector).label),
    priority: 0.6,
    kind: "workItem" as const,
    parent: "/work",
    image: w.image,
  })),
  /* قصص العملاء أعلى أولويةً من العمل المفرد: هي ما نريد أن يُقرأ */
  ...clientStories.map<RouteMeta>((c) => ({
    path: `/clients/${c.slug}`,
    title: titled(c.name),
    description: describe(`/clients/${c.slug}`, c.lede),
    priority: 0.7,
    kind: "client" as const,
    parent: "/work",
  })),
  {
    path: "/profile",
    title: titled(profilePage.label),
    description: {
      ar: "ملف دَعمة التعريفي وبورتفوليو السوشيال ميديا كاملين — اقرأهما كما يقرأهما عميل يزن قراره.",
      en: "Daamah's own company profile and social media portfolio in full — read them the way a client weighing a decision would.",
    },
    priority: 0.7,
    kind: "page",
  },
  {
    path: "/process",
    title: titled(processPage.label),
    description: processPage.intro,
    priority: 0.7,
    kind: "page",
  },
  {
    path: "/solutions",
    title: titled(packagesPage.label),
    description: describe("/solutions", packagesPage.intro),
    priority: 0.8,
    kind: "page",
  },
  {
    path: "/contact",
    title: titled(contactPage.label),
    description: describe("/contact", contactPage.intro),
    priority: 0.9,
    kind: "page",
  },
  /* صفحة حملة: عربية فقط، وصورة مشاركتها من إعلان العرض نفسه */
  {
    path: offerPath,
    title: { ar: nationalDay.meta.title, en: nationalDay.meta.title },
    description: { ar: nationalDay.meta.description, en: nationalDay.meta.description },
    priority: 0.8,
    kind: "page",
    langs: ["ar"],
    image: "/assets/og-national-day.jpg",
  },
  {
    path: "/saudi",
    title: {
      ar: `خدماتنا في السعودية — ${brand.name.ar}`,
      en: `Our services in Saudi Arabia — ${brand.name.en}`,
    },
    description: describe("/saudi", saudiHub.intro),
    priority: 0.9,
    kind: "saudi",
  },
  /* صفحات (خدمة × مدينة) — عنوانها ووصفها مكتوبان لكل زوج على حدة
     في `saudi.ts`؛ حارس البناء يرفض تكرار وصف بين صفحتين */
  ...cityPages.map<RouteMeta>((p) => ({
    path: `/services/${p.service}/${p.city}`,
    title: {
      ar: `${p.title.ar} — ${brand.short.ar}`,
      en: `${p.title.en} — ${brand.short.en}`,
    },
    description: p.description,
    priority: 0.8,
    kind: "city" as const,
    parent: `/services/${p.service}`,
  })),
  {
    path: "/blog",
    title: titled(blogPage.label),
    description: blogPage.intro,
    priority: 0.9,
    kind: "blog",
  },
  ...blogRoutes,
  {
    path: "/privacy",
    title: titled(privacyPage.label),
    description: privacyPage.intro,
    priority: 0.2,
    kind: "legal",
  },
];

/** يبحث عن بيانات مسار مجرّد. */
export function findRoute(path: string): RouteMeta | undefined {
  return routes.find((r) => r.path === path);
}
