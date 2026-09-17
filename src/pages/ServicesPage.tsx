import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { services, stripSlugs } from "../content/home";
import { areas } from "../content/areas";
import { servicesPage, workPage } from "../content/pages";
import { serviceDetails, serviceUi } from "../content/serviceDetails";
import { workItems } from "../content/work";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Justified } from "../components/Justified";
import { WorkCard } from "../components/WorkCard";
import { Arrow, Chevron, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

type ServiceItem = (typeof services.items)[number];
type WorkItem = (typeof workItems)[number];

/**
 * الخدمات مجموعةً تحت العوامل الثلاثة.
 *
 * تسع خدمات في قائمة مسطّحة تُقرأ «وكالة تعمل أيّ شيء». ونفسها تحت
 * ثلاثة عوامل تُقرأ منظومة — والسؤال في الأعلى يجعل القارئ يختار
 * عامله قبل أن يقرأ خدمةً واحدة. كل عامل يثبت بجانبه وهو يمرّ على
 * خدماته، وكل خدمة تُري ما تشمله قبل النقر، ثم طرق التعاون والإثبات.
 */
export function ServicesPage() {
  const { t, path } = useLang();

  const picks = stripSlugs
    .map((slug) => workItems.find((w) => w.slug === slug))
    .filter((w): w is WorkItem => Boolean(w))
    .slice(0, 3);

  return (
    <>
      <PageHero
        label={t(servicesPage.label)}
        title={t(servicesPage.title)}
        intro={t(servicesPage.intro)}
      >
        {/* فهرس العوامل — القفز إلى ما يحتاجه القارئ الآن */}
        <Reveal
          delay={260}
          eager
          className="mt-12 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3"
        >
          {areas.items.map((a) => (
            <a
              key={a.key}
              href={`#${a.key}`}
              className="group flex items-baseline gap-4 bg-paper p-5 transition-colors duration-(--dur-base) hover:bg-paper-2 sm:p-6"
            >
              <span className="tag ltr nums text-red">{a.no}</span>
              <span className="flex-1 text-[15.5px] font-medium leading-snug">{t(a.name)}</span>
              <span className="tag text-ink/40">
                <span className="ltr nums">{a.services.length}</span> {t(serviceUi.count)}
              </span>
            </a>
          ))}
        </Reveal>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Wrap>
          <Reveal>
            <h2 className="h2 max-w-[20ch]">{t(areas.question)}</h2>
          </Reveal>

          {areas.items.map((area) => {
            const items = area.services
              .map((slug) => services.items.find((s) => s.slug === slug))
              .filter((s): s is ServiceItem => Boolean(s));

            return (
              <div
                key={area.key}
                id={area.key}
                className="mt-16 grid scroll-mt-[calc(var(--header-h)+2rem)] gap-10 border-t border-[var(--line-strong)] pt-10 sm:mt-24 lg:grid-cols-12 lg:gap-16 lg:pt-14"
              >
                <div className="lg:col-span-4">
                  <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
                    <span className="ltr nums block text-[clamp(3rem,6vw,5rem)] font-light leading-none text-ink/15">
                      {area.no}
                    </span>
                    <p className="tag mt-6 text-ink/45">{t(area.name)}</p>
                    <h3 className="mt-3 max-w-[18ch] text-[24px] font-medium leading-snug sm:text-[28px]">
                      {t(area.promise)}
                    </h3>
                    <p className="body mt-4 max-w-[40ch]">{t(area.desc)}</p>
                  </Reveal>
                </div>

                <ul className="lg:col-span-8 lg:-mt-8">
                  {items.map((s, i) => {
                    const d = serviceDetails[s.slug];
                    return (
                      <Reveal key={s.slug} as="li" delay={(i % 3) * 80} className="group">
                        <Link
                          to={path(`/services/${s.slug}`)}
                          className="flex items-start gap-5 border-b border-[var(--line)] py-8 transition-[padding] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:ps-3 sm:gap-8 sm:py-9"
                        >
                          <span className="tag ltr nums mt-2.5 w-7 shrink-0 text-red">{s.no}</span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                              <h4 className="text-[22px] font-medium leading-tight sm:text-[26px]">
                                {t(s.name)}
                              </h4>
                              <span className="tag ltr text-ink/35">{s.en}</span>
                            </div>
                            <p className="body mt-3 max-w-[56ch]">{t(s.desc)}</p>
                            {d && (
                              <ul className="mt-5 flex flex-wrap gap-2">
                                {d.includes.slice(0, 3).map((p) => (
                                  <li
                                    key={p.title.en}
                                    className="rounded-pill border border-[var(--line)] px-3 py-1 text-[13px] text-ink/60"
                                  >
                                    {t(p.title)}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <Arrow className="mt-2.5 size-5 shrink-0 text-ink/25 transition-[color,transform] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1.5 group-hover:text-red rtl:group-hover:-translate-x-1.5" />
                        </Link>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {/* الادّعاء السببي بعد آخر عامل — لا قبل أن تُقرأ الثلاثة */}
          <Reveal className="mt-20 grid gap-8 border-t border-[var(--line-strong)] pt-12 sm:mt-28 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Chevron count={2} className="h-4 w-auto text-red" />
            </div>
            <p className="max-w-[48ch] text-[21px] font-medium leading-[1.7] sm:text-[25px] lg:col-span-8">
              {t(areas.proof)}
            </p>
          </Reveal>
        </Wrap>
      </section>

      {/* طرق التعاون */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(serviceUi.engageLabel)}</SectionLabel>
          </Reveal>
          <MaskLines lines={t(serviceUi.engageTitle)} as="h2" className="h2 mt-8 max-w-[22ch]" />
          <div className="mt-14 grid border-s border-t border-[var(--line)] lg:grid-cols-3">
            {serviceUi.engage.map((e, i) => (
              <Reveal
                key={e.title.en}
                delay={i * 90}
                className="flex flex-col border-b border-e border-[var(--line)] p-8 sm:p-10"
              >
                <span className="tag ltr nums text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[21px] font-medium leading-snug">{t(e.title)}</h3>
                <p className="body mt-3 flex-1">{t(e.desc)}</p>
                <div className="mt-8">
                  <TextLink href={e.href}>{t(e.link)}</TextLink>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* الإثبات */}
      {picks.length > 0 && (
        <section className="py-20 sm:py-28">
          <Wrap>
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <SectionLabel>{t(serviceUi.workLabel)}</SectionLabel>
              <TextLink href="/work">{t(workPage.backLabel)}</TextLink>
            </Reveal>
            <Justified gap="gap-3 sm:gap-4 lg:gap-5" fill className="mt-12">
              {picks.map((item, i) => (
                <WorkCard key={item.slug} item={item} delay={(i % 3) * 90} />
              ))}
            </Justified>
          </Wrap>
        </section>
      )}

      {/* الأسئلة — الاعتراضات قبل الخاتمة */}
      <section className="border-t border-[var(--line)] py-16 sm:py-20">
        <Wrap>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
            <p className="max-w-[52ch] text-[18px] leading-relaxed sm:text-[20px]">
              {t(serviceUi.faqTeaser)}
            </p>
            <div className="shrink-0">
              <TextLink href="/faq">{t(serviceUi.allFaq)}</TextLink>
            </div>
          </Reveal>
        </Wrap>
      </section>

      <PageCta
        lines={{
          ar: ["لا تعرفون", "من أين تبدأون؟"],
          en: ["Not sure where", "to begin?"],
        }}
        secondary={{ ar: "اقرأ الحلول", en: "See the solutions" }}
        secondaryHref="/solutions"
      />
    </>
  );
}
