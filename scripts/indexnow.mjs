/**
 * IndexNow — إبلاغ محرّكات البحث فورًا بما تغيّر.
 *
 *   npm run indexnow            # كل روابط خريطة الموقع
 *   npm run indexnow -- /about  # مسارات بعينها
 *
 * ChatGPT search وCopilot يقرآن من فهرس Bing لا من جوجل، وBing يقبل
 * IndexNow: طلبٌ واحد بعد النشر يُدخل الصفحات الجديدة في ساعات بدل
 * أن تنتظر دورة الزحف. المفتاح ملفٌّ في جذر الموقع يُثبت أنّنا أصحابه؛
 * يُقرأ من `.indexnow-key` ولا يُكتب هنا.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "daamah.net";
const key = readFileSync(join(root, ".indexnow-key"), "utf8").trim();

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`);
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

/* الحدّ في المواصفة عشرة آلاف رابط للطلب — نرسل على دفعات أصغر احتياطًا */
for (let i = 0; i < urls.length; i += 500) {
  const batch = urls.slice(i, i + 500);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: batch }),
  });
  console.log(`IndexNow: ${batch.length} urls → ${res.status} ${res.statusText}`);
  if (res.status >= 400) {
    console.error(await res.text());
    process.exitCode = 1;
  }
}
