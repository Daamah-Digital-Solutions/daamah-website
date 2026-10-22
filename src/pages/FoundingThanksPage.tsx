import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "../content/home";
import { FP_CURRENCY, FP_LEAD_KEY, PROJECT_FORM_URL, fp, fpPath, fpWa } from "../content/foundingPartners";
import { track } from "../analytics";
import { WhatsAppMark } from "../components/WhatsAppFab";

type Result = { status?: string; plan?: "deposit" | "full"; amount?: number; company?: string; test?: boolean };

const TERMINAL = ["completed", "failed", "canceled", "mismatch"];
const T = fp.thanks;

/**
 * صفحة الشكر بعد الدفع — خارج الفهرسة.
 *
 * لا تقول «تمّ» لأن الرابط فُتح: تسأل الخادم، والخادم يسأل Ziina،
 * ويحتسب المقعد إن تمّ الدفع فعلًا. والشراء يُرسل مرّة لكل عملية،
 * بمعرّف تشترك فيه نسخة الخادم فتعدّهما ميتا واحدًا.
 */
export function FoundingThanksPage() {
  const [result, setResult] = useState<Result | null>(null);
  const [gaveUp, setGaveUp] = useState(false);

  useEffect(() => {
    const pi = new URLSearchParams(window.location.search).get("pi");
    if (!pi || pi.includes("{")) {
      setGaveUp(true);
      return;
    }
    let alive = true;
    let tries = 0;
    const check = async () => {
      try {
        const res = await fetch(`/api/partners?pi=${encodeURIComponent(pi)}`);
        const data = (await res.json()) as Result;
        if (!alive) return;
        if (res.ok) setResult(data);
        if (data.status === "completed" && data.amount) {
          const key = `daamah:paid:${pi}`;
          let counted = false;
          try {
            counted = Boolean(localStorage.getItem(key));
            localStorage.setItem(key, "1");
            localStorage.removeItem(FP_LEAD_KEY);
          } catch {
            /* تصفّح خاص — قد يتكرّر عند إعادة التحميل، ومعرّف الحدث يمنع عدّه مرّتين */
          }
          if (!counted)
            track(
              "purchase",
              { value: data.amount, currency: FP_CURRENCY, transaction_id: pi, plan: data.plan ?? "deposit", ...(data.test && { test: true }) },
              { eventId: `purchase.${pi}` },
            );
          return;
        }
        if (res.ok && TERMINAL.includes(data.status ?? "")) return;
      } catch {
        /* يُعاد */
      }
      if (!alive) return;
      if (++tries >= 6) setGaveUp(true);
      else window.setTimeout(check, 2500);
    };
    check();
    return () => {
      alive = false;
    };
  }, []);

  const paid = result?.status === "completed";
  const notPaid = !paid && ["failed", "canceled"].includes(result?.status ?? "");
  const copy = paid ? T : notPaid ? T.notPaid : gaveUp ? T.unknown : T.pending;
  const plan = T.plan[result?.plan ?? "deposit"];
  const message = paid ? fp.wa.paid(result?.company ?? "", plan) : fp.wa.ask;

  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4 py-16 text-ink">
      <div className="w-full max-w-[560px] text-center">
        <Link to="/" aria-label={brand.name.ar} className="mx-auto mb-10 inline-block">
          <img src="/assets/logo-wordmark.png" alt={brand.name.ar} width={2035} height={544} className="h-[38px] w-auto sm:h-[46px] dark:hidden" />
          <img
            src="/assets/logo-wordmark-light.png"
            alt=""
            aria-hidden="true"
            width={2035}
            height={544}
            className="hidden h-[38px] w-auto sm:h-[46px] dark:block"
          />
        </Link>

        <h1 className="text-[clamp(1.9rem,6.6vw,2.8rem)] font-bold leading-[1.2]" aria-live="polite">
          {copy.title}
        </h1>
        {paid && <p className="mt-2 text-[clamp(1.1rem,3.6vw,1.4rem)] font-bold text-ink/80">{T.sub}</p>}
        <p className="mx-auto mt-5 max-w-[30rem] text-[16px] leading-[1.85] text-ink/65">{copy.text}</p>

        {paid && (
          <>
            <p className="nums mx-auto mt-6 inline-block rounded-full border border-[var(--line)] px-4 py-2 text-[14px] font-bold">
              {result?.company ? `${result.company} — ` : ""}
              {plan}
            </p>
            <div className="mx-auto mt-8 max-w-[440px] rounded-[18px] border border-[var(--line)] bg-paper-2/60 p-5 text-start">
              <p className="text-[13px] font-semibold text-ink/60">{T.next}</p>
              {PROJECT_FORM_URL ? (
                <>
                  <p className="mt-1.5 text-[14.5px] leading-[1.75] text-ink/75">{T.formNote}</p>
                  <a
                    href={PROJECT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-[15.5px] font-bold text-paper"
                  >
                    {T.form}
                  </a>
                </>
              ) : (
                <p className="mt-1.5 text-[14.5px] leading-[1.75] text-ink/75">{T.formByWa}</p>
              )}
            </div>
          </>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={fpWa(message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { placement: "fp_thanks" })}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-8 py-4 text-[16px] font-bold leading-none text-[#0b0b0d] sm:w-auto"
          >
            <WhatsAppMark className="size-5" />
            {T.cta}
          </a>
          {!paid && (gaveUp || notPaid) && (
            <Link
              to={fpPath}
              className="inline-flex w-full items-center justify-center rounded-full border border-[var(--line-strong)] px-8 py-4 text-[16px] font-bold leading-none sm:w-auto"
            >
              {T.back}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
