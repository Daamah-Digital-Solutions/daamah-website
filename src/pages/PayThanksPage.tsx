import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { brand } from "../content/home";
import { currencyName, payThanks as P } from "../content/payLink";
import { waHref } from "../content/whatsapp";
import { track } from "../analytics";
import { WhatsAppMark } from "../components/WhatsAppFab";

type Intent = { status?: string; amount?: number; currency?: string };

const TERMINAL = ["completed", "failed", "canceled"];

/**
 * صفحة ما بعد الدفع لروابط الدفع — بلغة الصفحة (عربية أو `/en`).
 *
 * لا تقول «تمّ» لأن الرابط فُتح: تسأل الخادم عن العملية، وتعرض مبلغها
 * كما سجّله Ziina. العملية قد تتأخّر لحظات بعد العودة، فتُعاد المحاولة.
 */
export function PayThanksPage() {
  const { t, lang } = useLang();
  const [id, setId] = useState<string | null>(null);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [gaveUp, setGaveUp] = useState(false);
  const [aborted, setAborted] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pi = q.get("pi");
    const found = pi && !pi.includes("{") ? pi : null;
    setId(found);
    setAborted(["cancelled", "failed"].includes(q.get("payment") ?? ""));
    if (!found) {
      setGaveUp(true);
      return;
    }

    let alive = true;
    let tries = 0;
    const check = async () => {
      try {
        const res = await fetch(`/api/link?id=${encodeURIComponent(found)}`);
        const data = (await res.json()) as Intent;
        if (!alive) return;
        if (res.ok) setIntent(data);
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

  const paid = intent?.status === "completed";
  const failed = !paid && (aborted || intent?.status === "failed" || intent?.status === "canceled");
  const pending = !paid && !failed && !gaveUp;

  const money =
    intent?.amount !== undefined && intent.currency
      ? lang === "ar"
        ? `${intent.amount.toLocaleString("en-US")} ${t(currencyName[intent.currency] ?? { ar: intent.currency, en: intent.currency })}`
        : `${intent.currency} ${intent.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
      : null;
  const ref = id ? id.slice(0, 8).toUpperCase() : "";

  const copy = paid ? P.done : failed ? P.cancelled : pending ? P.pending : P.unknown;
  const message = paid && money ? P.wa.paid[lang](money, ref) : t(P.wa.help);
  /* إعادة المحاولة على صفحة الدفع نفسها، بلغة هذه الصفحة */
  const retry = id ? `https://pay.ziina.com${lang === "ar" ? "/ar" : ""}/payment_intent/${id}` : null;

  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4 py-16 text-ink">
      <div className="w-full max-w-[560px] text-center">
        <Link to={lang === "en" ? "/en" : "/"} aria-label={t(brand.name)} className="mx-auto mb-10 inline-block">
          <img src="/assets/logo-wordmark.png" alt={t(brand.name)} width={2035} height={544} className="h-[38px] w-auto sm:h-[46px] dark:hidden" />
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
          {t(copy.title)}
        </h1>
        {paid && <p className="mt-2 text-[clamp(1.15rem,3.6vw,1.45rem)] font-bold text-ink/80">{t(P.done.sub)}</p>}
        <p className="mx-auto mt-5 max-w-[30rem] text-[16px] leading-[1.85] text-ink/65">{t(copy.text)}</p>

        {paid && money && (
          <dl className="mx-auto mt-7 grid max-w-[360px] grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--line)] text-start">
            <div className="bg-paper p-4">
              <dt className="text-[12.5px] text-ink/60">{t(P.amountLabel)}</dt>
              <dd className="nums mt-1 text-[17px] font-bold">{money}</dd>
            </div>
            <div className="bg-paper p-4">
              <dt className="text-[12.5px] text-ink/60">{t(P.refLabel)}</dt>
              <dd className="ltr nums mt-1 text-[17px] font-bold">{ref}</dd>
            </div>
          </dl>
        )}

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {failed && retry && (
            <a
              href={retry}
              className="inline-flex w-full items-center justify-center rounded-full bg-ink px-8 py-4 text-[16px] font-bold leading-none text-paper transition-opacity hover:opacity-85 sm:w-auto"
            >
              {t(P.cancelled.retry)}
            </a>
          )}
          <a
            href={waHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { placement: "pay_thanks" })}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-8 py-4 text-[16px] font-bold leading-none text-[#0b0b0d] shadow-[0_18px_40px_-14px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            <WhatsAppMark className="size-5" />
            {t(P.cta)}
          </a>
        </div>
      </div>
    </div>
  );
}
