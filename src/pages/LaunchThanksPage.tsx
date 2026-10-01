import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "../content/home";
import {
  LAUNCH_CURRENCY,
  LAUNCH_PRICE,
  PAYER_KEY,
  PAY_INTENT_KEY,
  launch as L,
  launchPath,
  launchWa,
} from "../content/launchOffer";
import { track } from "../analytics";
import { WhatsAppMark } from "../components/WhatsAppFab";

const read = (store: "session" | "local", key: string): string | null => {
  try {
    return (store === "session" ? sessionStorage : localStorage).getItem(key);
  } catch {
    return null;
  }
};
const session = (key: string) => read("session", key);

/**
 * رقم العملية: من رابط العودة (`pi` يملؤه Ziina)، وإلا ممّا حُفظ قبل
 * الانتقال إلى صفحة الدفع — إن لم يستبدل Ziina العلامة في الرابط.
 */
function intentId(): string | null {
  const fromUrl = new URLSearchParams(window.location.search).get("pi");
  if (fromUrl && !fromUrl.includes("{")) return fromUrl;
  return session(PAY_INTENT_KEY);
}

/**
 * صفحة الشكر بعد الدفع — خارج الفهرسة.
 *
 * تحويل الشراء لا يُرسل لأن الصفحة فُتحت، بل لأن Ziina أكّد أن العملية
 * «completed» بمبلغنا وعملتنا. ويُرسل مرّة لكل عملية: إعادة التحميل لا
 * تحتسبه ثانيةً.
 */
export function LaunchThanksPage() {
  const [payer, setPayer] = useState<{ name?: string; company?: string }>({});

  useEffect(() => {
    try {
      setPayer(JSON.parse(session(PAYER_KEY) ?? "{}"));
    } catch {
      /* بلا بيانات — الرسالة تبقى بفراغاتها */
    }

    const id = intentId();
    if (!id) return;
    const key = `daamah:paid:${id}`;
    if (read("local", key)) return;

    let alive = true;
    (async () => {
      const res = await fetch(`/api/pay?id=${encodeURIComponent(id)}`);
      const data = (await res.json()) as { status?: string; test?: boolean };
      if (!alive || data.status !== "completed") return;
      try {
        localStorage.setItem(key, "1");
      } catch {
        /* تصفّح خاص: قد يتكرّر عند إعادة التحميل — أهون من فقده */
      }
      track("purchase", {
        value: LAUNCH_PRICE,
        currency: LAUNCH_CURRENCY,
        transaction_id: id,
        ...(data.test && { test: true }),
      });
    })().catch(() => {
      /* التحقّق تعذّر — لا نحتسب ما لم نتأكّد منه */
    });
    return () => {
      alive = false;
    };
  }, []);

  const message = L.wa.paid(payer.name, payer.company);

  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4 py-16 text-ink">
      <div className="w-full max-w-[560px] text-center">
        <Link to="/" aria-label={brand.name.ar} className="mx-auto mb-12 inline-block">
          <img src="/assets/logo-wordmark.png" alt={brand.name.ar} width={2035} height={544} className="h-[20px] w-auto dark:hidden" />
          <img
            src="/assets/logo-wordmark-light.png"
            alt=""
            aria-hidden="true"
            width={2035}
            height={544}
            className="hidden h-[20px] w-auto dark:block"
          />
        </Link>
        <h1 className="text-[clamp(2rem,7vw,3rem)] font-bold leading-[1.2]">{L.thanks.title}</h1>
        <p className="mt-2 text-[clamp(1.25rem,4vw,1.6rem)] font-bold text-ink/80">{L.thanks.sub}</p>
        <p className="mx-auto mt-5 max-w-[30rem] text-[16px] leading-[1.85] text-ink/65">{L.thanks.text}</p>
        <a
          href={launchWa(message, false)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.currentTarget.href = launchWa(message);
            track("whatsapp_click", { placement: "launch_thanks" });
          }}
          className="mt-9 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-8 py-5 text-[18px] font-bold leading-none text-[#0b0b0d] shadow-[0_18px_40px_-14px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
        >
          <WhatsAppMark className="size-6" />
          {L.thanks.cta}
        </a>
        <p className="mt-8">
          <Link to={launchPath} className="text-[14px] text-ink/60 underline-offset-4 hover:text-ink hover:underline">
            {L.thanks.back}
          </Link>
        </p>
      </div>
    </div>
  );
}
