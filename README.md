# linsama.com

Personal project showcase, deployed to Cloudflare Workers Static Assets.

## Source

This is a buildless static site. Edit `dist/index.html` and `dist/style.css` directly.
Images live in `dist/assets/`; advertising authorization is in `dist/ads.txt`.
`dist/` contains maintained source files, not generated build output.

## Development and deployment

```sh
npm ci
npm run dev
npm run check
npm run deploy
```

Deployment requires Cloudflare authentication. `wrangler.jsonc` targets the existing
`linsama-site` deployment at `https://linsama.com`.

## Languages

`dist/i18n.js` contains Chinese, English and Japanese translations. The HTML keeps
Chinese content as a no-JavaScript fallback. Visitors can choose a language in the
header; the choice is saved locally. New visitors use their first supported browser
language, falling back to English. Update all three dictionaries when changing copy.
