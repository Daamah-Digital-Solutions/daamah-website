import { useLang } from "../i18n";
import { work } from "../content/home";
import { workDetails } from "../content/pages";
import { workItems } from "../content/work";
import { MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";
import { WorkCard } from "../components/WorkCard";

/**
 * ثلاثة أعمال مختارة — واحد لكل جزء له إثبات (هوية، موقع، سوشيال).
 *
 * تحت كل واحد سطرٌ ممّا سُلِّم. حين تصل أرقام النتائج يحلّ الرقم
 * محلّه؛ حتى ذلك الحين ما سُلِّم حقيقةٌ قابلة للتحقّق، وهي أصدق من
 * ادّعاء بلا رقم.
 */
const PICKS = ["building-line", "fragancia", "eco-vista"];

export function Work() {
  const { t } = useLang();
  const items = PICKS.map((slug) => workItems.find((w) => w.slug === slug)).filter(
    (w): w is (typeof workItems)[number] => Boolean(w),
  );

  return (
    <section id="work" className="relative py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index="03">{t(work.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-10 sm:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <MaskLines lines={t(work.lede)} as="h2" className="h2" />
          <Reveal className="shrink-0">
            <TextLink href="/work">{t(work.allLabel)}</TextLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const line = workDetails[item.slug]?.results[0];
            return (
              <div key={item.slug}>
                <WorkCard item={item} delay={i * 90} />
                {line && (
                  <Reveal delay={i * 90 + 120} className="mt-4 flex items-start gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red" />
                    <p className="text-[14.5px] leading-relaxed text-ink/70">{t(line)}</p>
                  </Reveal>
                )}
              </div>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
