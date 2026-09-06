import { useLang } from "../i18n";
import { areas } from "../content/areas";
import { Chevron, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/**
 * الحجّة — «الأجزاء تتضاعف ولا تُجمع».
 *
 * هي الردّ على اعتراض «ألستم مجرّد تجميع خدمات؟»، ومكان الردّ بعد
 * الوعد والمُرشد لا قبلهما. وهي ما يستحقّ الشريط الداكن الوحيد في
 * الرئيسية — كان مصروفًا على «كيف نعمل».
 *
 * الخدمات لا تُسرد هنا: الشرح يعيش في صفحتها. القسم يقول ثلاثة
 * وعود وسبب اجتماعها فقط.
 */
export function Argument() {
  const { t } = useLang();

  return (
    <section className="relative bg-ink py-28 text-paper sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index="02" tone="paper">
            {t(areas.label)}
          </SectionLabel>
        </Reveal>

        <MaskLines lines={t(areas.title)} as="h2" className="h2 mt-10 max-w-[22ch] sm:mt-14" />

        <ol className="mt-16 grid gap-px border-t border-paper/12 sm:mt-24 lg:grid-cols-3 lg:border-t-0">
          {areas.items.map((a, i) => (
            <Reveal
              key={a.key}
              delay={i * 100}
              as="li"
              className="border-b border-paper/12 py-9 lg:border-b-0 lg:border-t lg:pe-10"
            >
              <span className="tag ltr nums text-red">{a.no}</span>
              <p className="mt-6 text-[22px] font-medium leading-snug sm:text-[24px]">{t(a.promise)}</p>
              <p className="body mt-3 max-w-[40ch] !text-paper/50">{t(a.desc)}</p>
            </Reveal>
          ))}
        </ol>

        {/* الادّعاء السببي — بعد الثلاثة لا قبلها */}
        <Reveal className="mt-14 flex flex-wrap items-baseline gap-x-4 gap-y-3">
          <Chevron count={2} className="mt-1 h-3 w-auto shrink-0 text-red" />
          <p className="max-w-[64ch] flex-1 text-[17px] leading-relaxed text-paper/85">{t(areas.proof)}</p>
        </Reveal>

        <Reveal className="mt-10">
          <TextLink href="/services" className="text-paper/70 hover:text-paper">
            {t({ ar: "الخدمات تحت كل جزء", en: "The services under each part" })}
          </TextLink>
        </Reveal>
      </Wrap>
    </section>
  );
}
