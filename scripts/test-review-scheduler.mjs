import fs from 'node:fs';
import vm from 'node:vm';

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync('js/review-scheduler.js', 'utf8'), sandbox);
const scheduler = sandbox.window.NenoSafariReviewScheduler;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const now = new Date('2026-08-09T09:00:00.000Z');
const legacy = scheduler.normalizeSavedWord({ sw: 'UGALI', reviewed: 2 }, now);
assert(legacy.reviewLevel === 0, 'Legacy saves should start at review level zero');
assert(scheduler.isDue(legacy, now), 'Legacy saves should be due immediately');

const again = scheduler.scheduleReview(legacy, 'again', now);
assert(again.reviewLevel === 0, 'Again should reset the review level');
assert(new Date(again.nextReviewAt) - now === 10 * 60 * 1000, 'Again should return in ten minutes');

const hard = scheduler.scheduleReview(legacy, 'hard', now);
assert(new Date(hard.nextReviewAt) - now === 24 * 60 * 60 * 1000, 'Hard should return tomorrow');

const gotOnce = scheduler.scheduleReview(legacy, 'got', now);
assert(gotOnce.reviewLevel === 1, 'Got it should advance the review level');
assert(new Date(gotOnce.nextReviewAt) - now === 24 * 60 * 60 * 1000, 'First successful review should return tomorrow');

const gotTwice = scheduler.scheduleReview(gotOnce, 'got', now);
assert(gotTwice.reviewLevel === 2, 'A second success should advance the level again');
assert(new Date(gotTwice.nextReviewAt) - now === 3 * 24 * 60 * 60 * 1000, 'Second successful review should return in three days');

assert(scheduler.dueCount([legacy, gotOnce], now) === 1, 'Due count should only include ready words');
assert(scheduler.dueLabel(gotOnce, 'en', now) === 'Due tomorrow', 'English due label should describe tomorrow');
assert(scheduler.dueLabel(gotOnce, 'sw', now) === 'Rudia kesho', 'Swahili due label should describe tomorrow');
assert(scheduler.compareReviewPriority(legacy, gotOnce, now) < 0, 'Due words should sort before future words');

console.log('Review scheduler tests OK');
