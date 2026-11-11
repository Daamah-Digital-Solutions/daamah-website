import { useLang } from "../i18n";
import { services, saudi } from "../content/home";
import { workItems } from "../content/work";
import { cityMeta, citiesForService, citiesIn, cityPages, saudiHub, type CityMarket } from "../content/saudi";
import { uaeHub } from "../content/uae";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { waMessage } from "../content/whatsapp";
import { Justified } from "../components/Justified";
import { WorkCard } from "../components/WorkCard";
import { Testimonials } from "../sections/Testimonials";
import {
  ArrowSwap,
  Chevron,
  Reveal,
  SectionLabel,
  SmartLink,
  Wrap,
} from "../components/ui";

/**
 * صفحة السوق — «خدماتنا في السعودية» (`/saudi`) و«في الإمارات» (`/uae`).
 *
 * تجمع ما تفرّق: الخدمات التي لنا فيها صفحات مدن، والمدن نفسها،
 * والأعمال المنفّذة في السوق السعودي — وهي مشتقّة من `work.ts` لا
 * مكتوبة هنا. وظيفتها أن تكون مدخلًا واحدًا يربط هذه الصفحات
 * ببعضها، فتصل قوّة الروابط الداخلية إليها جميعًا.
 */
export function SaudiHubPage({ market = "sa" }: { market?: CityMarket }) {
  const { t } = useLang();

  const hub = market === "ae" ? uaeHub : { ...saudiHub, note: saudi.note };
  const cities = citiesIn(market);
  const covered = [...new Set(cityPages.filter((p) => cityMeta(p.city).market === market).map((p) => p.service))];
  const proof = workItems.filter((w) => w.markets.includes(market)).slice(0, 6);

  return (
    <>
      <PageHero
        label={t(hub.label)}
        title={t(hub.title)}
        intro={t(hub.intro)}
      />

      {/* إشارات الثقة */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(hub.trustLabel)}</SectionLabel>
          </Reveal>
          <ul className="mt-10 grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {hub.trust.map((x, i) => (
              <Reveal key={x.title.en} delay={i * 70} as="li">
                <Chevron className="h-3 w-auto text-red" />
                <h2 className="mt-4 text-[18px] font-medium leading-snug">{t(x.title)}</h2>
                <p className="body mt-2.5">{t(x.body)}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140}>
            <p className="body mt-12 max-w-[60ch]">{t(hub.note)}</p>
          </Reveal>
        </Wrap>
      </section>

      {/* الخدمات × المدن — شبكة الروابط الداخلية */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(hub.servicesLabel)}</SectionLabel>
          </Reveal>

          <div className="mt-10 border-t border-[var(--line)]">
            {covered.map((slug, i) => {
              const service = services.items.find((s) => s.slug === slug);
              if (!service) return null;
              return (
                <Reveal key={slug} delay={i * 70}>
                  <div className="grid gap-4 border-b border-[var(--line)] py-8 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-5">
                      <h3 className="text-[19px] font-medium">{t(service.name)}</h3>
                      <p className="body mt-2 max-w-[44ch]">{t(service.desc)}</p>
                    </div>
                    <ul className="flex flex-wrap items-start gap-x-3 gap-y-2.5 lg:col-span-7 lg:justify-end">
                      {citiesForService(slug, market).map((c) => {
                        const city = cities.find((x) => x.key === c)!;
                        return (
                          <li key={c}>
                            <SmartLink
                              href={`/services/${slug}/${c}`}
                              className="group inline-flex items-center gap-2 rounded-pill border border-[var(--line)] px-4 py-2 text-[14px] transition-colors duration-(--dur-fast) hover:border-[var(--line-strong)] hover:text-ink"
                            >
                              {t(city.name)}
                              <ArrowSwap size={13} />
                            </SmartLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Wrap>
      </section>

      {/* المدن */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <Reveal>
            <SectionLabel>{t(hub.citiesLabel)}</SectionLabel>
          </Reveal>
          <div className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-2">
            {cities.map((c, i) => (
              <Reveal key={c.key} delay={i * 80}>
                <h3 className="text-[22px] font-medium">{t(c.name)}</h3>
                <p className="body mt-3 max-w-[48ch]">{t(c.blurb)}</p>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {proof.length > 0 && (
        <section className="bg-paper-2 py-20 sm:py-28">
          <Wrap>
            <Reveal>
              <SectionLabel>{t(hub.workLabel)}</SectionLabel>
            </Reveal>
            <Justified gap="gap-3 sm:gap-4 lg:gap-5" fill className="mt-10">
              {proof.map((w, i) => (
                <WorkCard key={w.slug} item={w} delay={i * 70} />
              ))}
            </Justified>
          </Wrap>
        </section>
      )}

      <Testimonials market={market} />

      <PageCta lines={hub.ctaLines} wa={market === "ae" ? waMessage.uae : waMessage.saudi} placement={market === "ae" ? "uae" : "saudi"} />
    </>
  );
}
