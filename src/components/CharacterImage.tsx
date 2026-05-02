import { useState } from "react";
import { motion } from "framer-motion";
import { type CharacterId, characterAssetPath, characterAssetPathJpg } from "../data/characters";
import { CharacterById } from "./Characters";

interface Props {
  characterId: CharacterId;
  size?: number;
  className?: string;
  // If true, the character animates in with a bouncy spring.
  animate?: boolean;
  // Optional motion key to retrigger animations when changed.
  motionKey?: string | number;
  // Mood for SVG fallback expression.
  mood?: "happy" | "sad" | "excited";
}

// Tries /public/characters/<id>.png, then .jpg, then falls back to the
// inline SVG mascot. The SVGs are the default — drop in your own image
// only if you want to replace one.
export function CharacterImage({
  characterId,
  size = 160,
  className = "",
  animate = true,
  motionKey,
  mood = "happy",
}: Props) {
  const [errorCount, setErrorCount] = useState(0);

  const sources = [characterAssetPath(characterId), characterAssetPathJpg(characterId)];
  const useFallback = errorCount >= sources.length;
  const src = errorCount < sources.length ? sources[errorCount] : null;

  const Inner = (
    <>
      {!useFallback && src && (
        <img
          src={src}
          alt={characterId}
          width={size}
          height={size}
          draggable={false}
          onError={() => setErrorCount((c) => c + 1)}
          style={{
            width: size,
            height: size,
            objectFit: "contain",
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))",
          }}
        />
      )}
      {useFallback && <CharacterById id={characterId} size={size} mood={mood} />}
    </>
  );

  if (!animate) {
    return <div className={className}>{Inner}</div>;
  }

  return (
    <motion.div
      key={motionKey}
      className={className}
      initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {Inner}
    </motion.div>
  );
}
