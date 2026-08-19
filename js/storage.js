(function () {
  const defaults = {
    badges: [],
    ownedItems: [],
    equippedItems: [],
    catProgress: {},
    learningSignals: {},
    categoryWordsFound: {},
    masteryRewards: {},
    activeSession: null,
    hardWords: {},
    weeklyChallenges: {},
    dailyRewards: { cycle: '', claimed: [], claimedDates: [] },
    comebackGifts: [],
    savedWords: [],
    dailyStats: { streak: 0, lastDate: '', completedDates: [] },
    dailyGoal: { date: '', words: 0, puzzles: 0, reviews: 0, claimed: false },
    reviewRewardDate: '',
    settings: { sound: true, autoPronounce: false, haptics: true, motion: true, contrast: false },
    onboardingDismissed: false,
  };

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function asRecord(value, fallback = {}) {
    return value && typeof value === 'object' && !Array.isArray(value) ? value : fallback;
  }

  function nonNegativeInt(value) {
    const number = Number.parseInt(value, 10);
    return Number.isFinite(number) ? Math.max(0, number) : 0;
  }

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
      localStorage.setItem('neno_category_words_found', JSON.stringify(state.categoryWordsFound || {}));
      localStorage.setItem('neno_mastery_rewards', JSON.stringify(state.masteryRewards || {}));
      localStorage.setItem('neno_active_session', JSON.stringify(state.activeSession || null));
      localStorage.setItem('neno_hard_words', JSON.stringify(state.hardWords || {}));
      localStorage.setItem('neno_weekly_challenges', JSON.stringify(state.weeklyChallenges || {}));
      localStorage.setItem('neno_daily_rewards', JSON.stringify(state.dailyRewards || defaults.dailyRewards));
      localStorage.setItem('neno_comeback_gifts', JSON.stringify(state.comebackGifts || []));
      localStorage.setItem('neno_saved_words', JSON.stringify(state.savedWords || []));
      localStorage.setItem('neno_daily_stats', JSON.stringify(state.dailyStats || defaults.dailyStats));
      localStorage.setItem('neno_daily_goal', JSON.stringify(state.dailyGoal || defaults.dailyGoal));
      localStorage.setItem('neno_review_reward_date', state.reviewRewardDate || '');
      localStorage.setItem('neno_show_translations', state.showTranslations ? '1' : '0');
      localStorage.setItem('neno_app_language', state.appLanguage);
      localStorage.setItem('neno_settings', JSON.stringify(state.settings || defaults.settings));
      localStorage.setItem('neno_onboarding_dismissed', state.onboardingDismissed ? '1' : '0');
    } catch (error) {
      // Storage can fail in private browsing or restricted webviews.
    }
  }

  function loadProgress(state) {
    try {
      state.totalScore = nonNegativeInt(localStorage.getItem('neno_score'));
      state.coins = nonNegativeInt(localStorage.getItem('neno_coins'));
      state.badges = asArray(readJson('neno_badges', []));
      state.ownedItems = asArray(readJson('neno_owned_items', []));
      state.equippedItems = asArray(readJson('neno_equipped_items', []));
      state.puzzlesDone = nonNegativeInt(localStorage.getItem('neno_puzzles'));
      state.wordsFound = nonNegativeInt(localStorage.getItem('neno_words'));
      state.catProgress = asRecord(readJson('neno_catprog', {}));
      state.learningSignals = asRecord(readJson('neno_learning_signals', {}));
      state.categoryWordsFound = asRecord(readJson('neno_category_words_found', {}));
      state.masteryRewards = asRecord(readJson('neno_mastery_rewards', {}));
      state.activeSession = asRecord(readJson('neno_active_session', null), null);
      state.hardWords = asRecord(readJson('neno_hard_words', {}));
      state.weeklyChallenges = asRecord(readJson('neno_weekly_challenges', {}));
      const dailyRewards = asRecord(readJson('neno_daily_rewards', defaults.dailyRewards));
      state.dailyRewards = {
        cycle: typeof dailyRewards.cycle === 'string' ? dailyRewards.cycle : '',
        claimed: asArray(dailyRewards.claimed),
        claimedDates: asArray(dailyRewards.claimedDates),
      };
      state.comebackGifts = asArray(readJson('neno_comeback_gifts', []));
      state.savedWords = asArray(readJson('neno_saved_words', []));
      const dailyStats = asRecord(readJson('neno_daily_stats', defaults.dailyStats));
      state.dailyStats = {
        streak: nonNegativeInt(dailyStats.streak),
        lastDate: typeof dailyStats.lastDate === 'string' ? dailyStats.lastDate : '',
        completedDates: asArray(dailyStats.completedDates),
      };
      const dailyGoal = asRecord(readJson('neno_daily_goal', defaults.dailyGoal));
      state.dailyGoal = {
        date: typeof dailyGoal.date === 'string' ? dailyGoal.date : '',
        words: nonNegativeInt(dailyGoal.words),
        puzzles: nonNegativeInt(dailyGoal.puzzles),
        reviews: nonNegativeInt(dailyGoal.reviews),
        claimed: dailyGoal.claimed === true,
      };
      state.reviewRewardDate = localStorage.getItem('neno_review_reward_date') || '';
      state.showTranslations = localStorage.getItem('neno_show_translations') !== '0';
      state.appLanguage = localStorage.getItem('neno_app_language') === 'en' ? 'en' : 'sw';
      const settings = asRecord(readJson('neno_settings', defaults.settings));
      state.settings = Object.fromEntries(Object.entries(defaults.settings).map(([key, fallback]) => [
        key,
        typeof settings[key] === 'boolean' ? settings[key] : fallback,
      ]));
      state.onboardingDismissed = localStorage.getItem('neno_onboarding_dismissed') === '1';
    } catch (error) {
      state.totalScore = 0;
      state.coins = 0;
      state.puzzlesDone = 0;
      state.wordsFound = 0;
      state.catProgress = {};
      state.savedWords = [];
      state.dailyStats = { ...defaults.dailyStats };
      state.dailyGoal = { ...defaults.dailyGoal };
      state.reviewRewardDate = '';
      state.badges = [];
      state.ownedItems = [];
      state.equippedItems = [];
      state.learningSignals = {};
      state.categoryWordsFound = {};
      state.masteryRewards = {};
      state.activeSession = null;
      state.hardWords = {};
      state.weeklyChallenges = {};
      state.dailyRewards = { ...defaults.dailyRewards, claimed: [], claimedDates: [] };
      state.comebackGifts = [];
      state.settings = { ...defaults.settings };
      state.showTranslations = true;
      state.appLanguage = 'sw';
      state.onboardingDismissed = false;
    }
  }

  window.NenoSafariStorage = {
    loadProgress,
    saveProgress,
  };
})();
