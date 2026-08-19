import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import vm from 'node:vm';

const outDir = process.env.NENO_AUDIO_DIR || 'audio';
const voice = process.env.NENO_EDGE_TTS_VOICE || 'sw-TZ-RehemaNeural';
const rate = process.env.NENO_EDGE_TTS_RATE || '+0%';
const volume = process.env.NENO_EDGE_TTS_VOLUME || '+0%';
const python = process.env.PYTHON || 'python';
const limit = parseInt(process.env.NENO_AUDIO_LIMIT || '0', 10);
const requestedWords = (process.env.NENO_AUDIO_WORDS || '')
  .split(',')
  .map(word => word.trim().toUpperCase())
  .filter(Boolean);

const sandbox = { window: {} };
vm.runInNewContext(await fs.readFile('js/content.js', 'utf8'), sandbox, { filename: 'js/content.js' });
vm.runInNewContext(await fs.readFile('js/daily-puzzles.js', 'utf8'), sandbox, { filename: 'js/daily-puzzles.js' });

const { CATEGORIES, EXTRA_WORDS, ADVANCED_WORDS, WODS } = sandbox.window.NenoSafariContent;
const { DAILY_PUZZLE_SETS = [] } = sandbox.window.NenoSafariDaily || {};
const words = new Map();
for (const category of CATEGORIES) {
  for (const word of category.words) words.set(word.sw, word);
  for (const word of EXTRA_WORDS[category.id] || []) words.set(word.sw, word);
  for (const word of ADVANCED_WORDS[category.id] || []) words.set(word.sw, word);
}
for (const word of sandbox.window.NenoSafariContent.DAILY_WORDS) words.set(word.sw, word);
for (const set of DAILY_PUZZLE_SETS) {
  for (const word of set.words) words.set(word.sw, word);
}
for (const wod of WODS) {
  const sw = wod.word.toUpperCase().replace(/[^A-Z]/g, '');
  words.set(sw, { sw, display: wod.word });
}

function displayWord(word) {
  if (word.display) return word.display;
  if (Array.isArray(word.parts) && word.parts.length) return word.parts.join(' ');
  return word.sw;
}

function audioName(word) {
  return `${word.sw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mp3`;
}

function runEdgeTts(word, filePath) {
  return new Promise((resolve, reject) => {
    const child = spawn(python, [
      '-m',
      'edge_tts',
      '--voice',
      voice,
      '--rate',
      rate,
      '--volume',
      volume,
      '--text',
      displayWord(word),
      '--write-media',
      filePath,
    ], { stdio: ['ignore', 'pipe', 'pipe'] });

    let stderr = '';
    child.stderr.on('data', chunk => {
      stderr += chunk.toString();
    });
    child.on('error', reject);
    child.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`edge-tts failed for ${word.sw} with code ${code}: ${stderr.trim()}`));
    });
  });
}

const queue = requestedWords.length
  ? [...words.values()].filter(word => requestedWords.includes(word.sw.toUpperCase()))
  : [...words.values()];

await fs.mkdir(outDir, { recursive: true });

let generated = 0;
let skipped = 0;
for (const word of queue) {
  if (limit > 0 && generated >= limit) break;

  const filePath = path.join(outDir, audioName(word));
  try {
    await fs.access(filePath);
    skipped += 1;
    continue;
  } catch {}

  await runEdgeTts(word, filePath);
  generated += 1;
  console.log(`Wrote ${filePath}`);
}

console.log(`Generated ${generated} Edge TTS pronunciation files with ${voice}. Skipped ${skipped} existing files. Total vocabulary entries: ${words.size}.`);
