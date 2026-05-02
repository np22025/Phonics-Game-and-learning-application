// =============================================================================
// THE SOUND SQUAD — original SVG mascot art
// =============================================================================
// All 8 characters are original creative work designed for this game.
// Each is a self-contained SVG component with multi-stop gradients, drop
// shadows, and expressive faces.
// =============================================================================

import type { CSSProperties } from "react";
import type { CharacterId } from "../data/characters";

interface CharacterProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  // Optional emotional state — alters facial expression / pose.
  mood?: "happy" | "sad" | "excited";
}

// ----- Pixel — robot scout -----
export function PixelCharacter({ size = 160, className = "", style, mood = "happy" }: CharacterProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-label="Pixel the Sky Scout" role="img">
      <defs>
        <linearGradient id="pixel-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="60%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <radialGradient id="pixel-eye" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </radialGradient>
      </defs>
      {/* antennae */}
      <line x1="80" y1="30" x2="65" y2="10" stroke="#0c4a6e" strokeWidth="3" strokeLinecap="round" />
      <line x1="120" y1="30" x2="135" y2="10" stroke="#0c4a6e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="65" cy="10" r="6" fill="#fde047">
        <animate attributeName="r" values="6;8;6" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="135" cy="10" r="6" fill="#f472b6">
        <animate attributeName="r" values="6;8;6" dur="1.4s" begin="0.7s" repeatCount="indefinite" />
      </circle>
      {/* head */}
      <rect x="50" y="35" width="100" height="80" rx="22" fill="url(#pixel-body)" stroke="#075985" strokeWidth="3" />
      {/* visor / face panel */}
      <rect x="62" y="50" width="76" height="44" rx="10" fill="#0c4a6e" />
      {/* eyes (LED screens) */}
      <circle cx="82" cy="72" r={mood === "sad" ? 8 : 10} fill="url(#pixel-eye)" />
      <circle cx="118" cy="72" r={mood === "sad" ? 8 : 10} fill="url(#pixel-eye)" />
      <circle cx="82" cy="74" r="4" fill="#0369a1" />
      <circle cx="118" cy="74" r="4" fill="#0369a1" />
      <circle cx="84" cy="71" r="2" fill="white" />
      <circle cx="120" cy="71" r="2" fill="white" />
      {/* mouth */}
      {mood === "happy" && <path d="M85 92 Q 100 100, 115 92" stroke="#7dd3fc" strokeWidth="3" fill="none" strokeLinecap="round" />}
      {mood === "sad" && <path d="M85 96 Q 100 88, 115 96" stroke="#7dd3fc" strokeWidth="3" fill="none" strokeLinecap="round" />}
      {mood === "excited" && <ellipse cx="100" cy="94" rx="10" ry="6" fill="#0c4a6e" stroke="#7dd3fc" strokeWidth="2" />}
      {/* body */}
      <rect x="65" y="115" width="70" height="40" rx="10" fill="url(#pixel-body)" stroke="#075985" strokeWidth="3" />
      {/* chest light */}
      <circle cx="100" cy="135" r="7" fill="#fde047" stroke="#a16207" strokeWidth="2">
        <animate attributeName="fill" values="#fde047;#facc15;#fde047" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {/* arms */}
      <rect x="40" y="120" width="20" height="35" rx="8" fill="url(#pixel-body)" stroke="#075985" strokeWidth="2.5" />
      <rect x="140" y="120" width="20" height="35" rx="8" fill="url(#pixel-body)" stroke="#075985" strokeWidth="2.5" />
      {/* jet boots */}
      <rect x="70" y="155" width="22" height="18" rx="6" fill="#475569" stroke="#1e293b" strokeWidth="2" />
      <rect x="108" y="155" width="22" height="18" rx="6" fill="#475569" stroke="#1e293b" strokeWidth="2" />
      {/* jet flames */}
      <path d="M75 173 Q 81 188, 87 173 Z" fill="#fb923c" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.4;0.85" dur="0.4s" repeatCount="indefinite" />
      </path>
      <path d="M113 173 Q 119 188, 125 173 Z" fill="#fb923c" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.4;0.85" dur="0.4s" begin="0.2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

// ----- Nova — star sprite -----
export function NovaCharacter({ size = 160, className = "", style, mood = "happy" }: CharacterProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-label="Nova the Star Sprite" role="img">
      <defs>
        <radialGradient id="nova-body" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="40%" stopColor="#fde047" />
          <stop offset="80%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#9a3412" />
        </radialGradient>
        <radialGradient id="nova-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fde047" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* glow halo */}
      <circle cx="100" cy="100" r="90" fill="url(#nova-glow)">
        <animate attributeName="r" values="90;100;90" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* star body — 5-pointed */}
      <polygon
        points="100,20 119,80 182,80 130,120 150,182 100,144 50,182 70,120 18,80 81,80"
        fill="url(#nova-body)"
        stroke="#7c2d12"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* face — centered in star */}
      <circle cx="86" cy="100" r="10" fill="white" />
      <circle cx="114" cy="100" r="10" fill="white" />
      <circle cx="88" cy="103" r={mood === "sad" ? 3 : 5} fill="#451a03" />
      <circle cx="116" cy="103" r={mood === "sad" ? 3 : 5} fill="#451a03" />
      <circle cx="90" cy="101" r="1.5" fill="white" />
      <circle cx="118" cy="101" r="1.5" fill="white" />
      {/* blush */}
      <circle cx="78" cy="118" r="6" fill="#fb7185" opacity="0.65" />
      <circle cx="122" cy="118" r="6" fill="#fb7185" opacity="0.65" />
      {/* mouth */}
      {mood === "happy" && <path d="M88 122 Q 100 132, 112 122" stroke="#7c2d12" strokeWidth="3" fill="#fef3c7" strokeLinecap="round" />}
      {mood === "sad" && <path d="M88 128 Q 100 120, 112 128" stroke="#7c2d12" strokeWidth="3" fill="none" strokeLinecap="round" />}
      {mood === "excited" && <ellipse cx="100" cy="125" rx="8" ry="6" fill="#7c2d12" />}
      {/* sparkle dots around */}
      <circle cx="160" cy="40" r="3" fill="white" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="50" r="2" fill="white" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.6s" begin="0.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="170" cy="160" r="2.5" fill="white" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ----- Roar — lion cub hero -----
export function RoarCharacter({ size = 160, className = "", style, mood = "happy" }: CharacterProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-label="Roar the Brave Cub" role="img">
      <defs>
        <radialGradient id="roar-fur" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
        <linearGradient id="roar-mane" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="roar-cape" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>
      {/* cape behind */}
      <path d="M55 110 Q 30 175, 80 175 L 100 130 L 120 175 Q 170 175, 145 110 Z" fill="url(#roar-cape)" stroke="#450a0a" strokeWidth="2.5">
        <animate attributeName="d" values="M55 110 Q 30 175, 80 175 L 100 130 L 120 175 Q 170 175, 145 110 Z;M50 110 Q 25 175, 75 175 L 100 130 L 125 175 Q 175 175, 150 110 Z;M55 110 Q 30 175, 80 175 L 100 130 L 120 175 Q 170 175, 145 110 Z" dur="3s" repeatCount="indefinite" />
      </path>
      {/* mane (spiky) */}
      <g fill="url(#roar-mane)" stroke="#7c2d12" strokeWidth="2">
        <circle cx="100" cy="90" r="58" />
        <polygon points="60,55 70,75 50,85" />
        <polygon points="140,55 130,75 150,85" />
        <polygon points="50,100 65,110 45,120" />
        <polygon points="150,100 135,110 155,120" />
        <polygon points="55,130 75,125 70,150" />
        <polygon points="145,130 125,125 130,150" />
        <polygon points="100,38 88,55 112,55" />
      </g>
      {/* face */}
      <ellipse cx="100" cy="100" rx="42" ry="38" fill="url(#roar-fur)" stroke="#92400e" strokeWidth="2.5" />
      {/* eyes */}
      <ellipse cx="84" cy="92" rx="9" ry={mood === "sad" ? 6 : 11} fill="white" />
      <ellipse cx="116" cy="92" rx="9" ry={mood === "sad" ? 6 : 11} fill="white" />
      <circle cx="84" cy="94" r="5" fill="#1f2937" />
      <circle cx="116" cy="94" r="5" fill="#1f2937" />
      <circle cx="86" cy="92" r="2" fill="white" />
      <circle cx="118" cy="92" r="2" fill="white" />
      {/* nose */}
      <path d="M95 110 L 100 116 L 105 110 Z" fill="#7c2d12" />
      {/* mouth */}
      {mood === "happy" && (
        <path d="M85 122 Q 100 134, 115 122" stroke="#7c2d12" strokeWidth="3" fill="#fda4af" strokeLinecap="round" />
      )}
      {mood === "sad" && (
        <path d="M85 130 Q 100 120, 115 130" stroke="#7c2d12" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {mood === "excited" && (
        <>
          <path d="M82 122 Q 100 142, 118 122" stroke="#7c2d12" strokeWidth="3" fill="#7c2d12" strokeLinecap="round" />
          <path d="M88 124 L 90 132 L 92 124 Z" fill="white" />
          <path d="M108 124 L 110 132 L 112 124 Z" fill="white" />
        </>
      )}
      {/* whiskers */}
      <line x1="60" y1="108" x2="80" y2="112" stroke="#7c2d12" strokeWidth="1.5" />
      <line x1="60" y1="115" x2="80" y2="115" stroke="#7c2d12" strokeWidth="1.5" />
      <line x1="140" y1="108" x2="120" y2="112" stroke="#7c2d12" strokeWidth="1.5" />
      <line x1="140" y1="115" x2="120" y2="115" stroke="#7c2d12" strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="72" cy="62" rx="10" ry="12" fill="#92400e" />
      <ellipse cx="128" cy="62" rx="10" ry="12" fill="#92400e" />
      <ellipse cx="72" cy="64" rx="5" ry="7" fill="#fda4af" />
      <ellipse cx="128" cy="64" rx="5" ry="7" fill="#fda4af" />
    </svg>
  );
}

// ----- Whiskers — fox detective -----
export function WhiskersCharacter({ size = 160, className = "", style, mood = "happy" }: CharacterProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-label="Whiskers the Detective Fox" role="img">
      <defs>
        <linearGradient id="whiskers-fur" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="whiskers-hat" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#365314" />
        </linearGradient>
      </defs>
      {/* body */}
      <ellipse cx="100" cy="135" rx="42" ry="40" fill="url(#whiskers-fur)" stroke="#7c2d12" strokeWidth="2.5" />
      {/* white belly */}
      <ellipse cx="100" cy="150" rx="22" ry="20" fill="#fef3c7" />
      {/* tail */}
      <path d="M138 135 Q 175 125, 170 95 Q 155 100, 150 130" fill="url(#whiskers-fur)" stroke="#7c2d12" strokeWidth="2.5" />
      <path d="M165 102 Q 175 100, 170 95" fill="#fef3c7" stroke="#7c2d12" strokeWidth="2" />
      {/* head */}
      <path d="M65 95 Q 65 55, 100 50 Q 135 55, 135 95 Q 135 115, 100 120 Q 65 115, 65 95 Z" fill="url(#whiskers-fur)" stroke="#7c2d12" strokeWidth="2.5" />
      {/* ears (triangular) */}
      <path d="M65 65 L 55 25 L 80 55 Z" fill="url(#whiskers-fur)" stroke="#7c2d12" strokeWidth="2" />
      <path d="M135 65 L 145 25 L 120 55 Z" fill="url(#whiskers-fur)" stroke="#7c2d12" strokeWidth="2" />
      <path d="M68 55 L 60 32 L 76 50 Z" fill="#fda4af" />
      <path d="M132 55 L 140 32 L 124 50 Z" fill="#fda4af" />
      {/* hat (deerstalker-ish style) */}
      <ellipse cx="100" cy="50" rx="35" ry="6" fill="url(#whiskers-hat)" />
      <path d="M75 50 Q 100 25, 125 50 Z" fill="url(#whiskers-hat)" stroke="#1a2e05" strokeWidth="2" />
      {/* face white snout */}
      <path d="M85 95 Q 100 110, 115 95 Q 110 105, 100 105 Q 90 105, 85 95 Z" fill="#fef3c7" />
      {/* eyes */}
      <ellipse cx="86" cy="80" rx="7" ry={mood === "sad" ? 5 : 9} fill="white" stroke="#7c2d12" strokeWidth="1.5" />
      <ellipse cx="114" cy="80" rx="7" ry={mood === "sad" ? 5 : 9} fill="white" stroke="#7c2d12" strokeWidth="1.5" />
      <circle cx="86" cy="82" r="4" fill="#1f2937" />
      <circle cx="114" cy="82" r="4" fill="#1f2937" />
      <circle cx="88" cy="80" r="1.5" fill="white" />
      <circle cx="116" cy="80" r="1.5" fill="white" />
      {/* nose */}
      <ellipse cx="100" cy="98" rx="5" ry="3.5" fill="#1f2937" />
      {/* mouth */}
      {mood === "happy" && <path d="M92 105 Q 100 113, 108 105" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />}
      {mood === "sad" && <path d="M92 110 Q 100 104, 108 110" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />}
      {mood === "excited" && <ellipse cx="100" cy="108" rx="6" ry="4" fill="#7c2d12" />}
      {/* magnifying glass */}
      <g transform="translate(40 130)">
        <circle cx="0" cy="0" r="14" fill="white" stroke="#1f2937" strokeWidth="3" opacity="0.85" />
        <circle cx="0" cy="0" r="10" fill="#bfdbfe" opacity="0.5" />
        <line x1="10" y1="10" x2="22" y2="22" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ----- Glimmer — rainbow unicorn -----
export function GlimmerCharacter({ size = 160, className = "", style, mood = "happy" }: CharacterProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-label="Glimmer the Rainbow Unicorn" role="img">
      <defs>
        <linearGradient id="glimmer-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <linearGradient id="glimmer-mane" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="33%" stopColor="#fde047" />
          <stop offset="66%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="glimmer-horn" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>
      {/* body */}
      <ellipse cx="100" cy="135" rx="55" ry="38" fill="url(#glimmer-body)" stroke="#86198f" strokeWidth="2.5" />
      {/* legs */}
      <rect x="68" y="155" width="14" height="30" rx="4" fill="url(#glimmer-body)" stroke="#86198f" strokeWidth="2" />
      <rect x="118" y="155" width="14" height="30" rx="4" fill="url(#glimmer-body)" stroke="#86198f" strokeWidth="2" />
      <rect x="68" y="180" width="14" height="6" fill="#a16207" />
      <rect x="118" y="180" width="14" height="6" fill="#a16207" />
      {/* tail (rainbow) */}
      <path d="M150 130 Q 180 130, 175 95 Q 165 110, 155 115 Q 175 80, 165 70" stroke="url(#glimmer-mane)" strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* head */}
      <ellipse cx="80" cy="95" rx="35" ry="32" fill="url(#glimmer-body)" stroke="#86198f" strokeWidth="2.5" />
      {/* mane */}
      <path d="M62 70 Q 50 50, 65 35 Q 80 55, 78 70 Q 92 50, 98 35 Q 100 60, 95 78" stroke="url(#glimmer-mane)" strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* horn */}
      <path d="M75 50 L 82 18 L 88 50 Z" fill="url(#glimmer-horn)" stroke="#a16207" strokeWidth="2">
        <animate attributeName="fill" values="url(#glimmer-horn);#fde047;url(#glimmer-horn)" dur="2s" repeatCount="indefinite" />
      </path>
      <line x1="78" y1="40" x2="84" y2="42" stroke="#a16207" strokeWidth="1" />
      <line x1="78" y1="32" x2="84" y2="34" stroke="#a16207" strokeWidth="1" />
      {/* ear */}
      <ellipse cx="98" cy="65" rx="6" ry="10" fill="url(#glimmer-body)" stroke="#86198f" strokeWidth="2" />
      <ellipse cx="98" cy="67" rx="2.5" ry="6" fill="#fbcfe8" />
      {/* eye */}
      <ellipse cx="80" cy="92" rx="7" ry={mood === "sad" ? 5 : 10} fill="white" stroke="#86198f" strokeWidth="1.5" />
      <circle cx="80" cy="94" r="5" fill="#1f2937" />
      <circle cx="82" cy="92" r="2" fill="white" />
      {/* eyelashes */}
      <line x1="71" y1="83" x2="75" y2="80" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="74" y1="80" x2="76" y2="76" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
      {/* nostril + mouth */}
      <ellipse cx="55" cy="105" rx="3" ry="2" fill="#86198f" />
      {mood === "happy" && <path d="M50 115 Q 60 122, 70 115" stroke="#86198f" strokeWidth="2" fill="none" strokeLinecap="round" />}
      {mood === "sad" && <path d="M50 120 Q 60 113, 70 120" stroke="#86198f" strokeWidth="2" fill="none" strokeLinecap="round" />}
      {mood === "excited" && <path d="M48 112 Q 60 124, 72 112" stroke="#86198f" strokeWidth="2.5" fill="#86198f" strokeLinecap="round" />}
      {/* sparkles */}
      <circle cx="170" cy="50" r="3" fill="white">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="30" cy="55" r="2" fill="white">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" begin="0.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ----- Tinker — frog inventor -----
export function TinkerCharacter({ size = 160, className = "", style, mood = "happy" }: CharacterProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-label="Tinker the Frog Inventor" role="img">
      <defs>
        <radialGradient id="tinker-skin" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="60%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#064e3b" />
        </radialGradient>
      </defs>
      {/* body (squat round) */}
      <ellipse cx="100" cy="130" rx="68" ry="48" fill="url(#tinker-skin)" stroke="#064e3b" strokeWidth="2.5" />
      {/* belly */}
      <ellipse cx="100" cy="145" rx="38" ry="28" fill="#d9f99d" />
      {/* legs */}
      <ellipse cx="55" cy="170" rx="18" ry="9" fill="url(#tinker-skin)" stroke="#064e3b" strokeWidth="2" />
      <ellipse cx="145" cy="170" rx="18" ry="9" fill="url(#tinker-skin)" stroke="#064e3b" strokeWidth="2" />
      {/* arms */}
      <ellipse cx="40" cy="135" rx="14" ry="10" fill="url(#tinker-skin)" stroke="#064e3b" strokeWidth="2" />
      <ellipse cx="160" cy="135" rx="14" ry="10" fill="url(#tinker-skin)" stroke="#064e3b" strokeWidth="2" />
      {/* head — bulging eyes */}
      <ellipse cx="100" cy="80" rx="55" ry="40" fill="url(#tinker-skin)" stroke="#064e3b" strokeWidth="2.5" />
      {/* eye bumps */}
      <circle cx="74" cy="50" r="20" fill="url(#tinker-skin)" stroke="#064e3b" strokeWidth="2.5" />
      <circle cx="126" cy="50" r="20" fill="url(#tinker-skin)" stroke="#064e3b" strokeWidth="2.5" />
      {/* goggles */}
      <circle cx="74" cy="50" r="16" fill="#fef3c7" stroke="#1f2937" strokeWidth="3" />
      <circle cx="126" cy="50" r="16" fill="#fef3c7" stroke="#1f2937" strokeWidth="3" />
      <line x1="90" y1="50" x2="110" y2="50" stroke="#1f2937" strokeWidth="3" />
      <path d="M58 50 Q 50 50, 50 60" stroke="#1f2937" strokeWidth="3" fill="none" />
      <path d="M142 50 Q 150 50, 150 60" stroke="#1f2937" strokeWidth="3" fill="none" />
      {/* eyes through goggles */}
      <circle cx="74" cy="50" r={mood === "sad" ? 4 : 7} fill="#1f2937" />
      <circle cx="126" cy="50" r={mood === "sad" ? 4 : 7} fill="#1f2937" />
      <circle cx="76" cy="48" r="2" fill="white" />
      <circle cx="128" cy="48" r="2" fill="white" />
      {/* mouth */}
      {mood === "happy" && <path d="M75 90 Q 100 105, 125 90" stroke="#064e3b" strokeWidth="3" fill="#fda4af" strokeLinecap="round" />}
      {mood === "sad" && <path d="M75 100 Q 100 90, 125 100" stroke="#064e3b" strokeWidth="3" fill="none" strokeLinecap="round" />}
      {mood === "excited" && <ellipse cx="100" cy="95" rx="20" ry="10" fill="#064e3b" />}
      {/* tongue */}
      {mood === "excited" && <ellipse cx="100" cy="100" rx="12" ry="5" fill="#fb7185" />}
      {/* tool belt */}
      <rect x="60" y="155" width="80" height="10" rx="4" fill="#92400e" stroke="#451a03" strokeWidth="2" />
      <rect x="80" y="158" width="6" height="14" fill="#94a3b8" />
      <rect x="92" y="158" width="6" height="14" fill="#94a3b8" />
      <rect x="104" y="158" width="6" height="14" fill="#94a3b8" />
      <rect x="116" y="158" width="6" height="14" fill="#94a3b8" />
    </svg>
  );
}

// ----- Sage — owl wizard -----
export function SageCharacter({ size = 160, className = "", style, mood = "happy" }: CharacterProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-label="Sage the Wise Owl" role="img">
      <defs>
        <linearGradient id="sage-feathers" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="sage-hat" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
      </defs>
      {/* body */}
      <ellipse cx="100" cy="120" rx="58" ry="60" fill="url(#sage-feathers)" stroke="#475569" strokeWidth="2.5" />
      {/* belly highlight */}
      <ellipse cx="100" cy="135" rx="32" ry="38" fill="#f1f5f9" />
      {/* wings (folded) */}
      <path d="M48 110 Q 50 150, 70 165 Q 60 130, 65 110 Z" fill="url(#sage-feathers)" stroke="#475569" strokeWidth="2" />
      <path d="M152 110 Q 150 150, 130 165 Q 140 130, 135 110 Z" fill="url(#sage-feathers)" stroke="#475569" strokeWidth="2" />
      {/* feet */}
      <path d="M82 178 L 78 185 M 88 180 L 88 188 M 94 180 L 98 187" stroke="#a16207" strokeWidth="3" strokeLinecap="round" />
      <path d="M118 178 L 122 185 M 112 180 L 112 188 M 106 180 L 102 187" stroke="#a16207" strokeWidth="3" strokeLinecap="round" />
      {/* facial disc (heart shape on owls) */}
      <path d="M70 80 Q 70 110, 100 120 Q 130 110, 130 80 Q 130 60, 100 60 Q 70 60, 70 80 Z" fill="#fef9c3" stroke="#78350f" strokeWidth="2" />
      {/* glasses */}
      <circle cx="84" cy="85" r="14" fill="white" stroke="#1f2937" strokeWidth="3" opacity="0.85" />
      <circle cx="116" cy="85" r="14" fill="white" stroke="#1f2937" strokeWidth="3" opacity="0.85" />
      <line x1="98" y1="85" x2="102" y2="85" stroke="#1f2937" strokeWidth="3" />
      {/* eyes */}
      <circle cx="84" cy="85" r={mood === "sad" ? 4 : 7} fill="#1f2937" />
      <circle cx="116" cy="85" r={mood === "sad" ? 4 : 7} fill="#1f2937" />
      <circle cx="86" cy="83" r="2" fill="white" />
      <circle cx="118" cy="83" r="2" fill="white" />
      {/* beak */}
      <path d="M95 100 L 100 115 L 105 100 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
      {/* wizard hat */}
      <path d="M55 50 L 100 0 L 145 50 Z" fill="url(#sage-hat)" stroke="#1e1b4b" strokeWidth="2.5" />
      <ellipse cx="100" cy="50" rx="48" ry="8" fill="url(#sage-hat)" stroke="#1e1b4b" strokeWidth="2.5" />
      {/* hat stars */}
      <text x="100" y="32" textAnchor="middle" fontSize="14" fill="#fde047" fontWeight="900">★</text>
      <text x="80" y="48" textAnchor="middle" fontSize="10" fill="#fde047" fontWeight="900">★</text>
      <text x="120" y="48" textAnchor="middle" fontSize="10" fill="#fde047" fontWeight="900">★</text>
      {/* hat fold */}
      <path d="M75 5 Q 100 -5, 105 12" stroke="#1e1b4b" strokeWidth="2" fill="none" />
    </svg>
  );
}

// ----- Shadow — villain -----
export function ShadowCharacter({ size = 160, className = "", style }: CharacterProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-label="The Shadow" role="img">
      <defs>
        <radialGradient id="shadow-body" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="60%" stopColor="#3b0764" />
          <stop offset="100%" stopColor="#0c0a1a" />
        </radialGradient>
        <radialGradient id="shadow-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="60%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
      </defs>
      {/* wispy body */}
      <path d="M100 30 Q 50 50, 50 100 Q 50 150, 70 175 Q 85 165, 100 175 Q 115 165, 130 175 Q 150 150, 150 100 Q 150 50, 100 30 Z" fill="url(#shadow-body)">
        <animate attributeName="d" values="M100 30 Q 50 50, 50 100 Q 50 150, 70 175 Q 85 165, 100 175 Q 115 165, 130 175 Q 150 150, 150 100 Q 150 50, 100 30 Z;M100 30 Q 45 55, 55 105 Q 50 150, 75 178 Q 88 162, 100 178 Q 112 162, 125 178 Q 150 150, 145 105 Q 155 55, 100 30 Z;M100 30 Q 50 50, 50 100 Q 50 150, 70 175 Q 85 165, 100 175 Q 115 165, 130 175 Q 150 150, 150 100 Q 150 50, 100 30 Z" dur="3s" repeatCount="indefinite" />
      </path>
      {/* horns / spikes */}
      <path d="M70 35 L 60 10 L 80 35 Z" fill="#3b0764" />
      <path d="M130 35 L 140 10 L 120 35 Z" fill="#3b0764" />
      {/* eyes (glowing) */}
      <ellipse cx="80" cy="95" rx="14" ry="12" fill="url(#shadow-eye)">
        <animate attributeName="rx" values="14;16;14" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="120" cy="95" rx="14" ry="12" fill="url(#shadow-eye)">
        <animate attributeName="rx" values="14;16;14" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="80" cy="95" rx="5" ry="9" fill="#1f2937" />
      <ellipse cx="120" cy="95" rx="5" ry="9" fill="#1f2937" />
      {/* mouth (toothy grin) */}
      <path d="M70 130 Q 100 158, 130 130" stroke="#0c0a1a" strokeWidth="3" fill="#0c0a1a" strokeLinecap="round" />
      <path d="M75 132 L 78 144 L 82 132 Z" fill="white" />
      <path d="M88 134 L 90 146 L 94 134 Z" fill="white" />
      <path d="M106 134 L 110 146 L 112 134 Z" fill="white" />
      <path d="M118 132 L 122 144 L 125 132 Z" fill="white" />
      {/* smoke wisps */}
      <circle cx="40" cy="90" r="6" fill="#7c3aed" opacity="0.5">
        <animate attributeName="cy" values="90;70;90" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="100" r="5" fill="#a855f7" opacity="0.5">
        <animate attributeName="cy" values="100;80;100" dur="3s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ----- Lookup helpers -----
export function CharacterById({
  id,
  size,
  className,
  style,
  mood,
}: CharacterProps & { id: CharacterId }) {
  switch (id) {
    case "pixel":
      return <PixelCharacter size={size} className={className} style={style} mood={mood} />;
    case "nova":
      return <NovaCharacter size={size} className={className} style={style} mood={mood} />;
    case "roar":
      return <RoarCharacter size={size} className={className} style={style} mood={mood} />;
    case "whiskers":
      return <WhiskersCharacter size={size} className={className} style={style} mood={mood} />;
    case "glimmer":
      return <GlimmerCharacter size={size} className={className} style={style} mood={mood} />;
    case "tinker":
      return <TinkerCharacter size={size} className={className} style={style} mood={mood} />;
    case "sage":
      return <SageCharacter size={size} className={className} style={style} mood={mood} />;
    case "shadow":
      return <ShadowCharacter size={size} className={className} style={style} />;
  }
}

// Theme backdrop kept simple — gradient layers handled at CSS level.
export function ThemeBackdrop({ theme }: { theme: "troll" | "spider" | "explorer" | "magic" }) {
  const grad =
    theme === "troll"
      ? "linear-gradient(180deg, #fde68a 0%, #f59e0b 100%)"
      : theme === "spider"
        ? "linear-gradient(180deg, #1e3a8a 0%, #831843 100%)"
        : theme === "explorer"
          ? "linear-gradient(180deg, #bae6fd 0%, #34d399 100%)"
          : "linear-gradient(180deg, #fbcfe8 0%, #a78bfa 100%)";
  return (
    <div
      className="absolute inset-x-0 top-0 -z-10 h-64 w-full"
      style={{ background: grad, opacity: 0.4 }}
      aria-hidden
    />
  );
}
