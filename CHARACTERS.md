# The Sound Squad — Character Guide

This game ships with eight original characters drawn as inline SVG. They animate by default (gentle bobs, glows, sparkle trails) and respond to gameplay (cheer on correct, slump on wrong).

## The roster

| ID | Name | Archetype | Accent color |
|---|---|---|---|
| `pixel` | Pixel the Sky Scout | Pocket-sized robot with antennae and jet boots | Sky blue |
| `nova` | Nova the Star Sprite | Glowing five-pointed star with a tiny face | Pink/gold |
| `roar` | Roar the Brave Cub | Tiny lion with a flowing red cape | Orange |
| `whiskers` | Whiskers the Detective Fox | Red fox with a deerstalker hat and magnifying glass | Orange-red |
| `glimmer` | Glimmer the Rainbow Unicorn | Pink unicorn with rainbow mane and glowing horn | Purple/pink |
| `tinker` | Tinker the Frog Inventor | Green frog with goggles and a tool belt | Green |
| `sage` | Sage the Wise Owl | White owl wizard with starry hat and glasses | Indigo |
| `shadow` | The Shadow | Mischievous shadow creature villain | Deep purple |

## Optional: replace any character with your own art

The default SVGs already work great, but you can swap any character for your own image (commissioned art, AI-generated, photo, anything). Drop the file here:

```
public/characters/
  pixel.png    ← optional
  nova.png     ← optional
  roar.png     ← optional
  whiskers.png ← optional
  glimmer.png  ← optional
  tinker.png   ← optional
  sage.png     ← optional
  shadow.png   ← optional
```

The game tries `.png` first, then `.jpg`, then falls back to the SVG. You can mix and match — keep some as SVG, swap others.

Recommended size: 512×512 with transparent background.

## How the rescue mechanic works

Each quest stars one Sound Squad member trapped by The Shadow:

- The character appears at the top of the quest screen with a "trapped" overlay (cage, cliff, ice, mud, soap-bubble, or thorn-vines)
- Each correct answer reduces the trapped overlay by one step
- Reach 90%+ correct → character is fully rescued, sparkle burst, three stars, voice-line cheer
- 70-89% → 2 stars, character freed
- 45-69% → 1 star, partial rescue
- Below that → the character stays trapped — replay the quest

## Adding a brand-new character

1. Open `src/data/characters.ts` and add a new entry to the `CharacterId` type and `CHARACTERS` record
2. Open `src/components/Characters.tsx` and add a new SVG component for them
3. Update `CharacterById` switch to include the new ID
4. Reference the new character in any quest's `rescueCharacter` field

## Why these designs are deliberately original

This version of the game is the "publishable anywhere" version — every character archetype (robot, star, lion, fox, unicorn, frog, owl, shadow) is a generic concept used in countless original works, drawn here as a from-scratch SVG. There is a separate private version of the game with licensed-character images for personal-only use; this codebase keeps those two completely separate.
