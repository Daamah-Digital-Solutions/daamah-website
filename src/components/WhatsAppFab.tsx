import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { stripLang, useLang } from "../i18n";
import { waHref, waMessage } from "../content/whatsapp";
import { ui } from "../content/home";
import { track } from "../analytics";

/** علامة واتساب — مرسومة لا محمّلة، فتتبع لون النص وتبقى حادّة. */
export function WhatsAppMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.38a9.87 9.87 0 0 0 4.69 1.19h.01c5.45 0 9.89-4.44 9.89-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.54 3.7-8.23 8.23-8.23 2.2 0 4.26.86 5.81 2.41a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12s-.64.8-.79.97c-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.9 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

/**
 * زرّ واتساب عائم — على الشاشات الصغيرة وحدها.
 *
 * الهيدر على الموبايل يفقد زرّ النداء لضيق المكان، فيبقى الزائر بلا
 * طريق مباشر حتى يصل إلى آخر الصفحة. هذا الزرّ يسدّ تلك المسافة.
 *
 * ولا يظهر في كل حال: يختفي فوق الهيرو كي لا يزاحم زرّه، وفي صفحة
 * التواصل حيث النموذج والقنوات حاضرة، وحين تبلغ الخاتمة نداءها —
 * فتكرار الدعوة في اللحظة نفسها يُضعفها.
 */
export function WhatsAppFab() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [shown, setShown] = useState(false);
  const raf = useRef(0);

  /* صفحة التواصل فيها قنواتها، وصفحة العرض فيها شريط حجز ثابت خاصّ
     بها — زرّان عائمان فوق بعضهما يتنافسان على الإبهام نفسه */
  const onContact = ["/contact", "/national-day"].includes(stripLang(pathname));

  useEffect(() => {
    if (onContact) return;

    /* الشرطان يُقرآن معًا في نفس الإطار: قياس واحد للتخطيط بدل
       مراقبَين ينهضان في لحظتين مختلفتين. */
    const read = () => {
      raf.current = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const pastHero = y > vh * 0.9;
      const footer = document.querySelector("footer");
      // بلغنا الخاتمة حين يدخل ربعها الأعلى الشاشة
      const atEnd = footer ? footer.getBoundingClientRect().top < vh * 0.75 : false;
      setShown(pastHero && !atEnd);
    };

    const onScroll = () => {
      // قياس مرّة لكل إطار لا مرّة لكل حدث تمرير
      if (!raf.current) raf.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [onContact, pathname]);

  if (onContact) return null;

  return (
    <a
      href={waHref(t(waMessage.general))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { placement: "fab" })}
      aria-label={t(ui.whatsappFab)}
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] end-5 z-40 inline-flex items-center gap-2.5 rounded-pill bg-ink px-5 py-3.5 text-[14px] font-medium text-paper shadow-[0_6px_24px_rgba(0,0,0,0.18)] transition-[opacity,translate] duration-(--dur-base) ease-[var(--ease-out-quint)] lg:hidden ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppMark className="size-[18px]" />
      {t(ui.whatsappFab)}
    </a>
  );
}
