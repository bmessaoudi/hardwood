import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = `${__dirname}/../public/icons`;

await mkdir(outDir, { recursive: true });

const bgCream = '#f4ede1';
const inkBrown = '#3a2e22';
const rust = '#c4654d';

function svg(size, padding = 0) {
  const s = size;
  const cx = s / 2;
  const r = (s / 2 - padding) * 0.62;
  const stroke = Math.max(2, s * 0.018);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <rect width="${s}" height="${s}" fill="${bgCream}"/>
    <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${rust}" stroke-width="${stroke * 1.6}"/>
    <path d="M ${cx - r} ${cx} Q ${cx} ${cx - r * 0.55} ${cx + r} ${cx}" fill="none" stroke="${rust}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M ${cx - r} ${cx} Q ${cx} ${cx + r * 0.55} ${cx + r} ${cx}" fill="none" stroke="${rust}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cx - r}" x2="${cx}" y2="${cx + r}" stroke="${rust}" stroke-width="${stroke}" stroke-linecap="round"/>
    <text x="${cx}" y="${cx + r + s * 0.13}" font-family="Georgia, serif" font-weight="700"
      font-size="${s * 0.13}" fill="${inkBrown}" text-anchor="middle" letter-spacing="${s * 0.012}">HARDWOOD</text>
  </svg>`;
}

function svgMaskable(size) {
  // safe zone: keep content within central 80%
  const s = size;
  const cx = s / 2;
  const r = s * 0.30;
  const stroke = Math.max(3, s * 0.024);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <rect width="${s}" height="${s}" fill="${bgCream}"/>
    <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${rust}" stroke-width="${stroke * 1.4}"/>
    <path d="M ${cx - r} ${cx} Q ${cx} ${cx - r * 0.55} ${cx + r} ${cx}" fill="none" stroke="${rust}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M ${cx - r} ${cx} Q ${cx} ${cx + r * 0.55} ${cx + r} ${cx}" fill="none" stroke="${rust}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cx - r}" x2="${cx}" y2="${cx + r}" stroke="${rust}" stroke-width="${stroke}" stroke-linecap="round"/>
  </svg>`;
}

const tasks = [
  { name: 'icon-192.png', size: 192, mask: false },
  { name: 'icon-512.png', size: 512, mask: false },
  { name: 'icon-maskable.png', size: 512, mask: true },
];

for (const t of tasks) {
  const buf = Buffer.from(t.mask ? svgMaskable(t.size) : svg(t.size));
  await sharp(buf).png().toFile(`${outDir}/${t.name}`);
  console.log('wrote', t.name);
}

console.log('done.');
