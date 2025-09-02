import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const root = process.cwd();
const srcPng = path.join(root, 'public', 'images', 'respite-care.png');
const outAvif = path.join(root, 'public', 'images', 'respite-care.avif');
const outWebp = path.join(root, 'public', 'images', 'respite-care.webp');

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function main() {
  if (!(await fileExists(srcPng))) {
    console.error(`Source PNG not found: ${srcPng}`);
    process.exit(1);
  }

  const image = sharp(srcPng).rotate();
  const metadata = await image.metadata();

  // Target width to match hero usage; preserve aspect ratio
  const targetWidth = Math.min(1600, metadata.width || 1600);

  // Generate AVIF
  await image
    .resize({ width: targetWidth })
    .avif({ quality: 60, effort: 4 })
    .toFile(outAvif);
  console.log(`Wrote ${outAvif}`);

  // Recreate pipeline to avoid reusing already-consumed stream
  await sharp(srcPng)
    .rotate()
    .resize({ width: targetWidth })
    .webp({ quality: 70 })
    .toFile(outWebp);
  console.log(`Wrote ${outWebp}`);
}

main().catch((err) => { console.error(err); process.exit(1); });

