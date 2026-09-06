import { Hero } from "../sections/Hero";
import { Selector } from "../sections/Selector";
import { Argument } from "../sections/Argument";
import { Work } from "../sections/Work";
import { Clients } from "../sections/Clients";
import { Faq } from "../sections/Faq";
import { PageCta } from "../components/PageCta";

/**
 * الرئيسية: وعد ← تشخيص ← حجّة ← دليل ← ناس ← اعتراضات ← باب.
 *
 * كانت ثمانية أقسام بترتيب صفحات الملف التعريفي — بروشورًا يعرّف
 * بالشركة. صارت سبعة أقصر تشخّص الزائر: يفهم الوعد في ثوانٍ، يجد
 * نفسه في المُرشد، يرى لماذا شركة واحدة، ثم دليلًا، ثم بابين.
 *
 * «من نحن» و«كيف نعمل» والعدّادات انتقلت إلى صفحاتها.
 */
export function Home() {
  return (
    <>
      <Hero />
      <Selector />
      <Argument />
      <Work />
      <Clients />
      <Faq />
      <PageCta
        lines={{
          ar: ["لستم جاهزين", "للكلام بعد؟"],
          en: ["Not ready", "to talk yet?"],
        }}
        placement="home"
        offer={{
          ar: "أرسلوا رابط موقعكم أو حسابكم — نرد برأي في سطرين خلال يوم.",
          en: "Send us your site or account link — we reply with a two-line view within a day.",
        }}
      />
    </>
  );
}
