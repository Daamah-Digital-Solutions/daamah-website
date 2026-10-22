import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { brand } from "../content/home";
import { FP_VIDEO, fp, fpWa, seatsLeft } from "../content/foundingPartners";
import { track } from "../analytics";
import { ArrowSwap, Reveal } from "../components/ui";
import { APPLY_EVENT, FoundingApplication, readLead } from "../components/FoundingApplication";
import { FoundingCard, SeatChips, type Seats } from "../components/FoundingVisuals";
import { WhatsAppMark } from "../components/WhatsAppFab";

const open = (placement: string, notice?: string) =>
  window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: { placement, notice } }));

/* الأقسام الداكنة ثابتة اللون في الوضعين: هي إطار البرنامج لا سطح يتبع السمة */
const DARK = "bg-[#0b0b0d] text-[#fbfaf8]";

/* ── قطع ─────────────────────────────────────────────────────────── */

function ApplyButton({
  placement,
  seats,
  tone = "ink",
  className = "",
}: {
  placement: string;
  seats: Seats | null;
  tone?: "ink" | "light";
  className?: string;
}) {
  const label = seats?.remaining === 0 ? fp.waitlist : fp.apply;
  return (
    <button
      type="button"
      onClick={() => open(placement)}
      className={`btn group inline-flex min-h-[56px] items-center justify-center rounded-full px-8 text-[16px] font-semibold [--btn-fill:var(--color-red)] hover:text-white ${
        tone === "light" ? "bg-[#fbfaf8] text-[#0b0b0d]" : "bg-ink text-paper"
      } ${className}`}
    >
      <span className="inline-flex items-center gap-3">
        {label}
        <ArrowSwap size={16} />
      </span>
    </button>
  );
}

function SeatsLine({ seats, tone = "ink" }: { seats: Seats | null; tone?: "ink" | "light" }) {
  return (
    <p aria-live="polite" className={`nums text-[14px] font-semibold ${tone === "light" ? "text-white/70" : "text-ink/70"}`}>
      {seats ? (seats.remaining > 0 ? `${seatsLeft(seats.remaining)} ${fp.of(seats.total)}` : seatsLeft(0)) : fp.seatsStatic}
    </p>
  );
}

/** لافتة القسم كما في الرئيسية: رقم، خطّ، اسم */
function Label({ index, children, light = false }: { index: string; children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3.5 text-[13px] font-semibold ${light ? "text-white/50" : "text-ink/50"}`}>
      <span className="nums ltr">({index})</span>
      <span className="h-px w-10 bg-current opacity-40" />
      {children}
    </p>
  );
}

function Title({ children, className = "" }: { children: string; className?: string }) {
  const dot = children.endsWith(".");
  return (
    <h2 className={`h2 mt-5 max-w-[44rem] ${className}`}>
      {dot ? children.slice(0, -1) : children}
      {dot && <span className="text-red">.</span>}
    </h2>
  );
}

/* ── مرئيات «وش تاخذ شركتك» — من شغل حقيقي ─────────────────────────── */

/**
 * يرسم ما بداخله حين يقترب من الشاشة. الصور الكسولة وحدها لا تكفي:
 * المتصفح يطلبها مبكرًا وهي على بعد شاشات، فتزاحم العنوان على الشبكة
 * في أول ثانيتين — وهما ما يقيس به جوجل سرعة الصفحة.
 */
function Near({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="w-full">
      {near ? children : <div className="aspect-[4/3] w-full" />}
    </div>
  );
}

function BrowserMock() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[var(--line)] bg-paper shadow-[0_30px_60px_-35px_rgba(11,11,13,0.45)]">
      <div className="ltr flex items-center gap-1.5 border-b border-[var(--line)] bg-paper-2 px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto rounded-full bg-paper px-4 py-1 text-[11px] text-ink/50">profitmaxinvestment.co.uk</span>
      </div>
      <img
        src="/assets/fp/site.webp"
        srcSet="/assets/fp/site-560.webp 560w, /assets/fp/site.webp 1100w"
        sizes="(min-width: 1024px) 560px, 100vw"
        alt="موقع بروفيت ماكس للاستثمار من تنفيذ دَعمة"
        width={1200}
        height={750}
        loading="lazy"
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </div>
  );
}

function ProfileMock() {
  const pages = ["05", "02", "01"];
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px]">
      {pages.map((n, i) => (
        <img
          key={n}
          src={`/assets/fp/profile-${n}.webp`}
          alt={i === 2 ? "ملف تعريفي لبروفيت ماكس من تنفيذ دَعمة" : ""}
          aria-hidden={i < 2}
          width={760}
          height={507}
          loading="lazy"
          decoding="async"
          className="absolute inset-x-[8%] top-[14%] w-[84%] rounded-[8px] shadow-[0_24px_40px_-22px_rgba(11,11,13,0.6)]"
          style={{ transform: `rotate(${(i - 2) * 5}deg) translate(${(i - 2) * 5}%, ${(2 - i) * 4}%)`, zIndex: i }}
        />
      ))}
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="mx-auto w-[205px] rounded-[30px] border-[7px] border-[#0b0b0d] bg-white shadow-[0_30px_60px_-30px_rgba(11,11,13,0.6)]">
      <div className="ltr flex items-center gap-2 px-3 pb-2 pt-3">
        <span className="grid size-7 place-items-center rounded-full bg-[#0f3b33] text-[9px] font-semibold text-[#7ee35b]">PM</span>
        <span className="text-[10.5px] font-semibold text-[#0b0b0d]">profitmax</span>
        <span className="ms-auto rounded-[6px] bg-[#0b0b0d] px-2 py-0.5 text-[9px] font-semibold text-white">Follow</span>
      </div>
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-b-[22px]">
        {Array.from({ length: 9 }, (_, i) => (
          <img
            key={i}
            src={`/assets/fp/social-${String(i + 1).padStart(2, "0")}.webp`}
            alt={i === 0 ? "تصاميم سوشيال لبروفيت ماكس من تنفيذ دَعمة" : ""}
            aria-hidden={i > 0}
            width={280}
            height={280}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}

/** خرائط جوجل — مرسومة لا لقطة: الخريطة لشركة العميل، لا لشركة غيره */
function MapMock() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-[14px] border border-[var(--line)] bg-[#eef0ea]">
      <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="300" fill="#eceee8" />
        <path d="M0 210 Q120 180 210 205 T400 175" stroke="#fff" strokeWidth="16" fill="none" />
        <path d="M120 0 L150 300" stroke="#fff" strokeWidth="12" />
        <path d="M290 0 Q270 140 330 300" stroke="#fff" strokeWidth="10" fill="none" />
        <path d="M0 80 L400 110" stroke="#fff" strokeWidth="8" />
        <rect x="30" y="120" width="70" height="50" rx="6" fill="#dfe6d8" />
        <rect x="175" y="20" width="90" height="60" rx="6" fill="#d7e5f0" />
        <rect x="320" y="200" width="60" height="70" rx="6" fill="#dfe6d8" />
      </svg>
      <span className="fp-pin absolute start-[46%] top-[20%] grid size-11 place-items-center rounded-full bg-red text-white shadow-[0_10px_20px_-6px_rgba(231,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
        </svg>
      </span>
      <div className="absolute inset-x-3 bottom-3 rounded-[12px] bg-white p-3.5 text-[#0b0b0d] shadow-[0_16px_30px_-16px_rgba(0,0,0,0.4)]">
        <p className="text-[14px] font-semibold">{fp.gets.mapName}</p>
        <p className="mt-0.5 text-[11.5px] font-semibold text-[#188038]">{fp.gets.mapKind}</p>
        <div className="mt-2.5 flex gap-1.5">
          {fp.gets.mapActions.map((a, i) => (
            <span
              key={a}
              className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${i === 0 ? "bg-[#1a73e8] text-white" : "border border-[#dadce0] text-[#1a73e8]"}`}
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<string, ReactNode> = {
  web: <BrowserMock />,
  profile: <ProfileMock />,
  social: <PhoneMock />,
  map: <MapMock />,
};

/** فيديو التعريف: غلاف حتى يُضغط — لا يُحمَّل الملف ولا يعمل الصوت وحده */
function Video({ src, poster }: { src: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-[22px] bg-[#0b0b0d]">
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
          <span className="absolute inset-0 grid place-items-center bg-black/25">
            <span className="grid size-20 place-items-center rounded-full bg-[#fbfaf8] text-[#0b0b0d] shadow-xl transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ms-1 size-8" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15l13-7.5z" />
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
 * تُقرأ كدعوة لا كعرض: إطار داكن في البداية والسعر والنهاية، وبطاقة
 * عضوية مرقّمة رمزًا للبرنامج، وكل ما يُعرض من شغل حقيقي. الأقسام
 * بترتيب الإعلان، بلا قائمة ولا رابط يُخرج الزائر، وكل نداء يفتح الطلب.
 * العنوان أكبر ما في الشاشة الأولى ويُرسم بلا انتظار — منه تُقاس السرعة.
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

  const strip = [...fp.about.sites, ...fp.about.sites];

  return (
    <div className="bg-paper pb-24 text-ink sm:pb-0">
      {/* 1 — الهيرو: إطار داكن، والبطاقة رمز البرنامج */}
      <section className={`relative overflow-hidden ${DARK}`}>
        {/* توهّج خافت خلف البطاقة */}
        <div className="pointer-events-none absolute -bottom-[30%] end-[-10%] aspect-square w-[70%] rounded-full bg-[radial-gradient(circle,rgba(231,0,0,0.16),transparent_65%)]" />

        <div className="relative mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:h-20 sm:px-8">
          <Link to="/" aria-label={brand.name.ar} className="transition-opacity duration-300 hover:opacity-60">
            <img src="/assets/logo-wordmark-light.png" alt={brand.name.ar} width={2035} height={544} className="h-[20px] w-auto sm:h-[22px]" />
          </Link>
          <span className="rounded-full border border-white/15 px-3 py-1.5 text-[12px] font-semibold text-white/65">{fp.hero.eyebrow}</span>
        </div>

        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-4 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
          {/* بلا حركة دخول: العنوان يُرسم مع أول إطار — منه تُقاس سرعة الصفحة */}
          <div>
            <p className="flex items-center gap-3 text-[13px] font-semibold text-white/55">
              <span className="size-1.5 rounded-full bg-red" aria-hidden="true" />
              {fp.name}
            </p>
            <h1 className="mt-6 text-[clamp(2.15rem,8.4vw,3.2rem)] font-semibold leading-[1.22] tracking-[-0.01em] lg:text-[clamp(2.9rem,4.4vw,4rem)]">
              {/* سطور بـ <br> لا بعناصر كتلية: العنوان كتلة نصّ واحدة، فيُحسب
                  «أكبر رسم» كاملًا — لا سطرًا سطرًا تسبقه البطاقة */}
              {fp.hero.lines.map((line, i) =>
                i === fp.hero.lines.length - 1 ? (
                  <span key={line}>
                    {line.slice(0, -1)}
                    <span className="text-red">.</span>
                  </span>
                ) : (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ),
              )}
            </h1>
            <p className="mt-6 max-w-[34rem] text-[17.5px] leading-[1.8] text-white/65 sm:text-[19px]">{fp.hero.sub}</p>

            <div className="mt-9 space-y-3">
              <SeatChips seats={seats} tone="light" />
              <SeatsLine seats={seats} tone="light" />
            </div>

            <div ref={heroCta} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <ApplyButton placement="fp_hero" seats={seats} tone="light" />
              <p className="text-[13.5px] text-white/50">{fp.hero.note}</p>
            </div>
          </div>

          <div className="reveal-eager relative mx-auto w-full max-w-[330px] px-2 sm:max-w-[440px] lg:max-w-none" style={{ animationDelay: "200ms" }}>
            <div className="fp-float">
              <FoundingCard seats={seats} className="w-full" />
            </div>
          </div>
        </div>

        {/* حقائق البرنامج */}
        <div className="relative border-t border-white/10">
          <dl className="mx-auto grid max-w-[1240px] grid-cols-3 px-4 sm:px-8">
            {fp.hero.facts.map((f, i) => (
              <div key={f.label} className={`py-6 sm:py-8 ${i > 0 ? "border-s border-white/10 ps-4 sm:ps-8" : ""}`}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="nums text-[clamp(1.6rem,5vw,2.6rem)] font-semibold leading-none">{f.value}</dd>
                <dd aria-hidden="true" className="mt-2 text-[12.5px] text-white/50 sm:text-[14px]">
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* شريط الأعمال المتحرّك — LTR لتلتفّ الحلقة بلا فجوة (كما في الرئيسية) */}
      <div className="border-b border-[var(--line)] py-8 sm:py-10">
        <p className="mb-6 text-center text-[13px] font-semibold text-ink/50">{fp.strip}</p>
        <div dir="ltr" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent sm:w-28" />
          <div className="marquee-track flex w-max" style={{ ["--marquee-dur" as string]: "48s" }}>
            {strip.map((s, i) => {
              const base = `/assets/work/gallery/${s.slug}/${s.shot.n}`;
              return (
                <figure key={`${s.slug}-${i}`} aria-hidden={i >= fp.about.sites.length} className="me-4 w-[250px] shrink-0 sm:w-[330px]">
                  <picture>
                    <source type="image/webp" srcSet={`${base}-480.webp`} />
                    <img
                      src={`${base}.jpg`}
                      alt={i < fp.about.sites.length ? `موقع ${s.name}` : ""}
                      width={s.shot.w}
                      height={s.shot.h}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full rounded-[12px] border border-[var(--line)] object-cover object-top"
                    />
                  </picture>
                  <figcaption dir="rtl" className="mt-2.5 text-[13px] font-semibold text-ink/70">
                    {s.name} <span className="font-normal text-ink/45">· {s.sector}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>

      {/* فيديو التعريف (حين يجهز) */}
      {FP_VIDEO && (
        <section className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-8 sm:pt-28">
          <Reveal>
            <Video src={FP_VIDEO.src} poster={FP_VIDEO.poster} />
          </Reveal>
        </section>
      )}

      {/* 2 — عن دَعمة. بلا كشف: يقع على حدّ الشاشة الأولى، وكشفه ينتظر جافاسكربت */}
      <section className="mx-auto grid max-w-[1240px] gap-10 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <Label index="01">{fp.about.label}</Label>
          <Title>{fp.about.title}</Title>
        </div>
        <div className="lg:pt-12">
          <p className="text-[17px] leading-[1.9] text-ink/65">{fp.about.text}</p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-8">
            {fp.about.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="nums text-[clamp(1.7rem,4.4vw,2.4rem)] font-semibold leading-none">{s.value}</dd>
                <dd aria-hidden="true" className="mt-2.5 text-[13px] leading-[1.6] text-ink/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 — وش تاخذ شركتك: كل بطاقة من شغل حقيقي */}
      <section className="bg-paper-2/70">
        <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <Label index="02">{fp.gets.label}</Label>
            <Title>{fp.gets.title}</Title>
          </Reveal>
          <ul className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-5">
            {fp.gets.items.map((it, i) => (
              <Reveal
                as="li"
                key={it.title}
                delay={(i % 2) * 90}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-[var(--line)] bg-paper"
              >
                <div className="grid min-h-[270px] flex-1 place-items-center px-6 py-8 sm:min-h-[340px] sm:px-10 sm:py-10">
                  <div className="w-full transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-1.5">
                    <Near>{VISUALS[it.icon]}</Near>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-[var(--line)] p-6 sm:p-8">
                  <div>
                    <h3 className="text-[22px] font-semibold">{it.title}</h3>
                    <p className="mt-1.5 text-[15.5px] leading-[1.7] text-ink/60">{it.result}</p>
                  </div>
                  <span className="nums ltr pt-1.5 text-[13px] font-semibold text-ink/35">0{i + 1}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-ink/50">{fp.gets.note}</p>
        </div>
      </section>

      {/* 4 — السعر والضمان: إطار داكن، كالدعوة */}
      <section className={`relative overflow-hidden ${DARK}`}>
        <div className="pointer-events-none absolute -start-[15%] -top-[40%] aspect-square w-[60%] rounded-full bg-[radial-gradient(circle,rgba(231,0,0,0.13),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-[1240px] gap-14 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Label index="03" light>
              {fp.price.label}
            </Label>
            <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-2">
              <span className="nums text-[clamp(4.4rem,17vw,8rem)] font-semibold leading-[0.9] tracking-[-0.02em]">{fp.price.amount}</span>
              <span className="pb-2 text-[24px] font-semibold">{fp.price.currency}</span>
            </div>
            <p className="nums mt-4 text-[17px] text-white/45">
              <s className="decoration-red decoration-2">
                {fp.price.was} {fp.price.currency}
              </s>
            </p>
            <p className="mt-7 max-w-[30rem] text-[16px] leading-[1.85] text-white/65">{fp.price.closes}</p>
            <div className="mt-9 space-y-3">
              <SeatChips seats={seats} tone="light" />
              <SeatsLine seats={seats} tone="light" />
            </div>
            <ApplyButton placement="fp_price" seats={seats} tone="light" className="mt-9 w-full sm:w-auto" />
          </Reveal>

          <Reveal delay={90} className="rounded-[26px] border border-white/[0.12] bg-white/[0.03] p-7 sm:p-10">
            <p className="flex items-center gap-2.5 text-[13px] font-semibold text-white/55">
              <svg viewBox="0 0 24 24" className="size-[18px] text-[#3ddc84]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" />
                <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {fp.guarantee.label}
            </p>
            <h2 className="mt-4 text-[clamp(1.6rem,3.6vw,2.2rem)] font-semibold leading-[1.35]">
              {fp.guarantee.title.slice(0, -1)}
              <span className="text-red">.</span>
            </h2>
            <ol className="relative mt-9 space-y-8 border-s border-white/15 ps-7">
              {fp.guarantee.timeline.map((t, i) => (
                <li key={t.when} className="relative">
                  <span
                    className={`absolute -start-[35px] top-1 size-3.5 rounded-full border-2 border-[#0b0b0d] ${i === 1 ? "bg-red" : "bg-white"}`}
                    aria-hidden="true"
                  />
                  <p className="text-[13px] font-semibold text-white/50">{t.when}</p>
                  <p className="nums mt-1.5 text-[16.5px] leading-[1.7] text-white/90">{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 5 — الخطوات: أربع محطّات على خطّ واحد */}
      <section className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <Label index="04">{fp.steps.label}</Label>
          <Title>{fp.steps.title}</Title>
        </Reveal>
        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
          <span className="absolute inset-x-0 top-[27px] hidden h-px bg-[var(--line-strong)] lg:block" aria-hidden="true" />
          {fp.steps.items.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative flex gap-5 lg:block">
              <span
                className={`nums ltr relative grid size-14 shrink-0 place-items-center rounded-full border text-[17px] font-semibold ${
                  i === 0 ? "border-ink bg-ink text-paper" : "border-[var(--line-strong)] bg-paper"
                }`}
              >
                0{i + 1}
              </span>
              <div className="lg:mt-7">
                <h3 className="text-[20px] font-semibold">{s.title}</h3>
                <p className="nums mt-2 max-w-[17rem] text-[15px] leading-[1.75] text-ink/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 6 — أسئلة شائعة: `<details>` أصيل يعمل قبل جافاسكربت */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <Label index="05">{fp.faq.label}</Label>
            <Title>{fp.faq.title}</Title>
            <p className="mt-7 text-[15px] text-ink/60">{fp.faq.more}</p>
            <a
              href={fpWa(fp.wa.ask, false)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.currentTarget.href = fpWa(fp.wa.ask);
                track("whatsapp_click", { placement: "fp_faq" });
              }}
              className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold"
            >
              <WhatsAppMark className="size-[18px] text-[#1faa53]" />
              <span className="ulink">{fp.faq.moreCta}</span>
            </a>
          </div>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {fp.faq.items.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-6 text-[18px] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-ink/60 transition-all duration-300 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-paper">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="nums max-w-[40rem] pb-7 text-[16px] leading-[1.9] text-ink/65">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — دعوة أخيرة */}
      <section ref={closing} className={`relative overflow-hidden ${DARK}`}>
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <Reveal>
            <h2 className="text-[clamp(2.3rem,7vw,4.4rem)] font-semibold leading-[1.15]">
              {fp.closing.title.slice(0, -1)}
              <span className="text-red">.</span>
            </h2>
            <p className="mt-5 max-w-[30rem] text-[17px] leading-[1.8] text-white/60">{fp.closing.sub}</p>
            <div className="mt-9 space-y-3">
              <SeatChips seats={seats} tone="light" />
              <SeatsLine seats={seats} tone="light" />
            </div>
            <ApplyButton placement="fp_closing" seats={seats} tone="light" className="mt-9 w-full sm:w-auto" />
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-[400px]">
            <div className="rotate-[-4deg]">
              <FoundingCard seats={seats} />
            </div>
          </Reveal>
        </div>
      </section>

      <footer className={`border-t border-white/10 ${DARK}`}>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-4 py-8 text-[13.5px] text-white/50 sm:px-8">
          <p className="font-semibold text-white/80">{brand.name.ar}</p>
          <Link to="/privacy" className="hover:text-white">
            {fp.footer.privacy}
          </Link>
        </div>
      </footer>

      <FoundingApplication seats={seats} onSeats={setSeats} />

      {/* شريط الجوال الثابت */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[var(--ease-out-quint)] sm:hidden ${
          bar ? "translate-y-0" : "translate-y-[130%]"
        }`}
        inert={!bar}
      >
        <div className="flex items-center gap-3 rounded-full bg-[#0b0b0d] p-1.5 ps-5 text-[#fbfaf8] shadow-[0_20px_40px_-14px_rgba(0,0,0,0.6)]">
          <span className="nums shrink-0 text-[13px] font-semibold text-white/70">{seats && seats.remaining > 0 ? seatsLeft(seats.remaining) : fp.seatsStatic}</span>
          <ApplyButton placement="fp_bar" seats={seats} tone="light" className="ms-auto min-h-[48px] px-5 text-[15px]" />
        </div>
      </div>
    </div>
  );
}
