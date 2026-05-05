(function () {
  const LABELS = {
    'lang-sw': ['Badili menyu kwenda Kiswahili', 'Switch menu to Swahili'],
    'lang-en': ['Badili menyu kwenda Kiingereza', 'Switch menu to English'],
    'pronounce-btn': ['Sikia matamshi ya neno', 'Hear word pronunciation'],
    'modal-save': ['Hifadhi neno kwa marudio', 'Save word for review'],
    'translation-toggle': ['Ficha au onyesha tafsiri za Kiingereza', 'Hide or show English translations'],
    'sound-toggle': ['Washa au zima sauti', 'Turn pronunciation sound on or off'],
    'motion-toggle': ['Punguza au ruhusu mwendo', 'Reduce or allow motion'],
    'contrast-toggle': ['Washa au zima rangi zenye utofauti', 'Turn high contrast colors on or off'],
  };

  function labelFor(id, language) {
    const labels = LABELS[id];
    if (!labels) return '';
    return language === 'en' ? labels[1] : labels[0];
  }

  function setLabel(id, language) {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute('aria-label', labelFor(id, language));
  }

  function applyAccessibilityLabels(language = 'sw') {
    Object.keys(LABELS).forEach(id => setLabel(id, language));
    document.getElementById('toast')?.setAttribute('role', 'status');
    document.getElementById('toast')?.setAttribute('aria-live', 'polite');
    document.getElementById('word-modal')?.setAttribute('role', 'dialog');
    document.getElementById('word-modal')?.setAttribute('aria-modal', 'true');
    document.getElementById('progress-summary')?.setAttribute('aria-label', language === 'en' ? 'Progress summary' : 'Muhtasari wa maendeleo');
    document.getElementById('coin-shop')?.setAttribute('aria-label', language === 'en' ? 'Coin shop cosmetics' : 'Duka la vipodozi vya sarafu');
    document.querySelectorAll('.back-btn').forEach(btn => {
      btn.setAttribute('aria-label', language === 'en' ? 'Go back' : 'Rudi nyuma');
    });
    document.querySelectorAll('.cell').forEach(cell => {
      const row = Number(cell.dataset.r) + 1;
      const col = Number(cell.dataset.c) + 1;
      cell.setAttribute('aria-label', language === 'en' ? `Letter ${cell.textContent}, row ${row}, column ${col}` : `Herufi ${cell.textContent}, mstari ${row}, safu ${col}`);
    });
  }

  window.NenoSafariAccessibility = {
    applyAccessibilityLabels,
  };
})();
