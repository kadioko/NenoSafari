import fs from 'node:fs';
import vm from 'node:vm';

const store = new Map();
const sandbox = {
  window: {},
  caches: {
    async open() {
      return {
        async addAll(assets) {
          sandbox.cachedAssets = [...(sandbox.cachedAssets || []), ...assets];
        },
        async delete(asset) {
          sandbox.deletedAssets = [...(sandbox.deletedAssets || []), asset];
        },
      };
    },
  },
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
sandbox.window.caches = sandbox.caches;

const packs = sandbox.window.NenoSafariPacks;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(packs.PACKS.length >= 4, 'Should define multiple offline packs');
assert(packs.getInstalledPacks().includes('starter'), 'Starter pack should install by default');
assert(packs.getInstalledPacks().includes('daily'), 'Daily pack should install by default');
await packs.installPack('travel');
assert(packs.getInstalledPacks().includes('travel'), 'Travel pack should be installable');
assert((sandbox.cachedAssets || []).length > 0, 'Installed pack should cache assets when Cache API is available');
await packs.uninstallPack('travel');
assert(!packs.getInstalledPacks().includes('travel'), 'Optional pack should be removable');
await packs.uninstallPack('starter');
assert(packs.getInstalledPacks().includes('starter'), 'Default pack should stay installed');

console.log('Offline pack tests OK');
