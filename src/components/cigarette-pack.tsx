const FILTER = "#f28a1e";
const PAPER = "#f3dfb8";

function Cigarette({ x, y, width = 28 }: { x: number; y: number; width?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={70} fill={FILTER} />
      <rect x={x + width - 6} y={y} width={6} height={70} fill="#c9650f" />
      <rect x={x} y={y} width={width} height={5} fill="#ffb14d" />
      <circle cx={x + width / 2} cy={y + 22} r={1.5} fill="#c9650f" />
      <circle cx={x + width / 3} cy={y + 46} r={1.5} fill="#c9650f" />
      <rect x={x} y={y + 70} width={width} height={5} fill="#d9a441" />
      <rect x={x} y={y + 75} width={width} height={170 - (y + 75)} fill={PAPER} />
    </g>
  );
}

export function CigarettePack({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Open pack of filter cigarettes"
      viewBox="0 0 260 260"
      className={className}
    >
      {/* Box */}
      <rect x="20" y="28" width="220" height="226" fill="#0b4a38" />
      <rect x="20" y="28" width="220" height="30" fill="#06382a" />

      {/* Foil */}
      <polygon points="30,104 130,68 230,104" fill="#f4f1ea" />

      {/* Back row, then the shorter front row */}
      <Cigarette x={102} y={2} width={32} />
      <Cigarette x={138} y={22} />
      <Cigarette x={70} y={46} />
      <Cigarette x={168} y={52} />
      <Cigarette x={40} y={84} />
      <Cigarette x={196} y={86} />

      {/* Foil pocket */}
      <path
        d="M10 192 V110 Q10 92 28 92 Q44 92 47 110 L53 150 Q55 162 68 162 H192 Q205 162 207 150 L213 110 Q216 92 232 92 Q250 92 250 110 V192 Q130 206 10 192 Z"
        fill="#d9942f"
      />
      <path
        d="M10 180 Q130 194 250 180 V192 Q130 206 10 192 Z"
        fill="#b87620"
      />

      {/* Label */}
      <rect x="62" y="216" width="136" height="20" rx="10" fill="#06382a" />
      <text
        x="130"
        y="229"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="8"
        letterSpacing="2"
        fill="#ecdcae"
      >
        FILTER CIGARETTES
      </text>
      <path d="M40 222 l2 5 h5 l-4 3 l2 5 l-5 -3 l-5 3 l2 -5 l-4 -3 h5 Z" fill="#06382a" />
      <path d="M220 222 l2 5 h5 l-4 3 l2 5 l-5 -3 l-5 3 l2 -5 l-4 -3 h5 Z" fill="#06382a" />
    </svg>
  );
}
