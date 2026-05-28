(function () {
  const PACKS = [
    { id: 'starter', name: 'Starter Pack', categories: ['chakula', 'salamu', 'wanyama', 'familia'], installed: true, assets: ['js/content.js?v=30', 'assets/theme-art/savanna.svg'] },
    { id: 'travel', name: 'Tanzania Travel Pack', categories: ['miji', 'usafiri', 'biashara', 'mazingira'], installed: false, assets: ['js/content.js?v=30', 'assets/theme-art/ocean.svg', 'assets/theme-art/dar.svg'] },
    { id: 'culture', name: 'Culture Pack', categories: ['utamaduni', 'historia'], installed: false, assets: ['js/content.js?v=30', 'assets/theme-art/zanzibar.svg'] },
    { id: 'daily', name: 'Daily Tanzania Pack', categories: ['daily'], installed: true, assets: ['js/daily-puzzles.js?v=30', 'assets/theme-art/kilimanjaro.svg'] },
  ];
  const KEY = 'neno_installed_packs';
  const CACHE = 'neno-safari-packs-v1';

  function getInstalledPacks() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
      const defaults = PACKS.filter(pack => pack.installed).map(pack => pack.id);
      return [...new Set([...defaults, ...saved])];
    } catch {
      return PACKS.filter(pack => pack.installed).map(pack => pack.id);
    }
  }

  async function cachePackAssets(pack) {
    if (!pack?.assets?.length || !('caches' in window)) return;
    const cache = await caches.open(CACHE);
    await cache.addAll(pack.assets);
  }

  async function installPack(id) {
    const installed = getInstalledPacks();
    const pack = PACKS.find(entry => entry.id === id);
    if (!pack) return installed;
    if (!installed.includes(id)) installed.push(id);
    localStorage.setItem(KEY, JSON.stringify(installed));
    await cachePackAssets(pack);
    return installed;
  }

  async function uninstallPack(id) {
    const pack = PACKS.find(entry => entry.id === id);
    if (!pack || pack.installed) return getInstalledPacks();
    const installed = getInstalledPacks().filter(packId => packId !== id);
    localStorage.setItem(KEY, JSON.stringify(installed));
    if ('caches' in window) {
      const cache = await caches.open(CACHE);
      await Promise.all((pack.assets || []).map(asset => cache.delete(asset)));
    }
    return installed;
  }

  window.NenoSafariPacks = {
    PACKS,
    getInstalledPacks,
    installPack,
    uninstallPack,
  };
})();
