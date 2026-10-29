# JCC Bethel City — Website

Modern Astro site for JCC Bethel City, Athi River. Deploys automatically to Netlify on every push to `main`.

## For the church admin — how to update content

You only need to edit files in `src/data/`. No HTML knowledge required.

### Update service times or Paybill
`src/data/site.json` — change `services` array or `giving.paybill`.

### Add a new sermon
Edit `src/data/sermons.json`. Add a new object inside `sermons` array:
```json
{
  "videoId": "YOUTUBE_ID_HERE",
  "title": "Sermon title",
  "speaker": "Pst. Rodgers Silali",
  "series": null,
  "scripture": "John 3:16",
  "date": "2026-01-15",
  "tags": ["sunday"]
}
Replace YOUTUBE_ID_HERE with the 11-character ID from the YouTube URL (e.g. youtu.be/CxQurstuLpU → CxQurstuLpU).

Add a real event
Edit src/data/events.json — same shape as the sample events. Remove "sample": true once it's real.

TODO_CONFIRM — needs real information
Full street address — src/data/site.json → contact.address

Service end times — currently assumed 3h/2h/2h

YouTube channel ID — for "Subscribe" links

WhatsApp Business link — verify wa.me/254796316316

Real events — replace the 3 sample events in src/data/events.json

Real testimonials — not included (need permission)

web3forms access key — get free at https://web3forms.com and paste into src/data/site.json → forms.web3formsKey

Until web3formsKey is set, forms show a friendly "not yet configured" message and don't send email.

For the developer — local dev
bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
Deploy on Netlify (auto from GitHub)
Push to main on GitHub.

Netlify → "Add new site" → "Import from Git" → pick this repo.

Build command: npm run build (already set in netlify.toml)

Publish directory: dist (already set in netlify.toml)

Save & deploy.

Custom domain: Netlify dashboard → Domain settings → add jccbethelcity.org.

Image optimization
Images in public/images/ are used as-is. For best performance, convert to WebP:

bash
# Install once (Windows: use winget or choco)
# Mac: brew install webp
for f in public/images/*.{jpg,jpeg,png}; do
  [ -f "$f" ] && cwebp -q 82 "$f" -o "${f%.*}.webp"
done
Then update references in src/pages/*.astro to use .webp extension.

Project structure
src/pages/ — one file per URL (index.astro, visit.astro, etc.)

src/layouts/Layout.astro — HTML shell, meta tags, JSON-LD

src/components/ — Header, Footer, MobileTabBar

src/data/ — edit these files to update content

src/styles/global.css — design tokens and styles

src/scripts/main.js — shared JS (copy buttons, forms, drawer, filters)

public/images/ — all photos and logo
