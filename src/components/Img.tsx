/**
 * صورة تختار صيغتها ومقاسها.
 *
 * المتصفح يقرأ `<source>` بالترتيب ويأخذ أول صيغة يفهمها: AVIF ثم
 * WebP ثم الأصل. و`srcset` يجعله يختار العرض المناسب لشاشته —
 * إرسال صورة 1400px إلى جوال عرضه 390px يهدر أكثر من ثمانية أضعاف
 * ما يلزم، وهو أثقل ما في الصفحة على شبكة الجوال.
 *
 * النسخ يولّدها `npm run images` وتُلتزم في المستودع، فإن غابت
 * عادت الصورة إلى أصلها بلا كسر.
 *
 * `width` و`height` إلزاميان: منهما يحجز المتصفح المساحة قبل وصول
 * الملف، وبدونهما تقفز الصفحة كلّما حُمّلت صورة.
 */

const WIDTHS = [480, 800, 1400];

export function Img({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  widths = WIDTHS,
}: {
  /** المسار الأصلي: `/assets/work/x.jpg` */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** عرض العرض الفعلي — بدونه يفترض المتصفح عرض الشاشة كاملًا */
  sizes: string;
  className?: string;
  /** لصورة أعلى الصفحة: تُحمَّل فورًا وبأولوية */
  priority?: boolean;
  /** العروض المولّدة لهذه الصورة — يجب أن تطابق ما ولّده السكربت،
      وإلا حمل `srcset` مسارات غير موجودة. صور المعرض أضيق. */
  widths?: number[];
}) {
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  /* السكربت لا يكبّر ما هو أصغر من العرض المطلوب، فلا نَعِد المتصفح
     بنسخة لم تُولَّد: لقطة جوّال عرضها 264px ليس لها 480 ولا 960،
     وذكرها في `srcset` طلبٌ ينتهي بـ404 */
  const avail = widths.filter((w) => w <= width);
  const set = (ext: string) =>
    avail.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");

  return (
    <picture>
      {avail.length > 0 && (
        <>
          <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
          <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
        </>
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
