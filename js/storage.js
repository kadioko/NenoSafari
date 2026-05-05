(function () {
  const defaults = {
    badges: [],
    ownedItems: [],
    equippedItems: [],
    catProgress: {},
    learningSignals: {},
    savedWords: [],
    dailyStats: { streak: 0, lastDate: '', completedDates: [] },
    settings: { sound: true, motion: true, contrast: false },
  };

  function saveProgress(state) {
    try {
      localStorage.setItem('neno_score', state.totalScore);
      localStorage.setItem('neno_coins', state.coins);
      localStorage.setItem('neno_badges', JSON.stringify(state.badges || []));
      localStorage.setItem('neno_owned_items', JSON.stringify(state.ownedItems || []));
      localStorage.setItem('neno_equipped_items', JSON.stringify(state.equippedItems || []));
      localStorage.setItem('neno_puzzles', state.puzzlesDone);
      localStorage.setItem('neno_words', state.wordsFound);
      localStorage.setItem('neno_catprog', JSON.stringify(state.catProgress || {}));
      localStorage.setItem('neno_learning_signals', JSON.stringify(state.learningSignals || {}));
      localStorage.setItem('neno_saved_words', JSON.stringify(state.savedWords || []));
      localStorage.setItem('neno_daily_stats', JSON.stringify(state.dailyStats || defaults.dailyStats));
      localStorage.setItem('neno_show_translations', state.showTranslations ? '1' : '0');
      localStorage.setItem('neno_app_language', state.appLanguage);
      localStorage.setItem('neno_settings', JSON.stringify(state.settings || defaults.settings));
    } catch (error) {
      // Storage can fail in private browsing or restricted webviews.
    }
  }

  function loadProgress(state) {
    try {
      state.totalScore = parseInt(localStorage.getItem('neno_score') || '0', 10);
      state.coins = parseInt(localStorage.getItem('neno_coins') || '0', 10);
      state.badges = JSON.parse(localStorage.getItem('neno_badges') || '[]');
      state.ownedItems = JSON.parse(localStorage.getItem('neno_owned_items') || '[]');
      state.equippedItems = JSON.parse(localStorage.getItem('neno_equipped_items') || '[]');
      state.puzzlesDone = parseInt(localStorage.getItem('neno_puzzles') || '0', 10);
      state.wordsFound = parseInt(localStorage.getItem('neno_words') || '0', 10);
      state.catProgress = JSON.parse(localStorage.getItem('neno_catprog') || '{}');
      state.learningSignals = JSON.parse(localStorage.getItem('neno_learning_signals') || '{}');
      state.savedWords = JSON.parse(localStorage.getItem('neno_saved_words') || '[]');
      state.dailyStats = JSON.parse(localStorage.getItem('neno_daily_stats') || JSON.stringify(defaults.dailyStats));
      state.showTranslations = localStorage.getItem('neno_show_translations') !== '0';
      state.appLanguage = localStorage.getItem('neno_app_language') || 'sw';
      state.settings = JSON.parse(localStorage.getItem('neno_settings') || JSON.stringify(defaults.settings));
    } catch (error) {
      state.catProgress = {};
      state.savedWords = [];
      state.dailyStats = { ...defaults.dailyStats };
      state.badges = [];
      state.ownedItems = [];
      state.equippedItems = [];
      state.learningSignals = {};
      state.settings = { ...defaults.settings };
    }
  }

  window.NenoSafariStorage = {
    loadProgress,
    saveProgress,
  };
})();
