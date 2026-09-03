import { useMemo, useState } from "react";
import { useLang } from "../i18n";
import { work, type WorkCategory } from "../content/home";
import { MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";
import { WorkCard } from "../components/WorkCard";

export function Work() {
  const { t } = useLang();
  const [active, setActive] = useState<WorkCategory | "all">("all");

  const items = useMemo(
    () => (active === "all" ? work.items : work.items.filter((w) => w.cat === active)),
    [active],
  );

  return (
    <section id="work" className="relative py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index={work.index}>{t(work.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-10 sm:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <MaskLines lines={t(work.lede)} as="h2" className="h2" />

          {/* المرشّحات */}
          <Reveal className="flex flex-wrap gap-2">
            {work.filters.map((f) => {
              const on = active === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  aria-pressed={on}
                  className={`rounded-pill border px-4 py-2 text-[13.5px] font-medium transition-colors duration-(--dur-base) ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-[var(--line)] text-ink/55 hover:border-[var(--line-strong)] hover:text-ink"
                  }`}
                >
                  {t(f.label)}
                </button>
              );
            })}
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <WorkCard
              /* المفتاح يحمل الفئة النشطة: تغيير المرشّح يعيد تركيب
                 البطاقات فتُكشف من جديد بدل أن تظهر دفعةً واحدة */
              key={`${active}-${item.slug}`}
              item={item}
              index={i}
              delay={(i % 3) * 90}
            />
          ))}
        </div>

        {items.length === 0 && <p className="body mt-16 text-center">{t(work.empty)}</p>}

        <Reveal className="mt-16 sm:mt-20">
          <TextLink href="/work">{t(work.allLabel)}</TextLink>
        </Reveal>
      </Wrap>
    </section>
  );
}
