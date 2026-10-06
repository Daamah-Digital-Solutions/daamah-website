/**
 * ما تشترك فيه دوالّ الدفع — ليس مسارًا: Vercel يتجاهل ما يبدأ بـ `_`.
 *
 * متغيّرات البيئة (Vercel ← Settings ← Environment Variables):
 *   ZIINA_API_KEY  مفتاح Ziina بصلاحية write_payment_intents — سرّي، بلا VITE_
 *   ZIINA_TEST=1   عمليات تجريبية بلا خصم حقيقي (أي بطاقة تعمل). يُحذف للتشغيل الفعلي.
 */

const API = "https://api-v2.ziina.com/api";

export const configured = () => Boolean(process.env.ZIINA_API_KEY);
export const testMode = () => process.env.ZIINA_TEST === "1";

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

export const clean = (v, max) =>
  String(v ?? "")
    .replace(/[\u0000-\u001f<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/**
 * وصف العملية كما يقبله Ziina — قيدان اكتُشفا بالتجربة لا من التوثيق:
 * العربية تُخزَّن علامات استفهام، فحروف لاتينية وأرقام فقط؛ والطول
 * محدود (49 حرفًا قُبلت و75 رُفضت).
 */
export const MESSAGE_MAX = 50;
export const latin = (v) => clean(String(v ?? "").replace(/[^\x20-\x7E]/g, " "), 60);

function ziina(path, init = {}) {
  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

/** صفحة الدفع بالعربية: المسار نفسه تحت `/ar` */
export const arabicUrl = (url) => url.replace("pay.ziina.com/payment_intent/", "pay.ziina.com/ar/payment_intent/");

/**
 * ينشئ عملية دفع. `messages` من الأوفى إلى الأقصر: إن رفض Ziina طول
 * الأولى جُرّبت التالية.
 */
export async function createIntent({ amount, currency, messages, successUrl, cancelUrl, failureUrl }) {
  let res, text, data;
  for (const message of messages.filter((m) => m && m.length <= MESSAGE_MAX)) {
    res = await ziina("/payment_intent", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency_code: currency,
        message,
        success_url: successUrl,
        cancel_url: cancelUrl,
        failure_url: failureUrl,
        test: testMode(),
      }),
    });
    text = await res.text();
    data = {};
    try {
      data = JSON.parse(text);
    } catch {
      /* ردّ غير JSON — يُسجَّل نصّه */
    }
    if (data?.code !== "MESSAGE_LENGTH_INVALID") break;
  }

  if (res?.ok && data.redirect_url) return { ok: true, id: data.id, url: data.redirect_url };

  console.error("ziina create failed", res?.status, String(text ?? "").slice(0, 500));
  /* سبب الرفض كما قاله Ziina — رمز ورسالة، لا سرّ فيهما. يظهر في وضع
     التجربة وحده كي لا تُعرض أخطاء المزوّد على زوّار الموقع */
  return {
    ok: false,
    detail: testMode() ? { provider_status: res?.status, provider_message: clean(text, 400) } : {},
  };
}

/** العملية كما يراها Ziina، أو `null` إن تعذّر */
export async function getIntent(id) {
  if (!/^[\w-]{6,80}$/.test(id)) return null;
  const res = await ziina(`/payment_intent/${encodeURIComponent(id)}`);
  if (!res.ok) return null;
  return res.json().catch(() => null);
}
