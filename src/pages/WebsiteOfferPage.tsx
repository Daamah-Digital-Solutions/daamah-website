import { useEffect, useRef, useState, type ReactNode } from "react";
import { film } from "../content/home";
import { workItems } from "../content/work";
import { galleries } from "../content/gallery";
import {
  WO_CURRENCY,
  WO_PRICE,
  WO_SAVE,
  WO_WAS,
  websiteOffer as wo,
  type IconKey,
  type SiteSlide,
} from "../content/websiteOffer";
import { waHref, waMessage } from "../content/whatsapp";
import { track } from "../analytics";
import { Img } from "../components/Img";
import { FaqList } from "../components/FaqList";
import { Lightbox, type LightboxShot } from "../components/Lightbox";
import { WhatsAppMark } from "../components/WhatsAppFab";
import { Chevron, MaskLines, PlayMark, Reveal, SectionLabel, Wrap } from "../components/ui";

const OFFER = "website_offer";
const WA = waMessage.websiteOffer.ar;
const GALLERY_WIDTHS = [480, 960];

/* ── الصور: من معرض العمل ───────────────────────────────── */

function shotOf(slug: string, n: number): LightboxShot | null {
  const s = galleries[slug]?.[n - 1];
  if (!s) return null;
  return { src: s.src, w: s.w, h: s.h, label: workItems.find((w) => w.slug === slug)?.name.ar ?? "" };
}

/** معرض المشروع كاملًا — يُفتح في العارض عند الضغط على الموقع */
const projectShots = (slug: string) =>
  (galleries[slug] ?? []).map((_, i) => shotOf(slug, i + 1)).filter((s): s is LightboxShot => !!s);

type Box = { shots: LightboxShot[]; at: number } | null;
type OpenBox = (shots: LightboxShot[], at: number, placement: string) => void;

/* ── قطع صغيرة ─────────────────────────────────────────── */

function Badge() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-pill border border-saudi/40 px-4 py-2 text-[14px] font-medium text-saudi">
      <span className="size-2 rounded-full bg-saudi" />
      {wo.badge} <span className="ltr nums">96</span>
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

function Clock({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 text-red`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function Price({ size = "lg", tone = "ink" }: { size?: "lg" | "md"; tone?: "ink" | "paper" }) {
  return (
    <span className={`inline-flex items-baseline gap-3 ${tone === "paper" ? "text-paper" : "text-ink"}`}>
      <span className={`ltr nums font-semibold leading-none ${size === "lg" ? "text-[clamp(3.6rem,7.4vw,6rem)]" : "text-[48px]"}`}>{WO_PRICE}</span>
      <span className={`font-semibold ${size === "lg" ? "text-[26px]" : "text-[20px]"}`}>{WO_CURRENCY}</span>
    </span>
  );
}

/** السعر القديم مشطوبًا والتوفير */
function WasSave({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className={`text-[16px] ${tone === "paper" ? "text-paper/55" : "text-ink/55"}`}>
        {wo.hero.was}{" "}
        <span className="line-through decoration-red decoration-2">
          <span className="ltr nums">{WO_WAS}</span> {WO_CURRENCY}
        </span>
      </span>
      <span className="rounded-pill bg-red px-3.5 py-1 text-[14px] font-semibold text-white">
        {wo.hero.save} <span className="ltr nums">{WO_SAVE}</span> {WO_CURRENCY}
      </span>
    </span>
  );
}

function Scarcity({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <p className={`flex items-center gap-3 text-[15px] font-medium ${tone === "paper" ? "text-paper/80" : "text-ink/75"}`}>
      <span className="relative flex size-2.5 shrink-0">
        <span className="absolute inset-0 animate-ping rounded-full bg-red opacity-60 motion-reduce:hidden" />
        <span className="relative size-2.5 rounded-full bg-red" />
      </span>
      {wo.scarcity}
    </p>
  );
}

/** زرّ البدء — يفتح واتساب مباشرة، فلا نموذج في هذه الصفحة */
function StartLink({ placement, children, tone = "ink", className = "" }: { placement: string; children: ReactNode; tone?: "ink" | "paper"; className?: string }) {
  return (
    <a
      href={waHref(WA)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { placement, offer: OFFER })}
      className={`btn group inline-flex items-center justify-center rounded-pill px-8 py-4 text-[16px] font-semibold ${
        tone === "paper" ? "bg-paper text-ink hover:text-white" : "bg-ink text-paper hover:text-white"
      } [--btn-fill:var(--color-red)] ${className}`}
    >
      <span className="inline-flex items-center gap-2.5">
        <WhatsAppMark className="size-5" />
        {children}
      </span>
    </a>
  );
}

/** عنوان القسم — عنوان العرض نفسه، بلا عنوان فرعي */
function Heading({ children }: { children: string }) {
  return <MaskLines lines={[children]} as="h2" className="h2" accentDot />;
}

/* ── أيقونات البنود — مرسومة لا محمّلة، فتتبع لون النص ── */
const ICON: Record<IconKey, ReactNode> = {
  lang: <path d="M3 5h9M7.5 3v2M5 5c.7 3.2 3 6 6 7.5M10 5c-.8 3.5-3.4 6.4-6.5 8M13 21l4-9 4 9M14.3 18h5.4" />,
  pen: <path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" />,
  pages: <path d="M8 3h8l4 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM16 3v4h4M4 7v12a2 2 0 0 0 2 2h10" />,
  devices: <path d="M3 5h14v9H3zM1 17h11M19 9h3v11h-5V9h2z" />,
  domain: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />,
  mail: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  lock: <path d="M6 11h12v10H6zM8.5 11V7.5a3.5 3.5 0 0 1 7 0V11M12 15v2.5" />,
  whatsapp: <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20zM9.2 8.5c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.6.7c.6 1.1 1.5 2 2.6 2.6l.7-.6c.2-.1.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .6-.5.8-.6.3-1.6.4-3.3-.4a8.6 8.6 0 0 1-3.6-3.6c-.8-1.7-.7-2.7-.4-3.3z" />,
  pin: <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
};

function Icon({ k }: { k: IconKey }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON[k]}
    </svg>
  );
}

/* ── الشريط العلوي: الشعار والبدء فقط ─────────────────── */
function TopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 border-b border-[var(--line)] bg-paper/90 backdrop-blur-md">
      <Wrap className="flex h-16 items-center justify-between gap-4">
        {/* الشعار ليس رابطًا: صفحة إعلان لا يُخرج منها شيء */}
        <span className="shrink-0">
          <img src="/assets/logo-wordmark.png" alt="دَعمة للحلول الرقمية" width={2035} height={544} className="h-[20px] w-auto" />
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden text-[14px] text-ink/60 md:inline">
            <span className="ltr nums font-semibold text-ink">{WO_PRICE}</span> {WO_CURRENCY} ·{" "}
            <span className="ltr nums line-through decoration-red">{WO_WAS}</span>
          </span>
          <a
            href={waHref(WA)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { placement: "wo_topbar", offer: OFFER })}
            className="btn inline-flex items-center rounded-pill bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper hover:text-white [--btn-fill:var(--color-red)]"
          >
            <span className="inline-flex items-center gap-2">
              <WhatsAppMark className="size-4" />
              {wo.topCta}
            </span>
          </a>
        </div>
      </Wrap>
    </div>
  );
}

/* ── الفيديو التعريفي: من نحن قبل أي تفاصيل ─────────────── */
function IntroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <div>
      <p className="flex items-center gap-2.5 text-[14px] font-medium text-ink/60">
        <span className="size-1.5 rounded-full bg-red" />
        {wo.video}
      </p>
      {/* الإطار حبريّ: ريثما تُفكّ أوّل لقطة لا يومض بياض مكان الصورة */}
      <div className="relative mt-4 aspect-video overflow-hidden rounded-[20px] bg-ink shadow-[0_40px_90px_-50px_rgba(11,11,13,0.45)]">
        <video ref={ref} src={film.src.ar} poster={film.poster.ar} preload="none" playsInline controls={playing} className="size-full object-cover" />
        {!playing && (
          <button
            type="button"
            aria-label={film.play.ar}
            onClick={() => {
              setPlaying(true);
              track("cta_click", { placement: "wo_intro_film", offer: OFFER });
              void ref.current?.play();
            }}
            className="group absolute inset-0 grid place-items-center bg-ink/10 transition-colors duration-(--dur-base) hover:bg-ink/25"
          >
            <PlayMark />
          </button>
        )}
      </div>
      <p className="mt-3 text-[13.5px] text-ink/50">{film.note.ar}</p>
    </div>
  );
}

/* ── موقع حقيقي في إطار متصفّح + لقطة الجوال فوقه ─────── */
function Device({ slide, onOpen, sizes }: { slide: SiteSlide; onOpen: OpenBox; sizes: string }) {
  const d = shotOf(slide.slug, slide.desktop);
  const p = shotOf(slide.slug, slide.phone);
  if (!d) return null;
  return (
    <button
      type="button"
      onClick={() => onOpen(projectShots(slide.slug), slide.desktop - 1, "wo_slider")}
      aria-label={`${d.label} — عرض بالحجم الكامل`}
      className="group relative block w-full pb-[9%] text-start"
    >
      {/* إطار المتصفّح داكن: الموقع فاتح، وإطار فاتح يذيب حافّته */}
      <span className="block overflow-hidden rounded-[14px] bg-[#17171a] shadow-[0_40px_80px_-40px_rgba(11,11,13,0.55)] ring-1 ring-black/5">
        <span dir="ltr" className="flex h-7 items-center gap-1.5 px-3">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-2 rounded-full opacity-80" style={{ background: c }} />
          ))}
        </span>
        <span className="block aspect-[16/10] overflow-hidden bg-paper-3">
          <Img
            src={d.src}
            alt={d.label ?? ""}
            width={d.w}
            height={d.h}
            sizes={sizes}
            widths={GALLERY_WIDTHS}
            className="size-full object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.03]"
          />
        </span>
      </span>
      {p && (
        <span className="absolute bottom-0 end-[5%] block w-[22%] drop-shadow-[0_24px_30px_rgba(11,11,13,0.35)]">
          <Img src={p.src} alt="" width={p.w} height={p.h} sizes="160px" widths={[320]} className="h-auto w-full rounded-[18px]" />
        </span>
      )}
      <span className="mt-4 flex items-center gap-2 text-[15px] font-medium text-ink/70">
        <Chevron className="h-2.5 w-auto text-red" />
        {d.label}
      </span>
    </button>
  );
}

/* ── سلايدر المواقع: سحب بالإصبع، وأسهم ونقاط ───────────── */
function SiteSlider({ onOpen }: { onOpen: OpenBox }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const slides = wo.sites.list;

  /* حافّة البداية داخل الشريط: يمينه في الصفحة العربية، بعد الحشوة */
  const startEdge = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(el).paddingRight) || 0;
    return r.right - pad;
  };

  /* الشريحة الحالية = الأقرب إلى حافّة البداية. «الأكثر ظهورًا» يخطئ على
     الكمبيوتر حيث تظهر شريحتان كاملتان، فيقفز السهم شريحتين */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const edge = startEdge(el);
        let best = 0;
        let min = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const d = Math.abs(c.getBoundingClientRect().right - edge);
          if (d < min) {
            min = d;
            best = i;
          }
        });
        /* آخر الشريط: الشريحة الأخيرة لا تصل إلى حافّة البداية على
           الشاشات العريضة، فنهاية التمرير تعني أنها الحالية */
        const atEnd = Math.abs(el.scrollLeft) + el.clientWidth >= el.scrollWidth - 4;
        setAt(atEnd ? el.children.length - 1 : best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* يحرّك الشريط وحده — scrollIntoView كان يحرّك الصفحة أيضًا */
  const go = (i: number) => {
    const el = trackRef.current;
    const n = Math.max(0, Math.min(slides.length - 1, i));
    const child = el?.children[n] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollBy({ left: child.getBoundingClientRect().right - startEdge(el), behavior: "smooth" });
    track("cta_click", { placement: "wo_slider_nav", offer: OFFER });
  };

  /* الأسهم تتحرّك شريحةً واحدة بعرضها — تعمل حتى قرب نهاية الشريط حيث
     لا تصل الشريحة إلى الحافّة. التالي في الصفحة العربية نحو اليسار */
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: -dir * (first.offsetWidth + gap), behavior: "smooth" });
    track("cta_click", { placement: "wo_slider_nav", offer: OFFER });
  };

  const arrow =
    "grid size-12 place-items-center rounded-full border border-[var(--line-strong)] text-ink transition-colors duration-(--dur-fast) hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <div
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pt-2 pb-4 [scrollbar-width:none] sm:-mx-10 sm:gap-8 sm:scroll-px-10 sm:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <div key={s.slug} data-i={i} className="w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[46%]">
            <Device slide={s} onOpen={onOpen} sizes="(min-width: 1024px) 46vw, (min-width: 640px) 62vw, 86vw" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="tablist" aria-label={wo.sites.title}>
          {slides.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              role="tab"
              aria-selected={at === i}
              aria-label={`${i + 1}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-[width,background-color] duration-(--dur-base) ${at === i ? "w-7 bg-ink" : "w-2 bg-ink/20 hover:bg-ink/40"}`}
            />
          ))}
        </div>
        {/* في الصفحة العربية «السابق» يمينًا وسهمه لليمين، و«التالي» يسارًا */}
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={at === 0} aria-label={wo.sites.prev} className={arrow}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <button type="button" onClick={() => step(1)} disabled={at === slides.length - 1} aria-label={wo.sites.next} className={arrow}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
        </div>
      </div>
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
    const targets = ["start", "start-end"].map((id) => document.getElementById(id)).filter((x): x is HTMLElement => !!x);
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
        <p className="flex flex-1 items-baseline gap-2">
          <span className="text-[20px] font-semibold">
            <span className="ltr nums">{WO_PRICE}</span> {WO_CURRENCY}
          </span>
          <span className="ltr nums text-[13px] text-ink/40 line-through decoration-red">{WO_WAS}</span>
        </p>
        <a
          href={waHref(WA)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? undefined : -1}
          onClick={() => track("whatsapp_click", { placement: "wo_sticky", offer: OFFER })}
          className="btn inline-flex items-center rounded-pill bg-ink px-6 py-3.5 text-[15px] font-semibold text-paper hover:text-white [--btn-fill:var(--color-red)]"
        >
          <span className="inline-flex items-center gap-2">
            <WhatsAppMark className="size-[18px]" />
            {wo.sticky.cta}
          </span>
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   الصفحة
   ═══════════════════════════════════════════════════════════ */

/**
 * صفحة هبوط «موقع شركتك الاحترافي» — عرض اليوم الوطني، للإعلان وحده.
 *
 * بلا نموذج: الزائر ملأ نموذج الإعلان وتواصل على واتساب قبل أن يصله
 * هذا الرابط، فكل زرّ هنا يعيده إلى المحادثة. تُعرض فاتحة دائمًا.
 *
 * الأقسام أقسام العرض نفسه وبعناوينه، لا أكثر: العرض والسعر وبجانبه
 * الفيلم التعريفي (من نحن قبل السعر)، ثم سلايدر مواقع حقيقية، ثم لماذا
 * موقع، وماذا تحصل عليه، والضمان، وكيف نعمل، والدفع وما نحتاجه منك،
 * والأسئلة، والختام.
 */
export function WebsiteOfferPage() {
  const [box, setBox] = useState<Box>(null);
  const open: OpenBox = (shots, at, placement) => {
    setBox({ shots, at });
    track("cta_click", { placement: `${placement}_open`, offer: OFFER });
  };

  return (
    <>
      <TopBar />

      {/* ── الهيرو: العرض + الفيلم التعريفي ── */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-24">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal eager>
                <Badge />
              </Reveal>
              <MaskLines lines={wo.hero.title} className="mt-7 text-[clamp(2.2rem,4.3vw,3.9rem)] font-semibold leading-[1.3]" accentDot eager />

              <Reveal delay={140} eager>
                <div className="mt-8 flex flex-wrap items-end gap-x-7 gap-y-4">
                  <Price />
                  <div className="flex flex-col gap-2.5 pb-2">
                    <WasSave />
                    <p className="flex items-center gap-2 text-[15px] font-medium text-ink/70">
                      <Clock />
                      {wo.hero.delivery}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={220} eager>
                <p className="mt-8 max-w-[54ch] text-[17px] leading-[2] text-ink/70 sm:text-[18px]">{wo.hero.intro}</p>
                <div id="start" className="mt-9">
                  <StartLink placement="wo_hero">{wo.hero.primary}</StartLink>
                </div>
                <div className="mt-6">
                  <Scarcity />
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} eager className="lg:col-span-5 lg:pt-14">
              <IntroVideo />
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ── سلايدر مواقع حقيقية ── */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Heading>{wo.sites.title}</Heading>
          <Reveal className="mt-12">
            <SiteSlider onOpen={open} />
          </Reveal>
        </Wrap>
      </section>

      {/* ── لماذا تحتاج موقعًا ── */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Heading>{wo.why.title}</Heading>
            </div>
            <Reveal delay={100} className="lg:col-span-7">
              <p className="text-[19px] leading-[2] text-ink/75 sm:text-[21px]">{wo.why.body}</p>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ── ماذا تحصل عليه ── */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Heading>{wo.included.title}</Heading>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {wo.included.list.map((it, i) => (
              <Reveal key={it.title} as="li" delay={(i % 5) * 60} className="flex flex-col rounded-[20px] border border-[var(--line)] bg-paper p-6">
                <span className="grid size-12 place-items-center rounded-[14px] bg-ink text-paper">
                  <Icon k={it.icon} />
                </span>
                <h3 className="mt-5 text-[17.5px] font-semibold leading-snug">{it.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.85] text-ink/65">{it.body}</p>
              </Reveal>
            ))}
          </ul>

          {/* بعد البنود مباشرة: كل هذا بهذا السعر، والبدء */}
          <Reveal className="mt-10 flex flex-col gap-6 rounded-[24px] bg-ink p-7 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Price size="md" tone="paper" />
              <WasSave tone="paper" />
            </div>
            <StartLink placement="wo_included" tone="paper">
              {wo.hero.primary}
            </StartLink>
          </Reveal>
        </Wrap>
      </section>

      {/* ── الضمان ── */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="rounded-[28px] border-2 border-ink p-8 sm:p-12">
            <Reveal>
              <SectionLabel>{wo.guarantee.label}</SectionLabel>
            </Reveal>
            <div className="mt-8">
              <Heading>{wo.guarantee.title}</Heading>
            </div>
            <Reveal delay={120}>
              <p className="mt-6 max-w-[62ch] text-[18px] leading-[2] text-ink/75">{wo.guarantee.body}</p>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ── كيف نعمل ── */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Heading>{wo.steps.title}</Heading>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wo.steps.list.map((s, i) => (
              <Reveal key={s.title} as="li" delay={(i % 3) * 80} className="rounded-[22px] border border-[var(--line)] bg-paper p-7">
                <span className="grid size-11 place-items-center rounded-full bg-ink text-[15px] font-semibold text-paper">
                  <span className="ltr nums">{i + 1}</span>
                </span>
                <h3 className="mt-6 text-[20px] font-semibold">{s.title}</h3>
                <p className="body mt-2.5">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-8">
            <p className="inline-flex items-center gap-3 rounded-pill border border-[var(--line-strong)] bg-paper px-5 py-3 text-[15.5px] font-medium">
              <Clock className="size-5" />
              {wo.steps.duration}
            </p>
          </Reveal>
        </Wrap>
      </section>

      {/* ── طريقة الدفع + ما نحتاجه منك ── */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <Heading>{wo.payment.title}</Heading>
              <Reveal delay={100}>
                <p className="body mt-6 max-w-[52ch]">{wo.payment.body}</p>
              </Reveal>
              <ul className="mt-6 border-t border-[var(--line)]">
                {wo.payment.promises.map((p, i) => (
                  <Reveal key={p} as="li" delay={i * 70} className="flex items-start gap-4 border-b border-[var(--line)] py-5">
                    <Check className="mt-1" />
                    <span className="text-[17px] leading-[1.8]">{p}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <Heading>{wo.needs.title}</Heading>
              <ol className="mt-8 border-t border-[var(--line)]">
                {wo.needs.list.map((n, i) => (
                  <Reveal key={n} as="li" delay={i * 60} className="flex items-start gap-5 border-b border-[var(--line)] py-5">
                    <span className="ltr nums mt-0.5 text-[15px] font-semibold text-red">0{i + 1}</span>
                    <span className="text-[17px] leading-[1.8]">{n}</span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ── الأسئلة ── */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Heading>{wo.faqTitle}</Heading>
            </div>
            <div className="lg:col-span-8">
              <FaqList items={wo.faq} />
            </div>
          </div>
        </Wrap>
      </section>

      {/* ── الختام ── */}
      <section className="bg-ink pt-20 pb-32 text-paper sm:py-28 lg:pb-28">
        <Wrap>
          <MaskLines lines={wo.closing.title} as="h2" className="h2 max-w-[24ch]" accentDot />
          <Reveal delay={120}>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[2] text-paper/75">{wo.closing.sub}</p>
            <div className="mt-7">
              <Scarcity tone="paper" />
            </div>
            <div id="start-end" className="mt-9">
              <StartLink placement="wo_closing" tone="paper">
                {wo.closing.whatsapp}
              </StartLink>
            </div>
            <p className="mt-12 text-[13.5px] text-paper/45">{wo.closing.sign}</p>
          </Reveal>
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
