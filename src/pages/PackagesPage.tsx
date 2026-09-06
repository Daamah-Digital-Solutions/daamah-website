import { useState } from "react";
import { useLang } from "../i18n";
import { solutions, type SolutionSlug } from "../content/solutions";
import { services } from "../content/home";
import { track } from "../analytics";
import { waHref, waMessage } from "../content/whatsapp";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Btn, Chevron, MaskLines, Reveal, SectionLabel, Wrap } from "../components/ui";

/**
 * صفحة الحلول.
 *
 * ليست جدول أسعار: لا أرقام، ولا قائمة تحقّق تُقارَن أفقيًا. الترتيب
 * يقود القارئ من وضعه إلى الحلّ إلى الخطوة التالية — وضعٌ يعرفه عن
 * نفسه، ثم ما يتغيّر، ثم ما نبنيه، ثم النتيجة.
 */

/** الوضع المختار يقود إلى حلّه — تمييز لا ترشيح: البقيّة تبقى مقروءة. */
function Selector({
  active,
  onPick,
}: {
  active: SolutionSlug | null;
  onPick: (s: SolutionSlug) => void;
}) {
  const { t } = useLang();

  return (
    <Reveal delay={260} className="mt-14 sm:mt-16">
      <SectionLabel>{t(solutions.selector.label)}</SectionLabel>
      <h2 className="mt-6 max-w-[22ch] text-[22px] font-medium leading-snug sm:text-[26px]">
        {t(solutions.selector.question)}
      </h2>
      <p className="body mt-3 max-w-[46ch]">{t(solutions.selector.hint)}</p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {solutions.items.map((s) => {
          const on = active === s.slug;
          return (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                onClick={() => onPick(s.slug)}
                className={`group flex h-full items-start gap-4 border p-5 text-start transition-colors duration-(--dur-base) sm:p-6 ${
                  on
                    ? "border-ink bg-paper-2"
                    : "border-[var(--line)] hover:border-[var(--line-strong)]"
                }`}
              >
                <span className="tag ltr nums mt-1 shrink-0 text-red">{s.no}</span>
                <span className="flex-1">
                  <span className="block text-[16px] leading-relaxed">«{t(s.voice)}»</span>
                  <span className="tag mt-3 block text-ink/45">{t(s.name)}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}

/** حلّ واحد — يُقرأ رأسيًا لا يُقارَن أفقيًا. */
function SolutionBlock({
  s,
  highlighted,
}: {
  s: (typeof solutions.items)[number];
  highlighted: boolean;
}) {
  const { t } = useLang();

  const rows = [
    { label: t(solutions.situationLabel), value: t(s.situation) },
    { label: t(solutions.shiftLabel), value: t(s.shift) },
  ];

  return (
    <section
      id={s.slug}
      className="scroll-mt-[calc(var(--header-h)+2rem)] border-t border-[var(--line)] py-16 sm:py-24"
    >
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
          <span className="tag ltr nums text-red">{s.no}</span>
          <h2 className="h2">{t(s.name)}</h2>
          {highlighted && (
            <span className="tag flex items-center gap-2 text-ink/45">
              <Chevron count={2} className="h-2.5 w-auto text-red" />
              {t({ ar: "الأقرب لوضعكم", en: "Closest to you" })}
            </span>
          )}
        </div>
        <p className="body mt-5 max-w-[52ch]">
          <span className="tag me-3 text-ink/40">{t(solutions.fitsLabel)}</span>
          {t(s.fits)}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* الوضع ثم التحوّل — يُقرآن قبل أي ذكر لخدمة */}
        <div className="lg:col-span-6">
          {rows.map((r, i) => (
            <Reveal
              key={r.label}
              delay={i * 90}
              className="border-t border-[var(--line)] py-7 first:border-t-0 first:pt-0"
            >
              <p className="tag text-ink/40">{r.label}</p>
              <p className="body mt-3 max-w-[52ch]">{r.value}</p>
            </Reveal>
          ))}
        </div>

        {/* ما نبنيه — بعد أن عُرف الوضع، لا قبله */}
        <Reveal delay={140} className="lg:col-span-5 lg:col-start-8">
          <p className="tag text-ink/40">{t(solutions.buildsLabel)}</p>
          <ul className="mt-6">
            {s.builds.map((b) => (
              <li
                key={b.en}
                className="flex items-start gap-3.5 border-b border-[var(--line)] py-4 first:border-t first:border-[var(--line)]"
              >
                <Chevron className="mt-[7px] h-2.5 w-auto shrink-0 text-red" />
                <span className="text-[15px] leading-relaxed">{t(b)}</span>
              </li>
            ))}
          </ul>

          {/* الخدمات المستعملة — روابط لا شروح: الشرح يعيش في صفحتها */}
          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <p className="tag text-ink/40">{t(solutions.toolsLabel)}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.services.map((slug) => {
                const svc = services.items.find((x) => x.slug === slug);
                if (!svc) return null;
                return (
                  <li key={slug}>
                    <a
                      href={`/services/${slug}`}
                      className="inline-block rounded-pill border border-[var(--line)] px-3.5 py-1.5 text-[13px] transition-colors duration-(--dur-fast) hover:border-ink"
                    >
                      {t(svc.name)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8 bg-paper-2 p-6">
            <p className="tag text-ink/40">{t(solutions.outcomeLabel)}</p>
            <p className="mt-3 text-[17px] font-medium leading-relaxed">{t(s.outcome)}</p>
          </div>

          <div className="mt-8">
            <Btn
              href={waHref(t(waMessage.solution(s.name, s.voice)))}
              external
              onClick={() => track("whatsapp_click", { placement: `solution_${s.slug}` })}
            >
              {t(solutions.cta)}
            </Btn>
          </div>
        </Reveal>
      </div>

      {s.engine && <Engine parts={s.engine} />}
    </section>
  );
}

/**
 * منظومة الطلب — أربعة أسئلة لا أربع خدمات.
 *
 * السؤال أولًا، ثم سببه، ثم الخدمة التي تجيبه. هكذا يفهم صاحب الشركة
 * لماذا السيو والإعلانات معًا بدل أن يقرأهما بندين في قائمة.
 */
function Engine({ parts }: { parts: NonNullable<(typeof solutions.items)[number]["engine"]> }) {
  const { t } = useLang();

  return (
    <div className="mt-16 border-t border-[var(--line)] pt-12">
      <Reveal>
        <SectionLabel>{t(solutions.engineLabel)}</SectionLabel>
        <p className="body mt-5 max-w-[52ch]">{t(solutions.engineNote)}</p>
      </Reveal>

      <ol className="mt-10 grid border-s border-t border-[var(--line)] lg:grid-cols-2">
        {parts.map((part, i) => (
          <Reveal
            key={part.question.en}
            delay={(i % 2) * 90}
            as="li"
            className="border-b border-e border-[var(--line)] p-7 sm:p-8"
          >
            <span className="tag ltr nums text-red">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-5 max-w-[26ch] text-[19px] font-medium leading-snug sm:text-[21px]">
              {t(part.question)}
            </h3>
            <p className="body mt-4 max-w-[46ch]">{t(part.answer)}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {part.services.map((slug) => {
                const svc = services.items.find((x) => x.slug === slug);
                if (!svc) return null;
                return (
                  <li key={slug}>
                    <a
                      href={`/services/${slug}`}
                      className="inline-block rounded-pill border border-[var(--line)] px-3 py-1 text-[12.5px] text-ink/70 transition-colors duration-(--dur-fast) hover:border-ink hover:text-ink"
                    >
                      {t(svc.name)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </ol>

      {/* الطور المستمرّ — يقال صراحةً لأنه يميّز هذا الحلّ وحده */}
      <Reveal className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 bg-paper-2 p-6">
        <span className="tag flex items-center gap-2 text-red">
          <Chevron count={2} className="h-2.5 w-auto" />
          {t(solutions.ongoingLabel)}
        </span>
        <p className="body max-w-[62ch] flex-1">{t(solutions.ongoingNote)}</p>
      </Reveal>
    </div>
  );
}

export function PackagesPage() {
  const { t } = useLang();
  const [picked, setPicked] = useState<SolutionSlug | null>(null);

  return (
    <>
      <PageHero
        label={t(solutions.label)}
        title={t(solutions.title)}
        intro={t(solutions.intro)}
      >
        <Selector active={picked} onPick={setPicked} />
      </PageHero>

      <Wrap>
        {solutions.items.map((s) => (
          <SolutionBlock key={s.slug} s={s} highlighted={picked === s.slug} />
        ))}
      </Wrap>

      {/* جدول التوجيه — يساعد على الاختيار، ولا يقارن بعلامات صحّ */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(solutions.guide.label)}</SectionLabel>
          </Reveal>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-start">
              <thead>
                <tr className="border-b border-[var(--line-strong)]">
                  {[solutions.guide.colSolution, solutions.guide.colWhen, solutions.guide.colOutcome].map(
                    (c) => (
                      <th key={c.en} className="tag py-4 text-start font-bold text-ink/40">
                        {t(c)}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {solutions.items.map((s) => (
                  <tr key={s.slug} className="border-b border-[var(--line)]">
                    <td className="py-5 pe-6 align-top">
                      <a
                        href={`#${s.slug}`}
                        className="text-[16px] font-medium transition-colors duration-(--dur-fast) hover:text-red"
                      >
                        {t(s.name)}
                      </a>
                    </td>
                    <td className="body py-5 pe-6 align-top">{t(s.when)}</td>
                    <td className="body py-5 align-top">{t(s.outcome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal className="mt-8">
            <p className="body max-w-[62ch]">{t(solutions.guide.note)}</p>
          </Reveal>
        </Wrap>
      </section>

      {/* ما يشترك فيه كل حلّ — يحلّ محلّ السعر في بناء الثقة */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(solutions.shared.label)}</SectionLabel>
          </Reveal>
          <MaskLines
            lines={t(solutions.shared.title)}
            as="h2"
            className="h2 mt-8 max-w-[22ch]"
          />
          <ul className="mt-12 grid border-s border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {solutions.shared.items.map((item, i) => (
              <Reveal
                key={item.en}
                delay={(i % 3) * 90}
                as="li"
                className="border-b border-e border-[var(--line)] p-7 sm:p-8"
              >
                <span className="tag ltr nums text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-[15.5px] leading-relaxed">{t(item)}</p>
              </Reveal>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* أسئلة تمنع القرار */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(solutions.faq.label)}</SectionLabel>
          </Reveal>
          <dl className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-2">
            {solutions.faq.items.map((item, i) => (
              <Reveal key={item.q.en} delay={(i % 2) * 90}>
                <dt className="text-[17px] font-medium leading-snug">{t(item.q)}</dt>
                <dd className="body mt-3 max-w-[54ch]">{t(item.a)}</dd>
              </Reveal>
            ))}
          </dl>
        </Wrap>
      </section>

      <PageCta
        lines={solutions.closing.lines}
        primary={solutions.closing.primary}
        wa={waMessage.unsure}
        placement="solutions_closing"
        secondary={solutions.closing.secondary}
        secondaryHref="/contact"
      />
    </>
  );
}
