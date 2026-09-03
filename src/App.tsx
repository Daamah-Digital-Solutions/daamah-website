import { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EN_PREFIX, LangProvider } from "./i18n";
import { ThemeProvider } from "./theme";
import { MotionGate } from "./motion";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Intro, shouldPlayIntro } from "./components/Intro";
import { ScrollManager } from "./components/Routing";
import { Seo } from "./components/Seo";
import { Analytics } from "./components/Analytics";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { WorkPage } from "./pages/WorkPage";
import { WorkDetailPage } from "./pages/WorkDetailPage";
import { ProcessPage } from "./pages/ProcessPage";
import { PackagesPage } from "./pages/PackagesPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

/**
 * نفس شجرة الصفحات تحت بادئتين: الجذر للعربية و`/en` للإنجليزية.
 * اللغة تُقرأ من المسار في `LangProvider`، فلا حاجة لتمريرها هنا.
 */
function pageRoutes(prefix: string) {
  const at = (sub: string) => `${prefix}/${sub}`.replace(/\/{2,}/g, "/");
  return [
    <Route key={`${prefix}-home`} path={prefix || "/"} element={<Home />} />,
    <Route key={`${prefix}-about`} path={at("about")} element={<AboutPage />} />,
    <Route key={`${prefix}-services`} path={at("services")} element={<ServicesPage />} />,
    <Route
      key={`${prefix}-service`}
      path={at("services/:slug")}
      element={<ServiceDetailPage />}
    />,
    <Route key={`${prefix}-work`} path={at("work")} element={<WorkPage />} />,
    <Route key={`${prefix}-workitem`} path={at("work/:slug")} element={<WorkDetailPage />} />,
    <Route key={`${prefix}-process`} path={at("process")} element={<ProcessPage />} />,
    <Route key={`${prefix}-packages`} path={at("packages")} element={<PackagesPage />} />,
    <Route key={`${prefix}-contact`} path={at("contact")} element={<ContactPage />} />,
  ];
}

export default function App() {
  // يُحسم مرّة عند أول رسم: لو تغيّر لاحقًا لانطلقت اللحظة في منتصف التصفّح
  const [playIntro] = useState(shouldPlayIntro);
  const [introDone, setIntroDone] = useState(!playIntro);
  const onIntroDone = useCallback(() => setIntroDone(true), []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <LangProvider>
          <ScrollManager />
          <Seo />
          <Analytics />
          {/* الحركة لا تبدأ قبل أن ترتفع الستارة */}
          <MotionGate started={introDone}>
            {playIntro && !introDone && <Intro onDone={onIntroDone} />}
            <Header />
            <main>
              <Routes>
                {pageRoutes(EN_PREFIX)}
                {pageRoutes("")}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </MotionGate>
        </LangProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
