# Deploying Phonics Quest

Step-by-step guide to get the game live so anyone can play it from a link.

## Prerequisites

- Node.js 18+ (already installed if you're reading this)
- A free GitHub account
- A free Lovable account (lovable.dev)

## Step 1 — Test it locally first

```bash
cd "Phonics Game and learning application"
npm install
npm run dev
```

Open http://localhost:5173. You should see the Phonics Quest home screen with 15 unlocked quests on day 1. Click around — every quest should open, every button should work, audio should play.

If anything looks wrong, use `npm run build` to surface TypeScript errors before pushing.

## Step 2 — Push to GitHub

```bash
cd "Phonics Game and learning application"
git init
git add .
git commit -m "Phonics Quest — Day 1 release"
git branch -M main
```

Create a new repo at https://github.com/new (e.g. `phonics-quest`). Then:

```bash
git remote add origin https://github.com/<YOUR-USERNAME>/phonics-quest.git
git push -u origin main
```

## Step 3 — Connect Lovable

1. Go to https://lovable.dev and sign in.
2. Click **Import from GitHub** (or **New Project → From GitHub**).
3. Pick your `phonics-quest` repo.
4. Lovable detects Vite + React automatically. Hit **Deploy**.
5. After ~1 minute you get a public URL like `https://phonics-quest-xyz.lovable.app/`.

That's the link you can share with your son or anyone else.

## Step 4 — Daily updates

Every day, add 1–2 new quests:

1. Open `src/data/quests.ts` in your editor.
2. Scroll to the bottom of the `QUESTS` array.
3. Copy any existing quest, change:
   - `id` to something unique
   - `title`, `tagline`, `intro`, `reward`
   - `unlockDay` to today's day number (e.g. `4` if it's day 4)
   - `challenges` — write 10–15 new challenges
4. Commit & push:
   ```bash
   git add src/data/quests.ts
   git commit -m "Day 4: add Hard C/Hard G quest"
   git push
   ```
5. Lovable auto-rebuilds. Within a minute the new quest unlocks for any player who has reached day 4 (or higher) of their streak.

## Backup deployment options

If Lovable is unavailable for any reason, the same repo deploys to:

- **Vercel** — import at https://vercel.com/new. No config needed.
- **Netlify** — drag-and-drop the `dist/` folder after `npm run build`, or connect the repo.
- **Cloudflare Pages** — same as Netlify; just point at the repo.
- **GitHub Pages** — `npm run build`, then push the `dist/` folder to a `gh-pages` branch.

## Troubleshooting

**Audio doesn't play on first click.** That's expected — browsers block audio until the first user gesture. The first click anywhere "primes" audio. Subsequent clicks work normally.

**Voice sounds robotic.** The Web Speech API uses the browser's installed voices. On Mac/iPhone, "Samantha" sounds great. On Windows, "Microsoft Aria" or "Microsoft Jenny" are the most natural. The game auto-picks the best one available.

**Progress disappeared.** Progress is in `localStorage`, so clearing browser data or switching browsers resets it. There's a "Reset progress" button on the home screen for testing.

**A quest reads weird sentences.** Edit `src/data/quests.ts` and push.
