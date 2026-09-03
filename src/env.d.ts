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
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
