# Adding character images

The game has 15 day-1 quests, each starring one rescued character. The art for those characters lives in `public/characters/`. Drop your own images in this folder and the game uses them automatically.

## Where to put files

```
public/
  characters/
    chase.png
    skye.png
    marshall.png
    rubble.png
    everest.png
    rocky.png
    blippi.png
    trollgar.png
```

PNG (transparent background) works best. JPG is also accepted as a fallback. Recommended size: 512×512 or larger.

## Which character appears in which quest

| Character | Quests they star in |
|---|---|
| **Chase** (police pup) | The Cheese Cave Rescue (CH), Sight Word Vault, Suffix Stadium |
| **Skye** (sky pup) | SH-City Cliff Rescue, Vowel Team Voyage, Diphthong Dunes |
| **Marshall** (fire pup) | PH-Town Bubble |
| **Rubble** (builder pup) | Magic E Mountain, Compound Carnival |
| **Everest** (snow husky) | R-Controlled Rainforest |
| **Rocky** (recycle pup) | TH Forest, Silent Library |
| **Blippi** (explorer host) | Echo Bridge (CH vs SH), WH-Sphinx |
| **Trollgar** (boss) | Final Boss Battle |

## How the rescue mechanic works

1. Each quest opens with the character "trapped" — in a cage, on a cliff, frozen in ice, stuck in mud, etc.
2. Every correct answer reduces the trapped overlay by one step.
3. Reach 90%+ correct → character is fully rescued, sparkles + cheer voice line + 3 stars.
4. 70-89% → 2 stars, character is freed.
5. 45-69% → 1 star, partial rescue.
6. Below that → "keep going!" — replay the quest.

## Fallbacks

If a file is missing, the game shows an inline SVG mascot — nothing breaks. So you can add images one at a time.

## Important: deployment & licensing

These character images are loaded from your public deploy URL. If you publish your game with a public link (Lovable / Vercel / Netlify), the images become publicly accessible.

PAW Patrol is © Spin Master Entertainment / Nickelodeon. Blippi is © Moonbug Entertainment. Using their art in a publicly-accessible app is a copyright issue.

For private family deployment (URL only shared with family, not posted publicly):

- Make sure your Vercel/Netlify project is set to *not* be indexed by search engines (Settings → Privacy)
- Don't share the link in public posts or social media
- The risk is real but practically low for a one-family deployment

For a fully bulletproof public version:

- Replace these files with original art (commission an artist, or use AI-generated original characters)
- Or use the SVG mascots that ship with the app (they're original creative work)
