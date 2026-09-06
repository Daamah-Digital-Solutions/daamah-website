import { useLang } from "../i18n";
import { about } from "../content/home";
import { Counter, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index={about.index}>{t(about.label)}</SectionLabel>
        </Reveal>

        {/* ── البيان ── */}
        <MaskLines
          lines={t(about.lede)}
          as="h2"
          className="lede mt-10 max-w-[22ch] sm:mt-14"
        />

        {/* ── الشرح والركائز ── */}
        <div className="mt-16 grid gap-14 sm:mt-24 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="body">{t(about.body)}</p>
            <div className="mt-8">
              <TextLink href="/about">{t(about.link)}</TextLink>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            {about.pillars.map((p, i) => (
              <Reveal
                key={p.no}
                delay={i * 110}
                className="group border-t border-[var(--line)] py-7 last:border-b"
              >
                {/* السطر ينزاح قليلًا نحو جهة القراءة عند المرور —
                    يجعل القائمة تبدو قابلة للّمس لا مطبوعة */}
                <div className="flex gap-6 transition-transform duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1.5 sm:gap-10 rtl:group-hover:-translate-x-1.5">
                  <span className="tag ltr nums mt-1.5 shrink-0 text-red">{p.no}</span>
                  <div>
                    <h3 className="text-[19px] font-medium leading-snug sm:text-[21px]">
                      {t(p.title)}
                    </h3>
                    <p className="body mt-2.5 max-w-[46ch]">{t(p.desc)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── الأرقام ── */}
        <Reveal className="mt-20 border-t border-[var(--line)] sm:mt-28">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {about.stats.map((s) => (
              /* الفاصل خطّ على جهة بداية كل خانة عدا الأولى —
                 ينعكس مع الاتجاه تلقائيًا */
              <div
                key={s.label.en}
                className="border-b border-[var(--line)] py-8 even:ps-6 sm:py-10 lg:border-b-0 lg:border-s lg:ps-8 lg:even:ps-8 lg:first:border-s-0 lg:first:ps-0"
              >
                <dt className="flex items-baseline gap-0.5 text-[clamp(2.6rem,5vw,4.25rem)] font-light leading-none tracking-tight">
                  <Counter to={s.value} />
                  <span className="text-red">{s.suffix}</span>
                </dt>
                <dd className="tag mt-4 text-ink/45">{t(s.label)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Wrap>
    </section>
  );
}
