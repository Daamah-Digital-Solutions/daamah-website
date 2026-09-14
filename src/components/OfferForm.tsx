import { useId, useState, type ReactNode } from "react";
import { brand, phoneFor } from "../content/home";
import { nationalDay as nd } from "../content/nationalDay";
import { track } from "../analytics";
import { sourceLine, utmParams } from "../utm";
import { Arrow } from "./ui";

function Field({
  id,
  label,
  optional,
  error,
  tone,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  tone: "ink" | "paper";
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className={`flex items-baseline gap-2 text-[14px] font-medium ${tone === "paper" ? "text-paper/80" : "text-ink/70"}`}>
        {label}
        {optional && <span className={tone === "paper" ? "text-paper/40" : "text-ink/35"}>({nd.form.optional})</span>}
      </label>
      {children}
      <p role="alert" className={`text-[13.5px] text-red ${error ? "" : "hidden"}`}>
        {error}
      </p>
    </div>
  );
}

type Values = { name: string; company: string; activity: string };
type Errors = Partial<Record<"name" | "activity", string>>;
const EMPTY: Values = { name: "", company: "", activity: "" };

/**
 * نموذج حجز العرض — ثلاث خانات ثم واتساب.
 *
 * بلا رقم جوال: الطلب يصل رسالةً على واتساب، فالرقم يصل معه تلقائيًا
 * — وسؤال الزائر عنه خانةٌ زائدة تُسقط جزءًا من الزوّار بلا فائدة.
 * الاسم والنشاط يكفيان لبدء محادثة مؤهَّلة، واسم الشركة اختياري.
 *
 * لا خادم للموقع: الرسالة تُبنى هنا ومعها الحملة التي جاء منها
 * الزائر، وحدث `lead` يُرسل قبل فتح واتساب فتقيسه ميتا وجوجل.
 *
 * `tone` لأن النموذج يظهر على الورق أعلى الصفحة وعلى الحبر في خاتمتها.
 */
export function OfferForm({ placement, tone = "ink" }: { placement: string; tone?: "ink" | "paper" }) {
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const f = nd.form;
  const onInk = tone === "paper";

  const input =
    "w-full rounded-[14px] border px-4 py-3.5 text-[16px] outline-none transition-colors duration-(--dur-fast) " +
    (onInk
      ? "border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/35 hover:border-paper/30 focus:border-paper/70"
      : "border-[var(--line-strong)] bg-paper text-ink placeholder:text-ink/30 hover:border-ink/40 focus:border-ink");

  const set = (k: keyof Values) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => (k in e ? { ...e, [k]: undefined } : e));
    if (!engaged) {
      setEngaged(true);
      track("quote_form_open", { offer: "national_day", placement });
    }
  };

  function validate(v: Values): Errors {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = f.errors.name;
    if (v.activity.trim().length < 2) e.activity = f.errors.activity;
    return e;
  }

  function compose(v: Values): string {
    const w = f.wa;
    const campaign = sourceLine();
    return [
      `*${w.heading} — ${brand.domain}*`,
      "",
      w.greeting,
      w.intent,
      "",
      `${w.name}: ${v.name.trim()}`,
      v.company.trim() ? `${w.company}: ${v.company.trim()}` : null,
      `${w.activity}: ${v.activity.trim()}`,
      "",
      `${w.source}: ${window.location.origin}${window.location.pathname}`,
      campaign ? `${w.campaign}: ${campaign}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["name", "activity"] as const).find((k) => found[k]);
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const url = `https://wa.me/${phoneFor().raw.replace(/\D/g, "")}?text=${encodeURIComponent(compose(values))}`;
    track("lead", {
      offer: "national_day",
      placement,
      lang: "ar",
      activity: values.activity.trim().slice(0, 60),
      has_company: !!values.company.trim(),
      ...utmParams(),
    });
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const submitCls = onInk
    ? "bg-paper text-ink hover:text-white [--btn-fill:var(--color-red)]"
    : "bg-ink text-paper hover:text-white [--btn-fill:var(--color-red)]";

  if (waUrl) {
    return (
      <div className={`rounded-[14px] border p-6 ${onInk ? "border-paper/15" : "border-[var(--line)] bg-paper"}`}>
        <p className="text-[21px] font-semibold leading-snug">{f.sent.title}</p>
        <p className={`mt-3 text-[15px] leading-[1.9] ${onInk ? "text-paper/70" : "text-ink/65"}`}>{f.sent.body}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn group inline-flex items-center rounded-pill px-6 py-3.5 text-[14.5px] font-medium ${submitCls}`}
          >
            <span className="inline-flex items-center gap-2.5">
              {f.sent.retry}
              <Arrow className="size-4" />
            </span>
          </a>
          <button
            type="button"
            onClick={() => setWaUrl(null)}
            className={`ulink text-[14.5px] font-medium transition-colors duration-(--dur-fast) ${onInk ? "text-paper/60 hover:text-paper" : "text-ink/60 hover:text-ink"}`}
          >
            {f.sent.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <Field id={`${uid}-name`} label={f.fields.name.label} error={errors.name} tone={tone}>
        <input
          id={`${uid}-name`}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => set("name")(e.target.value)}
          placeholder={f.fields.name.placeholder}
          aria-invalid={!!errors.name}
          className={input}
        />
      </Field>
      <Field id={`${uid}-activity`} label={f.fields.activity.label} error={errors.activity} tone={tone}>
        <input
          id={`${uid}-activity`}
          name="activity"
          value={values.activity}
          onChange={(e) => set("activity")(e.target.value)}
          placeholder={f.fields.activity.placeholder}
          aria-invalid={!!errors.activity}
          className={input}
        />
      </Field>
      <Field id={`${uid}-company`} label={f.fields.company.label} optional tone={tone}>
        <input
          id={`${uid}-company`}
          name="organization"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => set("company")(e.target.value)}
          placeholder={f.fields.company.placeholder}
          className={input}
        />
      </Field>
      <div className="mt-1 flex flex-col gap-3.5">
        <button
          type="submit"
          className={`btn group inline-flex w-full items-center justify-center rounded-pill px-8 py-[18px] text-[16.5px] font-semibold ${submitCls}`}
        >
          <span className="inline-flex items-center gap-2.5">
            {f.submit}
            <Arrow className="size-4" />
          </span>
        </button>
        <p className={`text-center text-[13.5px] ${onInk ? "text-paper/55" : "text-ink/50"}`}>{f.assurance}</p>
      </div>
    </form>
  );
}
