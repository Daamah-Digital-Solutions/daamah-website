import { FP_TOTAL, fp } from "../content/foundingPartners";
import { Chevron } from "./ui";

export type Seats = { total: number; remaining: number };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * بطاقة «شريك تأسيس» — رمز البرنامج: عضوية لعدد محدود، لا عرض سعر.
 *
 * داكنة في الوضعين: هي قطعة، لا سطح من الصفحة يتبع السمة. ونصوصها
 * بوحدات الحاوية (`cqw`) فتتناسب مع عرضها أينما وُضعت — في الهيرو
 * كبيرة، وفي شاشة القبول باسم الشركة.
 */
export function FoundingCard({
  company,
  seats,
  className = "",
}: {
  company?: string;
  seats?: Seats | null;
  className?: string;
}) {
  const total = seats?.total ?? FP_TOTAL;
  const next = seats ? Math.min(total, total - seats.remaining + 1) : null;
  return (
    <div className={`@container ${className}`}>
      <div className="fp-card relative aspect-[1.586] w-full overflow-hidden rounded-[6cqw] border border-white/[0.12] bg-[#111114] text-[#fbfaf8] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.85)]">
        {/* توهّج العلامة من الزاوية */}
        <div className="pointer-events-none absolute -end-[30%] -top-[55%] aspect-square w-[95%] rounded-full bg-[radial-gradient(circle,rgba(231,0,0,0.42),transparent_62%)]" />
        {/* خطوط دقيقة — ملمس البطاقة */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.045)_0_1px,transparent_1px_12px)]" />
        <div className="fp-sheen pointer-events-none absolute inset-0" />

        <div className="relative flex h-full flex-col justify-between p-[7cqw]">
          <div className="flex items-start justify-between">
            <img src="/assets/logo-wordmark-light.png" alt="" aria-hidden="true" width={2035} height={544} className="h-[5.2cqw] w-auto" />
            <Chevron count={2} className="h-[5.6cqw] text-red" />
          </div>

          <div>
            <p className="ltr text-start text-[2.7cqw] font-semibold tracking-[0.28em] text-white/50">{fp.card.label}</p>
            <p className="mt-[1.4cqw] text-[7.4cqw] font-semibold leading-[1.15]">{fp.card.title}</p>
            <p className={`mt-[1cqw] truncate text-[4.2cqw] font-semibold ${company ? "text-white/90" : "text-white/35"}`}>
              {company || fp.card.placeholder}
            </p>
          </div>

          {/* الأرقام والحروف اللاتينية هنا بوزن واحد: كل وزن ملفّ خطّ يُطلب قبل رسم الهيرو */}
          <div className="flex items-end justify-between text-[3.1cqw] font-semibold text-white/55">
            <span>{fp.card.cohort}</span>
            <span className="nums ltr">
              {fp.card.seat} {next ? pad(next) : "—"} / {pad(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * المقاعد العشرة مرقّمة — المأخوذ منها ممتلئ. ساكنة عمدًا: لا عدّ
 * تنازلي ولا وميض. وقبل وصول العدد الحيّ كلّها فارغة بلا ادّعاء.
 */
export function SeatChips({ seats, tone = "ink" }: { seats: Seats | null; tone?: "ink" | "light" }) {
  const total = Math.min(seats?.total ?? FP_TOTAL, 20);
  const taken = seats ? seats.total - seats.remaining : 0;
  const dark = tone === "light";
  return (
    <div aria-hidden="true" className="flex flex-wrap gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const on = seats !== null && i < taken;
        return (
          <span
            key={i}
            className={`nums grid h-8 w-[28px] place-items-center rounded-[8px] border text-[11px] font-semibold transition-colors duration-700 sm:w-8 ${
              on
                ? dark
                  ? "border-transparent bg-white/90 text-[#0b0b0d]"
                  : "border-transparent bg-ink text-paper"
                : dark
                  ? "border-white/20 text-white/55"
                  : "border-[var(--line-strong)] text-ink/55"
            }`}
          >
            {pad(i + 1)}
          </span>
        );
      })}
    </div>
  );
}
