import { useLang } from "../i18n";
import { notFound } from "../content/pages";
import { Btn, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

export function NotFoundPage() {
  const { t } = useLang();

  return (
    <section className="flex min-h-[70svh] items-center pt-[var(--header-h)]">
      <Wrap>
        <Reveal>
          <SectionLabel>{t(notFound.label)}</SectionLabel>
        </Reveal>

        <MaskLines
          lines={t(notFound.title)}
          className="display mt-8 max-w-[14ch]"
          accentDot
        />

        <Reveal delay={180}>
          <p className="body mt-8 max-w-[46ch]">{t(notFound.intro)}</p>
        </Reveal>

        <Reveal delay={260} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Btn href="/">{t(notFound.home)}</Btn>
          <TextLink href="/work">{t(notFound.work)}</TextLink>
        </Reveal>
      </Wrap>
    </section>
  );
}
