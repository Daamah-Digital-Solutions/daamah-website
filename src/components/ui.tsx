import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";

/** مسار داخلي في الموقع — لا مِرساة ولا رابط خارجي. */
function isRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * رابط يختار نفسه: `Link` للمسارات الداخلية كي لا تُعاد الصفحة
 * بالكامل، و`<a>` للمراسي والروابط الخارجية.
 *
 * ويترجم المسار إلى لغة الصفحة الحالية. المكوّنات تكتب المسار
 * المجرّد (`/contact`) دائمًا، والبادئة تُضاف هنا وحدها — وإلا
 * قفز زائر النسخة الإنجليزية إلى العربية عند أول نقرة.
 */
export function SmartLink({
  href,
  external = false,
  children,
  ...rest
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const { path } = useLang();

  if (isRoute(href) && !external) {
    return (
      <Link to={path(href)} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════
   عناصر بناء مشتركة
   ═══════════════════════════════════════════════ */

/** الحاوية — عرض واحد لكل الموقع. */
export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-6 sm:px-10 ${className}`}>
      {children}
    </div>
  );
}

/** يبلّغ متى دخل العنصر الشاشة — مرّة واحدة. */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // بدون IntersectionObserver نُظهر المحتوى فورًا بدل تركه مخفيًا للأبد
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

/**
 * يكشف المحتوى عند دخوله الشاشة.
 *
 * `eager` لما هو داخل الشاشة أصلًا عند التحميل: يتحرّك بـ CSS فور
 * الرسم بدل انتظار IntersectionObserver — وهو الذي لا يبلّغ إلا بعد
 * أن يعمل جافاسكربت. مع التوليد المسبق يصل المحتوى مرسومًا قبل ذلك،
 * فانتظار المراقب يعني ومضة يظهر فيها الهيرو ثم يختفي ليدخل.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  eager?: boolean;
}) {
  const [ref, seen] = useInView<HTMLElement>();
  if (eager) {
    return createElement(
      as,
      { className: `reveal-eager ${className}`, style: { animationDelay: `${delay}ms` } },
      children,
    );
  }
  return createElement(
    as,
    {
      ref,
      className: `reveal ${seen ? "in" : ""} ${className}`,
      style: { transitionDelay: `${delay}ms` },
    },
    children,
  );
}

/**
 * عنوان تصعد سطوره من خلف قناع.
 * `accentDot` يلوّن النقطة الأخيرة بالأحمر — لمسة اللون الوحيدة في العنوان.
 */
export function MaskLines({
  lines,
  as = "h1",
  className = "",
  stagger = 95,
  accentDot = false,
  eager = false,
}: {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  stagger?: number;
  accentDot?: boolean;
  /** لعناوين أعلى الطية — تصعد بـ CSS فور الرسم. */
  eager?: boolean;
}) {
  const [ref, seen] = useInView<HTMLElement>(0.2);

  return createElement(
    as,
    eager
      ? { className: `mask-eager ${className}` }
      : { ref, className: `${seen ? "in" : ""} ${className}` },
    lines.map((line, i) => {
      const last = i === lines.length - 1;
      const dot = accentDot && last && line.endsWith(".");
      const delay = `${i * stagger}ms`;
      return (
        <span key={line} className="mask">
          <span style={eager ? { animationDelay: delay } : { transitionDelay: delay }}>
            {dot ? (
              <>
                {line.slice(0, -1)}
                <span className="text-red">.</span>
              </>
            ) : (
              line
            )}
          </span>
        </span>
      );
    }),
  );
}

/** سهم يشير إلى «الأمام» — ينعكس تلقائيًا في RTL. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 rtl:-scale-x-100 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** سهمان في نافذة واحدة: الأول يخرج والثاني يدخل عند hover على `.group`. */
export function ArrowSwap({ size = 15 }: { size?: number }) {
  const s = { width: size, height: size };
  return (
    <span className="arrow-swap shrink-0" style={s} aria-hidden="true">
      <Arrow className="size-full" />
      <Arrow className="size-full" />
    </span>
  );
}

/** الشيفرون `»` — موتيف العلامة. */
export function Chevron({
  count = 1,
  className = "",
  style,
}: {
  count?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const step = 30;
  const w = 46 + step * (count - 1);
  return (
    <svg viewBox={`0 0 ${w} 100`} className={className} style={style} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <path
          key={i}
          d={`M${i * step} 0 L${i * step + 34} 50 L${i * step} 100 L${i * step + 12} 100 L${i * step + 46} 50 L${i * step + 12} 0 Z`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

/**
 * زرّ كبسولي.
 * المسحة اللونية وردّ الضغط في `.btn` داخل globals.css؛ هنا الشكل
 * الساكن ولون المحتوى فقط. `--btn-fill` هو لون المسحة.
 */
export function Btn({
  href,
  children,
  variant = "ink",
  size = "md",
  external = false,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "ink" | "outline" | "paper";
  size?: "sm" | "md";
  external?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  /* النص أبيض صريح فوق الأحمر: `text-paper` ينقلب إلى داكن في
     الوضع الداكن، فيصير نصًّا أسود على أحمر. */
  const v = {
    ink: "bg-ink text-paper hover:text-white [--btn-fill:var(--color-red)]",
    outline:
      "border border-[var(--line-strong)] text-ink hover:text-paper hover:border-ink [--btn-fill:var(--color-ink)]",
    paper: "bg-paper text-ink hover:text-white [--btn-fill:var(--color-red)]",
  }[variant];

  const s =
    size === "sm" ? "px-5 py-2.5 text-[13.5px]" : "px-7 py-3.5 text-[14.5px]";

  return (
    <SmartLink
      href={href}
      external={external}
      onClick={onClick}
      className={`btn group inline-flex items-center rounded-pill font-medium ${v} ${s} ${className}`}
    >
      <span className="inline-flex items-center gap-2.5">
        {children}
        <ArrowSwap />
      </span>
    </SmartLink>
  );
}

/** رابط نصّي بخطّ يُرسم تحته. */
export function TextLink({
  href,
  children,
  external = false,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <SmartLink
      href={href}
      external={external}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 text-[14.5px] font-medium ${className}`}
    >
      <span className="ulink">{children}</span>
      <ArrowSwap />
    </SmartLink>
  );
}

/** لافتة القسم: رقم فهرس + خطّ + اسم. */
export function SectionLabel({
  index,
  children,
  tone = "ink",
}: {
  /** يُحذف في الصفحات الداخلية: الترقيم يعني ترتيبًا داخل الرئيسية فقط */
  index?: string;
  children: ReactNode;
  tone?: "ink" | "paper";
}) {
  const c = tone === "paper" ? "text-paper/45" : "text-ink/40";
  return (
    <div className={`flex items-center gap-4 ${c}`}>
      {index && <span className="tag ltr nums">({index})</span>}
      <span className="h-px w-10 bg-current opacity-35" />
      <span className="tag">{children}</span>
    </div>
  );
}

/** رقم يعدّ تصاعديًا عند ظهوره. */
export function Counter({
  to,
  suffix = "",
  className = "",
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.5);
  /* يبدأ من القيمة النهائية لا من الصفر: هذا ما يُرسم على الخادم،
     فيقرأ الزاحف «150+» لا «0+». التصفير يحدث في المتصفح وحده،
     لحظةَ بدء العدّ. */
  const [n, setN] = useState(to);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const dur = 1300;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      // easeOutQuint — يتباطأ عند النهاية فيبدو مستقرًا
      setN(Math.round(to * (1 - Math.pow(1 - p, 5))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);

  return (
    <span ref={ref} className={`ltr nums inline-block ${className}`}>
      {n}
      {suffix}
    </span>
  );
}
