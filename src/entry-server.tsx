import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router";
import { Shell } from "./App";

/**
 * مدخل الرسم وقت البناء.
 *
 * `prerenderToNodeStream` لا `renderToString`: الأولى تنتظر ما يتعلّق
 * (Suspense والصفحات المحمّلة كسولًا) قبل أن تُسلّم، فتصل الصفحة
 * كاملةً. الثانية تُسلّم فورًا وتترك مكان المعلَّق فارغًا.
 *
 * `Shell` هي شجرة التطبيق نفسها التي يستعملها المتصفح — الفرق موجّه
 * فقط: `StaticRouter` بمسار ثابت بدل `BrowserRouter`. شجرتان
 * مختلفتان كانتا ستفترقان عند أول تعديل.
 *
 * لا نستورد `globals.css` هنا: أنماط الإنتاج تُبنى من `main.tsx`،
 * واستيرادها في حزمة الخادم يولّد ملفًا ثانيًا لا يُستعمل.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <Shell />
      </StaticRouter>
    </StrictMode>,
  );

  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}

/* تُقرأ من إضافة البناء — فلا تستورد `src/content` مباشرةً، وتبقى
   قادرةً لاحقًا على قراءة مسارات تُكتشف بـ `import.meta.glob` */
export { routes, SITE_URL, OG_IMAGE, findRoute } from "./content/seo";
export { ogFor } from "./seo/site";
export { postsIn } from "./content/blog";
export { BLOG_ENABLED } from "./content/features";
export { graphFor } from "./seo/schema";
/* اسم الموقع بلغته — كان ثابتًا بالعربية في القالب، فيظهر
   اسمٌ عربي عند مشاركة أي صفحة إنجليزية */
export { name as siteName } from "./content/brandName";
export { withLang } from "./i18n";
export type { Lang } from "./i18n";
export type { RouteMeta } from "./content/seo";
