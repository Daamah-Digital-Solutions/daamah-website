import { useLang, type Bi } from "../i18n";
import { Btn, MaskLines, Reveal, TextLink, Wrap } from "./ui";

const fallback: Bi<string[]> = {
  ar: ["جاهز نبدأ؟"],
  en: ["Ready to start?"],
};

/**
 * خاتمة الصفحة الداخلية — القسم المقلوب الذي يغلق كل صفحة.
 * وجوده في مكوّن واحد يمنع انحراف النبرة بين الصفحات.
 */
export function PageCta({
  lines,
  primary,
  primaryHref = "/contact",
  secondary,
  secondaryHref,
}: {
  lines?: Bi<string[]>;
  primary?: Bi;
  primaryHref?: string;
  secondary?: Bi;
  secondaryHref?: string;
}) {
  const { t } = useLang();

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
          <Btn href={primaryHref} variant="paper">
            {t(primary ?? { ar: "ابدأ مشروعك", en: "Start a project" })}
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
