import { lazy, type ComponentType } from "react";
import stats from "virtual:blog-stats";
import type { Lang } from "../../i18n";
import type { PostEntry } from "./types";

export type { PostEntry, PostText } from "./types";

/**
 * فهرس المدوّنة — يُكتشف من الملفات، لا يُكتب بيدٍ.
 *
 * كل مقال مجلّد باسمه، فيه `meta.ts` وواحد أو اثنان من `ar.mdx`
 * و`en.mdx`. المجلّد الواحد يربط النسختين، فيعرف الموقع متى يضع
 * `hreflang` ومتى لا يضعه — ومقالٌ بلغة واحدة يجب ألّا يَعِد جوجل
 * بنسخةٍ أخرى غير موجودة.
 *
 * البيانات وحدها تُستورد استيرادًا ساكنًا؛ النصوص تُحمَّل عند فتحها
 * فيصير لكل مقال حزمته. لو كانت البيانات داخل ملف MDX لدخل نصّ كل
 * المقالات في أول حزمة يحمّلها زائر الصفحة الرئيسية.
 */

export type Post = {
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  cover?: string;
  service?: string;
  /** دقائق القراءة — تُحسب وقت البناء من عدد الكلمات */
  readingTime: number;
};

const entries = import.meta.glob("./*/meta.ts", {
  eager: true,
  import: "default",
}) as Record<string, PostEntry>;

const loaders = import.meta.glob("./*/*.mdx") as Record<
  string,
  () => Promise<{ default: ComponentType }>
>;

const LANGS: Lang[] = ["ar", "en"];

export const posts: Post[] = Object.entries(entries)
  .flatMap(([path, entry]) => {
    const slug = path.match(/^\.\/([^/]+)\/meta\.ts$/)?.[1];
    if (!slug || entry.draft) return [];

    return LANGS.flatMap<Post>((lang) => {
      const text = entry[lang];
      // لا نصّ بهذه اللغة، أو لا ملف — المقال غير موجود بها
      if (!text || !loaders[`./${slug}/${lang}.mdx`]) return [];
      return [
        {
          slug,
          lang,
          title: text.title,
          description: text.description,
          date: entry.date,
          updated: entry.updated,
          tags: entry.tags,
          cover: entry.cover,
          service: entry.service,
          readingTime: stats[`${slug}/${lang}`] ?? 1,
        },
      ];
    });
  })
  /* الأحدث أولًا — وهو ترتيب الصفحة وخلاصة RSS معًا */
  .sort((a, b) => b.date.localeCompare(a.date));

/** مقالات لغةٍ بعينها. */
export const postsIn = (lang: Lang) => posts.filter((p) => p.lang === lang);

/** مقال بعينه. */
export const findPost = (slug: string, lang: Lang) =>
  posts.find((p) => p.slug === slug && p.lang === lang);

/** اللغات التي كُتب بها هذا المقال. */
export const langsOf = (slug: string): Lang[] =>
  posts.filter((p) => p.slug === slug).map((p) => p.lang);

/** جسم المقال — محمّل كسولًا فيصير لكل مقال حزمته الخاصة. */
const cache = new Map<string, ComponentType>();
export function postComponent(slug: string, lang: Lang) {
  const key = `./${slug}/${lang}.mdx`;
  let comp = cache.get(key);
  if (!comp) {
    const load = loaders[key];
    comp = lazy(load ?? (async () => ({ default: () => null })));
    cache.set(key, comp);
  }
  return comp;
}

/** كل الوسوم المستعملة فعلًا، مرتّبةً بعدد المقالات. */
export function allTags(lang: Lang): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of postsIn(lang)) {
    for (const tag of p.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
