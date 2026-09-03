import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { OG_IMAGE, SITE_URL, routes } from "./src/content/seo";
import { withLang, type Lang } from "./src/i18n";

const LANGS: Lang[] = ["ar", "en"];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * يولّد ملف HTML ثابتًا لكل مسار × لغة، برأسٍ صحيح، إضافةً إلى
 * `sitemap.xml` و`robots.txt`.
 *
 * الجسم يبقى غلاف التطبيق — React هو من يرسم المحتوى. لكن زاحفات
 * الشبكات الاجتماعية (واتساب، فيسبوك، لينكدإن) **لا تشغّل JavaScript**
 * إطلاقًا، فلا ترى إلا ما في الرأس وقت التحميل. بدون هذه الخطوة تظهر
 * كل روابط الموقع بعنوان الرئيسية وبلا صورة معاينة.
 */
/**
 * يحقن وسم تحقّق Google Search Console في الرأس — إن وُجد رمزه.
 *
 * يُحقن هنا لا يُكتب في `index.html` مباشرةً: الرمز يخصّ حساب النشر،
 * ولا مكان له في مستودع عام. وبلا رمز لا يُضاف وسم فارغ.
 */
function verification(): Plugin {
  let code: string | undefined;
  return {
    name: "daamah:verification",
    configResolved(config) {
      code = config.env.VITE_GSC_VERIFICATION as string | undefined;
    },
    transformIndexHtml() {
      if (!code) return;
      return [
        {
          tag: "meta",
          attrs: { name: "google-site-verification", content: code },
          injectTo: "head",
        },
      ];
    },
  };
}

function prerenderMeta(): Plugin {
  return {
    name: "daamah:prerender-meta",
    apply: "build",
    closeBundle() {
      const outDir = "dist";
      const template = readFileSync(join(outDir, "index.html"), "utf8");
      const urls: string[] = [];

      for (const route of routes) {
        for (const lang of LANGS) {
          const localized = withLang(route.path, lang);
          const url = `${SITE_URL}${localized}`;
          const title = route.title[lang];
          const desc = route.description[lang];

          const head = [
            `<title>${esc(title)}</title>`,
            `<meta name="description" content="${esc(desc)}" />`,
            `<link rel="canonical" href="${url}" />`,
            `<link rel="alternate" hreflang="ar" href="${SITE_URL}${withLang(route.path, "ar")}" />`,
            `<link rel="alternate" hreflang="en" href="${SITE_URL}${withLang(route.path, "en")}" />`,
            `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${withLang(route.path, "ar")}" />`,
            `<meta property="og:title" content="${esc(title)}" />`,
            `<meta property="og:description" content="${esc(desc)}" />`,
            `<meta property="og:url" content="${url}" />`,
            `<meta property="og:locale" content="${lang === "ar" ? "ar_AR" : "en_US"}" />`,
            `<meta property="og:image" content="${SITE_URL}${OG_IMAGE}" />`,
            `<meta name="twitter:card" content="summary_large_image" />`,
            `<meta name="twitter:title" content="${esc(title)}" />`,
            `<meta name="twitter:description" content="${esc(desc)}" />`,
            `<meta name="twitter:image" content="${SITE_URL}${OG_IMAGE}" />`,
          ].join("\n    ");

          const html = template
            // العنوان والوصف الافتراضيان في القالب يُستبدلان لا يُضاعفان
            .replace(/<title>[\s\S]*?<\/title>\s*/, "")
            .replace(/<meta name="description"[^>]*\/>\s*/, "")
            .replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">`)
            .replace("</head>", `  ${head}\n  </head>`);

          // `/` ← dist/index.html ، `/en/about` ← dist/en/about/index.html
          const file =
            localized === "/"
              ? join(outDir, "index.html")
              : join(outDir, localized.slice(1), "index.html");
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, html, "utf8");

          urls.push(
            [
              "  <url>",
              `    <loc>${url}</loc>`,
              `    <xhtml:link rel="alternate" hreflang="ar" href="${SITE_URL}${withLang(route.path, "ar")}"/>`,
              `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${withLang(route.path, "en")}"/>`,
              `    <priority>${route.priority.toFixed(1)}</priority>`,
              "  </url>",
            ].join("\n"),
          );
        }
      }

      writeFileSync(
        join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`,
        "utf8",
      );

      writeFileSync(
        join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
        "utf8",
      );

      this.info?.(`prerendered ${routes.length * LANGS.length} pages + sitemap`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), verification(), prerenderMeta()],
  resolve: {
    alias: { "@": new URL("./src/", import.meta.url).pathname },
  },
  server: { port: 4100 },
});
