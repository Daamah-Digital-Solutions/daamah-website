/**
 * لوحة «برنامج شركاء التأسيس» — لصاحب الحساب وحده.
 *
 * POST /api/partners-admin  { password, op }
 *   op=list     الطلبات وحالاتها، والمقاعد
 *   op=seats    { total, manual } — عدد المقاعد، وما احتُسب يدويًّا من خارج الموقع
 *   op=webhook  يربط حساب Ziina بمستقبِل الأحداث (`/api/ziina-hook`)
 *
 * كلمة السرّ في `FP_ADMIN_PASSWORD`، وإلا كلمة أداة روابط الدفع
 * (`PAY_LINK_PASSWORD`) — صاحب الحساب واحد.
 */
import { createHash, timingSafeEqual } from "node:crypto";
import { listLeads, ready, seats, setConfig } from "./_store.js";
import { configured, json, registerWebhook } from "./_ziina.js";

const digest = (v) => createHash("sha256").update(String(v)).digest();
const secret = () => process.env.FP_ADMIN_PASSWORD ?? process.env.PAY_LINK_PASSWORD;
const allowed = (given) => Boolean(secret()) && timingSafeEqual(digest(given), digest(secret()));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function POST(request) {
  if (!ready() || !secret()) return json({ error: "not_configured" }, 503);
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (!allowed(body.password ?? "")) {
    await sleep(900);
    return json({ error: "unauthorized" }, 401);
  }

  try {
    if (body.op === "seats") {
      const total = Number(body.total);
      const manual = Number(body.manual);
      if (!Number.isFinite(total) || !Number.isFinite(manual) || total < 0 || total > 500 || manual < 0 || manual > 500)
        return json({ error: "invalid" }, 422);
      return json({ seats: await setConfig({ total, manual }) });
    }

    if (body.op === "webhook") {
      if (!configured() || !process.env.ZIINA_WEBHOOK_SECRET) return json({ error: "webhook_not_configured" }, 503);
      const url = `${new URL(request.url).origin}/api/ziina-hook`;
      return json({ url, ...(await registerWebhook(url, process.env.ZIINA_WEBHOOK_SECRET)) });
    }

    /* بيانات القياس (العنوان والمتصفح) لا تُعرض في اللوحة */
    const leads = (await listLeads(300)).map(({ visitor: _v, ...l }) => l);
    return json({ leads, seats: await seats() });
  } catch (e) {
    console.error("partners admin", body.op, String(e));
    return json({ error: "server" }, 500);
  }
}
