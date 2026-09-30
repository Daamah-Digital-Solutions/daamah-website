import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "../content/home";
import { waHref } from "../content/whatsapp";
import { WhatsAppMark } from "../components/WhatsAppFab";
import { launchDeck as deck } from "../content/launchDeck";
import { track } from "../analytics";

type PdfPage = import("pdfjs-dist/types/src/display/api").PDFPageProxy;
type PdfDoc = import("pdfjs-dist/types/src/display/api").PDFDocumentProxy;
type LinkBox = { url: string; left: number; top: number; width: number; height: number };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * أقصى عرض تُرسم به الصفحة، بالبكسل الفعلي.
 *
 * دقّة الشاشة وحدها تكفي للنظر، لكن التكبير بالأصابع على الجوال
 * يمطّ ما رُسم فيبهت. فنرسم أكبر من الشاشة بنصفها، وسقفنا ضعف عرض
 * الصفحة الأصلي — أكثر منه لا يراه أحد ويستهلك ذاكرة الجوال.
 */
const MAX_PX = deck.width * 2;

/**
 * صفحة واحدة: معاينة خفيفة فورًا، ثم الصفحة مرسومة من الملف الأصلي
 * حين تقترب من الشاشة، وتُحرَّر ذاكرتها حين تبتعد كثيرًا.
 */
function DeckSheet({ n, doc }: { n: number; doc: PdfDoc | null }) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [links, setLinks] = useState<LinkBox[]>([]);

  useEffect(() => {
    if (!doc || !box.current || !canvas.current) return;
    const el = box.current;
    const cv = canvas.current;
    let page: PdfPage | null = null;
    let task: { cancel: () => void; promise: Promise<void> } | null = null;
    let drawnAt = 0;
    let linked = false;
    let alive = true;

    const draw = async () => {
      const target = Math.min(MAX_PX, Math.round(el.clientWidth * (window.devicePixelRatio || 1) * 1.5));
      if (Math.abs(target - drawnAt) < 64) return;
      page ??= await doc.getPage(n);
      if (!alive) return;

      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: target / base.width });
      /* لوحة جانبية ثم نسخ: الرسم فوق اللوحة الظاهرة يمسحها أولًا فيومض */
      const off = document.createElement("canvas");
      off.width = Math.round(viewport.width);
      off.height = Math.round(viewport.height);
      task?.cancel();
      task = page.render({ canvas: off, viewport });
      try {
        await task.promise;
      } catch {
        return; // أُلغي لأن الصفحة ابتعدت أو تغيّر العرض
      }
      if (!alive) return;
      cv.width = off.width;
      cv.height = off.height;
      cv.getContext("2d")?.drawImage(off, 0, 0);
      off.width = off.height = 0;
      drawnAt = target;
      setDrawn(true);

      /* روابط الملف (واتساب، البريد، الموقع) تبقى قابلة للضغط كما في الأصل */
      if (!linked) {
        linked = true;
        const notes = await page.getAnnotations({ intent: "display" });
        const found: LinkBox[] = [];
        for (const a of notes) {
          if (a.subtype !== "Link" || !a.url) continue;
          const [x1, y1] = base.convertToViewportPoint(a.rect[0], a.rect[1]);
          const [x2, y2] = base.convertToViewportPoint(a.rect[2], a.rect[3]);
          found.push({
            url: a.url,
            left: (Math.min(x1, x2) / base.width) * 100,
            top: (Math.min(y1, y2) / base.height) * 100,
            width: (Math.abs(x2 - x1) / base.width) * 100,
            height: (Math.abs(y2 - y1) / base.height) * 100,
          });
        }
        if (alive) setLinks(found);
      }
    };

    const release = () => {
      task?.cancel();
      cv.width = cv.height = 0;
      drawnAt = 0;
      setDrawn(false);
    };

    /* قريبة: تُرسم. بعيدة جدًا: تُحرَّر. بينهما تبقى كما هي */
    const near = new IntersectionObserver(([e]) => e.isIntersecting && draw(), { rootMargin: "120% 0px" });
    const far = new IntersectionObserver(([e]) => !e.isIntersecting && drawnAt && release(), {
      rootMargin: "400% 0px",
    });
    near.observe(el);
    far.observe(el);

    let t = 0;
    const onResize = () => {
      clearTimeout(t);
      t = window.setTimeout(() => {
        const r = el.getBoundingClientRect();
        if (r.bottom > -innerHeight && r.top < innerHeight * 2) draw();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      near.disconnect();
      far.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
      task?.cancel();
      page?.cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, n]);

  return (
    <div
      ref={box}
      className="relative w-full overflow-hidden rounded-[6px] bg-white/[0.04] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] sm:rounded-[10px]"
      style={{ aspectRatio: `${deck.width} / ${deck.height}` }}
    >
      <img
        src={`${deck.previews}/${pad(n)}.webp`}
        alt={`${deck.title} — صفحة ${n}`}
        width={960}
        height={540}
        loading={n <= 2 ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 size-full"
      />
      <canvas
        ref={canvas}
        aria-hidden="true"
        className={`absolute inset-0 size-full transition-opacity duration-300 ${drawn ? "opacity-100" : "opacity-0"}`}
      />
      {links.map((l) => (
        <a
          key={`${l.url}-${l.left}-${l.top}`}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.url.startsWith("https://wa.me") ? "واتساب" : l.url.replace(/^(mailto:|https?:\/\/)/, "")}
          onClick={() => l.url.startsWith("https://wa.me") && track("whatsapp_click", { placement: "deck" })}
          className="absolute"
          style={{ left: `${l.left}%`, top: `${l.top}%`, width: `${l.width}%`, height: `${l.height}%` }}
        />
      ))}
    </div>
  );
}

/**
 * «باقة الانطلاق الرقمي» — العرض كاملًا كما صُمّم.
 *
 * pdf.js يُحمَّل هنا وحدها وبعد الرسم الأوّل: بقيّة الموقع لا تدفع
 * وزنه، والصفحة تظهر بمعايناتها قبل أن يصل.
 */
export function DeckPage() {
  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [cta, setCta] = useState(false);

  /* زرّ الطلب يظهر بعد الغلاف، ويختفي عند آخر صفحة: فيها زرّ واتساب
     خاصّ بها، وزرّان فوق بعضهما يتنافسان على الإبهام نفسه */
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const y = window.scrollY;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      setCta(y > window.innerHeight * 0.4 && y < end - window.innerHeight * 0.45);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    let loading: { destroy: () => Promise<void> } | null = null;
    (async () => {
      const [pdfjs, worker] = await Promise.all([
        import("pdfjs-dist/legacy/build/pdf.mjs"),
        import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url"),
      ]);
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      const task = pdfjs.getDocument({ url: deck.file });
      loading = task;
      if (!alive) return void task.destroy();
      const loaded = await task.promise;
      if (alive) setDoc(loaded);
    })().catch(() => {
      /* بلا رسم: تبقى المعاينات، والملف الأصلي في زرّ التحميل */
    });
    return () => {
      alive = false;
      loading?.destroy();
    };
  }, []);

  return (
    <div className="min-h-dvh bg-[#101012] text-[#edebe7]">
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between gap-4 px-4 sm:h-16 sm:px-8">
          <Link to="/" aria-label={brand.name.ar} className="shrink-0 transition-opacity duration-300 hover:opacity-60">
            <img
              src="/assets/logo-wordmark-light.png"
              alt={brand.name.ar}
              width={2035}
              height={544}
              className="h-[17px] w-auto sm:h-[19px]"
            />
          </Link>
          <h1 className="truncate text-[14px] font-semibold sm:text-[15px]">{deck.title}</h1>
          <a
            href={deck.file}
            download={deck.downloadName}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#edebe7] px-3.5 py-2 text-[13px] font-bold leading-none text-[#101012] transition-opacity duration-300 hover:opacity-80 sm:px-4"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">{deck.download}</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-2.5 px-2 py-3 sm:gap-6 sm:px-8 sm:py-8">
        {Array.from({ length: deck.pages }, (_, i) => (
          <DeckSheet key={i} n={i + 1} doc={doc} />
        ))}
      </div>

      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-[max(16px,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          cta ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <a
          href={waHref(deck.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={cta ? 0 : -1}
          aria-hidden={!cta}
          onClick={() => track("whatsapp_click", { placement: "deck_cta" })}
          className={`inline-flex items-center gap-2.5 rounded-full bg-[#25d366] px-6 py-3.5 text-[15px] font-bold leading-none text-[#0b0b0d] shadow-[0_18px_40px_-12px_rgba(37,211,102,0.5)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] sm:px-7 sm:py-4 sm:text-[16px] ${
            cta ? "pointer-events-auto" : ""
          }`}
        >
          <WhatsAppMark className="size-5" />
          {deck.cta}
        </a>
      </div>
    </div>
  );
}
