import { useLang } from "../i18n";
import { services } from "../content/home";
import { Arrow, MaskLines, Reveal, SectionLabel, Wrap } from "../components/ui";

export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="relative bg-paper-2 py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index={services.index}>{t(services.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:items-end lg:gap-20">
          <MaskLines lines={t(services.lede)} as="h2" className="h2 lg:col-span-7" />
          <Reveal className="lg:col-span-5">
            <p className="body max-w-[46ch]">{t(services.body)}</p>
          </Reveal>
        </div>

        {/* الحاوية ترسم حدّ الأعلى والبداية، وكل خانة ترسم حدّ الأسفل
            والنهاية. بهذا تكتمل الشبكة دون خطوط مزدوجة ولا ناقصة —
            مهما تغيّر عدد الأعمدة بين المقاسات. */}
        <div className="mt-16 grid border-s border-t border-[var(--line)] sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((s, i) => (
            <Reveal
              key={s.no}
              delay={(i % 3) * 90}
              as="article"
              className="group border-b border-e border-[var(--line)]"
            >
              <div className="h-full p-8 transition-colors duration-(--dur-base) group-hover:bg-paper sm:p-10">
                <span className="tag ltr nums text-red">{s.no}</span>

                <h3 className="mt-7 text-[22px] font-medium leading-snug sm:text-[25px]">
                  {t(s.name)}
                </h3>

                {/* الاسم اللاتيني يبقى ظاهرًا في النسخة العربية —
                    هكذا تُعرَف هذه الخدمات في السوق */}
                <p className="tag ltr mt-2 text-ink/35">{s.en}</p>

                <p className="body mt-5 max-w-[38ch]">{t(s.desc)}</p>

                <Arrow className="mt-8 size-5 text-ink/25 transition-[color,transform] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1 group-hover:text-red rtl:group-hover:-translate-x-1" />
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
