// Character roster and asset slots.
//
// Each character is an asset slot — the game loads the image from
// /public/characters/<file>. If the file is missing, an inline SVG fallback
// renders so the game always works.
//
// To use real PAW Patrol / Blippi art, drop your own images into
//   public/characters/
// using these exact filenames (PNG with transparent background works best):
//
//   chase.png      (police pup)
//   skye.png       (sky/flying pup)
//   marshall.png   (fire pup)
//   rubble.png     (builder pup)
//   everest.png    (snow husky)
//   rocky.png      (recycle/eco pup)
//   blippi.png     (explorer host)
//   trollgar.png   (boss villain)
//
// See CHARACTERS.md for full instructions.

export type CharacterId =
  | "chase"
  | "skye"
  | "marshall"
  | "rubble"
  | "everest"
  | "rocky"
  | "blippi"
  | "trollgar";

export interface CharacterDef {
  id: CharacterId;
  displayName: string;
  shortName: string;
  // Tagline shown when this character is being rescued.
  tagline: string;
  // Color used for accents when this character appears.
  accentColor: string;
  accentColorDark: string;
  // The "trapped" visual style for the rescue mechanic.
  rescueScenario: "cage" | "cliff" | "frozen" | "tangled" | "trapped-in-bubble" | "stuck-in-mud";
  // Spoken intro when rescue starts.
  rescueLine: string;
  // Spoken cheer when rescue completes.
  rescueCheer: string;
}

export const CHARACTERS: Record<CharacterId, CharacterDef> = {
  chase: {
    id: "chase",
    displayName: "Chase the Police Pup",
    shortName: "Chase",
    tagline: "Top cop on the case! Help him crack the CH code.",
    accentColor: "#3b82f6",
    accentColorDark: "#1e3a8a",
    rescueScenario: "cage",
    rescueLine: "Chase is locked in Trollgar's cage! Spell your way out.",
    rescueCheer: "Chase is on the case! Woo-hoo!",
  },
  skye: {
    id: "skye",
    displayName: "Skye the Flying Pup",
    shortName: "Skye",
    tagline: "Wings out, ready for adventure! Lift Skye up with each correct answer.",
    accentColor: "#ec4899",
    accentColorDark: "#9d174d",
    rescueScenario: "cliff",
    rescueLine: "Skye is hanging from a cliff! Each right answer pulls her up.",
    rescueCheer: "Yip yip yippee! Skye is safe!",
  },
  marshall: {
    id: "marshall",
    displayName: "Marshall the Fire Pup",
    shortName: "Marshall",
    tagline: "Fire pup needs you! Spray water with every correct answer.",
    accentColor: "#ef4444",
    accentColorDark: "#7f1d1d",
    rescueScenario: "trapped-in-bubble",
    rescueLine: "Marshall is trapped in a giant bubble! Pop it with phonics!",
    rescueCheer: "I'm fired up! Thanks Manas!",
  },
  rubble: {
    id: "rubble",
    displayName: "Rubble the Builder Pup",
    shortName: "Rubble",
    tagline: "Builder on the double! Help dig him out.",
    accentColor: "#f59e0b",
    accentColorDark: "#92400e",
    rescueScenario: "stuck-in-mud",
    rescueLine: "Rubble is stuck in mud! Pull him out with right answers.",
    rescueCheer: "Rubble on the double! Free at last!",
  },
  everest: {
    id: "everest",
    displayName: "Everest the Snow Husky",
    shortName: "Everest",
    tagline: "Frozen in ice — melt her free with phonics fire!",
    accentColor: "#60a5fa",
    accentColorDark: "#1e40af",
    rescueScenario: "frozen",
    rescueLine: "Everest is frozen solid! Each correct answer melts a chunk of ice.",
    rescueCheer: "Ice or snow, I'm ready to go!",
  },
  rocky: {
    id: "rocky",
    displayName: "Rocky the Recycle Pup",
    shortName: "Rocky",
    tagline: "Tangled in tape and trash. Untangle him!",
    accentColor: "#10b981",
    accentColorDark: "#064e3b",
    rescueScenario: "tangled",
    rescueLine: "Rocky is all tangled up! Each correct answer cuts a knot.",
    rescueCheer: "Don't lose it, reuse it! Thanks Manas!",
  },
  blippi: {
    id: "blippi",
    displayName: "Blippi the Explorer",
    shortName: "Blippi",
    tagline: "Curious explorer needs your phonics smarts!",
    accentColor: "#f59e0b",
    accentColorDark: "#7c2d12",
    rescueScenario: "trapped-in-bubble",
    rescueLine: "Blippi got stuck in the Phonics Maze! Lead him out.",
    rescueCheer: "So much fun! Great work, Manas!",
  },
  trollgar: {
    id: "trollgar",
    displayName: "Trollgar the Boss",
    shortName: "Trollgar",
    tagline: "The villain of every phonics tale.",
    accentColor: "#7c2d12",
    accentColorDark: "#451a03",
    rescueScenario: "cage",
    rescueLine: "Trollgar approaches!",
    rescueCheer: "Defeated!",
  },
};

// Filename used in /public/characters/<file>
export function characterAssetPath(id: CharacterId): string {
  // Vite serves /public at the site root.
  return `${import.meta.env.BASE_URL}characters/${id}.png`;
}

// JPG fallback path so users can drop either format.
export function characterAssetPathJpg(id: CharacterId): string {
  return `${import.meta.env.BASE_URL}characters/${id}.jpg`;
}
