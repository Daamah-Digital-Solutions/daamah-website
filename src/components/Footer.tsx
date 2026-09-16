import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { track } from "../analytics";
import { waHref, waMessage } from "../content/whatsapp";
import { brand, contact, footer, hero, navItems, phoneFor, services, ui } from "../content/home";
import { Btn, TextLink, Wrap } from "./ui";

/* ── علامات المنصّات — مرسومة لا محمّلة، فتتبع لون النص ── */
const SOCIAL_ICONS: Record<string, ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.25-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="size-[17px]" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20.5h3.38zM5.25 3.5a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94M20.44 13.1c0-3.24-1.73-4.85-4.03-4.85-1.86 0-2.69 1.02-3.16 1.74V8.5H9.87c.05.98 0 12 0 12h3.38v-6.7c0-.36.03-.72.13-.98.29-.72.95-1.46 2.06-1.46 1.45 0 2.03 1.1 2.03 2.72v6.42h3.38z" />
    </svg>
  ),
};

const link =
  "ulink text-[15px] text-paper/65 transition-colors duration-(--dur-fast) hover:text-paper";

function Column({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="tag text-paper/40">{title}</h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

/**
 * الفوتر — آخر ما يراه الزائر، فيقول من نحن قبل أن يودّع.
 *
 * كان شعارًا واسم الشركة مكرّرًا وقائمة روابط طويلة في عمود واحد،
 * وأعمدة التواصل والسوشيال شبه فارغة. الآن: عمود للعلامة يعرّف بها
 * ويفتح المحادثة، ثم الخدمات، ثم الشركة، ثم تفاصيل تواصل يحتاجها
 * المشتري فعلًا (أوقات العمل وزمن الرد) — وتحتها الوردمارك كبيرًا
 * يُغلق الصفحة بتوقيع العلامة.
 */
export function Footer() {
  const { t, path } = useLang();
  const tel = phoneFor();
  const shown = footer.serviceSlugs
    .map((slug) => services.items.find((s) => s.slug === slug))
    .filter((s) => !!s);

  const company = [
    ...navItems.filter((n) => n.href !== "/services"),
    { href: "/profile", label: footer.profileTitle },
    { href: "/saudi", label: footer.saudiTitle },
    { href: "/faq", label: footer.faqTitle },
    { href: "/contact", label: footer.contactTitle },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <Wrap>
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 pt-20 pb-16 sm:pt-24 lg:grid-cols-12 lg:gap-10">
          {/* العلامة */}
          <div className="col-span-2 lg:col-span-4">
            {/* الفوتر يقلب الورق والحبر، فنسخة اللوجو تنعكس مع السمة —
                النسختان معًا وCSS يختار، كي يطابق الرسم ما وُلِّد وقت البناء */}
            <img src="/assets/logo-wordmark-light.png" alt={t(brand.name)} width={2035} height={544} className="h-[26px] w-auto dark:hidden" />
            <img src="/assets/logo-wordmark.png" alt="" aria-hidden="true" width={2035} height={544} className="hidden h-[26px] w-auto dark:block" />
            <p className="tag mt-5 text-paper/40">{t(footer.tagline)}</p>
            <p className="mt-7 max-w-[40ch] text-[15px] leading-[1.95] text-paper/60">{t(brand.description)}</p>

            <p className="mt-6 flex flex-wrap items-center gap-2 text-[14px] text-paper/55">
              <span className="size-1.5 rounded-full bg-red" />
              <span className="text-paper/40">{t(footer.marketsLabel)}:</span>
              {t(hero.markets)}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Btn
                href={waHref(t(waMessage.general))}
                external
                variant="paper"
                size="sm"
                onClick={() => track("whatsapp_click", { placement: "footer_cta" })}
              >
                {t(ui.navCta)}
              </Btn>
              <ul className="flex items-center gap-2">
                {footer.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border border-paper/20 text-paper/70 transition-colors duration-(--dur-fast) hover:border-paper hover:bg-paper hover:text-ink"
                    >
                      {SOCIAL_ICONS[s.label] ?? s.label.slice(0, 2)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* الخدمات */}
          <Column title={t(footer.servicesTitle)} className="lg:col-span-3 lg:ps-6">
            <ul className="space-y-3.5">
              {shown.map((s) => (
                <li key={s.slug}>
                  <Link to={path(`/services/${s.slug}`)} className={link}>
                    {t(s.name)}
                  </Link>
                </li>
              ))}
            </ul>
            <TextLink href="/services" className="mt-6 text-paper/80 hover:text-paper">
              {t(footer.allServices)}
            </TextLink>
          </Column>

          {/* الشركة */}
          <Column title={t(footer.companyTitle)} className="lg:col-span-2">
            <ul className="space-y-3.5">
              {company.map((n) => (
                <li key={n.href}>
                  <Link to={path(n.href)} className={link}>
                    {t(n.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          {/* التواصل */}
          <Column title={t(footer.contactTitle)} className="col-span-2 lg:col-span-3">
            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <dt className="text-[13px] text-paper/40">{t(contact.whatsappLabel)}</dt>
                <dd className="mt-1.5">
                  <a
                    href={waHref(t(waMessage.general))}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { placement: "footer" })}
                    className="ltr inline-block text-[17px] font-medium text-paper transition-opacity duration-(--dur-fast) hover:opacity-70"
                  >
                    {tel.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-paper/40">{t(contact.emailLabel)}</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${brand.email}`}
                    onClick={() => track("email_click", { placement: "footer" })}
                    className="ltr inline-block text-[17px] font-medium text-paper transition-opacity duration-(--dur-fast) hover:opacity-70"
                  >
                    {brand.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-paper/40">{t(footer.hoursLabel)}</dt>
                <dd className="mt-1.5 text-[15px] text-paper/75">{t(footer.hours)}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-paper/40">{t(footer.responseLabel)}</dt>
                <dd className="mt-1.5 text-[15px] text-paper/75">{t(footer.response)}</dd>
              </div>
            </dl>
          </Column>
        </div>

        {/* الشريط الأخير */}
        <div className="flex flex-col gap-5 border-t border-paper/12 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13.5px] text-paper/45">
            {/* سنة البناء لا سنة المتصفح: ساعة الزائر قد تخالف الخادم */}
            © <span className="ltr nums">{__BUILD_YEAR__}</span> {t(brand.name)} — {t(footer.rights)}
          </p>
          <div className="flex items-center gap-6">
            <Link to={path("/privacy")} className="ulink text-[13.5px] text-paper/45 transition-colors duration-(--dur-fast) hover:text-paper">
              {t(footer.privacyTitle)}
            </Link>
            <span className="ltr text-[13.5px] text-paper/45">{brand.domain}</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label={t(footer.backToTop)}
              className="grid size-10 place-items-center rounded-full border border-paper/20 text-paper/70 transition-colors duration-(--dur-fast) hover:border-paper hover:bg-paper hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </button>
          </div>
        </div>
      </Wrap>
    </footer>
  );
}
