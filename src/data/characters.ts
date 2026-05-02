// =============================================================================
// THE SOUND SQUAD — original character roster
// =============================================================================
// All characters are 100% original creative work designed for this game.
// They are rendered as inline SVG (no external image files needed). You can
// optionally drop in your own PNG/JPG art in public/characters/ to override
// the default SVGs — the game checks for those files first.
// =============================================================================

export type CharacterId =
  | "pixel"
  | "nova"
  | "roar"
  | "whiskers"
  | "glimmer"
  | "tinker"
  | "sage"
  | "shadow";

export interface CharacterDef {
  id: CharacterId;
  displayName: string;
  shortName: string;
  // Species/concept tagline.
  archetype: string;
  // Character motto shown when they arrive.
  catchphrase: string;
  // Used as the rescue tagline on a quest card.
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
  pixel: {
    id: "pixel",
    displayName: "Pixel the Sky Scout",
    shortName: "Pixel",
    archetype: "Robot Scout",
    catchphrase: "Ready to scan!",
    tagline: "A pocket-sized blue robot scout. His sensors lock onto every CH sound.",
    accentColor: "#38bdf8",
    accentColorDark: "#0c4a6e",
    rescueScenario: "trapped-in-bubble",
    rescueLine: "Pixel is trapped in a glitch-bubble! Each CH word frees a circuit.",
    rescueCheer: "Systems online! Thanks Manas!",
  },
  nova: {
    id: "nova",
    displayName: "Nova the Star Sprite",
    shortName: "Nova",
    archetype: "Star Sprite",
    catchphrase: "Sparkle on!",
    tagline: "A glowing star-shaped sprite. She lights up every SH sound.",
    accentColor: "#ec4899",
    accentColorDark: "#831843",
    rescueScenario: "cliff",
    rescueLine: "Nova has dimmed and is falling from the sky! SH words make her shine.",
    rescueCheer: "Twinkle, twinkle, you saved me!",
  },
  roar: {
    id: "roar",
    displayName: "Roar the Brave Cub",
    shortName: "Roar",
    archetype: "Lion Cub Hero",
    catchphrase: "Roaaaarr!",
    tagline: "A tiny lion with a big heart. He charges through TH words.",
    accentColor: "#f59e0b",
    accentColorDark: "#78350f",
    rescueScenario: "cage",
    rescueLine: "Roar is in a thorn-cage! TH words snap each thorn.",
    rescueCheer: "Roaaarr! I'm free, friend!",
  },
  whiskers: {
    id: "whiskers",
    displayName: "Whiskers the Detective Fox",
    shortName: "Whiskers",
    archetype: "Fox Detective",
    catchphrase: "Case closed!",
    tagline: "A clever red fox with a magnifying glass. She solves WH riddles.",
    accentColor: "#f97316",
    accentColorDark: "#9a3412",
    rescueScenario: "tangled",
    rescueLine: "Whiskers got tangled in her own clue-strings! Solve to untangle her.",
    rescueCheer: "Case closed! Brilliant work!",
  },
  glimmer: {
    id: "glimmer",
    displayName: "Glimmer the Rainbow Unicorn",
    shortName: "Glimmer",
    archetype: "Unicorn",
    catchphrase: "Sparkle gallop!",
    tagline: "A pink unicorn with a rainbow mane. Her horn glows for magic E.",
    accentColor: "#a855f7",
    accentColorDark: "#581c87",
    rescueScenario: "frozen",
    rescueLine: "Glimmer's horn is frozen! Magic E words melt the ice.",
    rescueCheer: "Sparkle gallop! Thank you!",
  },
  tinker: {
    id: "tinker",
    displayName: "Tinker the Frog Inventor",
    shortName: "Tinker",
    archetype: "Frog Inventor",
    catchphrase: "Tinker time!",
    tagline: "A green frog with goggles and gadgets. He tinkers with vowel teams.",
    accentColor: "#10b981",
    accentColorDark: "#064e3b",
    rescueScenario: "stuck-in-mud",
    rescueLine: "Tinker fell into the swamp! Pull him out with vowel-team words.",
    rescueCheer: "Tinker time! Saved the day!",
  },
  sage: {
    id: "sage",
    displayName: "Sage the Wise Owl",
    shortName: "Sage",
    archetype: "Owl Wizard",
    catchphrase: "By the book!",
    tagline: "A white owl wizard with a starry hat. He guards the sight-word vault.",
    accentColor: "#6366f1",
    accentColorDark: "#312e81",
    rescueScenario: "cage",
    rescueLine: "Sage is locked in his own spellbook! Sight words break the seal.",
    rescueCheer: "Well done, young scholar!",
  },
  shadow: {
    id: "shadow",
    displayName: "The Shadow",
    shortName: "Shadow",
    archetype: "Mischievous Shadow",
    catchphrase: "You can't catch me...",
    tagline: "A sneaky shadow creature who steals letters and locks them away.",
    accentColor: "#7c3aed",
    accentColorDark: "#3b0764",
    rescueScenario: "cage",
    rescueLine: "The Shadow appears!",
    rescueCheer: "Defeated!",
  },
};

// Filename used in /public/characters/<file> if the user wants to override
// any character with a custom image.
export function characterAssetPath(id: CharacterId): string {
  return `${import.meta.env.BASE_URL}characters/${id}.png`;
}
export function characterAssetPathJpg(id: CharacterId): string {
  return `${import.meta.env.BASE_URL}characters/${id}.jpg`;
}
