import { useState } from "react";

type Lead = {
  id: string;
  created: number;
  company: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  answers: Record<"industry" | "presence" | "goal", { id: string; label: string }>;
  utm?: Record<string, string>;
  meeting?: { start: string | null };
};
type Seats = { total: number; paid: number; held: number; manual: number; remaining: number };

const STATUS: Record<string, string> = {
  accepted: "مقبول",
  out_of_scope: "خارج النطاق",
  waitlist: "قائمة الانتظار",
  booked: "حجز اجتماع",
  paid_deposit: "دفع دفعة أولى",
  paid_full: "دفع كامل",
};

const input =
  "w-full rounded-[12px] border border-[var(--line-strong)] bg-paper px-4 py-3 text-[16px] text-ink outline-none transition-colors focus:border-ink";
const when = (t: number | string) =>
  new Date(t).toLocaleString("en-GB", { timeZone: "Asia/Dubai", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

/**
 * لوحة «برنامج شركاء التأسيس» — الطلبات وحالاتها، والمقاعد، وربط Ziina.
 * لصاحب الحساب وحده: كلمة السرّ تُرسل مع كل طلب والخادم يتحقّق.
 */
export function FoundingAdminPage() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<{ leads: Lead[]; seats: Seats } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [hook, setHook] = useState<string | null>(null);

  const call = async (op: string, extra: Record<string, unknown> = {}, pass = password) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/partners-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass, op, ...extra }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(
          body.error === "unauthorized"
            ? "كلمة السرّ غير صحيحة."
            : body.error === "not_configured"
              ? "اللوحة غير مفعّلة: قاعدة البيانات أو كلمة السرّ غير مضبوطة في Vercel."
              : body.error === "webhook_not_configured"
                ? "أضف ZIINA_WEBHOOK_SECRET في Vercel أولًا."
                : "حصل خطأ. حاول مرة ثانية.",
        );
        return null;
      }
      return body;
    } catch {
      setError("تعذّر الاتصال.");
      return null;
    } finally {
      setBusy(false);
    }
  };

  const load = async (pass = password) => {
    const body = await call("list", {}, pass);
    if (body) setData(body);
  };

  if (!data)
    return (
      <div className="grid min-h-dvh place-items-center bg-paper px-4 text-ink">
        <form
          className="w-full max-w-[380px] space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
        >
          <h1 className="text-[24px] font-bold">لوحة شركاء التأسيس</h1>
          <input type="text" name="username" autoComplete="username" defaultValue="daamah-founding-partners" readOnly hidden />
          <input
            type="password"
            required
            autoComplete="current-password"
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="كلمة السرّ"
            placeholder="كلمة السرّ"
            className={input}
          />
          {error && <p className="text-[14px] text-red">{error}</p>}
          <button disabled={busy} className="w-full rounded-full bg-ink px-6 py-3.5 font-bold text-paper disabled:opacity-60">
            دخول
          </button>
        </form>
      </div>
    );

  const s = data.seats;
  return (
    <div className="min-h-dvh bg-paper px-4 py-10 text-ink sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[26px] font-bold">لوحة شركاء التأسيس</h1>
          <button type="button" onClick={() => load()} disabled={busy} className="rounded-full border border-[var(--line-strong)] px-5 py-2.5 text-[14px] font-bold">
            تحديث
          </button>
        </div>
        {error && <p className="mt-4 text-[14px] text-red">{error}</p>}

        {/* المقاعد */}
        <form
          className="mt-6 grid gap-4 rounded-[18px] border border-[var(--line)] p-5 sm:grid-cols-[repeat(4,auto)_1fr] sm:items-end"
          onSubmit={async (e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const body = await call("seats", { total: Number(f.get("total")), manual: Number(f.get("manual")) });
            if (body) setData({ ...data, seats: body.seats });
          }}
        >
          <div>
            <p className="text-[13px] text-ink/60">المتبقي</p>
            <p className="nums text-[34px] font-bold leading-none">{s.remaining}</p>
          </div>
          <p className="nums text-[14px] text-ink/70">
            دفع: {s.paid} · اجتماعات قادمة: {s.held}
          </p>
          <label className="block">
            <span className="mb-1 block text-[13px] text-ink/60">كل المقاعد</span>
            <input name="total" type="number" min={0} max={500} defaultValue={s.total} dir="ltr" className={`${input} w-28`} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] text-ink/60">محجوزة يدويًّا</span>
            <input name="manual" type="number" min={0} max={500} defaultValue={s.manual} dir="ltr" className={`${input} w-28`} />
          </label>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <button disabled={busy} className="rounded-full bg-ink px-5 py-3 text-[14px] font-bold text-paper disabled:opacity-60">
              حفظ المقاعد
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                const body = await call("webhook");
                if (body) setHook(body.ok ? `تم الربط: ${body.url}` : `رفض Ziina (${body.status}): ${body.message}`);
              }}
              className="rounded-full border border-[var(--line-strong)] px-5 py-3 text-[14px] font-bold disabled:opacity-60"
            >
              ربط Ziina webhook
            </button>
          </div>
        </form>
        {hook && <p className="ltr mt-3 text-[13.5px] text-ink/70">{hook}</p>}

        {/* الطلبات */}
        <p className="mt-8 text-[14px] text-ink/60">الطلبات: {data.leads.length}</p>
        <div className="mt-3 overflow-x-auto rounded-[18px] border border-[var(--line)]">
          <table className="w-full min-w-[960px] text-start text-[13.5px]">
            <thead className="bg-paper-2 text-ink/65">
              <tr>
                {["الوقت", "الشركة", "الاسم", "الواتساب", "الإيميل", "المجال", "الحضور", "الهدف", "الحالة", "المصدر"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-start font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {data.leads.map((l) => (
                <tr key={l.id} className="align-top">
                  <td className="nums whitespace-nowrap px-3 py-2.5">{when(l.created)}</td>
                  <td className="px-3 py-2.5 font-bold">{l.company}</td>
                  <td className="px-3 py-2.5">{l.name}</td>
                  <td className="px-3 py-2.5">
                    <a href={`https://wa.me/${l.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="ltr nums underline underline-offset-2">
                      {l.phone}
                    </a>
                  </td>
                  <td className="ltr px-3 py-2.5">{l.email}</td>
                  <td className="px-3 py-2.5">{l.answers.industry.label}</td>
                  <td className="px-3 py-2.5">{l.answers.presence.label}</td>
                  <td className="px-3 py-2.5">{l.answers.goal.label}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-semibold">
                    {STATUS[l.status] ?? l.status}
                    {l.meeting?.start && <span className="nums block text-[12px] font-normal text-ink/60">{when(l.meeting.start)}</span>}
                  </td>
                  <td className="ltr px-3 py-2.5 text-[12px] text-ink/60">
                    {[l.utm?.source, l.utm?.campaign, l.utm?.content].filter(Boolean).join(" · ") || (l.utm?.fbclid ? "meta-ads" : "—")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
