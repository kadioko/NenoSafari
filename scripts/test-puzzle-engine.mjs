import fs from 'node:fs';
import vm from 'node:vm';

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync('js/puzzle-engine.js', 'utf8'), sandbox);

const {
  seededRandom,
  shuffleWithRng,
  generateGrid,
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
assert(seededA.placements.length >= 5, 'Should place most beginner words on 8x8 grid');

for (const placement of seededA.placements) {
  const letters = placement.cells.map(([r, c]) => seededA.grid[r][c]).join('');
  assert(letters === placement.word, `${placement.word} should match grid letters`);
  const [dr, dc] = placement.direction;
  assert((dr === 0 && dc === 1) || (dr === 1 && dc === 0), 'Rahisi should only use right/down directions');
}

const hard = generateGrid(words, 12, 'ngumu', seededRandom(44));
assert(hard.placements.length === words.length, 'Ngumu 12x12 should place all sample words');

console.log('Puzzle engine tests OK');
