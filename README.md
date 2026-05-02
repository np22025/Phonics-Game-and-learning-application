# Phonics Quest — Original Edition

A daily phonics adventure game for third graders, starring **The Sound Squad** — eight original animated heroes designed for this game. Built with Vite + React + TypeScript + Tailwind + Framer Motion.

This version is publishable anywhere — every character is original creative work. No licensed character images.

## What's inside

- 15 quests on Day 1 covering: CH, SH, CH-vs-SH, TH, WH, PH, silent letters, magic E, vowel teams, R-controlled vowels, diphthongs, sight words, suffixes, compound words, and a 60-second boss battle. ~190 challenges total.
- Per-quest rescue mechanic — each quest stars a Sound Squad member trapped by The Shadow. Correct answers free them.
- 6 challenge formats so gameplay stays fresh: multiple choice, listen-and-pick, sentence-fill, true/false, word sort, boss rapid-fire.
- Inline animated SVG characters — every mascot is a self-contained SVG with multi-stop gradients, expressive faces, and built-in motion (blinking, glowing, drifting). No external image files needed.
- Background mascot animations on the home screen — characters drift and bounce around the page.
- Framer Motion physics throughout — spring entrances, staggered reveals, screen transitions.
- Duolingo-style audio — layered chimes with reverb, soft thuds, triumphant arpeggios. All procedural.
- Speech synthesis pronounces every word.
- localStorage progress: streaks, stars, completed quests persist.
- Daily unlock system — new quests via `unlockDay` field.

## The Sound Squad

| Character | Archetype | Specialty |
|---|---|---|
| Pixel | Robot Scout | CH sounds, compound words |
| Nova | Star Sprite | SH sounds, vowel teams |
| Roar | Brave Lion Cub | TH sounds, suffixes, diphthongs |
| Whiskers | Fox Detective | WH riddles, silent letters |
| Glimmer | Rainbow Unicorn | Magic E |
| Tinker | Frog Inventor | PH sounds, R-controlled vowels |
| Sage | Owl Wizard | Sight words, CH-vs-SH bridge |
| Shadow | The Villain | Final boss |

All eight characters are original creative work, drawn as inline SVG with built-in animations. You can override any of them with your own image by dropping a PNG/JPG into `public/characters/<id>.png` — the game checks for those files first and falls back to the SVG.

## Quickstart

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build into ./dist
npm run preview
```

## Add a new quest each day

1. Open `src/data/quests.ts`
2. Copy any quest object, update `id`, `title`, `tagline`, `intro`, `reward`, `rescueCharacter`, `unlockDay`, and `challenges`
3. Commit & push — Vercel/Lovable rebuilds automatically

See `CHARACTERS.md` for the character roster and how to swap in custom art.

## Deployment

This version is safe to deploy publicly anywhere — Lovable, Vercel, Netlify, Cloudflare Pages, GitHub Pages.

```bash
git init
git add .
git commit -m "Initial commit: Phonics Quest Original"
git branch -M main
git remote add origin https://github.com/<your-username>/phonics-quest-original.git
git push -u origin main
```

Then import the repo at https://vercel.com/new — Vercel auto-detects Vite. No config needed.

## Cleanup before first push

If this folder was created by copying the previous version, you'll need to delete a few leftover files in Finder before pushing to GitHub:

- Delete the `.git/` folder (if present) — this folder needs a fresh git history
- Delete any `.jpg` / `.jpeg` files inside `public/characters/` (these were assets from the private version and aren't used here)
- Delete `public/characters/_extras/` if present
- Delete `.DS_Store` files (Finder's hidden metadata)

Then run `git init` from a fresh shell and proceed with the deployment steps above.

## License

MIT — original creative work, free to use and adapt.
