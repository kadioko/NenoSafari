import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const sandbox = { window: {} };
vm.runInNewContext(await fs.readFile('js/content.js', 'utf8'), sandbox, { filename: 'js/content.js' });

const { CATEGORIES, EXTRA_WORDS, ADVANCED_WORDS } = sandbox.window.NenoSafariContent;

function audioName(word) {
  return `${word.sw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mp3`;
}

const words = new Map();
for (const category of CATEGORIES) {
  for (const word of category.words) words.set(word.sw, word);
  for (const word of EXTRA_WORDS[category.id] || []) words.set(word.sw, word);
  for (const word of ADVANCED_WORDS[category.id] || []) words.set(word.sw, word);
}

const missing = [];
for (const word of words.values()) {
  try {
    await fs.access(path.join('audio', audioName(word)));
  } catch {
    missing.push(word.sw);
  }
}

if (!missing.length) {
  console.log(`Audio coverage OK: ${words.size}/${words.size} vocabulary entries have MP3 files.`);
} else {
  console.log(`Missing audio: ${missing.length}/${words.size}`);
  console.log(missing.join(', '));
  console.log('');
  console.log('Generate the next 10 with:');
  console.log(`$env:NENO_AUDIO_WORDS="${missing.slice(0, 10).join(',')}"; npm run audio:elevenlabs`);
  console.log('');
  console.log('Or generate all missing with:');
  console.log(`$env:NENO_AUDIO_WORDS="${missing.join(',')}"; npm run audio:elevenlabs`);
}
