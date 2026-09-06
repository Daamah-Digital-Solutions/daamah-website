import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { brand, footer, navItems, phoneFor } from "../content/home";
import { Wrap } from "./ui";

export function Footer() {
  const { t, path } = useLang();
  const tel = phoneFor();

  return (
    <footer className="bg-ink text-paper">
      <Wrap className="py-20 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* العلامة */}
          <div className="lg:col-span-5">
            {/* الفوتر يقلب الورق والحبر، فنسخة اللوجو تنعكس مع السمة.
                النسختان معًا وCSS يختار — لا حالة جافاسكربت في الاختيار،
                كي يطابق ما يرسمه المتصفح ما وُلِّد وقت البناء. */}
            <img
              src="/assets/logo-wordmark-light.png"
              alt={t(brand.name)}
              width={2035}
              height={544}
              className="h-[22px] w-auto dark:hidden"
            />
            <img
              src="/assets/logo-wordmark.png"
              alt=""
              aria-hidden="true"
              width={2035}
              height={544}
              className="hidden h-[22px] w-auto dark:block"
            />
            <p className="tag mt-5 text-paper/35">{t(footer.tagline)}</p>
            <p className="body mt-8 max-w-[34ch] !text-paper/45">{t(brand.name)}</p>
          </div>

          {/* الروابط */}
          <nav className="lg:col-span-3">
            <h3 className="tag text-paper/35">{t(footer.navTitle)}</h3>
            <ul className="mt-6 space-y-3.5">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link
                    to={path(n.href)}
                    className="text-[15px] text-paper/70 transition-colors duration-(--dur-fast) hover:text-paper"
                  >
                    {t(n.label)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={path("/contact")}
                  className="text-[15px] text-paper/70 transition-colors duration-(--dur-fast) hover:text-paper"
                >
                  {t(footer.contactTitle)}
                </Link>
              </li>
              <li>
                <Link
                  to={path("/privacy")}
                  className="text-[15px] text-paper/70 transition-colors duration-(--dur-fast) hover:text-paper"
                >
                  {t(footer.privacyTitle)}
                </Link>
              </li>
            </ul>
          </nav>

          {/* التواصل */}
          <div className="lg:col-span-2">
            <h3 className="tag text-paper/35">{t(footer.contactTitle)}</h3>
            <ul className="mt-6 space-y-3.5">
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="ltr block text-[15px] text-paper/70 transition-colors duration-(--dur-fast) hover:text-paper"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={tel.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ltr block text-[15px] text-paper/70 transition-colors duration-(--dur-fast) hover:text-paper"
                >
                  {tel.display}
                </a>
              </li>
            </ul>
          </div>

          {/* السوشيال */}
          <div className="lg:col-span-2">
            <h3 className="tag text-paper/35">{t(footer.socialTitle)}</h3>
            <ul className="mt-6 space-y-3.5">
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ltr block text-[15px] text-paper/70 transition-colors duration-(--dur-fast) hover:text-paper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="tag text-paper/30">
            {/* سنة البناء لا سنة المتصفح: ساعة الزائر قد تخالف الخادم،
                فيختلف ما يُرسم عمّا وُلِّد */}
            © <span className="ltr nums">{__BUILD_YEAR__}</span>{" "}
            {t(brand.short)} — {t(footer.rights)}
          </p>
          <a
            href={`https://${brand.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tag ltr text-paper/30 transition-colors duration-(--dur-fast) hover:text-paper/60"
          >
            {brand.domain}
          </a>
        </div>
      </Wrap>
    </footer>
  );
}
