import { Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { services, work } from "../content/home";
import { servicesPage, serviceDetails, workPage } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Chevron, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";
import { WorkCard } from "../components/WorkCard";

/** الخدمة ← فئة الأعمال المرتبطة بها */
const RELATED: Record<string, "brand" | "web" | "social" | null> = {
  branding: "brand",
  "web-development": "web",
  "social-media": "social",
  "digital-marketing": null,
  "media-buying": null,
  "performance-marketing": null,
};

export function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const { t, path } = useLang();

  const service = services.items.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];


  // مسار غير معروف: تحويل إلى قائمة الخدمات بدل صفحة فارغة
  if (!service || !detail) return <Navigate to={path("/services")} replace />;

  const cat = RELATED[slug];
  const related = cat ? work.items.filter((w) => w.cat === cat).slice(0, 3) : [];

  return (
    <>
      <PageHero
        label={`${t(servicesPage.label)} · ${service.en}`}
        title={[t(service.name)]}
        intro={t(detail.intro)}
      />

      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6">
              <SectionLabel>{t(servicesPage.detailLabel)}</SectionLabel>
              <ul className="mt-8 border-t border-[var(--line)]">
                {detail.includes.map((f) => (
                  <li
                    key={f.en}
                    className="flex items-start gap-4 border-b border-[var(--line)] py-5"
                  >
                    <Chevron className="mt-[7px] h-2.5 w-auto shrink-0 text-red" />
                    <span className="text-[16px] leading-relaxed">{t(f)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
              <SectionLabel>{t({ ar: "ما تستلمه", en: "What you receive" })}</SectionLabel>
              <ul className="mt-8 space-y-5">
                {detail.deliverables.map((d) => (
                  <li key={d.en} className="flex items-start gap-4">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-red" />
                    <span className="text-[16px] leading-relaxed">{t(d)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <TextLink href="/services">{t(servicesPage.backLabel)}</TextLink>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-2 py-20 sm:py-28">
          <Wrap>
            <Reveal>
              <SectionLabel>{t(servicesPage.relatedLabel)}</SectionLabel>
            </Reveal>
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <WorkCard key={item.slug} item={item} delay={(i % 3) * 90} />
              ))}
            </div>
            <Reveal className="mt-12">
              <TextLink href="/work">{t(workPage.backLabel)}</TextLink>
            </Reveal>
          </Wrap>
        </section>
      )}

      <PageCta
        primaryHref={`/contact?service=${slug}`}
        secondary={{ ar: "كل الخدمات", en: "All services" }}
        secondaryHref="/services"
      />
    </>
  );
}
