/**
 * يحوّل بريزنتيشن العمل (PDF) إلى معرض صفحات.
 *
 *   node scripts/import-pdf.mjs <slug> <ملف.pdf> [--pages 1-6,9,12] [--dry مجلّد]
 *   npm run images        # بعده، ليولّد النسخ والفهرس
 *
 * الهوية البصرية والملف التعريفي كلاهما بريزنتيشن متسلسلة، وقراءتها
 * هي التقليب في صفحاتها — وهو بالضبط ما يفعله المعرض وعارض ملء
 * الشاشة. فلا يحتاج الأمر عارض PDF ولا مكتبة تقليب.
 *
 * ولماذا من الـPDF لا من صور مصدَّرة: الصور المصدَّرة من ووردبريس
 * تصل ناقصةً ومبعثرة — أحد الملفات وصلت بترتيب 3، 19، 4، 6، 12 —
 * والبريزنتيشن حجّةٌ متسلسلة: فكرة ثم شعار ثم ألوان ثم تطبيقات.
 * الترتيب المكسور يكسر الحجّة، والـPDF يحفظه.
 *
 * `--pages` للملف التعريفي وحده: فيه محتوى العميل نفسه (مشاريعه
 * وعملاؤه وأرقامه)، فيُنشر منه ما يثبت الحرفة لا ما يغني عنها.
 * بريزنتيشن الهوية شغلنا نحن، وتُنشر كاملة.
 */
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as mupdf from "mupdf";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);

const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : null;
};
const positional = argv.filter((a, i) => {
  if (a.startsWith("--")) return false;
  return !argv[i - 1]?.startsWith("--");
});

const [slug, file] = positional;
if (!slug || !file) {
  console.error("الاستعمال: node scripts/import-pdf.mjs <slug> <ملف.pdf> [--pages 1-6,9] [--dry مجلّد]");
  process.exit(1);
}

/** عرض الترميز — يكفي أوسع عمود على شاشة مضاعفة الكثافة، ويكفي القراءة في العارض */
const WIDTH = Number(flag("width") ?? 1400);
const dry = flag("dry");
const out = dry ? resolve(dry) : join(root, "public/assets/work/gallery", slug);

/** «1-6,9,12» ← [1,2,3,4,5,6,9,12] */
function parsePages(spec, total) {
  if (!spec) return Array.from({ length: total }, (_, i) => i + 1);
  const wanted = [];
  for (const part of spec.split(",")) {
    const [a, b] = part.split("-").map((n) => parseInt(n.trim(), 10));
    if (Number.isNaN(a)) continue;
    for (let n = a; n <= (Number.isNaN(b) ? a : b); n++) {
      if (n >= 1 && n <= total && !wanted.includes(n)) wanted.push(n);
    }
  }
  return wanted;
}

const doc = mupdf.Document.openDocument(readFileSync(file), "application/pdf");
const total = doc.countPages();
const pages = parsePages(flag("pages"), total);

console.log(`${basename(file)} — ${total} صفحة، سيُنشر منها ${pages.length}`);

if (existsSync(out) && !dry) rmSync(out, { recursive: true });
mkdirSync(out, { recursive: true });

let n = 0;
for (const p of pages) {
  const page = doc.loadPage(p - 1);
  const [x0, , x1] = page.getBounds();
  const scale = WIDTH / (x1 - x0);
  const pix = page.toPixmap(mupdf.Matrix.scale(scale, scale), mupdf.ColorSpace.DeviceRGB, false, true);

  n += 1;
  const name = `${String(n).padStart(2, "0")}.jpg`;
  const info = await sharp(Buffer.from(pix.asPNG()))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(out, name));

  console.log(`  ص${String(p).padStart(2)} → ${name}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

console.log(`\n${n} صفحة في ${dry ? out : `معرض «${slug}»`}.`);
if (!dry) console.log("شغّل الآن: npm run images");
