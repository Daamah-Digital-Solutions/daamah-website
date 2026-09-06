import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang, type Bi } from "../i18n";
import { brand, packages, phoneFor, services } from "../content/home";
import { form } from "../content/form";
import { track } from "../analytics";
import { Arrow } from "./ui";

/* ── الحقول ─────────────────────────────────────────────── */

const fieldBase =
  "w-full border-b border-[var(--line)] bg-transparent pb-3 text-[16px] text-ink " +
  "outline-none transition-colors duration-(--dur-fast) " +
  "placeholder:text-ink/25 hover:border-[var(--line-strong)] focus:border-ink";

function Field({
  id,
  label,
  optional = false,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  const { t } = useLang();
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="tag flex items-baseline gap-2 text-ink/40">
        {label}
        {optional && <span className="text-ink/25">({t(form.optionalTag)})</span>}
      </label>
      {children}
      {/* الخطأ يُعلَن للقارئ الصوتي عند ظهوره لا عند رسم الصفحة */}
      <p role="alert" className={`text-[13.5px] text-red ${error ? "" : "hidden"}`}>
        {error}
      </p>
    </div>
  );
}

/* ── النموذج ────────────────────────────────────────────── */

type Values = {
  name: string;
  company: string;
  phone: string;
  interest: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<"name" | "phone" | "message", string>>;

const EMPTY: Values = {
  name: "",
  company: "",
  phone: "",
  interest: "",
  budget: "",
  message: "",
};

/**
 * نموذج طلب عرض سعر يُسلِّم على واتساب.
 *
 * لا خادم خلفه: النموذج يبني رسالة مرتّبة ويفتح بها واتساب، فتصل
 * كاملةً إلى نفس الرقم المعلن في الموقع. الفائدة أن الزائر يجيب على
 * أسئلة مرتّبة بدل أن يبدأ محادثة من فراغ — ونعرف من أين جاء.
 *
 * `?package=full` أو `?service=branding` في الرابط يختار مسبقًا،
 * فزرّ الباقة يصل ومعه ما ضُغط عليه.
 */
export function QuoteForm() {
  const { t, lang } = useLang();
  const [params] = useSearchParams();
  const uid = useId();

  const preselect = params.get("package") ?? params.get("service") ?? "";
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);

  /* الاختيار المسبق يُطبَّق بعد أول رسم لا فيه: الصفحة تُولَّد وقت
     البناء بلا سلسلة استعلام، فلو قرأناها في الحالة الابتدائية
     لاختلفت قيمة القائمة عمّا رُسم. */
  useEffect(() => {
    if (preselect) setValues((s) => ({ ...s, interest: preselect }));
  }, [preselect]);

  const set = (k: keyof Values) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    // الخطأ يختفي بمجرّد أن يبدأ التصحيح، لا عند الإرسال التالي
    setErrors((e) => (k in e ? { ...e, [k]: undefined } : e));
    if (!engaged) {
      setEngaged(true);
      track("quote_form_open");
    }
  };

  /** خيارات القائمة — الباقات ثم الخدمات، من نفس مصدر الصفحات. */
  const groups = useMemo(
    () => [
      {
        label: t(form.fields.interest.packagesGroup),
        options: packages.items.map((p) => ({ key: p.slug, label: t(p.name) })),
      },
      {
        label: t(form.fields.interest.servicesGroup),
        options: services.items.map((s) => ({ key: s.slug, label: t(s.name) })),
      },
    ],
    [t],
  );

  /** التسمية المقروءة لما اختاره الزائر — للرسالة لا للقيمة. */
  const interestLabel = useMemo(() => {
    for (const g of groups) {
      const hit = g.options.find((o) => o.key === values.interest);
      if (hit) return hit.label;
    }
    return values.interest === "other" ? t(form.fields.interest.other) : "";
  }, [groups, values.interest, t]);

  function validate(v: Values): Errors {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = t(form.errors.name);
    // رقم مقبول: ستّة أرقام فأكثر بعد تجريد الفواصل والرموز
    if ((v.phone.match(/\d/g) ?? []).length < 6) e.phone = t(form.errors.phone);
    if (v.message.trim().length < 10) e.message = t(form.errors.message);
    return e;
  }

  /** يبني نصّ الرسالة بلغة الزائر — نحن نقرأها لا هو. */
  function compose(v: Values): string {
    const w = form.wa;
    const line = (k: Bi, val: string) => (val ? `${t(k)}: ${val}` : null);
    const budget = form.fields.budget.options.find((o) => o.key === v.budget);

    return [
      `*${t(w.heading)} — ${brand.domain}*`,
      "",
      line(w.name, v.name.trim()),
      line(w.company, v.company.trim()),
      line(w.phone, v.phone.trim()),
      line(w.interest, interestLabel),
      budget ? `${t(w.budget)}: ${t(budget.label)}` : null,
      "",
      `*${t(w.message)}*`,
      v.message.trim(),
      "",
      `${t(w.source)}: ${window.location.origin}${window.location.pathname}`,
    ]
      .filter((l) => l !== null)
      .join("\n");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // ينقل التركيز إلى أول حقل خاطئ بدل ترك الزائر يبحث عنه
      const first = (["name", "phone", "message"] as const).find((k) => found[k]);
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    const url = `https://wa.me/${phoneFor().raw.replace(/\D/g, "")}?text=${encodeURIComponent(
      compose(values),
    )}`;

    track("lead", {
      interest: values.interest || "unspecified",
      budget: values.budget || "unspecified",
      lang,
    });

    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  /* ── بعد الإرسال ── */
  if (waUrl) {
    return (
      <div className="border-t border-[var(--line)] pt-10">
        <h3 className="text-[24px] font-medium sm:text-[28px]">{t(form.sent.title)}</h3>
        <p className="body mt-4 max-w-[46ch]">{t(form.sent.body)}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn group inline-flex items-center rounded-pill bg-ink px-7 py-3.5 text-[14.5px] font-medium text-paper hover:text-white [--btn-fill:var(--color-red)]"
          >
            <span className="inline-flex items-center gap-2.5">
              {t(form.sent.retry)}
              <Arrow className="size-4" />
            </span>
          </a>
          <button
            type="button"
            onClick={() => {
              setValues({ ...EMPTY, interest: preselect });
              setWaUrl(null);
            }}
            className="ulink text-[14.5px] font-medium text-ink/60 transition-colors duration-(--dur-fast) hover:text-ink"
          >
            {t(form.sent.again)}
          </button>
        </div>
      </div>
    );
  }

  const f = form.fields;

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field id={`${uid}-name`} label={t(f.name.label)} error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder={t(f.name.placeholder)}
            aria-invalid={!!errors.name}
            className={fieldBase}
          />
        </Field>

        <Field id={`${uid}-company`} label={t(f.company.label)} optional>
          <input
            id={`${uid}-company`}
            name="organization"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set("company")(e.target.value)}
            placeholder={t(f.company.placeholder)}
            className={fieldBase}
          />
        </Field>

        <Field id={`${uid}-phone`} label={t(f.phone.label)} error={errors.phone}>
          <input
            id={`${uid}-phone`}
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder={t(f.phone.placeholder)}
            aria-invalid={!!errors.phone}
            className={`${fieldBase} rtl:text-right`}
          />
        </Field>

        <Field id={`${uid}-interest`} label={t(f.interest.label)}>
          <select
            id={`${uid}-interest`}
            name="interest"
            value={values.interest}
            onChange={(e) => set("interest")(e.target.value)}
            className={`${fieldBase} cursor-pointer`}
          >
            <option value="">{t(f.interest.placeholder)}</option>
            {groups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="other">{t(f.interest.other)}</option>
          </select>
        </Field>
      </div>

      <Field id={`${uid}-budget`} label={t(f.budget.label)} optional>
        <select
          id={`${uid}-budget`}
          name="budget"
          value={values.budget}
          onChange={(e) => set("budget")(e.target.value)}
          className={`${fieldBase} cursor-pointer`}
        >
          <option value="">{t(f.interest.placeholder)}</option>
          {f.budget.options.map((o) => (
            <option key={o.key} value={o.key}>
              {t(o.label)}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${uid}-message`} label={t(f.message.label)} error={errors.message}>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder={t(f.message.placeholder)}
          aria-invalid={!!errors.message}
          className={`${fieldBase} resize-y`}
        />
      </Field>

      <div>
        <button
          type="submit"
          className="btn group inline-flex items-center rounded-pill bg-ink px-8 py-4 text-[15px] font-medium text-paper hover:text-white [--btn-fill:var(--color-red)]"
        >
          <span className="inline-flex items-center gap-2.5">
            {t(form.submit)}
            <Arrow className="size-4" />
          </span>
        </button>
      </div>
    </form>
  );
}
