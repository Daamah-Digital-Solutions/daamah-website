import { useLang } from "../i18n";
import { track } from "../analytics";
import { waHref, waMessage } from "../content/whatsapp";
import { hero, strip } from "../content/home";
import { Btn, MaskLines, Reveal, TextLink, Wrap } from "../components/ui";
import { Img } from "../components/Img";

/** شبكة خطوط شعرية رأسية — تُقرأ كأثر مسطرة، وتوحي بالدقّة. */
function GridLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden md:block"
    >
      <Wrap className="h-full">
        <div className="grid h-full grid-cols-4 border-e border-[var(--line-faint)]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-s border-[var(--line-faint)]" />
          ))}
        </div>
      </Wrap>
    </div>
  );
}

/** شريط الأعمال — إثبات بصري متحرّك يغلق الهيرو. */
function WorkStrip() {
  const { t } = useLang();
  const items = [...strip, ...strip]; // نسختان تصنعان حلقة بلا قطع

  return (
    <div className="marquee relative mt-20 overflow-hidden border-y border-[var(--line)] py-0 sm:mt-24">
      {/* تلاشٍ عند الحافتين حتى لا ينقطع الشريط بحدّة */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent rtl:bg-gradient-to-r" />

      <div
        className="marquee-track flex w-max"
        style={{ ["--marquee-dur" as string]: "80s" }}
        dir="ltr"
      >
        {items.map((item, i) => (
          <figure
            key={`${item.src}-${i}`}
            className="group relative h-[190px] w-[280px] shrink-0 overflow-hidden border-e border-[var(--line)] sm:h-[230px] sm:w-[340px]"
          >
            {/* الشريط قرب الطية: أول نسختين تُحمَّلان فورًا لأنهما
                مرئيّتان، والباقي كسولًا. `sizes` ثابت لأن عرض
                البطاقة ثابت لا نسبة من الشاشة */}
            <Img
              src={item.src}
              alt={t(item.label)}
              width={1400}
              height={933}
              sizes="340px"
              priority={i < 2}
              /* في الوضع الداكن تُخفَّف الإضاءة: أعمال كثيرة خلفياتها
                 بيضاء وتشتعل على خلفية شبه سوداء */
              className="size-full object-cover grayscale transition-[filter,transform] duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.03] group-hover:grayscale-0 dark:brightness-[0.72] dark:group-hover:brightness-100"
            />
            <figcaption className="tag absolute bottom-0 start-0 translate-y-full bg-ink px-3 py-2 text-paper transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-y-0">
              {t(item.label)}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative overflow-hidden pt-[var(--header-h)]">
      <GridLines />

      <Wrap className="relative">
        {/* التاجلاين رأسيًا على الحافة — يشغل الفراغ الجانبي بمادة من العلامة.
            التموضع على غلاف أفقي: الخصائص المنطقية (end) تُحسب بنمط كتابة
            العنصر نفسه، فلو وُضعت على النص الرأسي لانقلب المحور. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute end-0 top-[30%] hidden lg:block"
        >
          <span className="tag block rotate-180 text-ink/20 [writing-mode:vertical-rl]">
            Digital Solutions &amp; Empowering Brands
          </span>
        </div>

        <div className="pt-14 sm:pt-20">
          {/* ── سطر الحالة ── */}
          <Reveal
            eager
            className="flex flex-wrap items-center justify-between gap-4 pb-12 sm:pb-16"
          >
            <span className="flex items-center gap-2.5">
              <span className="relative flex size-[7px]">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red opacity-60" />
                <span className="relative inline-flex size-full rounded-full bg-red" />
              </span>
              <span className="tag text-ink/70">{t(hero.status)}</span>
            </span>
            <span className="tag text-ink/35">{t(hero.markets)}</span>
          </Reveal>

          {/* ── العنوان ── */}
          <MaskLines lines={t(hero.headline)} className="display" accentDot eager />

          {/* ── الخط الفاصل ثم الفقرة والأزرار ── */}
          <Reveal delay={200} eager className="mt-14 sm:mt-20">
            <div className="rule" />
            <div className="flex flex-col gap-10 pt-8 md:flex-row md:items-start md:justify-between md:gap-16">
              <p className="body max-w-[52ch] md:flex-1">{t(hero.intro)}</p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:shrink-0 md:pt-1">
                <Btn
                  href={waHref(t(waMessage.general))}
                  external
                  onClick={() => track("whatsapp_click", { placement: "hero" })}
                >
                  {t(hero.primary)}
                </Btn>
                <TextLink href="#work">{t(hero.secondary)}</TextLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Wrap>

      <WorkStrip />
    </section>
  );
}
