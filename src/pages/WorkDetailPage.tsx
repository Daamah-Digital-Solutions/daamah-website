import { Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { services, work } from "../content/home";
import { workDetails, workPage } from "../content/pages";
import { PageCta } from "../components/PageCta";
import { Chevron, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/** فئة العمل ← الخدمة التي أنتجته */
const CATEGORY_SERVICE: Record<string, string> = {
  brand: "branding",
  web: "web-development",
  social: "social-media",
};

export function WorkDetailPage() {
  const { slug = "" } = useParams();
  const { t, path } = useLang();

  const index = work.items.findIndex((w) => w.slug === slug);
  const item = index >= 0 ? work.items[index] : undefined;
  const detail = workDetails[slug];


  // مسار غير معروف: تحويل إلى قائمة الأعمال بدل صفحة فارغة
  if (!item || !detail) return <Navigate to={path("/work")} replace />;

  const next = work.items[(index + 1) % work.items.length];
  const serviceSlug = CATEGORY_SERVICE[item.cat];
  const service = services.items.find((s) => s.slug === serviceSlug);

  return (
    <>
      <section className="pt-[calc(var(--header-h)+3.5rem)] sm:pt-[calc(var(--header-h)+5rem)]">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(workPage.label)}</SectionLabel>
          </Reveal>

          <MaskLines
            lines={[t(item.name)]}
            className="display mt-8 max-w-[16ch] sm:mt-12"
          />

          <Reveal delay={180}>
            <p className="body mt-10 max-w-[56ch] sm:mt-12">{t(detail.desc)}</p>
          </Reveal>

          {/* بيانات المشروع */}
          <Reveal delay={240} className="mt-14 border-t border-[var(--line)] sm:mt-16">
            {/* حقلان فقط — ما نعرفه فعلًا عن كل مشروع. إضافة «سنة»
                تفترض تاريخًا لا يوجد في الملف التعريفي. */}
            <dl className="grid grid-cols-1 sm:grid-cols-2">
              {[
                { label: t(workPage.sectorLabel), value: t(item.sector) },
                { label: t(workPage.serviceLabel), value: service ? t(service.name) : "—" },
              ].map((row, i) => (
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

      <PageCta
        lines={{
          ar: ["عايز نتيجة", "زي دي؟"],
          en: ["Want a result", "like this?"],
        }}
      />
    </>
  );
}
