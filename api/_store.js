/**
 * تخزين «برنامج شركاء التأسيس» — الطلبات وعدّاد المقاعد.
 *
 * Redis من Upstash عبر واجهته REST: `fetch` وحده، بلا مكتبة ولا اتصال
 * دائم يحتاج دالة تعيش. يُنشأ من Vercel ← Storage ← Upstash for Redis،
 * فتُضاف متغيّراته إلى المشروع وحدها:
 *   KV_REST_API_URL / KV_REST_API_TOKEN       (أو UPSTASH_REDIS_REST_URL / _TOKEN)
 *
 * بلا متغيّرات وخارج Vercel (التطوير المحلي) يحفظ في الذاكرة. وعلى
 * Vercel بلا متغيّرات لا يحفظ أبدًا: `ready()` يعود `false`، والطلب
 * يُرفض فيُحوَّل العميل إلى واتساب — لا طلب يضيع في ذاكرة تُمسح.
 *
 * المفاتيح:
 *   fp:lead:<id>    الطلب كاملًا (JSON)
 *   fp:leads        ترتيب الطلبات بوقت إنشائها
 *   fp:intent:<pi>  عملية دفع ← طلبها
 *   fp:paid         من دفع — كل واحد مقعد
 *   fp:holds        من حجز اجتماعًا — مقعد محجوز حتى ميعاده (الدرجة)
 *   fp:config       المقاعد كلّها، وما احتُسب يدويًّا من خارج الموقع
 */

const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const remote = Boolean(URL_ && TOKEN);

/** هل يوجد مكان يُحفظ فيه؟ */
export const ready = () => remote || !process.env.VERCEL;

export const SEATS_DEFAULT = 10;

/* ── Redis ───────────────────────────────────────────────────────── */

async function pipeline(commands) {
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const out = await res.json();
  for (const r of out) if (r.error) throw new Error(`redis ${r.error}`);
  return out.map((r) => r.result);
}
const redis = async (...command) => (await pipeline([command]))[0];

/* ── الذاكرة — للتطوير المحلي وحده ───────────────────────────────── */

const mem = globalThis.__fpStore ?? (globalThis.__fpStore = {
  kv: new Map(),
  leads: new Map(),
  paid: new Set(),
  holds: new Map(),
  hits: new Map(),
});

/* ── الطلبات ─────────────────────────────────────────────────────── */

export async function saveLead(lead) {
  if (!remote) {
    mem.kv.set(`fp:lead:${lead.id}`, JSON.stringify(lead));
    mem.leads.set(lead.id, lead.created);
    return;
  }
  await pipeline([
    ["SET", `fp:lead:${lead.id}`, JSON.stringify(lead)],
    ["ZADD", "fp:leads", lead.created, lead.id],
  ]);
}

export async function getLead(id) {
  if (!/^[\w-]{8,64}$/.test(String(id ?? ""))) return null;
  const raw = remote ? await redis("GET", `fp:lead:${id}`) : mem.kv.get(`fp:lead:${id}`);
  return raw ? JSON.parse(raw) : null;
}

/** يدمج حقولًا في الطلب ويعيده كما صار */
export async function updateLead(id, patch) {
  const lead = await getLead(id);
  if (!lead) return null;
  const next = { ...lead, ...patch, history: [...(lead.history ?? []), ...(patch.history ?? [])] };
  if (remote) await redis("SET", `fp:lead:${id}`, JSON.stringify(next));
  else mem.kv.set(`fp:lead:${id}`, JSON.stringify(next));
  return next;
}

export async function listLeads(limit = 200) {
  let ids;
  if (remote) ids = await redis("ZRANGE", "fp:leads", 0, limit - 1, "REV");
  else ids = [...mem.leads.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([id]) => id);
  if (!ids.length) return [];
  const raws = remote ? await redis("MGET", ...ids.map((id) => `fp:lead:${id}`)) : ids.map((id) => mem.kv.get(`fp:lead:${id}`));
  return raws.filter(Boolean).map((r) => JSON.parse(r));
}

/* ── الدفع ───────────────────────────────────────────────────────── */

export async function linkIntent(pi, id) {
  if (remote) await redis("SET", `fp:intent:${pi}`, id);
  else mem.kv.set(`fp:intent:${pi}`, id);
}

export async function leadForIntent(pi) {
  if (!/^[\w-]{6,80}$/.test(String(pi ?? ""))) return null;
  const id = remote ? await redis("GET", `fp:intent:${pi}`) : mem.kv.get(`fp:intent:${pi}`);
  return id ? getLead(id) : null;
}

/**
 * يحتسب مقعدًا لمن دفع. يعود `true` في المرّة الأولى وحدها — فما يتبع
 * الدفع (إشعار الفريق، حدث الشراء) يحدث مرّة واحدة وإن تأكّد الدفع
 * من الـ webhook ومن صفحة الشكر معًا.
 */
export async function markPaid(id) {
  if (!remote) {
    const fresh = !mem.paid.has(id);
    mem.paid.add(id);
    mem.holds.delete(id);
    return fresh;
  }
  const [added] = await pipeline([
    ["SADD", "fp:paid", id],
    ["ZREM", "fp:holds", id],
  ]);
  return added === 1;
}

/* ── المقاعد ─────────────────────────────────────────────────────── */

/** يحجز مقعدًا حتى `until` (ms) — لمن حجز اجتماعًا */
export async function hold(id, until) {
  if (remote) await redis("ZADD", "fp:holds", until, id);
  else mem.holds.set(id, until);
}

export async function holds(id) {
  const now = Date.now();
  if (!remote) return (mem.holds.get(id) ?? 0) > now;
  const score = await redis("ZSCORE", "fp:holds", id);
  return Number(score ?? 0) > now;
}

async function config() {
  const raw = remote ? await redis("GET", "fp:config") : mem.kv.get("fp:config");
  const c = raw ? JSON.parse(raw) : {};
  return { total: Number(c.total ?? SEATS_DEFAULT), manual: Number(c.manual ?? 0) };
}

export async function setConfig({ total, manual }) {
  const c = { total: Math.max(0, Math.round(total)), manual: Math.max(0, Math.round(manual)) };
  if (remote) await redis("SET", "fp:config", JSON.stringify(c));
  else mem.kv.set("fp:config", JSON.stringify(c));
  return seats();
}

/**
 * المقاعد كما تُعرض: من دفع، ومن حجز اجتماعًا لم يحن ميعاده، وما
 * احتُسب يدويًّا (اتفاق تمّ خارج الموقع). القبول وحده لا يحجز.
 */
export async function seats() {
  const now = Date.now();
  const { total, manual } = await config();
  let paid, held;
  if (remote) [paid, held] = await pipeline([["SCARD", "fp:paid"], ["ZCOUNT", "fp:holds", now, "+inf"]]);
  else {
    paid = mem.paid.size;
    held = [...mem.holds.values()].filter((t) => t > now).length;
  }
  const taken = Number(paid) + Number(held) + manual;
  return { total, paid: Number(paid), held: Number(held), manual, remaining: Math.max(0, total - taken) };
}

/* ── حدّ الطلبات ─────────────────────────────────────────────────── */

/** عدد مرّات `key` خلال `ttl` ثانية — لحدّ الطلبات من عنوان واحد */
export async function hit(key, ttl) {
  if (!remote) {
    const now = Date.now();
    const h = mem.hits.get(key);
    const next = h && h.until > now ? { n: h.n + 1, until: h.until } : { n: 1, until: now + ttl * 1000 };
    mem.hits.set(key, next);
    return next.n;
  }
  const [n] = await pipeline([
    ["INCR", `fp:rl:${key}`],
    ["EXPIRE", `fp:rl:${key}`, ttl, "NX"],
  ]);
  return Number(n);
}
