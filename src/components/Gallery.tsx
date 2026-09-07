import { useCallback, useEffect, useState } from "react";
import { useLang, type Bi } from "../i18n";
import { galleries, type Shot } from "../content/gallery";
import { workPage } from "../content/pages";
import { Img } from "./Img";
import { Reveal } from "./ui";

/** العروض المولّدة لصور المعرض — تطابق `GALLERY_WIDTHS` في السكربت. */
const WIDTHS = [480, 960];

/**
 * عارض ملء الشاشة.
 *
 * شرائح العرض تحمل نصًّا صغيرًا، وعرضها في عمود بعرض 380px يجعلها
 * زخرفةً لا يمكن قراءتها — وهي بالضبط ما جاء المشتري ليقرأه. فبلا
 * تكبير يبقى المعرض عرضًا للكمّ لا للشغل.
 */
function Lightbox({
  shots,
  at,
  onClose,
  onMove,
  name,
}: {
  shots: Shot[];
  at: number;
  onClose: () => void;
  onMove: (i: number) => void;
  name: string;
}) {
  const { lang } = useLang();
  const shot = shots[at];
  const tall = shot.h / shot.w > 2;

  /* الاتجاه منطقي لا فيزيائي: في العربية السهم الأيسر يتقدّم */
  const step = useCallback(
    (d: number) => onMove((at + d + shots.length) % shots.length),
    [at, shots.length, onMove],
  );

  useEffect(() => {
    const rtl = lang === "ar";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);
    /* منع تمرير الصفحة خلف العارض */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [step, onClose, lang]);

  const arrow = (d: number, side: string) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        step(d);
      }}
      aria-label={d > 0 ? "التالي" : "السابق"}
      className={`absolute top-1/2 ${side} z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors duration-(--dur-fast) hover:bg-paper/25`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d={d > 0 ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={name}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="إغلاق"
        autoFocus
        className="absolute end-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors duration-(--dur-fast) hover:bg-paper/25 sm:end-8 sm:top-8"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      {shots.length > 1 && arrow(-1, "start-4 sm:start-8")}
      {shots.length > 1 && arrow(1, "end-4 sm:end-8")}

      {/* الصورة بحجمها الأصلي — هنا وحدها تُقرأ الشريحة.
          والصفحة الطويلة (بعض ملفات الـPDF صفحةٌ واحدة تُمرَّر)
          تُعرض بعرضها كاملًا وتُمرَّر رأسيًا: احتواؤها في الشاشة
          يردّها إلى شريط بعرض 230px لا يُقرأ منه حرف. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={tall ? "max-h-full w-full max-w-4xl overflow-y-auto" : "contents"}
      >
        <img
          key={shot.src}
          src={shot.src}
          alt={name}
          width={shot.w}
          height={shot.h}
          className={tall ? "w-full" : "max-h-full max-w-full object-contain"}
        />
      </div>

      <span className="tag ltr nums absolute bottom-4 start-1/2 -translate-x-1/2 text-paper/60 sm:bottom-8">
        {at + 1} / {shots.length}
      </span>
    </div>
  );
}

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

  /* الأعرض أوّلًا: بعض المجلّدات تبدأ بشرائط مصغّرة قديمة، فكان
     المعرض يفتح بأضعف ما فيه. الترتيب ثابت داخل كل مستوى، فتبقى
     شرائح العرض على تسلسلها. */
  const ordered = [...shots].sort((a, b) => b.w - a.w);

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
