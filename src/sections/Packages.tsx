import { useLang } from "../i18n";
import { solutions } from "../content/solutions";
import { Chevron, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/**
 * ملخّص الحلول في الرئيسية.
 *
 * يعرض الوضع واسم الحلّ فقط — لا مكوّنات ولا قوائم. التفصيل يعيش في
 * الصفحة، وتكراره هنا يجعل الرئيسية نسخةً منها.
 */
export function Packages() {
  const { t } = useLang();

  return (
    <section id="packages" className="relative py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index="05">{t(solutions.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:items-end lg:gap-20">
          <MaskLines lines={t(solutions.title)} as="h2" className="h2 lg:col-span-7" />
          <Reveal className="lg:col-span-5">
            <p className="body max-w-[46ch]">{t(solutions.intro)}</p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-[var(--line)] sm:mt-20">
          {solutions.items.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80} as="li" className="group">
              <a
                href={`/packages#${s.slug}`}
                className="flex flex-col gap-4 border-b border-[var(--line)] py-8 transition-[padding] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:ps-3 lg:flex-row lg:items-baseline lg:gap-12 lg:py-10"
              >
                <span className="tag ltr nums shrink-0 text-red lg:w-14">{s.no}</span>

                <span className="lg:w-40 lg:shrink-0">
                  <span className="block text-[21px] font-medium leading-tight sm:text-[24px]">
                    {t(s.name)}
                  </span>
                </span>

                {/* صوت صاحب الشركة — هو ما يجعله يتعرّف على نفسه */}
                <span className="body max-w-[48ch] lg:flex-1">«{t(s.voice)}»</span>

                <Chevron className="mt-1 hidden h-3 w-auto shrink-0 text-ink/20 transition-colors duration-(--dur-base) group-hover:text-red lg:block" />
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <TextLink href="/packages">
            {t({ ar: "اقرأ الحلول كاملةً", en: "Read the solutions in full" })}
          </TextLink>
        </Reveal>
      </Wrap>
    </section>
  );
}
