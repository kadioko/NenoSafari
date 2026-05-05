(function () {
  const PACKS = [
    { id: 'starter', name: 'Starter Pack', categories: ['chakula', 'salamu', 'wanyama', 'familia'], installed: true },
    { id: 'travel', name: 'Tanzania Travel Pack', categories: ['miji', 'usafiri', 'biashara', 'mazingira'], installed: false },
    { id: 'culture', name: 'Culture Pack', categories: ['utamaduni', 'historia'], installed: false },
    { id: 'daily', name: 'Daily Tanzania Pack', categories: ['daily'], installed: true },
  ];
  const KEY = 'neno_installed_packs';

  function getInstalledPacks() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
      const defaults = PACKS.filter(pack => pack.installed).map(pack => pack.id);
      return [...new Set([...defaults, ...saved])];
    } catch {
      return PACKS.filter(pack => pack.installed).map(pack => pack.id);
    }
  }

  function installPack(id) {
    const installed = getInstalledPacks();
    if (!PACKS.some(pack => pack.id === id)) return installed;
    if (!installed.includes(id)) installed.push(id);
    localStorage.setItem(KEY, JSON.stringify(installed));
    return installed;
  }

  function uninstallPack(id) {
    const pack = PACKS.find(entry => entry.id === id);
    if (!pack || pack.installed) return getInstalledPacks();
    const installed = getInstalledPacks().filter(packId => packId !== id);
    localStorage.setItem(KEY, JSON.stringify(installed));
    return installed;
  }

  window.NenoSafariPacks = {
    PACKS,
    getInstalledPacks,
    installPack,
    uninstallPack,
  };
})();
