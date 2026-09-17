import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { work } from "../content/home";
import { coverSize } from "../content/gallery";
import { galleries } from "../content/gallery";
import {
  markets as marketLabels,
  sectorMeta,
  servicesOf,
  serviceMeta,
  storyBySlug,
  type WorkItem,
} from "../content/work";
import { Reveal } from "./ui";
import { Img } from "./Img";
import { JustifiedItem } from "./Justified";

/**
 * بطاقة عمل — تُستعمل في الرئيسية وصفحة الأعمال وصفحة الخدمة.
 *
 * الصورة بالألوان. كانت رماديةً تتلوّن عند المرور، وهي فكرة تبدو
 * أنيقة وتكلّف الكثير: وكالة تصميم تُخفي ألوان شغلها، وعلى شاشة
 * اللمس لا مرور أصلًا — فالبورتفوليو كلّه رمادي عند نصف الزوّار.
 *
 * `natural` يجعل البطاقة تحترم نسبة صورتها بدل قصّها إلى 4:3.
 * المادة نفسها متنوّعة — منشور مربّع وشريحة عريضة — وتوحيد النسبة
 * كان يمحو هذا التنوّع ويجعل اثنتين وثلاثين بطاقة صفًّا مكرّرًا.
 * الشبكة الثابتة تبقى حيث يهمّ الصفّ المنتظم: الرئيسية وصفحة الخدمة.
 */
export function WorkCard({
  item,
  delay = 0,
}: {
  item: WorkItem;
  delay?: number;
}) {
  const { t, path } = useLang();

  const story = item.client ? storyBySlug(item.client) : undefined;
  const storyServices = item.client ? servicesOf(item.client).length : 0;
  const shots = galleries[item.slug]?.length ?? 0;
  const size = coverSize[item.image] ?? { w: 1400, h: 933 };

  /* «مقاولات · السعودية» — القطاع أوّلًا لأنه ما يبحث به الزائر */
  const meta = [
    t(sectorMeta(item.sector).label),
    item.note && t(item.note),
    ...item.markets.map((m) => t(marketLabels[m])),
  ].filter(Boolean);

  /* بطاقة داخل صفّ مضبوط: عرضها بنسبة غلافها، والارتفاع واحد في الصفّ،
     فتلتصق البطاقات بلا فراغات والغلاف كامل بلا قصّ. الاسم والقطاع فوق
     الصورة لا تحتها — سطرا النصّ كانا يفصلان كل عمل عن الذي يليه */
  return (
    <JustifiedItem w={size.w} h={size.h} className="overflow-hidden bg-paper-2">
      <Reveal delay={delay} as="article" className="group size-full">
        <Link to={path(`/work/${item.slug}`)} className="relative block size-full">
          <Img
            src={item.image}
            alt={t(item.name)}
            width={size.w}
            height={size.h}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="size-full transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.03] dark:brightness-[0.86] dark:group-hover:brightness-100"
          />

          {/* الكلام فوق التصميم: على الأجهزة التي فيها مؤشّر يظهر عند المرور
              أو التركيز وحده، فتُقرأ الصفحة معرضًا والتصميم يتكلّم أوّلًا. على
              اللمس لا مرور، فيبقى ظاهرًا — القرار بالقدرة لا بمقاس الشاشة */}
          <div className="pointer-events-none absolute inset-0 transition-opacity duration-(--dur-base) [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
            {/* الخدمة على الصورة: تقول نوع الشغل قبل أن يُقرأ الاسم */}
            <span className="tag absolute top-3 start-3 rounded-pill bg-paper/85 px-3 py-1.5 text-ink backdrop-blur-sm">
              {t(serviceMeta(item.service).label)}
            </span>

            {/* المدّة قبل عدد الخدمات: «ثمانية وأربعون شهرًا» أثقل من
                «خدمتان»، وهي وحدها ما لا يُقال بلا سجلّ يسنده */}
            {item.months && item.months >= 6 ? (
              <span className="tag absolute top-3 end-3 rounded-pill bg-red px-3 py-1.5 text-white">
                <span className="nums ltr">{item.months}</span> {t(work.months)}
              </span>
            ) : story && storyServices > 1 ? (
              <span className="tag absolute top-3 end-3 rounded-pill bg-ink/90 px-3 py-1.5 text-paper backdrop-blur-sm">
                <span className="nums ltr">{storyServices}</span> {t(work.storyServices)}
              </span>
            ) : null}

            {/* الاسم فوق تدرّج داكن ثابت اللون — يُقرأ على أي غلاف وفي الوضعين */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pt-12 pb-3.5 text-white">
              <h3 className="text-[15.5px] font-medium leading-snug sm:text-[17px]">{t(item.name)}</h3>
              <p className="tag mt-1.5 text-white/70">
                {meta.join(" · ")}
                {shots > 0 && (
                  <span>
                    {" · "}
                    <span className="nums ltr">{shots}</span> {t(work.shots)}
                  </span>
                )}
              </p>
            </div>
          </div>
        </Link>
      </Reveal>
    </JustifiedItem>
  );
}
