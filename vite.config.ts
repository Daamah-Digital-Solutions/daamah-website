import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

const LANGS = ["ar", "en"] as const;
type Lang = (typeof LANGS)[number];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** `</script>` داخل JSON يُنهي الوسم — يُكسر بالهروب لا بالحذف. */
const jsonLd = (v: unknown) => JSON.stringify(v).replace(/</g, "\\u003c");

/**
 * يحقن وسوم تحقّق محركات البحث في الرأس — إن وُجدت رموزها.
 *
 * تُحقن هنا لا تُكتب في `index.html` مباشرةً: الرمز يخصّ حساب النشر،
 * ولا مكان له في مستودع عام. وبلا رمز لا يُضاف وسم فارغ.
 */
function verification(): Plugin {
  let tags: { name: string; content: string }[] = [];
  return {
    name: "daamah:verification",
    configResolved(config) {
      const pairs: [string, string | undefined][] = [
        ["google-site-verification", config.env.VITE_GSC_VERIFICATION as string | undefined],
        ["msvalidate.01", config.env.VITE_BING_VERIFICATION as string | undefined],
      ];
      tags = pairs
        .filter((p): p is [string, string] => Boolean(p[1]))
        .map(([name, content]) => ({ name, content }));
    },
    transformIndexHtml() {
      return tags.map((t) => ({
        tag: "meta",
        attrs: { name: t.name, content: t.content },
        injectTo: "head" as const,
      }));
    },
  };
}

/**
 * وحدة افتراضية تحمل عدد كلمات كل مقال.
 *
 * زمن القراءة يجب أن يظهر في قائمة المقالات، لكن حسابه يقتضي قراءة
 * النصّ — واستيراد النصوص كلها لتُعدّ كلماتها يُدخل المدوّنة بأكملها
 * في أول حزمة. تُعدّ هنا وقت البناء، فيصل الرقم وحده.
 */
function blogStats(): Plugin {
  const ID = "virtual:blog-stats";
  const RESOLVED = `\0${ID}`;
  const dir = resolve("src/content/blog");

  /* ~180 كلمة في الدقيقة — العربية أبطأ من اللاتينية لكثافة حروفها */
  const minutes = (src: string) => {
    const body = src.replace(/```[\s\S]*?```/g, "").replace(/<[^>]+>/g, " ");
    const words = body.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 180));
  };

  return {
    name: "daamah:blog-stats",
    resolveId: (id) => (id === ID ? RESOLVED : undefined),
    load(id) {
      if (id !== RESOLVED) return;
      const out: Record<string, number> = {};
      for (const slug of readdirSync(dir, { withFileTypes: true })) {
        if (!slug.isDirectory()) continue;
        for (const file of readdirSync(join(dir, slug.name))) {
          if (!file.endsWith(".mdx")) continue;
          const lang = file.replace(/\.mdx$/, "");
          out[`${slug.name}/${lang}`] = minutes(
            readFileSync(join(dir, slug.name, file), "utf8"),
          );
        }
      }
      return `export default ${JSON.stringify(out)}`;
    },
  };
}

/**
 * فهرس المسارات المضغوط — العنوان والوصف لكل صفحة، بلا نصوصها.
 *
 * `Seo.tsx` يعيش داخل الغلاف، فهو في أول حزمة يحمّلها كل زائر.
 * واستيراده `content/seo.ts` كان يجرّ معه المحتوى كلّه — نصوص
 * صفحات المدن الثمانية وتفاصيل الخدمات والأسئلة — أي 177 ك.ب لا
 * يحتاجها من فتح الرئيسية.
 *
 * هنا يُقرأ الفهرس من حزمة الرسم المبنيّة قبل حزمة العميل، ويُكتب
 * حقولًا ستّة لا أكثر. وفي التطوير يُعاد تصديره من المصدر مباشرةً.
 */
function routeIndex(): Plugin {
  const ID = "virtual:routes";
  const RESOLVED = `\0${ID}`;
  const KEEP = ["path", "title", "description", "kind", "parent", "langs"] as const;

  return {
    name: "daamah:route-index",
    resolveId: (id) => (id === ID ? RESOLVED : undefined),
    async load(id) {
      if (id !== RESOLVED) return;

      const entry = resolve(".ssr/entry-server.js");
      if (!existsSync(entry)) {
        // خادم التطوير، أو بناء بلا خطوة الرسم — الحجم لا يهمّ هنا
        return `export { routes as default } from "/src/content/seo";`;
      }

      const ssr = await import(/* @vite-ignore */ pathToFileURL(entry).href);
      const compact = ssr.routes.map((r: Record<string, unknown>) =>
        Object.fromEntries(
          KEEP.filter((k) => r[k] !== undefined).map((k) => [k, r[k]]),
        ),
      );
      return `export default ${JSON.stringify(compact)}`;
    },
  };
}

/* خطوط تُحمَّل قبل أن يطلبها المتصفح — الوجه الأساسي لكل لغة فقط.
   تحميل الخمسة يزاحم ما هو أهمّ منها على عرض الاتصال. */
const PRELOAD: Record<Lang, string[]> = {
  ar: ["/fonts/plexar-400.woff2", "/fonts/plexar-600.woff2"],
  en: ["/fonts/satoshi-400.woff2", "/fonts/satoshi-500.woff2"],
};

/**
 * يكتب صفحة HTML كاملة لكل مسار × لغة — رأسًا وجسمًا — إضافةً إلى
 * `sitemap.xml` و`robots.txt` و`404.html`.
 *
 * الرأس وحده لم يكن كافيًا: زاحفات الشبكات الاجتماعية لا تشغّل
 * JavaScript إطلاقًا، وكذلك زاحفات نماذج اللغة التي صارت مصدرًا
 * فعليًا للعملاء. الجسم الفارغ يعني موقعًا بلا نصّ بالنسبة لها.
 *
 * الشجرة تأتي من `src/entry-server.tsx` المبنيّ قبل حزمة العميل،
 * ومنه أيضًا تُقرأ المسارات — فلا تستورد هذه الإضافة `src/content`
 * مباشرةً، ويبقى الفهرس حرًّا في أن يُكتشف وقت البناء.
 */
function prerender(): Plugin {
  let isSsrBuild = false;

  return {
    name: "daamah:prerender",
    apply: "build",
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    async closeBundle() {
      if (isSsrBuild) return;

      const outDir = "dist";
      const entry = pathToFileURL(resolve(".ssr/entry-server.js")).href;
      const ssr = await import(/* @vite-ignore */ entry);
      const { routes, SITE_URL, OG_IMAGE, graphFor, withLang } = ssr;

      const template = readFileSync(join(outDir, "index.html"), "utf8");
      const urls: string[] = [];
      const seen = new Map<string, string>();

      /** يبني صفحة كاملة: رأس صحيح + جسم مرسوم. */
      const page = async (
        route: {
          path: string;
          title: Record<Lang, string>;
          description: Record<Lang, string>;
          image?: string;
        },
        lang: Lang,
        opts: { noindex?: boolean; alternates?: boolean } = {},
      ) => {
        const localized: string = withLang(route.path, lang);
        const url = `${SITE_URL}${localized}`;
        const title = route.title[lang];
        const desc = route.description[lang];
        const image = `${SITE_URL}${route.image ?? OG_IMAGE}`;

        /* React 19 يرفع وسوم الموارد (preload للصور مثلًا) إلى مقدّمة
           ما يرسمه. وهي في المتصفح تذهب إلى `<head>` لا إلى الجذر،
           فلو تُركت في الجسم لاختلف أول عنصر عمّا يرسمه العميل
           وسقط الترطيب كلّه. ننقلها إلى مكانها الصحيح — وهي مفيدة
           هناك على أي حال. */
        const hoisted: string[] = [];
        const body: string = (await ssr.render(localized)).replace(
          /<link\b[^>]*>/g,
          (tag: string) => {
            if (!hoisted.includes(tag)) hoisted.push(tag);
            return "";
          },
        );

        const head = [
          `<title>${esc(title)}</title>`,
          ...hoisted,
          `<meta name="description" content="${esc(desc)}" />`,
          opts.noindex ? `<meta name="robots" content="noindex,follow" />` : null,
          `<link rel="canonical" href="${url}" />`,
          ...(opts.alternates === false
            ? []
            : [
                `<link rel="alternate" hreflang="ar" href="${SITE_URL}${withLang(route.path, "ar")}" />`,
                `<link rel="alternate" hreflang="en" href="${SITE_URL}${withLang(route.path, "en")}" />`,
                `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${withLang(route.path, "ar")}" />`,
              ]),
          ...PRELOAD[lang].map(
            (f) => `<link rel="preload" as="font" type="font/woff2" href="${f}" crossorigin />`,
          ),
          `<meta property="og:title" content="${esc(title)}" />`,
          `<meta property="og:description" content="${esc(desc)}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:locale" content="${lang === "ar" ? "ar_AR" : "en_US"}" />`,
          `<meta property="og:image" content="${image}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${esc(title)}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${esc(title)}" />`,
          `<meta name="twitter:description" content="${esc(desc)}" />`,
          `<meta name="twitter:image" content="${image}" />`,
          `<script type="application/ld+json">${jsonLd(graphFor(route.path, lang))}</script>`,
        ]
          .filter(Boolean)
          .join("\n    ");

        return template
          // العنوان والوصف الافتراضيان في القالب يُستبدلان لا يُضاعفان
          .replace(/<title>[\s\S]*?<\/title>\s*/, "")
          .replace(/<meta name="description"[^>]*\/>\s*/, "")
          .replace(
            /<html lang="[^"]*" dir="[^"]*">/,
            `<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">`,
          )
          .replace("</head>", `  ${head}\n  </head>`)
          .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
      };

      const write = (localized: string, html: string) => {
        // `/` ← dist/index.html ، `/en/about` ← dist/en/about/index.html
        const file =
          localized === "/"
            ? join(outDir, "index.html")
            : join(outDir, localized.slice(1), "index.html");
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html, "utf8");
      };

      for (const route of routes) {
        const langs: Lang[] = route.langs ?? [...LANGS];

        for (const lang of langs) {
          /* حارس المحتوى المكرّر: وصفان متطابقان يعنيان صفحتين
             تتنافسان على نفس الاستعلام، وتبدوان لجوجل نسختين من
             شيء واحد. يُكشف عند البناء لا بعد شهر من الفهرسة. */
          const key = `${lang}:${route.description[lang].trim()}`;
          const clash = seen.get(key);
          if (clash && clash !== route.path) {
            throw new Error(
              `وصف مكرّر بين «${clash}» و«${route.path}» (${lang}) — لكل صفحة وصفها.`,
            );
          }
          seen.set(key, route.path);

          const localized: string = withLang(route.path, lang);
          write(localized, await page(route, lang, { alternates: langs.length > 1 }));

          const loc = `${SITE_URL}${localized}`;
          urls.push(
            [
              "  <url>",
              `    <loc>${loc}</loc>`,
              ...(langs.length > 1
                ? [
                    `    <xhtml:link rel="alternate" hreflang="ar" href="${SITE_URL}${withLang(route.path, "ar")}"/>`,
                    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${withLang(route.path, "en")}"/>`,
                  ]
                : []),
              ...(route.lastmod ? [`    <lastmod>${route.lastmod}</lastmod>`] : []),
              ...(route.image
                ? [
                    "    <image:image>",
                    `      <image:loc>${SITE_URL}${route.image}</image:loc>`,
                    `      <image:title>${esc(route.title[lang])}</image:title>`,
                    "    </image:image>",
                  ]
                : []),
              `    <priority>${route.priority.toFixed(1)}</priority>`,
              "  </url>",
            ].join("\n"),
          );
        }
      }

      /* صفحة 404 حقيقية.
         الإعادة الشاملة في `vercel.json` كانت تردّ 200 على كل مسار
         مجهول، فيفهرس جوجل عناوين لا وجود لها («soft 404»). */
      const notFound = {
        path: "/404",
        title: { ar: `404 — ${"دَعمة للحلول الرقمية"}`, en: "404 — Daamah Digital Solutions" },
        description: {
          ar: "الصفحة غير موجودة.",
          en: "This page doesn't exist.",
        },
      };
      for (const lang of LANGS) {
        const html = await page(notFound, lang, { noindex: true, alternates: false });
        writeFileSync(join(outDir, lang === "ar" ? "404.html" : "en/404.html"), html, "utf8");
      }

      /* خلاصة RSS لكل لغة — القرّاء المهنيّون وأدوات المتابعة
         تشترك بها، وهي كذلك إشارة تحديثٍ منتظم */
      for (const lang of LANGS) {
        const items = ssr
          .postsIn(lang)
          .slice(0, 20)
          .map((p: { slug: string; title: string; description: string; date: string }) => {
            const link = `${SITE_URL}${withLang(`/blog/${p.slug}`, lang)}`;
            return [
              "    <item>",
              `      <title>${esc(p.title)}</title>`,
              `      <link>${link}</link>`,
              `      <guid isPermaLink="true">${link}</guid>`,
              `      <description>${esc(p.description)}</description>`,
              `      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>`,
              "    </item>",
            ].join("\n");
          });

        const home = `${SITE_URL}${withLang("/blog", lang)}`;
        const feed = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
          "  <channel>",
          `    <title>${esc(lang === "ar" ? "مدوّنة دَعمة" : "Daamah Journal")}</title>`,
          `    <link>${home}</link>`,
          `    <description>${esc(lang === "ar" ? "مقالات عن الهوية والمواقع والتسويق الرقمي في السوق السعودي والخليجي." : "Notes on branding, websites, and digital marketing in the Saudi and Gulf markets.")}</description>`,
          `    <language>${lang}</language>`,
          `    <atom:link href="${SITE_URL}${lang === "ar" ? "" : "/en"}/feed.xml" rel="self" type="application/rss+xml"/>`,
          ...items,
          "  </channel>",
          "</rss>",
          "",
        ].join("\n");

        const file = join(outDir, lang === "ar" ? "feed.xml" : "en/feed.xml");
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, feed, "utf8");
      }

      writeFileSync(
        join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join("\n")}\n</urlset>\n`,
        "utf8",
      );

      writeFileSync(
        join(outDir, "robots.txt"),
        [
          "User-agent: *",
          "Allow: /",
          "",
          "# لا قيمة لفهرسة أصول البناء المُبصَمة",
          "Disallow: /assets/*.js$",
          "Disallow: /assets/*.css$",
          "",
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          "",
        ].join("\n"),
        "utf8",
      );

      this.info?.(`prerendered ${urls.length} pages + sitemap + 404`);
    },
  };
}

export default defineConfig({
  plugins: [
    /* قبل إضافة React: هذه تحوّل MDX إلى JSX، وتلك تحوّل JSX إلى
       جافاسكربت. العكس يعني أن React يرى نصًّا لا يفهمه.
       بيانات المقال تُصدَّر من داخله (`export const meta`) لا في
       ترويسة YAML: قارئ الترويسة يجرّ معه محلّل TOML بثغرة معلومة
       بلا إصلاح، ولا حاجة إليه أصلًا. */
    { enforce: "pre", ...mdx({ remarkPlugins: [remarkGfm], providerImportSource: "@mdx-js/react" }) },
    react(),
    tailwindcss(),
    blogStats(),
    routeIndex(),
    verification(),
    prerender(),
  ],
  define: {
    /* سنة البناء لا سنة جهاز الزائر — ساعته قد تخالف، فيختلف ما
       يرسمه المتصفح عمّا وُلِّد وقت البناء */
    __BUILD_YEAR__: new Date().getFullYear(),
  },
  resolve: {
    alias: { "@": new URL("./src/", import.meta.url).pathname },
  },
  server: { port: 4100 },
});
