/**
 * يستورد صور مشروع من ملف الأعمال إلى المستودع.
 *
 *   node scripts/import-work.mjs [--only slug,slug] [مسار المصدر]
 *   npm run images        # بعده، ليولّد النسخ والفهرس
 *
 * الفولدر هو المرجع: ما فيه يظهر، وما حُذف منه يختفي. فحين يُنقّى
 * مجلّد مشروع تُعاد المزامنة بأمر واحد بدل تتبّع الملفات يدويًا.
 *
 * الغلاف: الملف المذكور في `FEATURED` إن وُجد — وهو بطاقة عنوان
 * مصمّمة للواجهة لا قطعة من الشغل، فلا تدخل المعرض. وإن غاب (حُذف
 * من المصدر) يصير الغلاف أوّل صورة فعلية، وتبقى هي أيضًا في
 * المعرض لأنها شغلٌ لا بطاقة.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const onlyArg = args.indexOf("--only");
const only = onlyArg >= 0 ? new Set(args[onlyArg + 1].split(",")) : null;
const SRC = args.find((a, i) => !a.startsWith("--") && i !== onlyArg + 1)
  ?? "C:/Users/MT/Downloads/daamah_portfolio_images (1)";

/** الفولدر ← [مفتاح العمل، اسم ملف الغلاف، بطاقة العنوان إن وُجدت] */
const PROJECTS = [
  ["01_Social_Media_Rahiq", "rahiq", "social-rahiq"],
  ["02_Web_Development_Profit_Max_Investment", "profitmax-web", "web-profitmax", "082_profitmax-featured-img-up.png"],
  ["03_Social_Media_Sat_Leaders_Academy", "sat-leaders", "social-satleaders"],
  ["04_Social_Media_Green_Mark", "greenmark", "social-greenmark"],
  ["05_Web_Development_Future_Axis", "future-axis", "web-futureaxis", "081_Future-Axis-Img.png"],
  ["06_Brand_Identity_Profit_Max_Investment", "profitmax-brand", "brand-profitmax", "011_profit-max-1-compressed-images-4-1-scaled.jpg"],
  ["07_Web_Development_International_Insurance_Company", "hcc-insurance", "web-insurance", "082_hccinsurance-featured-img.png"],
  ["08_Web_Development_Vibrant_Design", "vibrant-design", "web-vibrant", "082_vibrantdesign-featured-img.png"],
  ["09_Web_Development_SY_Sara_Younis", "sara-younis", "web-fashion", "082_sarayounis-featured-img.png"],
  ["10_Web_Development_Utility_Vision", "utility-vision", "web-utilityvision", "082_utility-vision.png"],
  ["11_Alhayat_Poultry_Farm_website", "alhayat-web", "web-alhayat", "082_alhayattemplate-updated2.png"],
  ["12_Vip_Branding", "vip-limo", "brand-viplimo", "084_vip.png"],
  ["13_Daughters_Branding", "daughters", "brand-daughters", "085_DUATERS.png"],
  ["14_Caffeine_Kiss_Branding", "caffeine-kiss", "brand-caffeinekiss", "086_caffeine-kiss.png"],
  ["15_Auto_Car_Branding", "auto-crazy-car", "brand-autocrazycar", "084_auto-branding.png"],
  ["16_Sedra_Branding", "sedra", "brand-sedra", "084_sedra.png"],
  ["17_Tech_Care_Branding", "tech-care", "brand-techcare", "085_tech.png"],
  ["18_Alraghd_Branding", "alraghad", "brand-alraghad", "011_alraghd-presen_page-0002.jpg"],
  ["19_Al_Hyat_Poultry_Farm_Branding", "alhayat-brand", "brand-alhayat", "097_الحياة.png"],
];

/**
 * صور ليست من شغلنا.
 *
 * ملفّان يتكرّران في ثلاثة فولدرات، وهما عيّنتا موك-أب جاهزة تحمل
 * علامة شركة أخرى — نشرهما في معرض أعمالنا ادّعاءٌ بشغل ليس لنا.
 */
const FOREIGN = new Set(["1-compressed-1-1-1.jpg", "2-compressed-3-1.jpg"]);

/** نسخة مصغّرة يولّدها ووردبريس — تكرارٌ لصورة موجودة أصلًا */
const isThumb = (f) => /-\d{3,4}x\d{3,4}\.(png|jpe?g)$/i.test(f);
const isLogo = (f) => /cropped-daamah-title-img/i.test(f);
const isForeign = (f) => FOREIGN.has(f.replace(/^\d+_/, ""));
const num = (f) => parseInt(f.match(/^(\d+)_/)?.[1] ?? "999", 10);

const seen = new Set();
let covers = 0;
let shots = 0;

for (const [dir, slug, coverName, featured] of PROJECTS) {
  if (only && !only.has(slug)) continue;

  const from = join(SRC, dir);
  if (!existsSync(from)) {
    console.log(`${slug.padEnd(18)} — لا مصدر، تُرك كما هو`);
    continue;
  }

  const files = readdirSync(from)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .filter((f) => !isThumb(f) && !isLogo(f) && !isForeign(f))
    .sort((a, b) => num(a) - num(b));

  /* البطاقة تُستبعد من المعرض؛ وإن حُذفت من المصدر صار الغلاف
     أوّل صورة فعلية — وتبقى في المعرض لأنها شغل لا بطاقة */
  const card = featured && files.includes(featured) ? featured : null;
  const content = files.filter((f) => f !== card);
  const coverFrom = card ?? content[0];
  if (!coverFrom) {
    console.log(`${slug.padEnd(18)} — فارغ`);
    continue;
  }

  await sharp(join(from, coverFrom))
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(root, "public/assets/work", `${coverName}.jpg`));
  covers += 1;

  const out = join(root, "public/assets/work/gallery", slug);
  if (existsSync(out)) rmSync(out, { recursive: true });
  mkdirSync(out, { recursive: true });

  let n = 0;
  for (const f of content) {
    const buf = readFileSync(join(from, f));
    const hash = createHash("md5").update(buf).digest("hex");
    if (seen.has(hash)) continue;
    seen.add(hash);

    const meta = await sharp(buf).metadata();
    if (meta.width < 240) continue;

    n += 1;
    await sharp(buf)
      /* 1200 يكفي أوسع عمود في الشبكة على شاشة مضاعفة الكثافة */
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(join(out, `${String(n).padStart(2, "0")}.jpg`));
  }
  shots += n;
  console.log(`${slug.padEnd(18)} غلاف: ${card ? "بطاقة" : "أوّل صورة"} · معرض: ${n}`);
}

console.log(`\n${covers} غلافًا و${shots} صورة. شغّل الآن: npm run images`);
