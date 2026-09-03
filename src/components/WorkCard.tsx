import { Link } from "react-router-dom";
import { useLang, type Bi } from "../i18n";
import { Reveal } from "./ui";

export type WorkItem = {
  slug: string;
  name: Bi;
  sector: Bi;
  image: string;
};

/**
 * بطاقة عمل — تُستعمل في الرئيسية وصفحة الأعمال وصفحة الخدمة.
 * الصورة رمادية وتتلوّن عند المرور: تُبقي الشبكة هادئة ثم تعطي
 * الاهتمام للعمل الذي تنظر إليه وحده.
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

  return (
    <Reveal delay={delay} as="article" className="group">
      <Link to={path(`/work/${item.slug}`)} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
          <img
            src={item.image}
            alt={t(item.name)}
            loading="lazy"
            decoding="async"
            className="size-full object-cover grayscale transition-[filter,transform] duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04] group-hover:grayscale-0 dark:brightness-[0.78] dark:group-hover:brightness-100"
          />
        </div>

        <div className="mt-5 flex items-start justify-between gap-4 border-t border-[var(--line)] pt-4 transition-transform duration-(--dur-base) ease-[var(--ease-out-quint)] group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <div>
            <h3 className="text-[17px] font-medium leading-snug">{t(item.name)}</h3>
            <p className="tag mt-2 text-ink/40">{t(item.sector)}</p>
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
