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
  natural = false,
}: {
  item: WorkItem;
  delay?: number;
  natural?: boolean;
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

  return (
    <Reveal delay={delay} as="article" className="group">
      <Link to={path(`/work/${item.slug}`)} className="block">
        <div
          className={`relative overflow-hidden bg-paper-2 ${natural ? "" : "aspect-[4/3]"}`}
        >
          <Img
            src={item.image}
            alt={t(item.name)}
            width={size.w}
            height={size.h}
            /* ثلث الشاشة على الديسكتوب، نصفها على اللوح، كاملةً على الجوال */
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.03] dark:brightness-[0.86] dark:group-hover:brightness-100 ${
              natural ? "w-full" : "size-full object-cover"
            }`}
          />

          {/* الخدمة على الصورة: تقول نوع الشغل قبل أن يُقرأ الاسم */}
          <span className="tag absolute top-3 start-3 rounded-pill bg-paper/85 px-3 py-1.5 text-ink backdrop-blur-sm">
            {t(serviceMeta(item.service).label)}
          </span>

          {story && storyServices > 1 && (
            <span className="tag absolute bottom-3 start-3 rounded-pill bg-ink/90 px-3 py-1.5 text-paper backdrop-blur-sm">
              <span className="nums ltr">{storyServices}</span> {t(work.storyServices)}
            </span>
          )}

          {/* عدد الصور: يَعِد بما وراء البطاقة، فيصير للنقر سبب */}
          {shots > 0 && (
            <span className="tag absolute bottom-3 end-3 rounded-pill bg-ink/70 px-3 py-1.5 text-paper opacity-0 backdrop-blur-sm transition-opacity duration-(--dur-base) group-hover:opacity-100">
              <span className="nums ltr">{shots}</span> {t(work.shots)}
            </span>
          )}
        </div>

        {/* لا رقم ترتيب: كان يقول «هذه البطاقة الثالثة والعشرون» ولا
            شيء غير ذلك، ومع أعمدة الشبكة — تُملأ من أعلى العمود إلى
            أسفله لا سطرًا بسطر — صار أوّل صفٍّ يُقرأ 01 · 16 · 30. */}
        <div className="mt-4 border-t border-[var(--line)] pt-3.5 transition-transform duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <h3 className="text-[17px] font-medium leading-snug">{t(item.name)}</h3>
          <p className="tag mt-2 text-ink/40">{meta.join(" · ")}</p>
        </div>
      </Link>
    </Reveal>
  );
}
