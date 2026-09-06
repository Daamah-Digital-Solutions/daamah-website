import { useLang } from "../i18n";
import { brand } from "../content/home";
import { SmartLink } from "./ui";

export type Crumb = { label: string; href?: string };

/**
 * فتات الخبز — يطابق `BreadcrumbList` في البيانات المنظّمة.
 *
 * جوجل يعرض المسار مكان الرابط في النتيجة حين يجد الاثنين متّفقين:
 * ما يُعلَن وما يُعرض. عرضه بلا تصريح — أو العكس — لا يُنتج شيئًا.
 * الفاصل `/` مُخفى عن القارئ الصوتي: القائمة تكفيه بنيةً.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const { t } = useLang();
  const all: Crumb[] = [{ label: t(brand.short), href: "/" }, ...trail];

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                <SmartLink
                  href={c.href}
                  className="tag text-ink/40 transition-colors duration-(--dur-fast) hover:text-ink"
                >
                  {c.label}
                </SmartLink>
              ) : (
                <span className="tag text-ink/70" aria-current={last ? "page" : undefined}>
                  {c.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-ink/25">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
