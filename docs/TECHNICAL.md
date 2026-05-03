# Technical Notes

## Stack

The MVP is a static PWA:

- HTML
- CSS
- Vanilla JavaScript
- Web Storage through `localStorage`
- Service worker cache
- PWA manifest

No build step is required.

## Main Sections In `index.html`

- CSS variables and responsive layout
- Home, mode, category, game, and victory screens
- Word learning modal
- `CATEGORIES`: category and vocabulary data
- `UI_TEXT`: Kiswahili and English menu copy
- State object
- Persistence helpers
- Grid generation
- Touch/mouse selection
- Scoring, hints, and completion flow

Useful anchors:

- `const CATEGORIES`: vocabulary content
- `const UI_TEXT`: menu language copy
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

- `neno_score`
- `neno_puzzles`
- `neno_words`
- `neno_catprog`
- `neno_saved_words`
- `neno_show_translations`
- `neno_app_language`

## PWA Cache

Files cached:

- `./`
- `./index.html`
- `./manifest.json`
- `./app-icon.svg`

When changing app files, bump this value in `service-worker.js`:

```js
const CACHE_NAME = "neno-safari-v2";
```

## Future Refactor Ideas

- Split HTML, CSS, JS, and data into separate files.
- Move category data to JSON.
- Add tests for grid generation and word validation.
- Add audio files or text-to-speech for pronunciation.
- Wrap the PWA with Capacitor for Android/iOS.
- Move progress to cloud sync when accounts are added.

