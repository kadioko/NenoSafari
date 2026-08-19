let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.log('Playwright is not installed. Skipping real browser flow test.');
  process.exit(0);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
try {
  await page.goto(process.env.NENO_TEST_URL || 'http://127.0.0.1:5177/index.html?v=57&browser-test=1');
  if (!await page.locator('#wod-audio').isVisible()) {
    throw new Error('Word of the Day pronunciation control should be visible on Home');
  }
  if (!await page.locator('#wod-audio').getAttribute('aria-label')) {
    throw new Error('Word of the Day pronunciation control should have an accessible label');
  }
  await page.locator('#lang-en').click();
  if (await page.locator('#wod-audio').getAttribute('aria-label') !== 'Hear the Word of the Day') {
    throw new Error('Word of the Day pronunciation label did not switch to English');
  }
  if (await page.locator('#mission-kicker').textContent() !== "Today's Safari") {
    throw new Error('Today mission did not switch to English');
  }
  if (await page.locator('#mission-title').textContent() !== 'Your Daily Puzzle is waiting') {
    throw new Error('Today mission copy did not switch to English');
  }
  await page.reload();
  await page.locator('#loading').waitFor({ state: 'hidden' });
  if (!await page.locator('#lang-en').evaluate(el => el.classList.contains('active'))) {
    throw new Error('Selected language did not persist after reload');
  }
  await page.evaluate(() => window.showScreen('settings-screen'));
  await page.locator('#auto-pronounce-toggle').click();
  if (!await page.locator('#auto-pronounce-toggle').evaluate(el => el.classList.contains('on'))) {
    throw new Error('Automatic pronunciation setting did not turn on');
  }
  await page.locator('#haptics-toggle').click();
  if (await page.locator('#haptics-toggle').evaluate(el => el.classList.contains('on'))) {
    throw new Error('Touch feedback setting did not turn off');
  }
  await page.reload();
  await page.locator('#loading').waitFor({ state: 'hidden' });
  await page.evaluate(() => window.showScreen('settings-screen'));
  if (!await page.locator('#auto-pronounce-toggle').evaluate(el => el.classList.contains('on'))) {
    throw new Error('Automatic pronunciation setting did not persist after reload');
  }
  if (await page.locator('#haptics-toggle').evaluate(el => el.classList.contains('on'))) {
    throw new Error('Touch feedback setting did not persist after reload');
  }
  await page.evaluate(() => window.showScreen('home-screen'));
  await page.locator('#home-screen.active button').filter({ hasText: /Choose Category/ }).click();
  await page.locator('#category-screen.active').waitFor();
  if (!(await page.locator('#cat-grid .cat-card').first().textContent()).includes('Tanzania Food')) {
    throw new Error('Category name did not switch to English');
  }
  await page.goto(process.env.NENO_TEST_URL || 'http://127.0.0.1:5177/index.html?v=57&browser-test=1-reset');
  await page.locator('#home-screen.active button').filter({ hasText: /Play Now|Cheza Sasa/ }).click();
  await page.locator('#mode-screen.active').waitFor();
  await page.locator('#mode-screen.active button').filter({ hasText: /Continue|Endelea/ }).click();
  await page.locator('#category-screen.active').waitFor();
  await page.goto(process.env.NENO_TEST_URL || 'http://127.0.0.1:5177/index.html?v=57&browser-test=2');
  await page.locator('#mission-button').click();
  await page.locator('#game-screen.active').waitFor();
  await page.evaluate(() => window.eval('state.elapsedActiveMs = 7000; state.activeClockStartedAt = null;'));
  await page.evaluate(() => window.exitGame());
  await page.evaluate(() => window.showScreen('home-screen'));
  if (await page.locator('#today-mission-card').getAttribute('data-action') !== 'resume') {
    throw new Error('Leaving a puzzle should create a resumable session');
  }
  const savedActiveMs = await page.evaluate(() => JSON.parse(localStorage.getItem('neno_active_session') || '{}').elapsedActiveMs);
  if (savedActiveMs !== 7000) {
    throw new Error(`Resumable session did not preserve active play time: ${savedActiveMs}`);
  }
  await page.waitForTimeout(1100);
  await page.locator('#mission-button').click();
  await page.locator('#game-screen.active').waitFor();
  const resumedSeconds = await page.evaluate(() => window.eval('elapsedGameSeconds()'));
  if (resumedSeconds < 7 || resumedSeconds > 8) {
    throw new Error(`Time spent outside the puzzle leaked into its result: ${resumedSeconds}s`);
  }
  await page.evaluate(() => window.eval('pauseGameClock()'));
  const pausedSeconds = await page.evaluate(() => window.eval('elapsedGameSeconds()'));
  await page.waitForTimeout(1100);
  if (await page.evaluate(() => window.eval('elapsedGameSeconds()')) !== pausedSeconds) {
    throw new Error('Active play clock continued while paused');
  }
  await page.evaluate(() => window.eval('resumeGameClock()'));
  await page.waitForTimeout(1100);
  if (await page.evaluate(() => window.eval('elapsedGameSeconds()')) <= pausedSeconds) {
    throw new Error('Active play clock did not resume');
  }
  await page.locator('.word-chip').first().click();
  if (!(await page.locator('#toast').textContent()).includes('Swahili:')) {
    throw new Error('Word-list feedback did not follow the English menu language');
  }
  await page.evaluate(() => window.eval('wordFound(state.wordPlacements[0])'));
  await page.locator('#quick-learn.show').waitFor({ state: 'visible' });
  if (!await page.locator('#quick-learn-word').textContent()) {
    throw new Error('Quick Learn did not show the found word');
  }
  await page.locator('#quick-learn-save').click();
  if (!await page.locator('#quick-learn-save').isDisabled()) {
    throw new Error('Quick Learn save button did not enter its saved state');
  }
  if ((await page.evaluate(() => JSON.parse(localStorage.getItem('neno_saved_words') || '[]'))).length === 0) {
    throw new Error('Quick Learn did not persist the saved word');
  }
  await page.locator('#quick-learn-details').click();
  await page.locator('#word-modal.open').waitFor({ state: 'visible' });
  const detailPausedSeconds = await page.evaluate(() => window.eval('elapsedGameSeconds()'));
  await page.waitForTimeout(1100);
  if (await page.evaluate(() => window.eval('elapsedGameSeconds()')) !== detailPausedSeconds) {
    throw new Error('Reading word details counted against active solve time');
  }
  if (!await page.locator('#modal-save').isDisabled()) {
    throw new Error('Word details did not reflect the Quick Learn saved state');
  }
  await page.locator('#word-modal .modal-close').click();
  await page.evaluate(() => window.exitGame());
  await page.evaluate(() => window.showScreen('home-screen'));
  await page.locator('#mission-button').click();
  await page.locator('#game-screen.active').waitFor();
  if (await page.locator('.word-chip.found').count() !== 1 || await page.locator('#word-grid .cell.found').count() === 0) {
    throw new Error('Resumed puzzle did not restore its found word and grid highlights');
  }
  await page.evaluate(() => window.showScreen('home-screen'));
  if (!await page.locator('#saved-due-count').isVisible() || await page.locator('#saved-due-count').textContent() !== '1') {
    throw new Error('Home did not surface the newly due saved word');
  }
  if (!(await page.locator('#saved-words-menu').getAttribute('aria-label'))?.includes('1')) {
    throw new Error('Due-review badge did not update the English accessible label');
  }
  await page.evaluate(() => window.showScreen('saved-screen'));
  await page.locator('.saved-study-card').waitFor({ state: 'visible' });
  if (!await page.locator('.study-due').textContent()) {
    throw new Error('Saved review deck did not show its due count');
  }
  await page.locator('.saved-study-card button').filter({ hasText: /Reveal|Onyesha/ }).click();
  await page.locator('.review-rating-actions button').filter({ hasText: /Again|Tena/ }).click();
  await page.locator('.review-complete').waitFor({ state: 'visible' });
  if (!(await page.locator('.review-complete').textContent()).match(/complete|umaliza/i)) {
    throw new Error('Clearing due words did not show review completion');
  }
  const scheduledReview = await page.evaluate(() => JSON.parse(localStorage.getItem('neno_saved_words') || '[]')[0]);
  if (!scheduledReview.nextReviewAt || !scheduledReview.lastReviewed) {
    throw new Error('Review rating did not persist its schedule');
  }

  await page.goto(process.env.NENO_TEST_URL || 'http://127.0.0.1:5177/index.html?v=57&browser-test=3');
  await page.locator('#home-screen.active button').filter({ hasText: /Play Now|Cheza Sasa/ }).click();
  await page.locator('.mode-card').filter({ hasText: /Timed|Haraka/ }).click();
  await page.locator('#mode-screen.active button').filter({ hasText: /Continue|Endelea/ }).click();
  await page.locator('#category-screen.active').waitFor();
  await page.locator('#cat-grid .cat-card').first().click();
  await page.locator('#game-screen.active').waitFor();
  const timerBeforePause = Number(await page.locator('#timer-display').textContent());
  await page.evaluate(() => window.pauseTimedGame());
  await page.locator('#game-pause-overlay').waitFor({ state: 'visible' });
  if (await page.locator('#pause-title').textContent() !== 'Game Paused') {
    throw new Error('Timed pause overlay did not use the selected English language');
  }
  if (!await page.locator('#pause-resume').evaluate(element => element === document.activeElement)) {
    throw new Error('Timed pause overlay did not focus its resume action');
  }
  await page.waitForTimeout(1200);
  const timerWhilePaused = Number(await page.locator('#timer-display').textContent());
  if (timerWhilePaused !== timerBeforePause) {
    throw new Error('Timed mode continued counting while paused');
  }
  await page.evaluate(() => window.resumeActiveGame());
  if (!await page.locator('#game-pause-overlay').isVisible()) {
    throw new Error('Returning from the background restarted timed play without player confirmation');
  }
  await page.locator('#pause-resume').click();
  await page.locator('#game-pause-overlay').waitFor({ state: 'hidden' });
  await page.waitForTimeout(1200);
  const timerAfterResume = Number(await page.locator('#timer-display').textContent());
  if (timerAfterResume >= timerWhilePaused) {
    throw new Error('Timed mode did not resume counting');
  }
  await page.locator('#timer-pill').click();
  if (!await page.locator('#game-pause-overlay').isVisible()) {
    throw new Error('Visible timer control did not pause and protect the puzzle');
  }
  await page.evaluate(() => window.goBackInApp());
  if (await page.locator('#game-pause-overlay').isVisible()) {
    throw new Error('Android back behavior did not dismiss the protected pause screen');
  }

  await page.goto(process.env.NENO_TEST_URL || 'http://127.0.0.1:5177/index.html?v=57&browser-test=4');
  await page.locator('#loading').waitFor({ state: 'hidden' });
  await page.evaluate(() => window.eval(`
    state.currentMode = 'classic';
    state.difficulty = 'rahisi';
    startGame(CATEGORIES[0]);
    state.elapsedActiveMs = 65000;
    state.activeClockStartedAt = null;
    state.foundWords = state.wordPlacements.map(placement => placement.word);
    endGame(true);
  `));
  await page.locator('#victory-screen.active').waitFor();
  if (!await page.locator('#v-record').isVisible()) {
    throw new Error('First completed category solve did not show a personal-best result');
  }
  if (await page.locator('#v-time').textContent() !== '1:05') {
    throw new Error('Victory time did not use the same readable duration format as personal bests and sharing');
  }
  const englishShare = await page.locator('#share-copy').textContent();
  if (!englishShare.includes('Tanzania Food') || !englishShare.includes('play.google.com/store/apps/details?id=com.nenosafari')) {
    throw new Error('English victory share did not include the localized category and Play Store link');
  }
  const firstBestTime = await page.evaluate(() => JSON.parse(localStorage.getItem('neno_catprog') || '{}').chakula?.bestTime);
  if (firstBestTime !== 65) {
    throw new Error(`Expected a 65-second personal best, received ${firstBestTime}`);
  }
  await page.evaluate(() => window.setAppLanguage('sw'));
  const swahiliShare = await page.locator('#share-copy').textContent();
  if (!swahiliShare.includes('Vyakula vya Tanzania') || !swahiliShare.includes('Muda: 1:05')) {
    throw new Error('Victory share did not refresh fully when switching to Kiswahili');
  }
  if (!(await page.locator('#share-victory-btn').textContent()).includes('Shiriki Matokeo')) {
    throw new Error('Victory share button did not switch to Kiswahili');
  }
  await page.evaluate(() => window.eval(`
    playAgain();
    state.elapsedActiveMs = 40000;
    state.activeClockStartedAt = null;
    state.foundWords = state.wordPlacements.map(placement => placement.word);
    endGame(true);
  `));
  const improvedBestTime = await page.evaluate(() => JSON.parse(localStorage.getItem('neno_catprog') || '{}').chakula?.bestTime);
  if (improvedBestTime !== 40) {
    throw new Error(`Faster replay did not improve the personal best: ${improvedBestTime}`);
  }

  await page.goto(process.env.NENO_TEST_URL || 'http://127.0.0.1:5177/index.html?v=57&browser-test=5');
  await page.locator('#loading').waitFor({ state: 'hidden' });
  await page.evaluate(() => window.setAppLanguage('en'));
  await page.evaluate(() => window.eval(`
    state.currentMode = 'classic';
    state.difficulty = 'rahisi';
    startGame(CATEGORIES[0]);
  `));
  if (await page.locator('#words-list .word-chip').count() !== 6) {
    throw new Error('Beginner puzzle did not preserve its intended six-word count');
  }
  await page.evaluate(() => window.startSelection(0, 0));
  await page.dispatchEvent('body', 'mouseup');
  if (await page.evaluate(() => window.eval('state.selecting'))) {
    throw new Error('Releasing a mouse drag outside the grid left selection stuck active');
  }
  await page.evaluate(() => window.startSelection(0, 0));
  await page.dispatchEvent('#word-grid', 'touchcancel');
  if (await page.evaluate(() => window.eval('state.selecting'))) {
    throw new Error('Cancelled touch gesture left selection stuck active');
  }
  if (await page.locator('#hint-counter').textContent() !== '3 of 3 hints left') {
    throw new Error('Hint counter did not start with localized full capacity');
  }
  if (!(await page.locator('#hint-letter').textContent()).includes('First Letter')) {
    throw new Error('Hint controls did not switch to English');
  }
  await page.evaluate(() => window.useHint('letter'));
  const firstHintTarget = await page.evaluate(() => window.eval('state.hintTargetWord'));
  await page.evaluate(() => window.useHint('meaning'));
  const secondHintTarget = await page.evaluate(() => window.eval('state.hintTargetWord'));
  if (!firstHintTarget || secondHintTarget !== firstHintTarget) {
    throw new Error('Consecutive hint types did not stay focused on the same unresolved word');
  }
  if (await page.locator('#hint-counter').textContent() !== '1 of 3 hints left') {
    throw new Error('Hint counter did not decrease after two hints');
  }
  if (await page.evaluate(() => JSON.parse(localStorage.getItem('neno_active_session') || '{}').hintTargetWord) !== firstHintTarget) {
    throw new Error('Focused hint target did not persist in the resumable session');
  }
  await page.evaluate(() => window.setAppLanguage('sw'));
  if (await page.locator('#hint-counter').textContent() !== 'Vidokezo 1 kati ya 3') {
    throw new Error('Hint counter did not switch to Kiswahili');
  }
  if (!(await page.locator('#hint-letter').textContent()).includes('Herufi ya Kwanza')) {
    throw new Error('Hint controls did not switch to Kiswahili');
  }
  await page.evaluate(() => window.useHint('pron'));
  if (await page.locator('#hint-counter').textContent() !== 'Vidokezo 0 kati ya 3') {
    throw new Error('Hint counter did not reach zero after the final hint');
  }
  if (!await page.locator('.hint-action').evaluateAll(buttons => buttons.every(button => button.disabled))) {
    throw new Error('Hint controls remained enabled with no hints left');
  }
  await page.evaluate(() => window.useHint('letter'));
  if (!(await page.locator('#toast').textContent()).includes('Vidokezo vimekwisha')) {
    throw new Error('Empty hint message did not follow the selected language');
  }

  await page.goto(process.env.NENO_TEST_URL || 'http://127.0.0.1:5177/index.html?v=57&browser-test=6');
  await page.locator('#loading').waitFor({ state: 'hidden' });
  await page.evaluate(() => window.eval(`
    localStorage.clear();
    state.totalScore = 0;
    state.coins = 0;
    state.badges = [];
    state.puzzlesDone = 0;
    state.wordsFound = 0;
    state.catProgress = {};
    state.dailyStats = { streak: 0, lastDate: '', completedDates: [] };
    state.dailyRewards = { cycle: '', claimed: [] };
    startDailyPuzzle();
    const firstPlacement = state.wordPlacements[0];
    wordFound(firstPlacement);
    wordFound(firstPlacement);
    window.__duplicateWordCount = state.foundWords.length;
    state.elapsedActiveMs = 30000;
    state.activeClockStartedAt = null;
    state.foundWords = state.wordPlacements.map(placement => placement.word);
    endGame(false);
  `));
  await page.locator('#victory-screen.active').waitFor();
  const completedAtTimeout = await page.evaluate(() => window.eval(`({
    victory: state.lastVictory,
    puzzlesDone: state.puzzlesDone,
    coins: state.coins,
    totalScore: state.totalScore,
    duplicateWordCount: window.__duplicateWordCount
  })`));
  if (completedAtTimeout.duplicateWordCount !== 1) {
    throw new Error('The same word placement was credited more than once');
  }
  if (completedAtTimeout.victory.found !== completedAtTimeout.victory.total || completedAtTimeout.puzzlesDone !== 1) {
    throw new Error('A fully solved board was treated as incomplete when timeout won the completion-delay race');
  }
  await page.evaluate(() => window.endGame(true));
  const afterDuplicateFinish = await page.evaluate(() => window.eval(`({ coins: state.coins, totalScore: state.totalScore, puzzlesDone: state.puzzlesDone })`));
  if (afterDuplicateFinish.coins !== completedAtTimeout.coins
      || afterDuplicateFinish.totalScore !== completedAtTimeout.totalScore
      || afterDuplicateFinish.puzzlesDone !== completedAtTimeout.puzzlesDone) {
    throw new Error('Duplicate finish processing awarded progress more than once');
  }
  await page.evaluate(() => window.playAgain());
  const dailyReplay = await page.evaluate(() => window.eval(`({
    daily: state.isDailyPuzzle,
    replay: state.isDailyReplay,
    rewardEligible: isRewardEligibleRun()
  })`));
  if (!dailyReplay.daily || !dailyReplay.replay || dailyReplay.rewardEligible) {
    throw new Error('Daily Play Again lost its practice-only replay protection');
  }
  console.log('Real browser flow test OK');
} finally {
  await browser.close();
}
