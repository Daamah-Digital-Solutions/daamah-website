import { useLang } from "../i18n";
import { blogPage } from "../content/pages";
import { postsIn, allTags } from "../content/blog";
import { tagLabel } from "../content/blog/tags";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { PostList } from "../components/PostList";
import { Reveal, SmartLink, Wrap } from "../components/ui";

export function BlogPage() {
  const { t, lang } = useLang();
  const posts = postsIn(lang);
  const tags = allTags(lang);

  return (
    <>
      <PageHero
        label={t(blogPage.label)}
        title={t(blogPage.title)}
        intro={t(blogPage.intro)}
      />

      <section className="py-16 sm:py-20">
        <Wrap>
          {tags.length > 0 && (
            <Reveal className="mb-14 flex flex-wrap items-center gap-x-3 gap-y-2.5">
              <span className="tag me-2 text-ink/40">{t(blogPage.allTags)}</span>
              {tags.map((x) => (
                <SmartLink
                  key={x.tag}
                  href={`/blog/tag/${x.tag}`}
                  className="rounded-pill border border-[var(--line)] px-4 py-1.5 text-[13.5px] transition-colors duration-(--dur-fast) hover:border-[var(--line-strong)] hover:text-ink"
                >
                  {t(tagLabel(x.tag))}{" "}
                  <span className="ltr nums text-ink/35">{x.count}</span>
                </SmartLink>
              ))}
            </Reveal>
          )}

          <PostList posts={posts} />
        </Wrap>
      </section>

      <PageCta lines={blogPage.ctaLines} />
    </>
  );
}
