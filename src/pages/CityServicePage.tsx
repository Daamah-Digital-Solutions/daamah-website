import { Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { services } from "../content/home";
import { servicesPage } from "../content/pages";
import { workItems, type ServiceKey } from "../content/work";
import {
  cityMeta,
  cityUi,
  citiesForService,
  findCityPage,
  type CityKey,
} from "../content/saudi";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { waMessage } from "../content/whatsapp";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FaqList } from "../components/FaqList";
import { Justified } from "../components/Justified";
import { WorkCard } from "../components/WorkCard";
import { Testimonials } from "../sections/Testimonials";
import { Chevron, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/** صفحة الخدمة ← مفتاح الخدمة في الأعمال، لاشتقاق الإثبات. */
const WORK_KEY: Record<string, ServiceKey | undefined> = {
  branding: "brand",
  "web-development": "web",
  "digital-marketing": "social",
};

/**
 * صفحة (خدمة × مدينة).
 *
 * الإثبات هنا مشتقّ لا مكتوب: الأعمال تُرشَّح من `work.ts` بسوق
 * السعودية، فلا يُكتب عمل مرّتين ولا تدّعي الصفحة ما ليس في الموقع.
 */
export function CityServicePage() {
  const { slug = "", city = "" } = useParams();
  const { t, path } = useLang();

  const page = findCityPage(slug, city);
  const service = services.items.find((s) => s.slug === slug);

  // مسار غير معروف: إلى صفحة الخدمة إن وُجدت، وإلا إلى قائمتها
  if (!page || !service) {
    return <Navigate to={path(service ? `/services/${slug}` : "/services")} replace />;
  }

  const cityInfo = cityMeta(city as CityKey);
  const key = WORK_KEY[slug];
  const saudiWork = workItems.filter((w) => w.markets.includes("sa"));
  const proof = (key ? saudiWork.filter((w) => w.service === key) : saudiWork).slice(0, 3);
  const others = citiesForService(slug).filter((c) => c !== city);

  return (
    <>
      <PageHero
        label={`${t(servicesPage.label)} · ${t(cityInfo.name)}`}
        title={t(page.h1)}
        intro={t(page.intro)}
      >
        <div className="mt-10">
          <Breadcrumbs
            trail={[
              { label: t(servicesPage.label), href: "/services" },
              { label: t(service.name), href: `/services/${slug}` },
              { label: t(cityInfo.name) },
            ]}
          />
        </div>
      </PageHero>

      {/* ما نراه يتكرّر — مشكلات هذه المدينة وهذه الخدمة تحديدًا */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(cityUi.painLabel)}</SectionLabel>
          </Reveal>
          <ul className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-3">
            {page.painPoints.map((p, i) => (
              <Reveal key={p.title.en} delay={i * 80} as="li">
                <h2 className="text-[19px] font-medium leading-snug">{t(p.title)}</h2>
                <p className="body mt-3">{t(p.body)}</p>
              </Reveal>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* كيف نعالجه */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionLabel>{t(cityUi.approachLabel)}</SectionLabel>
            </Reveal>
            <ul className="lg:col-span-8">
              {page.approach.map((a, i) => (
                <Reveal key={a.en} delay={i * 70} as="li">
                  <div className="flex items-start gap-4 border-b border-[var(--line)] py-6">
                    <Chevron className="mt-[7px] h-2.5 w-auto shrink-0 text-red" />
                    <span className="text-[16px] leading-relaxed">{t(a)}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={140} className="mt-12">
            <TextLink href={`/services/${slug}`}>{t(cityUi.serviceLink)}</TextLink>
          </Reveal>
        </Wrap>
      </section>

      {proof.length > 0 && (
        <section className="py-20 sm:py-28">
          <Wrap>
            <Reveal>
              <SectionLabel>{t(cityUi.workLabel)}</SectionLabel>
            </Reveal>
            <Justified gap="gap-3 sm:gap-4 lg:gap-5" fill className="mt-10">
              {proof.map((w, i) => (
                <WorkCard key={w.slug} item={w} delay={i * 80} />
              ))}
            </Justified>
          </Wrap>
        </section>
      )}

      <Testimonials service={slug} market="sa" />

      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionLabel>{t(cityUi.faqLabel)}</SectionLabel>
            </Reveal>
            <div className="lg:col-span-8">
              <FaqList items={page.faq} />
            </div>
          </div>

          {others.length > 0 && (
            <Reveal delay={120} className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="tag text-ink/40">{t(cityUi.otherCities)}</span>
              {others.map((c) => (
                <TextLink key={c} href={`/services/${slug}/${c}`}>
                  {t(cityMeta(c).name)}
                </TextLink>
              ))}
            </Reveal>
          )}
        </Wrap>
      </section>

      <PageCta
        lines={{
          ar: [`${t(service.name)} ${t(cityInfo.inCity)}؟`, "نبدأ بمكالمة."],
          en: [`${t(service.name)} ${t(cityInfo.inCity)}?`, "It starts with a call."],
        }}
        primary={cityUi.cta}
        wa={waMessage.city(service.name, cityInfo.name)}
        placement="city"
      />
    </>
  );
}
