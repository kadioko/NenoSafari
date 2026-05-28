import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const sandbox = { window: {} };
vm.runInNewContext(await fs.readFile('js/content.js', 'utf8'), sandbox, { filename: 'js/content.js' });

const { CATEGORIES, EXTRA_WORDS, ADVANCED_WORDS } = sandbox.window.NenoSafariContent;
const expected = new Set();
for (const category of CATEGORIES) {
  for (const word of category.words) {
    expected.add(`${word.sw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mp3`);
  }
  for (const word of EXTRA_WORDS[category.id] || []) {
    expected.add(`${word.sw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mp3`);
  }
  for (const word of ADVANCED_WORDS[category.id] || []) {
    expected.add(`${word.sw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mp3`);
  }
}

let existing = [];
try {
  existing = (await fs.readdir('audio')).filter(file => file.endsWith('.mp3'));
} catch {
  console.error('No audio folder found.');
  process.exit(1);
}

const existingSet = new Set(existing);
const missing = [...expected].filter(file => !existingSet.has(file));
const tiny = [];

for (const file of existing) {
  const stat = await fs.stat(path.join('audio', file));
  if (stat.size < 1000) tiny.push(file);
}

if (missing.length || tiny.length) {
  console.error(`Audio check failed. Expected ${expected.size}, found ${existing.length}.`);
  if (missing.length) console.error(`Missing: ${missing.slice(0, 30).join(', ')}${missing.length > 30 ? '...' : ''}`);
  if (tiny.length) console.error(`Suspiciously small: ${tiny.join(', ')}`);
  process.exit(1);
}

console.log(`Audio check OK: ${existing.length}/${expected.size} MP3 files present.`);
