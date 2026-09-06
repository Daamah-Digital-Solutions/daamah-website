import { useLang } from "../i18n";
import { faq } from "../content/home";
import { general } from "../content/faq";
import { FaqList } from "../components/FaqList";
import { MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/**
 * ثلاثة أسئلة قبل القرار — لا الستّة كلّها.
 *
 * الرئيسية تفكّك آخر ثلاثة اعتراضات (المدّة، طريقة العمل، ما بعد
 * التسليم). الباقي يعيش في صفحاته: الملفات في الهوية، والدفع في
 * الحلول. القائمة الكاملة في «من نحن».
 */
const HOME = [0, 3, 5];

export function Faq() {
  const { t } = useLang();
  const items = HOME.map((i) => general[i]).filter(Boolean);

  return (
    <section id="faq" className="relative bg-paper-2 py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index="05">{t(faq.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 sm:mt-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <MaskLines lines={t(faq.lede)} as="h2" className="h2" />
            <Reveal className="mt-8">
              <TextLink href="/about#faq">{t({ ar: "كل الأسئلة", en: "All questions" })}</TextLink>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <FaqList items={items} />
          </div>
        </div>
      </Wrap>
    </section>
  );
}
