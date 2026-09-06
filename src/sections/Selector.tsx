import { useLang } from "../i18n";
import { solutions } from "../content/solutions";
import { Reveal, SectionLabel, SmartLink, Wrap } from "../components/ui";

/**
 * المُرشد — القسم الثاني في الرئيسية، لا الهيرو.
 *
 * ثلاث جمل بصوت صاحب الشركة، كلٌّ منها تفتح حلّها. تأتي بعد الوعد
 * وسطر المصداقية عمدًا: الاختيار الذاتي قبل أي ثقة يتحوّل إلى اختبار
 * كبرياء، فيضغط الجميع الجملة الأكثر إطراءً. بعد الوعد يصير تشخيصًا.
 */
export function Selector() {
  const { t } = useLang();

  return (
    <section id="situations" className="relative scroll-mt-[var(--header-h)] bg-paper-2 py-24 sm:py-32">
      <Wrap>
        <Reveal>
          <SectionLabel index="01">{t(solutions.selector.label)}</SectionLabel>
          <h2 className="h2 mt-8 max-w-[18ch]">{t(solutions.selector.question)}</h2>
          <p className="body mt-4 max-w-[46ch]">{t(solutions.selector.hint)}</p>
        </Reveal>

        <ul className="mt-12 grid gap-3 lg:grid-cols-3">
          {solutions.items.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90} as="li">
              <SmartLink
                href={`/solutions#${s.slug}`}
                className="group flex h-full flex-col justify-between gap-8 border border-[var(--line)] bg-paper p-7 transition-colors duration-(--dur-base) hover:border-ink sm:p-8"
              >
                <span className="text-[19px] leading-relaxed sm:text-[21px]">«{t(s.voice)}»</span>
                <span className="flex items-center justify-between gap-4">
                  <span className="tag text-ink/45">{t(s.name)}</span>
                  <span className="tag ltr nums text-red">{s.no}</span>
                </span>
              </SmartLink>
            </Reveal>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
