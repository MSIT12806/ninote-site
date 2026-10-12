import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const content = readFileSync(join(root, 'app', 'guide-content.ts'), 'utf8');
const page = readFileSync(join(root, 'app', 'guide-page.tsx'), 'utf8');
const expectedIds = [
  'overview', 'workspace', 'editor-modes', 'blocks', 'appearance',
  'page-links', 'templates', 'lens', 'markmap', 'matrix', 'graphs',
  'search-navigation', 'journal', 'tasks', 'task-time', 'files', 'scope',
];

const mappingStart = content.indexOf('export const guideMediaByPage');
const mappingEnd = content.indexOf('const baseDocs');
if (mappingStart < 0 || mappingEnd <= mappingStart) {
  throw new Error('Guide content must expose a guideMediaByPage mapping before baseDocs.');
}

const mapping = content.slice(mappingStart, mappingEnd);
for (const id of expectedIds) {
  if (!new RegExp(`['\"]${id}['\"]\\s*:`).test(mapping)) {
    throw new Error(`Guide ${id} has no real product media mapping.`);
  }
}

const sources = [...mapping.matchAll(/media\(\s*'([^']+)'/g)].map((match) => match[1]);
if (sources.length < expectedIds.length) {
  throw new Error(`Expected at least ${expectedIds.length} guide media placements, found ${sources.length}.`);
}
for (const source of new Set(sources)) {
  if (!source.startsWith('../product-media/')) {
    throw new Error(`Guide media must use the public product-media directory: ${source}`);
  }
  const file = join(root, 'public', source.replace(/^\.\.\//, ''));
  if (!existsSync(file)) throw new Error(`Missing guide media file: ${file}`);
}

if (page.includes('AnimatedConceptMap') || page.includes('concept-animation')) {
  throw new Error('The guide still contains the hand-built conceptual product animation.');
}
if (!page.includes("block.type === 'media'") || !page.includes('<figure')) {
  throw new Error('The guide renderer must present media as a semantic figure block.');
}

console.log(`GUIDE_MEDIA_CONTRACT_OK pages=${expectedIds.length} placements=${sources.length} files=${new Set(sources).size}`);
