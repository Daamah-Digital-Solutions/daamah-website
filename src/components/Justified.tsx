import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * صفوف مضبوطة — كل صفّ بارتفاع واحد ويملأ العرض كاملًا، بلا فراغات.
 *
 * الشبكة ذات الأعمدة كانت تترك مساحات بيضاء: تصميم أقصر من جاره
 * يُبقي تحته فراغًا بطول الفرق. هنا عرض كل عنصر يتناسب مع نسبته
 * (`flex-grow` و`flex-basis` كلاهما بنسبة العرض إلى الارتفاع)، فتتساوى
 * الارتفاعات داخل الصفّ ويمتلئ العرض — والتصميم بنسبته تمامًا، لا قصّ.
 *
 * الصفوف CSS وحده، فما يولّده البناء المسبق هو ما يُرسم أوّلًا. آخر صفّ
 * يُمطّ ليملأ العرض إلا إن كان شبه فارغ — منشورٌ واحد وحده يصير بعرض
 * الصفحة كلّها — وهذا وحده يُقاس بعد التحميل.
 */
export function Justified({
  children,
  className = "",
  fill = false,
  gap = "gap-2 sm:gap-3 lg:gap-4",
  size = "[--row-h:150px] sm:[--row-h:220px] lg:[--row-h:300px]",
}: {
  children: ReactNode;
  className?: string;
  /** يمطّ آخر صفّ ليملأ العرض ما دام ممتلئًا بما يكفي */
  fill?: boolean;
  /** الفاصل بين العناصر — أوسع بين المشاريع منه بين تصاميم المشروع الواحد */
  gap?: string;
  /** الارتفاع المستهدف للصفّ عبر `--row-h` */
  size?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [stretch, setStretch] = useState(fill);

  useEffect(() => {
    const el = ref.current;
    if (!fill || !el || typeof ResizeObserver === "undefined") return;

    const measure = () => {
      const items = [...el.children].filter((c): c is HTMLElement => c instanceof HTMLElement && !!c.dataset.r);
      if (!items.length) return;
      const lastTop = items[items.length - 1].offsetTop;
      const rowH = parseFloat(getComputedStyle(el).getPropertyValue("--row-h")) || 300;
      const natural = items
        .filter((c) => c.offsetTop === lastTop)
        .reduce((sum, c) => sum + Number(c.dataset.r) * rowH, 0);
      /* صفّ يشغل أقلّ من ستّين بالمئة من العرض يُترك بارتفاعه */
      setStretch(natural >= el.clientWidth * 0.6);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fill, children]);

  return (
    /* فاصل رفيع بين العناصر: ملتصقةً تماما تذوب حدود التصاميم في بعضها.
       الارتفاعات تبقى متساوية — الفراغ يُطرح من العرض ثم يوزَّع بالنسبة */
    <div ref={ref} className={`flex flex-wrap ${gap} ${size} ${className}`}>
      {children}
      {/* الحشوة تبتلع ما يتبقّى من آخر صفّ حين لا يُمطّ */}
      {!stretch && <div aria-hidden="true" style={{ flexGrow: 999999, flexBasis: 0 }} />}
    </div>
  );
}

/** عنصر في صفّ مضبوط — يحجز مكانه بنسبته قبل وصول الصورة. */
export function JustifiedItem({
  w,
  h,
  children,
  className = "",
}: {
  w: number;
  h: number;
  children: ReactNode;
  className?: string;
}) {
  const r = w / h;
  return (
    <div
      data-r={r.toFixed(4)}
      className={`relative ${className}`}
      style={{ flexGrow: r, flexBasis: `calc(var(--row-h) * ${r.toFixed(4)})` }}
    >
      <div style={{ paddingBottom: `${((h / w) * 100).toFixed(4)}%` }} />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
