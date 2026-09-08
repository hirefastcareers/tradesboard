/** Diagonal tiled SVG of flat trade tools at low opacity */
export function ToolPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="trade-tools"
            width="140"
            height="140"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-18)"
          >
            {/* Hammer */}
            <g fill="#21262B">
              <rect x="12" y="18" width="18" height="8" rx="1" />
              <rect x="18" y="26" width="5" height="28" rx="1" />
            </g>
            {/* Spanner */}
            <g fill="#21262B" transform="translate(70 12)">
              <path d="M4 6c0-3 2-5 5-5s5 2 5 5c0 1.5-.5 2.5-1.5 3.5L18 20l-4 4-5.5-5.5C7.5 19.5 6.5 20 5 20c-3 0-5-2-5-5s2-5 5-5c.3 0 .7 0 1 .1V6z" />
            </g>
            {/* Paint roller */}
            <g fill="#21262B" transform="translate(20 78)">
              <rect x="0" y="0" width="28" height="10" rx="3" />
              <rect x="22" y="10" width="4" height="14" />
              <rect x="10" y="22" width="16" height="4" rx="1" />
            </g>
            {/* Trowel */}
            <g fill="#21262B" transform="translate(90 70)">
              <path d="M8 4 L28 18 L22 28 L2 14 Z" />
              <rect x="0" y="10" width="6" height="20" rx="1" transform="rotate(-35 3 20)" />
            </g>
            {/* Spirit level */}
            <g fill="#21262B" transform="translate(8 118)">
              <rect x="0" y="0" width="40" height="8" rx="2" />
              <rect x="14" y="1.5" width="12" height="5" rx="1" fill="#FAF7F2" opacity="0.5" />
            </g>
            {/* Hard hat */}
            <g fill="#21262B" transform="translate(95 110)">
              <ellipse cx="16" cy="14" rx="16" ry="6" />
              <path d="M4 14 Q16 0 28 14 Z" />
            </g>
            {/* Drill */}
            <g fill="#21262B" transform="translate(55 95)">
              <rect x="8" y="0" width="18" height="14" rx="2" />
              <rect x="0" y="5" width="10" height="4" rx="1" />
              <rect x="22" y="4" width="14" height="3" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#trade-tools)" />
      </svg>
    </div>
  );
}
