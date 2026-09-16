import { useLang } from "../i18n";
import { track } from "../analytics";
import { waHref, waMessage } from "../content/whatsapp";
import { faqGroups, faqPage } from "../content/faqAbout";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { FaqList } from "../components/FaqList";
import { Btn, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/**
 * الأسئلة الشائعة عن دَعمة.
 *
 * مجموعات بفهرس جانبي ثابت: من يصل يبحث عن سؤال بعينه — السعر، أو
 * الملكية، أو المدّة — فيقفز إلى محوره بدل أن يمرّ على عشرين سؤالًا.
 * كل مجموعة تبدأ مغلقة إلا الأولى، فتُقرأ الصفحة فهرسًا لا جدارًا.
 */
export function FaqPage() {
  const { t } = useLang();
  const total = faqGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <PageHero label={t(faqPage.label)} title={t(faqPage.title)} intro={t(faqPage.intro)} />

      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* الفهرس — يلتصق بأعلى الشاشة على الشاشات الواسعة */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
                <Reveal>
                  <SectionLabel>{t(faqPage.groupsLabel)}</SectionLabel>
                  <nav aria-label={t(faqPage.groupsLabel)} className="mt-8">
                    <ol className="border-t border-[var(--line)]">
                      {faqGroups.map((g, i) => (
                        <li key={g.key}>
                          <a
                            href={`#${g.key}`}
                            className="group flex items-baseline gap-4 border-b border-[var(--line)] py-4 transition-[padding] duration-(--dur-base) ease-[var(--ease-out-quint)] hover:ps-2"
                          >
                            <span className="tag ltr nums w-7 shrink-0 text-red">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 text-[16px] font-medium text-ink/75 transition-colors duration-(--dur-fast) group-hover:text-ink">
                              {t(g.label)}
                            </span>
                            <span className="tag ltr nums text-ink/35">{g.items.length}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                  <p className="tag mt-5 text-ink/40">
                    <span className="ltr nums">{total}</span> {t(faqPage.questions)}
                  </p>
                </Reveal>

                {/* سؤال لم يُكتب — الطريق المختصر إلى المحادثة */}
                <Reveal delay={120} className="mt-12 hidden bg-paper-2 p-7 lg:block">
                  <p className="text-[18px] font-medium leading-snug">{t(faqPage.askTitle)}</p>
                  <p className="body mt-3 text-[15px]">{t(faqPage.askBody)}</p>
                  <div className="mt-6">
                    <Btn
                      href={waHref(t(waMessage.general))}
                      external
                      size="sm"
                      onClick={() => track("whatsapp_click", { placement: "faq_aside" })}
                    >
                      {t(faqPage.askCta)}
                    </Btn>
                  </div>
                </Reveal>
              </div>
            </aside>

            <div className="lg:col-span-8">
              {faqGroups.map((g, i) => (
                <section
                  key={g.key}
                  id={g.key}
                  aria-labelledby={`${g.key}-title`}
                  className="scroll-mt-[calc(var(--header-h)+2rem)] pb-16 last:pb-0 sm:pb-20"
                >
                  <Reveal className="flex items-baseline gap-4 pb-6">
                    <span className="tag ltr nums text-red">{String(i + 1).padStart(2, "0")}</span>
                    <h2 id={`${g.key}-title`} className="text-[24px] font-medium leading-tight sm:text-[30px]">
                      {t(g.label)}
                    </h2>
                  </Reveal>
                  <FaqList items={g.items} initial={i === 0 ? 0 : null} />
                </section>
              ))}

              <Reveal className="mt-16 flex flex-col gap-5 border-t border-[var(--line)] pt-10 sm:flex-row sm:items-center sm:justify-between lg:hidden">
                <div>
                  <p className="text-[18px] font-medium">{t(faqPage.askTitle)}</p>
                  <p className="body mt-2 text-[15px]">{t(faqPage.askBody)}</p>
                </div>
                <TextLink
                  href={waHref(t(waMessage.general))}
                  external
                  onClick={() => track("whatsapp_click", { placement: "faq_inline" })}
                >
                  {t(faqPage.askCta)}
                </TextLink>
              </Reveal>
            </div>
          </div>
        </Wrap>
      </section>

      <PageCta
        lines={faqPage.ctaLines}
        placement="faq_cta"
        secondary={{ ar: "كيف نعمل", en: "How we work" }}
        secondaryHref="/process"
      />
    </>
  );
}
