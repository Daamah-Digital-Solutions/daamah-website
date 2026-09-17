import { Link, Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { track } from "../analytics";
import { services } from "../content/home";
import { servicesPage, workPage } from "../content/pages";
import { serviceDetails, serviceUi } from "../content/serviceDetails";
import { areaOf, areas } from "../content/areas";
import { faqItemsFor } from "../content/faq";
import { services as workServices, workItems, type ServiceKey } from "../content/work";
import { cityMeta, cityUi, citiesForService } from "../content/saudi";
import { waHref, waMessage } from "../content/whatsapp";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FaqList } from "../components/FaqList";
import { Justified } from "../components/Justified";
import { WorkCard } from "../components/WorkCard";
import { Arrow, Btn, Chevron, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/* الربط يُشتقّ من `services` في `work.ts` عبر حقل `page`: خريطة
   ثانية مكتوبة يدويًا تفترق عند أوّل خدمة تُضاف — كما حدث فعلًا مع
   الملف التعريفي، فبقيت صفحته بلا عمل واحد يثبتها. */
const relatedKey = (slug: string): ServiceKey | undefined =>
  workServices.find((s) => s.page === slug)?.key;

const pad = (n: number) => String(n).padStart(2, "0");

/* أسماء الأصناف حرفيّة كي يلتقطها Tailwind — لا تُركَّب من رقم */
const COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

type ServiceItem = (typeof services.items)[number];

/**
 * صفحة الخدمة — تجيب عن أسئلة المشتري بترتيبها:
 * هل هي لي؟ ماذا تشمل؟ كيف تسير؟ ماذا أستلم ولماذا أنتم؟
 * ثم الإثبات (أعمال) والاعتراضات (أسئلة) والخطوة التالية.
 */
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
  /* نفس المصدر الذي يقرأه مولّد `FAQPage` — ما يُعلَن هو ما يُعرض */
  const faq = faqItemsFor(`/services/${slug}`);

  /* الخدمات المكمّلة: أخوات العامل نفسه؛ والعامل الذي لا أخوات له
     (الأنظمة) يُكمَّل بما يغذّيه — الموقع والتسويق */
  const bySlug = (s: string) => services.items.find((x) => x.slug === s);
  const siblings = (area?.services ?? [])
    .filter((s) => s !== slug)
    .map(bySlug)
    .filter((s): s is ServiceItem => Boolean(s));
  const complete = siblings.length
    ? siblings
    : ["web-development", "digital-marketing", "media-buying"]
        .map(bySlug)
        .filter((s): s is ServiceItem => Boolean(s));

  const wa = waHref(t(waMessage.service(service.name)));
  /* أربعة في عمودين؛ وخمسة في ثلاثة تترك خانة فارغة، فيمتدّ الأول عمودين */
  const n = detail.includes.length;
  const includeCols = n === 4 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <>
      <PageHero
        label={`${area ? t(area.name) : t(servicesPage.label)} · ${service.en}`}
        title={[t(service.name)]}
        intro={t(detail.intro)}
      >
        <Reveal delay={260} eager className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Btn
            href={wa}
            external
            onClick={() => track("whatsapp_click", { placement: "service_hero" })}
          >
            {t(serviceUi.ask)}
          </Btn>
          {related.length > 0 && <TextLink href="#work">{t(serviceUi.seeWork)}</TextLink>}
        </Reveal>
        <div className="mt-12">
          <Breadcrumbs
            trail={[
              { label: t(servicesPage.label), href: "/services" },
              { label: t(service.name) },
            ]}
          />
        </div>
      </PageHero>

      {/* هل هذه الخدمة لك؟ */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionLabel>{t(serviceUi.signsLabel)}</SectionLabel>
              <h2 className="mt-8 max-w-[16ch] text-[30px] font-medium leading-tight sm:text-[40px]">
                {t(serviceUi.signsTitle)}
              </h2>
            </Reveal>
            <ul className="grid border-s border-t border-[var(--line)] sm:grid-cols-2 lg:col-span-8">
              {detail.signs.map((s, i) => (
                <Reveal
                  key={s.en}
                  as="li"
                  delay={(i % 2) * 90}
                  className="flex items-start gap-4 border-b border-e border-[var(--line)] p-7 sm:p-8"
                >
                  <span className="tag ltr nums mt-1 shrink-0 text-red">{pad(i + 1)}</span>
                  <p className="text-[16.5px] leading-relaxed">{t(s)}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Wrap>
      </section>

      {/* ما يشمله */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(serviceUi.includesLabel)}</SectionLabel>
            <p className="mt-8 max-w-[36ch] text-[22px] font-medium leading-snug sm:text-[28px]">
              {t(service.desc)}
            </p>
          </Reveal>
          <ol className={`mt-12 grid border-s border-t border-[var(--line)] sm:grid-cols-2 ${includeCols}`}>
            {detail.includes.map((p, i) => (
              <Reveal
                key={p.title.en}
                as="li"
                delay={(i % 3) * 80}
                className={`border-b border-e border-[var(--line)] p-8 sm:p-10 ${
                  n === 5 && i === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <span className="tag ltr nums text-red">{pad(i + 1)}</span>
                <h3 className="mt-6 text-[19px] font-medium leading-snug sm:text-[21px]">{t(p.title)}</h3>
                <p className="body mt-3 max-w-[48ch] text-[15.5px]">{t(p.desc)}</p>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* كيف نعمل عليها — مراحل بلا مُدَد: المدّة تُتّفق على نطاق كل مشروع */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionLabel>{t(serviceUi.stepsLabel)}</SectionLabel>
            <TextLink href="/process">{t({ ar: "طريقتنا في كل مشروع", en: "How we run every project" })}</TextLink>
          </Reveal>
          <ol className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {detail.steps.map((s, i) => (
              <Reveal
                key={s.title.en}
                as="li"
                delay={i * 90}
                className="relative border-t border-[var(--line-strong)] pt-8"
              >
                <span
                  className={`absolute -top-[5px] start-0 size-[9px] rounded-full ${i === 0 ? "bg-red" : "bg-ink"}`}
                />
                <span className="ltr nums block text-[clamp(2.2rem,3.6vw,3rem)] font-light leading-none text-ink/20">
                  {pad(i + 1)}
                </span>
                <h3 className="mt-6 text-[19px] font-medium leading-snug">{t(s.title)}</h3>
                <p className="body mt-3 max-w-[32ch] text-[15.5px]">{t(s.desc)}</p>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* ما تستلمه، ولماذا نحن */}
      <section className="border-t border-[var(--line)] py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionLabel>{t(serviceUi.deliverablesLabel)}</SectionLabel>
              <ul className="mt-8 border-t border-[var(--line)]">
                {detail.deliverables.map((d) => (
                  <li key={d.en} className="flex items-start gap-4 border-b border-[var(--line)] py-5">
                    <Chevron className="mt-[8px] h-2.5 w-auto shrink-0 text-red" />
                    <span className="text-[17px] font-medium leading-relaxed">{t(d)}</span>
                  </li>
                ))}
              </ul>
              {/* الرجوع إلى السردية: هذه الخدمة جزء من عامل، والعامل
                  جزء من حلّ — الزائر القادم من جوجل يدخل محادثة أوسع */}
              {area && (
                <div className="mt-10 bg-paper-2 p-7">
                  <p className="tag text-ink/40">{t(areas.label)}</p>
                  <p className="mt-3 text-[16px] font-medium leading-relaxed">{t(area.promise)}</p>
                  <p className="body mt-2 text-[15px]">{t(area.desc)}</p>
                </div>
              )}
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <SectionLabel>{t(serviceUi.whyLabel)}</SectionLabel>
              </Reveal>
              <ul className="mt-8 space-y-10">
                {detail.why.map((w, i) => (
                  <Reveal key={w.title.en} as="li" delay={i * 90} className="flex items-start gap-5">
                    <Chevron count={2} className="mt-2.5 h-3 w-auto shrink-0 text-red" />
                    <div>
                      <h3 className="text-[20px] font-medium leading-snug sm:text-[22px]">{t(w.title)}</h3>
                      <p className="body mt-2 max-w-[46ch]">{t(w.desc)}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Wrap>
      </section>

      {related.length > 0 && (
        <section id="work" className="scroll-mt-[var(--header-h)] bg-paper-2 py-20 sm:py-28">
          <Wrap>
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <SectionLabel>{t(servicesPage.relatedLabel)}</SectionLabel>
              <TextLink href="/work">{t(workPage.backLabel)}</TextLink>
            </Reveal>
            <Justified gap="gap-3 sm:gap-4 lg:gap-5" fill className="mt-12">
              {related.map((item, i) => (
                <WorkCard key={item.slug} item={item} delay={(i % 3) * 90} />
              ))}
            </Justified>
          </Wrap>
        </section>
      )}

      {faq.length > 0 && (
        <section className="border-t border-[var(--line)] py-20 sm:py-28">
          <Wrap>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
              <Reveal className="lg:col-span-4">
                <SectionLabel>{t(serviceUi.faqLabel)}</SectionLabel>
                <div className="mt-8">
                  <TextLink href="/faq">{t(serviceUi.allFaq)}</TextLink>
                </div>
              </Reveal>
              <div className="lg:col-span-8">
                <FaqList items={faq} />
              </div>
            </div>
          </Wrap>
        </section>
      )}

      {/* خدمات تكمّلها — ثم صفحات المدن: منها تصل قوّة الصفحة الأمّ
          إليها، وبها يجد الباحث المحلّي مدخله */}
      <section className="bg-paper-2 py-20 sm:py-24">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(serviceUi.siblingsLabel)}</SectionLabel>
          </Reveal>
          <ul className={`mt-10 grid border-s border-t border-[var(--line)] sm:grid-cols-2 ${COLS[Math.min(complete.length, 4)]}`}>
            {complete.map((s, i) => (
              <Reveal key={s.slug} as="li" delay={(i % 4) * 70} className="border-b border-e border-[var(--line)]">
                <Link
                  to={path(`/services/${s.slug}`)}
                  className="group flex h-full flex-col justify-between gap-8 p-7 transition-colors duration-(--dur-base) hover:bg-paper sm:p-8"
                >
                  <div>
                    <span className="tag ltr nums text-red">{s.no}</span>
                    <h3 className="mt-5 text-[19px] font-medium leading-snug">{t(s.name)}</h3>
                    <p className="body mt-2 text-[14.5px]">{t(s.desc)}</p>
                  </div>
                  <Arrow className="size-5 shrink-0 text-ink/25 transition-[color,transform] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1.5 group-hover:text-red rtl:group-hover:-translate-x-1.5" />
                </Link>
              </Reveal>
            ))}
          </ul>

          {inCities.length > 0 && (
            <Reveal className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="tag text-ink/40">{t(cityUi.otherCities)}</span>
              {inCities.map((c) => (
                <TextLink key={c} href={`/services/${slug}/${c}`}>
                  {`${t(service.name)} ${t(cityMeta(c).inCity)}`}
                </TextLink>
              ))}
            </Reveal>
          )}
        </Wrap>
      </section>

      <PageCta
        wa={waMessage.service(service.name)}
        placement="service"
        secondary={{ ar: "كل الخدمات", en: "All services" }}
        secondaryHref="/services"
      />
    </>
  );
}
