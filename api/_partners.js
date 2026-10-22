/**
 * ما تشترك فيه دالّة البرنامج ومستقبِل أحداث Ziina — ليس مسارًا.
 */
import { capi } from "./_meta.js";
import { notify } from "./_notify.js";
import { markPaid, updateLead } from "./_store.js";

export const CURRENCY = "AED";
/** خياران للدفع، بالفلس — المبلغ يحدّده الخادم لا المتصفح */
export const PLANS = { deposit: 100000, full: 200000 };

/** المجالات خارج نطاق البرنامج — قاعدة ثابتة لا تقدير */
export const OUT_OF_SCOPE = new Set(["ecommerce", "app", "system"]);

/**
 * يتمّ الدفع: مقعد يُحتسب، والطلب يُحدَّث، والفريق يُبلَّغ، وميتا تعرف.
 * مرّة واحدة لكل طلب — وإن أكّده الـ webhook وصفحة الشكر كلاهما.
 */
export async function settle(lead, intent) {
  const plan = intent.amount === PLANS.full ? "full" : "deposit";
  if (!(await markPaid(lead.id))) return lead;
  const status = plan === "full" ? "paid_full" : "paid_deposit";
  const next = await updateLead(lead.id, {
    status,
    plan,
    paidAt: Date.now(),
    intent: intent.id,
    history: [{ status, at: Date.now() }],
  });
  await Promise.all([
    notify("lead.paid", next, { plan, amount: intent.amount / 100, currency: CURRENCY }),
    capi({
      name: "Purchase",
      id: `purchase.${intent.id}`,
      lead: next,
      custom: { value: intent.amount / 100, currency: CURRENCY, content_name: "founding_partners", content_type: "product" },
    }),
  ]);
  return next;
}
