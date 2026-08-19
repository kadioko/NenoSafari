import fs from 'node:fs';
import vm from 'node:vm';

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync('js/puzzle-engine.js', 'utf8'), sandbox);

const {
  seededRandom,
  shuffleWithRng,
  generateGrid,
  wordsThatFit,
} = sandbox.window.NenoSafariEngine;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function gridString(grid) {
  return grid.map(row => row.join('')).join('\n');
}

const words = [
  { sw: 'UGALI' },
  { sw: 'SAMAKI' },
  { sw: 'PILAU' },
  { sw: 'NDIZI' },
  { sw: 'MCHICHA' },
  { sw: 'SOKO' },
];

const seededA = generateGrid(shuffleWithRng(words, seededRandom(20260504)), 8, 'rahisi', seededRandom(20260504));
const seededB = generateGrid(shuffleWithRng(words, seededRandom(20260504)), 8, 'rahisi', seededRandom(20260504));
assert(gridString(seededA.grid) === gridString(seededB.grid), 'Seeded generation should be deterministic');
assert(seededA.placements.length === words.length, 'Should place every beginner word on an 8x8 grid');

for (const placement of seededA.placements) {
  const letters = placement.cells.map(([r, c]) => seededA.grid[r][c]).join('');
  assert(letters === placement.word, `${placement.word} should match grid letters`);
  const [dr, dc] = placement.direction;
  assert((dr === 0 && dc === 1) || (dr === 1 && dc === 0), 'Rahisi should only use right/down directions');
}

const hard = generateGrid(words, 12, 'ngumu', seededRandom(44));
assert(hard.placements.length === words.length, 'Ngumu 12x12 should place all sample words');

for (let seed = 1; seed <= 100; seed++) {
  const easy = generateGrid(words, 8, 'rahisi', seededRandom(seed));
  assert(easy.placements.length === words.length, `Rahisi seed ${seed} should preserve the intended word count`);
}

const empty = generateGrid([], 8, 'kati', seededRandom(7));
assert(empty.grid.length === 8 && empty.placements.length === 0, 'An empty word list should still produce a valid filler grid');

const mixedLengths = [{ sw: 'UGALI' }, { sw: 'DARESSALAAM' }, { sw: 'MJI' }];
assert(wordsThatFit(mixedLengths, 8).length === 2, 'Word selection should exclude entries longer than the active board');

vm.runInNewContext(fs.readFileSync('js/content.js', 'utf8'), sandbox, { filename: 'js/content.js' });
const content = sandbox.window.NenoSafariContent;
for (const category of content.CATEGORIES) {
  const additions = [...(content.EXTRA_WORDS[category.id] || []), ...(content.ADVANCED_WORDS[category.id] || [])];
  additions.forEach(word => {
    if (!category.words.some(existing => existing.sw === word.sw)) category.words.push(word);
  });
}
const difficultyChecks = [
  { name: 'rahisi', size: 8, count: 6 },
  { name: 'kati', size: 10, count: 8 },
  { name: 'ngumu', size: 12, count: 10 },
  { name: 'bingwa', size: 14, count: 12 },
];
for (const category of content.CATEGORIES) {
  for (const difficulty of difficultyChecks) {
    const eligible = wordsThatFit(category.words, difficulty.size);
    assert(eligible.length >= difficulty.count, `${category.id} needs ${difficulty.count} words that fit ${difficulty.size}x${difficulty.size}`);
    const generated = generateGrid(eligible.slice(0, difficulty.count), difficulty.size, difficulty.name, seededRandom(17));
    assert(generated.placements.length === difficulty.count, `${category.id}/${difficulty.name} should place its full intended word count`);
  }
}

console.log('Puzzle engine tests OK');
