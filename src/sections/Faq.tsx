import { useLang } from "../i18n";
import { faq } from "../content/home";
import { general } from "../content/faq";
import { FaqList } from "../components/FaqList";
import { MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

export function Faq() {
  const { t } = useLang();

  return (
    <section id="faq" className="relative bg-paper-2 py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index={faq.index}>{t(faq.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 sm:mt-14 lg:grid-cols-12 lg:gap-20">
          <MaskLines lines={t(faq.lede)} as="h2" className="h2 lg:col-span-4" />

          <div className="lg:col-span-8">
            <FaqList items={general} />
            <Reveal className="mt-10">
              <TextLink href="/faq">{t({ ar: "كل الأسئلة عن دَعمة", en: "All questions about Daamah" })}</TextLink>
            </Reveal>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
