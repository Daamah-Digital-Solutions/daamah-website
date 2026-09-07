/**
 * يحوّل بريزنتيشن العمل (PDF) إلى معرض صفحات.
 *
 *   node scripts/import-pdf.mjs <slug> <ملف.pdf> [--pages 1-6,9] [--cover اسم] [--slides] [--dry مجلّد]
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
  console.error("الاستعمال: node scripts/import-pdf.mjs <slug> <ملف.pdf> [--pages 1-6,9] [--cover اسم] [--dry مجلّد]");
  process.exit(1);
}

/** عرض الترميز — يكفي أوسع عمود على شاشة مضاعفة الكثافة، ويكفي القراءة في العارض */
const WIDTH = Number(flag("width") ?? 1400);
const dry = flag("dry");
const cover = flag("cover");
const out = dry ? resolve(dry) : join(root, "public/assets/work/gallery", slug);

/**
 * `--slides`: الصفحة الطويلة شرائح مكدَّسة لا صفحة واحدة.
 *
 * لا يُفعَّل تلقائيًا: من الملفات ما صفحته الطويلة صفحةٌ متّصلة
 * فعلًا — جدول سوق وفقرات تحته — وتقطيعها يقطع محتوى. الأصل أن
 * تبقى الصفحة كما هي، والتقطيع قرارٌ يُتَّخذ لملفٍ يُعرف أنه
 * تصدير «صفحة واحدة» لديك شرائح.
 */
const slides = argv.includes("--slides");
const STACKED = 2.5;

/** «1-6,9,12» ← [1,2,3,4,5,6,9,12] */
function parsePages(spec, total) {
  if (!spec) return Array.from({ length: total }, (_, i) => i + 1);
  const wanted = [];
  for (const part of spec.split(",")) {
    const [a, b] = part.split("-").map((n) => parseInt(n.trim(), 10));
    if (Number.isNaN(a)) continue;
    /* «9» بلا شرطة يعطي b غير معرّف لا NaN، و`n <= undefined` أبدًا false */
    const to = Number.isFinite(b) ? b : a;
    for (let n = a; n <= to; n++) {
      if (n >= 1 && n <= total && !wanted.includes(n)) wanted.push(n);
    }
  }
  return wanted;
}

/**
 * حدود الشرائح داخل صفحة طويلة.
 *
 * كثير من البريزنتيشن يُصدَّر «صفحة واحدة» طولها عشرة آلاف بكسل،
 * وهي في الحقيقة شرائح مكدَّسة. القصّ بالتساوي يقطعها في منتصفها،
 * والفاصل بينها سطرٌ موحّد اللون يمتدّ بعرض الصفحة — فنبحث عنه.
 */
async function slideCuts(buf, height) {
  const probe = 160;
  const { data, info } = await sharp(buf).greyscale().resize({ width: probe }).raw().toBuffer({ resolveWithObject: true });

  const uniform = new Uint8Array(info.height);
  for (let y = 0; y < info.height; y++) {
    let min = 255, max = 0;
    for (let x = 0; x < info.width; x++) {
      const v = data[y * info.width + x];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    uniform[y] = max - min < 10 ? 1 : 0;
  }

  const H = info.height;
  let target = info.width * (9 / 16);   // الشريحة المعتادة 16:9
  const cuts = [0];

  const nearest = (ideal, span) => {
    let best = -1, bestD = Infinity;
    for (let y = Math.max(1, Math.round(ideal - span)); y <= Math.min(H - 1, Math.round(ideal + span)); y++) {
      if (!uniform[y]) continue;
      const d = Math.abs(y - ideal);
      if (d < bestD) { bestD = d; best = y; }
    }
    return best;
  };

  while (cuts[cuts.length - 1] + target * 0.6 < H) {
    const from = cuts[cuts.length - 1];
    const ideal = from + target;
    if (ideal > H - target * 0.4) break;
    const y = nearest(ideal, target * 0.3);
    const cut = y > 0 ? y : Math.round(ideal);
    if (cuts.length === 1 && y > 0) target = cut - from;   // نتبنّى الارتفاع المكتشف
    cuts.push(cut);
  }
  cuts.push(H);

  const k = height / H;
  return cuts.map((y) => Math.round(y * k));
}

const doc = mupdf.Document.openDocument(readFileSync(file), "application/pdf");
const total = doc.countPages();
const pages = parsePages(flag("pages"), total);

console.log(`${basename(file)} — ${total} صفحة، سيُنشر منها ${pages.length}`);

if (existsSync(out) && !dry) rmSync(out, { recursive: true });
mkdirSync(out, { recursive: true });

let n = 0;

/** يحفظ صورة واحدة ويعيد الرقم المستعمل */
async function save(buf, region) {
  n += 1;
  const name = `${String(n).padStart(2, "0")}.jpg`;
  let img = sharp(buf);
  if (region) img = img.extract(region);
  const info = await img.jpeg({ quality: 86, mozjpeg: true }).toFile(join(out, name));

  /* الغلاف هو أوّل صورة منشورة — وتبقى في المعرض أيضًا: هي صفحة
     من البريزنتيشن لا بطاقة عنوان مصنوعة للواجهة */
  if (n === 1 && cover && !dry) {
    let c = sharp(buf);
    if (region) c = c.extract(region);
    await c.jpeg({ quality: 88, mozjpeg: true }).toFile(join(root, "public/assets/work", `${cover}.jpg`));
  }
  return { name, ...info };
}

for (const p of pages) {
  const page = doc.loadPage(p - 1);
  const [x0, , x1] = page.getBounds();
  const scale = WIDTH / (x1 - x0);
  const pix = page.toPixmap(mupdf.Matrix.scale(scale, scale), mupdf.ColorSpace.DeviceRGB, false, true);
  const buf = Buffer.from(pix.asPNG());
  const meta = await sharp(buf).metadata();

  if (slides && meta.height / meta.width > STACKED) {
    const cuts = await slideCuts(buf, meta.height);
    console.log(`  ص${String(p).padStart(2)} — ${meta.width}×${meta.height}، ${cuts.length - 1} شريحة مكدَّسة`);
    for (let i = 0; i < cuts.length - 1; i++) {
      const top = cuts[i];
      const h = Math.min(cuts[i + 1] - top, meta.height - top);
      if (h < 40) continue;
      const info = await save(buf, { left: 0, top, width: meta.width, height: h });
      console.log(`       → ${info.name}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
    }
  } else {
    const info = await save(buf);
    console.log(`  ص${String(p).padStart(2)} → ${info.name}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
  }
}

console.log(`\n${n} صورة في ${dry ? out : `معرض «${slug}»`}.`);
if (!dry) console.log("شغّل الآن: npm run images");
