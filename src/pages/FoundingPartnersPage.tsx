import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { brand } from "../content/home";
import { FP_TOTAL, FP_VIDEO, fp, seatsLeft, type FpIcon } from "../content/foundingPartners";
import { track } from "../analytics";
import { Reveal } from "../components/ui";
import { APPLY_EVENT, FoundingApplication, readLead } from "../components/FoundingApplication";

type Seats = { total: number; remaining: number };

const open = (placement: string, notice?: string) =>
  window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: { placement, notice } }));

/* ── قطع ─────────────────────────────────────────────────────────── */

function ApplyButton({ placement, seats, className = "" }: { placement: string; seats: Seats | null; className?: string }) {
  const full = seats?.remaining === 0;
  return (
    <button
      type="button"
      onClick={() => open(placement)}
      className={`inline-flex min-h-[54px] items-center justify-center rounded-full bg-ink px-8 py-4 text-[16.5px] font-bold leading-none text-paper shadow-[0_18px_40px_-18px_rgba(11,11,13,0.55)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {full ? fp.waitlist : fp.apply}
    </button>
  );
}

/**
 * المقاعد: عشر نقاط، الممتلئ منها مقعد أُخذ. هادئ عمدًا — لا عدّ
 * تنازلي ولا وميض. وقبل وصول العدد الحيّ: «10 مقاعد فقط»، صحيحة دائمًا.
 */
function SeatsMeter({ seats, tone = "ink" }: { seats: Seats | null; tone?: "ink" | "paper" }) {
  const total = seats?.total ?? FP_TOTAL;
  const taken = seats ? total - seats.remaining : 0;
  const on = tone === "ink" ? "bg-ink" : "bg-paper";
  const off = tone === "ink" ? "border-ink/25" : "border-paper/35";
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-live="polite">
      <span className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: Math.min(total, 20) }, (_, i) => (
          <span
            key={i}
            className={`size-2.5 rounded-full border transition-colors duration-700 ${seats && i < taken ? `${on} border-transparent` : off}`}
          />
        ))}
      </span>
      <span className={`nums text-[14px] font-bold ${tone === "ink" ? "text-ink/80" : "text-paper/85"}`}>
        {seats ? `${seatsLeft(seats.remaining)} ${seats.remaining > 0 ? fp.of(total) : ""}` : fp.seatsStatic}
      </span>
    </div>
  );
}

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-[1120px] px-4 py-16 sm:px-8 sm:py-24 ${className}`}>{children}</section>;
}

/**
 * `still` لما يقع على حدّ الشاشة الأولى: الكشف ينتظر جافاسكربت، فلو
 * كان العنوان أكبر ما في الشاشة لصار ظهوره المتأخّر هو «أكبر رسم»
 * الذي يقيس به جوجل سرعة الصفحة.
 */
function Heading({ label, title, light = false, still = false }: { label: string; title: string; light?: boolean; still?: boolean }) {
  const body = (
    <>
      <p className={`mb-3 flex items-center gap-2 text-[13px] font-semibold ${light ? "text-paper/60" : "text-ink/60"}`}>
        <span className="size-1.5 rounded-full bg-red" aria-hidden="true" />
        {label}
      </p>
      <h2 className="max-w-[40rem] text-[clamp(1.75rem,4.6vw,2.7rem)] font-bold leading-[1.25]">{title}</h2>
    </>
  );
  return still ? <div className="mb-9 sm:mb-12">{body}</div> : <Reveal className="mb-9 sm:mb-12">{body}</Reveal>;
}

const ICONS: Record<FpIcon, ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M3 8h18M8 21h8M12 17v4" />
    </>
  ),
  profile: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s-6-5.6-6-11a6 6 0 1 1 12 0c0 5.4-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  social: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" />
    </>
  ),
};

/** فيديو التعريف: غلاف فقط حتى يُضغط — لا يُحمَّل الملف ولا يعمل الصوت وحده */
function Video({ src, poster }: { src: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-[20px] bg-ink">
      {playing ? (
        <video src={src} poster={poster} controls autoPlay playsInline className="size-full" />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            track("cta_click", { placement: "fp_video" });
          }}
          className="group absolute inset-0"
          aria-label={fp.video.play}
        >
          <img src={poster} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
          <span className="absolute inset-0 grid place-items-center bg-black/20">
            <span className="grid size-16 place-items-center rounded-full bg-paper text-ink shadow-xl transition-transform duration-300 group-hover:scale-105 sm:size-20">
              <svg viewBox="0 0 24 24" className="size-7 translate-x-0.5" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l10.5-6.5z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * «برنامج شركاء التأسيس» — صفحة هبوط لإعلانات ميتا.
 *
 * الأقسام بترتيب الإعلان نفسه، فيكمّل الزائر القصة التي بدأها. بلا
 * قائمة ولا روابط تُخرجه، وكل نداء يفتح الطلب نفسه. العنوان أكبر ما في
 * الشاشة الأولى، فلا صورة تؤخّر رسمها.
 */
export function FoundingPartnersPage() {
  const [seats, setSeats] = useState<Seats | null>(null);
  const heroCta = useRef<HTMLDivElement>(null);
  const closing = useRef<HTMLElement>(null);
  const [bar, setBar] = useState(false);

  useEffect(() => {
    track("view_content", { content_name: "founding_partners" });
    fetch("/api/partners?seats")
      .then((r) => (r.ok ? r.json() : null))
      .then((s: Seats | null) => s && typeof s.remaining === "number" && setSeats(s))
      .catch(() => {
        /* بلا عدد حيّ — يبقى «10 مقاعد فقط» */
      });

    /* عاد من صفحة الدفع بلا دفع: إلى شاشة القبول نفسها، بسطر يطمئنه */
    const p = new URLSearchParams(window.location.search).get("payment");
    if ((p === "cancelled" || p === "failed") && readLead()) open("payment_return", p === "cancelled" ? fp.accepted.cancelled : fp.accepted.failed);
  }, []);

  /* شريط الجوال: بعد أن يتجاوز الهيرو، ويختفي عند الدعوة الأخيرة */
  useEffect(() => {
    const seen = { hero: true, closing: false };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === heroCta.current) seen.hero = e.isIntersecting;
        if (e.target === closing.current) seen.closing = e.isIntersecting;
      }
      setBar(!seen.hero && !seen.closing);
    });
    if (heroCta.current) io.observe(heroCta.current);
    if (closing.current) io.observe(closing.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-paper pb-24 text-ink sm:pb-0">
      {/* الشعار وحده — لا قائمة يخرج منها زائرٌ دُفع ثمن وصوله */}
      <div className="mx-auto flex h-16 max-w-[1120px] items-center px-4 sm:h-20 sm:px-8">
        <Link to="/" aria-label={brand.name.ar} className="transition-opacity duration-300 hover:opacity-60">
          <img src="/assets/logo-wordmark.png" alt={brand.name.ar} width={2035} height={544} className="h-[20px] w-auto dark:hidden sm:h-[22px]" />
          <img
            src="/assets/logo-wordmark-light.png"
            alt=""
            aria-hidden="true"
            width={2035}
            height={544}
            className="hidden h-[20px] w-auto dark:block sm:h-[22px]"
          />
        </Link>
      </div>

      {/* 1 — الهيرو */}
      <section className="mx-auto w-full max-w-[1120px] px-4 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-16">
        <div className="reveal-eager max-w-[52rem]">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3.5 py-1.5 text-[13px] font-semibold text-ink/70">
            <span className="size-1.5 rounded-full bg-red" aria-hidden="true" />
            {fp.name}
          </p>
          <h1 className="text-[clamp(2.1rem,7.6vw,4.4rem)] font-bold leading-[1.18] tracking-[-0.01em]">{fp.hero.title}</h1>
          <p className="mt-5 max-w-[36rem] text-[17.5px] leading-[1.75] text-ink/70 sm:text-[20px]">{fp.hero.sub}</p>
          <div className="mt-8">
            <SeatsMeter seats={seats} />
          </div>
          <div ref={heroCta} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <ApplyButton placement="fp_hero" seats={seats} />
            <p className="text-[13.5px] text-ink/60">{fp.hero.note}</p>
          </div>
        </div>
      </section>

      {/* 2 — فيديو التعريف (حين يجهز) */}
      {FP_VIDEO && (
        <Section className="pt-0 sm:pt-0">
          <Reveal>
            <Video src={FP_VIDEO.src} poster={FP_VIDEO.poster} />
          </Reveal>
        </Section>
      )}

      {/* 3 — عن دَعمة */}
      <div className="border-t border-[var(--line)]">
        <Section>
          <Heading label={fp.about.label} title={fp.about.title} still />
          <p className="-mt-4 mb-10 max-w-[38rem] text-[16.5px] leading-[1.85] text-ink/70 sm:-mt-6">{fp.about.text}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {fp.about.sites.map((s, i) => {
              const base = `/assets/work/gallery/${s.slug}/${s.shot.n}`;
              return (
                <Reveal as="li" key={s.slug} delay={(i % 3) * 80}>
                  <div className="overflow-hidden rounded-[14px] border border-[var(--line)] bg-paper-2">
                    <picture>
                      <source type="image/webp" srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`} sizes="(min-width: 1024px) 340px, 50vw" />
                      <img
                        src={`${base}.jpg`}
                        alt={`موقع ${s.name}`}
                        width={s.shot.w}
                        height={s.shot.h}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover object-top"
                      />
                    </picture>
                  </div>
                  <p className="mt-2.5 text-[14px] font-bold sm:text-[15px]">{s.name}</p>
                  <p className="text-[12.5px] text-ink/60 sm:text-[13px]">{s.sector}</p>
                </Reveal>
              );
            })}
          </ul>
        </Section>
      </div>

      {/* 4 — وش تاخذ شركتك */}
      <div className="bg-paper-2/70">
        <Section>
          <Heading label={fp.gets.label} title={fp.gets.title} />
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {fp.gets.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={(i % 2) * 80} className="rounded-[20px] border border-[var(--line)] bg-paper p-6 sm:p-8">
                <span className="mb-6 grid size-12 place-items-center rounded-[14px] bg-ink text-paper">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {ICONS[it.icon]}
                  </svg>
                </span>
                <h3 className="text-[20px] font-bold">{it.title}</h3>
                <p className="mt-2 flex items-start gap-2 text-[16px] leading-[1.7] text-ink/70">
                  <svg viewBox="0 0 24 24" className="mt-1.5 size-4 shrink-0 text-red rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {it.result}
                </p>
              </Reveal>
            ))}
          </ul>
        </Section>
      </div>

      {/* 5 + 6 — السعر والضمان */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:gap-5">
          <Reveal className="rounded-[24px] bg-ink p-7 text-paper sm:p-10">
            <p className="text-[14px] font-semibold text-paper/60">{fp.price.label}</p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="nums text-[clamp(3.4rem,13vw,5rem)] font-bold leading-none">{fp.price.amount}</span>
              <span className="text-[22px] font-bold">{fp.price.currency}</span>
              <s className="nums text-[20px] font-semibold text-paper/45 decoration-red decoration-2">
                {fp.price.was} {fp.price.currency}
              </s>
            </p>
            <p className="mt-6 max-w-[28rem] text-[15.5px] leading-[1.8] text-paper/75">{fp.price.closes}</p>
            <div className="mt-8">
              <SeatsMeter seats={seats} tone="paper" />
            </div>
            <button
              type="button"
              onClick={() => open("fp_price")}
              className="mt-7 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-paper px-8 py-4 text-[16.5px] font-bold leading-none text-ink transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              {seats?.remaining === 0 ? fp.waitlist : fp.apply}
            </button>
          </Reveal>

          <Reveal delay={80} className="rounded-[24px] border border-[var(--line)] p-7 sm:p-10">
            <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-ink/60">
              <svg viewBox="0 0 24 24" className="size-4 text-[#1a9e4b]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" />
                <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {fp.guarantee.label}
            </p>
            <h2 className="text-[clamp(1.5rem,3.6vw,2rem)] font-bold leading-[1.35]">{fp.guarantee.title}</h2>
            <ol className="mt-7 space-y-4">
              {fp.guarantee.points.map((pt, i) => (
                <li key={pt} className="flex items-start gap-3.5">
                  <span className="nums grid size-7 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-[13px] font-bold">
                    {i + 1}
                  </span>
                  <span className="nums pt-0.5 text-[16px] leading-[1.65]">{pt}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* 7 — الخطوات */}
      <div className="bg-paper-2/70">
        <Section>
          <Heading label={fp.steps.label} title={fp.steps.title} />
          <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {fp.steps.items.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="rounded-[20px] border border-[var(--line)] bg-paper p-6">
                <span className="nums mb-5 grid size-9 place-items-center rounded-full bg-ink text-[14px] font-bold text-paper">{i + 1}</span>
                <h3 className="text-[18px] font-bold">{s.title}</h3>
                <p className="nums mt-1.5 text-[15px] leading-[1.7] text-ink/65">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </Section>
      </div>

      {/* 8 — أسئلة شائعة: `<details>` أصيل يعمل قبل جافاسكربت */}
      <Section>
        <Heading label={fp.faq.label} title={fp.faq.title} />
        <div className="max-w-[48rem] divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {fp.faq.items.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[var(--line)] text-ink/60 transition-transform duration-300 group-open:rotate-45">
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="nums pb-5 text-[15.5px] leading-[1.85] text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 9 — دعوة أخيرة */}
      <section ref={closing} className="border-t border-[var(--line)]">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center px-4 py-20 text-center sm:px-8 sm:py-28">
          <h2 className="text-[clamp(2rem,6vw,3.4rem)] font-bold leading-[1.2]">
            {fp.closing.title}
            <span className="text-red">.</span>
          </h2>
          <div className="mt-7 flex justify-center">
            <SeatsMeter seats={seats} />
          </div>
          <ApplyButton placement="fp_closing" seats={seats} className="mt-8" />
        </div>
      </section>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-4 py-8 text-[14px] text-ink/60 sm:px-8">
          <p className="font-bold text-ink">{brand.name.ar}</p>
          <Link to="/privacy" className="hover:text-ink">
            {fp.footer.privacy}
          </Link>
        </div>
      </footer>

      <FoundingApplication seats={seats} onSeats={setSeats} />

      {/* شريط الجوال الثابت */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-paper/95 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md transition-transform duration-300 sm:hidden ${
          bar ? "translate-y-0" : "translate-y-full"
        }`}
        inert={!bar}
      >
        <div className="flex items-center gap-3">
          <ApplyButton placement="fp_bar" seats={seats} className="min-h-[50px] flex-1 px-4 py-3.5 text-[15.5px]" />
          {seats && seats.remaining > 0 && <span className="nums shrink-0 text-[13px] font-bold text-ink/70">{seatsLeft(seats.remaining)}</span>}
        </div>
      </div>
    </div>
  );
}
