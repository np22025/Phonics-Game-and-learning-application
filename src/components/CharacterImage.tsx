import { useState } from "react";
import { motion } from "framer-motion";
import { type CharacterId, characterAssetPath, characterAssetPathJpg } from "../data/characters";
import { TrollCharacter, SpiderCharacter, ExplorerCharacter, BlippoCharacter } from "./Characters";

interface Props {
  characterId: CharacterId;
  size?: number;
  className?: string;
  // If true, the character animates in with a bouncy spring.
  animate?: boolean;
  // Optional motion key to retrigger animations when changed.
  motionKey?: string | number;
}

// Loads /public/characters/<id>.png. Falls back to .jpg, then to an inline
// SVG mascot so the game always renders.
export function CharacterImage({ characterId, size = 160, className = "", animate = true, motionKey }: Props) {
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
      {useFallback && <FallbackMascot characterId={characterId} size={size} />}
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

// Map each PAW Patrol-style character to a sensible SVG fallback so the
// game still works before the user drops in their own images.
function FallbackMascot({ characterId, size }: { characterId: CharacterId; size: number }) {
  switch (characterId) {
    case "chase":
    case "rubble":
    case "marshall":
      // Use spider/troll fallback for high-energy hero pups
      return <SpiderCharacter size={size} />;
    case "skye":
    case "everest":
    case "rocky":
      return <BlippoCharacter size={size} />;
    case "blippi":
      return <ExplorerCharacter size={size} />;
    case "trollgar":
      return <TrollCharacter size={size} />;
    default:
      return <BlippoCharacter size={size} />;
  }
}
