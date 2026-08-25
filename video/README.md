# Current — persona explainer videos (Remotion)

Produces the five 30s per-persona hook clips (marketing / ops / hr / sales /
finance) shown before each drop. These are our own assets — uploaded to the
project's YouTube channel and referenced by id in `../lib/content.js`
(`VIDEO_BY_JOB`).

## Setup
```bash
cd video
npm install
node generate_music.js   # writes public/ambient.wav (gitignored, regenerable)
```

## Preview / render
```bash
npm run studio                                   # interactive preview
npx remotion render src/index.jsx marketing out/marketing.mp4
# ids: marketing | ops | hr | sales | finance
```

## Structure
- `src/data.js` — per-persona script (role, problem, prompt, outputs, proof) + shared CTA.
- `src/PersonaExplainer.jsx` — the composition (obsidian+amber, 900 frames @ 30fps = 30s).
- `src/Root.jsx` — registers one composition per persona.
- `generate_music.js` — synthesizes the low-key ambient bed (no external assets/keys).

`node_modules/`, `out/`, and `public/ambient.wav` are gitignored (regenerable).
