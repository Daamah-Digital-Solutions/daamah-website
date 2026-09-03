import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { services } from "../content/home";
import { servicesPage, serviceDetails } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Arrow, Reveal, Wrap } from "../components/ui";

export function ServicesPage() {
  const { t, path } = useLang();

  return (
    <>
      <PageHero
        label={t(servicesPage.label)}
        title={t(servicesPage.title)}
        intro={t(servicesPage.intro)}
      />

      <section className="py-20 sm:py-28">
        <Wrap>
          {/* صفّ لكل خدمة: العرض هنا أوسع من شبكة الرئيسية فيتّسع للتفصيل */}
          <div className="border-t border-[var(--line)]">
            {services.items.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80} as="article" className="group">
                <Link
                  to={path(`/services/${s.slug}`)}
                  className="flex flex-col gap-6 border-b border-[var(--line)] py-10 transition-[padding] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:ps-3 lg:flex-row lg:items-baseline lg:gap-12 lg:py-12"
                >
                  <span className="tag ltr nums shrink-0 text-red lg:w-16">{s.no}</span>

                  <div className="lg:w-[26rem] lg:shrink-0">
                    <h2 className="text-[24px] font-medium leading-tight sm:text-[30px]">
                      {t(s.name)}
                    </h2>
                    <p className="tag ltr mt-2 text-ink/35">{s.en}</p>
                  </div>

                  <p className="body max-w-[46ch] lg:flex-1">
                    {t(serviceDetails[s.slug]?.intro ?? s.desc)}
                  </p>

                  <Arrow className="size-5 shrink-0 text-ink/25 transition-[color,transform] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1.5 group-hover:text-red rtl:group-hover:-translate-x-1.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <PageCta
        lines={{
          ar: ["اختر ما يناسبك،", "ودعنا ننفّذ."],
          en: ["Pick what fits,", "we'll handle the rest."],
        }}
        secondary={{ ar: "شوف الباقات", en: "See packages" }}
        secondaryHref="/packages"
      />
    </>
  );
}
