import { useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "../content/home";
import { payCurrencies, payLink as P, type PayCurrency } from "../content/payLink";
import { WhatsAppMark } from "../components/WhatsAppFab";

type Made = { id: string; url: string; amount: number; currency: PayCurrency; lang: "ar" | "en"; test?: boolean };

const input =
  "w-full rounded-[12px] border border-[var(--line-strong)] bg-paper px-4 py-3.5 text-[16px] text-ink outline-none transition-colors focus:border-ink";

/**
 * أداة داخلية: رابط دفع بأي مبلغ.
 *
 * كلمة السرّ لا تُحفظ هنا ولا تُقارَن هنا — تُرسل مع كل طلب والخادم يتحقّق.
 * الحقل `current-password` داخل نموذج، فيحفظها مدير كلمات السرّ في المتصفح
 * ويملؤها في المرّة التالية.
 */
export function PayLinkPage() {
  const [currency, setCurrency] = useState<PayCurrency>("SAR");
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<string | null>(null);
  const [made, setMade] = useState<Made | null>(null);
  const [copied, setCopied] = useState(false);

  const chosen = payCurrencies.find((c) => c.code === currency)!;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: f.get("password"),
          amount: f.get("amount"),
          currency,
          note: f.get("note"),
        }),
      });
      const data = (await res.json()) as Made & { error?: string };
      if (!res.ok || !data.url) setError(P.errors[data.error ?? "provider"] ?? P.errors.provider);
      else {
        setMade(data);
        setCopied(false);
      }
    } catch {
      setError(P.errors.network);
    }
    setState("idle");
  };

  const amountText = made ? made.amount.toLocaleString("en-US") : "";
  const shareText = made
    ? P.shareText[made.lang](amountText, made.lang === "ar" ? payCurrencies.find((c) => c.code === made.currency)!.label : made.currency, made.url)
    : "";

  return (
    <div className="min-h-dvh bg-paper px-4 py-10 text-ink sm:py-16">
      <div className="mx-auto w-full max-w-[480px]">
        <Link to="/" aria-label={brand.name.ar} className="mb-8 inline-block">
          <img src="/assets/logo-wordmark.png" alt={brand.name.ar} width={2035} height={544} className="h-[26px] w-auto dark:hidden" />
          <img
            src="/assets/logo-wordmark-light.png"
            alt=""
            aria-hidden="true"
            width={2035}
            height={544}
            className="hidden h-[26px] w-auto dark:block"
          />
        </Link>
        <h1 className="text-[28px] font-bold leading-[1.25]">{P.title}</h1>
        <p className="mt-1.5 text-[15px] text-ink/65">{P.sub}</p>

        {/* النموذج يبقى في الصفحة بعد الإنشاء (مخفيًّا): كلمة السرّ لا تُكتب ثانيةً لرابط جديد */}
        <form onSubmit={submit} className={`mt-8 space-y-5 ${made ? "hidden" : ""}`}>
          {/* اسم مستخدم ثابت: به يعرف مدير كلمات السرّ أيّ كلمة يحفظ */}
          <input type="text" name="username" autoComplete="username" defaultValue="daamah-pay-link" readOnly hidden />
          <label className="block">
            <span className="mb-1.5 block text-[14px] font-semibold text-ink/75">{P.password}</span>
            <input name="password" type="password" required autoComplete="current-password" dir="ltr" className={input} />
          </label>

          <fieldset>
            <legend className="mb-1.5 text-[14px] font-semibold text-ink/75">{P.currency}</legend>
            <div className="grid grid-cols-3 gap-2">
              {payCurrencies.map((c) => (
                <label
                  key={c.code}
                  className={`cursor-pointer rounded-[12px] border px-2 py-3 text-center transition-colors ${
                    currency === c.code ? "border-ink bg-ink text-paper" : "border-[var(--line-strong)] hover:border-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="currency"
                    value={c.code}
                    checked={currency === c.code}
                    onChange={() => setCurrency(c.code)}
                    className="sr-only"
                  />
                  <span className="ltr block text-[16px] font-bold">{c.code}</span>
                  <span className="block text-[12px] opacity-70">{c.label}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-[13px] text-ink/60">{chosen.lang === "ar" ? P.langAr : P.langEn}</p>
          </fieldset>

          <label className="block">
            <span className="mb-1.5 block text-[14px] font-semibold text-ink/75">{P.amount}</span>
            <span className="relative block">
              <input
                name="amount"
                type="number"
                required
                min={5}
                max={500000}
                step="0.01"
                inputMode="decimal"
                dir="ltr"
                className={`${input} nums pe-16 text-[20px] font-bold`}
              />
              <span className="ltr pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-ink/50">
                {currency}
              </span>
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[14px] font-semibold text-ink/75">{P.note}</span>
            <input
              name="note"
              type="text"
              maxLength={40}
              dir="ltr"
              autoComplete="off"
              placeholder="Invoice 104"
              title={P.noteHint}
              pattern="[\x20-\x7E]*"
              className={input}
            />
            <span className="mt-1.5 block text-[12.5px] leading-[1.6] text-ink/60">{P.noteHint}</span>
          </label>

          {error && (
            <p role="alert" className="rounded-[12px] bg-red/[0.07] p-3.5 text-[14px] leading-[1.7]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={state === "sending"}
            className="inline-flex w-full items-center justify-center rounded-full bg-red px-6 py-4 text-[16px] font-bold leading-none text-white transition-opacity disabled:opacity-60"
          >
            {state === "sending" ? P.sending : P.submit}
          </button>
        </form>

        {made && (
          <div className="mt-8" aria-live="polite">
            <div className="rounded-[20px] border border-[var(--line)] bg-paper-2/60 p-5 sm:p-6">
              <p className="text-[13px] font-semibold text-ink/60">{P.ready}</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="ltr nums text-[34px] font-bold leading-none">{amountText}</span>
                <span className="ltr text-[16px] font-bold text-ink/70">{made.currency}</span>
              </p>
              <p className="mt-1 text-[13px] text-ink/60">{made.lang === "ar" ? P.langAr : P.langEn}</p>
              <input
                readOnly
                dir="ltr"
                value={made.url}
                onFocus={(e) => e.currentTarget.select()}
                aria-label={P.ready}
                className={`${input} mt-4 text-[13.5px]`}
              />
              {made.test && <p className="mt-3 rounded-[10px] bg-red/[0.07] p-3 text-[13px] leading-[1.6]">{P.test}</p>}
            </div>

            <div className="mt-4 grid gap-2.5">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(made.url);
                    setCopied(true);
                  } catch {
                    /* المتصفح منع النسخ — الرابط ظاهر في الحقل ويُحدَّد باللمس */
                  }
                }}
                className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-4 text-[16px] font-bold leading-none text-paper transition-opacity hover:opacity-85"
              >
                {copied ? P.copied : P.copy}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-4 text-[16px] font-bold leading-none text-[#0b0b0d]"
              >
                <WhatsAppMark className="size-5" />
                {P.share}
              </a>
              <div className="mt-1 flex items-center justify-between text-[14px]">
                <a href={made.url} target="_blank" rel="noopener noreferrer" className="text-ink/65 underline underline-offset-4 hover:text-ink">
                  {P.open}
                </a>
                <button type="button" onClick={() => setMade(null)} className="font-bold text-red">
                  {P.again}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
