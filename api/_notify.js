/**
 * إشعار n8n بكل حدث في رحلة الطلب — منه تخرج رسائل الواتساب والإيميل
 * والتذكيرات ونسخة الشيت.
 *
 *   N8N_WEBHOOK_URL     رابط عقدة Webhook في n8n
 *   N8N_WEBHOOK_SECRET  يُرسل في `X-Daamah-Secret` — تتحقّق منه n8n قبل أن تعمل
 *
 * الطلب محفوظ قبل الإشعار دائمًا: إن تعطّلت n8n لا يضيع شيء، والطلب
 * ظاهر في لوحة البرنامج.
 */

/** الأحداث: lead.applied · lead.checkout · lead.booked · lead.paid */
export async function notify(event, lead, extra = {}) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return;
  /* بيانات القياس لا تعني n8n في شيء */
  const { visitor: _v, ...data } = lead;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_WEBHOOK_SECRET && { "X-Daamah-Secret": process.env.N8N_WEBHOOK_SECRET }),
      },
      body: JSON.stringify({ event, at: new Date().toISOString(), lead: data, ...extra }),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) console.error("n8n", event, res.status);
  } catch (e) {
    console.error("n8n", event, String(e));
  }
}
