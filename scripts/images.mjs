/**
 * يولّد نسخ AVIF و WebP بعدّة عروض من صور الأعمال.
 *
 *   npm run images
 *
 * تُشغَّل يدويًا عند إضافة صورة، والملفات المولّدة تُلتزم في
 * المستودع — فالبناء لا يحتاج `sharp` ولا يعيد الترميز في كل مرّة.
 * ما هو محدَّث يُتخطّى، فإعادة التشغيل رخيصة.
 *
 * لماذا ثلاثة عروض: بطاقة العمل تُعرض بثلث الشاشة على الديسكتوب
 * وبعرضها كاملًا على الجوال. إرسال صورة 1400px إلى شاشة 390px
 * يهدر أكثر من ثمانية أضعاف ما يلزم من البايتات.
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dirs = ["public/assets/work", "public/assets/blog"];

/** العروض المولّدة — تُقابل `sizes` في `Img.tsx`. */
export const WIDTHS = [480, 800, 1400];

const FORMATS = [
  { ext: "avif", opts: { quality: 55, effort: 6 } },
  { ext: "webp", opts: { quality: 72 } },
];

let made = 0;
let skipped = 0;

for (const rel of dirs) {
  const dir = join(root, rel);
  if (!existsSync(dir)) continue;

  const sources = readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const file of sources) {
    const src = join(dir, file);
    const base = file.slice(0, -extname(file).length);
    const srcTime = statSync(src).mtimeMs;
    const meta = await sharp(src).metadata();

    for (const w of WIDTHS) {
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
  }
}

console.log(`صور: ${made} مولّدة، ${skipped} محدّثة سلفًا.`);
