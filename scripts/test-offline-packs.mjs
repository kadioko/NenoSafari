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

vm.runInNewContext(fs.readFileSync('js/offline-packs.js', 'utf8'), sandbox, { filename: 'js/offline-packs.js' });

const packs = sandbox.window.NenoSafariPacks;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(packs.PACKS.length >= 4, 'Should define multiple offline packs');
assert(packs.getInstalledPacks().includes('starter'), 'Starter pack should install by default');
assert(packs.getInstalledPacks().includes('daily'), 'Daily pack should install by default');
packs.installPack('travel');
assert(packs.getInstalledPacks().includes('travel'), 'Travel pack should be installable');
packs.uninstallPack('travel');
assert(!packs.getInstalledPacks().includes('travel'), 'Optional pack should be removable');
packs.uninstallPack('starter');
assert(packs.getInstalledPacks().includes('starter'), 'Default pack should stay installed');

console.log('Offline pack tests OK');
