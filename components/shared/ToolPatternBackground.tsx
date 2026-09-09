/**
 * Seamless tiled wallpaper of trade tool icons.
 * Positions are hard-coded in a 2×2 SVG pattern — never randomized.
 */
export function ToolPatternBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: 0.07 }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          <pattern
            id="tool-tile"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            {/* Hammer — cell center (40, 40), rotate -12° */}
            <g transform="translate(40 40) rotate(-12)">
              <g
                transform="translate(-14 -14)"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M8 3h12l1.5 5H6.5L8 3z"
                  fill="var(--ink)"
                  stroke="none"
                />
                <path d="M14 8v16" />
                <path d="M11 24h6" />
              </g>
            </g>

            {/* Spanner — cell center (120, 40), rotate 8° */}
            <g transform="translate(120 40) rotate(8)">
              <g
                transform="translate(-14 -14)"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.2 6.8a5 5 0 0 0-6.8 6.8L4 20l4 4 6.4-6.4a5 5 0 0 0 6.8-6.8L17 14l-3-3 3.2-3.2z" />
              </g>
            </g>

            {/* Paint roller — cell center (40, 120), rotate 15° */}
            <g transform="translate(40 120) rotate(15)">
              <g
                transform="translate(-14 -14)"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="4"
                  y="2"
                  width="18"
                  height="7"
                  rx="2"
                  fill="var(--ink)"
                  stroke="none"
                />
                <path d="M13 9v5H8a2.5 2.5 0 0 0-2.5 2.5V20" />
                <path d="M5.5 20h5" />
              </g>
            </g>

            {/* Spirit level — cell center (120, 120), rotate -6° */}
            <g transform="translate(120 120) rotate(-6)">
              <g
                transform="translate(-14 -14)"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="10" width="26" height="8" rx="2" />
                <circle
                  cx="14"
                  cy="14"
                  r="2.2"
                  fill="var(--ink)"
                  stroke="none"
                />
                <path d="M6 14h3M19 14h3" />
              </g>
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tool-tile)" />
      </svg>
    </div>
  );
}
