import { Hero } from "../sections/Hero";
import { Film } from "../sections/Film";
import { About } from "../sections/About";
import { Services } from "../sections/Services";
import { Work } from "../sections/Work";
import { Process } from "../sections/Process";
import { Packages } from "../sections/Packages";
import { Faq } from "../sections/Faq";
import { Contact } from "../sections/Contact";

/**
 * الرئيسية = عرض مختصر لكل قسم، وكل قسم ينتهي برابط إلى صفحته
 * الكاملة. الأقسام هنا ملخّصات لا نسخ من الصفحات.
 */
export function Home() {
  return (
    <>
      <Hero />
      <Film />
      <About />
      <Services />
      <Work />
      <Process />
      <Packages />
      <Faq />
      <Contact />
    </>
  );
}
