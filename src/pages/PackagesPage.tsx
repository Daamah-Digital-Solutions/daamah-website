import { useLang } from "../i18n";
import { faq, packages } from "../content/home";
import { packagesPage } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Btn, Chevron, Reveal, SectionLabel, Wrap } from "../components/ui";

export function PackagesPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        label={t(packagesPage.label)}
        title={t(packagesPage.title)}
        intro={t(packagesPage.intro)}
      />

      <section className="py-16 sm:py-24">
        <Wrap>
          <div className="grid border-s border-t border-[var(--line)] lg:grid-cols-3">
            {packages.items.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i * 100}
                as="article"
                className={`flex flex-col border-b border-e border-[var(--line)] p-8 sm:p-10 ${
                  p.featured ? "bg-paper-2" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="tag ltr nums text-red">{p.no}</span>
                  {p.badge && (
                    <span className="tag flex items-center gap-2 text-ink/45">
                      <Chevron count={2} className="h-2.5 w-auto text-red" />
                      {t(p.badge)}
                    </span>
                  )}
                </div>

                <h2 className="mt-8 text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-tight">
                  {t(p.name)}
                </h2>
                <p className="body mt-3">{t(p.tagline)}</p>

                <ul className="mt-9 flex-1 space-y-4 border-t border-[var(--line)] pt-8">
                  {p.features.map((f) => (
                    <li key={f.en} className="flex items-start gap-3.5">
                      <Chevron className="mt-[7px] h-2.5 w-auto shrink-0 text-red" />
                      <span className="text-[15px] leading-relaxed">{t(f)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Btn
                    href={`/contact?package=${p.slug}`}
                    variant={p.featured ? "ink" : "outline"}
                    className="w-full justify-center"
                  >
                    {t(packages.cta)}
                  </Btn>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <p className="body">{t(packages.note)}</p>
          </Reveal>
        </Wrap>
      </section>

      {/* أسئلة الباقات — التسعير والتسليم هما ما يُسأل عنه هنا */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(faq.label)}</SectionLabel>
          </Reveal>
          <dl className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-2">
            {faq.items.slice(0, 4).map((item, i) => (
              <Reveal key={item.q.en} delay={(i % 2) * 90}>
                <dt className="text-[17px] font-medium leading-snug">{t(item.q)}</dt>
                <dd className="body mt-3 max-w-[52ch]">{t(item.a)}</dd>
              </Reveal>
            ))}
          </dl>
        </Wrap>
      </section>

      <PageCta lines={packagesPage.ctaLines} primary={packagesPage.ctaPrimary} />
    </>
  );
}
