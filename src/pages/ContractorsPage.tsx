import { useLang } from "../i18n";
import { workItems } from "../content/work";
import { contractorsPage as c } from "../content/contractors";
import { waMessage } from "../content/whatsapp";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FaqList } from "../components/FaqList";
import { Justified } from "../components/Justified";
import { WorkCard } from "../components/WorkCard";
import { Chevron, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/**
 * صفحة شركات المقاولات — تبدأ ممّا تطلبه لجنة التأهيل، ثم ما نبنيه.
 *
 * الإثبات مشتقّ من `work.ts` بقطاع المقاولات، فلا تدّعي الصفحة عملًا
 * غير منشور على الموقع.
 */
export function ContractorsPage() {
  const { t, lang } = useLang();
  const proof = workItems.filter((w) => w.sector === "construction").slice(0, 6);

  return (
    <>
      <PageHero label={t(c.label)} title={t(c.h1)} intro={t(c.intro)}>
        <div className="mt-10">
          <Breadcrumbs trail={[{ label: t(c.label) }]} />
        </div>
      </PageHero>

      {/* ما تطلبه ملفات التأهيل — الإجابة قبل العرض */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionLabel>{t(c.prequalLabel)}</SectionLabel>
              <p className="body mt-6 text-[15px]">{t(c.prequalNote)}</p>
            </Reveal>
            <dl className="lg:col-span-8">
              {c.prequal.map((a, i) => (
                <Reveal key={a.title.en} delay={i * 50}>
                  <div className="grid gap-2 border-b border-[var(--line)] py-6 sm:grid-cols-[180px_1fr] sm:gap-8">
                    <dt className="text-[17px] font-medium">{t(a.title)}</dt>
                    <dd className="body text-[15.5px]">{t(a.items)}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </Wrap>
      </section>

      {/* ما نبنيه */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(c.buildsLabel)}</SectionLabel>
          </Reveal>
          <ul className="mt-10 grid gap-x-16 gap-y-12 lg:grid-cols-3">
            {c.builds.map((b, i) => (
              <Reveal key={b.title.en} delay={i * 80} as="li">
                <h2 className="text-[20px] font-medium leading-snug">{t(b.title)}</h2>
                <p className="body mt-3">{t(b.body)}</p>
                <TextLink href={b.href} className="mt-5">
                  {t(b.link)}
                </TextLink>
              </Reveal>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* ما نراه يتكرّر */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(c.painLabel)}</SectionLabel>
          </Reveal>
          <ul className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-3">
            {c.pain.map((p, i) => (
              <Reveal key={p.title.en} delay={i * 80} as="li">
                <h3 className="text-[19px] font-medium leading-snug">{t(p.title)}</h3>
                <p className="body mt-3">{t(p.body)}</p>
              </Reveal>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* كيف نعمل */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionLabel>{t(c.stepsLabel)}</SectionLabel>
            </Reveal>
            <ol className="lg:col-span-8">
              {c.steps.map((s, i) => (
                <Reveal key={s.title.en} delay={i * 70} as="li">
                  <div className="flex items-start gap-4 border-b border-[var(--line)] py-6">
                    <Chevron className="mt-[9px] h-2.5 w-auto shrink-0 text-red" />
                    <div>
                      <h3 className="text-[17px] font-medium">{t(s.title)}</h3>
                      <p className="body mt-1.5 text-[15.5px]">{t(s.body)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Wrap>
      </section>

      {proof.length > 0 && (
        <section className="py-20 sm:py-28">
          <Wrap>
            <Reveal>
              <SectionLabel>{t(c.workLabel)}</SectionLabel>
            </Reveal>
            <Justified gap="gap-3 sm:gap-4 lg:gap-5" fill className="mt-10">
              {proof.map((w, i) => (
                <WorkCard key={w.slug} item={w} delay={i * 80} />
              ))}
            </Justified>
            <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <TextLink href="/clients/trustech">{t({ ar: "قصة العمل مع تراستك للمقاولات", en: "Our work with Trustech Building Contracting" })}</TextLink>
              <TextLink href="/work">{t({ ar: "كل الأعمال", en: "All work" })}</TextLink>
            </Reveal>
          </Wrap>
        </section>
      )}

      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionLabel>{t(c.faqLabel)}</SectionLabel>
            </Reveal>
            <div className="lg:col-span-8">
              <FaqList items={c.faq} />
            </div>
          </div>
          {/* المقالان بالعربية وحدها: رابطهما من النسخة الإنجليزية يقود إلى 404 */}
          {lang === "ar" && (
          <Reveal delay={120} className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="tag text-ink/40">{t(c.readLabel)}</span>
            {c.reads.map((r) => (
              <TextLink key={r.href} href={r.href}>
                {t(r.label)}
              </TextLink>
            ))}
          </Reveal>
          )}
        </Wrap>
      </section>

      <PageCta lines={c.cta} wa={waMessage.service(c.wa)} placement="contractors" />
    </>
  );
}
