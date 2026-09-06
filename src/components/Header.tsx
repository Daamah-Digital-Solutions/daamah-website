import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang, type Lang } from "../i18n";
import { useTheme } from "../theme";
import { track } from "../analytics";
import { waHref, waMessage } from "../content/whatsapp";
import { brand, navItems, ui } from "../content/home";
import { Arrow, Btn, Wrap } from "./ui";

/** مبدّل السمة — شمس/قمر مرسومان بنفس وزن الخطّ الشعري في الموقع. */
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(ui.themeLabel)}
      aria-pressed={dark}
      title={t(dark ? ui.themeLight : ui.themeDark)}
      className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-ink/55 transition-colors duration-300 hover:border-[var(--line-strong)] hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[15px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dark ? (
          /* قمر — معروض في الوضع الداكن */
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.9 6.9 0 0 0 10.5 10.5Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.4v2.2M12 19.4v2.2M21.6 12h-2.2M4.6 12H2.4M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6M18.8 18.8l-1.6-1.6M6.8 6.8 5.2 5.2" />
          </>
        )}
      </svg>
    </button>
  );
}

/** مبدّل اللغة — قطعة مجزّأة تُظهر الخيارين معًا لا خيارًا مخفيًا. */
function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useLang();
  const opts: { key: Lang; label: string }[] = [
    { key: "ar", label: "ع" },
    { key: "en", label: "EN" },
  ];

  return (
    <div
      role="group"
      aria-label={t(ui.langLabel)}
      className={`flex items-center gap-0.5 rounded-pill border border-[var(--line)] p-0.5 ${
        compact ? "" : "bg-paper/60"
      }`}
    >
      {opts.map((o) => {
        const on = lang === o.key;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => setLang(o.key)}
            aria-pressed={on}
            lang={o.key}
            className={`rounded-pill px-2.5 py-1 text-[11.5px] font-bold leading-none transition-colors duration-300 ${
              on ? "bg-ink text-paper" : "text-ink/45 hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Header() {
  const { t, path } = useLang();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // قفل تمرير الصفحة خلف القائمة المفتوحة
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // الرجوع بزرّ المتصفح لا يمرّ على onClick الخاص بالروابط
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-colors duration-500 ${
          solid && !open
            ? "border-b border-[var(--line)] bg-paper/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <Wrap className="flex h-full items-center justify-between gap-8">
          <Link
            to={path("/")}
            aria-label={t(brand.name)}
            className="shrink-0 transition-opacity duration-300 hover:opacity-60"
          >
            {/* الوردمارك أسود مسطّح — يحتاج نسخة فاتحة على خلفية داكنة.
                النسختان معًا وCSS يختار: لو اعتمد `src` على حالة الثيم
                لاختلف ما يرسمه المتصفح عمّا وُلِّد وقت البناء. */}
            <img
              src="/assets/logo-wordmark.png"
              alt={t(brand.name)}
              /* المقاس الأصلي — منه يحسب المتصفح العرض قبل التحميل
                 فلا يقفز ما بعده في الشريط */
              width={2035}
              height={544}
              className="h-[19px] w-auto sm:h-[21px] dark:hidden"
            />
            <img
              src="/assets/logo-wordmark-light.png"
              alt=""
              aria-hidden="true"
              width={2035}
              height={544}
              className="hidden h-[19px] w-auto sm:h-[21px] dark:block"
            />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((n) => (
              <NavLink
                key={n.href}
                to={path(n.href)}
                className={({ isActive }) =>
                  `relative text-[14px] font-medium transition-colors duration-300 hover:text-ink ${
                    isActive ? "text-ink" : "text-ink/55"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t(n.label)}
                    {/* نقطة حمراء تحت الصفحة الحالية — أهدأ من خطّ تحتها */}
                    <span
                      className={`absolute -bottom-2 start-1/2 size-1 -translate-x-1/2 rounded-full bg-red transition-opacity duration-300 rtl:translate-x-1/2 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <LangSwitch />
            <ThemeToggle />

            {/* الإخفاء على غلاف لا على الزرّ: Btn يثبّت inline-flex،
                وأدوات display في Tailwind تتغلّب بترتيب الملف لا بترتيب
                الفئات — فـ hidden عليه لا يُخفيه */}
            <span className="hidden md:block">
              <Btn
                href={waHref(t(waMessage.general))}
                external
                size="sm"
                onClick={() => track("whatsapp_click", { placement: "header" })}
              >
                {t(ui.navCta)}
              </Btn>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t(ui.close) : t(ui.menu)}
              className="flex size-9 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className={`h-px w-5 bg-ink transition-transform duration-400 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-ink transition-transform duration-400 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </Wrap>
      </header>

      {/* القائمة على الشاشات الصغيرة.
          inert وهي مغلقة: الشفافية وحدها تُخفيها بصريًا لكنها تُبقي
          روابطها في مسار التنقّل بلوحة المفاتيح وفي شجرة الوصول. */}
      <div
        inert={!open}
        className={`fixed inset-0 z-40 bg-paper transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Wrap className="flex h-full flex-col justify-center gap-2 pt-[var(--header-h)] pb-16">
          {navItems.map((n, i) => (
            <Link
              key={n.href}
              to={path(n.href)}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--line)] py-5 text-[30px] font-medium transition-[opacity,transform] duration-700"
              style={{
                transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(14px)",
              }}
            >
              {t(n.label)}
            </Link>
          ))}
          <a
            href={waHref(t(waMessage.general))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("whatsapp_click", { placement: "mobile_menu" });
              setOpen(false);
            }}
            className="mt-8 inline-flex items-center justify-between rounded-pill bg-ink px-7 py-4 text-[15px] font-medium text-paper"
          >
            {t(ui.navCta)}
            <Arrow className="size-4" />
          </a>
        </Wrap>
      </div>
    </>
  );
}
