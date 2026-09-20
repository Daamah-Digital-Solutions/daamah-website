import { useCallback, useEffect, useRef, useState } from "react";
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

  /**
   * السحب بالإصبع — لا الأسهم وحدها.
   *
   * على الجوال لا مؤشّر يمرّ فوق السهم: الحركة الطبيعية سحبٌ يمينًا
   * أو يسارًا، ومن لا يجدها يظنّ العارض صورةً واحدة. والصورة تتبع
   * الإصبع بمقاومة، فيُرى أن ثمّة ما بعدها قبل أن يُفلت.
   *
   * والاتجاه منطقي لا فيزيائي: الصورة التالية في العربية إلى اليسار،
   * فسحب الإصبع يمينًا يقدّم — كما تفعل الأسهم نفسها.
   */
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const rtlDir = lang === "ar";
  const SWIPE = 56;

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || shots.length < 2) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const mx = e.clientX - d.x;
    const my = e.clientY - d.y;
    /* الحركة الرأسية تعني تمرير صفحة طويلة لا تنقّلًا بين الصور */
    if (Math.abs(my) > Math.abs(mx) * 1.2) {
      drag.current = null;
      setDragging(false);
      setDx(0);
      return;
    }
    setDx(mx);
  };

  /** إزاحةٌ تتبع الإصبع بمقاومة، وترتدّ عند الإفلات */
  const follow: React.CSSProperties =
    dragging || dx !== 0
      ? { transform: `translateX(${dx * 0.38}px)`, transition: "none" }
      : { transition: "transform 260ms var(--ease-out-quint)" };

  const endDrag = () => {
    if (!drag.current) return;
    const mx = dx;
    drag.current = null;
    setDragging(false);
    setDx(0);
    if (Math.abs(mx) < SWIPE) return;
    const forward = rtlDir ? mx > 0 : mx < 0;
    step(forward ? 1 : -1);
  };

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
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      /* الإيماءة الأفقية لنا، والرأسية للصفحة الطويلة */
      style={{ touchAction: tall ? "pan-y" : "none" }}
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
      {/* الحاوية `display: contents` في الحالة العادية فلا صندوق لها
          يُزاح — فالإزاحة على الصورة نفسها، وعلى الحاوية وحدها حين
          تكون الصفحة طويلة وتُمرَّر داخلها */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={tall ? follow : undefined}
        className={tall ? "max-h-full w-full max-w-4xl overflow-y-auto" : "contents"}
      >
        <img
          key={shot.src}
          src={shot.src}
          alt={caption}
          width={shot.w}
          height={shot.h}
          style={tall ? undefined : follow}
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
