import type { ReactNode } from "react";
import { GridLines, MaskLines, Reveal, SectionLabel, Wrap } from "./ui";

/**
 * رأس الصفحة الداخلية — نفس إيقاع هيرو الرئيسية لكن أهدأ:
 * لافتة، ثم عنوان يصعد من خلف قناع، ثم فقرة واحدة.
 *
 * خطوط المسطرة نفسها التي خلف هيرو الرئيسية: كان الرأس الداخلي
 * مساحة بيضاء بلا أثر من العلامة، فبدت الصفحات الداخلية أفقر من
 * الرئيسية وهي من الموقع نفسه. الخطّ الشعري في الأسفل يفصله عمّا بعده.
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
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+3.5rem)] sm:pt-[calc(var(--header-h)+5rem)]">
      <GridLines />

      {/* رأس الصفحة داخل الشاشة دائمًا — يتحرّك بـ CSS فور الرسم
          بدل انتظار المراقب، فلا يومض بعد وصوله مرسومًا */}
      <Wrap className="relative">
        <Reveal eager className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel>{label}</SectionLabel>
          <span aria-hidden="true" className="tag ltr hidden text-ink/20 sm:block">
            Daamah — Digital Solutions
          </span>
        </Reveal>

        <MaskLines
          lines={title}
          className="display mt-8 max-w-[18ch] sm:mt-12"
          accentDot
          eager
        />

        {intro && (
          <Reveal delay={180} eager>
            <p className="body mt-10 max-w-[56ch] sm:mt-12">{intro}</p>
          </Reveal>
        )}

        {children}

        <div className="rule mt-16 sm:mt-20" />
      </Wrap>
    </section>
  );
}
