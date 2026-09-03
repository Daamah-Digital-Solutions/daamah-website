import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App";
import { brand, services } from "./content/home";
import { initAnalytics } from "./analytics";

/* بيانات منظّمة لمحركات البحث */
const ld = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name.ar,
  alternateName: brand.name.en,
  description:
    "دَعمة للحلول الرقمية — منذ 2018 نبني حضورًا رقميًا متكاملًا للشركات في مصر والخليج وأوروبا: هوية بصرية، مواقع، سوشيال ميديا، وتسويق رقمي يحقق نتائج.",
  url: `https://${brand.domain}`,
  email: brand.email,
  telephone: brand.phoneRaw,
  foundingDate: String(brand.founded),
  sameAs: [
    "https://instagram.com/daamah.digital.solutions",
    "https://facebook.com/daamah.digital.solutions",
  ],
  areaServed: ["SA", "AE", "EG", "EU"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "خدمات دَعمة",
    itemListElement: services.items.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name.ar,
        alternateName: s.en,
        description: s.desc.ar,
      },
    })),
  },
};
initAnalytics();

const tag = document.createElement("script");
tag.type = "application/ld+json";
tag.textContent = JSON.stringify(ld);
document.head.appendChild(tag);

/**
 * تفعيل الحركة — قبل أول رسم، لا بعده.
 * المحتوى ظاهر افتراضيًا؛ هذه الفئة هي ما يسمح للحركات بالعمل.
 *
 * لا نفعّلها والصفحة مخفية: الحركات لن تبدأ أصلًا فيبقى المحتوى
 * غير مرئي. لكن لا يكفي الفحص مرّة واحدة — من يفتح الموقع في تبويب
 * خلفي كان يفقد كل الحركات إلى الأبد، فننتظر أول ظهور للصفحة.
 */
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const enable = () => document.documentElement.classList.add("anim-ready");

  if (document.visibilityState === "visible") {
    enable();
  } else {
    document.addEventListener("visibilitychange", function once() {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", once);
      enable();
    });
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
