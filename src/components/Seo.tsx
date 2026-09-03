import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { stripLang, useLang, withLang } from "../i18n";
import { OG_IMAGE, SITE_URL, findRoute } from "../content/seo";
import { brand } from "../content/home";

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
    meta("name", "robots", route ? "index,follow" : "noindex,follow");

    const url = `${SITE_URL}${withLang(bare, lang)}`;
    link("canonical", url);

    meta("property", "og:title", title);
    meta("property", "og:description", desc);
    meta("property", "og:url", url);
    meta("property", "og:locale", lang === "ar" ? "ar_AR" : "en_US");
    meta("property", "og:image", `${SITE_URL}${OG_IMAGE}`);
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", desc);
    meta("name", "twitter:image", `${SITE_URL}${OG_IMAGE}`);

    if (route) {
      link("alternate", `${SITE_URL}${withLang(bare, "ar")}`, "ar");
      link("alternate", `${SITE_URL}${withLang(bare, "en")}`, "en");
      link("alternate", `${SITE_URL}${withLang(bare, "ar")}`, "x-default");
    }
  }, [pathname, lang, t]);

  return null;
}
