import { useLang } from "../i18n";
import { process } from "../content/home";
import { processPage } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Reveal, Wrap } from "../components/ui";

export function ProcessPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        label={t(processPage.label)}
        title={t(processPage.title)}
        intro={t(processPage.intro)}
      />

      <section className="py-20 sm:py-28">
        <Wrap>
          <ol className="border-t border-[var(--line)]">
            {process.steps.map((s, i) => {
              const extra = processPage.details[i];
              return (
                <Reveal key={s.no} delay={i * 80} as="li" className="group">
                  <div className="grid gap-6 border-b border-[var(--line)] py-10 transition-[padding] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:ps-3 lg:grid-cols-12 lg:gap-10 lg:py-14">
                    <span className="ltr nums text-[clamp(2.4rem,4.5vw,3.6rem)] font-light leading-none text-ink/20 transition-colors duration-(--dur-base) group-hover:text-red lg:col-span-2">
                      {s.no}
                    </span>

                    <div className="lg:col-span-4">
                      <h2 className="text-[21px] font-medium leading-snug sm:text-[24px]">
                        {t(s.title)}
                      </h2>
                      <p className="body mt-3 max-w-[40ch]">{t(s.desc)}</p>
                    </div>

                    <div className="lg:col-span-3">
                      <p className="tag text-ink/40">{t(processPage.durationLabel)}</p>
                      <p className="mt-3 text-[15px] font-medium">{t(extra.duration)}</p>
                    </div>

                    <div className="lg:col-span-3">
                      <p className="tag text-ink/40">{t(processPage.outputLabel)}</p>
                      <p className="mt-3 max-w-[28ch] text-[15px] font-medium">
                        {t(extra.output)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </Wrap>
      </section>

      <PageCta
        lines={{
          ar: ["خطوات واضحة،", "ونتائج أقوى."],
          en: ["Clear steps,", "stronger results."],
        }}
        secondary={{ ar: "شوف الباقات", en: "See packages" }}
        secondaryHref="/packages"
      />
    </>
  );
}
