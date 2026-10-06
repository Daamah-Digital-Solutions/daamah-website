/**
 * رابط دفع بأي مبلغ — أداة داخلية لصاحب الحساب وحده.
 *
 * POST /api/link           ← ينشئ رابط دفع (كلمة السرّ، المبلغ، العملة، وصف اختياري)
 * GET  /api/link?id=<id>   ← حالة العملية ومبلغها (لصفحة الشكر — بلا كلمة سرّ)
 *
 * محميّة بكلمة سرّ: بدونها يستطيع أي زائر أن يصدر روابط دفع باسم الحساب.
 * كلمة السرّ في `PAY_LINK_PASSWORD` على Vercel — لا في الشيفرة ولا في المتصفح.
 *
 * اللغة تتبع العملة: الريال والدرهم صفحة دفع وشكر بالعربية، والدولار بالإنجليزية.
 */
import { createHash, timingSafeEqual } from "node:crypto";
import { arabicUrl, configured, createIntent, getIntent, json, latin, testMode } from "./_ziina.js";

/** العملات المتاحة — ولكلٍّ لغة صفحتَي الدفع والشكر */
const CURRENCIES = { SAR: "ar", AED: "ar", USD: "en" };
const MIN = 5;
const MAX = 500000;

const digest = (v) => createHash("sha256").update(String(v)).digest();
/** مقارنة لا يكشف زمنها شيئًا عن كلمة السرّ */
const allowed = (given) => {
  const secret = process.env.PAY_LINK_PASSWORD;
  return Boolean(secret) && timingSafeEqual(digest(given), digest(secret));
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function POST(request) {
  if (!configured() || !process.env.PAY_LINK_PASSWORD) return json({ error: "not_configured" }, 503);

  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  if (!allowed(body.password ?? "")) {
    /* مهلة على الخطأ: تجعل تخمين كلمة السرّ بالتجربة أبطأ من أن يُجدي */
    await sleep(900);
    return json({ error: "unauthorized" }, 401);
  }

  const currency = String(body.currency ?? "");
  const lang = CURRENCIES[currency];
  const value = Number(body.amount);
  if (!lang || !Number.isFinite(value) || value < MIN || value > MAX) return json({ error: "invalid" }, 422);
  /* العملات الثلاث بخانتين عشريتين — المبلغ بالعملة الصغرى */
  const amount = Math.round(value * 100);

  const origin = new URL(request.url).origin;
  const back = `${origin}${lang === "en" ? "/en" : ""}/pay/thank-you`;
  const note = latin(body.note);

  const made = await createIntent({
    amount,
    currency,
    messages: [note && `Daamah | ${note}`, note, "Daamah Digital Solutions"],
    successUrl: `${back}?pi={PAYMENT_INTENT_ID}`,
    cancelUrl: `${back}?payment=cancelled&pi={PAYMENT_INTENT_ID}`,
    failureUrl: `${back}?payment=failed&pi={PAYMENT_INTENT_ID}`,
  });
  if (!made.ok) return json({ error: "provider", ...made.detail }, 502);

  return json({
    id: made.id,
    url: lang === "ar" ? arabicUrl(made.url) : made.url,
    amount: amount / 100,
    currency,
    lang,
    test: testMode(),
  });
}

export async function GET(request) {
  if (!configured()) return json({ error: "not_configured" }, 503);
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const data = await getIntent(id);
  if (!data) return json({ error: "not_found" }, 404);
  return json({
    status: data.status,
    amount: Number(data.amount) / 100,
    currency: data.currency_code,
    test: testMode(),
  });
}
