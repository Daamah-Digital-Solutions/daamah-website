/**
 * يولّد أيقونات PNG من `public/favicon.svg`.
 *
 * يُشغَّل يدويًا حين تتغيّر العلامة — لا في كل بناء: الأيقونات ثابتة
 * وتُلتزم في المستودع، فالبناء لا يحتاج `sharp` أصلًا.
 *
 *   node scripts/icons.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const pub = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public");
const svg = readFileSync(join(pub, "favicon.svg"));

/* apple-touch-icon بلا شفافية: iOS يضع خلفية سوداء مكانها */
const sizes = [
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-touch-icon.png", 180],
  ["favicon-48.png", 48],
];

for (const [name, size] of sizes) {
  await sharp(svg, { density: 600 }).resize(size, size).png().toFile(join(pub, name));
  console.log(`${name}  ${size}×${size}`);
}
