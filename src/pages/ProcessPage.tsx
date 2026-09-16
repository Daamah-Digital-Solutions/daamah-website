import { useLang } from "../i18n";
import { process } from "../content/home";
import { processPage } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Chevron, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/**
 * كيف نعمل — خمس خطوات، ولكل خطوة ما نفعله، وما تستلمه، وما نحتاجه منك.
 *
 * كانت كل خطوة تحمل «المدّة المعتادة». حُذفت: المدّة تتحدّد بنطاق
 * كل مشروع وتُكتب في خطته، ورقمٌ عامّ هنا يصير وعدًا يُحاسَب عليه
 * مشروعٌ لا يشبه المعتاد. مكانها ما يحتاجه العميل فعلًا ليتوقّع:
 * دوره هو في كل خطوة.
 */
export function ProcessPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        label={t(processPage.label)}
        title={t(processPage.title)}
        intro={t(processPage.intro)}
      >
        {/* فهرس الخطوات */}
        <Reveal
          delay={260}
          eager
          className="mt-12 hidden gap-px border border-[var(--line)] bg-[var(--line)] sm:grid sm:grid-cols-5"
        >
          {process.steps.map((s) => (
            <a
              key={s.no}
              href={`#step-${s.no}`}
              className="bg-paper p-5 transition-colors duration-(--dur-base) hover:bg-paper-2"
            >
              <span className="tag ltr nums text-red">{s.no}</span>
              <span className="mt-2 block text-[14.5px] font-medium leading-snug">{t(s.title)}</span>
            </a>
          ))}
        </Reveal>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Wrap>
          <ol>
            {process.steps.map((s, i) => {
              const d = processPage.details[i];
              return (
                <li
                  key={s.no}
                  id={`step-${s.no}`}
                  className="scroll-mt-[calc(var(--header-h)+1rem)] border-b border-[var(--line)] py-12 first:pt-4 sm:py-16"
                >
                  <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                    <Reveal className="lg:col-span-3">
                      <span className="ltr nums block text-[clamp(3rem,6vw,5.25rem)] font-light leading-none text-ink/15">
                        {s.no}
                      </span>
                    </Reveal>

                    <div className="lg:col-span-9">
                      <Reveal>
                        <h2 className="text-[26px] font-medium leading-tight sm:text-[34px]">{t(s.title)}</h2>
                        <p className="body mt-4 max-w-[58ch]">{t(s.desc)}</p>
                      </Reveal>

                      <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                        <Reveal delay={80} className="sm:col-span-2 lg:col-span-1">
                          <p className="tag text-ink/40">{t(processPage.doLabel)}</p>
                          <ul className="mt-4 space-y-3">
                            {d.activities.map((a) => (
                              <li key={a.en} className="flex items-start gap-3">
                                <Chevron className="mt-[8px] h-2.5 w-auto shrink-0 text-red" />
                                <span className="text-[15px] leading-relaxed">{t(a)}</span>
                              </li>
                            ))}
                          </ul>
                        </Reveal>

                        <Reveal delay={160}>
                          <p className="tag text-ink/40">{t(processPage.outputLabel)}</p>
                          <p className="mt-4 max-w-[28ch] text-[17px] font-medium leading-snug">{t(d.output)}</p>
                        </Reveal>

                        <Reveal delay={240}>
                          <p className="tag text-ink/40">{t(processPage.youLabel)}</p>
                          <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-ink/75">{t(d.you)}</p>
                        </Reveal>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Wrap>
      </section>

      {/* ما يثبت في كل مشروع */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(processPage.principlesLabel)}</SectionLabel>
          </Reveal>
          <MaskLines lines={t(processPage.principlesTitle)} as="h2" className="h2 mt-8 max-w-[22ch]" />
          <div className="mt-14 grid border-s border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {processPage.principles.map((p, i) => (
              <Reveal
                key={p.title.en}
                delay={i * 80}
                className="border-b border-e border-[var(--line)] p-8"
              >
                <Chevron count={2} className="h-3 w-auto text-red" />
                <h3 className="mt-6 text-[19px] font-medium leading-snug">{t(p.title)}</h3>
                <p className="body mt-3 text-[15px]">{t(p.desc)}</p>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="py-16 sm:py-20">
        <Wrap>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
            <p className="max-w-[52ch] text-[18px] leading-relaxed sm:text-[20px]">{t(processPage.faqLine)}</p>
            <div className="shrink-0">
              <TextLink href="/faq">{t(processPage.faqLink)}</TextLink>
            </div>
          </Reveal>
        </Wrap>
      </section>

      <PageCta
        lines={{
          ar: ["خطوات واضحة،", "ونتائج أقوى."],
          en: ["Clear steps,", "stronger results."],
        }}
        secondary={{ ar: "اقرأ الحلول", en: "See the solutions" }}
        secondaryHref="/solutions"
      />
    </>
  );
}
