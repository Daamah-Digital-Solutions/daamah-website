/**
 * مستقبِل أحداث Ziina — واحد للحساب كلّه.
 *
 * لـ Ziina webhook واحد لكل حساب، فهذا المستقبِل يخدم كل عمليات
 * الموقع: ما كان من «برنامج شركاء التأسيس» يُحتسب هنا فورًا، ولو أغلق
 * العميل الصفحة قبل أن يعود إلى صفحة الشكر. وما سواه يُقبل ويُترك —
 * صفحات الشكر الأخرى تتحقّق بنفسها.
 *
 *   ZIINA_WEBHOOK_SECRET  سرّ التوقيع — يُضبط هنا ويُرسل مع الربط من لوحة البرنامج
 *
 * الثقة من التوقيع (HMAC-SHA256 لنصّ الطلب في `X-Hmac-Signature`)،
 * ومن عناوين Ziina المعلنة. ثم لا يُصدَّق الحدث نفسه: الحالة تُقرأ من
 * Ziina مباشرة قبل احتساب أي دفع.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { CURRENCY, PLANS, settle } from "./_partners.js";
import { leadForIntent } from "./_store.js";
import { getIntent, json } from "./_ziina.js";

/** من توثيق Ziina */
const ZIINA_IPS = new Set(["3.29.184.186", "3.29.190.95", "20.233.47.127", "13.202.161.181"]);

const signed = (raw, given, secret) => {
  const want = createHmac("sha256", secret).update(raw).digest();
  let got;
  try {
    got = Buffer.from(String(given ?? ""), "hex");
  } catch {
    return false;
  }
  return got.length === want.length && timingSafeEqual(got, want);
};

export async function POST(request) {
  const secret = process.env.ZIINA_WEBHOOK_SECRET;
  if (!secret) return json({ error: "not_configured" }, 503);

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (process.env.VERCEL && !ZIINA_IPS.has(ip)) return json({ error: "forbidden" }, 403);

  const raw = Buffer.from(await request.arrayBuffer());
  if (!signed(raw, request.headers.get("x-hmac-signature"), secret)) return json({ error: "bad_signature" }, 401);

  let event;
  try {
    event = JSON.parse(raw.toString("utf8"));
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (event.event !== "payment_intent.status.updated") return json({ ok: true });

  const pi = String(event.data?.id ?? "");
  const lead = await leadForIntent(pi);
  if (!lead) return json({ ok: true });

  const intent = await getIntent(pi);
  /* تعذّرت القراءة: ردّ بخطأ فيعيد Ziina المحاولة */
  if (!intent) return json({ error: "provider" }, 502);
  if (intent.status === "completed" && Object.values(PLANS).includes(intent.amount) && intent.currency_code === CURRENCY)
    await settle(lead, intent);
  return json({ ok: true });
}
