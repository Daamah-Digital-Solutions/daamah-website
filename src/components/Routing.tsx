import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * استعادة موضع التمرير عند تغيّر المسار.
 *
 * المتصفح يحفظ موضع التمرير للصفحة الواحدة، وفي تطبيق ذي راوتر
 * داخلي لا يحدث تنقّل حقيقي — فتُفتح الصفحة الجديدة عند الموضع
 * الذي تركته في السابقة. نُعيده إلى الأعلى، إلا حين يحمل الرابط
 * مِرساة (#services مثلًا) فننتقل إليها.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // العنصر قد لا يكون قد رُسم بعد عند تغيّر المسار
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

