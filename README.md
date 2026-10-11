# linsama.com

Personal project showcase, deployed to Cloudflare Workers Static Assets.

## Source

This is a buildless static site. Edit `dist/index.html` and `dist/style.css` directly.
Images are served from the `linsama-media` Cloudflare R2 bucket through
`https://assets.linsama.com`; advertising authorization is in `dist/ads.txt`.
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

## Images

Keep image files outside this repository. Upload approved images directly to R2,
using a filename with a content hash so each version has a distinct URL:

```sh
npx wrangler r2 object put linsama-media/NAME-HASH.jpg --remote --file /path/to/image.jpg --content-type image/jpeg --cache-control "public, max-age=31536000, immutable"
```

Use `image/png` for PNG files. Verify the public image URL, then update its `src`
in `dist/index.html` and deploy the site. Do not overwrite an existing image URL
or add image binaries to Git. The R2 bucket and its custom domain are independent
of website deployments, so deploying the site does not upload or remove images.

## Languages

`dist/i18n.js` contains Chinese, English and Japanese translations. The HTML keeps
Chinese content as a no-JavaScript fallback. Visitors can choose a language in the
header; the choice is saved locally. New visitors use their first supported browser
language, falling back to English. Update all three dictionaries when changing copy.

## Analytics

`dist/analytics.js` uses GA4 `G-9Y73ECF3MX`, shared with linsama.me. The linker is configured for both domains before the single automatic page view; `site_section=home` distinguishes this site. Project and blog links emit `project_click` with `project_id` and `destination`. Localhost and `?noanalytics` do not load Google. Advertising signals are disabled. Verify the deployed page's collect request and GA Realtime after publishing.
