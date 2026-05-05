# Offline Puzzle Packs

Offline packs are groups of puzzle content that can ship with the app. The current MVP already caches the app shell with a service worker. These packs define how vocabulary can be organized for future releases.

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

