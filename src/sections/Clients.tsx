import { useLang } from "../i18n";
import { testimonials } from "../content/testimonials";
import { workItems } from "../content/work";
import { Testimonials } from "./Testimonials";
import { Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/**
 * من عملنا معهم.
 *
 * آراء العملاء حين تصل؛ وحتى تصل، قائمة أسماء العملاء نصًّا — كلّها
 * منشورة أصلًا في صفحات الأعمال. قائمة أسماء أقوى من خانة فاضية،
 * وأصدق من رأي مؤلَّف.
 */
export function Clients() {
  const { t } = useLang();

  if (testimonials.length > 0) return <Testimonials />;

  /* اسم العميل مرّة واحدة وإن تعدّدت أعماله */
  const seen = new Set<string>();
  const names = workItems.filter((w) => {
    const key = w.client ?? w.slug;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <section className="relative py-24 sm:py-32">
      <Wrap>
        <Reveal>
          <SectionLabel index="04">{t({ ar: "من عملنا معهم", en: "Who we've worked with" })}</SectionLabel>
        </Reveal>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--line)] pt-8">
          {names.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 6) * 40} as="li">
              <TextLink href={`/work/${w.slug}`} className="text-[16px] text-ink/75 hover:text-ink">
                {t(w.name)}
              </TextLink>
            </Reveal>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
