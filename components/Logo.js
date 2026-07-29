const GRADIENT_ID = "bbu-samakum-logo-grad";

export default function Logo({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={GRADIENT_ID} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E4BD74" />
          <stop offset="1" stopColor="#3F6652" />
        </linearGradient>
      </defs>
      <path
        d="M20 1.6 L37 9.6 V21.3 C37 30 30 36.7 20 38.6 C10 36.7 3 30 3 21.3 V9.6 Z"
        fill={`url(#${GRADIENT_ID})`}
        stroke="#142E28"
        strokeOpacity="0.14"
      />
      <text
        x="20"
        y="25.5"
        textAnchor="middle"
        fontFamily="ui-monospace, 'JetBrains Mono', monospace"
        fontWeight="700"
        fontSize="12.5"
        letterSpacing="0.3"
        fill="#FBF9F2"
      >
        BBU
      </text>
      <circle cx="20" cy="9.2" r="1.9" fill="#9C3B3B" />
    </svg>
  );
}
