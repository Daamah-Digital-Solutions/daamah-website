import { useLang, type Bi } from "../i18n";
import { galleries } from "../content/gallery";
import { Img } from "./Img";
import { Reveal } from "./ui";

/** العروض المولّدة لصور المعرض — تطابق `GALLERY_WIDTHS` في السكربت. */
const WIDTHS = [480, 960];

/**
 * معرض العمل — كل ما سُلّم فيه، لا صورة واحدة.
 *
 * صفحة العمل كانت صورة غلاف وثلاث نقاط، وهي أقرب إلى بطاقة منها
 * إلى حالة دراسية: المشتري المحترف يريد أن يرى المدى — كم شريحة،
 * وكم تطبيقًا، وهل الشغل عميق أم واجهة واحدة.
 *
 * التخطيط أعمدة CSS لا شبكة: المادة تخلط شرائح عرضية ومنشورات
 * مربّعة ولقطات جوّال طولية، والشبكة ذات النسبة الثابتة كانت
 * ستقصّها كلّها إلى مقاس واحد — فتُخفي بالضبط ما جاء المعرض ليُظهره.
 */
export function Gallery({ slug, label, name }: { slug: string; label: Bi; name: Bi }) {
  const { t } = useLang();
  const shots = galleries[slug];
  if (!shots?.length) return null;

  return (
    <section className="pb-20 sm:pb-28">
      <Reveal className="mb-8 flex items-baseline gap-4 sm:mb-10">
        <span className="tag text-ink/40">{t(label)}</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span className="tag ltr nums text-ink/30">{shots.length}</span>
      </Reveal>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {shots.map((s, i) => (
          <figure key={s.src} className="mb-4 break-inside-avoid bg-paper-2">
            <Img
              src={s.src}
              alt={`${t(name)} — ${i + 1}`}
              width={s.w}
              height={s.h}
              widths={WIDTHS}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full dark:brightness-[0.85]"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
