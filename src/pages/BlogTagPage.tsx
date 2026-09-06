import { useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { blogPage } from "../content/pages";
import { postsIn } from "../content/blog";
import { tagLabel } from "../content/blog/tags";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { PostList } from "../components/PostList";
import { Wrap } from "../components/ui";

export function BlogTagPage() {
  const { tag = "" } = useParams();
  const { t, lang } = useLang();
  const label = t(tagLabel(tag));
  const posts = postsIn(lang).filter((p) => p.tags.includes(tag));

  return (
    <>
      <PageHero
        label={t(blogPage.label)}
        title={[`${t(blogPage.tagTitle)} ${label}.`]}
      />

      <section className="py-16 sm:py-20">
        <Wrap>
          <PostList posts={posts} />
        </Wrap>
      </section>

      <PageCta
        lines={blogPage.ctaLines}
        secondary={blogPage.backToBlog}
        secondaryHref="/blog"
      />
    </>
  );
}
