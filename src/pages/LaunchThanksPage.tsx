import { useEffect } from "react";
import { Link } from "react-router-dom";
import { brand } from "../content/home";
import { LAUNCH_CURRENCY, LAUNCH_PRICE, launch as L, launchPath, launchWa } from "../content/launchOffer";
import { track } from "../analytics";
import { WhatsAppMark } from "../components/WhatsAppFab";

/** معرّف العملية من رابط العودة — `session_id` من Stripe، وما يقابله من غيره */
function paymentId(): string | null {
  const p = new URLSearchParams(window.location.search);
  return p.get("session_id") ?? p.get("payment_id") ?? p.get("payment_intent") ?? p.get("ref");
}

/**
 * صفحة الشكر بعد الدفع — خارج الفهرسة.
 *
 * تحويل الشراء يُرسل مرّة لكل عملية: بلا معرّف عملية في الرابط لا
 * يُرسل (من يكتب العنوان بنفسه لم يدفع)، ومع المعرّف يُحفظ فلا تعيد
 * إعادةُ التحميل احتسابَه.
 */
export function LaunchThanksPage() {
  useEffect(() => {
    const id = paymentId();
    if (!id) return;
    const key = `daamah:paid:${id}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      /* تصفّح خاص: يُرسل، وقد يتكرّر عند إعادة التحميل — أهون من فقده */
    }
    /* القياس يُحمَّل بعد الرسم — ننتظره لحظة كي لا يضيع الحدث */
    const t = window.setTimeout(
      () => track("purchase", { value: LAUNCH_PRICE, currency: LAUNCH_CURRENCY, transaction_id: id }),
      400,
    );
    return () => window.clearTimeout(t);
  }, []);

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
          href={launchWa(L.wa.paid, false)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.currentTarget.href = launchWa(L.wa.paid);
            track("whatsapp_click", { placement: "launch_thanks" });
          }}
          className="mt-9 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-8 py-5 text-[18px] font-bold leading-none text-[#0b0b0d] shadow-[0_18px_40px_-14px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
        >
          <WhatsAppMark className="size-6" />
          {L.thanks.cta}
        </a>
        <p className="mt-8">
          <Link to={launchPath} className="text-[14px] text-ink/50 underline-offset-4 hover:text-ink hover:underline">
            {L.thanks.back}
          </Link>
        </p>
      </div>
    </div>
  );
}
