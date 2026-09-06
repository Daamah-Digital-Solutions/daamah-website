import { useLang, type Bi } from "../i18n";
import { track } from "../analytics";
import { waHref, waMessage } from "../content/whatsapp";
import { Btn, MaskLines, Reveal, TextLink, Wrap } from "./ui";

const fallback: Bi<string[]> = {
  ar: ["جاهز نبدأ؟"],
  en: ["Ready to start?"],
};

/**
 * خاتمة الصفحة الداخلية — القسم المقلوب الذي يغلق كل صفحة.
 *
 * النداء الأول يفتح واتساب برسالة تحمل مصدرها: كان يذهب إلى صفحة
 * التواصل، فتصل المحادثة بلا سياق ويسقط جزء من الزوّار في الخطوة
 * الزائدة. والنداء الثاني يبقى على صفحة التواصل لمن يفضّل النموذج.
 */
export function PageCta({
  lines,
  primary,
  /** رسالة الواتساب — تُترك فارغةً فتكون نيّةً عامة */
  wa,
  /** اسم الموضع في القياس، ليُعرف أيّ صفحة تُنتج المحادثات */
  placement = "page_cta",
  secondary,
  secondaryHref,
}: {
  lines?: Bi<string[]>;
  primary?: Bi;
  wa?: Bi;
  placement?: string;
  secondary?: Bi;
  secondaryHref?: string;
}) {
  const { t } = useLang();
  const href = waHref(t(wa ?? waMessage.general));

  return (
    <section className="bg-ink py-24 text-paper sm:py-32">
      <Wrap>
        <MaskLines
          lines={t(lines ?? fallback)}
          as="h2"
          className="h2 max-w-[20ch]"
          accentDot
        />
        <Reveal delay={180} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Btn
            href={href}
            external
            variant="paper"
            onClick={() => track("whatsapp_click", { placement })}
          >
            {t(primary ?? { ar: "تحدّث معنا على واتساب", en: "Message us on WhatsApp" })}
          </Btn>
          {secondary && secondaryHref && (
            <TextLink href={secondaryHref} className="text-paper/70 hover:text-paper">
              {t(secondary)}
            </TextLink>
          )}
        </Reveal>
      </Wrap>
    </section>
  );
}
