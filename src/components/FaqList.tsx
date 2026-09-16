import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n";
import type { FaqItem } from "../content/faq";

function Item({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const el = inner.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const measure = () => setH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="border-t border-[var(--line)] last:border-b">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-6 py-7 text-start"
        >
          <span
            className={`text-[18px] font-medium leading-snug transition-colors duration-(--dur-base) sm:text-[20px] ${
              open ? "text-ink" : "text-ink/75 group-hover:text-ink"
            }`}
          >
            {q}
          </span>

          {/* علامة زائد تصير ناقصًا: الخطّ الرأسي وحده هو ما يدور */}
          <span className="relative grid size-8 shrink-0 place-items-center">
            <span className="absolute h-px w-3.5 bg-current" />
            <span
              className={`absolute h-3.5 w-px bg-current transition-transform duration-(--dur-base) ease-[var(--ease-out-quint)] ${
                open ? "rotate-90" : ""
              }`}
            />
          </span>
        </button>
      </h3>

      {/* الارتفاع يُقاس ويُحرَّك بالبكسل.
          حاولنا أولًا الانتقال بين grid-template-rows: 0fr و 1fr — وهي
          الحيلة الشائعة لتحريك ارتفاع مجهول بلا JS — لكن المتصفح لا
          يُنهي استيفاء وحدة fr في حاوية بارتفاع غير محدّد، فتبقى
          القيمة المحسوبة 0px إلى الأبد والإجابة لا تظهر.
          ResizeObserver يُبقي القياس صحيحًا عند تغيّر اللغة أو المقاس. */}
      <div
        className="overflow-hidden transition-[height] duration-(--dur-slow) ease-[var(--ease-out-quint)]"
        style={{ height: open ? h || "auto" : 0 }}
      >
        <div ref={inner}>
          <p className="body max-w-[62ch] pb-8 pe-12">{a}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * قائمة الأسئلة — تُستعمل في الرئيسية وصفحات الخدمات والمدن.
 *
 * النصّ يأتي من `content/faq.ts`، وهو المصدر نفسه الذي يقرأه مولّد
 * `FAQPage` — فما يراه الزائر هو ما يراه جوجل حرفيًا.
 */
export function FaqList({
  items,
  initial = 0,
}: {
  items: FaqItem[];
  /** السؤال المفتوح عند التحميل — `null` تُبقي القائمة كلّها مغلقة */
  initial?: number | null;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(initial);

  return (
    <div>
      {items.map((item, i) => (
        <Item
          key={item.q.en}
          q={t(item.q)}
          a={t(item.a)}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  );
}
