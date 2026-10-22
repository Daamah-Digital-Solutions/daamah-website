/**
 * «برنامج شركاء التأسيس» — دالة Vercel واحدة لرحلة الطلب كلّها.
 *
 * GET  /api/partners?seats       ← المقاعد المتبقية (للصفحة)
 * GET  /api/partners?pi=<id>     ← حالة الدفع (لصفحة الشكر) — ويُحتسب الدفع إن تمّ
 * POST /api/partners  action=apply    ← يحفظ الطلب أولًا، ثم يقرّر: مقبول / خارج النطاق / انتظار
 * POST /api/partners  action=pay      ← عملية دفع Ziina بالدرهم: 1,000 أو 2,000
 * POST /api/partners  action=booked   ← حجز اجتماع: مقعد محجوز حتى ميعاده
 *
 * القبول قاعدة ثابتة هنا لا في المتصفح: أي مجال مقبول إلا المتجر
 * والتطبيق والنظام المخصّص. والقبول وحده لا يحجز مقعدًا — الدفع أو
 * الاجتماع يحجزه.
 */
import { randomUUID } from "node:crypto";
import { capi, visitor } from "./_meta.js";
import { notify } from "./_notify.js";
import { CURRENCY, OUT_OF_SCOPE, PLANS, settle } from "./_partners.js";
import { getLead, hit, hold, holds, leadForIntent, linkIntent, ready, saveLead, seats, updateLead } from "./_store.js";
import { arabicUrl, clean, configured, createIntent, getIntent, json, latin, testMode } from "./_ziina.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+\d{8,15}$/;
const HOUR = 3600 * 1000;

/** إجابة اختيار: معرّفها (منه القرار) ونصّها كما رآه العميل (للفريق) */
const answer = (v, max = 80) => {
  const id = String(v?.id ?? "");
  if (!/^[a-z_]{2,24}$/.test(id)) return null;
  return { id, label: clean(v.label, max) };
};

const utmOf = (u = {}) => {
  const out = {};
  for (const k of ["source", "medium", "campaign", "content", "term", "fbclid", "gclid", "landing", "referrer"]) {
    const v = clean(u[k], 200);
    if (v) out[k] = v;
  }
  return out;
};

async function apply(request, body) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if ((await hit(`apply:${ip}`, 3600)) > 20) return json({ error: "rate_limited" }, 429);

  const industry = answer(body.industry);
  const presence = answer(body.presence);
  const goal = answer(body.goal);
  const company = clean(body.company, 100);
  const name = clean(body.name, 80);
  const phone = clean(body.phone, 20).replace(/[^\d+]/g, "");
  const email = clean(body.email, 120).toLowerCase();
  if (!industry || !presence || !goal || company.length < 2 || name.length < 2 || !PHONE.test(phone) || !EMAIL.test(email))
    return json({ error: "invalid" }, 422);
  /* «مجال آخر» — نصّه كما كتبه، بحدّ */
  if (industry.id === "other") industry.label = clean(body.industry.other, 60) || industry.label;

  const now = Date.now();
  const { remaining, total } = await seats();
  const decision = OUT_OF_SCOPE.has(industry.id) ? "out_of_scope" : remaining > 0 ? "accepted" : "waitlist";

  const lead = {
    id: randomUUID(),
    created: now,
    company,
    name,
    phone,
    email,
    answers: { industry, presence, goal },
    decision,
    status: decision,
    utm: utmOf(body.utm),
    visitor: visitor(request, body.client),
    history: [
      { status: "applied", at: now },
      { status: decision, at: now },
    ],
  };

  /* الحفظ أولًا — قبل الإشعار والقياس، فلا يضيع طلب إن تعطّل أيّهما */
  await saveLead(lead);
  await Promise.all([
    notify("lead.applied", lead, { remaining }),
    capi({ name: "Lead", id: `lead.${lead.id}`, lead, custom: { content_name: "founding_partners", status: decision } }),
  ]);
  return json({ id: lead.id, decision, remaining, total });
}

async function pay(request, body) {
  if (!configured()) return json({ error: "not_configured" }, 503);
  const plan = body.plan === "full" ? "full" : "deposit";
  const lead = await getLead(body.id);
  if (!lead || lead.decision === "out_of_scope") return json({ error: "not_found" }, 404);
  /* من انتظر في القائمة يدفع حين يفتح مقعد، ومن حجز اجتماعًا مقعده محجوز له */
  if ((await seats()).remaining < 1 && !(await holds(lead.id))) return json({ error: "full" }, 409);

  const origin = new URL(request.url).origin;
  const tel = latin(lead.phone);
  const co = latin(lead.company);
  const made = await createIntent({
    amount: PLANS[plan],
    currency: CURRENCY,
    messages: [co && `Founding Partners | ${co} | ${tel}`, `Founding Partners | ${tel}`, "Founding Partners Program"],
    successUrl: `${origin}/founding-partners/thank-you?pi={PAYMENT_INTENT_ID}`,
    cancelUrl: `${origin}/founding-partners?payment=cancelled`,
    failureUrl: `${origin}/founding-partners?payment=failed`,
  });
  if (!made.ok) return json({ error: "provider", ...made.detail }, 502);

  await linkIntent(made.id, lead.id);
  const next = await updateLead(lead.id, { checkout: { plan, intent: made.id }, history: [{ status: `checkout_${plan}`, at: Date.now() }] });
  await notify("lead.checkout", next, { plan, amount: PLANS[plan] / 100, currency: CURRENCY });
  return json({ id: made.id, url: arabicUrl(made.url) });
}

async function booked(body) {
  const lead = await getLead(body.id);
  if (!lead || lead.decision === "out_of_scope") return json({ error: "not_found" }, 404);
  const start = Date.parse(String(body.start ?? ""));
  const now = Date.now();
  /* المقعد محجوز حتى نهاية الاجتماع؛ بلا ميعاد معروف: يومان، أقصى ما يُحجز فيه */
  const until = Number.isFinite(start) && start > now && start < now + 7 * 24 * HOUR ? start + HOUR / 2 : now + 48 * HOUR;
  await hold(lead.id, until);
  const meeting = { start: Number.isFinite(start) ? new Date(start).toISOString() : null, uid: clean(body.uid, 80) || null };
  const next = await updateLead(lead.id, { status: lead.status.startsWith("paid") ? lead.status : "booked", meeting, history: [{ status: "booked", at: now }] });
  await Promise.all([
    notify("lead.booked", next, { meeting }),
    capi({ name: "Schedule", id: `schedule.${lead.id}`, lead: next, custom: { content_name: "founding_partners" } }),
  ]);
  return json({ ok: true, ...(await seats()) });
}

export async function POST(request) {
  if (!ready()) return json({ error: "not_configured" }, 503);
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  try {
    if (body.action === "apply") return await apply(request, body);
    if (body.action === "pay") return await pay(request, body);
    if (body.action === "booked") return await booked(body);
    return json({ error: "bad_request" }, 400);
  } catch (e) {
    console.error("partners", body.action, String(e));
    return json({ error: "server" }, 500);
  }
}

export async function GET(request) {
  if (!ready()) return json({ error: "not_configured" }, 503);
  const q = new URL(request.url).searchParams;
  try {
    if (q.has("seats")) {
      const { total, remaining } = await seats();
      return new Response(JSON.stringify({ total, remaining }), {
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=10, stale-while-revalidate=30" },
      });
    }

    const pi = q.get("pi") ?? "";
    let lead = await leadForIntent(pi);
    if (!lead || !configured()) return json({ status: "unknown" }, 404);
    const intent = await getIntent(pi);
    if (!intent) return json({ status: "unknown" }, 502);
    /* عمليتنا وحدها: مبلغ أحد الخيارين وبالدرهم */
    const ours = Object.values(PLANS).includes(intent.amount) && intent.currency_code === CURRENCY;
    if (!ours) return json({ status: "mismatch" });
    if (intent.status === "completed") lead = await settle(lead, intent);
    return json({
      status: intent.status,
      plan: intent.amount === PLANS.full ? "full" : "deposit",
      amount: intent.amount / 100,
      currency: CURRENCY,
      company: lead.company,
      test: testMode(),
    });
  } catch (e) {
    console.error("partners get", String(e));
    return json({ error: "server" }, 500);
  }
}
