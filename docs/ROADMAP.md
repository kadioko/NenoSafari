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
- Saved words review screen
- In-app upgrades and release plan screen
- Mini quiz prompt after completed puzzles
- 3-question mini quiz flow after puzzles
- Saved word category filter and clear control
- Stable seeded Daily Puzzle generation
- Display names for multi-word place names
- Daily Puzzle streak stat on the home screen
- Visible Daily Puzzle completion badge
- Dedicated Progress Dashboard
- Per-word saved review counts
- Expanded category vocabulary pack
- Richer category progress stats
- Mixed quiz question types
- Speech synthesis pronunciation button
- Coins and badge rewards
- Settings screen
- Accessibility settings for reduced motion and high contrast
- Progress recommendations
- Badge gallery and coin shop
- Advanced vocabulary pack
- Content validation script
- Automated puzzle generation smoke tests
- Draft privacy policy
- App store preparation guide
- Offline puzzle pack plan
- Puzzle content and engine split into separate files
- Translation copy split into a separate UI language file
- Local progress storage split into a separate helper file
- Storage save/load smoke test
- Dependency-free app boot smoke test
- Richer progress charts
- Adaptive recommendations from hints and quiz misses
- Flexible future multi-word display names
- Success burst animation polish
- Recorded pronunciation audio file support
- Larger cosmetic coin shop with equipped items
- Accessibility screen-reader labels
- Tanzania-themed Daily Puzzle sets
- Offline puzzle pack metadata and install-state helpers
- App store screenshot placeholder assets
- Deeper app boot smoke tests for progress, rewards, and accessibility
- Focused UI utility split
- Audio coverage checker for generated pronunciation MP3s
- Optional Playwright browser flow and store screenshot scripts

## Version 0.2

- Completed in local v15 build.

## Version 0.3

- Completed in local v16 build.

## Version 0.4

- Continue splitting UI code into focused files
- Replace placeholder screenshots with final real Android/iOS captures
- Add remote hosted pack downloads when a content server exists
- Install Playwright in CI to activate browser automation and screenshot capture

## Mobile App Path

Recommended first production path:

1. Keep improving this PWA until the core loop feels right.
2. Wrap with Capacitor for Android testing.
3. Prepare Android icons, splash screens, privacy notes, and store listing.
4. Release Android beta.
5. Port same app shell to iOS through Capacitor or rebuild in Flutter/React Native if needed.
6. Keep web/PC as a PWA version.

## Mobile App Path Progress

- Capacitor dependencies installed.
- Mobile web build script added.
- Capacitor config added for Android and future iOS.
- Android beta checklist added.
- Store/privacy docs updated for mobile release work.

## Production Readiness Checklist

- Confirm all vocabulary with a Tanzanian Swahili speaker.
- Review privacy policy with store/legal requirements before release.
- Capture final app store screenshots.
- Test on small Android phones.
- Test offline behavior after install.
- Confirm service worker updates behave correctly.
- Add analytics only after privacy policy is ready.
