import { motion, AnimatePresence } from "framer-motion";
import { CHARACTERS, type CharacterId, type CharacterDef } from "../data/characters";
import { CharacterImage } from "./CharacterImage";

interface Props {
  characterId: CharacterId;
  // 0..1
  progress: number;
  rescued: boolean;
}

// Visual rescue indicator. Shows the character at the top of the quest with
// a "trapped" overlay that recedes as progress increases.
export function RescueProgress({ characterId, progress, rescued }: Props) {
  const def = CHARACTERS[characterId];
  const pct = Math.max(0, Math.min(1, progress));

  return (
    <div className="flex w-full max-w-2xl items-center gap-4 rounded-3xl glass-strong p-4 sm:p-5">
      {/* Character avatar with trapped scenario overlay */}
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
        <motion.div
          animate={
            rescued
              ? { rotate: [0, -8, 8, -6, 6, 0], y: [-8, 0] }
              : { y: [0, -3, 0] }
          }
          transition={
            rescued
              ? { duration: 0.8 }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <CharacterImage
            characterId={characterId}
            size={104}
            animate={false}
          />
        </motion.div>

        {/* Trapped overlay - removed as progress grows */}
        {!rescued && <TrappedOverlay scenario={def.rescueScenario} progress={pct} />}

        {/* Rescue sparkles when rescued */}
        <AnimatePresence>
          {rescued && (
            <>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.4, 0],
                    x: Math.cos((i / 6) * Math.PI * 2) * 60,
                    y: Math.sin((i / 6) * Math.PI * 2) * 60,
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.2, delay: i * 0.06 }}
                  className="absolute text-3xl"
                  exit={{ opacity: 0 }}
                >
                  ✨
                </motion.span>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar + label */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-extrabold text-white sm:text-lg">
            {rescued ? `✓ ${def.shortName} is safe!` : `Rescue ${def.shortName}`}
          </span>
          <span className="text-sm font-bold text-white/75">{Math.round(pct * 100)}%</span>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${def.accentColor}, white)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          {/* shimmer */}
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
        <p className="text-xs text-white/70 sm:text-sm">{def.rescueLine}</p>
      </div>
    </div>
  );
}

function TrappedOverlay({
  scenario,
  progress,
}: {
  scenario: CharacterDef["rescueScenario"];
  progress: number;
}) {
  const opacity = Math.max(0, 0.85 - progress * 0.85);
  if (scenario === "cage") {
    return (
      <svg
        viewBox="0 0 100 100"
        width="104"
        height="104"
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <g stroke="#1f2937" strokeWidth="3" strokeLinecap="round">
          <line x1="20" y1="10" x2="20" y2="90" />
          <line x1="40" y1="10" x2="40" y2="90" />
          <line x1="60" y1="10" x2="60" y2="90" />
          <line x1="80" y1="10" x2="80" y2="90" />
          <line x1="10" y1="10" x2="90" y2="10" />
          <line x1="10" y1="90" x2="90" y2="90" />
        </g>
      </svg>
    );
  }
  if (scenario === "frozen") {
    return (
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(186,230,253,0.85) 0%, rgba(125,211,252,0.6) 100%)",
          backdropFilter: "blur(2px)",
          opacity,
          mask: "radial-gradient(circle, black 60%, transparent 100%)",
          WebkitMask: "radial-gradient(circle, black 60%, transparent 100%)",
        }}
      />
    );
  }
  if (scenario === "tangled") {
    return (
      <svg viewBox="0 0 100 100" width="104" height="104" className="absolute inset-0 pointer-events-none" style={{ opacity }}>
        <g stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M10 30 Q 50 60, 90 25" />
          <path d="M15 70 Q 50 40, 85 75" />
          <path d="M20 50 Q 50 80, 90 45" />
          <path d="M0 60 Q 50 20, 100 65" />
        </g>
      </svg>
    );
  }
  if (scenario === "trapped-in-bubble") {
    return (
      <div
        className="absolute inset-0 rounded-full border-4"
        style={{
          opacity,
          borderColor: "rgba(255,255,255,0.7)",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 70%)",
          boxShadow: "inset 0 0 30px rgba(255,255,255,0.4)",
        }}
      />
    );
  }
  if (scenario === "stuck-in-mud") {
    return (
      <div
        className="absolute bottom-0 left-0 right-0 rounded-b-full"
        style={{
          height: `${50 - progress * 40}%`,
          background: "linear-gradient(to bottom, #92400e 0%, #451a03 100%)",
          opacity,
        }}
      />
    );
  }
  // cliff: hand from above pulling rope
  return (
    <svg viewBox="0 0 100 100" width="104" height="104" className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <line x1="50" y1="0" x2="50" y2={20 + progress * 30} stroke="#a16207" strokeWidth="3" />
    </svg>
  );
}
