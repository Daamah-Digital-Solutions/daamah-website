import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { work } from "../content/home";
import {
  markets as marketLabels,
  sectorMeta,
  servicesOf,
  storyBySlug,
  type WorkItem,
} from "../content/work";
import { Reveal } from "./ui";
import { Img } from "./Img";

/**
 * بطاقة عمل — تُستعمل في الرئيسية وصفحة الأعمال وصفحة الخدمة.
 *
 * الصورة رمادية وتتلوّن عند المرور: تُبقي الشبكة هادئة ثم تعطي
 * الاهتمام للعمل الذي تنظر إليه وحده.
 *
 * وحين يكون العمل فصلًا من علاقة أطول تحمل البطاقة شارةً تقول ذلك.
 * هذه الشارة هي كل الفرق بين «عميل نفّذنا له عملًا» و«عميل بقي معنا»
 * — والثانية وحدها لا يستطيع أحد ادّعاءها كذبًا.
 */
export function WorkCard({
  item,
  delay = 0,
  index,
}: {
  item: WorkItem;
  delay?: number;
  index?: number;
}) {
  const { t, path } = useLang();

  const story = item.client ? storyBySlug(item.client) : undefined;
  const storyServices = item.client ? servicesOf(item.client).length : 0;

  /* «مقاولات · السعودية» — القطاع أوّلًا لأنه ما يبحث به الزائر */
  const meta = [
    t(sectorMeta(item.sector).label),
    item.note && t(item.note),
    ...item.markets.map((m) => t(marketLabels[m])),
  ].filter(Boolean);

  return (
    <Reveal delay={delay} as="article" className="group">
      <Link to={path(`/work/${item.slug}`)} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
          <Img
            src={item.image}
            alt={t(item.name)}
            width={1400}
            height={933}
            /* ثلث الشاشة على الديسكتوب، نصفها على اللوح، كاملةً على الجوال */
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="size-full object-cover grayscale transition-[filter,transform] duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04] group-hover:grayscale-0 dark:brightness-[0.78] dark:group-hover:brightness-100"
          />

          {story && storyServices > 1 && (
            <span className="tag absolute bottom-3 start-3 rounded-pill bg-ink/90 px-3 py-1.5 text-paper backdrop-blur-sm">
              <span className="nums ltr">{storyServices}</span> {t(work.storyServices)}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4 border-t border-[var(--line)] pt-4 transition-transform duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <div>
            <h3 className="text-[17px] font-medium leading-snug">{t(item.name)}</h3>
            <p className="tag mt-2 text-ink/40">{meta.join(" · ")}</p>
          </div>
          {index !== undefined && (
            <span className="tag ltr mt-1 shrink-0 text-red opacity-0 transition-opacity duration-(--dur-base) group-hover:opacity-100">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
      </Link>
    </Reveal>
  );
}
