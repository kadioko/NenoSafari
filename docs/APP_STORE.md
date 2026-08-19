# App Store Preparation

> Next release: Neno Safari 2.13.0, Android build 38, updated August 19, 2026.

## Current Status

Neno Safari is live on Google Play as `com.nenosafari`.

Public listing: `https://play.google.com/store/apps/details?id=com.nenosafari`

Use this document for future store refreshes, iOS preparation, and screenshot/listing updates after live product changes.

## Current Android Release

**Version 2.13.0 (version code 38)**

This update makes rewards, replays, resumed puzzles, weekly rotation, and saved progress more reliable. It continues to target Android 16 / API 36.

## Working App Name

Neno Safari

## Short Description

Learn Tanzanian Swahili through fun word search puzzles.

## Longer Description

Neno Safari is a mobile-friendly Swahili vocabulary game inspired by Tanzania. Search for hidden Swahili words in themed puzzles about food, animals, cities, greetings, family, markets, transport, weather, culture, and national life. Learn meanings, pronunciation, and example sentences, then save useful words for focused review sprints.

## Key Features

- Swahili-first interface
- Optional English menu and translations
- Tanzania-themed word search puzzles
- Daily Puzzle and streak tracking
- Saved words with due-only spaced-review sprints
- Memory strength, recall ratings, and daily review rewards
- Recorded pronunciation for all 432 puzzle and Word-of-Day entries
- Mini quizzes after puzzles
- Coins, badges, and progress tracking
- Offline-friendly PWA
- Accessibility settings for motion and contrast

## Screenshot Checklist

Capture these screens on a small Android phone and a larger phone:

- Home screen
- Category screen
- Puzzle grid
- Word learning modal
- Victory screen with mini quiz
- Progress dashboard
- Rewards screen
- Settings screen

Legacy planning assets live in:

- `assets/screenshots/home.svg`
- `assets/screenshots/puzzle.svg`
- `assets/screenshots/progress.svg`

Do not upload the legacy SVG planning assets to a store. Use real Android captures or the generated PNG drafts as a review step before final device capture.

When Playwright is installed, generate browser-based draft screenshots with:

```powershell
npm run screenshots:store
```

Final Android/iOS store screenshots should still be captured on real or emulated devices before submission.

## Store Assets Needed

- 512x512 app icon
- Android adaptive icon set
- Splash screen assets
- Google Play feature graphic
- Phone screenshots
- Privacy policy URL
- Support email
- Category: Educational / Word / Puzzle
- Content rating questionnaire
- Public Google Play URL for launch posts and QR codes

Google Play listing copy and generated draft assets live in:

- `docs/PLAY_STORE_LISTING.md`
- `assets/play-store/`

## Mobile Build Docs

The production mobile path now lives in:

- `docs/MOBILE_APP.md`
- `docs/ANDROID_BETA.md`
- `docs/ANDROID_SIGNING.md`
- `docs/ANDROID_RELEASE_BUILD.md`

Use those docs for Capacitor build commands, Android beta testing, and store submission readiness.

## Android Build Notes

- Release builds use minification and resource shrinking.
- Release signing is configured through local-only files or environment variables.
- Version `2.13.0` uses version code `38`.
- `compileSdkVersion` and `targetSdkVersion` are both Android 16 / API 36.
- The verified upload bundle is `android/app/build/outputs/bundle/release/app-release.aab`.

## Release Notes Template

Version: 2.13.0 (38)

What's new:

- Added focused due-only review sprints for saved words.
- Added memory strength and honest recall actions.
- Added a protected daily reward for clearing due reviews.
- Improved bilingual review guidance and automated coverage.

For the next live update, use only changes that actually shipped and keep Play Console notes under the platform character limit.
