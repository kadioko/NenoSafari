# Technical Notes

> Current technical baseline: Neno Safari 2.13.0, cache v58, Android build 38, target API 36.

## Live App Notes

Neno Safari is live on Google Play through the Capacitor Android wrapper. Keep changes small, run the local checks before release builds, and bump the service worker cache name whenever cached app files change.

The current release adds a migration-safe review scheduler, due-only review sprints, memory strength, and a once-daily review reward. Existing saved words are normalized as due without deleting player progress.

## Stack

The MVP is a static PWA:

- HTML
- CSS
- Vanilla JavaScript
- Web Storage through `localStorage`
- Service worker cache
- PWA manifest
- Capacitor Android/iOS shell
- Capacitor App and Haptics plugins
- Capacitor Haptics with a vibration fallback
- Playwright for real browser flow tests and screenshot drafts

The web app can run directly from a static server. Android/iOS packaging requires `npm run cap:sync`; Android release output is built with Gradle.

## Main Sections In `index.html`

- CSS variables and responsive layout
- Home, mode, category, game, and victory screens
- Word learning modal
- `js/content.js`: category, vocabulary, badge, reward, and learning data
- `js/i18n.js`: Kiswahili and English menu copy
- `js/daily-puzzles.js`: Daily Puzzle rotations and display names
- `js/puzzle-engine.js`: deterministic grid generation and placement
- `js/storage.js`: local save/load boundaries
- `js/review-scheduler.js`: saved-word normalization, due checks, intervals, and ordering
- `js/offline-packs.js`: Cache API pack installation and state
- `js/accessibility.js`: labels and live-region setup
- `js/ui-utils.js`: dates, display names, audio paths, and pronunciation helpers
- `js/haptics.js`: native touch feedback with web fallback
- State object
- Persistence helpers
- Grid generation
- Touch/mouse selection
- Scoring, hints, and completion flow

Useful anchors:

- `window.NenoSafariContent`: vocabulary, daily words, rewards, and shop data
- `window.NenoSafariI18n`: menu language copy
- `window.NenoSafariHaptics`: optional native/web touch feedback
- `window.NenoSafariReviewScheduler`: spaced-review rules and due-state helpers
- `generateGrid(words, size)`: puzzle generation
- `startGame(category)`: puzzle setup
- `checkWord(path)`: validates selections
- `showWordModal(wordObj)`: learning card
- `setAppLanguage(lang)`: menu language switching

## Data Model

Each word entry currently uses:

```js
{
  sw: "UGALI",
  en: "Maize porridge / staple meal",
  ex: "Ninakula ugali na samaki kila siku.",
  note: "Ugali ni chakula kikuu cha Tanzania."
}
```

Optional field:

```js
pron: "oo-GAH-lee"
```

Other supported optional fields include `display`, `parts`, `note`, and `audio`. Saved review records add `reviewed`, `reviewLevel`, `lastReviewed`, and `nextReviewAt` locally; these are player-state fields, not source vocabulary fields.

If `pron` is missing, the game creates a simple fallback pronunciation hint.

## Grid Rules

The generator:

- Creates an empty grid.
- Sorts selected words from longest to shortest.
- Places words in allowed directions based on difficulty.
- Allows overlap only when letters match.
- Fills blank cells with random letters.

Difficulty direction rules:

- Rahisi: right and down
- Kati: right, down, diagonal, and left
- Ngumu/Bingwa: all 8 directions

## Persistence

Stored in `localStorage`:

- score, coins, puzzle count, and words found
- badges, owned/equipped cosmetics, category mastery, and learning signals
- active puzzle, Daily/Weekly completion state, streaks, goals, and comeback gifts
- saved words, spaced-review timestamps/levels, hard-word signals, and daily review reward date
- language, translation visibility, audio, auto-pronunciation, haptics, motion, contrast, and onboarding preferences

`js/storage.js` owns the concrete `neno_*` keys. New persisted fields require save, load, fallback defaults, and `scripts/test-storage.mjs` coverage.

## PWA Cache

Files cached:

- `./`
- `./index.html`
- `./manifest.json`
- `./app-icon.svg`

When changing app files, bump this value in `service-worker.js`:

```js
const CACHE_NAME = "neno-safari-v58";
```

The current cache is `neno-safari-v58`. Script query versions only need to move when their script contents change; the cache name must move whenever any precached asset changes.

## Release Verification

Run:

```powershell
npm test
npm run test:browser
npm run test:phone
npm run audio:check
npm audit --omit=dev
npm run cap:sync
cd android
.\gradlew.bat bundleRelease assembleDebug
```

Current Android metadata: package `com.nenosafari`, version `2.13.0`, version code `38`, compile/target API `36`.

The Capacitor mobile build includes runtime theme art and pronunciation audio. Campaign artwork, Play Store graphics, and generated screenshots remain in the repository but are excluded from `www/` and the Android bundle because the game does not use them at runtime.

## Future Refactor Ideas

- Continue moving large `index.html` UI sections into focused modules when ownership is clear.
- Consider JSON/remote content packs only when a trusted content delivery service exists.
- Add CI artifact retention for Playwright screenshots and Android build reports.
- Continue using Capacitor for Android and future iOS.
- Move progress to cloud sync when accounts are added.
