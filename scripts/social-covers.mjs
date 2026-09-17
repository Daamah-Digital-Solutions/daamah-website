/**
 * أغلفة أعمال السوشيال — مختارة بالعين لا أوّل ما في المجلّد.
 *
 *   node scripts/social-covers.mjs      # ثم: npm run images
 *
 * الغلاف هو ما يراه الزائر من بطاقة العمل قبل أن يدخل، فأوّل تصميم
 * في الشهر كان يصادف تهنئةً بمناسبة أو منشورًا نصّيًا. هنا لكل عميل
 * تصميمٌ اختير بعد مراجعة شغله كلّه: الأقوى بصريًا والأوضح في قول
 * نشاط العميل — بلا تهانٍ ولا منشورات نصّية ولا صور منتجات خام.
 *
 * القيمة مسار داخل `public/assets/work/gallery/<slug>/`:
 * `YYYY-MM/NN` لمعارض الشهور، و`NN` للمعارض المسطّحة القديمة.
 * `import-social.mjs` يقرأ الخريطة نفسها، فإعادة الاستيراد لا تضيّع الاختيار.
 */
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

export const COVERS = {
  "4k-studio": "2023-10/12",
  "adg-social": "2025-11/28",
  "ahl-alquran": "2025-09/22",
  "alraghad-social": "2024-12/05",
  "alamein-social": "2025-04/09",
  "almohandes-travels": "2022-10/06",
  alqalaa: "2024-04/01",
  alawael: "2025-02/01",
  "amlak-social": "2024-07/14",
  "amlak-revamp": "2025-06/10",
  "amr-elkazaz": "2023-01/04",
  "atm-realestate": "2022-08/10",
  "bird-area": "2022-05/04",
  capimax: "2025-02/04",
  corpenta: "2025-12/03",
  "dr-asmaa-saeed": "2025-09/25",
  "dr-hesham-omar": "2022-06/03",
  "dr-mohamed-ewida": "2023-01/05",
  "eco-vista": "2026-01/01",
  "eliodoro-derma": "2025-08/03",
  "emaar-alryada": "2026-04/04",
  "ems-elriadh": "2026-05/01",
  "fragancia-social": "2025-01/07",
  godran: "2023-06/11",
  "green-flash": "2025-12/12",
  greenmark: "2023-05/05",
  "hedaya-dental": "2023-02/08",
  "mardi-holding": "2024-10/01",
  "mohamed-gamal-law": "2022-12/06",
  natwan: "2026-05/01",
  "profitmax-social": "2024-08/06",
  "royal-consultant": "2023-11/01",
  "saif-events": "2025-05/01",
  "sat-leaders": "2023-04/12",
  "sky-shooter": "2025-11/01",
  swissroll: "2024-11/09",
  "techcare-social": "2024-07/04",
  "trustech-social": "2024-01/04",
  "vibrant-social": "2024-09/10",
  "xtreme-blue": "05",
  muri: "29",
  vida: "19",
  nasea: "01",
  alhaitham: "17",
  almuttahida: "01",
  rahiq: "04",
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** مسار ملف الغلاف المختار داخل المعرض */
export function coverSource(slug) {
  const pick = COVERS[slug];
  if (!pick) return null;
  const base = join(root, "public/assets/work/gallery", slug, pick);
  for (const ext of [".webp", ".jpg"]) if (existsSync(base + ext)) return base + ext;
  return null;
}

/** اسم ملف الغلاف من حقل `image` في work.ts */
async function coverNames() {
  const { readFileSync } = await import("node:fs");
  const src = readFileSync(join(root, "src/content/work.ts"), "utf8");
  const out = {};
  for (const m of src.matchAll(/slug: "([\w-]+)",[\s\S]*?image: "\/assets\/work\/([\w-]+)\.jpg"/g)) {
    out[m[1]] ??= m[2];
  }
  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const names = await coverNames();
  let n = 0;
  for (const slug of Object.keys(COVERS)) {
    const from = coverSource(slug);
    const name = names[slug];
    if (!from || !name) {
      console.log(`${slug.padEnd(20)} — ${!from ? "الملف غير موجود" : "لا عمل بهذا المفتاح"}`);
      continue;
    }
    await sharp(from)
      .flatten({ background: "#ffffff" })
      .resize({ width: 1080, withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(join(root, "public/assets/work", `${name}.jpg`));
    n += 1;
  }
  console.log(`\n${n} غلافًا. شغّل الآن: npm run images`);
}
