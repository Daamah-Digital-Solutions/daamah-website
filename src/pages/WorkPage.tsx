import { useMemo, useState } from "react";
import { useLang } from "../i18n";
import { work, type WorkCategory } from "../content/home";
import { workPage } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Reveal, Wrap } from "../components/ui";
import { WorkCard } from "../components/WorkCard";

export function WorkPage() {
  const { t } = useLang();
  const [active, setActive] = useState<WorkCategory | "all">("all");

  const items = useMemo(
    () => (active === "all" ? work.items : work.items.filter((w) => w.cat === active)),
    [active],
  );

  return (
    <>
      <PageHero
        label={t(workPage.label)}
        title={t(workPage.title)}
        intro={t(workPage.intro)}
      >
        <Reveal delay={260} className="mt-12 flex flex-wrap gap-2">
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
      </PageHero>

      <section className="py-16 sm:py-24">
        <Wrap>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <WorkCard
                key={`${active}-${item.slug}`}
                item={item}
                index={i}
                delay={(i % 3) * 90}
              />
            ))}
          </div>

          {items.length === 0 && <p className="body mt-16 text-center">{t(work.empty)}</p>}
        </Wrap>
      </section>

      <PageCta
        lines={{
          ar: ["مشروعك التالي", "يبدأ من هنا."],
          en: ["Your next project", "starts here."],
        }}
      />
    </>
  );
}
