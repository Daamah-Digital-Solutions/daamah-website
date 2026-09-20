import { useRef, useState } from "react";
import { useLang } from "../i18n";
import { track } from "../analytics";
import { film } from "../content/home";
import { MaskLines, PlayMark, Reveal, SectionLabel, Wrap } from "../components/ui";

/**
 * الفيلم التعريفي — تحت الهيرو مباشرة.
 *
 * الزائر يقرأ الهيرو فيسأل «ومَن هؤلاء؟»، فتكون الإجابة أوّل ما
 * يمرّ عليه. وهو قسم قائم بذاته لا خلفية في الهيرو: الهيرو ينتهي
 * بشريط أعمال يتحرّك، وحركتان تتنازعان العين. ثم إنّ الفيلم محمول
 * على صوته، وأي تشغيل تلقائي في المتصفّحات صامت — فيُحرق بلا أن
 * يُسمع.
 *
 * ولا ينزل الملف إلا بالضغط (`preload="none"`): ما قبله صورة غلاف
 * وحدها، فلا يدفع زائرٌ ثمن ميجابايتات فيلمٍ لم يطلبه.
 */
export function Film({ className = "pt-24 pb-2 sm:pt-32 sm:pb-4" }: { className?: string }) {
  const { t } = useLang();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const src = t(film.src);

  return (
    /* الفراغ أسفله من الصفحة لا من القسم: في الرئيسية هو جسرٌ بين
       الهيرو و«من نحن» فيضيق أسفله، وفي صفحة «من نحن» يليه شريطٌ
       بخلفية أخرى فيحتاج مسافة تفصل الغلاف عن حافّة اللون */
    <section id="film" className={className}>
      <Wrap>
        <Reveal>
          <SectionLabel>{t(film.label)}</SectionLabel>
        </Reveal>

        <MaskLines lines={t(film.lede)} as="h2" className="lede mt-10 max-w-[24ch] sm:mt-12" />

        <Reveal className="mt-12 sm:mt-16">
          {/* الإطار حبريّ: ريثما تُفكّ أوّل لقطة لا يومض بياضٌ مكان الصورة */}
          <div className="relative aspect-video overflow-hidden rounded-[20px] bg-ink">
            <video
              /* تبديل اللغة يبدّل الملف — والمفتاح يجبر المتصفّح على
                 بدء عنصر جديد بدل إبقاء الفيلم الأول في مشغّله */
              key={src}
              ref={ref}
              src={src}
              poster={t(film.poster)}
              preload="none"
              playsInline
              controls={playing}
              className="size-full object-cover"
            />
            {!playing && (
              <button
                type="button"
                aria-label={t(film.play)}
                onClick={() => {
                  setPlaying(true);
                  track("cta_click", { placement: "intro_film" });
                  void ref.current?.play();
                }}
                className="group absolute inset-0 grid place-items-center bg-ink/10 transition-colors duration-(--dur-base) hover:bg-ink/25"
              >
                <PlayMark />
              </button>
            )}
          </div>
          <p className="mt-3 text-[14px] text-ink/55">{t(film.note)}</p>
        </Reveal>
      </Wrap>
    </section>
  );
}
