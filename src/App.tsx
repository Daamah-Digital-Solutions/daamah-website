import { Suspense, lazy } from "react";
import { BLOG_ENABLED } from "./content/features";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { EN_PREFIX, LangProvider, stripLang } from "./i18n";
import { barePaths } from "./content/nationalDay";
import { ThemeProvider } from "./theme";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { ScrollManager } from "./components/Routing";
import { Seo } from "./components/Seo";
import { Analytics } from "./components/Analytics";
import { Home } from "./pages/Home";

/**
 * الصفحات الداخلية تُحمَّل عند طلبها.
 *
 * `prerenderToNodeStream` ينتظر ما يتعلّق، فتصل كل صفحة مرسومةً
 * كاملةً في ملفها الثابت رغم الكسل — والكسل يخصّ المتصفح وحده:
 * من يفتح الرئيسية لا يحمّل نموذج عرض السعر ولا صفحات المدن.
 *
 * والرئيسية تبقى مستوردةً استيرادًا ساكنًا: هي أكثر الصفحات فتحًا،
 * وتأجيلها يضيف رحلة شبكة إلى أهمّ مسار في الموقع.
 */
const AboutPage = lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import("./pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage").then((m) => ({ default: m.ServiceDetailPage })));
const CityServicePage = lazy(() => import("./pages/CityServicePage").then((m) => ({ default: m.CityServicePage })));
const SaudiHubPage = lazy(() => import("./pages/SaudiHubPage").then((m) => ({ default: m.SaudiHubPage })));
const WorkPage = lazy(() => import("./pages/WorkPage").then((m) => ({ default: m.WorkPage })));
const WorkDetailPage = lazy(() => import("./pages/WorkDetailPage").then((m) => ({ default: m.WorkDetailPage })));
const ClientStoryPage = lazy(() => import("./pages/ClientStoryPage").then((m) => ({ default: m.ClientStoryPage })));
const ProcessPage = lazy(() => import("./pages/ProcessPage").then((m) => ({ default: m.ProcessPage })));
const ProfilePage = lazy(() => import("./pages/ProfilePage").then((m) => ({ default: m.ProfilePage })));
const ContractorsPage = lazy(() => import("./pages/ContractorsPage").then((m) => ({ default: m.ContractorsPage })));
const PackagesPage = lazy(() => import("./pages/PackagesPage").then((m) => ({ default: m.PackagesPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const NationalDayPage = lazy(() => import("./pages/NationalDayPage").then((m) => ({ default: m.NationalDayPage })));
const BlogPage = lazy(() => import("./pages/BlogPage").then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage").then((m) => ({ default: m.BlogPostPage })));
const BlogTagPage = lazy(() => import("./pages/BlogTagPage").then((m) => ({ default: m.BlogTagPage })));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })));
const FaqPage = lazy(() => import("./pages/FaqPage").then((m) => ({ default: m.FaqPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

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
    /* المدينة قبل الخدمة المفردة: المسار أطول فيلتقطه أولًا */
    <Route
      key={`${prefix}-cityservice`}
      path={at("services/:slug/:city")}
      element={<CityServicePage />}
    />,
    <Route
      key={`${prefix}-service`}
      path={at("services/:slug")}
      element={<ServiceDetailPage />}
    />,
    <Route key={`${prefix}-contractors`} path={at("contractors")} element={<ContractorsPage />} />,
    <Route key={`${prefix}-saudi`} path={at("saudi")} element={<SaudiHubPage />} />,
    <Route key={`${prefix}-work`} path={at("work")} element={<WorkPage />} />,
    <Route key={`${prefix}-workitem`} path={at("work/:slug")} element={<WorkDetailPage />} />,
    <Route key={`${prefix}-client`} path={at("clients/:slug")} element={<ClientStoryPage />} />,
    <Route key={`${prefix}-process`} path={at("process")} element={<ProcessPage />} />,
    <Route key={`${prefix}-profile`} path={at("profile")} element={<ProfilePage />} />,
    <Route key={`${prefix}-solutions`} path={at("solutions")} element={<PackagesPage />} />,
    <Route key={`${prefix}-contact`} path={at("contact")} element={<ContactPage />} />,
    /* المدوّنة موقوفة مؤقّتًا (`content/features.ts`) — مساراتها تُعرض 404 */
    ...(BLOG_ENABLED
      ? [
          <Route key={`${prefix}-blog`} path={at("blog")} element={<BlogPage />} />,
          /* الوسم قبل المقال: لولا ذلك لالتقط `:slug` كلمة «tag» */
          <Route key={`${prefix}-blogtag`} path={at("blog/tag/:tag")} element={<BlogTagPage />} />,
          <Route key={`${prefix}-blogpost`} path={at("blog/:slug")} element={<BlogPostPage />} />,
        ]
      : []),
    <Route key={`${prefix}-privacy`} path={at("privacy")} element={<PrivacyPage />} />,
    <Route key={`${prefix}-faq`} path={at("faq")} element={<FaqPage />} />,
    /* صفحة حملة عربية فقط: لا نسخة إنجليزية لها، فلا مسار تحت `/en` */
    ...(prefix === ""
      ? [<Route key="national-day" path="/national-day" element={<NationalDayPage />} />]
      : []),
  ];
}

/**
 * كل ما داخل الموجّه — بلا `BrowserRouter`.
 *
 * مفصولٌ عن `App` لأن التوليد المسبق وقت البناء يلفّ الشجرة نفسها
 * بـ `StaticRouter` بدل موجّه المتصفح. الشجرة واحدة في الحالتين،
 * فلا يمكن أن يختلف ما يراه الزاحف عمّا يراه الزائر.
 */
export function Shell() {
  /* صفحات الإعلانات بلا هيدر ولا فوتر: كل رابط تنقّل فيها بابٌ يخرج
     منه زائرٌ دُفع ثمن وصوله قبل أن يحجز */
  const bare = barePaths.includes(stripLang(useLocation().pathname));
  return (
    <ThemeProvider>
      <LangProvider>
        <ScrollManager />
        <Seo />
        <Analytics />
        {!bare && <Header />}
        <main>
          {/* بلا واجهة انتظار: الصفحة المرسومة تبقى ظاهرة حتى تصل
              حزمتها، ووضع مؤشّر تحميل مكانها يومض بلا داعٍ */}
          <Suspense fallback={null}>
            <Routes>
              {pageRoutes(EN_PREFIX)}
              {pageRoutes("")}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        {!bare && <Footer />}
        {!bare && <WhatsAppFab />}
      </LangProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
