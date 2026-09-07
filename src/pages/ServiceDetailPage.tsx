import { Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { services } from "../content/home";
import { servicesPage, serviceDetails, workPage } from "../content/pages";
import { areaOf, areas } from "../content/areas";
import { services as workServices, workItems, type ServiceKey } from "../content/work";
import { cityMeta, cityUi, citiesForService } from "../content/saudi";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { waMessage } from "../content/whatsapp";
import { Chevron, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";
import { WorkCard } from "../components/WorkCard";

/**
 * صفحة الخدمة ← مفتاح الخدمة في الأعمال.
 * ما لا أعمال له بعد يبقى خارج الخريطة، فلا يُعرض قسمٌ فارغ.
 */
/* الربط يُشتقّ من `services` في `work.ts` عبر حقل `page`: خريطة
   ثانية مكتوبة يدويًا تفترق عند أوّل خدمة تُضاف — كما حدث فعلًا مع
   الملف التعريفي، فبقيت صفحته بلا عمل واحد يثبتها. */
const relatedKey = (slug: string): ServiceKey | undefined =>
  workServices.find((s) => s.page === slug)?.key;

export function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const { t, path } = useLang();

  const service = services.items.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];


  // مسار غير معروف: تحويل إلى قائمة الخدمات بدل صفحة فارغة
  if (!service || !detail) return <Navigate to={path("/services")} replace />;

  const area = areaOf(slug);
  const key = relatedKey(slug);
  const related = key ? workItems.filter((w) => w.service === key).slice(0, 3) : [];
  const inCities = citiesForService(slug);

  return (
    <>
      <PageHero
        label={`${area ? t(area.name) : t(servicesPage.label)} · ${service.en}`}
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
              {/* الرجوع إلى السردية: هذه الخدمة جزء من عامل، والعامل
                  جزء من حلّ — الزائر القادم من جوجل يدخل محادثة أوسع */}
              {area && (
                <div className="mt-10 border-t border-[var(--line)] pt-6">
                  <p className="tag text-ink/40">{t(areas.label)}</p>
                  <p className="mt-3 text-[15.5px] leading-relaxed">{t(area.promise)}</p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <TextLink href="/services">{t(servicesPage.backLabel)}</TextLink>
                <TextLink href="/solutions">
                  {t({ ar: "شاهد الحلول", en: "See the solutions" })}
                </TextLink>
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

      {/* الروابط إلى صفحات المدن — منها تصل قوّة الصفحة الأمّ إليها،
          وبها يجد الباحث المحلّي مدخله */}
      {inCities.length > 0 && (
        <section className="py-16 sm:py-20">
          <Wrap>
            <Reveal className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <SectionLabel>{t(cityUi.otherCities)}</SectionLabel>
              {inCities.map((c) => (
                <TextLink key={c} href={`/services/${slug}/${c}`}>
                  {`${t(service.name)} ${t(cityMeta(c).inCity)}`}
                </TextLink>
              ))}
            </Reveal>
          </Wrap>
        </section>
      )}

      <PageCta
        wa={waMessage.service(service.name)}
        placement="service"
        secondary={{ ar: "كل الخدمات", en: "All services" }}
        secondaryHref="/services"
      />
    </>
  );
}
