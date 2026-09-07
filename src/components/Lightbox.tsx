import { useCallback, useEffect } from "react";
import { useLang } from "../i18n";

export type LightboxShot = {
  src: string;
  w: number;
  h: number;
  /** اسمٌ يخصّ هذه الصورة وحدها — حين تجتمع صور أعمال مختلفة */
  label?: string;
};

/**
 * عارض ملء الشاشة.
 *
 * شرائح العرض تحمل نصًّا صغيرًا، وعرضها في عمود بعرض 380px يجعلها
 * زخرفةً لا يمكن قراءتها — وهي بالضبط ما جاء المشتري ليقرأه. فبلا
 * تكبير يبقى المعرض عرضًا للكمّ لا للشغل.
 */
export function Lightbox({
  shots,
  at,
  onClose,
  onMove,
  name,
}: {
  shots: LightboxShot[];
  at: number;
  onClose: () => void;
  onMove: (i: number) => void;
  name: string;
}) {
  const { lang } = useLang();
  const shot = shots[at];
  const tall = shot.h / shot.w > 2;
  const caption = shot.label ?? name;

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
      aria-label={caption}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 pb-16 backdrop-blur-sm sm:p-8 sm:pb-20"
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
          alt={caption}
          width={shot.w}
          height={shot.h}
          className={tall ? "w-full" : "max-h-full max-w-full object-contain"}
        />
      </div>

      <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-1 px-4 sm:bottom-7">
        {shot.label && <span className="text-[15px] text-paper/85">{shot.label}</span>}
        <span className="tag ltr nums text-paper/50">
          {at + 1} / {shots.length}
        </span>
      </div>
    </div>
  );
}
