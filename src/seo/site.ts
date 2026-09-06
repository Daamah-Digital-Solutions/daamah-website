import { brand } from "../content/home";

/**
 * ثوابت الموقع — في ملفٍ خفيف عمدًا.
 *
 * كانت في `content/seo.ts`، وهو يستورد كل ملفات المحتوى ليبني فهرس
 * المسارات. فمن أراد `SITE_URL` وحده جرّ معه المحتوى كلّه إلى أول
 * حزمة — بما فيه نصوص صفحات المدن التي لا يفتحها زائر الرئيسية.
 */
export const SITE_URL = `https://${brand.domain}`;

/** صورة المعاينة الافتراضية عند مشاركة رابط. */
export const OG_IMAGE = "/assets/og-default.png";
