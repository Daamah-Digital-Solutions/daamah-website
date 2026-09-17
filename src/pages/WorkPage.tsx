import { useMemo, useState } from "react";
import { useLang, type Bi } from "../i18n";
import { work } from "../content/home";
import { workPage } from "../content/pages";
import {
  facets,
  workItems,
  type SectorKey,
  type ServiceKey,
} from "../content/work";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { Reveal, Wrap } from "../components/ui";
import { Justified } from "../components/Justified";
import { WorkCard } from "../components/WorkCard";

/* ── صفّ مرشِّحات واحد ── */

function Facet<K extends string>({
  label,
  options,
  active,
  onPick,
}: {
  label: string;
  options: { key: K; label: Bi; n: number }[];
  active: K | "all";
  onPick: (k: K | "all") => void;
}) {
  const { t } = useLang();

  const chip = (on: boolean) =>
    `rounded-pill border px-4 py-2 text-[13.5px] font-medium transition-colors duration-(--dur-base) ${
      on
        ? "border-ink bg-ink text-paper"
        : "border-[var(--line)] text-ink/55 hover:border-[var(--line-strong)] hover:text-ink"
    }`;

  return (
    <div className="flex flex-col gap-3">
      <span className="tag text-ink/35">{label}</span>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => onPick("all")} aria-pressed={active === "all"} className={chip(active === "all")}>
          {t(work.all)}
        </button>
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => onPick(o.key)}
            aria-pressed={active === o.key}
            className={chip(active === o.key)}
          >
            {t(o.label)}
            <span className="nums ltr ms-1.5 opacity-45">{o.n}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * فهرس الأعمال — وجهة واحدة بمرشِّحين متقاطعين.
 *
 * القطاع أوّلًا ثم الخدمة: المشتري المحترف يسأل «هل تفهم مجالي؟»
 * قبل «هل تتقن هذه الخدمة؟» — وإثبات القطاع هو ما يُقصي الوكالات
 * في الجولة الأولى.
 *
 * ووحدة العرض هي العمل المنفَّذ لا العميل، فمرشِّح «مواقع» يعيد
 * مواقع فعلًا. أمّا العلاقات الأطول فتظهر كشارة على البطاقة تقود
 * إلى القصّة — لا كقسم ثانٍ يكرّر نفس الأعمال.
 */
export function WorkPage() {
  const { t } = useLang();
  const [sector, setSector] = useState<SectorKey | "all">("all");
  const [service, setService] = useState<ServiceKey | "all">("all");

  const items = useMemo(
    () =>
      workItems.filter(
        (w) =>
          (sector === "all" || w.sector === sector) &&
          (service === "all" || w.service === service),
      ),
    [sector, service],
  );

  /* أعداد المرشِّحات تُحسب ضمن اختيار المحور الآخر: الرقم يَعِد بما
     سيظهر فعلًا، فلا يضغط الزائر مرشِّحًا ليجد لا شيء. */
  const sectorOptions = useMemo(
    () => facets(service === "all" ? workItems : workItems.filter((w) => w.service === service)).sectors,
    [service],
  );
  const serviceOptions = useMemo(
    () => facets(sector === "all" ? workItems : workItems.filter((w) => w.sector === sector)).services,
    [sector],
  );

  const filtered = sector !== "all" || service !== "all";
  const key = `${sector}-${service}`;

  return (
    <>
      <PageHero label={t(workPage.label)} title={t(workPage.title)} intro={t(workPage.intro)}>
        <Reveal delay={260} className="mt-12 flex flex-col gap-8">
          <Facet label={t(work.sectorLabel)} options={sectorOptions} active={sector} onPick={setSector} />
          <Facet label={t(work.serviceLabel)} options={serviceOptions} active={service} onPick={setService} />

          <div className="flex items-center gap-5">
            <p className="tag text-ink/35">
              <span className="nums ltr">{items.length}</span> {t(work.of)}{" "}
              <span className="nums ltr">{workItems.length}</span>
            </p>
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setSector("all");
                  setService("all");
                }}
                className="ulink tag text-ink/45 transition-colors duration-(--dur-fast) hover:text-ink"
              >
                {t(work.clear)}
              </button>
            )}
          </div>
        </Reveal>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Wrap>
          {/* صفوف لا أعمدة: أعمدة CSS تُملأ عمودًا عمودًا، فيظهر آخر
              القائمة أعلى العمود الثالث ويضيع ترتيب الأسواق (العالمي
              أوّلًا ثم السعودية فالإمارات فمصر). الصفّ يُقرأ بالترتيب،
              وكل بطاقة بنسبة تصميمها — لا قصّ — مصفوفةً من أعلاها */}
          <Justified gap="gap-3 sm:gap-4 lg:gap-5" fill>
            {items.map((item, i) => (
              /* المفتاح يحمل الاختيار: تغييره يعيد تركيب البطاقات
                 فتُكشف من جديد بدل أن تظهر دفعةً واحدة */
              <WorkCard key={`${key}-${item.slug}`} item={item} delay={(i % 4) * 60} />
            ))}
          </Justified>

          {items.length === 0 && <p className="body mt-16 text-center">{t(work.empty)}</p>}
        </Wrap>
      </section>

      <PageCta lines={workPage.ctaLines} />
    </>
  );
}
