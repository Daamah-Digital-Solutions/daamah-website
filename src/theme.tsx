import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const KEY = "daamah:theme";

type Ctx = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

/** تفضيل الجهاز — نقطة البداية قبل أن يختار الزائر. */
function systemTheme(): Theme {
  if (typeof matchMedia === "undefined") return "light";
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function read(): Theme {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* التصفح الخاص */
  }
  return systemTheme();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    // شريط المتصفح على الجوال يتبع الخلفية
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0c0c0e" : "#fbfaf8");
  }, [theme]);

  /* تتبّع النظام ما دام الزائر لم يختر بنفسه */
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        if (localStorage.getItem(KEY)) return;
      } catch {
        /* تجاهل */
      }
      setThemeState(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const animTimer = useRef<number | undefined>(undefined);

  const setTheme = useCallback((t: Theme) => {
    const el = document.documentElement;

    /* التلاشي العام يُركَّب للحظة التبديل ثم يُنزع — تفاصيله في globals.css */
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("theme-anim");
      clearTimeout(animTimer.current);
      animTimer.current = window.setTimeout(
        () => el.classList.remove("theme-anim"),
        320,
      );
    }

    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* التصفح الخاص — التبديل يعمل، لكنه لا يُحفظ */
    }
  }, []);

  useEffect(() => () => clearTimeout(animTimer.current), []);

  const toggle = useCallback(
    () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"),
    [setTheme],
  );

  return (
    <ThemeCtx.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
