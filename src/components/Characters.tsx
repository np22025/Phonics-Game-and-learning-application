// Custom SVG characters inspired by:
//  - Troll = a colorful goofy troll (Poppy Playtime / Trolls vibe)
//  - Spider = a friendly web-slinger hero (Spider-Man inspired)
//  - Explorer = a cheerful explorer with goggles + safari hat (Blippi inspired)
//  - Blippo = a curious mascot with big glasses
// All original SVG so we don't infringe on any character IP.

import type { CSSProperties } from "react";

interface CharacterProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function TrollCharacter({ size = 120, className = "", style }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Troll mascot"
      role="img"
    >
      <defs>
        <radialGradient id="troll-body" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        <linearGradient id="troll-hair" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* hair flames */}
      <path d="M40 70 Q 50 10, 70 40 Q 90 0, 100 40 Q 115 5, 130 40 Q 150 10, 160 70 Z" fill="url(#troll-hair)" />
      {/* body */}
      <ellipse cx="100" cy="120" rx="60" ry="55" fill="url(#troll-body)" stroke="#7c2d12" strokeWidth="3" />
      {/* eyes */}
      <circle cx="78" cy="115" r="14" fill="white" />
      <circle cx="122" cy="115" r="14" fill="white" />
      <circle cx="80" cy="118" r="6" fill="#1f2937" />
      <circle cx="124" cy="118" r="6" fill="#1f2937" />
      <circle cx="82" cy="116" r="2" fill="white" />
      <circle cx="126" cy="116" r="2" fill="white" />
      {/* nose */}
      <ellipse cx="100" cy="135" rx="6" ry="4" fill="#7c2d12" />
      {/* mouth - cheeky grin */}
      <path d="M80 150 Q 100 170, 120 150" stroke="#7c2d12" strokeWidth="4" fill="#fde68a" />
      {/* tooth */}
      <rect x="96" y="150" width="6" height="8" fill="white" stroke="#7c2d12" strokeWidth="1" />
      {/* eyebrows */}
      <path d="M68 100 Q 78 95, 88 100" stroke="#7c2d12" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M112 100 Q 122 95, 132 100" stroke="#7c2d12" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function SpiderCharacter({ size = 120, className = "", style }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Web-slinger hero mascot"
      role="img"
    >
      <defs>
        <radialGradient id="spider-mask" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>
      {/* mask head */}
      <ellipse cx="100" cy="105" rx="65" ry="70" fill="url(#spider-mask)" stroke="#450a0a" strokeWidth="3" />
      {/* web pattern */}
      <g stroke="#1f2937" strokeWidth="1.5" fill="none" opacity="0.55">
        <line x1="100" y1="40" x2="100" y2="170" />
        <line x1="40" y1="105" x2="160" y2="105" />
        <line x1="55" y1="55" x2="145" y2="155" />
        <line x1="55" y1="155" x2="145" y2="55" />
        <ellipse cx="100" cy="105" rx="22" ry="18" />
        <ellipse cx="100" cy="105" rx="40" ry="34" />
        <ellipse cx="100" cy="105" rx="56" ry="50" />
      </g>
      {/* eyes - big white teardrops with black outline */}
      <path d="M65 95 Q 60 75, 85 78 Q 95 95, 80 105 Z" fill="white" stroke="#1f2937" strokeWidth="2.5" />
      <path d="M135 95 Q 140 75, 115 78 Q 105 95, 120 105 Z" fill="white" stroke="#1f2937" strokeWidth="2.5" />
    </svg>
  );
}

export function ExplorerCharacter({ size = 120, className = "", style }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Explorer mascot"
      role="img"
    >
      {/* body */}
      <rect x="60" y="115" width="80" height="60" rx="14" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="3" />
      {/* head */}
      <circle cx="100" cy="95" r="40" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
      {/* hat */}
      <ellipse cx="100" cy="65" rx="50" ry="8" fill="#f59e0b" stroke="#7c2d12" strokeWidth="2" />
      <path d="M75 65 Q 100 30, 125 65 Z" fill="#f59e0b" stroke="#7c2d12" strokeWidth="2" />
      {/* hat band */}
      <rect x="75" y="60" width="50" height="6" fill="#dc2626" />
      {/* goggles */}
      <circle cx="85" cy="95" r="11" fill="white" stroke="#1f2937" strokeWidth="3" />
      <circle cx="115" cy="95" r="11" fill="white" stroke="#1f2937" strokeWidth="3" />
      <line x1="96" y1="95" x2="104" y2="95" stroke="#1f2937" strokeWidth="3" />
      <circle cx="85" cy="95" r="4" fill="#1f2937" />
      <circle cx="115" cy="95" r="4" fill="#1f2937" />
      {/* smile */}
      <path d="M85 115 Q 100 125, 115 115" stroke="#7c2d12" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* bowtie */}
      <path d="M85 130 L 100 138 L 85 146 Z M 115 130 L 100 138 L 115 146 Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />
      <circle cx="100" cy="138" r="3" fill="#7f1d1d" />
    </svg>
  );
}

export function BlippoCharacter({ size = 120, className = "", style }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Blippo mascot"
      role="img"
    >
      <defs>
        <linearGradient id="blippo-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* round body */}
      <circle cx="100" cy="110" r="70" fill="url(#blippo-body)" stroke="#4c1d95" strokeWidth="3" />
      {/* big glasses */}
      <circle cx="78" cy="100" r="22" fill="white" stroke="#1f2937" strokeWidth="3" />
      <circle cx="122" cy="100" r="22" fill="white" stroke="#1f2937" strokeWidth="3" />
      <line x1="100" y1="100" x2="100" y2="100" stroke="#1f2937" strokeWidth="3" />
      <line x1="92" y1="100" x2="108" y2="100" stroke="#1f2937" strokeWidth="3" />
      {/* pupils */}
      <circle cx="78" cy="100" r="6" fill="#1f2937" />
      <circle cx="122" cy="100" r="6" fill="#1f2937" />
      <circle cx="80" cy="98" r="2" fill="white" />
      <circle cx="124" cy="98" r="2" fill="white" />
      {/* smile */}
      <path d="M80 140 Q 100 158, 120 140" stroke="#1f2937" strokeWidth="3.5" fill="#fde68a" strokeLinecap="round" />
      {/* tuft of hair */}
      <path d="M80 50 Q 100 25, 120 50 Q 110 45, 100 50 Q 90 45, 80 50 Z" fill="#fde047" stroke="#a16207" strokeWidth="2" />
    </svg>
  );
}

export function HeroByName({
  name,
  size,
  className,
  style,
}: CharacterProps & { name: "troll" | "spider" | "explorer" | "blippo" }) {
  switch (name) {
    case "troll":
      return <TrollCharacter size={size} className={className} style={style} />;
    case "spider":
      return <SpiderCharacter size={size} className={className} style={style} />;
    case "explorer":
      return <ExplorerCharacter size={size} className={className} style={style} />;
    case "blippo":
      return <BlippoCharacter size={size} className={className} style={style} />;
  }
}

// Decorative background SVG used at the top of every screen.
export function ThemeBackdrop({ theme }: { theme: "troll" | "spider" | "explorer" | "magic" }) {
  if (theme === "troll") {
    return (
      <svg
        className="absolute inset-x-0 top-0 -z-10 h-64 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="trollSky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        <rect width="1440" height="320" fill="url(#trollSky)" />
        <circle cx="200" cy="80" r="40" fill="#fbbf24" opacity="0.7" />
        <path
          d="M0 220 Q 240 120 480 220 T 960 220 T 1440 220 V 320 H 0 Z"
          fill="#7c2d12"
          opacity="0.85"
        />
        <path
          d="M0 260 Q 240 160 480 260 T 960 260 T 1440 260 V 320 H 0 Z"
          fill="#92400e"
        />
      </svg>
    );
  }
  if (theme === "spider") {
    return (
      <svg
        className="absolute inset-x-0 top-0 -z-10 h-64 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="spiderSky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
        </defs>
        <rect width="1440" height="320" fill="url(#spiderSky)" />
        {/* skyline */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <rect
            key={i}
            x={i * 160}
            y={140 + (i % 3) * 30}
            width="100"
            height={180 - (i % 3) * 30}
            fill="#0f172a"
          />
        ))}
        {/* moon */}
        <circle cx="1200" cy="80" r="40" fill="#fef3c7" />
      </svg>
    );
  }
  if (theme === "explorer") {
    return (
      <svg
        className="absolute inset-x-0 top-0 -z-10 h-64 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="exSky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
        </defs>
        <rect width="1440" height="320" fill="url(#exSky)" />
        <ellipse cx="720" cy="320" rx="900" ry="200" fill="#10b981" />
        <ellipse cx="200" cy="240" rx="120" ry="60" fill="#15803d" opacity="0.6" />
        <ellipse cx="1200" cy="240" rx="160" ry="80" fill="#15803d" opacity="0.6" />
      </svg>
    );
  }
  // magic
  return (
    <svg
      className="absolute inset-x-0 top-0 -z-10 h-64 w-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="magicSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect width="1440" height="320" fill="url(#magicSky)" />
      {[
        [200, 80],
        [400, 160],
        [600, 60],
        [800, 140],
        [1000, 90],
        [1200, 170],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z" fill="#fde047" />
        </g>
      ))}
    </svg>
  );
}
