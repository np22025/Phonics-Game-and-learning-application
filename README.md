# Phonics Quest

A daily phonics adventure game for third graders — themed around grumpy trolls, a friendly web-slinger, and a curious explorer. Built with Vite + React + TypeScript + Tailwind, ready to deploy on Lovable, Vercel, Netlify, or GitHub Pages.

## What's inside

- 15 quests on Day 1 covering: CH, SH, CH-vs-SH, TH, WH, PH, silent letters, magic E, vowel teams, R-controlled vowels, diphthongs, sight words, suffixes, compound words, and a 60-second boss battle. ~150 challenges total.
- 6 challenge formats (multiple choice, listen-and-pick, sentence-fill, true/false, word sort, boss rapid-fire) so gameplay never feels repetitive.
- Speech synthesis pronounces every word using the Web Speech API.
- Procedural sound effects via Web Audio API (no external audio files).
- localStorage progress: streaks, stars, completed quests persist across visits.
- Daily unlock system — quests have an `unlockDay` so you can ship 1–2 new quests every day.
- Custom SVG mascots inspired by Poppy Playtime, Spider-Man, and Blippi (originals — no copyrighted art).

## Quickstart

```bash
npm install
npm run dev          # runs at http://localhost:5173
npm run build        # production build into ./dist
npm run preview      # preview the production build
```

## Adding a new quest each day

1. Open `src/data/quests.ts`.
2. Copy any existing quest object and update:
   - `id` — unique kebab-case
   - `title`, `tagline`, `intro`, `reward`
   - `theme` — `troll` / `spider` / `explorer` / `magic`
   - `hero` — `troll` / `spider` / `explorer` / `blippo`
   - `unlockDay` — Day N after first session that this quest unlocks
   - `challenges` — list of challenge objects
3. Commit and push to GitHub. Lovable will rebuild automatically.

### Challenge types

- `multiple-choice` — pick one of 2–4 word options.
- `listen-and-pick` — hear a spoken word, choose the correct spelling.
- `word-sort` — tap-to-place words into labeled buckets.
- `sentence-fill` — fill in the blank in a sentence.
- `true-false` — true or false with optional speak prompt.
- `boss-rapid` — 60-second timed rapid-fire round (boss battle).

See `src/types.ts` for the exact field shapes.

## Deploy to Lovable via GitHub

1. **Push to GitHub** — create a new repo and push this folder.
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Phonics Quest"
   git branch -M main
   git remote add origin https://github.com/<your-username>/phonics-quest.git
   git push -u origin main
   ```
2. **Import to Lovable** — sign in to [lovable.dev](https://lovable.dev), click "Import from GitHub", and pick the repo. Lovable detects Vite + React automatically.
3. **Publish** — Lovable gives you a public URL. Share that with anyone.
4. **Daily updates** — edit `src/data/quests.ts`, commit, push. Lovable rebuilds automatically.

### Alternative: deploy to Netlify or Vercel

Both auto-detect Vite. After pushing to GitHub:
- **Vercel:** import the repo at [vercel.com/new](https://vercel.com/new). Default settings work.
- **Netlify:** import at [app.netlify.com](https://app.netlify.com). Build command: `npm run build`, publish directory: `dist`.

### GitHub Pages

The Vite config uses `base: "./"` so the `dist/` output works under any subpath. After `npm run build`, push the `dist/` folder to the `gh-pages` branch (or use the `gh-pages` npm package).

## Tested on

- Latest Chrome, Edge, Safari (desktop + iOS), Firefox.
- Tablets and phones (responsive layout, large tap targets).
- Audio "primes" on the first user click so iOS Safari speech works.

## Customizing

- **Colors / theme:** `tailwind.config.js` has color palettes per character.
- **Animations:** `tailwind.config.js` keyframes + `src/index.css`.
- **Mascots:** `src/components/Characters.tsx` — replace any SVG with your own.
- **Voice:** `src/lib/audio.ts` `pickVoice()` — update preferred voice patterns.
- **Star thresholds:** `src/components/QuestPlayer.tsx` — adjust the ratio mapping.

## License

MIT — use it freely.
