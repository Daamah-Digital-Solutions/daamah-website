import { brand } from "../content/home";

/**
 * ثوابت الموقع — في ملفٍ خفيف عمدًا.
 *
 * كانت في `content/seo.ts`، وهو يستورد كل ملفات المحتوى ليبني فهرس
 * المسارات. فمن أراد `SITE_URL` وحده جرّ معه المحتوى كلّه إلى أول
 * حزمة — بما فيه نصوص صفحات المدن التي لا يفتحها زائر الرئيسية.
 */
export const SITE_URL = `https://${brand.domain}`;

/**
 * صورة المعاينة عند مشاركة رابط — لكل لغة بطاقتها.
 *
 * البطاقة تحمل سطرًا من نصّ الموقع، فبطاقةٌ عربية على رابط إنجليزي
 * تقول للمستقبِل إن الصفحة بلغةٍ لا يقرؤها.
 */
export const OG_IMAGE = "/assets/og-default.png";
export const OG_IMAGE_EN = "/assets/og-en.png";
export const ogFor = (lang: "ar" | "en") => (lang === "en" ? OG_IMAGE_EN : OG_IMAGE);
