# Roadmap

> Current completed release: Neno Safari 2.13.0, Android build 38.

## Live Status

Neno Safari is live on Google Play. The roadmap now prioritizes retention, content cadence, store quality, and safe app updates.

Public listing: `https://play.google.com/store/apps/details?id=com.nenosafari`

Current content inventory:

- 14 categories
- 227 base words
- 125 extra words
- 20 advanced words
- 372 total category words
- 30 Daily Puzzle seed words
- 45 Word of the Day entries

## Live Content Decision

Add more words to existing categories, Daily Puzzle, and Word of the Day before adding many new categories.

This is better for the live app because it improves replay value without overwhelming the category screen. New categories should come after existing categories feel deep enough and after the daily loop has enough variety.

Recent category expansions now live:

- Maneno ya Kila Siku
- Safari na Hifadhi
- Vitendo na Vitenzi
- Muda na Ratiba

## MVP Complete

- Static mobile-friendly PWA
- Playable word search grid
- 14 categories and 372 category vocabulary entries
- Difficulty levels
- Scoring and stars
- Hints
- Learning modal
- Translation toggle
- Kiswahili / English menu switch
- Progress and saved words in local storage
- Saved words review screen
- Spaced-review scheduling and due-only review sprints
- Memory strength and daily review completion rewards
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
- Home screen Smart Practice recommendations
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
- Browser-generated store screenshot drafts plus legacy planning assets
- Deeper app boot smoke tests for progress, rewards, and accessibility
- Focused UI utility split
- Audio coverage checker for generated pronunciation MP3s
- Optional Playwright browser flow and store screenshot scripts

## Version 0.2

- Completed in local v15 build.

## Version 0.3

- Completed in local v16 build.

## Version 0.4

- Completed: Split content, i18n, puzzle generation, storage, accessibility, offline packs, haptics, UI helpers, and review scheduling into focused files.
- Completed: Add Playwright browser automation and generated screenshot drafts.
- Remaining: Refresh final real Android screenshots after major visible releases.
- Deferred: Add remote hosted pack downloads only when a content server exists.

## Version 1.1 Live Retention

- Expanded Daily Puzzle seed words from 5 to 30.
- Expanded Word of the Day entries from 10 to 45.
- Raised every current category to 20 reviewed words.
- Collect player feedback from reviews, launch posts, and direct tester messages before adding analytics.
- Refresh Google Play screenshots if the first live UI changes.

## Version 1.2 Content Expansion

- Completed: Added a weekly themed challenge surface using existing content.
- Completed: Added in-app release notes.
- Completed: Added Maneno ya Kila Siku and Safari na Hifadhi.
- Completed: Added recorded pronunciation across all 432 puzzle and Word-of-Day entries.
- Completed: Packaged content and audio into offline-capable Android/PWA builds.

## Version 2.2 Reliability Update

- Completed: Daily and Weekly replays preserve the learning experience while making rewards one-time.
- Completed: Weekly Challenge state expires automatically when a new week begins.
- Completed: Added regression checks for reward eligibility and practice replay behavior.

## Version 2.2.1 Android Compatibility Update

- Completed: Target Android 16 / API 36 for Google Play update compliance before the August 2026 deadline.

## Version 2.3 Android Experience Update

- Completed: Update Capacitor and browser-test dependencies.
- Completed: Add native Android haptics with a web vibration fallback.
- Completed: Add bilingual touch-feedback controls and accessibility labels.
- Completed: Refresh the offline cache and automated regression coverage.

## Version 2.4 Learning Flow Update

- Completed: Keep Learn mode immersive while making other modes use a compact, non-blocking vocabulary card.
- Completed: Add optional automatic pronunciation for every found word.
- Completed: Pause timed play during Android backgrounding and detailed learning moments.
- Completed: Extend browser regression coverage for Quick Learn, settings persistence, and timer pausing.

## Version 2.5 Memory Practice Update

- Completed: Add a migration-safe spaced-review schedule for saved words.
- Completed: Prioritize due words and show bilingual next-review timing.
- Completed: Add Again, Hard, and Got It recall ratings.
- Completed: Add one-tap saving to the Quick Learn card.
- Completed: Show due-review counts in Smart Practice and protect the flow with automated tests.

## Version 2.6 Review Sprint Update

- Completed: Keep future words out of the active review queue until they are due.
- Completed: Add review-sprint progress and a clear all-caught-up state.
- Completed: Add a once-daily coin reward for clearing due reviews.
- Completed: Show memory strength on each saved word.
- Completed: Make saved-card review actions open recall practice instead of silently increasing mastery.

## Next Measured Update

Version 2.7 completed work:

- Rotate through all 45 Word-of-Day entries using a continuous calendar-day index.
- Add one-tap recorded pronunciation to the home Word-of-Day card.
- Use ISO week-year boundaries for Weekly Challenge rotation and saved-session expiry.
- Extend audio validation to Word-of-Day entries and reach 432/432 local MP3 coverage.
- Add focused date-boundary and full-cycle regression tests.

Version 2.8 completed work:

- Keep the completed Daily Goal in Today’s Safari until its 25-coin reward is claimed.
- Prioritize only due saved words and show their count directly on Home.
- Disable the Smart Practice review action when no words are due.
- Reset expired streak displays immediately so XP, missions, and reward state remain accurate.
- Add bilingual browser and logic regression coverage for the updated retention path.

Version 2.9 completed work:

- Save and display the fastest completed solve for each category.
- Show a clear new-personal-best result after a faster victory.
- Replace generic sharing with a spoiler-free bilingual result containing words, stars, time, streak, and the live Play Store link.
- Re-localize the victory result immediately when the menu language changes.
- Add replay, persistence, localization, and share-payload browser coverage.

Version 2.10 completed work:

- Show the shared three-hint budget and disable hint actions when it is empty.
- Keep consecutive hint types focused on one unresolved word and preserve that target across resume.
- Localize every hint control, counter, and feedback message in Kiswahili and English.
- Filter selected vocabulary by board size and use deterministic multi-pass placement to preserve intended word counts.
- Validate all enriched categories across every difficulty plus 100 beginner-grid seeds.
- Prevent duplicate touch and mouse listeners when a grid is rerendered.

Version 2.11 completed work:

- Measure personal bests and victory results using active puzzle time only.
- Pause the active clock while the app is backgrounded or detailed vocabulary is open.
- Preserve accumulated active time in resumable puzzle sessions.
- Play recorded word audio directly from pronunciation hints.
- Localize word-list learning feedback fully in Kiswahili and English.
- Add browser regression coverage for active timing, pause, resume, and saved-session accuracy.

Version 2.12 completed work:

- Add an explicit pause control to the Timed challenge countdown.
- Cover the puzzle and word list completely while timed play is paused.
- Keep backgrounded Timed games paused until the player explicitly resumes.
- Localize the protected pause screen and accessible timer labels.
- Add browser coverage for manual pause, protected return, keyboard focus, and resume.

- Observe player feedback on review timing, reward clarity, and saved-word usage before changing intervals.
- Refresh Google Play screenshots to show Quick Learn and the review sprint.
- Add more Daily and Weekly rotations only after Tanzanian Swahili review and matching audio are ready.
- Prioritize crash/ANR fixes and Play Console warnings above new feature work.
- Consider privacy-safe analytics only after updating the privacy policy and Play Data Safety declaration.

## First 90 Days Growth Roadmap

- Days 1-14: push founder/community launch posts, ask for first reviews, collect direct feedback, fix any Play Console crashes quickly.
- Days 15-30: refresh screenshots, publish a short trailer, run small organic campaigns around "word of the day" and category requests.
- Days 31-60: test tiny paid campaigns only after store conversion and screenshots look solid.
- Days 61-90: partner with Swahili teachers, travel creators, schools, and Tanzanian education/tech communities; ship one visible retention feature.

## Mobile App Path

Recommended first production path:

1. Keep improving this PWA until the core loop feels right.
2. Wrap with Capacitor for Android testing.
3. Prepare Android icons, splash screens, privacy notes, and store listing.
4. Release Android beta.
5. Publish Android on Google Play.
6. Port same app shell to iOS through Capacitor or rebuild in Flutter/React Native if needed.
7. Keep web/PC as a PWA version.

## Mobile App Path Progress

- Capacitor dependencies installed.
- Mobile web build script added.
- Capacitor config added for Android and future iOS.
- Android beta checklist added.
- Store/privacy docs updated for mobile release work.
- Android app published on Google Play as `com.nenosafari`.

## Production Readiness Checklist

- Confirm new vocabulary with a Tanzanian Swahili speaker before each content release.
- Review privacy policy with store/legal requirements before release.
- Capture final app store screenshots.
- Test on small Android phones.
- Test offline behavior after install.
- Confirm service worker updates behave correctly.
- Add analytics only after privacy policy is ready.
