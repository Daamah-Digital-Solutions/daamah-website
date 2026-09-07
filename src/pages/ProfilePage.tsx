import { useLang } from "../i18n";
import { profilePage } from "../content/pages";
import { waMessage } from "../content/whatsapp";
import { Gallery } from "../components/Gallery";
import { PageCta } from "../components/PageCta";
import { PageHero } from "../components/PageHero";
import { Reveal, SectionLabel, Wrap } from "../components/ui";

/**
 * ملفّنا نحن.
 *
 * الملف التعريفي خدمةٌ نبيعها، وأقوى إثبات عليها أن نُري ملفّنا:
 * من يبيع ملفات تعريفية ولا يملك واحدًا يقول عن نفسه ما لا يريد.
 * وبورتفوليو السوشيال إلى جانبه لأنه الشيء نفسه — مادة تُتصفَّح
 * لا قائمة تُقرأ.
 */
export function ProfilePage() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        label={t(profilePage.label)}
        title={t(profilePage.title)}
        intro={t(profilePage.intro)}
      />

      <section className="py-16 sm:py-24">
        <Wrap>
          <Reveal>
            <SectionLabel index="01">{t(profilePage.deckLabel)}</SectionLabel>
          </Reveal>
          <div className="mt-10">
            <Gallery slug="daamah-profile" name={profilePage.deckLabel} />
          </div>
        </Wrap>
      </section>

      <section className="bg-paper-2 py-16 sm:py-24">
        <Wrap>
          <Reveal>
            <SectionLabel index="02">{t(profilePage.socialLabel)}</SectionLabel>
            <p className="body mt-6 max-w-[52ch]">{t(profilePage.socialNote)}</p>
          </Reveal>
          <div className="mt-10">
            <Gallery slug="daamah-social" name={profilePage.socialLabel} />
          </div>
        </Wrap>
      </section>

      <PageCta lines={profilePage.ctaLines} wa={waMessage.service(profilePage.deckLabel)} placement="profile" />
    </>
  );
}
