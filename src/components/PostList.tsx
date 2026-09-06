import { useLang } from "../i18n";
import { blogPage } from "../content/pages";
import type { Post } from "../content/blog";
import { tagLabel } from "../content/blog/tags";
import { ArrowSwap, Reveal, SmartLink } from "./ui";

/** التاريخ بلغة الصفحة — الميلادي في الحالتين، فالسوق يقرأ به. */
export function formatDate(iso: string, lang: "ar" | "en") {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(
    lang === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
  );
}

/** قائمة المقالات — صفوف لا بطاقات: العنوان هو ما يُقرأ. */
export function PostList({ posts }: { posts: Post[] }) {
  const { t, lang } = useLang();

  if (posts.length === 0) {
    return <p className="body">{t(blogPage.empty)}</p>;
  }

  return (
    <ol className="border-t border-[var(--line)]">
      {posts.map((p, i) => (
        <Reveal key={`${p.slug}-${p.lang}`} delay={Math.min(i, 4) * 70} as="li">
          <SmartLink
            href={`/blog/${p.slug}`}
            className="group grid gap-4 border-b border-[var(--line)] py-9 transition-[padding] duration-(--dur-base) ease-[var(--ease-out-quint)] hover:ps-3 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-3">
              <time dateTime={p.date} className="tag text-ink/40">
                {formatDate(p.date, lang)}
              </time>
            </div>

            <div className="lg:col-span-7">
              <h2 className="text-[20px] font-medium leading-snug transition-colors duration-(--dur-base) group-hover:text-red sm:text-[23px]">
                {p.title}
              </h2>
              <p className="body mt-3 max-w-[60ch]">{p.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="tag text-ink/35">
                    {t(tagLabel(tag))}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start justify-between gap-4 lg:col-span-2 lg:justify-end">
              <span className="tag text-ink/35">
                <span className="ltr nums">{p.readingTime}</span> {t(blogPage.readingTime)}
              </span>
              <ArrowSwap />
            </div>
          </SmartLink>
        </Reveal>
      ))}
    </ol>
  );
}
