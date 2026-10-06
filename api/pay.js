/**
 * دفع «باقة الانطلاق الرقمي» عبر Ziina — دالة Vercel بطريقتين.
 *
 * POST /api/pay            ← ينشئ عملية دفع بـ 2,000 ريال سعودي ويعيد رابط صفحة Ziina
 * GET  /api/pay?id=<id>    ← حالة العملية كما يراها Ziina (لصفحة الشكر)
 *
 * المبلغ والعملة هنا لا في المتصفح: لا يستطيع أحد أن يدفع أقلّ بتعديل
 * الطلب. وصفحة الشكر لا تحتسب الشراء إلا بعد أن يؤكّد Ziina نفسه أن
 * العملية «completed» — فتح الرابط وحده لا يكفي.
 */
import { arabicUrl, clean, configured, createIntent, getIntent, json, latin, testMode } from "./_ziina.js";

/** 2,000 ريال بالهللة — العملة الصغرى */
const AMOUNT = 200000;
const CURRENCY = "SAR";

export async function POST(request) {
  if (!configured()) return json({ error: "not_configured" }, 503);

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

  /* الوصف يظهر على صفحة الدفع وفي سجلّ العملية عند Ziina — منه يعرف يحيى
     من دفع. رقم الجوال يصل سليمًا وهو ما يعرّف الدافع؛ واسمه وشركته
     بالعربية يصلان في رسالة واتساب من صفحة الشكر. */
  const tel = latin(phone);
  const co = latin(company);
  const made = await createIntent({
    amount: AMOUNT,
    currency: CURRENCY,
    messages: [
      co && `Digital Launch | ${co} | ${tel}`,
      `Digital Launch Package | ${tel}`,
      `Launch | ${tel}`,
      "Digital Launch Package",
    ],
    successUrl: `${origin}/launch/thank-you?pi={PAYMENT_INTENT_ID}`,
    cancelUrl: `${origin}/launch?payment=cancelled`,
    failureUrl: `${origin}/launch?payment=failed`,
  });

  if (!made.ok) return json({ error: "provider", ...made.detail }, 502);
  /* صفحة الباقة عربية وعملاؤها سعوديون — فصفحة الدفع بالعربية */
  return json({ id: made.id, url: arabicUrl(made.url) });
}

export async function GET(request) {
  if (!configured()) return json({ error: "not_configured" }, 503);
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!/^[\w-]{6,80}$/.test(id)) return json({ error: "bad_id" }, 400);

  const data = await getIntent(id);
  if (!data) return json({ error: "provider" }, 502);

  /* الشراء يُحتسب لعمليتنا وحدها: المبلغ والعملة كما أنشأناهما */
  const ours = data.amount === AMOUNT && data.currency_code === CURRENCY;
  return json({ status: ours ? data.status : "mismatch", test: testMode() });
}
