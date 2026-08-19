import fs from 'node:fs';
import vm from 'node:vm';

function createClassList() {
  const values = new Set();
  return {
    add(...names) {
      names.forEach(name => values.add(name));
    },
    remove(...names) {
      names.forEach(name => values.delete(name));
    },
    toggle(name, force) {
      if (force === undefined) {
        if (values.has(name)) values.delete(name);
        else values.add(name);
        return values.has(name);
      }
      if (force) values.add(name);
      else values.delete(name);
      return Boolean(force);
    },
    contains(name) {
      return values.has(name);
    },
  };
}

function createElement(id = '') {
  return {
    id,
    dataset: {},
    style: {
      setProperty(name, value) {
        this[name] = value;
      },
    },
    classList: createClassList(),
    children: [],
    attributes: {},
    textContent: '',
    innerHTML: '',
    value: '',
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name] || null;
    },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    addEventListener() {},
    querySelector() {
      return createElement();
    },
    querySelectorAll() {
      return [];
    },
  };
}

const elements = new Map();
const ids = [
  'loading',
  'toast',
  'quick-learn',
  'quick-learn-word',
  'quick-learn-meaning',
  'quick-learn-example',
  'quick-learn-audio',
  'quick-learn-save',
  'quick-learn-details',
  'quick-learn-close',
  'home-screen',
  'mode-screen',
  'category-screen',
  'saved-screen',
  'progress-screen',
  'rewards-screen',
  'settings-screen',
  'stat-score',
  'stat-puzzles',
  'stat-words',
  'stat-streak',
  'stat-coins',
  'stat-badges',
  'combo-pill',
  'combo-display',
  'timer-pill',
  'timer-display',
  'timer-toggle',
  'game-pause-overlay',
  'pause-title',
  'pause-copy',
  'pause-time',
  'pause-resume',
  'daily-badge',
  'today-mission-card',
  'mission-kicker',
  'mission-title',
  'mission-copy',
  'mission-status',
  'mission-fill',
  'mission-button',
  'smart-practice-card',
  'smart-practice-title',
  'smart-practice-copy',
  'smart-practice-start',
  'smart-practice-review',
  'saved-words-menu',
  'saved-due-count',
  'wod-word',
  'wod-meaning',
  'wod-audio',
  'lang-sw',
  'lang-en',
  'translation-toggle',
  'words-found-count',
  'words-total-count',
  'words-list',
  'cat-grid',
  'progress-summary',
  'progress-categories',
  'rewards-summary',
  'badge-gallery',
  'coin-shop',
  'saved-words-list',
  'sound-toggle',
  'auto-pronounce-toggle',
  'haptics-toggle',
  'motion-toggle',
  'contrast-toggle',
  'pronounce-btn',
];
ids.forEach(id => elements.set(id, createElement(id)));
elements.get('home-screen').classList.add('screen', 'active');
['mode-screen', 'category-screen', 'saved-screen', 'progress-screen', 'rewards-screen', 'settings-screen']
  .forEach(id => elements.get(id).classList.add('screen'));

const diffButtons = [createElement(), createElement(), createElement(), createElement()];
const victoryLabels = [createElement(), createElement(), createElement()];
const victoryButtons = [createElement(), createElement(), createElement()];
const vocabHeading = createElement();
const listeners = {};
const store = new Map();
store.set('neno_saved_words', JSON.stringify([
  { sw: 'UGALI', key: 'UGALI', en: 'Maize porridge / staple meal', ex: 'Ninakula ugali na samaki.', category: 'Vyakula vya Tanzania', reviewed: 0 },
]));

const document = {
  documentElement: { lang: 'sw' },
  body: createElement('body'),
  addEventListener(type, callback) {
    listeners[type] = listeners[type] || [];
    listeners[type].push(callback);
  },
  createElement,
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, createElement(id));
    return elements.get(id);
  },
  querySelector(selector) {
    if (selector === '#vocab-summary h3') return vocabHeading;
    if (selector === '.modal-example strong') return null;
    if (selector === '.modal-note strong') return null;
    if (selector === '.modal-close') return null;
    return null;
  },
  querySelectorAll(selector) {
    if (selector === '.screen') return [...elements.values()].filter(el => el.classList.contains('screen'));
    if (selector === '.diff-btn') return diffButtons;
    if (selector === '.v-stat .l') return victoryLabels;
    if (selector === '.v-btn') return victoryButtons;
    if (selector === '[data-i18n]') return [];
    return [];
  },
};

const sandbox = {
  window: null,
  document,
  navigator: { serviceWorker: { register: () => Promise.resolve() } },
  localStorage: {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
  },
  console,
  setTimeout(callback) {
    callback();
    return 1;
  },
  clearTimeout() {},
  confirm: () => true,
  speechSynthesis: { cancel() {}, speak() {} },
  SpeechSynthesisUtterance: function SpeechSynthesisUtterance(text) {
    this.text = text;
  },
};
sandbox.window = sandbox;
sandbox.window.addEventListener = (type, callback) => {
  listeners[type] = listeners[type] || [];
  listeners[type].push(callback);
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const html = fs.readFileSync('index.html', 'utf8');
const externalScripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(match => match[1].split('?')[0]);
for (const scriptPath of externalScripts) {
  vm.runInNewContext(fs.readFileSync(scriptPath, 'utf8'), sandbox, { filename: scriptPath });
}

const inlineScript = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]).join('\n');
vm.runInNewContext(inlineScript, sandbox, { filename: 'index.html:inline-script' });

for (const callback of listeners.DOMContentLoaded || []) {
  callback();
}

assert(elements.get('loading').style.display === 'none', 'Loading screen should hide after init');
assert(elements.get('wod-word').textContent, 'Word of the day should render');
assert(elements.get('smart-practice-title').textContent, 'Smart practice card should render');
assert(elements.get('mission-title').textContent, 'Today mission card should render');
assert(elements.get('today-mission-card').dataset.action === 'daily', 'Today mission should guide a new player to Daily Puzzle');
assert(victoryLabels[0].textContent, 'Language copy should apply to victory labels');
assert(elements.get('home-screen').classList.contains('active'), 'Home screen should start active');
assert(elements.get('toast').getAttribute('role') === 'status', 'Toast should be a screen-reader status region');
assert(elements.get('pronounce-btn').getAttribute('aria-label'), 'Pronunciation button should have a screen-reader label');
assert(elements.get('wod-audio').getAttribute('aria-label'), 'Word of the Day audio should have a screen-reader label');
assert(elements.get('haptics-toggle').getAttribute('aria-label'), 'Haptics toggle should have a screen-reader label');
assert(elements.get('auto-pronounce-toggle').getAttribute('aria-label'), 'Auto-pronounce toggle should have a screen-reader label');
assert(elements.get('quick-learn-details').getAttribute('aria-label'), 'Quick Learn details should have a screen-reader label');
assert(elements.get('quick-learn-save').getAttribute('aria-label'), 'Quick Learn save button should have a screen-reader label');
assert(sandbox.window.NenoSafariDaily.DAILY_PUZZLE_SETS.every(set => set.nameEn), 'Daily puzzles should have English titles');
const missingWeeklyWords = vm.runInNewContext(`WEEKLY_CHALLENGES.flatMap(challenge => {
  const playable = new Set(wordsBySw(challenge.words).map(word => word.sw));
  return challenge.words.filter(word => !playable.has(word)).map(word => challenge.id + ':' + word);
})`, sandbox);
assert(missingWeeklyWords.length === 0, `Every Weekly Challenge word should resolve to playable vocabulary: ${missingWeeklyWords.join(', ')}`);

sandbox.setAppLanguage('en');
assert(elements.get('mission-kicker').textContent === "Today's Safari", 'Today mission should update when language changes');
assert(elements.get('mission-title').textContent === 'Your Daily Puzzle is waiting', 'Today mission copy should use English after language changes');
sandbox.setAppLanguage('sw');

vm.runInNewContext(`
  state.dailyStats = { streak: 3, lastDate: dailyKey(), completedDates: [dailyKey()] };
  state.dailyRewards = { cycle: currentWeekKey(), claimed: [2] };
  state.dailyGoal = { date: dailyKey(), words: 5, puzzles: 0, reviews: 0, claimed: false };
  state.weeklyChallenges = {};
`, sandbox);
assert(sandbox.getTodayMission().action === 'daily-goal', 'Today mission should keep a completed Daily Goal visible until it is claimed');
assert(vm.runInNewContext('state.dailyRewards.claimedDates.includes(dailyKey())', sandbox), 'Legacy daily reward claims should migrate to an exact claim date');
vm.runInNewContext(`
  state.dailyStats = { streak: 1, lastDate: dailyKey(), completedDates: [dailyKey()] };
  state.dailyRewards = { cycle: currentWeekKey(), claimed: [0], claimedDates: [previousDailyKey(dailyKey())] };
  state.coins = 10;
`, sandbox);
assert(sandbox.getTodayMission().action === 'daily-reward', 'A restarted streak should still offer today’s reward when the same slot was claimed earlier in the week');
sandbox.claimDailyReward();
assert(vm.runInNewContext('state.coins', sandbox) === 20, 'Restarted streak day one should award the first daily reward');
assert(vm.runInNewContext('state.dailyRewards.claimedDates.includes(dailyKey())', sandbox), 'Daily reward should persist an exact claim date');
vm.runInNewContext(`
  state.dailyGoal.claimed = true;
  state.savedWords = [NenoSafariReviewScheduler.normalizeSavedWord({
    sw: 'UGALI', key: 'UGALI', en: 'Maize porridge', nextReviewAt: '2000-01-01T00:00:00.000Z'
  })];
`, sandbox);
assert(sandbox.getTodayMission().action === 'review', 'Due saved words should be prioritized before the Weekly Challenge');
assert(sandbox.getTodayMission().description.includes('neno 1'), 'Single due-review mission should use singular Swahili copy');
sandbox.renderSmartPractice();
assert(elements.get('saved-due-count').hidden === false, 'Home should show a due-review count badge');
assert(elements.get('smart-practice-review').disabled === false, 'Review action should be enabled when a word is due');
vm.runInNewContext(`state.savedWords[0].nextReviewAt = '2099-01-01T00:00:00.000Z';`, sandbox);
assert(sandbox.getTodayMission().action === 'weekly', 'Future reviews should not create an empty review mission');
sandbox.renderSmartPractice();
assert(elements.get('saved-due-count').hidden === true, 'Due-review badge should hide when every word is scheduled for later');
assert(elements.get('smart-practice-review').disabled === true, 'Review action should disable when no word is due');
vm.runInNewContext(`state.savedWords[0].nextReviewAt = '2000-01-01T00:00:00.000Z';`, sandbox);

sandbox.updateFindCombo();
sandbox.updateFindCombo();
assert(elements.get('combo-display').textContent === 'x1.2', 'Consecutive word finds should show a combo multiplier');
sandbox.resetFindCombo();
assert(!elements.get('combo-pill').classList.contains('active'), 'A missed word should reset the active combo');

sandbox.showScreen('saved-screen');
sandbox.revealSavedStudyMeaning();
assert(elements.get('saved-words-list').children.some(child => child.innerHTML.includes('Nimelijua')), 'Revealed review card should ask for a confidence rating');
const coinsBeforeReview = Number(store.get('neno_coins') || 0);
sandbox.rateSavedStudy('UGALI', false);
assert(store.get('neno_hard_words').includes('UGALI'), 'Practice-again review should add the word to hard-word practice');
assert(elements.get('saved-words-list').children.some(child => child.classList.contains('review-complete')), 'Clearing due words should complete the review sprint');
assert(Number(store.get('neno_coins')) === coinsBeforeReview + 3, 'First completed review sprint of the day should award coins');
sandbox.rateSavedStudy('UGALI', true);
assert(!store.get('neno_hard_words').includes('UGALI'), 'Known review should remove the word from hard-word practice');
assert(JSON.parse(store.get('neno_saved_words'))[0].nextReviewAt, 'Review rating should schedule the next review');

const foodCategory = sandbox.window.NenoSafariContent.CATEGORIES.find(category => category.id === 'chakula');
foodCategory.words.slice(0, 5).forEach(word => sandbox.trackCategoryWord(word));
assert(sandbox.getCategoryMastery(foodCategory).learned === 5, 'Mastery should track unique words learned, not completed puzzles');
assert(sandbox.awardMasteryMilestones('chakula') === 10, 'Five learned words should unlock the first mastery reward');
assert(sandbox.awardMasteryMilestones('chakula') === 0, 'A mastery reward should only be granted once');

vm.runInNewContext(`
  state.isDailyPuzzle = true;
  state.isDailyReplay = true;
  state.isWeeklyChallenge = false;
  state.isWeeklyReplay = false;
`, sandbox);
assert(sandbox.isRewardEligibleRun() === false, 'A completed Daily Puzzle replay should not be reward eligible');
vm.runInNewContext(`
  state.isDailyPuzzle = false;
  state.isDailyReplay = false;
  state.isWeeklyChallenge = true;
  state.isWeeklyReplay = true;
`, sandbox);
assert(sandbox.isRewardEligibleRun() === false, 'A completed Weekly Challenge replay should not be reward eligible');
vm.runInNewContext(`
  state.currentCategory = { id: 'replay-test' };
  state.badges = [];
  state.coins = 40;
  state.wordsFound = 100;
  state.puzzlesDone = 10;
`, sandbox);
const replayRewards = sandbox.applyRewards({ completed: true, stars: 3, found: 8, rewardEligible: false });
assert(replayRewards.coins === 0, 'Practice-only replay should return zero reward coins');
assert(vm.runInNewContext('state.coins', sandbox) === 40, 'Practice-only replay should not change coin balance');
assert(vm.runInNewContext('state.badges.length', sandbox) === 0, 'Practice-only replay should not unlock badges');
const emptyFailureRewards = sandbox.applyRewards({ completed: false, stars: 0, found: 0, rewardEligible: true });
assert(emptyFailureRewards.coins === 0, 'An empty failed puzzle should not award coins');
vm.runInNewContext(`
  state.isWeeklyReplay = false;
  state.activeSession = {
    category: { id: 'broken-session', words: [] },
    gridSize: 1,
    grid: [['A']],
    wordPlacements: [{ word: 'A' }],
  };
`, sandbox);
assert(sandbox.getResumableSession() === null, 'Malformed saved puzzle shapes should be discarded safely');
vm.runInNewContext(`
  state.activeSession = {
    category: { id: 'weekly-test', name: 'Weekly Test' },
    grid: [['A']],
    wordPlacements: [{ word: 'A' }],
    isWeeklyChallenge: true,
    currentWeeklyKey: '2000-W1',
  };
`, sandbox);
assert(sandbox.getResumableSession() === null, 'A saved Weekly Challenge should expire after its challenge week');

sandbox.showScreen('mode-screen');
assert(elements.get('mode-screen').classList.contains('active'), 'Mode screen should become active');
assert(!elements.get('home-screen').classList.contains('active'), 'Home screen should deactivate');

sandbox.showScreen('progress-screen');
assert(elements.get('progress-categories').innerHTML.includes('progress-chart-grid'), 'Progress dashboard should render charts');

sandbox.showScreen('rewards-screen');
assert(elements.get('coin-shop').children.length > 2, 'Rewards screen should render expanded shop cards');

sandbox.showScreen('saved-screen');
assert(elements.get('saved-words-list').children.length > 2, 'Saved words screen should render controls, review deck, and saved cards');
assert(elements.get('saved-words-list').children.some(child => child.className === 'saved-study-card'), 'Saved words screen should render review deck');
assert(elements.get('saved-words-list').children.some(child => child.innerHTML.includes('memory-strength')), 'Saved word cards should render memory strength');

console.log('App boot smoke test OK');
