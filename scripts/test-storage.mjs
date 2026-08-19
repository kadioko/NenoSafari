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
  catProgress: { chakula: { best: 80, completed: 1, words: 8, stars: 2, bestTime: 65 } },
  learningSignals: { chakula: { mistakes: 2, hints: 1 } },
  savedWords: [{ sw: 'UGALI', en: 'Maize porridge', reviewed: 2, reviewLevel: 2, nextReviewAt: '2026-05-08T00:00:00.000Z' }],
  dailyStats: { streak: 2, lastDate: '2026-05-05', completedDates: ['2026-05-05'] },
  reviewRewardDate: '2026-05-05',
  showTranslations: false,
  appLanguage: 'en',
  settings: { sound: false, autoPronounce: true, haptics: false, motion: false, contrast: true },
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
assert(restored.savedWords[0].reviewLevel === 2, 'Should restore spaced-review level');
assert(restored.savedWords[0].nextReviewAt === '2026-05-08T00:00:00.000Z', 'Should restore next review time');
assert(restored.dailyStats.streak === 2, 'Should restore daily stats');
assert(restored.reviewRewardDate === '2026-05-05', 'Should restore the daily review reward date');
assert(restored.settings.contrast === true, 'Should restore settings');
assert(restored.settings.haptics === false, 'Should restore haptics setting');
assert(restored.settings.autoPronounce === true, 'Should restore automatic pronunciation setting');
assert(restored.catProgress.chakula.best === 80, 'Should restore category progress');
assert(restored.catProgress.chakula.bestTime === 65, 'Should restore personal-best solve time');
assert(restored.learningSignals.chakula.mistakes === 2, 'Should restore learning signals');

store.set('neno_score', 'not-a-number');
store.set('neno_coins', '17');
store.set('neno_badges', '{broken-json');
store.set('neno_saved_words', '{}');
store.set('neno_catprog', '[]');
store.set('neno_active_session', '[]');
store.set('neno_daily_rewards', '{"cycle":42,"claimed":{},"claimedDates":"today"}');
store.set('neno_settings', '{"sound":"yes","contrast":true}');
const hardened = {};
loadProgress(hardened);
assert(hardened.totalScore === 0, 'Invalid numeric progress should normalize to zero');
assert(hardened.coins === 17, 'A malformed field should not erase other valid progress');
assert(Array.isArray(hardened.badges) && hardened.badges.length === 0, 'Malformed badge JSON should normalize independently');
assert(Array.isArray(hardened.savedWords), 'Saved words should always restore as an array');
assert(hardened.activeSession === null, 'Invalid active session shapes should be discarded');
assert(Array.isArray(hardened.dailyRewards.claimedDates), 'Daily reward claim dates should always restore as an array');
assert(hardened.settings.sound === true && hardened.settings.contrast === true, 'Settings should preserve valid booleans and default invalid values');

console.log('Storage tests OK');
