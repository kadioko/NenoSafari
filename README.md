# Neno Safari

Neno Safari is a mobile-friendly Swahili vocabulary word search game inspired by Tanzania. Players find hidden Swahili words in themed puzzles, then learn each word through an English meaning, pronunciation guide, simple Swahili sentence, and optional cultural note.

The MVP is currently a static Progressive Web App (PWA) built in plain HTML, CSS, and JavaScript.

## Current MVP

- Playable word search puzzle grid
- 10 Tanzania-focused categories
- Touch and mouse selection
- Horizontal, vertical, diagonal, forward, and backward word placement
- Difficulty levels: Rahisi, Kati, Ngumu, Bingwa
- Modes: Classic, Learn, Timed, Daily
- Word learning modal
- English translation toggle
- Menu language switch: Kiswahili / English
- Hints: first letter, word highlight, meaning, pronunciation
- Score, stars, timer, progress, saved words
- PWA manifest and service worker for install/offline testing

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
http://127.0.0.1:5177/index.html?v=16
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
    +-- storage.js
    +-- accessibility.js
+-- manifest.json       # PWA install metadata
+-- package.json        # Local validation/test commands
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
```

## Important Files

- [index.html](./index.html): contains the MVP UI, game state, language switch, scoring, and touch handling.
- [js/content.js](./js/content.js): contains categories, vocabulary entries, badges, rewards, and learning copy.
- [js/daily-puzzles.js](./js/daily-puzzles.js): contains Tanzania-themed Daily Puzzle sets.
- [js/i18n.js](./js/i18n.js): contains Kiswahili and English UI copy.
- [js/offline-packs.js](./js/offline-packs.js): contains downloadable/offline puzzle pack metadata and install state helpers.
- [js/puzzle-engine.js](./js/puzzle-engine.js): contains deterministic random helpers, shuffling, and word-search grid generation.
- [js/storage.js](./js/storage.js): contains local progress save/load helpers.
- [js/accessibility.js](./js/accessibility.js): applies screen-reader labels and live-region attributes.
- [manifest.json](./manifest.json): defines app name, display mode, theme colors, and icon.
- [package.json](./package.json): provides local test commands with no external dependencies.
- [service-worker.js](./service-worker.js): caches the app for offline use.
- [docs/PRODUCT.md](./docs/PRODUCT.md): product vision and user experience.
- [docs/TECHNICAL.md](./docs/TECHNICAL.md): implementation notes and extension points.
- [docs/CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md): vocabulary and Swahili content rules.
- [docs/ROADMAP.md](./docs/ROADMAP.md): suggested upgrade path.
- [docs/PRIVACY.md](./docs/PRIVACY.md): draft privacy policy for the offline-first MVP.
- [docs/APP_STORE.md](./docs/APP_STORE.md): Android/iOS store listing and screenshot preparation notes.
- [docs/OFFLINE_PACKS.md](./docs/OFFLINE_PACKS.md): future content-pack plan for downloadable puzzle sets.
- [docs/AUDIO.md](./docs/AUDIO.md): recorded pronunciation audio plan and content format.
- [scripts/validate-content.mjs](./scripts/validate-content.mjs): checks vocabulary entries for basic quality issues.
- [scripts/test-puzzle-engine.mjs](./scripts/test-puzzle-engine.mjs): smoke tests for deterministic puzzle generation and placement rules.
- [scripts/test-storage.mjs](./scripts/test-storage.mjs): checks local progress save/load behavior.
- [scripts/test-offline-packs.mjs](./scripts/test-offline-packs.mjs): checks offline puzzle pack install state.
- [scripts/test-app-boot.mjs](./scripts/test-app-boot.mjs): dependency-free app boot and screen navigation smoke test.
- [scripts/test-browser-flow.mjs](./scripts/test-browser-flow.mjs): optional Playwright browser flow test.
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

## Status

MVP playable prototype.
