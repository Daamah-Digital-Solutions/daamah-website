/**
 * الوردمارك متّجهًا — `daa»ah`.
 *
 * ملف الـ PNG يتكسّر حين يُكبَّر، والفوتر يعرضه بعرض الحاوية كاملًا.
 * هنا مُعاد بناؤه من هندسته: حلقة + ساق لكل حرف، وثلاثة شيفرونات
 * مكان الـ m. اللون من `currentColor` فينقلب مع السمة بلا نسختين،
 * والشيفرون الأوسط بلون اللكنة.
 *
 * الحلقة والساق مساران منفصلان عمدًا: لو جُمعا في مسار واحد بقاعدة
 * `evenodd` لصار تداخلهما ثقبًا أبيض ليس في الشعار.
 */
const ring = (cx: number) =>
  `M${cx - 135},378 a135,140 0 1,0 270,0 a135,140 0 1,0 -270,0 Z M${cx - 74},378 a74,78 0 1,1 148,0 a74,78 0 1,1 -148,0 Z`;

const stem = (x: number) => `M${x},517 L${x},135 C${x},62 ${x + 24},26 ${x + 65},18 L${x + 65},517 Z`;

const chevron = (x: number) => `M${x},240 L${x + 96},240 L${x + 160},378.5 L${x + 96},517 L${x},517 L${x + 64},378.5 Z`;

const RINGS = [152, 467, 782, 1522].map(ring);
const SOLIDS = [
  stem(225),
  "M540,240 L605,240 L605,517 L540,517 Z",
  "M855,240 L920,240 L920,517 L855,517 Z",
  "M1595,240 L1660,240 L1660,517 L1595,517 Z",
  `${stem(1710)} M1772,292 C1800,258 1832,238 1866,238 C1918,238 1945,282 1945,342 L1945,517 L1880,517 L1880,366 C1880,334 1864,316 1840,316 C1806,316 1772,342 1772,384 Z`,
];

export function Wordmark({
  className = "",
  accent = "var(--color-red)",
  title,
}: {
  className?: string;
  /** لون الشيفرون الأوسط */
  accent?: string;
  /** يُترك فارغًا حين يكون الشعار زخرفيًا */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 1960 540"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g fill="currentColor">
        {RINGS.map((d) => (
          <path key={d} d={d} fillRule="evenodd" />
        ))}
        {SOLIDS.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d={chevron(955)} />
        <path d={chevron(1200)} />
      </g>
      <path d={chevron(1080)} fill={accent} />
    </svg>
  );
}
