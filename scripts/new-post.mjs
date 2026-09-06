/**
 * ينشئ مقالًا جديدًا بهيكله الكامل.
 *
 *   node scripts/new-post.mjs cost-of-branding-in-riyadh
 *   node scripts/new-post.mjs my-slug --en      (بنسخة إنجليزية أيضًا)
 *
 * الاسم المُمرَّر هو الرابط نفسه (`/blog/<slug>`)، فاجعله بالإنجليزية
 * وبالشرطات: هو ما يقرؤه جوجل وما يُنسخ في المشاركات.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
const withEn = args.includes("--en");

if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error("اسم المقال بحروف إنجليزية صغيرة وشرطات فقط.");
  console.error("مثال: node scripts/new-post.mjs cost-of-branding-in-riyadh");
  process.exit(1);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src/content/blog", slug);

if (existsSync(dir)) {
  console.error(`المجلّد موجود بالفعل: ${dir}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const meta = `import type { PostEntry } from "../types";

const entry: PostEntry = {
  date: "${today}",
  // الوسوم من مفاتيح src/content/blog/tags.ts
  tags: ["saudi"],
  // الخدمة التي يقود إليها المقال — تظهر في زرّ نهاية المقال
  // service: "web-development",
  ar: {
    // العنوان يظهر في نتائج البحث — اجعله تحت 60 حرفًا إن أمكن
    title: "",
    // الوصف بين 120 و160 حرفًا، ويقرؤه الباحث قبل أن ينقر
    description: "",
  },${
    withEn
      ? `
  en: {
    title: "",
    description: "",
  },`
      : ""
  }
};

export default entry;
`;

const body = (lang) => `${
  lang === "ar"
    ? "افتتاحية من سطرين: ما السؤال الذي يجيب عنه المقال، ولمن.\n\n## أول عنوان فرعي\n\nالنصّ هنا. الجداول والقوائم مدعومة."
    : "A two-line opening: what question this answers, and for whom.\n\n## First heading\n\nText goes here. Tables and lists are supported."
}
`;

mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "meta.ts"), meta, "utf8");
writeFileSync(join(dir, "ar.mdx"), body("ar"), "utf8");
if (withEn) writeFileSync(join(dir, "en.mdx"), body("en"), "utf8");

console.log(`أُنشئ: src/content/blog/${slug}/`);
console.log("  meta.ts   ← العنوان والوصف والتاريخ والوسوم");
console.log("  ar.mdx    ← نصّ المقال");
if (withEn) console.log("  en.mdx    ← النسخة الإنجليزية");
console.log(`\nثم: npm run dev  →  http://localhost:4100/blog/${slug}`);
