import fs from 'node:fs';
import vm from 'node:vm';

const store = new Map();
const sandbox = {
  window: {},
  localStorage: {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
  },
};

vm.runInNewContext(fs.readFileSync('js/storage.js', 'utf8'), sandbox);

const { saveProgress, loadProgress } = sandbox.window.NenoSafariStorage;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const original = {
  totalScore: 120,
  coins: 45,
  badges: ['first-puzzle'],
  ownedItems: ['theme-ocean'],
  equippedItems: ['theme-ocean'],
  puzzlesDone: 3,
  wordsFound: 22,
  catProgress: { chakula: { best: 80, completed: 1, words: 8, stars: 2 } },
  learningSignals: { chakula: { mistakes: 2, hints: 1 } },
  savedWords: [{ sw: 'UGALI', en: 'Maize porridge', reviewed: 2 }],
  dailyStats: { streak: 2, lastDate: '2026-05-05', completedDates: ['2026-05-05'] },
  showTranslations: false,
  appLanguage: 'en',
  settings: { sound: false, motion: false, contrast: true },
};

saveProgress(original);

const restored = {};
loadProgress(restored);

assert(restored.totalScore === 120, 'Should restore score');
assert(restored.coins === 45, 'Should restore coins');
assert(restored.puzzlesDone === 3, 'Should restore puzzle count');
assert(restored.wordsFound === 22, 'Should restore word count');
assert(restored.showTranslations === false, 'Should restore translation toggle');
assert(restored.appLanguage === 'en', 'Should restore app language');
assert(restored.badges[0] === 'first-puzzle', 'Should restore badges');
assert(restored.ownedItems[0] === 'theme-ocean', 'Should restore owned items');
assert(restored.equippedItems[0] === 'theme-ocean', 'Should restore equipped items');
assert(restored.savedWords[0].sw === 'UGALI', 'Should restore saved words');
assert(restored.dailyStats.streak === 2, 'Should restore daily stats');
assert(restored.settings.contrast === true, 'Should restore settings');
assert(restored.catProgress.chakula.best === 80, 'Should restore category progress');
assert(restored.learningSignals.chakula.mistakes === 2, 'Should restore learning signals');

console.log('Storage tests OK');
