const PLANETS = [
  { label: "Holistic Age", x: 364, y: 116, r: 42, fill: "#065f46", ring: true },
  { label: "ArcScore", x: 364, y: 364, r: 36, fill: "#b45309", ring: false },
  { label: "3663 Lifestyle", x: 116, y: 364, r: 36, fill: "#0f766e", ring: false },
  { label: "3663 Fitness", x: 116, y: 116, r: 36, fill: "#78716c", ring: false },
];

// Placeholder graphic: Ageless Living as the sun at the center, with the
// rest of the product family orbiting it. Holistic Age is highlighted since
// this is that product's own app.
export function AgelessLivingDiagram() {
  return (
    <svg viewBox="0 0 480 480" className="mx-auto w-full max-w-md" role="img" aria-label="Diagram showing Ageless Living at the center, orbited by ArcScore, Holistic Age, 3663 Lifestyle, and 3663 Fitness">
      <circle cx="240" cy="240" r="175" fill="none" stroke="#d6d3d1" strokeWidth="1.5" strokeDasharray="4 5" />

      {PLANETS.map((p) => (
        <g key={p.label}>
          <line x1="240" y1="240" x2={p.x} y2={p.y} stroke="#e7e5e4" strokeWidth="1.5" />
        </g>
      ))}

      <circle cx="240" cy="240" r="58" fill="#b45309" stroke="#92400e" strokeWidth="2" />
      <text x="240" y="235" textAnchor="middle" fontSize="14" fontWeight="600" fill="white">
        Ageless
      </text>
      <text x="240" y="253" textAnchor="middle" fontSize="14" fontWeight="600" fill="white">
        Living
      </text>

      {PLANETS.map((p) => (
        <g key={p.label}>
          <circle
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.fill}
            stroke={p.ring ? "#10b981" : "none"}
            strokeWidth={p.ring ? 3 : 0}
          />
          <text
            x={p.x}
            y={p.y + p.r + 20}
            textAnchor="middle"
            fontSize="13"
            fontWeight="500"
            fill="#44403c"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
