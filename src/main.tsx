import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App";
import { initAnalytics } from "./analytics";

initAnalytics();

const root = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * الترطيب حين تصل الصفحة مرسومةً، والرسم من الصفر حين لا تصل.
 *
 * ملفات الإنتاج يكتبها البناء وفيها الشجرة كاملة، فنُلحق بها
 * المستمعات ولا نعيد رسمها. أمّا خادم التطوير فيقدّم `index.html`
 * بجذر فارغ — و`hydrateRoot` على جذر فارغ يرمي كل شيء ويُحذّر.
 */
if (root.hasChildNodes()) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}
