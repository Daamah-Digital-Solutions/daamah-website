import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "virtual:routes";

export type Lang = "ar" | "en";

/** نص ثنائي اللغة — الشكل الذي يتخذه كل محتوى الموقع. */
export type Bi<T = string> = { ar: T; en: T };

/** بادئة الإنجليزية في المسار. العربية على الجذر لأنها لغة الموقع الأولى. */
export const EN_PREFIX = "/en";

/** يستخرج اللغة من المسار — المسار هو مصدر الحقيقة الوحيد. */
export function langFromPath(pathname: string): Lang {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "ar";
}

/** يجرّد المسار من بادئة اللغة: `/en/about` ← `/about` */
export function stripLang(pathname: string): string {
  if (pathname === EN_PREFIX) return "/";
  if (pathname.startsWith(`${EN_PREFIX}/`)) return pathname.slice(EN_PREFIX.length);
  return pathname;
}

/** يضيف بادئة اللغة إلى مسار مجرّد: (`/about`, en) ← `/en/about` */
export function withLang(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "ar") return clean;
  return clean === "/" ? EN_PREFIX : `${EN_PREFIX}${clean}`;
}

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  /** يختار الوجه المناسب من نصّ ثنائي اللغة. */
  t: <T>(v: Bi<T>) => T;
  /** يترجم مسارًا داخليًا إلى لغة الصفحة الحالية. */
  path: (p: string) => string;
};

const LangCtx = createContext<Ctx | null>(null);

/**
 * اللغة تأتي من المسار لا من التخزين المحلي.
 *
 * الحفظ في localStorage كان يجعل النسختين على رابط واحد، فلا يرى
 * الزاحف إلا العربية — أي أن نصف المحتوى غير موجود لمحركات البحث.
 * الآن لكل لغة رابطها الخاص، ويربط بينهما hreflang.
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(pathname);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang) return;
      /* صفحة بلغة واحدة (مقال، صفحة حملة) لا نسخة لها باللغة الأخرى:
         الانتقال إليها ينتهي بـ404، فيذهب الزائر إلى رئيسية اللغة */
      const bare = stripLang(pathname);
      const meta = routes.find((r) => r.path === bare);
      const exists = !meta?.langs || meta.langs.includes(l);
      navigate(withLang(exists ? bare : "/", l));
    },
    [lang, navigate, pathname],
  );

  const t = useCallback(<T,>(v: Bi<T>) => v[lang], [lang]);
  const path = useCallback((p: string) => withLang(p, lang), [lang]);

  return (
    <LangCtx.Provider
      value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t, path }}
    >
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
