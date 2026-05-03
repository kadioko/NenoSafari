# Roadmap

## MVP Complete

- Static mobile-friendly PWA
- Playable word search grid
- 10 categories
- Difficulty levels
- Scoring and stars
- Hints
- Learning modal
- Translation toggle
- Kiswahili / English menu switch
- Progress and saved words in local storage

## Version 0.2

- Add quiz after puzzle completion
- Add saved words review screen
- Improve Daily Puzzle so it uses a stable date seed
- Add better category progress tracking
- Add more words per category
- Add better display names for multi-word places

## Version 0.3

- Add audio pronunciation
- Add more visual polish and success animations
- Add badges and coins
- Add settings screen
- Add accessibility improvements
- Add more Tanzania-themed daily puzzle sets

## Version 0.4

- Split code into multiple files
- Add automated tests for puzzle generation
- Add content validation script
- Add screenshots for app store preparation
- Add offline puzzle packs

## Mobile App Path

Recommended first production path:

1. Keep improving this PWA until the core loop feels right.
2. Wrap with Capacitor for Android testing.
3. Prepare Android icons, splash screens, privacy notes, and store listing.
4. Release Android beta.
5. Port same app shell to iOS through Capacitor or rebuild in Flutter/React Native if needed.
6. Keep web/PC as a PWA version.

## Production Readiness Checklist

- Confirm all vocabulary with a Tanzanian Swahili speaker.
- Add privacy policy.
- Add app store screenshots.
- Test on small Android phones.
- Test offline behavior after install.
- Confirm service worker updates behave correctly.
- Add analytics only after privacy policy is ready.

