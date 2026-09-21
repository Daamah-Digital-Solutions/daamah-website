import { useLang } from "../i18n";
import { about } from "../content/home";
import { aboutPage } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Film } from "../sections/Film";
import { Chevron, Counter, Reveal, SectionLabel, Wrap } from "../components/ui";

/** عمود «مشكلة» أو «حل» — نفس الشكل، والنبرة وحدها تفرّق. */
function Column({
  label,
  lead,
  items,
  outcome,
  accent,
}: {
  label: string;
  lead: string;
  items: string[];
  outcome: string;
  accent: boolean;
}) {
  return (
    <div className="border-t border-[var(--line)] pt-8">
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-7 max-w-[34ch] text-[20px] font-medium leading-snug sm:text-[23px]">
        {lead}
      </p>
      <ul className="mt-8 space-y-4">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3.5">
            <Chevron
              className={`mt-[7px] h-2.5 w-auto shrink-0 ${accent ? "text-red" : "text-ink/25"}`}
            />
            <span className="text-[15px] leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
      <p className={`mt-8 text-[15px] font-medium ${accent ? "text-red" : "text-ink/50"}`}>
        {outcome}
      </p>
    </div>
  );
}

export function AboutPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        label={t(aboutPage.label)}
        title={t(aboutPage.title)}
        intro={t(aboutPage.intro)}
      />

      {/* دَعمة في سطور — التعريف الذي يُقتبس، قبل الرؤية والرسالة:
          من يريد الحقائق يجدها أولًا، ومن يريد القصّة يكمل */}
      <section className="border-b border-[var(--line)] py-20 sm:py-24">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <SectionLabel>{t(aboutPage.glance.label)}</SectionLabel>
              <p className="mt-7 max-w-[62ch] text-[18px] leading-relaxed sm:text-[19.5px]">{t(aboutPage.glance.summary)}</p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <dl className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
                {aboutPage.glance.facts.map((f) => (
                  <div key={f.k.en} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-[15px]">
                    <dt className="text-ink/50">{t(f.k)}</dt>
                    <dd className="font-medium">{t(f.v)}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* الرؤية والرسالة */}
      <section className="py-24 sm:py-32">
        <Wrap>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {[aboutPage.vision, aboutPage.mission].map((block, i) => (
              <Reveal key={block.label.en} delay={i * 120}>
                <SectionLabel>{t(block.label)}</SectionLabel>
                <p className="body mt-7 max-w-[52ch]">{t(block.body)}</p>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* الفيلم التعريفي — بعد الرؤية والرسالة: من قرأهما أراد أن يرانا */}
      <Film className="pt-16 pb-20 sm:pt-20 sm:pb-28" />

      {/* المشكلة والحل */}
      <section className="bg-paper-2 py-24 sm:py-32">
        <Wrap>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Column
                label={t(aboutPage.problem.label)}
                lead={t(aboutPage.problem.lead)}
                items={aboutPage.problem.items.map(t)}
                outcome={t(aboutPage.problem.outcome)}
                accent={false}
              />
            </Reveal>
            <Reveal delay={120}>
              <Column
                label={t(aboutPage.solution.label)}
                lead={t(aboutPage.solution.lead)}
                items={aboutPage.solution.items.map(t)}
                outcome={t(aboutPage.solution.outcome)}
                accent
              />
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* لماذا دَعمة */}
      <section className="py-24 sm:py-32">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(aboutPage.whyUs.label)}</SectionLabel>
          </Reveal>

          <div className="mt-12 grid border-s border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {aboutPage.whyUs.items.map((item, i) => (
              <Reveal
                key={item.no}
                delay={(i % 3) * 90}
                className="border-b border-e border-[var(--line)] p-8 sm:p-10"
              >
                <span className="tag ltr nums text-red">{item.no}</span>
                <h3 className="mt-6 max-w-[20ch] text-[18px] font-medium leading-snug sm:text-[20px]">
                  {t(item.title)}
                </h3>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* الأرقام */}
      <section className="pb-24 sm:pb-32">
        <Wrap>
          <Reveal className="border-t border-[var(--line)]">
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {about.stats.map((s) => (
                <div
                  key={s.label.en}
                  className="border-b border-[var(--line)] py-8 even:ps-6 sm:py-10 lg:border-b-0 lg:border-s lg:ps-8 lg:even:ps-8 lg:first:border-s-0 lg:first:ps-0"
                >
                  <dt className="flex items-baseline gap-0.5 text-[clamp(2.6rem,5vw,4.25rem)] font-light leading-none tracking-tight">
                    <Counter to={s.value} />
                    <span className="text-red">{s.suffix}</span>
                  </dt>
                  <dd className="tag mt-4 text-ink/45">{t(s.label)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Wrap>
      </section>

      <PageCta
        lines={{
          ar: ["نرسم الرؤية،", "ونحوّلها إلى واقع."],
          en: ["We draw the vision,", "then make it real."],
        }}
        secondary={{ ar: "شاهد أعمالنا", en: "See our work" }}
        secondaryHref="/work"
      />
    </>
  );
}
