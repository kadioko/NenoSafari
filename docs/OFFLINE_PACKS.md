# Offline Puzzle Packs

> Current implementation baseline: bundled content packs, Cache API storage, and service-worker cache v58.

Offline packs are bundled groups of puzzle content and theme assets. The current app caches the shell with a service worker and can explicitly install or remove optional pack assets through the Cache API.

## Live Content Packaging

Because Neno Safari is now live, content packs should support retention without requiring a backend. Prefer small bundled updates first:

- Daily refresh pack: more Daily Puzzle and Word of the Day entries.
- Category depth pack: extra and advanced words for the current 14 categories.
- Challenge pack: weekly themed puzzle sets assembled from existing words.

Add brand-new category packs only after the daily and category-depth pools feel large enough.

## Starter Pack

Included for all players:

- Vyakula vya Tanzania
- Salamu na Mazungumzo
- Wanyama wa Tanzania
- Familia

## Tanzania Travel Pack

For tourists and travelers:

- Miji na Maeneo
- Usafiri
- Biashara na Sokoni
- Mazingira na Hali ya Hewa

## Culture Pack

For culture-focused learning:

- Utamaduni wa Tanzania
- Historia na Taifa
- Daily Tanzania words
- Proverbs and common sayings

## Advanced Learner Pack

For intermediate players:

- longer words
- reverse and diagonal-heavy puzzles
- sentence completion quizzes
- topic review challenges

## Future Pack Expansion

The first category candidates are already live. Future packs should create a distinct learning reason, such as:

- school/classroom vocabulary reviewed with educators
- regional travel and geography vocabulary
- advanced conversation or proverb practice with cultural review

## Pack Data Shape

Future pack files can use this shape:

```json
{
  "id": "starter",
  "name": "Starter Pack",
  "categories": ["chakula", "salamu", "wanyama", "familia"],
  "minAppVersion": "1.0.0"
}
```

## Offline Requirements

- Pack data should be cached by the service worker.
- Audio packs should be optional because they can be large.
- The app should show which packs are installed.

## Current Implementation

`js/offline-packs.js` defines Starter, Travel, Culture, and Daily packs, tracks install state in local storage, and caches each pack's bundled content/theme assets through the Cache API. The service worker uses cache v58. Remote JSON/audio downloads remain deferred until a trusted content server, integrity/version rules, and failure recovery are designed.
