# Hive

Swarm and routing layer tracked inside `Placebetsai`.

## Files

- `hive/route.js` — single-entry router
- `hive/advisors.js` — advisor roles + backend fallbacks
- `hive/council.js` — parallel multi-advisor synthesis
- `hive/commerce.js` — wrapper over `shopkurt-automation`
- `hive/SENTINEL.md` — Sentinel notes

## Usage

```bash
node hive/route.js "rewrite these 10 titles for Google Shopping"
node hive/route.js "what's trending on TikTok Shop for cheap wedges?" trends
node hive/advisors.js strategist "What is the highest-ROI next move for PlaceBets?"
node hive/council.js "What should the Joffe Federation ship next?"
```

## Env loading

The hive loads keys from:

- `hive/.env`
- `../shopkurt-automation/.env`
- `../shopkurt-site/.env`
- `../ihatecollege/.env`
- `../Ihatecollege/.env`
- `../hiddencameras-tv/.env`

Repo-relative paths are used so this copy works from git, not just from `~/hive`.
