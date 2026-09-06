import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { services } from "../content/home";
import { areas } from "../content/areas";
import { Chevron, MaskLines, Reveal, SectionLabel, TextLink, Wrap } from "../components/ui";

/**
 * السردية في الرئيسية — ثلاثة عوامل لا تسع خدمات.
 *
 * الشبكة القديمة كانت تعرض الخدمات كلّها هنا، فتقرأ الرئيسية قائمةَ
 * وكالة. الآن تُعرض العوامل الثلاثة ووعد كلٍّ منها، وأسماء خدماته
 * روابطَ فحسب؛ الشرح يعيش في `/services`.
 */
export function Services() {
  const { t, path } = useLang();

  return (
    <section id="services" className="relative bg-paper-2 py-28 sm:py-36 lg:py-44">
      <Wrap>
        <Reveal>
          <SectionLabel index={services.index}>{t(areas.label)}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:items-end lg:gap-20">
          <MaskLines lines={t(areas.title)} as="h2" className="h2 lg:col-span-7" />
          <Reveal className="lg:col-span-5">
            <p className="body max-w-[46ch]">{t(areas.intro)}</p>
          </Reveal>
        </div>

        {/* الحاوية ترسم حدّ الأعلى والبداية، وكل خانة ترسم حدّ الأسفل
            والنهاية — شبكة مكتملة دون خطوط مزدوجة ولا ناقصة. */}
        <div className="mt-16 grid border-s border-t border-[var(--line)] sm:mt-24 lg:grid-cols-3">
          {areas.items.map((area, i) => (
            <Reveal
              key={area.key}
              delay={i * 90}
              as="article"
              className="border-b border-e border-[var(--line)] p-8 sm:p-10"
            >
              <span className="tag ltr nums text-red">{area.no}</span>

              <h3 className="mt-7 text-[21px] font-medium leading-snug sm:text-[23px]">
                {t(area.name)}
              </h3>
              <p className="mt-4 text-[16px] font-medium leading-relaxed">{t(area.promise)}</p>
              <p className="body mt-3">{t(area.desc)}</p>

              {/* الخدمات أسماءً وروابط — لا شروح تتكرّر مع صفحاتها */}
              <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2 border-t border-[var(--line)] pt-6">
                {area.services.map((slug) => {
                  const svc = services.items.find((x) => x.slug === slug);
                  if (!svc) return null;
                  return (
                    <li key={slug}>
                      <Link
                        to={path(`/services/${slug}`)}
                        className="ulink text-[13.5px] text-ink/65 transition-colors duration-(--dur-fast) hover:text-ink"
                      >
                        {t(svc.name)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* الادّعاء السببي — بعد الأجزاء الثلاثة لا قبلها */}
        <Reveal className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-3">
          <Chevron count={2} className="mt-1 h-3 w-auto shrink-0 text-red" />
          <p className="max-w-[64ch] flex-1 text-[16.5px] leading-relaxed">{t(areas.proof)}</p>
        </Reveal>

        <Reveal className="mt-10">
          <TextLink href="/services">
            {t({ ar: "اقرأ الخدمات بالتفصيل", en: "Read the services in detail" })}
          </TextLink>
        </Reveal>
      </Wrap>
    </section>
  );
}
