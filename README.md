# Neno Safari

> Documentation status: Neno Safari 2.13.0, Android build 38, updated August 19, 2026.

Neno Safari is a mobile-friendly Swahili vocabulary word search game inspired by Tanzania. Players find hidden Swahili words in themed puzzles, then learn each word through an English meaning, pronunciation guide, simple Swahili sentence, and optional cultural note.

The app is live on Google Play as a Capacitor-wrapped static Progressive Web App (PWA) built in plain HTML, CSS, and JavaScript. The same app shell can continue to support Android, future iOS, and web/PWA releases.

Public Android listing: `https://play.google.com/store/apps/details?id=com.nenosafari`

## Latest Release: 2.13.0 (build 38)

- Daily and Weekly practice replays can no longer duplicate coins, score, badges, or mastery.
- Completed boards are recognized correctly even when the final word lands as the timer expires.
- Resumed puzzles restore found words and their highlighted grid cells.
- Daily rewards rotate correctly beyond day seven and remain claimable after a restarted streak.
- Weekly Challenges advance reliably every calendar week and all challenge words resolve to playable vocabulary.
- Corrupt saved fields are isolated instead of wiping otherwise healthy player progress.
- Timed play now has a visible pause control and a full-screen protected pause state.
- Returning from another app stays paused until the player explicitly resumes.
- Personal-best and victory times now count active puzzle play only.
- Backgrounding the app and reading detailed vocabulary no longer inflate solve times.
- Resumable puzzles preserve their accumulated active time accurately.
- Pronunciation hints now play the recorded word audio.
- Word-list feedback now follows the selected Kiswahili or English menu language.
- Saved-word practice is now a finite due-only review sprint with progress and a clear completion state.
- Completing the first review sprint of the day awards up to 20 coins without creating a repeat-reward exploit.
- Saved cards now show memory strength, and their Review action only opens honest recall practice when due.
- Added spaced review for saved words with due-first ordering and 1, 3, 7, 14, 30, and 60-day intervals.
- Added Again, Hard, and Got It recall ratings with clear bilingual next-review labels.
- Added one-tap saving directly from the compact Quick Learn card.
- Smart Practice now shows how many saved words are due for review.
- Added a non-blocking Quick Learn card for Classic, Daily, Weekly, and Timed play while preserving the full learning card in Learn mode.
- Added optional automatic pronunciation using the complete recorded audio library.
- Time Challenge now pauses while Android backgrounds the app or a player opens word details.
- Added optional native touch feedback for word finds, rewards, missed selections, and puzzle completion.
- Added a bilingual Touch Feedback setting and screen-reader label.
- Updated Capacitor, Android/iOS platform packages, and Playwright; refreshed non-breaking vulnerable transitive packages.
- Updated Android target compatibility to Android 16 / API 36 for the August 2026 Google Play requirement.
- Daily and Weekly puzzle replays are now practice-only. Players can still revisit words and pronunciation, but cannot collect the same score, coins, completion, or perfect-quiz rewards twice.
- Weekly Challenges saved from a previous week now expire automatically when the new week begins.
- Added regression coverage for reward eligibility and practice replay behavior.

The Play Console upload artifact for this release is the signed Android App Bundle at `android/app/build/outputs/bundle/release/app-release.aab` after a successful release build.

## Current MVP

- Playable word search puzzle grid
- 14 Tanzania-focused categories
- 372 total category vocabulary entries across base, extra, and advanced pools
- Touch and mouse selection
- Horizontal, vertical, diagonal, forward, and backward word placement
- Difficulty levels: Rahisi, Kati, Ngumu, Bingwa
- Modes and surfaces: Classic, Learn, Timed, Daily, and Weekly Challenge
- Full learning modal plus non-blocking Quick Learn cards
- English translation toggle
- Menu language switch: Kiswahili / English
- Hints: first letter, word highlight, meaning, pronunciation
- Score, stars, timer, progress, saved words, spaced review, and memory strength
- PWA manifest and service worker for install/offline testing

## Live Product Direction

Neno Safari is now in live-ops mode. The best next retention move is to add more depth to the existing categories, Daily Puzzle, and Word of the Day pools before adding many new categories. New categories should be introduced only when they create a clearly different play reason, such as everyday beginner words or safari/national-park vocabulary.

See [docs/LIVE_OPS.md](./docs/LIVE_OPS.md) for the live content strategy and release cadence.
See [docs/FIRST_MONTH_RETENTION.md](./docs/FIRST_MONTH_RETENTION.md) for the post-launch retention and measured-growth routine.
See [docs/GROWTH_MARKETING.md](./docs/GROWTH_MARKETING.md) for the launch advertising and user acquisition plan.
See [docs/LAUNCH_KIT.md](./docs/LAUNCH_KIT.md) for ready-to-post launch copy and outreach scripts.
See [docs/LAUNCH_TRACKING.md](./docs/LAUNCH_TRACKING.md) for Play Console metrics and feedback tracking.
See [docs/CHEAP_AD_TEST_PLAN.md](./docs/CHEAP_AD_TEST_PLAN.md) for the first low-budget paid acquisition experiment.
See [docs/GOOGLE_AD_TEXT_ASSETS.md](./docs/GOOGLE_AD_TEXT_ASSETS.md) for Google App campaign headlines and descriptions.

## Run Locally

From this folder:

```powershell
python -m http.server 5177 -b 127.0.0.1
```

Open:

```text
http://127.0.0.1:5177/index.html
```

If the browser shows an older cached version, use:

```text
http://127.0.0.1:5177/index.html?v=57
```

## Project Structure

```text
.
+-- index.html          # Main game, styles, data, and logic
+-- js/
    +-- content.js
    +-- daily-puzzles.js
    +-- i18n.js
    +-- offline-packs.js
    +-- puzzle-engine.js
    +-- review-scheduler.js
    +-- storage.js
    +-- accessibility.js
    +-- haptics.js
+-- manifest.json       # PWA install metadata
+-- package.json        # Local validation/test commands
+-- capacitor.config.json # Capacitor mobile app settings
+-- service-worker.js   # Offline cache
+-- app-icon.svg        # App icon
+-- scripts/
    +-- validate-content.mjs
    +-- test-puzzle-engine.mjs
+-- docs/
    +-- PRODUCT.md
    +-- TECHNICAL.md
    +-- CONTENT_GUIDE.md
    +-- ROADMAP.md
    +-- PRIVACY.md
    +-- APP_STORE.md
    +-- OFFLINE_PACKS.md
    +-- AUDIO.md
    +-- MOBILE_APP.md
    +-- ANDROID_BETA.md
    +-- ANDROID_SIGNING.md
    +-- ANDROID_RELEASE_BUILD.md
    +-- LIVE_OPS.md
    +-- FIRST_MONTH_RETENTION.md
    +-- GROWTH_MARKETING.md
    +-- LAUNCH_KIT.md
    +-- LAUNCH_TRACKING.md
    +-- CHEAP_AD_TEST_PLAN.md
    +-- GOOGLE_AD_TEXT_ASSETS.md
    +-- CHEAT_CODES.example.md
    +-- RELEASE_NOTES_2.6.0_BUILD31.md
    +-- RELEASE_NOTES_2.13.0_BUILD38.md
```

## Important Files

- [index.html](./index.html): contains the MVP UI, game state, language switch, scoring, and touch handling.
- [js/content.js](./js/content.js): contains categories, vocabulary entries, badges, rewards, and learning copy.
- [js/daily-puzzles.js](./js/daily-puzzles.js): contains Tanzania-themed Daily Puzzle sets.
- [js/i18n.js](./js/i18n.js): contains Kiswahili and English UI copy.
- [js/offline-packs.js](./js/offline-packs.js): contains downloadable/offline puzzle pack metadata and install state helpers.
- [js/puzzle-engine.js](./js/puzzle-engine.js): contains deterministic random helpers, shuffling, and word-search grid generation.
- [js/review-scheduler.js](./js/review-scheduler.js): contains spaced-review migration, scheduling, due-state, and ordering helpers.
- [js/storage.js](./js/storage.js): contains local progress save/load helpers.
- [js/accessibility.js](./js/accessibility.js): applies screen-reader labels and live-region attributes.
- [js/haptics.js](./js/haptics.js): provides optional Capacitor haptics with a web vibration fallback.
- [manifest.json](./manifest.json): defines app name, display mode, theme colors, and icon.
- [package.json](./package.json): provides local test commands with no external dependencies.
- [service-worker.js](./service-worker.js): caches the app for offline use.
- [docs/PRODUCT.md](./docs/PRODUCT.md): product vision and user experience.
- [docs/TECHNICAL.md](./docs/TECHNICAL.md): implementation notes and extension points.
- [docs/CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md): vocabulary and Swahili content rules.
- [docs/ROADMAP.md](./docs/ROADMAP.md): suggested upgrade path.
- [docs/PRIVACY.md](./docs/PRIVACY.md): privacy policy for the live Android app and PWA.
- [docs/APP_STORE.md](./docs/APP_STORE.md): Android/iOS store listing and screenshot preparation notes.
- [docs/OFFLINE_PACKS.md](./docs/OFFLINE_PACKS.md): future content-pack plan for downloadable puzzle sets.
- [docs/AUDIO.md](./docs/AUDIO.md): recorded pronunciation audio plan and content format.
- [docs/MOBILE_APP.md](./docs/MOBILE_APP.md): Capacitor Android/iOS build path and device QA flow.
- [docs/ANDROID_BETA.md](./docs/ANDROID_BETA.md): Google Play internal testing checklist.
- [docs/ANDROID_SIGNING.md](./docs/ANDROID_SIGNING.md): release signing setup without committing secrets.
- [docs/ANDROID_RELEASE_BUILD.md](./docs/ANDROID_RELEASE_BUILD.md): authoritative build, verification, and Google Play upload workflow.
- [docs/LIVE_OPS.md](./docs/LIVE_OPS.md): live retention, content cadence, and post-launch content priorities.
- [docs/FIRST_MONTH_RETENTION.md](./docs/FIRST_MONTH_RETENTION.md): four-week retention operations and decision metrics.
- [docs/GROWTH_MARKETING.md](./docs/GROWTH_MARKETING.md): launch positioning, advertising channels, and user acquisition experiments.
- [docs/LAUNCH_KIT.md](./docs/LAUNCH_KIT.md): ready-to-use launch posts, outreach messages, and review asks.
- [docs/LAUNCH_TRACKING.md](./docs/LAUNCH_TRACKING.md): weekly Play Console scorecard, channel log, and feedback tags.
- [docs/CHEAP_AD_TEST_PLAN.md](./docs/CHEAP_AD_TEST_PLAN.md): low-budget paid install test plan across Google, Meta, TikTok, and Reddit.
- [docs/GOOGLE_AD_TEXT_ASSETS.md](./docs/GOOGLE_AD_TEXT_ASSETS.md): 5 Google App campaign headlines and 5 descriptions.
- [docs/CHEAT_CODES.example.md](./docs/CHEAT_CODES.example.md): safe instructions for the hidden local developer menu without publishing real codes.
- [docs/RELEASE_NOTES_2.6.0_BUILD31.md](./docs/RELEASE_NOTES_2.6.0_BUILD31.md): verified artifact metadata and paste-ready Google Play notes for build 31.
- [docs/RELEASE_NOTES_2.13.0_BUILD38.md](./docs/RELEASE_NOTES_2.13.0_BUILD38.md): verified signed AAB metadata, hashes, phone QA, and paste-ready Google Play notes for build 38.
- [scripts/validate-content.mjs](./scripts/validate-content.mjs): checks vocabulary entries for basic quality issues.
- [scripts/test-puzzle-engine.mjs](./scripts/test-puzzle-engine.mjs): smoke tests for deterministic puzzle generation and placement rules.
- [scripts/test-storage.mjs](./scripts/test-storage.mjs): checks local progress save/load behavior.
- [scripts/test-review-scheduler.mjs](./scripts/test-review-scheduler.mjs): checks spaced-review intervals, due labels, and queue ordering.
- [scripts/test-haptics.mjs](./scripts/test-haptics.mjs): checks native and fallback touch-feedback behavior.
- [scripts/test-offline-packs.mjs](./scripts/test-offline-packs.mjs): checks offline puzzle pack install state.
- [scripts/test-app-boot.mjs](./scripts/test-app-boot.mjs): dependency-free app boot and screen navigation smoke test.
- [scripts/test-browser-flow.mjs](./scripts/test-browser-flow.mjs): optional Playwright browser flow test.
- [scripts/test-phone-layout.mjs](./scripts/test-phone-layout.mjs): checks ten screens in both languages across four phone viewport sizes.
- [scripts/capture-store-screenshots.mjs](./scripts/capture-store-screenshots.mjs): optional Playwright store screenshot capture.
- [scripts/check-audio.mjs](./scripts/check-audio.mjs): verifies generated MP3 pronunciation files.

## Development Notes

This MVP intentionally avoids frameworks so it is easy to test and change. Later Android and iOS builds can reuse the same game rules and content model in Flutter, React Native, Capacitor, or another mobile stack.

When updating cached files, bump `CACHE_NAME` in `service-worker.js` so existing installs receive the new version.

Validate vocabulary content with:

```powershell
node .\scripts\validate-content.mjs
```

Run the puzzle engine smoke tests with:

```powershell
node .\scripts\test-puzzle-engine.mjs
```

Run all local checks with:

```powershell
npm test
npm run test:browser
npm run test:phone
```

Generate ElevenLabs pronunciation files with:

```powershell
$env:ELEVENLABS_API_KEY="your-key"
$env:ELEVENLABS_VOICE_ID="your-voice-id"
npm run audio:elevenlabs
```

Check generated audio coverage with:

```powershell
npm run audio:check
```

Capture real app-store screenshot files when Playwright is installed:

```powershell
npm run screenshots:store
```

Build the Capacitor web bundle for Android/iOS:

```powershell
npm run mobile:build
```

Create or sync the Android wrapper:

```powershell
npm run android:add
npm run cap:sync
```

Build a Play Store release bundle after local signing is configured:

```powershell
cd android
.\gradlew.bat bundleRelease
```

## Status

Live on Google Play under package `com.nenosafari`. The next maintained upload build is `2.13.0` (build 38), targeting Android API 36. Current focus: reliable rewards, resilient progress, fair replay behavior, and safe staged updates.
