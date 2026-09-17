/**
 * يولّد نسخ AVIF و WebP بعدّة عروض من صور الموقع، ويكتب فهرس المعرض.
 *
 *   npm run images
 *
 * تُشغَّل يدويًا عند إضافة صورة، والملفات المولّدة تُلتزم في
 * المستودع — فالبناء لا يحتاج `sharp` ولا يعيد الترميز في كل مرّة.
 * ما هو محدَّث يُتخطّى، فإعادة التشغيل رخيصة.
 *
 * لماذا أكثر من عرض: بطاقة العمل تُعرض بثلث الشاشة على الديسكتوب
 * وبعرضها كاملًا على الجوال. إرسال صورة 1400px إلى شاشة 390px
 * يهدر أكثر من ثمانية أضعاف ما يلزم من البايتات.
 *
 * وصور المعرض أضيق: أوسع عمود فيها نحو 460px، فعرضان يكفيان —
 * والفرق مضروبٌ في مئتي صورة، فهو ما يقرّر حجم المستودع.
 */
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GALLERY = "public/assets/work/gallery";

/** العروض المولّدة لكل مجلّد — تُقابل `widths` في `Img.tsx`. */
const TARGETS = [
  { dir: "public/assets/work", widths: [480, 800, 1400] },
  { dir: "public/assets/blog", widths: [480, 800, 1400] },
];

export const WIDTHS = [480, 800, 1400];
export const GALLERY_WIDTHS = [480, 960];

const FORMATS = [
  { ext: "avif", opts: { quality: 55, effort: 6 } },
  { ext: "webp", opts: { quality: 72 } },
];

let made = 0;
let skipped = 0;

/** يولّد النسخ لملف واحد ويعيد مقاس الأصل. */
async function variants(dir, file, widths) {
  const src = join(dir, file);
  const base = file.slice(0, -extname(file).length);
  const srcTime = statSync(src).mtimeMs;
  const meta = await sharp(src).metadata();

  for (const w of widths) {
    // لا نكبّر ما هو أصغر من العرض المطلوب
    if (meta.width && meta.width < w) continue;

    for (const { ext, opts } of FORMATS) {
      const out = join(dir, `${base}-${w}.${ext}`);
      if (existsSync(out) && statSync(out).mtimeMs >= srcTime) {
        skipped++;
        continue;
      }
      await sharp(src).resize(w).toFormat(ext, opts).toFile(out);
      made++;
    }
  }

  return { width: meta.width, height: meta.height };
}

const sources = (dir) =>
  readdirSync(dir)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();

/* ── صور الصفحات ── */
const covers = {};

for (const { dir: rel, widths } of TARGETS) {
  const dir = join(root, rel);
  if (!existsSync(dir)) continue;
  for (const file of sources(dir)) {
    const { width, height } = await variants(dir, file, widths);
    if (rel === "public/assets/work") {
      covers[`/assets/work/${file}`] = { w: width, h: height };
    }
  }
}

/* ── المعرض: مجلّد لكل عمل، والفهرس يُشتقّ من القرص لا يُكتب يدويًا ── */
const galleryDir = join(root, GALLERY);
const index = {};

if (existsSync(galleryDir)) {
  for (const slug of readdirSync(galleryDir).sort()) {
    const dir = join(galleryDir, slug);
    if (!statSync(dir).isDirectory()) continue;

    const shots = [];
    for (const file of sources(dir)) {
      const { width, height } = await variants(dir, file, GALLERY_WIDTHS);
      shots.push({ src: `/assets/work/gallery/${slug}/${file}`, w: width, h: height });
    }

    /* السوشيال: شهور `YYYY-MM` داخل مجلّد العمل، وWebP جاهز من
       `import-social.mjs` — لا نسخ تُولَّد، فقط المقاس والشهر */
    const months = readdirSync(dir)
      .filter((m) => /^\d{4}-\d\d$/.test(m) && statSync(join(dir, m)).isDirectory())
      .sort();
    for (const month of months) {
      const files = readdirSync(join(dir, month))
        .filter((f) => /^\d+\.webp$/.test(f))
        .sort();
      for (const file of files) {
        const meta = await sharp(join(dir, month, file)).metadata();
        shots.push({
          src: `/assets/work/gallery/${slug}/${month}/${file}`,
          w: meta.width,
          h: meta.height,
          month,
        });
      }
    }
    if (shots.length) index[slug] = shots;
  }
}

const coverBody = Object.entries(covers)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([src, { w, h }]) => `  "${src}": { w: ${w}, h: ${h} },`)
  .join("\n");

const body = Object.entries(index)
  .map(
    ([slug, shots]) =>
      `  ${/^[a-z][\w]*$/.test(slug) ? slug : JSON.stringify(slug)}: [\n` +
      shots
        .map((s) => `    { src: "${s.src}", w: ${s.w}, h: ${s.h}${s.month ? `, month: "${s.month}"` : ""} },`)
        .join("\n") +
      "\n  ],",
  )
  .join("\n");

const total = Object.values(index).reduce((n, s) => n + s.length, 0);

writeFileSync(
  join(root, "src/content/gallery.ts"),
  `/**
 * معرض كل عمل — مولَّد، لا يُحرَّر يدويًا.
 *
 * المصدر هو ما في \`public/assets/work/gallery/<slug>/\`، ويُعاد
 * توليد هذا الملف بـ \`npm run images\`. المقاسات محفوظة هنا لأن
 * الشبكة تحجز مكان كل صورة قبل وصولها، وإلا قفزت الصفحة مع كل
 * صورة تُحمَّل — وهي مئتان.
 */

/** \`month\` لتصاميم السوشيال وحدها: شهر النشر، ومنه تُجمَّع في المعرض */
export type Shot = { src: string; w: number; h: number; month?: string };

/**
 * مقاس كل غلاف — الأغلفة لم تعد بنسبة واحدة.
 *
 * كانت كلّها مقصوصة إلى 3:2 فبدت الشبكة صفًّا مكرّرًا؛ والمادة
 * نفسها متنوّعة: منشور سوشيال مربّع وشريحة عرض عريضة. الشبكة
 * تحترم نسبة كل عمل، فتحتاج مقاسه قبل تحميله.
 */
export const coverSize: Record<string, { w: number; h: number }> = {
${coverBody}
};

export const galleries: Record<string, Shot[]> = {
${body}
};
`,
  "utf8",
);

console.log(`صور: ${made} مولّدة، ${skipped} محدّثة سلفًا.`);
console.log(`المعرض: ${total} صورة في ${Object.keys(index).length} عملًا.`);
