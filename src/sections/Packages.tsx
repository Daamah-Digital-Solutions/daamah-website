import { useLang } from "../i18n";
import { packages } from "../content/home";
import { Btn, Chevron, MaskLines, Reveal, SectionLabel, Wrap } from "../components/ui";

export function Packages() {
  const { t } = useLang();

  return (
    <section id="packages" className="relative py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index={packages.index}>{t(packages.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:items-end lg:gap-20">
          <MaskLines lines={t(packages.lede)} as="h2" className="h2 lg:col-span-7" />
          <Reveal className="lg:col-span-5">
            <p className="body max-w-[48ch]">{t(packages.body)}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid border-s border-t border-[var(--line)] sm:mt-24 lg:grid-cols-3">
          {packages.items.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 100}
              as="article"
              className={`flex flex-col border-b border-e border-[var(--line)] p-8 sm:p-10 ${
                p.featured ? "bg-paper-2" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="tag ltr nums text-red">{p.no}</span>
                {p.badge && (
                  <span className="tag flex items-center gap-2 text-ink/45">
                    <Chevron count={2} className="h-2.5 w-auto text-red" />
                    {t(p.badge)}
                  </span>
                )}
              </div>

              {/* بلا سعر، الاسم هو مرساة العمود البصرية */}
              <h3 className="mt-8 text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-tight">
                {t(p.name)}
              </h3>
              <p className="body mt-3">{t(p.tagline)}</p>

              <ul className="mt-9 flex-1 space-y-4 border-t border-[var(--line)] pt-8">
                {p.features.map((f) => (
                  <li key={f.en} className="flex items-start gap-3.5">
                    <Chevron className="mt-[7px] h-2.5 w-auto shrink-0 text-red" />
                    <span className="text-[15px] leading-relaxed">{t(f)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Btn
                  href="/contact"
                  variant={p.featured ? "ink" : "outline"}
                  className="w-full justify-center"
                >
                  {t(packages.cta)}
                </Btn>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="body">{t(packages.note)}</p>
        </Reveal>
      </Wrap>
    </section>
  );
}
