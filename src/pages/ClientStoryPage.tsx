import { Link, Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { clientPage, workDetails, workPage } from "../content/pages";
import {
  chaptersOf,
  markets as marketLabels,
  sectorMeta,
  serviceMeta,
  storyBySlug,
} from "../content/work";
import { PageCta } from "../components/PageCta";
import { Chevron, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";
import { Img } from "../components/Img";
import { coverSize } from "../content/gallery";

/**
 * قصّة عميل — تجميعة فوق الأعمال، لا مخزنٌ ثانٍ لها.
 *
 * فصولها هي عناصر `workItems` التي تحمل مفتاح العميل، ووصف كل فصل
 * يُقرأ من `workDetails` نفسه الذي تقرأه صفحة العمل. فلا يوجد نصّ في
 * مكانين ولا خطر أن يفترق أحدهما عن الآخر.
 *
 * والترتيب هو الرسالة: قائمةٌ تقول «نفّذنا خمس خدمات»، أمّا التسلسل
 * فيقول «بقوا معنا» — وهذه وحدها لا تُدَّعى كذبًا.
 */
export function ClientStoryPage() {
  const { slug = "" } = useParams();
  const { t, path } = useLang();

  const story = storyBySlug(slug);
  if (!story) return <Navigate to={path("/work")} replace />;

  const chapters = chaptersOf(slug);

  /* «منذ» يظهر حين تُعرف السنة وحدها — لا يُختلق تاريخ لملء خانة */
  const facts = [
    { label: t(clientPage.servicesLabel), value: String(chapters.length) },
    { label: t(workPage.sectorLabel), value: t(sectorMeta(story.sector).label) },
    ...(story.since ? [{ label: t(clientPage.sinceLabel), value: String(story.since) }] : []),
    ...(story.markets.length
      ? [
          {
            label: t(workPage.marketsLabel),
            value: story.markets.map((m) => t(marketLabels[m])).join(" · "),
          },
        ]
      : []),
  ];

  return (
    <>
      <section className="pt-[calc(var(--header-h)+3.5rem)] sm:pt-[calc(var(--header-h)+5rem)]">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(clientPage.label)}</SectionLabel>
          </Reveal>

          <MaskLines lines={[t(story.name)]} className="display mt-8 max-w-[16ch] sm:mt-12" />

          <Reveal delay={180}>
            <p className="body mt-10 max-w-[58ch] sm:mt-12">{t(story.lede)}</p>
          </Reveal>

          <Reveal delay={240} className="mt-14 border-t border-[var(--line)] sm:mt-16">
            <dl className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
              {facts.map((row, i) => (
                <div
                  key={row.label}
                  className={`border-b border-[var(--line)] py-6 sm:border-b-0 sm:py-8 ${
                    i > 0 ? "sm:border-s sm:ps-8" : ""
                  }`}
                >
                  <dt className="tag text-ink/40">{row.label}</dt>
                  <dd className="nums mt-3 text-[16px] font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Wrap>
      </section>

      {/* الفصول — كل فصل عمل قائم بذاته وله صفحته */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(clientPage.chaptersLabel)}</SectionLabel>
          </Reveal>

          <ol className="mt-12 border-t border-[var(--line)]">
            {chapters.map((c, i) => {
              const detail = workDetails[c.slug];
              return (
                <Reveal key={c.slug} delay={i * 110} as="li">
                  <Link
                    to={path(`/work/${c.slug}`)}
                    className="group grid gap-8 border-b border-[var(--line)] py-10 lg:grid-cols-12 lg:gap-12"
                  >
                    <div className="flex items-start gap-5 lg:col-span-5">
                      <span className="tag ltr nums mt-1.5 shrink-0 text-red">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[22px] font-medium leading-snug sm:text-[26px]">
                          {t(serviceMeta(c.service).label)}
                        </h3>
                        {c.year && <p className="tag nums ltr mt-2 text-ink/40">{c.year}</p>}
                      </div>
                    </div>

                    <div className="lg:col-span-4">
                      {detail && <p className="body">{t(detail.desc)}</p>}
                    </div>

                    <div className="lg:col-span-3">
                      <div className="aspect-[4/3] overflow-hidden bg-paper-2">
                        <Img
                          src={c.image}
                          alt={t(c.name)}
                          width={coverSize[c.image]?.w ?? 1400}
                          height={coverSize[c.image]?.h ?? 933}
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="size-full object-contain transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04] dark:brightness-[0.86] dark:group-hover:brightness-100"
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ol>
        </Wrap>
      </section>

      {/* أثر العلاقة ككل — لا أثر خدمة بعينها */}
      <section className="pb-20 sm:pb-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionLabel>{t(clientPage.resultsLabel)}</SectionLabel>
            </Reveal>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="border-t border-[var(--line)]">
                {story.results.map((r, i) => (
                  <Reveal
                    key={r.en}
                    delay={i * 90}
                    as="li"
                    className="flex items-start gap-4 border-b border-[var(--line)] py-6"
                  >
                    <Chevron className="mt-[9px] h-2.5 w-auto shrink-0 text-red" />
                    <span className="text-[18px] leading-relaxed sm:text-[20px]">{t(r)}</span>
                  </Reveal>
                ))}
              </ul>

              <Reveal className="mt-10">
                <TextLink href="/work">{t(clientPage.backLabel)}</TextLink>
              </Reveal>
            </div>
          </div>
        </Wrap>
      </section>

      <PageCta lines={clientPage.ctaLines} />
    </>
  );
}
