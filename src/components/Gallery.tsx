import { useState } from "react";
import { useLang, type Bi } from "../i18n";
import { galleries, type Shot } from "../content/gallery";
import { workPage } from "../content/pages";
import { Img } from "./Img";
import { Lightbox } from "./Lightbox";
import { Justified, JustifiedItem } from "./Justified";
import { Reveal } from "./ui";

/** العروض المولّدة لصور المعرض — تطابق `GALLERY_WIDTHS` في السكربت. */
const WIDTHS = [480, 960];

/* أسماء الشهور مكتوبة لا مولّدة من `Intl`: العربية هناك تُخرج أرقامًا
   هندية، والموقع يكتب الأرقام لاتينية — والبناء المسبق والمتصفح قد
   يختلفان في بيانات اللغة فيومض النص عند التحميل */
const MONTHS: Bi<string[]> = {
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
const designs: Bi = { ar: "تصميم", en: "designs" };

type Group = { month?: string; shots: Shot[]; start: number };

/** يجمع المتتالي من نفس الشهر — والترتيب على القرص هو ترتيب النشر */
function groupByMonth(shots: Shot[]): Group[] {
  const groups: Group[] = [];
  shots.forEach((s, i) => {
    const last = groups[groups.length - 1];
    if (last && last.month === s.month) last.shots.push(s);
    else groups.push({ month: s.month, shots: [s], start: i });
  });
  return groups;
}

/**
 * معرض العمل — كل ما سُلّم فيه، لا صورة واحدة.
 *
 * التخطيط أعمدة CSS لا شبكة: المادة تخلط شرائح عرضية ومنشورات
 * مربّعة ولقطات جوّال طولية، والشبكة ذات النسبة الثابتة كانت
 * ستقصّها كلّها إلى مقاس واحد — فتُخفي بالضبط ما جاء المعرض ليُظهره.
 *
 * شغل السوشيال مجمّع بالشهر: شهر النشر كاملًا ثم فاصل ثم الذي بعده،
 * فيُقرأ المحتوى كما عاشه الجمهور — خطّة شهر مترابطة لا صورًا متفرّقة.
 * والعارض يمرّ على التصاميم كلّها متّصلة عبر الشهور.
 */
export function Gallery({ slug, name }: { slug: string; name: Bi }) {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  const shots = galleries[slug];
  if (!shots?.length) return null;

  const groups = groupByMonth(shots);
  const monthly = groups.some((g) => g.month);

  const label = (month: string) => {
    const [y, m] = month.split("-");
    return { name: t(MONTHS)[Number(m) - 1], year: y };
  };

  return (
    <section className="pb-4">
      <Reveal className="mb-6 flex items-baseline gap-4 sm:mb-8">
        <span className="tag text-ink/40">{t(workPage.galleryLabel)}</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span className="tag ltr nums text-ink/30">{shots.length}</span>
      </Reveal>

      {groups.map((g, gi) => (
        <div key={g.month ?? gi} className={monthly && gi > 0 ? "mt-14 sm:mt-20" : ""}>
          {g.month && (
            <Reveal className="mb-6 flex items-baseline gap-4 border-t border-[var(--line-strong)] pt-6 sm:mb-8">
              <h3 className="text-[22px] font-medium leading-none sm:text-[26px]">
                {label(g.month).name} <span className="ltr nums">{label(g.month).year}</span>
              </h3>
              <span className="h-px flex-1" />
              <span className="tag text-ink/40">
                <span className="ltr nums">{g.shots.length}</span> {t(designs)}
              </span>
            </Reveal>
          )}

          {/* صفوف مضبوطة: بالترتيب أفقيًا، كل صفّ بارتفاع واحد يملأ
              العرض، والتصاميم ملتصقة بلا فراغات — وكلٌّ بنسبته، لا قصّ */}
          <Justified fill>
            {g.shots.map((s, i) => {
              const at = g.start + i;
              return (
                <JustifiedItem key={s.src} w={s.w} h={s.h} className="overflow-hidden bg-paper-2">
                  <button
                    type="button"
                    onClick={() => setOpen(at)}
                    aria-label={`${t(name)} — ${at + 1}`}
                    className="group block size-full"
                  >
                    <Img
                      src={s.src}
                      alt={`${t(name)} — ${at + 1}`}
                      width={s.w}
                      height={s.h}
                      widths={WIDTHS}
                      /* لم يعد فوق المعرض غلاف، فأولى صوره هي ما يقيسه LCP */
                      priority={at === 0}
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="size-full transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.03] dark:brightness-[0.86] dark:group-hover:brightness-100"
                    />
                  </button>
                </JustifiedItem>
              );
            })}
          </Justified>
        </div>
      ))}

      {open !== null && (
        <Lightbox
          shots={shots}
          at={open}
          name={t(name)}
          onMove={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
