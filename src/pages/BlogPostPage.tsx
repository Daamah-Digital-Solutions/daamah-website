import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { useLang } from "../i18n";
import { blogPage } from "../content/pages";
import { findPost, postComponent, posts } from "../content/blog";
import { tagLabel } from "../content/blog/tags";
import { services } from "../content/home";
import { PageCta } from "../components/PageCta";
import { PostList, formatDate } from "../components/PostList";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { NotFoundPage } from "./NotFoundPage";
import { Reveal, SmartLink, Wrap } from "../components/ui";

/** الروابط داخل المقال تسلك سلوك روابط الموقع: داخلية تُترجم، خارجية تُعلَّم. */
const components = {
  a: ({ href = "", children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <SmartLink href={href} external={!href.startsWith("/")} {...rest}>
      {children}
    </SmartLink>
  ),
};

export function BlogPostPage() {
  const { slug = "" } = useParams();
  const { t, lang } = useLang();

  const post = findPost(slug, lang);
  /* لا نُظهر 404 لمقال موجود بلغةٍ أخرى: نعرضه بلغته ونقول ذلك.
     الأصل أن `Seo` وضع canonical على النسخة الموجودة وحدها. */
  const fallback = post ? null : posts.find((p) => p.slug === slug);
  const shown = post ?? fallback;

  if (!shown) return <NotFoundPage />;

  const Body = postComponent(shown.slug, shown.lang);
  const related = posts
    .filter(
      (p) => p.lang === shown.lang && p.slug !== shown.slug && p.tags.some((x) => shown.tags.includes(x)),
    )
    .slice(0, 2);
  const service = services.items.find((s) => s.slug === shown.service);

  return (
    <>
      <article>
        <header className="pt-[calc(var(--header-h)+3rem)] sm:pt-[calc(var(--header-h)+4rem)]">
          <Wrap>
            <Breadcrumbs
              trail={[
                { label: t(blogPage.label), href: "/blog" },
                { label: shown.title },
              ]}
            />

            <Reveal eager>
              <h1 className="mt-8 max-w-[24ch] text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.22]">
                {shown.title}
              </h1>
              <p className="body mt-8 max-w-[58ch]">{shown.description}</p>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--line)] pt-6">
                <time dateTime={shown.date} className="tag text-ink/45">
                  {t(blogPage.publishedOn)} {formatDate(shown.date, shown.lang)}
                </time>
                <span className="tag text-ink/35">
                  <span className="ltr nums">{shown.readingTime}</span>{" "}
                  {t(blogPage.readingTime)}
                </span>
                {shown.tags.map((tag) => (
                  <SmartLink
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="tag text-ink/45 transition-colors duration-(--dur-fast) hover:text-ink"
                  >
                    {t(tagLabel(tag))}
                  </SmartLink>
                ))}
              </div>

              {shown.lang !== lang && (
                <p className="mt-6 border-s-2 border-red ps-4 text-[14.5px] text-ink/60">
                  {t(shown.lang === "ar" ? blogPage.onlyInArabic : blogPage.onlyInEnglish)}
                </p>
              )}
            </Reveal>
          </Wrap>
        </header>

        <div className="py-14 sm:py-20">
          <Wrap>
            {/* اللغة على الحاوية: مقال عربي داخل صفحة إنجليزية يجب
                أن يُقرأ ويُقاس بمقاييس لغته لا لغة الصفحة */}
            <div
              className="article"
              lang={shown.lang}
              dir={shown.lang === "ar" ? "rtl" : "ltr"}
            >
              <MDXProvider components={components}>
                <Suspense fallback={null}>
                  <Body />
                </Suspense>
              </MDXProvider>
            </div>
          </Wrap>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-[var(--line)] py-16 sm:py-20">
          <Wrap>
            <h2 className="tag text-ink/40">{t(blogPage.related)}</h2>
            <div className="mt-8">
              <PostList posts={related} />
            </div>
          </Wrap>
        </section>
      )}

      <PageCta
        lines={blogPage.ctaLines}
        primaryHref={service ? `/contact?service=${service.slug}` : "/contact"}
        secondary={blogPage.backToBlog}
        secondaryHref="/blog"
      />
    </>
  );
}
