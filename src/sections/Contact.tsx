import { useLang } from "../i18n";
import { brand, contact } from "../content/home";
import { track } from "../analytics";
import { Arrow, MaskLines, Reveal, SectionLabel, Wrap } from "../components/ui";

/** رابط تواصل كبير — الوسيلة نفسها هي زرّ النداء، لا نموذج معطّل. */
function Channel({
  href,
  label,
  value,
  event,
  external = false,
}: {
  href: string;
  label: string;
  value: string;
  event: "whatsapp_click" | "email_click";
  external?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={() => track(event)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center justify-between gap-6 border-t border-[var(--line)] py-7 last:border-b"
    >
      <span className="flex flex-col gap-2">
        <span className="tag text-ink/40">{label}</span>
        <span className="ltr text-[19px] font-medium transition-transform duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1 sm:text-[23px] rtl:group-hover:-translate-x-1">
          {value}
        </span>
      </span>
      <Arrow className="size-5 shrink-0 text-ink/25 transition-[color,transform] duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1.5 group-hover:text-red rtl:group-hover:-translate-x-1.5" />
    </a>
  );
}

export function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="relative py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index="07">{t(contact.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-14 sm:mt-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <MaskLines lines={t(contact.lede)} as="h2" className="lede" accentDot />
            <Reveal delay={160}>
              <p className="body mt-8 max-w-[44ch]">{t(contact.body)}</p>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-6">
            <Channel
              href={`mailto:${brand.email}`}
              label={t(contact.emailLabel)}
              value={brand.email}
              event="email_click"
            />
            <Channel
              href={brand.whatsapp}
              label={t(contact.whatsappLabel)}
              value={brand.phone}
              event="whatsapp_click"
              external
            />
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
