import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');
const home = read('app/page.tsx');
const styles = read('app/globals.css');
const visibleSources = [
  'app/page.tsx',
  'app/demo-page.tsx',
  'app/guide-page.tsx',
  'app/guide-content.ts',
  'index.html',
  'demo/index.html',
  'guide/index.html',
];

const logoPath = join(root, 'public', 'intugrove-logo.png');
if (!existsSync(logoPath)) throw new Error('Missing the approved Intugrove logo asset.');
const logoHash = createHash('sha256').update(readFileSync(logoPath)).digest('hex').toUpperCase();
const approvedHash = 'BEE8A75EAC008AD5A916A8F8A6D69398F971599DD923C5F5C229EA76D30FE499';
if (logoHash !== approvedHash) throw new Error(`Unexpected Intugrove logo hash: ${logoHash}`);

for (const path of visibleSources) {
  const source = read(path)
    .replaceAll('https://github.com/MSIT12806/ninote-site', '')
    .replaceAll('NiNote-win-x64-Setup.exe', '')
    .replaceAll("localStorage.getItem('ninote-theme')", '')
    .replaceAll("localStorage.setItem('ninote-theme', theme)", '');
  if (/NiNote/.test(source)) throw new Error(`${path} still exposes NiNote as product copy.`);
}

const requiredHomeFragments = [
  'intugrove-logo.png',
  'Intugrove',
  '知識彼此扎根',
  '扎根於 Markdown',
  '建立連結',
  '切換視角',
  '看見缺口',
  'workspace-modes.gif',
  'workspace-nimode.png',
  'guide-markmap.png',
  'guide-matrix.png',
  'guide-workspace-graph.png',
  'releases/latest/download/NiNote-win-x64-Setup.exe',
];
for (const fragment of requiredHomeFragments) {
  if (!home.includes(fragment)) throw new Error(`Home is missing required Intugrove contract fragment: ${fragment}`);
}

for (const removedFragment of ['brand-mark', 'ambient-grid', 'preview-orbit', 'outline-visual']) {
  if (home.includes(removedFragment) || styles.includes(removedFragment)) {
    throw new Error(`Legacy simulated/cyber visual remains: ${removedFragment}`);
  }
}

for (const legacyColor of ['#080b10', '#73ddff', '#20bce8', '#7d9cff', '#b39afc']) {
  if (styles.toLowerCase().includes(legacyColor)) throw new Error(`Legacy neon palette remains: ${legacyColor}`);
}
for (const forestColor of ['#17352d', '#1f5a47', '#f7f3e9', '#0e1713']) {
  if (!styles.toLowerCase().includes(forestColor)) throw new Error(`Forest palette token is missing: ${forestColor}`);
}

for (const path of ['index.html', 'demo/index.html', 'guide/index.html']) {
  const html = read(path);
  if (!html.includes('Intugrove')) throw new Error(`${path} is missing Intugrove metadata.`);
  if (!html.includes('intugrove-logo.png')) throw new Error(`${path} is missing the official PNG favicon.`);
  if (!html.includes("localStorage.getItem('ninote-theme')")) throw new Error(`${path} broke the persisted theme key.`);
}

console.log('INTUGROVE_BRAND_CONTRACT_OK logo=approved pages=3 palette=forest productMedia=real');
