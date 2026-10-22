import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CAL_LINK,
  FP_CURRENCY,
  FP_DEPOSIT,
  FP_LEAD_KEY,
  FP_PRICE,
  FULL_BONUS,
  countries,
  fp,
  fpWa,
  seatsLeft,
  type Choice,
} from "../content/foundingPartners";
import { metaClient, track } from "../analytics";
import { utm } from "../utm";
import { WhatsAppMark } from "./WhatsAppFab";

export const APPLY_EVENT = "daamah:fp-apply";

/** الطلب كما يُحفظ في المتصفح — للعودة إليه من صفحة الدفع */
export type StoredLead = {
  id: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  decision: "accepted" | "out_of_scope" | "waitlist";
  industry: string;
};

export const readLead = (): StoredLead | null => {
  try {
    return JSON.parse(localStorage.getItem(FP_LEAD_KEY) ?? "null");
  } catch {
    return null;
  }
};
const storeLead = (l: StoredLead) => {
  try {
    localStorage.setItem(FP_LEAD_KEY, JSON.stringify(l));
  } catch {
    /* تصفّح خاص — الرحلة تعمل، والعودة من الدفع تبدأ من جديد */
  }
};

type Screen = 0 | 1 | 2 | 3 | "review" | "accepted" | "out_of_scope" | "waitlist" | "error";
const STEP_NAMES = ["industry", "presence", "goal", "details"];
const REVIEW_MS = 3000;

const F = fp.form;
const A = fp.accepted;

/* ── قطع صغيرة ───────────────────────────────────────────────────── */

const primary =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[16px] font-bold leading-none text-paper transition-opacity hover:opacity-85 disabled:opacity-60";
const secondary =
  "inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--line-strong)] px-6 py-4 text-[16px] font-bold leading-none text-ink transition-colors hover:border-ink";
const box = "rounded-[12px] border bg-paper py-3.5 text-[16px] text-ink outline-none transition-colors focus:border-ink";
const input = `${box} w-full px-4`;

function Check({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Options({ items, chosen, onPick }: { items: Choice[]; chosen?: string; onPick: (c: Choice) => void }) {
  return (
    <div className="grid gap-2.5">
      {items.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onPick(c)}
          aria-pressed={chosen === c.id}
          className={`flex min-h-[56px] items-center justify-between gap-3 rounded-[14px] border px-4 py-3.5 text-start text-[16px] font-semibold transition-colors duration-200 ${
            chosen === c.id ? "border-ink bg-ink text-paper" : "border-[var(--line-strong)] hover:border-ink"
          }`}
        >
          {c.label}
          {chosen === c.id && <Check />}
        </button>
      ))}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[14px] font-semibold text-ink/75">{label}</span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-[13.5px] font-semibold text-red">
          {error}
        </span>
      )}
    </label>
  );
}

function WaButton({ href, placement, children }: { href: string; placement: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { placement })}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-4 text-[16px] font-bold leading-none text-[#0b0b0d]"
    >
      <WhatsAppMark className="size-5" />
      {children}
    </a>
  );
}

/* ── التقويم ─────────────────────────────────────────────────────── */

type CalApi = ((...args: unknown[]) => void) & { ns: Record<string, (...args: unknown[]) => void>; loaded?: boolean; q?: unknown[] };
declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/** شيفرة التضمين الرسمية من Cal.com — تُحمَّل عند فتح التقويم وحده */
function loadCal() {
  if (window.Cal) return;
  /* eslint-disable */
  (function (C: any, A: string, L: string) {
    const p = (a: any, ar: any) => a.q.push(ar);
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  /* eslint-enable */
}

/**
 * التقويم داخل الطلب نفسه — لا صفحة خارجية. الاسم والإيميل والرقم
 * من الطلب، فلا يختار العميل إلا الميعاد. ومعرّف الطلب يصل مع الحجز
 * (`metadata[leadId]`) فيُربط به في Cal.com وفي n8n.
 */
function Calendar({ lead, onBooked }: { lead: StoredLead; onBooked: (start?: string, uid?: string) => void }) {
  const done = useRef(onBooked);
  done.current = onBooked;
  useEffect(() => {
    loadCal();
    const Cal = window.Cal!;
    Cal("init", "fp", { origin: "https://cal.com" });
    Cal.ns.fp("inline", {
      elementOrSelector: "#fp-cal",
      calLink: CAL_LINK,
      config: {
        layout: "month_view",
        name: lead.name,
        email: lead.email,
        attendeePhoneNumber: lead.phone,
        notes: lead.company,
        "metadata[leadId]": lead.id,
      },
    });
    Cal.ns.fp("ui", { hideEventTypeDetails: false, layout: "month_view" });
    Cal.ns.fp("on", {
      action: "bookingSuccessfulV2",
      callback: (e: CustomEvent<{ data?: { startTime?: string; uid?: string } }>) =>
        done.current(e.detail?.data?.startTime, e.detail?.data?.uid),
    });
  }, [lead]);
  return (
    <div>
      <p className="text-[15px] font-bold">{A.calTitle}</p>
      <p className="mt-1 text-[13.5px] text-ink/60">{A.calNote}</p>
      <div id="fp-cal" className="mt-4 min-h-[480px] overflow-hidden rounded-[14px] border border-[var(--line)]">
        <p className="p-6 text-center text-[14px] text-ink/60">{A.calLoading}</p>
      </div>
    </div>
  );
}

/* ── الطلب ───────────────────────────────────────────────────────── */

/**
 * طلب الانضمام: أربع شاشات، سؤال في كل شاشة، ثم المراجعة فالنتيجة.
 *
 * الاختيار بلمسة ينقل للشاشة التالية، والبيانات الشخصية في الآخر —
 * بعد أن صار للعميل ما يكمّل لأجله. والطلب يُرسل لحظة الإرسال
 * (`keepalive`)، فيُحفظ ولو أُغلقت الصفحة أثناء شاشة المراجعة.
 */
export function FoundingApplication({ seats, onSeats }: { seats: { total: number; remaining: number } | null; onSeats: (s: { total: number; remaining: number }) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [screen, setScreen] = useState<Screen>(0);
  const [industry, setIndustry] = useState<Choice | null>(null);
  const [other, setOther] = useState("");
  const [presence, setPresence] = useState<Choice | null>(null);
  const [goal, setGoal] = useState<Choice | null>(null);
  const [country, setCountry] = useState(countries[0].code);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lead, setLead] = useState<StoredLead | null>(null);
  const [view, setView] = useState<"main" | "plans" | "calendar" | "booked">("main");
  const [paying, setPaying] = useState<"deposit" | "full" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [failedText, setFailedText] = useState("");

  const remaining = seats?.remaining;

  /* فتح الطلب — من أي زرّ في الصفحة، ومن العودة من صفحة الدفع */
  useEffect(() => {
    const open = (e: Event) => {
      const { placement, notice: n } = ((e as CustomEvent).detail ?? {}) as { placement?: string; notice?: string };
      const saved = readLead();
      setNotice(n ?? null);
      setView("main");
      if (saved && saved.decision !== "out_of_scope") {
        /* طلب سابق من هذا المتصفح — يعود إلى نتيجته لا إلى أوّل سؤال */
        setLead(saved);
        setScreen(saved.decision === "waitlist" && (remaining ?? 0) > 0 ? "accepted" : saved.decision);
      } else {
        setScreen(0);
        track("start_application", { placement: placement ?? "page" });
      }
      if (!ref.current?.open) ref.current?.showModal();
    };
    window.addEventListener(APPLY_EVENT, open);
    return () => window.removeEventListener(APPLY_EVENT, open);
  }, [remaining]);

  /* شاشة لكل حدث — منها يُعرف أين يتوقّف الناس */
  useEffect(() => {
    if (typeof screen === "number") track("application_step", { step: screen + 1, step_name: STEP_NAMES[screen] });
  }, [screen]);

  const close = () => ref.current?.close();
  const next = (s: Screen) => window.setTimeout(() => setScreen(s), 160);

  const restart = () => {
    try {
      localStorage.removeItem(FP_LEAD_KEY);
    } catch {
      /* لا شيء محفوظ أصلًا */
    }
    setLead(null);
    setIndustry(null);
    setPresence(null);
    setGoal(null);
    setOther("");
    setNotice(null);
    setScreen(0);
    track("start_application", { placement: "restart" });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const company = String(f.get("company") ?? "").trim();
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const local = String(f.get("phone") ?? "").replace(/\D/g, "").replace(/^0+/, "");
    const c = countries.find((x) => x.code === country)!;
    const errs: Record<string, string> = {};
    if (company.length < 2) errs.company = F.details.errors.company;
    if (name.length < 2) errs.name = F.details.errors.name;
    if (!c.rule.test(local)) errs.phone = F.details.errors.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = F.details.errors.email;
    setErrors(errs);
    if (Object.keys(errs).length || !industry || !presence || !goal) return;

    const phone = c.code === "+" ? `+${local}` : `${c.code}${local}`;
    const industryOut = { ...industry, other: industry.id === "other" ? other.trim() : undefined };
    const shown = industry.id === "other" && other.trim() ? other.trim() : industry.label;
    setFailedText(
      [`الشركة: ${company}`, `الاسم: ${name}`, `الواتساب: ${phone}`, `الإيميل: ${email}`, `المجال: ${shown}`, `الحضور الحالي: ${presence.label}`, `الهدف: ${goal.label}`].join("\n"),
    );
    setScreen("review");

    const t = utm();
    const started = Date.now();
    const wait = () => new Promise((r) => window.setTimeout(r, Math.max(0, REVIEW_MS - (Date.now() - started))));
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        /* يكمل الطلب ولو أُغلقت الصفحة أثناء المراجعة */
        keepalive: true,
        body: JSON.stringify({
          action: "apply",
          industry: industryOut,
          presence,
          goal,
          company,
          name,
          phone,
          email,
          utm: t,
          client: metaClient(t.fbclid),
        }),
      });
      const data = (await res.json()) as { id?: string; decision?: StoredLead["decision"]; remaining?: number; total?: number };
      if (!res.ok || !data.id || !data.decision) throw new Error(String(res.status));
      const saved: StoredLead = { id: data.id, company, name, email, phone, decision: data.decision, industry: shown };
      storeLead(saved);
      setLead(saved);
      if (data.total !== undefined && data.remaining !== undefined) onSeats({ total: data.total, remaining: data.remaining });
      track(
        "generate_lead",
        { form_name: "founding_partners", decision: data.decision, industry: industry.id },
        { eventId: `lead.${data.id}` },
      );
      await wait();
      setScreen(data.decision);
    } catch {
      await wait();
      setScreen("error");
    }
  };

  const pay = async (plan: "deposit" | "full") => {
    if (!lead) return;
    const value = plan === "full" ? FP_PRICE : FP_DEPOSIT;
    setPaying(plan);
    setNotice(null);
    track("begin_checkout", { placement: "fp_accepted", plan, value, currency: FP_CURRENCY }, { eventId: `checkout.${lead.id}.${plan}` });
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pay", id: lead.id, plan }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.status === 409) {
        const w = { ...lead, decision: "waitlist" as const };
        storeLead(w);
        setLead(w);
        setNotice(A.full_);
        setScreen("waitlist");
      } else if (!res.ok || !data.url) throw new Error(String(res.status));
      else {
        window.location.href = data.url;
        return;
      }
    } catch {
      setNotice(A.payError);
    }
    setPaying(null);
  };

  const booked = async (start?: string, uid?: string) => {
    if (!lead) return;
    setView("booked");
    track("schedule", { placement: "fp_accepted" }, { eventId: `schedule.${lead.id}` });
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({ action: "booked", id: lead.id, start, uid }),
      });
      const data = (await res.json()) as { total?: number; remaining?: number };
      if (data.total !== undefined && data.remaining !== undefined) onSeats({ total: data.total, remaining: data.remaining });
    } catch {
      /* الحجز تمّ في Cal.com — إشعاره يصل الفريق من هناك أيضًا */
    }
  };

  const step = typeof screen === "number" ? screen : null;

  return (
    <dialog
      ref={ref}
      aria-label={fp.name}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-black/55 backdrop:backdrop-blur-[2px] sm:m-auto sm:h-auto sm:max-h-[92dvh] sm:max-w-[560px] sm:rounded-[24px]"
      onClick={(e) => e.target === ref.current && close()}
    >
      <div className="flex min-h-full flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 sm:min-h-0 sm:px-8 sm:pb-8 sm:pt-6">
        {/* الرأس: رجوع، والتقدّم، وإغلاق */}
        <div className="mb-6 flex h-10 items-center gap-3">
          {step !== null && step > 0 ? (
            <button
              type="button"
              onClick={() => setScreen((step - 1) as Screen)}
              className="inline-flex h-10 items-center gap-1 text-[14px] font-semibold text-ink/65 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {F.back}
            </button>
          ) : (
            <span className="text-[13px] font-semibold text-ink/60">{fp.name}</span>
          )}
          {step !== null && (
            <div className="ms-auto flex items-center gap-2.5">
              <span className="nums text-[13px] font-semibold text-ink/60">{F.step(step + 1, 4)}</span>
              <span className="h-1.5 w-20 overflow-hidden rounded-full bg-paper-3 sm:w-28" aria-hidden="true">
                <span className="block h-full rounded-full bg-ink transition-[width] duration-500" style={{ width: `${((step + 1) / 4) * 100}%` }} />
              </span>
            </div>
          )}
          <button
            type="button"
            aria-label={F.close}
            onClick={close}
            className={`grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line)] text-ink/60 hover:text-ink ${step === null ? "ms-auto" : ""}`}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div key={String(screen)} className="fp-screen flex-1">
          {screen === 0 && (
            <div>
              <h2 className="mb-5 text-[24px] font-bold leading-[1.3]">{F.industry.q}</h2>
              <Options
                items={F.industry.options}
                chosen={industry?.id}
                onPick={(c) => {
                  setIndustry(c);
                  if (c.id !== "other") next(1);
                }}
              />
              {industry?.id === "other" && (
                <div className="mt-4 space-y-3">
                  <Field label={F.industry.otherLabel}>
                    <input
                      autoFocus
                      value={other}
                      maxLength={60}
                      onChange={(e) => setOther(e.target.value)}
                      placeholder={F.industry.otherPlaceholder}
                      className={`${input} border-[var(--line-strong)]`}
                    />
                  </Field>
                  <button type="button" disabled={other.trim().length < 2} onClick={() => setScreen(1)} className={primary}>
                    {F.industry.next}
                  </button>
                </div>
              )}
            </div>
          )}

          {screen === 1 && (
            <div>
              <h2 className="mb-5 text-[24px] font-bold leading-[1.3]">{F.presence.q}</h2>
              <Options
                items={F.presence.options}
                chosen={presence?.id}
                onPick={(c) => {
                  setPresence(c);
                  next(2);
                }}
              />
            </div>
          )}

          {screen === 2 && (
            <div>
              <h2 className="mb-5 text-[24px] font-bold leading-[1.3]">{F.goal.q}</h2>
              <Options
                items={F.goal.options}
                chosen={goal?.id}
                onPick={(c) => {
                  setGoal(c);
                  next(3);
                }}
              />
            </div>
          )}

          {screen === 3 && (
            <form onSubmit={submit} noValidate className="space-y-4">
              <h2 className="mb-1 text-[24px] font-bold leading-[1.3]">{F.details.q}</h2>
              <Field label={F.details.company} error={errors.company}>
                <input name="company" autoComplete="organization" className={`${input} ${errors.company ? "border-red" : "border-[var(--line-strong)]"}`} />
              </Field>
              <Field label={F.details.name} error={errors.name}>
                <input name="name" autoComplete="name" className={`${input} ${errors.name ? "border-red" : "border-[var(--line-strong)]"}`} />
              </Field>
              <div>
                <span className="mb-1.5 block text-[14px] font-semibold text-ink/75">{F.details.phone}</span>
                {/* الرقم يُقرأ من اليسار: الكود أولًا ثم الرقم */}
                <div dir="ltr" className="flex gap-2">
                  <select
                    aria-label={F.details.country}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`${box} w-[8.5rem] shrink-0 border-[var(--line-strong)] px-2.5`}
                  >
                    {countries.map((c) => (
                      <option key={c.name} value={c.code}>
                        {c.code === "+" ? `+ ${c.name}` : `${c.code} ${c.name}`}
                      </option>
                    ))}
                  </select>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    aria-label={F.details.phone}
                    placeholder={country === "+" ? "44 7700 900123" : "5X XXX XXXX"}
                    className={`${box} nums min-w-0 flex-1 px-4 ${errors.phone ? "border-red" : "border-[var(--line-strong)]"}`}
                  />
                </div>
                {errors.phone && (
                  <span role="alert" className="mt-1.5 block text-[13.5px] font-semibold text-red">
                    {errors.phone}
                  </span>
                )}
              </div>
              <Field label={F.details.email} error={errors.email}>
                <input
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  inputMode="email"
                  className={`${input} ${errors.email ? "border-red" : "border-[var(--line-strong)]"}`}
                />
              </Field>
              <button type="submit" className={`${primary} mt-2`}>
                {F.details.submit}
              </button>
              <p className="text-center text-[12.5px] text-ink/60">{F.details.privacy}</p>
            </form>
          )}

          {screen === "review" && (
            <div className="grid min-h-[50dvh] place-items-center text-center sm:min-h-[320px]" role="status">
              <div>
                <span className="fp-spin mx-auto mb-6 block size-12 rounded-full border-[3px] border-paper-3 border-t-ink" aria-hidden="true" />
                <p className="text-[20px] font-bold">{F.reviewing}</p>
                <p className="mt-1.5 text-[14px] text-ink/60">{F.reviewingSub}</p>
              </div>
            </div>
          )}

          {screen === "accepted" && lead && (
            <div>
              {notice && (
                <p role="status" className="mb-5 rounded-[12px] border border-[var(--line)] bg-paper-2 p-3.5 text-[14px] leading-[1.7]">
                  {notice}
                </p>
              )}
              {view === "booked" ? (
                <div className="py-6 text-center">
                  <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-[#25d366]/15 text-[#1a9e4b]">
                    <Check className="size-7" />
                  </span>
                  <p className="text-[21px] font-bold leading-[1.45]">{A.booked}</p>
                  <p className="mt-2 text-[14.5px] text-ink/65">{A.bookedSub}</p>
                  <button type="button" onClick={() => setView("plans")} className={`${primary} mt-7`}>
                    {A.pay}
                  </button>
                </div>
              ) : view === "calendar" ? (
                <div>
                  <button type="button" onClick={() => setView("main")} className="mb-4 inline-flex items-center gap-1 text-[14px] font-semibold text-ink/65 hover:text-ink">
                    <svg viewBox="0 0 24 24" className="size-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {F.back}
                  </button>
                  <Calendar lead={lead} onBooked={booked} />
                </div>
              ) : (
                <>
                  <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#25d366]/12 px-3 py-1.5 text-[13px] font-bold text-[#1a9e4b]">
                    <Check className="size-3.5" />
                    {fp.name}
                  </p>
                  <h2 className="text-[clamp(1.45rem,5.6vw,1.8rem)] font-bold leading-[1.35]">{A.title}</h2>
                  <p className="mt-2 text-[16px] text-ink/70">{A.company(lead.company)}</p>
                  {remaining !== undefined && remaining > 0 && (
                    <p className="nums mt-4 text-[15px] font-bold">
                      {seatsLeft(remaining)} — {A.seat}
                    </p>
                  )}

                  <div className="mt-5 rounded-[16px] border border-[var(--line)] bg-paper-2/60 p-4 sm:p-5">
                    <p className="text-[13px] font-semibold text-ink/60">{A.summaryTitle}</p>
                    <ul className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2 text-[14.5px] font-semibold">
                      {A.summary.map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <Check className="size-3.5 text-[#1a9e4b]" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <p className="nums mt-4 border-t border-[var(--line)] pt-3.5 text-[15px] font-bold">{A.priceLine}</p>
                    <p className="mt-1 text-[13.5px] leading-[1.7] text-ink/65">{A.guaranteeLine}</p>
                  </div>

                  {view === "plans" ? (
                    <div className="mt-5">
                      <p className="mb-3 text-[15px] font-bold">{A.choose}</p>
                      <div className="grid gap-2.5">
                        {(["deposit", "full"] as const).map((plan) => (
                          <button
                            key={plan}
                            type="button"
                            disabled={paying !== null}
                            onClick={() => pay(plan)}
                            className="rounded-[14px] border border-[var(--line-strong)] p-4 text-start transition-colors hover:border-ink disabled:opacity-60"
                          >
                            <span className="nums block text-[16.5px] font-bold">{A[plan].title}</span>
                            <span className="mt-1 block text-[13.5px] text-ink/65">{A[plan].text}</span>
                            {plan === "full" && FULL_BONUS && (
                              <span className="mt-2 inline-block rounded-full bg-red/[0.08] px-2.5 py-1 text-[12.5px] font-bold text-red">{FULL_BONUS}</span>
                            )}
                            {paying === plan && <span className="mt-2 block text-[13px] font-semibold text-ink/60">{A.opening}</span>}
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12.5px] text-ink/60">
                        <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="5" y="11" width="14" height="10" rx="2" />
                          <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                        </svg>
                        {A.secure}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 grid gap-2.5">
                      <button type="button" onClick={() => setView("plans")} className={primary}>
                        {A.pay}
                      </button>
                      {CAL_LINK ? (
                        <button
                          type="button"
                          onClick={() => {
                            setView("calendar");
                            track("cta_click", { placement: "fp_book" });
                          }}
                          className={secondary}
                        >
                          {A.book}
                        </button>
                      ) : (
                        <a
                          href={fpWa(fp.wa.book(lead.company))}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track("whatsapp_click", { placement: "fp_book" })}
                          className={secondary}
                        >
                          {A.book}
                        </a>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {screen === "out_of_scope" && (
            <div className="py-4">
              <h2 className="text-[clamp(1.4rem,5.4vw,1.75rem)] font-bold leading-[1.4]">{fp.outOfScope.title}</h2>
              <p className="mt-3 text-[15.5px] leading-[1.8] text-ink/70">{fp.outOfScope.text}</p>
              <div className="mt-7">
                <WaButton href={fpWa(fp.wa.outOfScope(lead?.company ?? "", lead?.industry ?? ""))} placement="fp_out_of_scope">
                  {fp.outOfScope.cta}
                </WaButton>
              </div>
            </div>
          )}

          {screen === "waitlist" && (
            <div className="py-4">
              {notice && (
                <p role="status" className="mb-5 rounded-[12px] border border-[var(--line)] bg-paper-2 p-3.5 text-[14px] leading-[1.7]">
                  {notice}
                </p>
              )}
              <h2 className="text-[clamp(1.4rem,5.4vw,1.75rem)] font-bold leading-[1.4]">{fp.waitlisted.title}</h2>
              <p className="mt-3 text-[15.5px] leading-[1.8] text-ink/70">{fp.waitlisted.text}</p>
              <div className="mt-7">
                <WaButton href={fpWa(fp.wa.ask)} placement="fp_waitlist">
                  {fp.waitlisted.cta}
                </WaButton>
              </div>
            </div>
          )}

          {screen === "error" && (
            <div className="py-4">
              <h2 className="text-[clamp(1.4rem,5.4vw,1.75rem)] font-bold leading-[1.4]">{fp.error.title}</h2>
              <p className="mt-3 text-[15.5px] leading-[1.8] text-ink/70">{fp.error.text}</p>
              <div className="mt-7">
                <WaButton href={fpWa(fp.wa.failed(failedText))} placement="fp_error">
                  {fp.error.cta}
                </WaButton>
              </div>
            </div>
          )}
        </div>

        {lead && (screen === "accepted" || screen === "waitlist" || screen === "out_of_scope") && view !== "calendar" && (
          <button type="button" onClick={restart} className="mx-auto mt-6 block text-[13px] text-ink/50 underline underline-offset-4 hover:text-ink">
            {fp.restart}
          </button>
        )}
      </div>
    </dialog>
  );
}
