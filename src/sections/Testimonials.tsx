import { useLang } from "../i18n";
import { testimonialsFor } from "../content/testimonials";
import type { MarketKey } from "../content/work";
import { Reveal, SectionLabel, Wrap } from "../components/ui";

const label = { ar: "آراء العملاء", en: "What clients say" };

/**
 * آراء العملاء — لا يظهر القسم ما لم توجد آراء حقيقية.
 *
 * الفراغ خير من نصّ مؤقّت: «رأي عميل» مكتوب بيدنا يُقرأ كذلك،
 * ويُفقد الصفحة ثقةً أكثر ممّا يمنحها.
 */
export function Testimonials({
  service,
  market,
  tone = "paper",
}: {
  service?: string;
  market?: MarketKey;
  tone?: "paper" | "paper-2";
}) {
  const { t } = useLang();
  const items = testimonialsFor(service, market);
  if (items.length === 0) return null;

  return (
    <section className={`py-20 sm:py-28 ${tone === "paper-2" ? "bg-paper-2" : ""}`}>
      <Wrap>
        <Reveal>
          <SectionLabel>{t(label)}</SectionLabel>
        </Reveal>

        <ul className="mt-12 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {items.map((x, i) => (
            <Reveal key={x.name + i} delay={(i % 2) * 90} as="li">
              <figure>
                <blockquote className="text-[19px] leading-relaxed sm:text-[21px]">
                  {t(x.quote)}
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[15px] font-medium">{x.name}</span>
                  <span className="tag text-ink/40">
                    {t(x.role)} · {t(x.company)}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
