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
http://127.0.0.1:5177/index.html?v=2
```

## Project Structure

```text
.
+-- index.html          # Main game, styles, data, and logic
+-- manifest.json       # PWA install metadata
+-- service-worker.js   # Offline cache
+-- app-icon.svg        # App icon
+-- docs/
    +-- PRODUCT.md
    +-- TECHNICAL.md
    +-- CONTENT_GUIDE.md
    +-- ROADMAP.md
```

## Important Files

- [index.html](./index.html): contains the full MVP UI, category data, puzzle generator, game state, language switch, scoring, and touch handling.
- [manifest.json](./manifest.json): defines app name, display mode, theme colors, and icon.
- [service-worker.js](./service-worker.js): caches the app for offline use.
- [docs/PRODUCT.md](./docs/PRODUCT.md): product vision and user experience.
- [docs/TECHNICAL.md](./docs/TECHNICAL.md): implementation notes and extension points.
- [docs/CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md): vocabulary and Swahili content rules.
- [docs/ROADMAP.md](./docs/ROADMAP.md): suggested upgrade path.

## Development Notes

This MVP intentionally avoids frameworks so it is easy to test and change. Later Android and iOS builds can reuse the same game rules and content model in Flutter, React Native, Capacitor, or another mobile stack.

When updating cached files, bump `CACHE_NAME` in `service-worker.js` so existing installs receive the new version.

## Status

MVP playable prototype.
