// One-off favicon generator. Run: node scripts/gen-favicon.mjs
// Produces public/favicon.svg, public/favicon.ico, public/icon.png
// matching the site's "signal node" mark (emerald dot + rings on slate).
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// Brand mark: dark slate tile, emerald signal node with concentric rings.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Jonathan Beri">
  <rect width="32" height="32" rx="7" fill="#101316"/>
  <circle cx="16" cy="16" r="11" fill="none" stroke="#34c08e" stroke-width="1.3" opacity="0.18"/>
  <circle cx="16" cy="16" r="8.2" fill="none" stroke="#34c08e" stroke-width="1.6" opacity="0.55"/>
  <circle cx="16" cy="16" r="4.3" fill="#34c08e"/>
</svg>
`;
writeFileSync(join(pub, 'favicon.svg'), svg);

const render = (size) =>
  sharp(Buffer.from(svg), { density: 512 }).resize(size, size).png().toBuffer();

// PWA / apple-touch icon (manifest references /icon.png at 192).
writeFileSync(join(pub, 'icon.png'), await render(192));

// Build a PNG-backed .ico (valid for all evergreen browsers) at 16 + 32.
const png16 = await render(16);
const png32 = await render(32);
const entries = [
  { size: 16, buf: png16 },
  { size: 32, buf: png32 },
];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(entries.length, 4);
const dir = Buffer.alloc(16 * entries.length);
let offset = 6 + dir.length;
entries.forEach((e, i) => {
  const o = i * 16;
  dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 0); // width
  dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 1); // height
  dir.writeUInt8(0, o + 2); // palette
  dir.writeUInt8(0, o + 3); // reserved
  dir.writeUInt16LE(1, o + 4); // color planes
  dir.writeUInt16LE(32, o + 6); // bits per pixel
  dir.writeUInt32LE(e.buf.length, o + 8); // size of image data
  dir.writeUInt32LE(offset, o + 12); // offset
  offset += e.buf.length;
});
writeFileSync(join(pub, 'favicon.ico'), Buffer.concat([header, dir, ...entries.map((e) => e.buf)]));

console.log('favicon.svg, favicon.ico, icon.png written to public/');
