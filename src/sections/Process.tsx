import { useLang } from "../i18n";
import { process } from "../content/home";
import { MaskLines, Reveal, SectionLabel, Wrap } from "../components/ui";

export function Process() {
  const { t } = useLang();

  return (
    <section id="process" className="relative bg-ink py-28 text-paper sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index={process.index} tone="paper">
            {t(process.label)}
          </SectionLabel>
        </Reveal>

        <MaskLines
          lines={t(process.lede)}
          as="h2"
          className="h2 mt-10 max-w-[20ch] sm:mt-14"
        />

        <ol className="mt-16 sm:mt-24">
          {process.steps.map((s, i) => (
            <Reveal
              key={s.no}
              delay={i * 80}
              as="li"
              /* الحدود بلون النص لا بمتغيّر --line: هذا القسم يقلب
                 الورق والحبر داخليًا، فمتغيّر الخطّ العام لا يناسبه */
              className="group border-t border-paper/12 last:border-b"
            >
              <div className="flex flex-col gap-3 py-8 transition-[padding] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:ps-3 sm:flex-row sm:items-baseline sm:gap-12 sm:py-10">
                <span className="ltr nums shrink-0 text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-none text-paper/25 transition-colors duration-(--dur-base) group-hover:text-red sm:w-28">
                  {s.no}
                </span>
                <h3 className="shrink-0 text-[20px] font-medium sm:w-64 sm:text-[23px]">
                  {t(s.title)}
                </h3>
                <p className="body max-w-[52ch] !text-paper/50">{t(s.desc)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
