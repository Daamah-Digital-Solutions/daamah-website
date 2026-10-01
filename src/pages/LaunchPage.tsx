import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { brand, phoneFor } from "../content/home";
import { launchDeck } from "../content/launchDeck";
import { LAUNCH_PAY_URL, launch as L, launchWa, type IconKey } from "../content/launchOffer";
import { track } from "../analytics";
import { utm } from "../utm";
import { WhatsAppMark } from "../components/WhatsAppFab";

/* ── روابط ───────────────────────────────────────────────────────── */

/**
 * رابط الدفع ومعه مصدر الزيارة: وسوم utm يقرؤها Stripe ويحفظها مع
 * الدفعة، و`gclid` في `client_reference_id` — فتُنسب كل دفعة إلى
 * حملتها من لوحة المزوّد. بلا رابط دفع بعد: واتساب برسالة حجز.
 */
function payHref(): string {
  if (!LAUNCH_PAY_URL) return launchWa(L.wa.book);
  try {
    const url = new URL(LAUNCH_PAY_URL);
    const t = utm();
    const tags: [string, string | undefined][] = [
      ["utm_source", t.source ?? (t.gclid ? "google" : undefined)],
      ["utm_medium", t.medium ?? (t.gclid ? "cpc" : undefined)],
      ["utm_campaign", t.campaign],
      ["utm_term", t.term],
      ["utm_content", t.content],
    ];
    for (const [k, v] of tags) if (v) url.searchParams.set(k, v);
    /* Stripe يقبل حروفًا وأرقامًا و`-` و`_` حتى 200 حرف */
    if (t.gclid && url.hostname.endsWith("stripe.com")) {
      url.searchParams.set("client_reference_id", t.gclid.replace(/[^\w-]/g, "").slice(0, 200));
    }
    return url.toString();
  } catch {
    return LAUNCH_PAY_URL;
  }
}

/* ── أزرار ───────────────────────────────────────────────────────── */

function BookButton({ placement, className = "" }: { placement: string; className?: string }) {
  /* الرابط يُبنى عند الضغط: مصدر الزيارة يُلتقط بعد الرسم الأوّل */
  return (
    <a
      href={LAUNCH_PAY_URL || launchWa(L.wa.book, false)}
      target={LAUNCH_PAY_URL ? undefined : "_blank"}
      rel={LAUNCH_PAY_URL ? undefined : "noopener noreferrer"}
      onClick={(e) => {
        e.currentTarget.href = payHref();
        track("begin_checkout", { placement, value: 2000, currency: "SAR" });
        if (!LAUNCH_PAY_URL) track("whatsapp_click", { placement: `${placement}_book` });
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-4 text-[16px] font-bold leading-none text-white shadow-[0_16px_36px_-14px_rgba(231,0,0,0.6)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {L.book}
    </a>
  );
}

function AskButton({ placement, className = "" }: { placement: string; className?: string }) {
  return (
    <a
      href={launchWa(L.wa.ask, false)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.currentTarget.href = launchWa(L.wa.ask);
        track("whatsapp_click", { placement });
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line-strong)] bg-paper px-6 py-4 text-[16px] font-bold leading-none text-ink transition-colors duration-300 hover:border-ink ${className}`}
    >
      <WhatsAppMark className="size-[18px] text-[#1faa53]" />
      {L.ask}
    </a>
  );
}

function Buttons({ placement, center = false }: { placement: string; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${center ? "sm:justify-center" : ""}`}>
      <BookButton placement={placement} />
      <AskButton placement={placement} />
    </div>
  );
}

/* ── أيقونات ─────────────────────────────────────────────────────── */

const ICONS: Record<IconKey, ReactNode> = {
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
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="8" width="17" height="4" rx="1" />
      <path d="M5 12v8h14v-8M12 8v12M12 8S10.5 4 8.2 4.4C6.4 4.7 6.6 8 9 8M12 8s1.5-4 3.8-3.6C17.6 4.7 17.4 8 15 8" />
    </>
  ),
};

function Icon({ k }: { k: IconKey }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[k]}
    </svg>
  );
}

/* ── بنية ────────────────────────────────────────────────────────── */

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1180px] px-4 py-14 sm:px-8 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

function Heading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-ink/65">
        <span className="size-1.5 rounded-full bg-red" aria-hidden="true" />
        {label}
      </p>
      <h2 className="text-[clamp(1.75rem,4.6vw,2.75rem)] font-bold leading-[1.2] text-ink">{title}</h2>
    </div>
  );
}

/**
 * «باقة الانطلاق الرقمي» — صفحة هبوط لإعلانات البحث.
 *
 * نصّ حقيقي لا صور: جوجل يقيّم الصفحة ممّا يقرؤه، وتقييمها يحدّد سعر
 * النقرة. أوّل شاشة على الجوال فيها العرض والزرّان معًا، والصور كلّها
 * بعدها وبتحميل متأخّر.
 */
export function LaunchPage() {
  const heroCta = useRef<HTMLDivElement>(null);
  const closing = useRef<HTMLElement>(null);
  const [bar, setBar] = useState(false);

  /* شريط الجوال: يظهر حين يغيب زرّا البداية، ويختفي عند الدعوة
     الأخيرة — فيها الزرّان نفسهما، فلا تكرار فوق بعضهما */
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
      {/* شريط علوي: الشعار وحده — لا قائمة يخرج منها زائرٌ دُفع ثمن وصوله */}
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-4 sm:px-8">
        <Link to="/" aria-label={brand.name.ar} className="transition-opacity duration-300 hover:opacity-60">
          <img src="/assets/logo-wordmark.png" alt={brand.name.ar} width={2035} height={544} className="h-[19px] w-auto dark:hidden" />
          <img
            src="/assets/logo-wordmark-light.png"
            alt=""
            aria-hidden="true"
            width={2035}
            height={544}
            className="hidden h-[19px] w-auto dark:block"
          />
        </Link>
        <a
          href={launchWa(L.wa.ask, false)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.currentTarget.href = launchWa(L.wa.ask);
            track("whatsapp_click", { placement: "launch_top" });
          }}
          className="ltr nums inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink/70 transition-colors hover:text-ink"
        >
          <WhatsAppMark className="size-4 text-[#1faa53]" />
          {phoneFor("sa").display}
        </a>
      </div>

      {/* 1 — البداية */}
      <section className="mx-auto grid w-full max-w-[1180px] items-center gap-8 px-4 pb-12 pt-6 sm:px-8 sm:pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-20">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-[13px] font-semibold text-ink/70">
            <span className="size-1.5 rounded-full bg-red" aria-hidden="true" />
            {L.name}
          </p>
          <h1 className="text-[clamp(2.15rem,8.4vw,4.1rem)] font-bold leading-[1.15] tracking-[-0.01em]">
            {L.hero.title[0]}
            <br />
            {L.hero.title[1]}
            <span className="text-red">.</span>
          </h1>
          <p className="mt-4 max-w-[34rem] text-[17px] leading-[1.75] text-ink/70 sm:text-[19px]">{L.hero.lead}</p>
          <div ref={heroCta} className="mt-7">
            <Buttons placement="launch_hero" />
          </div>
          <p className="mt-5 flex items-center gap-2 text-[13.5px] text-ink/65">
            <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-red" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {L.hero.trust}
          </p>
        </div>
        {/* على الكمبيوتر وحده: بجوار العنوان. على الجوال تنزل إلى قسم
            الباقة — هنا كانت أكبر ما في الشاشة الأولى فصار رسمها هو
            «أكبر رسم» الذي يقيس به جوجل سرعة الصفحة، والعنوان أسبق منها */}
        <figure className="hidden overflow-hidden rounded-[20px] lg:block">
          <picture>
            {/* `source` بشرط العرض: على الجوال لا يطابق، فلا يُطلب الملف أصلًا */}
            <source
              media="(min-width: 1024px)"
              type="image/webp"
              srcSet="/assets/launch/hero-640.webp 640w, /assets/launch/hero-820.webp 820w, /assets/launch/hero-1200.webp 1200w"
              sizes="(min-width: 1180px) 520px, 44vw"
            />
            <img
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              alt={L.hero.imageAlt}
              width={1200}
              height={1112}
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full"
            />
          </picture>
        </figure>
      </section>

      {/* 2 — المشكلة */}
      <div className="bg-ink text-paper">
        <Section>
          <p className="mb-6 flex items-center gap-2 text-[13px] font-semibold text-paper/65">
            <span className="size-1.5 rounded-full bg-red" aria-hidden="true" />
            {L.problem.label}
          </p>
          <div className="space-y-4">
            {L.problem.lines.map((line, i) => (
              <p
                key={line}
                className={`max-w-[44rem] font-bold leading-[1.45] ${
                  i === 2 ? "text-[clamp(1.4rem,3.6vw,2.1rem)] text-paper" : "text-[clamp(1.15rem,2.8vw,1.6rem)] text-paper/75"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </Section>
      </div>

      {/* 3 — وش تحصل عليه */}
      <Section>
        <Heading label={L.includes.label} title={L.includes.title} />
        {/* صورة الباقة على الجوال — مكانها في الكمبيوتر بجوار العنوان */}
        <figure className="mb-6 overflow-hidden rounded-[20px] lg:hidden">
          <img
            src="/assets/launch/hero-640.webp"
            srcSet="/assets/launch/hero-480.webp 480w, /assets/launch/hero-640.webp 640w, /assets/launch/hero-820.webp 820w"
            sizes="calc(100vw - 32px)"
            alt={L.hero.imageAlt}
            width={1200}
            height={1112}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </figure>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {L.includes.items.map((it) => (
            <li
              key={it.text}
              className={`flex items-start gap-4 rounded-[18px] border p-5 sm:p-6 ${
                it.gift ? "border-red/25 bg-red/[0.04]" : "border-[var(--line)] bg-paper-2/60"
              }`}
            >
              <span className={`grid size-11 shrink-0 place-items-center rounded-[12px] ${it.gift ? "bg-red text-white" : "bg-ink text-paper"}`}>
                <Icon k={it.icon} />
              </span>
              <span className="pt-2 text-[16px] font-semibold leading-[1.6]">{it.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4 — كيف نشتغل */}
      <div className="bg-paper-2/70">
        <Section>
          <Heading label={L.steps.label} title={L.steps.title} />
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {L.steps.items.map((s, i) => (
              <li key={s.title} className="rounded-[18px] border border-[var(--line)] bg-paper p-5 sm:p-6">
                <span className="ltr nums mb-4 block text-[13px] font-bold text-red">0{i + 1}</span>
                <h3 className="text-[18px] font-bold">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.7] text-ink/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {/* 5 — من أعمالنا */}
      <Section>
        <Heading label={L.work.label} title={L.work.title} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {L.work.sites.map((s) => {
            const base = `/assets/work/gallery/${s.slug}/${s.shot.n}`;
            const href = s.url ?? `/work/${s.slug}`;
            return (
              <li key={s.slug}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="overflow-hidden rounded-[14px] border border-[var(--line)] bg-paper-2">
                    <picture>
                      <source type="image/webp" srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
                      <img
                        src={`${base}.jpg`}
                        alt={`موقع ${s.name}`}
                        width={s.shot.w}
                        height={s.shot.h}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </picture>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[16px] font-bold">{s.name}</p>
                      <p className="text-[13px] text-ink/60">{s.sector}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-ink/60 transition-colors group-hover:text-red">
                      {L.work.visit}
                      <svg viewBox="0 0 24 24" className="size-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 6 — السعر */}
      <Section id="price">
        <div className="mx-auto max-w-[680px] rounded-[24px] bg-ink p-7 text-center text-paper sm:p-12">
          <p className="text-[14px] font-semibold text-paper/65">{L.name}</p>
          <p className="mt-3 flex items-baseline justify-center gap-2">
            <span className="ltr nums text-[clamp(3.4rem,13vw,5.2rem)] font-bold leading-none">{L.price}</span>
            <span className="text-[22px] font-bold">{L.currency}</span>
          </p>
          <p className="mt-1 text-[14px] text-paper/65">{L.pricing.for}</p>
          <p className="mx-auto mt-6 max-w-[30rem] text-[15px] leading-[1.8] text-paper/80">{L.pricing.summary}</p>
          <ul className="mx-auto mt-6 max-w-[24rem] space-y-2.5 text-start text-[15px]">
            {[L.pricing.guarantee, L.pricing.delivery, L.pricing.scarcity].map((x) => (
              <li key={x} className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" className="mt-1 size-4 shrink-0 text-[#25d366]" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <BookButton placement="launch_price" />
            <AskButton placement="launch_price" className="border-paper/20 bg-transparent text-paper hover:border-paper" />
          </div>
        </div>

        {/* 7 — ما لا تشمله */}
        <div className="mx-auto mt-6 max-w-[680px] rounded-[18px] border border-[var(--line)] p-5 sm:p-6">
          <p className="text-[15px] font-bold">{L.excluded.title}</p>
          <p className="mt-1.5 text-[14.5px] leading-[1.8] text-ink/65">{L.excluded.text}</p>
        </div>
      </Section>

      {/* 8 — أسئلة شائعة: `<details>` أصيل — يعمل قبل وصول جافاسكربت وبلا وزن */}
      <div className="bg-paper-2/70">
        <Section>
          <Heading label={L.faq.label} title={L.faq.title} />
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {L.faq.items.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[var(--line)] text-ink/60 transition-transform duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 text-[15.5px] leading-[1.8] text-ink/70">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>

      {/* 9 — دعوة أخيرة */}
      <section ref={closing} className="mx-auto w-full max-w-[1180px] px-4 py-16 text-center sm:px-8 sm:py-24">
        <h2 className="text-[clamp(1.9rem,5.4vw,3.2rem)] font-bold leading-[1.25]">
          {L.closing.title[0]}
          <br />
          {L.closing.title[1]}
          <span className="text-red">.</span>
        </h2>
        <p className="mt-4 text-[15px] text-ink/65">{L.pricing.scarcity}</p>
        <div className="mt-8">
          <Buttons placement="launch_closing" center />
        </div>
      </section>

      {/* الذيل */}
      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-4 py-8 text-[14px] text-ink/60 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-8">
          <p className="font-bold text-ink">{brand.name.ar}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={`mailto:${brand.email}`} className="ltr hover:text-ink">
              {brand.email}
            </a>
            <a
              href={launchWa(L.wa.ask, false)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.currentTarget.href = launchWa(L.wa.ask);
                track("whatsapp_click", { placement: "launch_footer" });
              }}
              className="ltr nums inline-flex items-center gap-1.5 hover:text-ink"
            >
              <WhatsAppMark className="size-4" />
              {phoneFor("sa").display}
            </a>
            <a
              href={launchDeck.file}
              download={launchDeck.downloadName}
              onClick={() => track("pdf_download", { placement: "launch_footer" })}
              className="hover:text-ink"
            >
              {L.footer.pdf}
            </a>
            <Link to="/privacy" className="hover:text-ink">
              {L.footer.privacy}
            </Link>
          </div>
        </div>
      </footer>

      {/* شريط الجوال الثابت */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-paper/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md transition-transform duration-300 sm:hidden ${
          bar ? "translate-y-0" : "translate-y-full"
        }`}
        /* مخفيّ = خارج التنقّل بلوحة المفاتيح أيضًا، لا عن قارئ الشاشة وحده */
        inert={!bar}
      >
        <div className="grid grid-cols-2 gap-2">
          <BookButton placement="launch_bar" className="px-3 py-3.5 text-[15px]" />
          <AskButton placement="launch_bar" className="px-3 py-3.5 text-[15px]" />
        </div>
      </div>
    </div>
  );
}
