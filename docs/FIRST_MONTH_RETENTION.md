# First-Month Retention Plan

> Updated for the Neno Safari 2.13.0 retention loop.

Neno Safari is past launch. The immediate goal is not more installs at any price; it is to make new players finish one puzzle, return tomorrow, and build a seven-day habit.

## Current Retention Baseline

Version `2.13.0` strengthens the local-first retention loop with reliable one-time rewards, safe practice replays, restored puzzle progress, protected timed pauses, personal-best replay targets, and due-review priority:

- A rotating Weekly Challenge on Home.
- A seven-day Daily Puzzle reward track.
- A 20-coin comeback gift after a missed day.
- Player level, category mastery, hard-word practice, and share cards.
- Everyday Words and Safari & Parks content.
- Quick Learn saving, spaced review, due-only review sprints, and memory strength.
- A protected once-daily coin reward for clearing due saved words.

Use build `38` for the next staged update. Promotion should show the real puzzle grid with visible hints, personal-best victory card, audible Word of the Day, due-review badge, and Weekly Challenge rather than older launch screenshots.

## Four-Week Operating Loop

### Week 1: Release And Learn

1. Run the release checklist in `docs/ANDROID_BETA.md`, upload version `2.13.0` build `38` to internal testing, then use a staged production rollout.
2. Add the player-facing version `2.13.0` notes from `docs/PLAY_STORE_LISTING.md`.
3. Ask every tester one question after their second play: "What would make you open Neno Safari tomorrow?"
4. Record Play Console installs, store visitors, crashes, ANRs, ratings, and feedback tags in `docs/LAUNCH_TRACKING.md`.

### Week 2: Make The Daily Loop Visible

1. Publish three organic posts that each show a real Daily Puzzle, streak, or Weekly Challenge moment.
2. Ask for a rating only after a completed puzzle or a positive direct message. Do not ask on first open.
3. Reply to every review and tag repeated feedback as `difficulty`, `content`, `audio`, `offline`, or `ui-confusing`.
4. Ship a small vocabulary/audio correction quickly when the same feedback appears more than once.

### Week 3: Small Paid Acquisition Test

1. Start one Google App campaign using the existing images and text assets.
2. Limit countries to Tanzania and Kenya for the first learning cycle.
3. Use a fixed low daily budget and run long enough to observe stable delivery; do not change creative, countries, and budget on the same day.
4. Pause promotion if crash/ANR signals worsen or reviews say the first session is confusing.

The full setup is in `docs/CHEAP_AD_TEST_PLAN.md` and `docs/GOOGLE_AD_TEXT_ASSETS.md`.

### Week 4: Decide The Next Release

Choose one improvement from evidence, in this order:

1. Fix any first-session confusion or reliability issue.
2. Add vocabulary to the most-requested theme.
3. Improve the Daily Puzzle reward or Weekly Challenge only if players understand and use the current one.
4. Add a new category only after the existing loop is working.

## Metrics That Drive Decisions

Until in-app analytics is deliberately added, Play Console and direct feedback are the source of truth.

| Measure | How To Use It | First Target |
| --- | --- | --- |
| Store visit to install conversion | Tests the Play listing and ad promise | Improve week over week; refresh listing if weak after meaningful traffic |
| New installs | Measures discovery | A steady weekly increase, not one large spike |
| Ratings and review themes | Detects trust and first-session problems | Earn useful feedback before scaling ad spend |
| Crashes and ANRs | Guardrail for every release and campaign | Keep clean; pause growth work when they rise |
| Daily Puzzle / challenge feedback | Proxy for repeat-play motivation | Look for unsolicited mentions, repeat screenshots, and return comments |

Do not pretend the app has exact D1/D7 retention data yet. Adding Firebase Analytics or another SDK changes the app's data practices and must come with updated Privacy Policy and Play Data Safety declarations before release.

## The Player Habit We Are Building

1. First play: finish a short, satisfying puzzle and learn useful words.
2. Tomorrow: see the Daily Puzzle, a streak, and a claimable reward.
3. This week: finish one themed Weekly Challenge and earn a badge.
4. After a missed day: return without shame through the comeback gift.
5. After saving a word: return when it is due, finish a short review sprint, and see memory strength grow.

Every post, screenshot, ad, and store sentence should reinforce this loop: "Play a quick Swahili puzzle, save a useful word, and come back to strengthen it."

## Play Console Confirmation

Google Play public pages generally show the latest update date, not a reliable first-production-release date. To confirm the original launch timing, open Play Console, select Neno Safari, then open **Release > Production** and read the oldest production release's "Started rollout" date. Add that date to the weekly scorecard so launch-age comparisons stay accurate.
