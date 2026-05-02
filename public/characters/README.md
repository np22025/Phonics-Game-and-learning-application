# Character Assets

The game looks for these exact filenames in this folder:

| Slot | Status | Source |
|---|---|---|
| `chase.jpg` | ✅ Ready | Chase close-up portrait |
| `skye.jpg` | ✅ Ready | Skye circular pink-helmet headshot |
| `rubble.jpg` | ✅ Ready | Rubble with jackhammer |
| `everest.jpg` | ✅ Ready | Everest with snowmobile |
| `blippi.jpg` | ✅ Ready | Blippi standing pose |
| `marshall.jpg` | ❌ Missing | Need: dalmatian fire pup with red helmet |
| `rocky.jpg` | ❌ Missing | Need: gray-green recycle pup |
| `trollgar.jpg` | ❌ Missing | Need: a villain (or use SVG fallback) |

The 3 missing ones will fall back to original SVG mascots — nothing breaks.

## Alternates

If you want to swap any primary slot, just rename one of these:

- `blippi-alt-1.jpg` — Blippi pointing with logo
- `blippi-alt-2.jpg` — Blippi at night
- `blippi-alt-3.jpg` — Blippi with cupcakes
- `chase-alt-action.jpg` — Chase running with megaphone
- `chase-alt-mighty.jpg` — Mighty Pups Chase

To use an alternate, e.g.:
```
mv blippi-alt-2.jpg blippi.jpg     # overwrites primary
```

## Group photos

The 4 PAW Patrol team group photos are in `_extras/`. They're not used as character avatars (the game wants single-character images per slot), but they're saved there in case you want to use them as splash screens or backgrounds later.

## Image guidelines

- **Format:** JPG works. PNG with transparent background looks best in-game.
- **Size:** Anything 200×200 or larger; the game scales down.
- **Aspect:** Roughly square is best (the game renders inside a square slot).

## Cleanup needed

The originals (`download (1).jpeg`, `images.jpeg`, etc.) are still in this folder because the sandbox couldn't delete them. **Just delete them in Finder on your Mac** — they're duplicates of the renamed copies.

## Important: licensing

PAW Patrol is © Spin Master / Nickelodeon. Blippi is © Moonbug Entertainment. Using their art in a publicly-deployed app is a copyright issue. For private family deployment shared only with family via direct link, the practical risk is low. For public/indexed deployment, replace these with original art.
