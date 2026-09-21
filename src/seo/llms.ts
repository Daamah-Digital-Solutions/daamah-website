import { withLang, type Lang } from "../i18n";
import { brand, phoneFor, services } from "../content/home";
import { aboutPage } from "../content/pages";
import { faqGroups } from "../content/faqAbout";
import { sectorMeta, workItems } from "../content/work";
import { SITE_URL, routes } from "../content/seo";

/**
 * `llms.txt` — الموقع كما تقرؤه نماذج اللغة.
 *
 * صفحة HTML تُقرأ بعد تجريدها من القالب والقوائم والأزرار، وما يبقى
 * منها مبعثر. هذا الملف يقول الشيء نفسه مرتّبًا: من نحن في فقرة،
 * ثم الخدمات، ثم الأسئلة بإجاباتها، ثم رابط كل صفحة بوصفها — بصيغة
 * ماركداون يفهمها النموذج بلا تخمين. (المواصفة: llmstxt.org)
 *
 * دالة نقية كـ `graphFor`: تُستدعى وقت البناء وحده، ومصدرها محتوى
 * الموقع نفسه، فلا يمكن أن يقول الملف ما لا تقوله الصفحات.
 */

const abs = (p: string, lang: Lang) => `${SITE_URL}${withLang(p, lang)}`;

/** النسخة المختصرة: فقرة تعريف + الخدمات + فهرس الصفحات الأساسية */
export function llmsTxt(): string {
  const tel = phoneFor();
  const sectors = [...new Set(workItems.map((w) => w.sector))].map((k) => sectorMeta(k).label.en);
  const core = routes.filter((r) => ["home", "page", "services", "service", "work"].includes(r.kind) && !r.path.startsWith("/national-day"));

  return [
    `# ${brand.name.en} (${brand.name.ar})`,
    "",
    `> ${aboutPage.glance.summary.en}`,
    "",
    `- Website: ${SITE_URL} (Arabic) · ${SITE_URL}/en (English)`,
    `- Founded: ${brand.founded}`,
    `- Markets: Saudi Arabia, UAE, the Gulf, Europe, Egypt`,
    `- Languages: Arabic, English`,
    `- Contact: ${brand.email} · ${tel.display} · WhatsApp ${tel.whatsapp}`,
    `- Profiles: ${brand.social.join(" · ")}`,
    "",
    "## Services",
    "",
    ...services.items.map((s) => `- [${s.name.en}](${abs(`/services/${s.slug}`, "en")}): ${s.desc.en}`),
    "",
    "## Sectors with published work",
    "",
    sectors.join(", "),
    "",
    "## Key pages",
    "",
    ...core.map((r) => `- [${r.title.en.split("—")[0].trim()}](${abs(r.path, "en")}): ${r.description.en}`),
    "",
    "## Optional",
    "",
    `- [Full version with FAQ and all work](${SITE_URL}/llms-full.txt)`,
    `- [Arabic sitemap and all pages](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");
}

/** النسخة الكاملة: كل الأسئلة بإجاباتها بلغتين، وكل الأعمال والصفحات */
export function llmsFullTxt(): string {
  const faq = (lang: Lang) =>
    faqGroups.flatMap((g) => [`### ${g.label[lang]}`, "", ...g.items.flatMap((it) => [`**${it.q[lang]}**`, "", it.a[lang], ""])]);

  const work = workItems.map(
    (w) => `- [${w.name.en}](${abs(`/work/${w.slug}`, "en")}) — ${sectorMeta(w.sector).label.en}`,
  );

  const all = (lang: Lang) =>
    routes
      .filter((r) => !r.langs || r.langs.includes(lang))
      .map((r) => `- [${r.title[lang]}](${abs(r.path, lang)}): ${r.description[lang]}`);

  return [
    llmsTxt().trimEnd(),
    "",
    "## About",
    "",
    aboutPage.intro.en,
    "",
    aboutPage.vision.body.en,
    "",
    aboutPage.mission.body.en,
    "",
    "## FAQ (English)",
    "",
    ...faq("en"),
    "## الأسئلة الشائعة (العربية)",
    "",
    ...faq("ar"),
    "## Published work",
    "",
    ...work,
    "",
    "## All pages (English)",
    "",
    ...all("en"),
    "",
    "## كل الصفحات (العربية)",
    "",
    ...all("ar"),
    "",
  ].join("\n");
}
