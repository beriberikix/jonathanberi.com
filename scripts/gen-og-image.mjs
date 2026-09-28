// One-off social share card generator. Run: node scripts/gen-og-image.mjs
// Produces public/img/og-card.jpg (1200x630) used for og:image / twitter:image.
// Re-run when the name, kicker, tagline, or headshot changes.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

// Kept in sync with src/data/profile.ts and the dark theme in global.css.
const NAME = 'Jonathan Beri';
const KICKER = 'PRODUCT & STRATEGY EXECUTIVE';
const TAGLINE = ['I help companies connect', 'sand to the internet.'];
const FOCUS = 'Edge AI · Physical AI · Edge Computing';
const C = { bg: '#101316', tint: '#161a1d', ink: '#e9edea', soft: '#a4adac', faint: '#6e7876', accent: '#34c08e' };

const W = 1200;
const H = 630;
const PHOTO = 360;
const PX = W - PHOTO - 80;
const PY = (H - PHOTO) / 2;

// Faint dot grid, echoing the hero's signal field.
const dots = [];
for (let x = 40; x < W; x += 40) {
  for (let y = 40; y < H; y += 40) dots.push(`<circle cx="${x}" cy="${y}" r="1.3"/>`);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.tint}"/><stop offset="1" stop-color="${C.bg}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g fill="${C.accent}" opacity="0.10">${dots.join('')}</g>
  <rect x="${PX - 10}" y="${PY - 10}" width="${PHOTO + 20}" height="${PHOTO + 20}" rx="26" fill="none" stroke="${C.accent}" stroke-opacity="0.35" stroke-width="2"/>

  <circle cx="86" cy="118" r="7" fill="${C.accent}"/>
  <circle cx="86" cy="118" r="13" fill="none" stroke="${C.accent}" stroke-opacity="0.3" stroke-width="3"/>
  <text x="110" y="125" font-family="Menlo, 'IBM Plex Mono', monospace" font-size="21" letter-spacing="2" fill="${C.accent}">${esc(KICKER)}</text>

  <text x="78" y="232" font-family="Georgia, 'Times New Roman', serif" font-size="84" fill="${C.ink}" letter-spacing="-1.5">${esc(NAME)}</text>
  ${TAGLINE.map((l, i) => `<text x="80" y="${318 + i * 50}" font-family="Georgia, serif" font-style="italic" font-size="40" fill="${C.soft}">${esc(l)}</text>`).join('\n  ')}

  <text x="80" y="498" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="${C.faint}">${esc(FOCUS)}</text>
  <text x="80" y="552" font-family="Menlo, monospace" font-size="22" fill="${C.ink}">jonathanberi.com</text>
</svg>`;

const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO}" height="${PHOTO}"><rect width="${PHOTO}" height="${PHOTO}" rx="18" fill="#fff"/></svg>`
);
const photo = await sharp(join(pub, 'img', 'jonathanberi_headshot.jpg'))
  .resize(PHOTO, PHOTO)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: PX, top: PY }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(join(pub, 'img', 'og-card.jpg'));

console.log('wrote public/img/og-card.jpg');
