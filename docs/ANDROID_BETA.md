# Android Release Checklist

> Next release: Neno Safari 2.13.0, build 38, target API 36.

Use this checklist before sending Neno Safari to Google Play internal testing or uploading a live update.

The app is now public on Google Play as `com.nenosafari`, so the normal path is internal test first, then staged production rollout.

## Before Build

- Run `npm test`.
- Run `npm run test:browser`.
- Run `npm run test:phone`.
- Run `npm run audio:check`.
- Run `npm run cap:sync`.
- Confirm app version and release notes.
- Confirm no API keys are committed.
- Confirm `android/keystore.properties` exists locally or release signing environment variables are set before building a store release.
- Confirm `audio/` files are present locally if the build should include recorded pronunciation.

## Device QA

- Install on a small Android phone.
- Install on a larger Android phone.
- Finish one Classic puzzle.
- Finish one Daily Puzzle.
- Switch language to English and back to Swahili.
- Use every hint type.
- Save and review a difficult word.
- Complete a due-only review sprint and confirm the daily reward cannot be claimed twice.
- Confirm future review words show their next due time and a disabled Review action.
- Complete a quiz.
- Equip a shop cosmetic.
- Toggle high contrast.
- Toggle reduced motion.
- Turn on airplane mode and restart the app.

## Live Content QA

- Confirm new words have `sw`, `en`, and `ex`.
- Confirm long words fit the intended difficulty grid.
- Confirm examples are simple, respectful Tanzanian Swahili.
- Confirm Daily Puzzle and Word of the Day entries display correctly.
- Confirm the Play Store release notes match the actual changes.
- Confirm `CACHE_NAME` is bumped when cached app files change.

## Play Console Setup

Keep this section for new app setup history or future store account moves:

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

For live updates, use Play Console staged rollout after internal testing passes.

## Release Build

For Play Console internal testing, prefer an Android App Bundle:

```powershell
npm run cap:sync
cd android
.\gradlew.bat bundleRelease
```

Release signing setup is documented in `docs/ANDROID_SIGNING.md`.
The complete build, verification, and upload workflow is documented in `docs/ANDROID_RELEASE_BUILD.md`.

Current expected artifact metadata:

- Package: `com.nenosafari`
- Version: `2.13.0`
- Version code: `38`
- Target SDK: `36`
- Bundle: `android/app/build/outputs/bundle/release/app-release.aab`

## Beta Release Notes

### Version 2.13.0 (build 38)

```text
More reliable progress and rewards:
- Keep Daily and Weekly replay rewards fair
- Restore found words and grid highlights when resuming
- Rotate streak rewards and Weekly Challenges accurately
- Protect healthy progress when one saved field is damaged
```

### Version 2.12.0 (build 37)

```text
A better Timed challenge:
- Pause and resume directly from the countdown
- Keep the puzzle fully hidden while paused
- Return from another app without the timer restarting before you are ready
```

### Version 2.11.0 (build 36)

```text
Fair timing for every puzzle:
- Result times now count active play only
- Backgrounding the app or reading word details no longer hurts personal bests
- Resumed puzzles preserve accurate play time and progress
- Pronunciation hints now play recorded word audio
```

### Version 2.6.0 (build 31)

```text
Make every review count:
- Practice saved words in short, focused review sprints
- See memory strength and only review words when they are due
- Earn a daily coin reward for clearing your review queue
```

### Version 2.5.0 (build 29)

```text
Build a stronger Swahili memory:
- Saved words now return through smart spaced review
- Rate each word Again, Hard, or Got It
- Save words directly from the Quick Learn card
```

### Version 2.4.0 (build 28)

```text
Learn more without breaking your puzzle flow:
- Added compact Quick Learn cards during Classic, Daily, Weekly, and Timed games
- Added optional automatic pronunciation for found words
- Time Challenge now pauses when the app is in the background or word details are open
```

### Version 2.3.0 (build 27)

```text
A smoother Android learning experience:
- Added subtle touch feedback for word finds, rewards, and puzzle completion
- Added an on/off Touch Feedback setting
- Updated the Android app foundation for improved stability and security
```

### Version 2.2.1 (build 26)

```text
Compatibility update:
- Neno Safari now targets Android 16 (API 36)
- Ready for the August 2026 Google Play target API requirement
- Game, learning, and player progress are unchanged
```

### Version 2.2.0 (build 25)

```text
Practice and rewards are clearer in this update:
- Daily and Weekly replays are now practice runs, so rewards cannot be collected twice
- Previous Weekly Challenges expire automatically when a new week begins
- Improved reliability checks for rewards and practice progress
```

### Version 1.2.0

```text
More reasons to come back and learn:
- Added Weekly Safari Challenge
- Added 7-day reward calendar and comeback gift
- Added player levels and category mastery badges
- Added hard-word practice after hints and quiz misses
- Added shareable victory text
- Added Everyday Words and Safari & Parks categories
- Pronunciation MP3 audio now covers all 432 puzzle and Word-of-Day entries
```

### Version 1.1.0

```text
Fresh Swahili learning content is here.

What's new:
- Every current category now has 20 words
- Daily Puzzle has 30 Tanzania-themed seed words
- Word of the Day has 45 entries
- Pronunciation MP3 audio now covers all 200 category words
- Offline cache assets refreshed for the new content
```

### Version 1.0.10

- Added in-app release notes on the Upgrades screen.
- Added clearer tester-facing history for recent Android builds.
- Prepared release note copy for internal testing updates.

```text
Neno Safari beta is ready for first Android testing.

What's included:
- Tanzania-themed Swahili word search puzzles
- Swahili and English interface options
- Learning cards with meanings, examples, and pronunciation
- Daily Puzzle, rewards, saved words, and offline support

Please test puzzle selection, word dragging, audio, offline play, and accessibility settings.
```

## Live Update Notes

For live updates after the Google Play launch, keep notes short and player-facing:

```text
What's new:
- Added fresh Swahili vocabulary and more replay variety
- Improved Daily Puzzle and learning moments
- Polished progress, rewards, and offline-friendly play
```

### Version 1.1 Content Update

```text
What's new:
- Expanded every current category to 20 Swahili words
- Added more Daily Puzzle seed words
- Added more Word of the Day entries
- Refreshed offline cache assets for the new content
```
