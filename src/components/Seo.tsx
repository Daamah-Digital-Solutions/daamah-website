import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { stripLang, useLang, withLang } from "../i18n";
import routes from "virtual:routes";
import { SITE_URL, ogFor } from "../seo/site";
import { brand } from "../content/home";

const findRoute = (path: string) => routes.find((r) => r.path === path);

/** يضبط وسمًا في الرأس أو ينشئه إن لم يوجد. */
function meta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** يضبط كتلة البيانات المنظّمة — واحدة تُستبدل لا تُضاف. */
function structured(data: unknown) {
  let el = document.head.querySelector<HTMLScriptElement>('script[data-ld="page"]');
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.dataset.ld = "page";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/** يضبط رابطًا في الرأس (canonical / alternate). */
function link(rel: string, href: string, hreflang?: string) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * وسوم رأس الصفحة لكل مسار.
 *
 * كانت ثابتة في `index.html`: نفس العنوان ونفس canonical لكل الصفحات —
 * أي أننا كنّا نقول لجوجل إن الصفحات كلها نسخة مكرّرة من الرئيسية.
 * و hreflang يربط النسختين العربية والإنجليزية ببعضهما.
 *
 * تُكتب هنا وقت التشغيل لجوجل، وتُولَّد ثابتةً وقت البناء لزاحفات
 * الشبكات الاجتماعية التي لا تشغّل JavaScript.
 */
export function Seo() {
  const { pathname } = useLocation();
  const { lang, t } = useLang();

  useEffect(() => {
    const bare = stripLang(pathname);
    const route = findRoute(bare);

    // مسار غير معروف (404): لا يُفهرس
    const title = route ? t(route.title) : `404 — ${t(brand.name)}`;
    const desc = route ? t(route.description) : "";

    document.title = title;
    meta("name", "description", desc);
    /* `max-snippet:-1`: بلا حدّ لطول المقطع — ملخّصات الذكاء الاصطناعي
       في نتائج البحث تقتبس فقرةً كاملة حين يُسمح لها، وجملةً حين لا */
    meta("name", "robots", route ? "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" : "noindex,follow");

    const url = `${SITE_URL}${withLang(bare, lang)}`;
    link("canonical", url);

    /* ملف التطبيق يتبع اللغة: اسم الأيقونة على شاشة الجوال يُقرأ منه.
       الصفحات تصل مرسومةً ومعها ملفها الصحيح، وهذا السطر لمن بدّل
       اللغة داخل الموقع بلا إعادة تحميل. */
    link("manifest", lang === "en" ? "/site-en.webmanifest" : "/site.webmanifest");
    meta("name", "apple-mobile-web-app-title", t(brand.name));
    meta("name", "application-name", t(brand.name));

    const shareTitle = route?.share ? t(route.share.title) : title;
    const shareDesc = route?.share ? t(route.share.description) : desc;

    meta("property", "og:title", shareTitle);
    meta("property", "og:description", shareDesc);
    meta("property", "og:url", url);
    meta("property", "og:locale", lang === "ar" ? "ar_AR" : "en_US");
    meta("property", "og:site_name", t(brand.name));
    meta("property", "og:image", `${SITE_URL}${ogFor(lang)}`);
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", shareTitle);
    meta("name", "twitter:description", shareDesc);
    meta("name", "twitter:image", `${SITE_URL}${ogFor(lang)}`);
    meta("property", "og:image:width", "1200");
    meta("property", "og:image:height", "630");

    /* المقال المكتوب بلغة واحدة لا نسخة له بالأخرى — إعلان
       `hreflang` إليها وعدٌ بصفحة غير موجودة */
    if (route && (route.langs ?? ["ar", "en"]).length > 1) {
      link("alternate", `${SITE_URL}${withLang(bare, "ar")}`, "ar");
      link("alternate", `${SITE_URL}${withLang(bare, "en")}`, "en");
      link("alternate", `${SITE_URL}${withLang(bare, "ar")}`, "x-default");
    }

    /* البيانات المنظّمة مكتوبة سلفًا في HTML الثابت، فلا داعي لأن
       يحمل بانيها أول حزمة — هو يستورد المحتوى كلّه. تُحمَّل عند
       أول تنقّل داخلي، وهو وحده ما يحتاج تحديثها. */
    let stale = false;
    void import("../seo/schema").then(({ graphFor }) => {
      if (!stale) structured(graphFor(bare, lang));
    });
    return () => {
      stale = true;
    };
  }, [pathname, lang, t]);

  return null;
}
