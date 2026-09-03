import { Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { work } from "../content/home";
import { workDetails, workPage } from "../content/pages";
import {
  markets as marketLabels,
  sectorMeta,
  serviceMeta,
  servicesOf,
  storyBySlug,
  workItems,
} from "../content/work";
import { PageCta } from "../components/PageCta";
import { Chevron, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

export function WorkDetailPage() {
  const { slug = "" } = useParams();
  const { t, path } = useLang();

  const index = workItems.findIndex((w) => w.slug === slug);
  const item = index >= 0 ? workItems[index] : undefined;
  const detail = workDetails[slug];

  // مسار غير معروف: تحويل إلى قائمة الأعمال بدل صفحة فارغة
  if (!item || !detail) return <Navigate to={path("/work")} replace />;

  const next = workItems[(index + 1) % workItems.length];
  const story = item.client ? storyBySlug(item.client) : undefined;
  const storyServices = item.client ? servicesOf(item.client) : [];

  const facts = [
    { label: t(workPage.sectorLabel), value: t(sectorMeta(item.sector).label) },
    { label: t(workPage.serviceLabel), value: t(serviceMeta(item.service).label) },
    ...(item.markets.length
      ? [
          {
            label: t(workPage.marketsLabel),
            value: item.markets.map((m) => t(marketLabels[m])).join(" · "),
          },
        ]
      : []),
  ];

  return (
    <>
      <section className="pt-[calc(var(--header-h)+3.5rem)] sm:pt-[calc(var(--header-h)+5rem)]">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(workPage.label)}</SectionLabel>
          </Reveal>

          <MaskLines lines={[t(item.name)]} className="display mt-8 max-w-[16ch] sm:mt-12" />

          <Reveal delay={180}>
            <p className="body mt-10 max-w-[56ch] sm:mt-12">{t(detail.desc)}</p>
          </Reveal>

          {/* الفصل من قصّة أطول — الرابط يُقال هنا لا في قسم منفصل */}
          {story && storyServices.length > 1 && (
            <Reveal delay={220}>
              <div className="mt-10 flex flex-col gap-3 border-s-2 border-red ps-5">
                <p className="tag text-ink/40">
                  {t(work.storyOf)} {t(story.name)} — <span className="nums ltr">{storyServices.length}</span>{" "}
                  {t(work.storyServices)}
                </p>
                <TextLink href={`/clients/${story.slug}`}>{t(work.storyRead)}</TextLink>
              </div>
            </Reveal>
          )}

          <Reveal delay={240} className="mt-14 border-t border-[var(--line)] sm:mt-16">
            <dl className="grid grid-cols-1 sm:grid-cols-3">
              {facts.map((row, i) => (
                <div
                  key={row.label}
                  className={`border-b border-[var(--line)] py-6 sm:border-b-0 sm:py-8 ${
                    i > 0 ? "sm:border-s sm:ps-8" : ""
                  }`}
                >
                  <dt className="tag text-ink/40">{row.label}</dt>
                  <dd className="mt-3 text-[16px] font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Wrap>
      </section>

      {/* الصورة الرئيسية — بحجمها الكامل هنا، لا مقصوصة كما في البطاقة */}
      <section className="mt-14 sm:mt-20">
        <Wrap>
          <Reveal>
            {/* نسبة ثابتة كبطاقة العمل: بدونها لا يُعرف ارتفاع الصورة
                قبل تحميلها، فيقفز نصف الصفحة حين تصل */}
            <div className="aspect-[3/2] overflow-hidden bg-paper-2">
              <img
                src={item.image}
                alt={t(item.name)}
                width={1400}
                height={933}
                decoding="async"
                className="size-full object-cover dark:brightness-[0.85]"
              />
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* النتائج */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionLabel>{t(workPage.resultsLabel)}</SectionLabel>
            </Reveal>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="border-t border-[var(--line)]">
                {detail.results.map((r, i) => (
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

              <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <TextLink href="/work">{t(workPage.backLabel)}</TextLink>
                <TextLink href={`/work/${next.slug}`}>
                  {t(workPage.nextLabel)} — {t(next.name)}
                </TextLink>
              </Reveal>
            </div>
          </div>
        </Wrap>
      </section>

      {/* النداء يحمل الخدمة، فيصل النموذج وقد اختارها الزائر ضمنًا */}
      <PageCta
        lines={workPage.detailCtaLines}
        primaryHref={
          serviceMeta(item.service).page
            ? `/contact?service=${serviceMeta(item.service).page}`
            : "/contact"
        }
      />
    </>
  );
}
