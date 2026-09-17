/**
 * يستورد شغل السوشيال ميديا من أرشيف العملاء، مجمّعًا بالشهر.
 *
 *   node scripts/import-social.mjs [--only slug,slug] [مسار الأرشيف]
 *   npm run images        # بعده، ليكتب الفهرس
 *
 * المصدر: مجلّد لكل عميل، وداخله شهور بصيغة `YYYY-MM`، وأسماء الملفات
 * `DD_<عنوان الكارت>__<اسم المرفق>`. الناتج:
 *
 *   public/assets/work/gallery/<slug>/<YYYY-MM>/NN.webp       (≤1080px)
 *   public/assets/work/gallery/<slug>/<YYYY-MM>/NN-480.webp
 *
 * WebP وحده وبعرضين: التصميم يُعرض كاملًا بنسبته — لا قصّ — وملفّان
 * لكل تصميم بدل خمسة، لأن ألفي تصميم بخمسة ملفات تقترب بالنشر من حدّ
 * Vercel وتضاعف حجم المستودع.
 *
 * الشهور: العميل الذي له سبعة أشهر أو أقل يُنشر شغله كلّه؛ ومن تجاوزها
 * نُشرت أفضل سبعة، مختارةً بمراجعة كل شهر كاملًا — ومسجّلةً هنا لتُراجَع.
 *
 * يُستبعد: تصاميم البروفايل والكوفر (هوية لا محتوى)، ولقطات الشاشة
 * وصور الواتساب والفيسبوك والكاميرا، والـGIF والـPDF، والمكرّر بالبايت.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { COVERS } from "./social-covers.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const onlyArg = args.indexOf("--only");
const only = onlyArg >= 0 ? new Set(args[onlyArg + 1].split(",")) : null;
const SRC = args.find((a, i) => !a.startsWith("--") && i !== onlyArg + 1)
  ?? "E:/Work/daamah-digital-solutions/trello/clients/1website clients";

/**
 * [مجلّدات المصدر، مفتاح العمل، اسم الغلاف، الشهور المنشورة، الغلاف]
 *
 * الشهور `null` تعني كلّها. الغلاف `"YYYY-MM/N"` يختار تصميمًا بعينه،
 * وإن غاب فأوّل تصميم في آخر شهر منشور.
 */
const CLIENTS = [
  [["4k"], "4k-studio", "social-4kstudio"],
  [["ADG Real Estate"], "adg-social", "social-adg"],
  [["Ahl Alquran Academy"], "ahl-alquran", "social-ahlalquran",
    ["2025-07", "2025-08", "2025-09", "2025-10", "2025-12", "2026-01", "2026-08"]],
  [["al raghd"], "alraghad-social", "social-alraghad",
    ["2023-10", "2023-12", "2024-02", "2024-04", "2024-10", "2024-12", "2025-02"]],
  [["al-amein"], "alamein-social", "social-alamein",
    ["2024-06", "2024-08", "2024-09", "2024-11", "2024-12", "2025-01", "2025-04"]],
  [["Almohandes Travels"], "almohandes-travels", "social-almohandes"],
  [["Alqalaa"], "alqalaa", "social-alqalaa",
    ["2024-04", "2024-06", "2024-07", "2024-08", "2024-11", "2025-01", "2025-03"]],
  [["Amlak Al-Awail Real Estate"], "alawael", "social-alawael",
    ["2024-12", "2025-01", "2025-02", "2025-03", "2025-06", "2025-07", "2025-08"]],
  [["Amlak Real Estate"], "amlak-social", "social-amlak",
    ["2023-07", "2023-09", "2023-10", "2024-01", "2024-02", "2024-07", "2025-01"]],
  [["Amlak Real Estate New Identity"], "amlak-revamp", "social-amlak-revamp"],
  [["AMR ELKAZAZ FITNESS ACADEMY"], "amr-elkazaz", "social-amrelkazaz",
    ["2022-05", "2022-06", "2022-09", "2022-11", "2022-12", "2023-01", "2023-02"]],
  [["ATM Real Estate"], "atm-realestate", "social-atm"],
  [["Bird Area"], "bird-area", "social-birdarea"],
  [["capimax"], "capimax", "social-capimax"],
  [["Corpenta"], "corpenta", "social-corpenta"],
  [["dr. asmaa saeed"], "dr-asmaa-saeed", "social-asmaasaeed",
    ["2025-09", "2025-12", "2026-02", "2026-03", "2026-05", "2026-06", "2026-07"]],
  [["Dr. Hesham omar"], "dr-hesham-omar", "social-heshamomar"],
  [["Dr. Mohamed Ewida Dentist"], "dr-mohamed-ewida", "social-ewida"],
  [["ECO VISTA"], "eco-vista", "social-ecovista"],
  [["Eliodoro Derma"], "eliodoro-derma", "social-eliodoro",
    ["2024-12", "2025-01", "2025-02", "2025-03", "2025-05", "2025-07", "2025-08"]],
  [["EMAAR ALRYADA Real Estate"], "emaar-alryada", "social-emaaralryada"],
  [["EMS ELRIADH"], "ems-elriadh", "social-emselriadh"],
  [["fergancia"], "fragancia-social", "social-fragancia"],
  [["Godran Real Estate"], "godran", "social-godran"],
  [["Green flash"], "green-flash", "social-greenflash"],
  [["Green Mark"], "greenmark", "social-greenmark"],
  [["Hedaya Dental center"], "hedaya-dental", "social-hedaya"],
  [["Mardi Holding Real Estate"], "mardi-holding", "social-mardi"],
  [["Mohamed Gamal low"], "mohamed-gamal-law", "social-mohamedgamal"],
  [["NATWAN"], "natwan", "social-natwan"],
  [["Profit Max Investment"], "profitmax-social", "social-profitmax"],
  [["Royal"], "royal-consultant", "social-royalconsultant"],
  [["saif events"], "saif-events", "social-saifevents"],
  [["Satleaders Academy"], "sat-leaders", "social-satleaders"],
  [["SKY Shooter"], "sky-shooter", "social-skyshooter"],
  [["Swiss Roll", "Swissroll"], "swissroll", "social-swissroll",
    ["2023-02", "2023-08", "2023-10", "2023-11", "2024-01", "2024-06", "2024-11"]],
  [["Tech Care"], "techcare-social", "social-techcare"],
  [["Trustech"], "trustech-social", "social-trustech"],
  [["vibrant design"], "vibrant-social", "social-vibrant"],
];

/** بروفايل وكوفر، ولقطات ليست تصميمًا نهائيًا */
const SKIP = /(cover|profile|بروفايل|كوفر|screenshot|whatsapp_image|fb_img|^\d\d_img_|upscaled)/i;

/* أسماء بعض المجلّدات تحمل إيموجي — نطابق بالبداية لا بالاسم كاملًا */
const entries = readdirSync(SRC);
const folderOf = (name) => {
  const hit = entries.find((e) => e === name) ?? entries.find((e) => e.startsWith(name));
  if (!hit) return null;
  const p = join(SRC, hit);
  const nested = join(p, "social media");
  return existsSync(nested) ? nested : p;
};

const monthsIn = (dir) =>
  readdirSync(dir).filter((m) => /^\d{4}-\d\d$/.test(m) && statSync(join(dir, m)).isDirectory());

let totalShots = 0;

for (const [folders, slug, coverName, chosen, coverPick] of CLIENTS) {
  if (only && !only.has(slug)) continue;

  /* شهر ← ملفّاته، من كل مجلّدات المصدر (سويسرول مجلّدان لعميل واحد) */
  const byMonth = new Map();
  for (const f of folders) {
    const dir = folderOf(f);
    if (!dir) {
      console.log(`${slug.padEnd(20)} — لا مصدر: ${f}`);
      continue;
    }
    for (const m of monthsIn(dir)) {
      const files = readdirSync(join(dir, m))
        .filter((x) => /\.(png|jpe?g)$/i.test(x) && !SKIP.test(x))
        .sort()
        .map((x) => join(dir, m, x));
      if (files.length) byMonth.set(m, [...(byMonth.get(m) ?? []), ...files]);
    }
  }

  const allMonths = [...byMonth.keys()].sort();
  const months = chosen ?? allMonths;
  const missing = months.filter((m) => !byMonth.has(m));
  if (missing.length) throw new Error(`${slug}: شهور غير موجودة ${missing.join(", ")}`);

  const out = join(root, "public/assets/work/gallery", slug);
  if (existsSync(out)) rmSync(out, { recursive: true });

  const seen = new Set();
  const written = new Map();
  let count = 0;

  for (const m of months) {
    const dirOut = join(out, m);
    mkdirSync(dirOut, { recursive: true });
    let n = 0;
    for (const file of byMonth.get(m)) {
      const buf = readFileSync(file);
      const hash = createHash("md5").update(buf).digest("hex");
      if (seen.has(hash)) continue;
      seen.add(hash);

      const meta = await sharp(buf).metadata();
      /* أعرض من طوله: كوفر فيسبوك أو لينكدإن فاته الاسم */
      if (!meta.width || meta.width < 480 || meta.width > meta.height * 1.2) continue;

      n += 1;
      const name = String(n).padStart(2, "0");
      const img = () => sharp(buf).flatten({ background: "#ffffff" });
      await img().resize({ width: 1080, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join(dirOut, `${name}.webp`));
      await img().resize({ width: 480 }).webp({ quality: 72 }).toFile(join(dirOut, `${name}-480.webp`));
      written.set(`${m}/${n}`, buf);
    }
    if (n === 0) rmSync(dirOut, { recursive: true });
    count += n;
  }

  /* الغلاف: التصميم المختار في `social-covers.mjs`، بنسبته بلا قصّ */
  const [pm, pn] = (COVERS[slug] ?? coverPick ?? "").split("/");
  const last = months[months.length - 1];
  const coverBuf =
    written.get(pn ? `${pm}/${Number(pn)}` : `${last}/1`) ?? [...written.values()][0];
  if (coverBuf) {
    await sharp(coverBuf)
      .flatten({ background: "#ffffff" })
      .resize({ width: 1080, withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(join(root, "public/assets/work", `${coverName}.jpg`));
  }

  totalShots += count;
  console.log(`${slug.padEnd(20)} شهور: ${months.length}/${allMonths.length} · تصاميم: ${count}`);
}

console.log(`\n${totalShots} تصميمًا. شغّل الآن: npm run images`);
