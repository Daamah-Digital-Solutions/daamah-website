import { useEffect, useRef, useState } from "react";
import { about } from "../content/home";
import { workItems } from "../content/work";
import { coverSize, galleries } from "../content/gallery";
import { CURRENCY, PRICE, nationalDay as nd, video, type ShotRef } from "../content/nationalDay";
import { waHref, waMessage } from "../content/whatsapp";
import { track } from "../analytics";
import { Img } from "../components/Img";
import { FaqList } from "../components/FaqList";
import { Lightbox, type LightboxShot } from "../components/Lightbox";
import { OfferForm } from "../components/OfferForm";
import { WhatsAppMark } from "../components/WhatsAppFab";
import { Arrow, Chevron, Counter, MaskLines, PlayMark, Reveal, SectionLabel, Wrap } from "../components/ui";

const WA = waMessage.nationalDay.ar;
const GALLERY_WIDTHS = [480, 960];

/* ── الصور: من معرض العمل أو غلافه ─────────────────────── */

type Shot = LightboxShot & { gallery: boolean };

function resolve(r: ShotRef): Shot | null {
  const item = workItems.find((w) => w.slug === r.slug);
  if (r.n) {
    const s = galleries[r.slug]?.[r.n - 1];
    if (s) return { src: s.src, w: s.w, h: s.h, label: item?.name.ar ?? "", gallery: true };
  }
  if (!item) return null;
  const size = coverSize[item.image] ?? { w: 1400, h: 933 };
  return { src: item.image, ...size, label: item.name.ar, gallery: false };
}
const resolveAll = (refs: ShotRef[]) => refs.map(resolve).filter((s): s is Shot => !!s);

function ShotImg({ s, sizes, className = "", priority = false }: { s: Shot; sizes: string; className?: string; priority?: boolean }) {
  return (
    <Img
      src={s.src}
      alt={s.label ?? ""}
      width={s.w}
      height={s.h}
      sizes={sizes}
      priority={priority}
      widths={s.gallery ? GALLERY_WIDTHS : undefined}
      /* التصميم كاملًا داخل إطاره — القصّ كان يبتر الشعار والعنوان */
      className={`size-full object-contain dark:brightness-[0.9] ${className}`}
    />
  );
}

/** عارض ملء الشاشة واحد للصفحة كلها — كل صورة تُفتح فيه */
type Box = { shots: Shot[]; at: number } | null;
type OpenBox = (shots: Shot[], at: number, placement: string) => void;

/* ── قطع صغيرة ─────────────────────────────────────────── */

function Badge() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-pill border border-saudi/40 px-4 py-2 text-[14px] font-medium text-saudi">
      <span className="size-2 rounded-full bg-saudi" />
      {nd.badge} <span className="ltr nums">96</span>
    </span>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-5 shrink-0 text-red ${className}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5 10 17l9-9.5" />
    </svg>
  );
}

function Price({ size = "lg", tone = "ink" }: { size?: "lg" | "md"; tone?: "ink" | "paper" }) {
  return (
    <span className={`inline-flex items-baseline gap-3 ${tone === "paper" ? "text-paper" : "text-ink"}`}>
      <span className={`ltr nums font-semibold leading-none ${size === "lg" ? "text-[clamp(3.4rem,6.8vw,5.6rem)]" : "text-[46px]"}`}>{PRICE}</span>
      <span className={`font-semibold ${size === "lg" ? "text-[26px]" : "text-[20px]"}`}>{CURRENCY}</span>
    </span>
  );
}

function Scarcity({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <p className={`flex items-center gap-3 text-[14.5px] ${tone === "paper" ? "text-paper/70" : "text-ink/65"}`}>
      <span className="relative flex size-2.5 shrink-0">
        <span className="absolute inset-0 animate-ping rounded-full bg-red opacity-60 motion-reduce:hidden" />
        <span className="relative size-2.5 rounded-full bg-red" />
      </span>
      {nd.scarcity}
    </p>
  );
}

function BookLink({ placement, children, tone = "ink", className = "" }: { placement: string; children: React.ReactNode; tone?: "ink" | "paper"; className?: string }) {
  return (
    <a
      href="#book"
      onClick={() => track("cta_click", { placement })}
      className={`btn group inline-flex items-center justify-center rounded-pill px-8 py-4 text-[16px] font-semibold ${
        tone === "paper" ? "bg-paper text-ink hover:text-white" : "bg-ink text-paper hover:text-white"
      } [--btn-fill:var(--color-red)] ${className}`}
    >
      <span className="inline-flex items-center gap-2.5">
        {children}
        <Arrow className="size-4" />
      </span>
    </a>
  );
}

/* ── الشريط العلوي: الشعار والحجز فقط ─────────────────── */
function TopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 border-b border-[var(--line)] bg-paper/90 backdrop-blur-md">
      <Wrap className="flex h-16 items-center justify-between gap-4">
        {/* الشعار ليس رابطًا: صفحة إعلان لا يُخرج منها شيء */}
        <span className="shrink-0">
          <img src="/assets/logo-wordmark.png" alt="دَعمة للحلول الرقمية" width={2035} height={544} className="h-[20px] w-auto dark:hidden" />
          <img src="/assets/logo-wordmark-light.png" alt="" aria-hidden="true" width={2035} height={544} className="hidden h-[20px] w-auto dark:block" />
        </span>
        <div className="flex items-center gap-2.5">
          <a
            href={waHref(WA)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nd.sticky.whatsapp}
            onClick={() => track("whatsapp_click", { placement: "offer_topbar" })}
            className="grid size-10 place-items-center rounded-pill border border-[var(--line-strong)] text-ink transition-colors duration-(--dur-fast) hover:border-ink"
          >
            <WhatsAppMark className="size-[18px]" />
          </a>
          <a
            href="#book"
            onClick={() => track("cta_click", { placement: "offer_topbar" })}
            className="btn inline-flex items-center rounded-pill bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper hover:text-white [--btn-fill:var(--color-red)]"
          >
            <span>{nd.topCta}</span>
          </a>
        </div>
      </Wrap>
    </div>
  );
}

/* ── جدار الأعمال المتحرّك ─────────────────────────────── */
function WorkWall({ onOpen }: { onOpen: OpenBox }) {
  const all = resolveAll(nd.showcase.wall.map((slug) => ({ slug })));
  const rows = [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)];
  return (
    /* الحاوية نفسها LTR لا الشريط وحده: شريطٌ أعرض من حاويته داخل
       صفحة RTL يلتصق بحافّتها اليمنى، فتسحبه الحركة يسارًا ويبقى
       خلفه فراغ. من اليسار يلتفّ عند -50% بلا فجوة. */
    <div dir="ltr" className="relative overflow-hidden py-2" aria-label={nd.showcase.label}>
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent sm:w-32" />
      <div className="flex flex-col gap-4">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="marquee-track flex w-max gap-4"
            style={{ ["--marquee-dur" as string]: ri ? "70s" : "58s", animationDirection: ri ? "reverse" : undefined }}
          >
            {[...row, ...row].map((s, i) => (
              <button
                key={`${ri}-${i}`}
                type="button"
                onClick={() => onOpen(all, all.indexOf(row[i % row.length]), "offer_wall")}
                aria-hidden={i >= row.length}
                tabIndex={i >= row.length ? -1 : undefined}
                aria-label={s.label}
                className="group relative block h-[190px] shrink-0 overflow-hidden rounded-[18px] bg-paper-2 sm:h-[280px]"
                style={{ aspectRatio: `${s.w} / ${s.h}` }}
              >
                <ShotImg s={s} sizes="(min-width: 640px) 480px, 300px" className="transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── فيديوهات Motion: فيديو العرض أولًا، ثم التعريفي ────── */
function VideoDuo() {
  const [which, setWhich] = useState<"offer" | "intro">("offer");
  const [playing, setPlaying] = useState(false);
  const [vertical, setVertical] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  /* النسخة الطولية للجوال تُختار بعد الرسم: الصفحة تُولَّد بلا شاشة */
  useEffect(() => {
    setVertical(window.matchMedia("(max-width: 767px)").matches);
    const onAsk = (e: Event) => {
      const w = (e as CustomEvent<"offer" | "intro">).detail;
      setWhich(w);
      setPlaying(false);
    };
    window.addEventListener("nd:video", onAsk);
    return () => window.removeEventListener("nd:video", onAsk);
  }, []);

  const tall = which === "offer" && vertical;
  const src = which === "offer" ? (tall ? video.offer.vSrc : video.offer.src) : video.intro.src;
  const poster = which === "offer" ? (tall ? video.offer.vPoster : video.offer.poster) : video.intro.poster;
  const v = nd.videos;

  return (
    <div>
      <div role="tablist" className="mb-4 flex gap-2">
        {(["offer", "intro"] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={which === k}
            onClick={() => {
              setWhich(k);
              setPlaying(false);
            }}
            className={`rounded-pill px-5 py-2.5 text-[14.5px] font-medium transition-colors duration-(--dur-fast) ${
              which === k ? "bg-ink text-paper" : "border border-[var(--line-strong)] text-ink/70 hover:text-ink"
            }`}
          >
            {v[k].tab}
          </button>
        ))}
      </div>
      <div className={`relative overflow-hidden rounded-[20px] bg-ink ${tall ? "mx-auto aspect-[9/16] max-h-[78vh]" : "aspect-video"}`}>
        <video
          key={src}
          ref={ref}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={playing}
          className="size-full object-cover"
        />
        {!playing && (
          <button
            type="button"
            aria-label={v.play}
            onClick={() => {
              setPlaying(true);
              track("cta_click", { placement: `offer_video_${which}` });
              void ref.current?.play();
            }}
            className="group absolute inset-0 grid place-items-center bg-ink/10 transition-colors duration-(--dur-base) hover:bg-ink/25"
          >
            <PlayMark />
          </button>
        )}
      </div>
      <p className="mt-3 text-[14px] text-ink/55">{v[which].note}</p>
    </div>
  );
}

/* ── معرض الأعمال بالتبويب ─────────────────────────────── */
function Showcase({ onOpen }: { onOpen: OpenBox }) {
  const [tab, setTab] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const shots = resolveAll(nd.showcase.tabs[tab].shots);

  const move = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    /* الصفحة من اليمين: «التالي» يعني التمرير نحو اليسار */
    el.scrollBy({ left: -dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" className="flex flex-wrap gap-2">
          {nd.showcase.tabs.map((t, i) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => {
                setTab(i);
                strip.current?.scrollTo({ left: 0 });
                track("cta_click", { placement: `offer_showcase_${t.key}` });
              }}
              className={`rounded-pill px-5 py-2.5 text-[15px] font-medium transition-colors duration-(--dur-fast) ${
                tab === i ? "bg-ink text-paper" : "border border-[var(--line-strong)] text-ink/70 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => move(d)}
              aria-label={d > 0 ? "التالي" : "السابق"}
              className="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] text-ink transition-colors duration-(--dur-fast) hover:bg-ink hover:text-paper"
            >
              <Arrow className={`size-4 ${d < 0 ? "-scale-x-100 rtl:scale-x-100" : ""}`} />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={strip}
        className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((s, i) => (
          <button
            key={`${tab}-${s.src}`}
            type="button"
            onClick={() => onOpen(shots, i, `offer_showcase_${nd.showcase.tabs[tab].key}`)}
            className="group relative block h-[300px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-paper-3 sm:h-[460px]"
            style={{ aspectRatio: `${s.w} / ${s.h}`, maxWidth: "88vw" }}
          >
            <ShotImg s={s} sizes="(min-width: 640px) 720px, 88vw" className="transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.03]" />
            <span className="absolute bottom-3 start-3 rounded-pill bg-paper/90 px-3.5 py-1.5 text-[13px] font-medium text-ink backdrop-blur-sm">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── صور البند: واحدة كبيرة واثنتان صغيرتان ───────────── */
function ItemCollage({ refs, title, onOpen }: { refs: ShotRef[]; title: string; onOpen: OpenBox }) {
  const shots = resolveAll(refs);
  if (!shots.length) return null;
  const tile = "group relative block overflow-hidden rounded-[18px] bg-paper-3";
  const zoom = "transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]";

  /* لقطات المواقع والملفات عريضة: قصّها إلى عمود طولي كان يبتر
     العنوان نفسه. العريضة كبيرة فوق واثنتان تحتها، والطولية جنبًا */
  if (shots[0].w > shots[0].h) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {shots.slice(0, 3).map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => onOpen(shots, i, "offer_item")}
            aria-label={`${title} — ${s.label}`}
            className={`${tile} ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}
          >
            <ShotImg s={s} sizes={i === 0 ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 28vw, 50vw"} className={`object-top ${zoom}`} />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
      <button type="button" onClick={() => onOpen(shots, 0, "offer_item")} aria-label={`${title} — ${shots[0].label}`} className={`${tile} col-span-3 row-span-2 aspect-[4/5]`}>
        <ShotImg s={shots[0]} sizes="(min-width: 1024px) 30vw, 60vw" className="transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" />
      </button>
      {shots.slice(1, 3).map((s, i) => (
        <button key={s.src} type="button" onClick={() => onOpen(shots, i + 1, "offer_item")} aria-label={`${title} — ${s.label}`} className={`${tile} col-span-2`}>
          <ShotImg s={s} sizes="(min-width: 1024px) 20vw, 40vw" className="transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" />
        </button>
      ))}
    </div>
  );
}

/* ── الشريط الثابت على الجوال ─────────────────────────── */
function StickyBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const visible = new Set<string>();
    let pastHero = false;
    const update = () => setShown(pastHero && visible.size === 0);
    const targets = ["book", "book-end"].map((id) => document.getElementById(id)).filter((x): x is HTMLElement => !!x);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        update();
      },
      { threshold: 0.1 },
    );
    targets.forEach((t) => io.observe(t));
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-paper/95 px-5 pt-3 pb-[max(0.8rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-[opacity,translate] duration-(--dur-base) ease-[var(--ease-out-quint)] lg:hidden ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 leading-tight">
          <p className="text-[12.5px] text-ink/50">{nd.sticky.label}</p>
          <p className="mt-1 text-[20px] font-semibold">
            <span className="ltr nums">{PRICE}</span> {CURRENCY}
          </p>
        </div>
        <a
          href="#book"
          tabIndex={shown ? undefined : -1}
          onClick={() => track("cta_click", { placement: "offer_sticky" })}
          className="btn inline-flex items-center rounded-pill bg-ink px-6 py-3.5 text-[15px] font-semibold text-paper hover:text-white [--btn-fill:var(--color-red)]"
        >
          <span>{nd.sticky.cta}</span>
        </a>
        <a
          href={waHref(WA)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? undefined : -1}
          aria-label={nd.sticky.whatsapp}
          onClick={() => track("whatsapp_click", { placement: "offer_sticky" })}
          className="grid size-[50px] shrink-0 place-items-center rounded-pill border border-[var(--line-strong)] text-ink"
        >
          <WhatsAppMark className="size-5" />
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   الصفحة
   ═══════════════════════════════════════════════════════════ */

/**
 * صفحة هبوط «عرض اليوم الوطني» — للإعلان وحده.
 *
 * بلا هيدر ولا فوتر (يُخفيان في `Shell`): شريط علوي فيه الشعار والحجز
 * فقط، ولا رابط يخرج بالزائر. الترتيب ترتيب القرار: العرض والسعر
 * والنموذج فوق الطيّة، ثم جدار أعمال حقيقية يُرى قبل أن يُقرأ، ثم
 * المقارنة بالمبلغ نفسه، ثم البنود الخمسة بأمثلة من الشغل وفيديوهات
 * Motion (فيديو العرض أولًا)، ثم المعرض الكامل بالتبويب، ثم الطريقة،
 * ومن نحن، والأسئلة، والحجز مرّة ثانية. كل صورة تُفتح بالحجم الكامل.
 */
export function NationalDayPage() {
  const [box, setBox] = useState<Box>(null);
  const open: OpenBox = (shots, at, placement) => {
    setBox({ shots, at });
    track("cta_click", { placement: `${placement}_open` });
  };

  const askVideo = (w: "offer" | "intro", placement: string) => {
    window.dispatchEvent(new CustomEvent("nd:video", { detail: w }));
    track("cta_click", { placement });
    document.getElementById("motion")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <TopBar />

      {/* ── الهيرو: العرض + الحجز ── */}
      <section className="pt-28 pb-14 sm:pt-32 sm:pb-20">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal eager>
                <Badge />
              </Reveal>
              <MaskLines lines={nd.hero.title} className="mt-7 text-[clamp(2.1rem,4vw,3.7rem)] font-semibold leading-[1.32]" accentDot eager />
              <Reveal delay={160} eager>
                <p className="mt-6 max-w-[52ch] text-[17px] leading-[2] text-ink/70 sm:text-[18px]">{nd.hero.intro}</p>
              </Reveal>

              <Reveal delay={240} eager>
                <div className="mt-9 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-[var(--line)] pt-8">
                  <div>
                    <p className="text-[14px] text-ink/50">{nd.hero.priceLabel}</p>
                    <p className="mt-3">
                      <Price />
                    </p>
                  </div>
                  <p className="pb-2 text-[15px] text-ink/55">
                    بدل <span className="line-through decoration-red decoration-2">{nd.hero.was}</span>
                  </p>
                </div>

                <ul className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {nd.included.map((x) => (
                    <li key={x} className="flex items-center gap-3 text-[16px] font-medium">
                      <Check />
                      {x}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
                  <BookLink placement="offer_hero" className="lg:hidden">
                    {nd.hero.primary}
                  </BookLink>
                  <button
                    type="button"
                    onClick={() => askVideo("offer", "offer_hero_watch")}
                    className="group inline-flex items-center gap-3 rounded-pill border border-[var(--line-strong)] py-2 ps-2 pe-6 text-[15px] font-medium transition-colors duration-(--dur-fast) hover:border-ink"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-ink text-paper">
                      <svg viewBox="0 0 24 24" className="ms-0.5 size-4" fill="currentColor" aria-hidden="true">
                        <path d="M7 4.5v15l13-7.5z" />
                      </svg>
                    </span>
                    {nd.hero.watch}
                  </button>
                </div>
                <div className="mt-6 flex flex-col gap-2.5">
                  <Scarcity />
                  <p className="flex items-center gap-3 text-[14.5px] text-ink/65">
                    <Chevron className="h-2.5 w-auto shrink-0 text-red" />
                    <span className="nums">{nd.hero.proof}</span>
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} eager className="lg:col-span-5 lg:sticky lg:top-24">
              <div id="book" className="scroll-mt-24 rounded-[24px] border border-[var(--line)] bg-paper-2 p-6 shadow-[0_40px_90px_-50px_rgba(11,11,13,0.35)] sm:p-9">
                <p className="text-[28px] font-semibold leading-snug sm:text-[32px]">
                  {nd.form.title}
                  <span className="text-red">.</span>
                </p>
                <p className="mt-1.5 text-[15px] text-ink/60">{nd.form.intro}</p>
                <div className="mt-7">
                  <OfferForm placement="offer_hero" />
                </div>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ── جدار الأعمال: يُرى قبل أن يُقرأ ── */}
      <section className="pb-16 sm:pb-24">
        <Wrap>
          <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-[14px] font-medium text-ink/50">{nd.clients.label}</span>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {nd.clients.names.map((n, i) => (
                <li key={n} className="flex items-center gap-4 text-[15px] font-semibold text-ink/80">
                  {i > 0 && <span className="size-1 rounded-full bg-ink/25" />}
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Wrap>
        <WorkWall onOpen={open} />
      </section>

      {/* ── المقارنة بالمبلغ نفسه ── */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{nd.compare.label}</SectionLabel>
          </Reveal>
          <MaskLines lines={nd.compare.title} as="h2" className="h2 mt-8 max-w-[22ch]" accentDot />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {[nd.compare.before, nd.compare.after].map((col, ci) => (
              <Reveal
                key={col.title}
                delay={ci * 120}
                className={`relative overflow-hidden rounded-[24px] p-7 sm:p-10 ${ci === 1 ? "bg-ink text-paper" : "border border-[var(--line)] bg-paper"}`}
              >
                <p className={`text-[14px] ${ci === 1 ? "text-paper/55" : "text-ink/50"}`}>{col.note}</p>
                <h3 className="mt-3 text-[26px] font-semibold">{col.title}</h3>
                <p className="mt-5">
                  <Price size="md" tone={ci === 1 ? "paper" : "ink"} />
                </p>
                <ul className={`mt-8 border-t ${ci === 1 ? "border-paper/15" : "border-[var(--line)]"}`}>
                  {nd.included.map((r, ri) => {
                    const has = ci === 1 || ri === 0;
                    return (
                      <li key={r} className={`flex items-center justify-between gap-4 border-b py-4 ${ci === 1 ? "border-paper/15" : "border-[var(--line)]"}`}>
                        <span className={has ? "text-[16.5px] font-medium" : "text-[16.5px] text-ink/30 line-through decoration-ink/25"}>{r}</span>
                        {has ? <Check /> : <span className="text-[20px] leading-none text-ink/25">×</span>}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <BookLink placement="offer_compare">{nd.hero.primary}</BookLink>
            <Scarcity />
          </Reveal>
        </Wrap>
      </section>

      {/* ── ماذا تستلم ── */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{nd.items.label}</SectionLabel>
          </Reveal>
          <MaskLines lines={nd.items.title} as="h2" className="h2 mt-8 max-w-[20ch]" accentDot />

          <div className="mt-14 flex flex-col gap-16 sm:gap-24">
            {nd.items.list.map((it, i) => {
              const motion = it.shots.length === 0;
              return (
                <article key={it.no} id={motion ? "motion" : undefined} className="grid scroll-mt-24 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
                  <Reveal className={`lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
                    <p className="ltr nums text-[15px] font-semibold text-red">{it.no} / 05</p>
                    <h3 className="mt-4 text-[clamp(1.9rem,3.3vw,2.7rem)] font-semibold leading-[1.35]">{it.title}</h3>
                    <p className="mt-4 max-w-[42ch] text-[18px] leading-[1.95] text-ink/70">{it.lead}</p>
                    <ul className="mt-7 flex flex-col gap-3.5">
                      {it.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-[16px]">
                          <Check className="size-[18px]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {motion && <p className="mt-7 text-[14.5px] text-ink/55">{nd.videos.sample}</p>}
                  </Reveal>
                  <Reveal delay={120} className={`lg:col-span-7 ${i % 2 ? "lg:order-1" : ""}`}>
                    {motion ? <VideoDuo /> : <ItemCollage refs={it.shots} title={it.title} onOpen={open} />}
                  </Reveal>
                </article>
              );
            })}
          </div>
        </Wrap>
      </section>

      {/* ── المعرض الكامل ── */}
      <section id="work" className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel>{nd.showcase.label}</SectionLabel>
              </Reveal>
              <MaskLines lines={nd.showcase.title} as="h2" className="h2 mt-8" accentDot />
            </div>
            <Reveal className="lg:col-span-5">
              <p className="body max-w-[44ch]">{nd.showcase.intro}</p>
            </Reveal>
          </div>
          <Reveal className="mt-10">
            <Showcase onOpen={open} />
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <BookLink placement="offer_showcase">{nd.hero.primary}</BookLink>
            <Scarcity />
          </Reveal>
        </Wrap>
      </section>

      {/* ── كيف نعمل ── */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{nd.steps.label}</SectionLabel>
          </Reveal>
          <MaskLines lines={nd.steps.title} as="h2" className="h2 mt-8 max-w-[24ch]" accentDot />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nd.steps.list.map((s, i) => (
              <Reveal key={s.no} as="li" delay={i * 80} className="relative rounded-[22px] border border-[var(--line)] p-7">
                <span className="grid size-11 place-items-center rounded-full bg-ink text-[15px] font-semibold text-paper">
                  <span className="ltr nums">{s.no}</span>
                </span>
                <h3 className="mt-6 text-[20px] font-semibold">{s.title}</h3>
                <p className="body mt-3">{s.desc}</p>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* ── من نحن ── */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionLabel>{nd.about.label}</SectionLabel>
              </Reveal>
              <MaskLines lines={nd.about.title} as="h2" className="h2 mt-8" accentDot />
              <Reveal delay={120}>
                <p className="body mt-6 max-w-[52ch]">{nd.about.body}</p>
                <button
                  type="button"
                  onClick={() => askVideo("intro", "offer_about_watch")}
                  className="group mt-8 inline-flex items-center gap-3 rounded-pill border border-[var(--line-strong)] py-2 ps-2 pe-6 text-[15px] font-medium transition-colors duration-(--dur-fast) hover:border-ink"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-paper">
                    <svg viewBox="0 0 24 24" className="ms-0.5 size-4" fill="currentColor" aria-hidden="true">
                      <path d="M7 4.5v15l13-7.5z" />
                    </svg>
                  </span>
                  {nd.about.watch}
                </button>
              </Reveal>
            </div>
            <ul className="grid grid-cols-2 gap-4 lg:col-span-6">
              {about.stats.map((s, i) => (
                <Reveal key={s.label.ar} as="li" delay={i * 70} className="rounded-[22px] border border-[var(--line)] bg-paper p-7">
                  <Counter to={s.value} suffix={s.suffix} className="text-[clamp(2.4rem,4.4vw,3.4rem)] font-semibold leading-none" />
                  <p className="mt-3 text-[15px] text-ink/60">{s.label.ar}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Wrap>
      </section>

      {/* ── الأسئلة ── */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel>{nd.faqLabel}</SectionLabel>
              </Reveal>
              <MaskLines lines={nd.faqTitle} as="h2" className="h2 mt-8" accentDot />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={nd.faq} />
            </div>
          </div>
        </Wrap>
      </section>

      {/* ── الخاتمة: الحجز مرّة ثانية ── */}
      <section className="bg-ink pt-20 pb-32 text-paper sm:py-28 lg:pb-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionLabel tone="paper">{nd.closing.label}</SectionLabel>
              </Reveal>
              <MaskLines lines={nd.closing.title} as="h2" className="h2 mt-8" accentDot />
              <Reveal delay={120}>
                <ul className="mt-9 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {nd.included.map((r) => (
                    <li key={r} className="flex items-center gap-3 text-[16px] font-medium">
                      <Check />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <Price tone="paper" />
                </div>
                <div className="mt-6">
                  <Scarcity tone="paper" />
                </div>
              </Reveal>
            </div>
            <Reveal delay={160} className="lg:col-span-6">
              <div id="book-end" className="rounded-[24px] border border-paper/15 bg-paper/[0.04] p-6 sm:p-9">
                <p className="text-[28px] font-semibold leading-snug sm:text-[32px]">
                  {nd.form.title}
                  <span className="text-red">.</span>
                </p>
                <p className="mt-1.5 text-[15px] text-paper/60">{nd.form.intro}</p>
                <div className="mt-7">
                  <OfferForm placement="offer_closing" tone="paper" />
                </div>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      <StickyBar />

      {box && (
        <Lightbox
          shots={box.shots}
          at={box.at}
          onClose={() => setBox(null)}
          onMove={(i) => setBox((b) => (b ? { ...b, at: i } : b))}
          name={box.shots[box.at]?.label ?? ""}
        />
      )}
    </>
  );
}
