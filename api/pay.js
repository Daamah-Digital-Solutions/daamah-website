/**
 * الدفع عبر Ziina — دالة Vercel واحدة بطريقتين.
 *
 * POST /api/pay            ← ينشئ عملية دفع بـ 2,000 ريال سعودي ويعيد رابط صفحة Ziina
 * GET  /api/pay?id=<id>    ← حالة العملية كما يراها Ziina (لصفحة الشكر)
 *
 * المبلغ والعملة هنا لا في المتصفح: لا يستطيع أحد أن يدفع أقلّ بتعديل
 * الطلب. وصفحة الشكر لا تحتسب الشراء إلا بعد أن يؤكّد Ziina نفسه أن
 * العملية «completed» — فتح الرابط وحده لا يكفي.
 *
 * متغيّرات البيئة (Vercel ← Settings ← Environment Variables):
 *   ZIINA_API_KEY  مفتاح Ziina بصلاحية write_payment_intents — سرّي، بلا VITE_
 *   ZIINA_TEST=1   عمليات تجريبية بلا خصم حقيقي (أي بطاقة تعمل). يُحذف للتشغيل الفعلي.
 */

const API = "https://api-v2.ziina.com/api";
/** 2,000 ريال بالهللة — العملة الصغرى */
const AMOUNT = 200000;
const CURRENCY = "SAR";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const clean = (v, max) =>
  String(v ?? "")
    .replace(/[\u0000-\u001f<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

function ziina(path, init = {}) {
  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

export async function POST(request) {
  if (!process.env.ZIINA_API_KEY) return json({ error: "not_configured" }, 503);

  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  const name = clean(body.name, 80);
  const phone = clean(body.phone, 24);
  const company = clean(body.company, 100);
  if (!name || !company || phone.replace(/\D/g, "").length < 8) return json({ error: "invalid" }, 422);

  /* العودة إلى نفس النطاق الذي جاء منه الطلب — يعمل على المعاينات وعلى daamah.net */
  const origin = new URL(request.url).origin;
  const res = await ziina("/payment_intent", {
    method: "POST",
    body: JSON.stringify({
      amount: AMOUNT,
      currency_code: CURRENCY,
      /* يظهر على صفحة الدفع وفي سجلّ العملية عند Ziina — منه يعرف يحيى من دفع */
      message: clean(`باقة الانطلاق الرقمي — ${company} — ${name} — ${phone}`, 250),
      success_url: `${origin}/launch/thank-you?pi={PAYMENT_INTENT_ID}`,
      cancel_url: `${origin}/launch?payment=cancelled`,
      failure_url: `${origin}/launch?payment=failed`,
      test: process.env.ZIINA_TEST === "1",
    }),
  });

  const text = await res.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {
    /* ردّ غير JSON — يُسجَّل نصّه */
  }
  if (!res.ok || !data.redirect_url) {
    console.error("ziina create failed", res.status, text.slice(0, 500));
    /* سبب الرفض كما قاله Ziina — رمز ورسالة، لا سرّ فيهما. يظهر في وضع
       التجربة وحده كي لا تُعرض أخطاء المزوّد على زوّار الموقع */
    const detail =
      process.env.ZIINA_TEST === "1"
        ? { provider_status: res.status, provider_message: clean(text, 400) }
        : {};
    return json({ error: "provider", ...detail }, 502);
  }
  return json({ id: data.id, url: data.redirect_url });
}

export async function GET(request) {
  if (!process.env.ZIINA_API_KEY) return json({ error: "not_configured" }, 503);
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!/^[\w-]{6,80}$/.test(id)) return json({ error: "bad_id" }, 400);

  const res = await ziina(`/payment_intent/${encodeURIComponent(id)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return json({ error: "provider" }, 502);

  /* الشراء يُحتسب لعمليتنا وحدها: المبلغ والعملة كما أنشأناهما */
  const ours = data.amount === AMOUNT && data.currency_code === CURRENCY;
  return json({ status: ours ? data.status : "mismatch", test: Boolean(process.env.ZIINA_TEST === "1") });
}
