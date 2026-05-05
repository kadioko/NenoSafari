# Android Beta Checklist

Use this checklist before sending Neno Safari to Google Play internal testing.

## Before Build

- Run `npm test`.
- Run `npm run audio:check`.
- Run `npm run cap:sync`.
- Confirm app version and release notes.
- Confirm no API keys are committed.
- Confirm `audio/` files are present locally if the build should include recorded pronunciation.

## Device QA

- Install on a small Android phone.
- Install on a larger Android phone.
- Finish one Classic puzzle.
- Finish one Daily Puzzle.
- Switch language to English and back to Swahili.
- Use every hint type.
- Save and review a difficult word.
- Complete a quiz.
- Equip a shop cosmetic.
- Toggle high contrast.
- Toggle reduced motion.
- Turn on airplane mode and restart the app.

## Play Console Setup

- Create app listing.
- Upload app icon.
- Upload feature graphic.
- Upload real phone screenshots.
- Add short and full descriptions.
- Add privacy policy URL.
- Complete Data Safety form.
- Complete content rating questionnaire.
- Create an internal testing release.
- Add tester emails or tester group.

## Beta Release Notes

```text
Neno Safari beta is ready for first Android testing.

What's included:
- Tanzania-themed Swahili word search puzzles
- Swahili and English interface options
- Learning cards with meanings, examples, and pronunciation
- Daily Puzzle, rewards, saved words, and offline support

Please test puzzle selection, word dragging, audio, offline play, and accessibility settings.
```
