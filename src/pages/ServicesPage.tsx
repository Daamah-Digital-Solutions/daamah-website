import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { services } from "../content/home";
import { areas } from "../content/areas";
import { servicesPage, serviceDetails } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Arrow, Chevron, Reveal, SectionLabel, Wrap } from "../components/ui";

/**
 * الخدمات مجموعةً تحت العوامل الثلاثة.
 *
 * تسع خدمات في قائمة مسطّحة تُقرأ «وكالة تعمل أيّ شيء». ونفسها تحت
 * ثلاثة عوامل تُقرأ منظومة — والسؤال في الأعلى يجعل القارئ يختار
 * عامله قبل أن يقرأ خدمةً واحدة.
 */
export function ServicesPage() {
  const { t, path } = useLang();

  return (
    <>
      <PageHero
        label={t(servicesPage.label)}
        title={t(servicesPage.title)}
        intro={t(servicesPage.intro)}
      />

      <section className="py-16 sm:py-24">
        <Wrap>
          <Reveal>
            <h2 className="h2 max-w-[20ch]">{t(areas.question)}</h2>
          </Reveal>

          {areas.items.map((area, ai) => {
            const items = area.services
              .map((slug) => services.items.find((s) => s.slug === slug))
              .filter((s): s is (typeof services.items)[number] => Boolean(s));

            return (
              <div key={area.key} className="mt-16 sm:mt-24">
                <Reveal>
                  <SectionLabel index={area.no}>{t(area.name)}</SectionLabel>
                  <p className="mt-6 max-w-[46ch] text-[19px] font-medium leading-snug sm:text-[21px]">
                    {t(area.promise)}
                  </p>
                  <p className="body mt-3 max-w-[52ch]">{t(area.desc)}</p>
                </Reveal>

                <div className="mt-10 border-t border-[var(--line)]">
                  {items.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) * 80} as="article" className="group">
                      <Link
                        to={path(`/services/${s.slug}`)}
                        className="flex flex-col gap-4 border-b border-[var(--line)] py-8 transition-[padding] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:ps-3 lg:flex-row lg:items-baseline lg:gap-12 lg:py-9"
                      >
                        <span className="tag ltr nums shrink-0 text-red lg:w-14">{s.no}</span>

                        <div className="lg:w-[22rem] lg:shrink-0">
                          <h3 className="text-[21px] font-medium leading-tight sm:text-[25px]">
                            {t(s.name)}
                          </h3>
                          <p className="tag ltr mt-2 text-ink/35">{s.en}</p>
                        </div>

                        <p className="body max-w-[44ch] lg:flex-1">
                          {t(serviceDetails[s.slug]?.intro ?? s.desc)}
                        </p>

                        <Arrow className="size-5 shrink-0 text-ink/25 transition-[color,transform] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1.5 group-hover:text-red rtl:group-hover:-translate-x-1.5" />
                      </Link>
                    </Reveal>
                  ))}
                </div>

                {/* الادّعاء السببي بعد آخر عامل — لا قبل أن تُقرأ الثلاثة */}
                {ai === areas.items.length - 1 && (
                  <Reveal className="mt-14 flex flex-wrap items-baseline gap-x-4 gap-y-3 bg-paper-2 p-7 sm:p-8">
                    <Chevron count={2} className="mt-1 h-3 w-auto shrink-0 text-red" />
                    <p className="max-w-[64ch] flex-1 text-[16.5px] leading-relaxed">
                      {t(areas.proof)}
                    </p>
                  </Reveal>
                )}
              </div>
            );
          })}
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
