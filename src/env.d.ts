/// <reference types="vite/client" />

/**
 * متغيّرات البيئة التي يقرأها الموقع.
 *
 * كلّها اختيارية: الموقع يعمل كاملًا بدونها — طبقة القياس تصمت
 * ببساطة حين لا يوجد مُعرِّف. هذا يبقي التطوير المحلي نظيفًا من
 * أحداث وهمية تلوّث تقارير الإنتاج.
 */
interface ImportMetaEnv {
  /** مُعرِّف Google Analytics 4 — الشكل `G-XXXXXXXXXX` */
  readonly VITE_GA_ID?: string;
  /** مُعرِّف Meta Pixel — أرقام فقط */
  readonly VITE_META_PIXEL_ID?: string;
  /** رمز تحقّق Google Search Console */
  readonly VITE_GSC_VERIFICATION?: string;
  /** رمز تحقّق Bing Webmaster Tools — قيمة `msvalidate.01` */
  readonly VITE_BING_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** سنة البناء — تحقنها `vite.config.ts`، فلا تتبع ساعة الزائر. */
declare const __BUILD_YEAR__: number;

/**
 * دقائق قراءة كل مقال، مفتاحها `<slug>/<lang>`.
 * تُحسب وقت البناء في `vite.config.ts` كي لا تُستورد نصوص المقالات
 * كلها لعدّ كلماتها.
 */
declare module "virtual:blog-stats" {
  const stats: Record<string, number>;
  export default stats;
}

/**
 * فهرس المسارات المضغوط — عنوان ووصف كل صفحة بلا نصوصها.
 * يولّده `vite.config.ts` كي لا يجرّ `Seo.tsx` المحتوى كلّه إلى
 * أول حزمة يحمّلها كل زائر.
 */
declare module "virtual:routes" {
  const routes: {
    path: string;
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    kind: string;
    parent?: string;
    langs?: ("ar" | "en")[];
    share?: { title: { ar: string; en: string }; description: { ar: string; en: string } };
  }[];
  export default routes;
}
