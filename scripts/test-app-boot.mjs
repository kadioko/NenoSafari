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
  'daily-badge',
  'smart-practice-card',
  'smart-practice-title',
  'smart-practice-copy',
  'smart-practice-start',
  'smart-practice-review',
  'wod-word',
  'wod-meaning',
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
assert(victoryLabels[0].textContent, 'Language copy should apply to victory labels');
assert(elements.get('home-screen').classList.contains('active'), 'Home screen should start active');
assert(elements.get('toast').getAttribute('role') === 'status', 'Toast should be a screen-reader status region');
assert(elements.get('pronounce-btn').getAttribute('aria-label'), 'Pronunciation button should have a screen-reader label');

sandbox.showScreen('mode-screen');
assert(elements.get('mode-screen').classList.contains('active'), 'Mode screen should become active');
assert(!elements.get('home-screen').classList.contains('active'), 'Home screen should deactivate');

sandbox.showScreen('progress-screen');
assert(elements.get('progress-categories').innerHTML.includes('progress-chart-grid'), 'Progress dashboard should render charts');

sandbox.showScreen('rewards-screen');
assert(elements.get('coin-shop').children.length > 2, 'Rewards screen should render expanded shop cards');

console.log('App boot smoke test OK');
