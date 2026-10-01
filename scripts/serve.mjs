/**
 * خادم ثابت يحاكي سلوك Vercel — لمعاينة ما يُنشر فعلًا.
 *
 * `vite preview` لا يصلح لذلك: يردّ `index.html` على كل مسار مجهول
 * (احتياطي تطبيقات الصفحة الواحدة)، فتصل الرئيسية إلى `/about` ثم
 * يرسم العميل صفحة أخرى فوقها — أي أن كل صفحة داخلية تبدو وكأن
 * ترطيبها فاشل، وهو خطأ في المعاينة لا في الموقع.
 *
 * القواعد هنا هي قواعد `vercel.json`:
 * - `/about`   ← dist/about/index.html      (cleanUrls)
 * - `/about/`  ← تحويل 308 إلى `/about`     (trailingSlash: false)
 * - المجهول    ← dist/404.html بحالة 404
 *
 *   node scripts/serve.mjs [port]
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { createBrotliCompress } from "node:zlib";
import { extname, join, resolve } from "node:path";

const dist = resolve("dist");
const port = Number(process.argv[2] ?? 4200);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".webmanifest": "application/manifest+json",
};

const isFile = (p) => existsSync(p) && statSync(p).isFile();

/* Vercel يضغط النصوص (Brotli) — وبلا ضغط هنا يقيس Lighthouse محليًا
   صفحةً أثقل بأضعاف ممّا يصل الزائر فعلًا */
const TEXT = new Set([".html", ".js", ".css", ".json", ".xml", ".txt", ".svg", ".webmanifest"]);

const send = (res, status, file, req) => {
  const compress = TEXT.has(extname(file)) && /\bbr\b/.test(req?.headers["accept-encoding"] ?? "");
  res.writeHead(status, {
    "Content-Type": TYPES[extname(file)] ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    ...(compress && { "Content-Encoding": "br", Vary: "Accept-Encoding" }),
  });
  const body = createReadStream(file);
  if (compress) body.pipe(createBrotliCompress()).pipe(res);
  else body.pipe(res);
};

createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  let path = decodeURIComponent(url.pathname);

  // منع الخروج من مجلد النشر
  if (path.includes("..")) {
    res.writeHead(400).end("bad path");
    return;
  }

  // trailingSlash: false — الشرطة الأخيرة تُحوَّل لا تُخدَم
  if (path.length > 1 && path.endsWith("/")) {
    res.writeHead(308, { Location: path.slice(0, -1) + url.search }).end();
    return;
  }

  const direct = join(dist, path);
  if (isFile(direct)) return send(res, 200, direct, req);

  const asDir = join(dist, path, "index.html");
  if (isFile(asDir)) return send(res, 200, asDir, req);

  const asHtml = `${direct}.html`;
  if (isFile(asHtml)) return send(res, 200, asHtml, req);

  const notFound = join(dist, path.startsWith("/en") ? "en/404.html" : "404.html");
  if (isFile(notFound)) return send(res, 404, notFound, req);

  res.writeHead(404, { "Content-Type": "text/plain" }).end("404");
}).listen(port, () => {
  console.log(`dist served like Vercel → http://localhost:${port}`);
});
