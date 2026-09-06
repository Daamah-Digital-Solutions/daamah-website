import { useLang } from "../i18n";
import { waHref, waMessage } from "../content/whatsapp";
import { brand, contact, phoneFor } from "../content/home";
import { contactPage } from "../content/pages";
import { form } from "../content/form";
import { PageHero } from "../components/PageHero";
import { QuoteForm } from "../components/QuoteForm";
import { track } from "../analytics";
import { Arrow, MaskLines, Reveal, SectionLabel, Wrap } from "../components/ui";

/** قناة تواصل — الوسيلة نفسها هي زرّ النداء. */
function Channel({
  href,
  label,
  value,
  event,
  external = false,
}: {
  href: string;
  label: string;
  value: string;
  event: "whatsapp_click" | "email_click";
  external?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={() => track(event)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center justify-between gap-6 border-t border-[var(--line)] py-7 last:border-b"
    >
      <span className="flex flex-col gap-2">
        <span className="tag text-ink/40">{label}</span>
        <span className="ltr text-[18px] font-medium transition-transform duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1 sm:text-[21px] rtl:group-hover:-translate-x-1">
          {value}
        </span>
      </span>
      <Arrow className="size-5 shrink-0 text-ink/25 transition-[color,transform] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1.5 group-hover:text-red rtl:group-hover:-translate-x-1.5" />
    </a>
  );
}

export function ContactPage() {
  const { t } = useLang();

  const details = [
    { label: t(contactPage.hoursLabel), value: t(contactPage.hours) },
    { label: t(contactPage.responseLabel), value: t(contactPage.response) },
    { label: t(contactPage.marketsLabel), value: t(contactPage.markets) },
  ];

  return (
    <>
      <PageHero
        label={t(contactPage.label)}
        title={t(contactPage.title)}
        intro={t(contactPage.intro)}
      />

      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* النموذج — الطريق الأقصر إلى طلب مكتمل */}
            <Reveal className="lg:col-span-7">
              <SectionLabel>{t(form.label)}</SectionLabel>
              <MaskLines lines={t(form.title)} as="h2" className="lede mt-8" accentDot />
              <p className="body mt-6 max-w-[46ch]">{t(form.intro)}</p>
              <div className="mt-14">
                <QuoteForm />
              </div>
            </Reveal>

            {/* الطريق المباشر لمن لا يريد نموذجًا */}
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <SectionLabel>{t(contactPage.channelsLabel)}</SectionLabel>
                <div className="mt-8">
                  <Channel
                    href={`mailto:${brand.email}`}
                    label={t(contact.emailLabel)}
                    value={brand.email}
                    event="email_click"
                  />
                  <Channel
                    href={waHref(t(waMessage.contact))}
                    label={t(contact.whatsappLabel)}
                    value={phoneFor().display}
                    event="whatsapp_click"
                    external
                  />
                </div>
              </Reveal>

              <Reveal delay={140}>
                <dl className="mt-14 border-t border-[var(--line)]">
                  {details.map((d) => (
                    <div key={d.label} className="border-b border-[var(--line)] py-6">
                      <dt className="tag text-ink/40">{d.label}</dt>
                      <dd className="mt-3 text-[15px] font-medium leading-relaxed">{d.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    { label: "Instagram", href: "https://instagram.com/daamah.digital.solutions" },
                    { label: "Facebook", href: "https://facebook.com/daamah.digital.solutions" },
                  ].map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ulink ltr text-[14.5px] font-medium text-ink/60 transition-colors duration-(--dur-fast) hover:text-ink"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
