import { useLang } from "../i18n";
import { brand, contact } from "../content/home";
import { contactPage } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { Arrow, Reveal, SectionLabel, Wrap } from "../components/ui";

/** قناة تواصل — الوسيلة نفسها هي زرّ النداء. */
function Channel({
  href,
  label,
  value,
  external = false,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center justify-between gap-6 border-t border-[var(--line)] py-8 last:border-b"
    >
      <span className="flex flex-col gap-2">
        <span className="tag text-ink/40">{label}</span>
        <span className="ltr text-[20px] font-medium transition-transform duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1 sm:text-[26px] rtl:group-hover:-translate-x-1">
          {value}
        </span>
      </span>
      <Arrow className="size-6 shrink-0 text-ink/25 transition-[color,transform] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1.5 group-hover:text-red rtl:group-hover:-translate-x-1.5" />
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
            <Reveal className="lg:col-span-7">
              <SectionLabel>{t(contactPage.channelsLabel)}</SectionLabel>
              <div className="mt-8">
                <Channel
                  href={`mailto:${brand.email}`}
                  label={t(contact.emailLabel)}
                  value={brand.email}
                />
                <Channel
                  href={brand.whatsapp}
                  label={t(contact.whatsappLabel)}
                  value={brand.phone}
                  external
                />
              </div>
            </Reveal>

            <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
              <SectionLabel>{t(contactPage.detailsLabel)}</SectionLabel>
              <dl className="mt-8 border-t border-[var(--line)]">
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
        </Wrap>
      </section>
    </>
  );
}
