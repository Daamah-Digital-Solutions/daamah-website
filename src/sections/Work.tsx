import { useLang } from "../i18n";
import { work } from "../content/home";
import { workItems } from "../content/work";
import { MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";
import { WorkCard } from "../components/WorkCard";

/** ما يُعرض في الرئيسية — منتقًى لا كامل. */
const SHOWN = 6;

/**
 * قسم الأعمال في الرئيسية.
 *
 * لا مرشِّحات هنا: هي في صفحة الأعمال، وتكرارها في مكانين يجعل
 * الزائر يحتار أيّهما «الفهرس الحقيقي». الرئيسية تعرض مختارات
 * وتفتح الباب، والغربلة تحدث حيث تنتمي.
 */
export function Work() {
  const { t } = useLang();
  const items = workItems.slice(0, SHOWN);

  return (
    <section id="work" className="relative py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index={work.index}>{t(work.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-10 sm:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <MaskLines lines={t(work.lede)} as="h2" className="h2" />
          <Reveal className="shrink-0">
            <TextLink href="/work">{t(work.allLabel)}</TextLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <WorkCard key={item.slug} item={item} delay={(i % 3) * 90} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}
