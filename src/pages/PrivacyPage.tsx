import { useLang } from "../i18n";
import { brand } from "../content/home";
import { privacyPage } from "../content/pages";
import { PageHero } from "../components/PageHero";
import { Reveal, Wrap } from "../components/ui";

export function PrivacyPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        label={t(privacyPage.label)}
        title={t(privacyPage.title)}
        intro={t(privacyPage.intro)}
      />

      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-3">
              <p className="tag text-ink/40">{t(privacyPage.updatedLabel)}</p>
              <p className="mt-3 text-[15px] font-medium">{t(privacyPage.updated)}</p>
            </Reveal>

            <div className="lg:col-span-8">
              <dl className="border-t border-[var(--line)]">
                {privacyPage.sections.map((s, i) => (
                  <Reveal key={s.title.en} delay={i * 70}>
                    <div className="border-b border-[var(--line)] py-9">
                      <dt className="text-[19px] font-medium leading-snug sm:text-[21px]">
                        {t(s.title)}
                      </dt>
                      <dd className="body mt-4 max-w-[62ch]">{t(s.body)}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <Reveal delay={120}>
                <p className="body mt-12 max-w-[62ch]">
                  {t(privacyPage.contactNote)}{" "}
                  <a href={`mailto:${brand.email}`} className="ulink ltr font-medium text-ink">
                    {brand.email}
                  </a>
                </p>
              </Reveal>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
