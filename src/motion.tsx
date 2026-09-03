import { createContext, useContext, type ReactNode } from "react";

/**
 * بوّابة الحركة.
 *
 * الكشف عند الدخول يعتمد على IntersectionObserver، وهو يُطلق فورًا
 * عند التحميل لأن الهيرو داخل الشاشة أصلًا. بدون هذه البوّابة كانت
 * حركة الهيرو تُشغَّل خلف ستارة الدخول وتنتهي قبل أن ترتفع، فيظهر
 * المحتوى ساكنًا. البوّابة تؤجّل الكشف إلى ما بعد الستارة.
 */
const StartedCtx = createContext(true);

export function MotionGate({
  started,
  children,
}: {
  started: boolean;
  children: ReactNode;
}) {
  return <StartedCtx.Provider value={started}>{children}</StartedCtx.Provider>;
}

export function useMotionStarted() {
  return useContext(StartedCtx);
}
