import { useState } from "react";
import { useLang, type Bi } from "../i18n";
import { galleries } from "../content/gallery";
import { workPage } from "../content/pages";
import { Img } from "./Img";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./ui";

/** العروض المولّدة لصور المعرض — تطابق `GALLERY_WIDTHS` في السكربت. */
const WIDTHS = [480, 960];

/**
 * معرض العمل — كل ما سُلّم فيه، لا صورة واحدة.
 *
 * صفحة العمل كانت غلافًا وثلاث نقاط، وهي أقرب إلى بطاقة منها إلى
 * حالة دراسية: المشتري المحترف يريد أن يرى المدى — كم شريحة، وكم
 * تطبيقًا، وهل الشغل عميق أم واجهة واحدة.
 *
 * التخطيط أعمدة CSS لا شبكة: المادة تخلط شرائح عرضية ومنشورات
 * مربّعة ولقطات جوّال طولية، والشبكة ذات النسبة الثابتة كانت
 * ستقصّها كلّها إلى مقاس واحد — فتُخفي بالضبط ما جاء المعرض ليُظهره.
 */
export function Gallery({ slug, name }: { slug: string; name: Bi }) {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  const shots = galleries[slug];
  if (!shots?.length) return null;

  /* الترتيب كما هو على القرص، وهو ما يقرّره الاستيراد: صفحات
     البريزنتيشن بتسلسلها، ومنشورات الشهر مجموعةً والأحدث أوّلًا.
     كان يُرتَّب بالعرض ليُؤخَّر ما هو منخفض الدقّة، وقد زال سببه
     مع تنقية المجلّدات — وبقاؤه يبعثر حملة الشهر الواحد. */
  const ordered = shots;

  return (
    <section className="pb-4">
      <Reveal className="mb-6 flex items-baseline gap-4 sm:mb-8">
        <span className="tag text-ink/40">{t(workPage.galleryLabel)}</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span className="tag ltr nums text-ink/30">{ordered.length}</span>
      </Reveal>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {ordered.map((s, i) => {
          return (
            <button
              key={s.src}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-paper-2 text-start"
            >
              <Img
                src={s.src}
                alt={`${t(name)} — ${i + 1}`}
                width={s.w}
                height={s.h}
                widths={WIDTHS}
                /* لم يعد فوق المعرض غلاف، فأولى صوره هي ما يقيسه LCP */
                priority={i === 0}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="w-full transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.03] dark:brightness-[0.86] dark:group-hover:brightness-100"
              />
            </button>
          );
        })}
      </div>

      {open !== null && (
        <Lightbox
          shots={ordered}
          at={open}
          name={t(name)}
          onMove={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
