import fs from 'node:fs';
import vm from 'node:vm';

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync('js/ui-utils.js', 'utf8'), sandbox, { filename: 'js/ui-utils.js' });

const {
  activeDailyStreak,
  bestTimeResult,
  buildVictoryShareText,
  dailyRewardIndex,
  formatDuration,
  isoWeekKey,
  weeklyRotationIndex,
  wordOfDayIndex,
} = sandbox.window.NenoSafariUiUtils;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(isoWeekKey(new Date(2020, 11, 31, 12)) === '2020-W53', 'December 31 should stay in ISO week 53');
assert(isoWeekKey(new Date(2021, 0, 1, 12)) === '2020-W53', 'January 1 can belong to the previous ISO week-year');
assert(isoWeekKey(new Date(2021, 0, 4, 12)) === '2021-W01', 'The first ISO Monday should begin week 1');
assert(weeklyRotationIndex(new Date(2026, 2, 1, 12), 4) !== weeklyRotationIndex(new Date(2026, 2, 2, 12), 4), 'Consecutive ISO weeks should advance the weekly challenge at a 09-to-10 rollover');
assert(weeklyRotationIndex(new Date(2027, 0, 3, 12), 4) !== weeklyRotationIndex(new Date(2027, 0, 4, 12), 4), 'The weekly challenge should advance across an ISO year boundary');
assert(weeklyRotationIndex(new Date(2026, 2, 2, 12), 0) === 0, 'An empty weekly challenge list should safely use index zero');

const indices = new Set();
const start = new Date(2026, 0, 1, 12);
for (let offset = 0; offset < 45; offset++) {
  const date = new Date(start);
  date.setDate(start.getDate() + offset);
  indices.add(wordOfDayIndex(date, 45));
}
assert(indices.size === 45, 'A 45-day cycle should show every Word of the Day entry exactly once');
assert(wordOfDayIndex(start, 0) === 0, 'An empty Word of the Day list should safely return index zero');

const streakDate = new Date(2026, 7, 18, 12);
assert(activeDailyStreak({ streak: 4, lastDate: '2026-08-18' }, streakDate) === 4, 'A streak completed today should remain active');
assert(activeDailyStreak({ streak: 4, lastDate: '2026-08-17' }, streakDate) === 4, 'A streak completed yesterday should remain protectable');
assert(activeDailyStreak({ streak: 4, lastDate: '2026-08-16' }, streakDate) === 0, 'A streak should expire after a missed calendar day');
assert(activeDailyStreak(null, streakDate) === 0, 'Missing streak data should safely return zero');
assert(dailyRewardIndex(1) === 0, 'The first streak day should use the first daily reward');
assert(dailyRewardIndex(7) === 6, 'The seventh streak day should use the final daily reward');
assert(dailyRewardIndex(8) === 0, 'The daily reward track should restart after day seven');
assert(dailyRewardIndex(15) === 0, 'Long streaks should keep rotating through the reward track');

assert(formatDuration(59) === '59s', 'Short solve times should display in seconds');
assert(formatDuration(65) === '1:05', 'Longer solve times should display as minutes and padded seconds');
assert(bestTimeResult(0, 72, true).isNewRecord, 'A first completed solve should create a personal best');
assert(bestTimeResult(72, 61, true).bestTime === 61, 'A faster solve should replace the personal best');
assert(bestTimeResult(61, 80, true).bestTime === 61, 'A slower solve should keep the personal best');
assert(!bestTimeResult(61, 40, false).isNewRecord, 'An incomplete puzzle should not create a time record');

const shareResult = {
  found: 6,
  total: 6,
  stars: 3,
  elapsed: 65,
  streak: 4,
  kind: 'daily',
  url: 'https://play.google.com/store/apps/details?id=com.nenosafari',
};
const englishShare = buildVictoryShareText(shareResult, 'en');
const swahiliShare = buildVictoryShareText(shareResult, 'sw');
assert(englishShare.includes('Daily Puzzle: 6/6 words'), 'English share result should describe the completed Daily Puzzle');
assert(englishShare.includes('Time: 1:05'), 'Share result should include the formatted solve time');
assert(englishShare.includes('Streak: 4 days'), 'English share result should include the active streak');
assert(swahiliShare.includes('Fumbo la Leo: maneno 6/6'), 'Swahili share result should use localized puzzle copy');
assert(swahiliShare.includes('play.google.com'), 'Share result should include the public app link');

console.log('UI utility tests OK');
