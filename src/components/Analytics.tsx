import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageView } from "../analytics";

/**
 * يرسل مشاهدة صفحة عند كل تغيّر مسار.
 *
 * يجب أن يأتي **بعد** `<Seo />` في الشجرة: الأثر يقرأ `document.title`
 * الذي يكتبه Seo، وترتيب الآثار في React يتبع ترتيب العناصر. لو سبقه
 * لسجّلنا كل صفحة بعنوان الصفحة السابقة.
 */
export function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    pageView(pathname + search, document.title);
  }, [pathname, search]);

  return null;
}
