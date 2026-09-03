import type { ReactNode } from "react";
import { MaskLines, Reveal, SectionLabel, Wrap } from "./ui";

/**
 * رأس الصفحة الداخلية — نفس إيقاع هيرو الرئيسية لكن أهدأ:
 * لافتة، ثم عنوان يصعد من خلف قناع، ثم فقرة واحدة.
 * الخطّ الشعري في الأسفل هو ما يفصله عمّا بعده.
 */
export function PageHero({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: readonly string[];
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-[calc(var(--header-h)+3.5rem)] sm:pt-[calc(var(--header-h)+5rem)]">
      <Wrap>
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
        </Reveal>

        <MaskLines lines={title} className="display mt-8 max-w-[18ch] sm:mt-12" accentDot />

        {intro && (
          <Reveal delay={180}>
            <p className="body mt-10 max-w-[56ch] sm:mt-12">{intro}</p>
          </Reveal>
        )}

        {children}

        <div className="rule mt-16 sm:mt-20" />
      </Wrap>
    </section>
  );
}
