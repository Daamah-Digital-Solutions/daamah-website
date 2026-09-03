import { useEffect, useState } from "react";
import { Chevron } from "./ui";

/**
 * لحظة الدخول — ستارة بلون الصفحة، ثلاثة شيفرونات تدخل تباعًا،
 * ثم ترتفع الستارة كاشفةً الهيرو.
 *
 * تظهر في الزيارة الأولى فقط: بعدها تُسجَّل في المتصفح ولا تتكرّر
 * قبل انقضاء المهلة. المهلة موجودة عمدًا — «مرّة واحدة للأبد» تعني
 * أن عميلًا يعود بعد شهر لن يرى افتتاح العلامة أبدًا.
 */
const KEY = "daamah:intro";
const COOLDOWN_HOURS = 12;

const CHEVRONS = 3;
const STEP = 110; // تباعد دخول الشيفرونات
const HOLD = 260; // سكون قبل رفع الستارة
const LIFT = 600; // مطابق لـ --dur-slow

/** هل نعرض اللحظة أصلًا؟ يُحسم قبل أول رسم لا بعده. */
export function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const last = Number(localStorage.getItem(KEY));
    if (last && Date.now() - last < COOLDOWN_HOURS * 3600_000) return false;
  } catch {
    /* التصفح الخاص — تُعرض اللحظة، وهذا مقبول */
  }
  return true;
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* تجاهل */
    }

    document.body.style.overflow = "hidden";

    const inDone = STEP * (CHEVRONS - 1) + 520; // آخر شيفرون أنهى دخوله
    const lift = window.setTimeout(() => setLeaving(true), inDone + HOLD);
    const done = window.setTimeout(() => {
      document.body.style.overflow = "";
      onDone();
    }, inDone + HOLD + LIFT);

    return () => {
      clearTimeout(lift);
      clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <div className="intro" data-leaving={leaving} aria-hidden="true">
      <div className="flex items-center gap-3 sm:gap-4">
        {Array.from({ length: CHEVRONS }, (_, i) => (
          <Chevron
            key={i}
            className="intro-chev h-10 w-auto text-ink sm:h-14"
            /* الأوسط أحمر — كما في الوردمارك */
            style={{
              animationDelay: `${i * STEP}ms`,
              color: i === 1 ? "var(--color-red)" : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}
