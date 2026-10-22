/**
 * Meta Conversions API — الأحداث المهمّة من الخادم.
 *
 * البكسل في المتصفح يضيع مع حاجبات الإعلانات وقيود iOS. الحدث نفسه
 * يُرسل من هنا أيضًا بالمعرّف نفسه (`event_id`)، فتعدّه ميتا مرّة واحدة
 * وتأخذ ما وصل منهما.
 *
 * متغيّرات البيئة:
 *   META_CAPI_TOKEN        رمز الوصول من Events Manager ← Settings ← Conversions API — سرّي
 *   META_PIXEL_ID          مُعرِّف البكسل (وإلا VITE_META_PIXEL_ID)
 *   META_TEST_EVENT_CODE   رمز «Test events» — للتجربة وحدها، يُحذف بعدها
 */
import { createHash } from "node:crypto";

const VERSION = "v23.0";
const PIXEL = process.env.META_PIXEL_ID ?? process.env.VITE_META_PIXEL_ID;

const sha = (v) => createHash("sha256").update(v).digest("hex");

/** ما يعرّف الزائر لميتا — من الطلب نفسه، يُحفظ مع الطلب للأحداث اللاحقة */
export function visitor(request, client = {}) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "";
  return {
    /* من رفض التتبّع في متصفحه (أو جاء من خارج daamah.net) لا يُرسل عنه شيء */
    consent: client.consent === true,
    ip,
    ua: String(request.headers.get("user-agent") ?? "").slice(0, 400),
    fbp: /^fb\.\d\.\d+\.\d+$/.test(client.fbp ?? "") ? client.fbp : undefined,
    fbc: /^fb\.\d\.\d+\.[\w-]+$/.test(client.fbc ?? "") ? client.fbc : undefined,
    url: String(client.url ?? "").slice(0, 300),
  };
}

/**
 * يرسل حدثًا واحدًا. لا يرمي أبدًا: فشل القياس لا يوقف طلبًا ولا دفعًا.
 * `lead` صاحب الحدث: إيميله ورقمه يُرسلان مُجزّأين (SHA-256) لا نصًّا.
 */
export async function capi({ name, id, lead, custom }) {
  const v = lead?.visitor;
  if (!process.env.META_CAPI_TOKEN || !PIXEL || !v?.consent) return;
  const user = {
    em: lead.email ? [sha(lead.email.trim().toLowerCase())] : undefined,
    ph: lead.phone ? [sha(lead.phone.replace(/\D/g, ""))] : undefined,
    external_id: [sha(lead.id)],
    client_ip_address: v.ip || undefined,
    client_user_agent: v.ua || undefined,
    fbp: v.fbp,
    fbc: v.fbc,
  };
  const body = {
    data: [
      {
        event_name: name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: id,
        action_source: "website",
        event_source_url: v.url || undefined,
        user_data: user,
        custom_data: custom,
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE && { test_event_code: process.env.META_TEST_EVENT_CODE }),
  };
  try {
    const res = await fetch(
      `https://graph.facebook.com/${VERSION}/${PIXEL}/events?access_token=${encodeURIComponent(process.env.META_CAPI_TOKEN)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(4000) },
    );
    if (!res.ok) console.error("meta capi", name, res.status, (await res.text()).slice(0, 300));
  } catch (e) {
    console.error("meta capi", name, String(e));
  }
}
