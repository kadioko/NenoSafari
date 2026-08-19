# Live Operations Plan

> Next upload baseline: Neno Safari 2.13.0, Android build 38.

Neno Safari is now live on Google Play. From this point, the product goal is not just adding content; it is giving players a reason to return, finish one more puzzle, and feel their Swahili is improving.

Public listing: `https://play.google.com/store/apps/details?id=com.nenosafari`

## Current Content Inventory

- 14 live categories
- 227 base vocabulary entries
- 125 extra vocabulary entries
- 20 advanced vocabulary entries
- 372 total category vocabulary entries
- 30 Daily Puzzle seed words
- 45 Word of the Day entries

## Content Decision

Prioritize more words inside the current categories before adding many new categories.

Why:

- Existing categories already teach clear themes that players understand quickly.
- More words deepen replay value without making the home/category screen feel crowded.
- Extra and advanced words let the same category feel fresh across difficulty levels.
- Daily Puzzle and Word of the Day need more depth than the category menu does.
- New categories are best when they unlock a clearly different player fantasy, not just more labels.

## Best Next Content Move

The app already has Weekly Challenge, in-app release notes, and the first four category expansions. For the next live content update, work in this order:

1. Add reviewed Daily Puzzle and Word of the Day rotations without duplicating recent themes.
2. Correct any vocabulary, example, or pronunciation issue reported by players.
3. Deepen the most-played or most-requested existing category.
4. Add another category only when feedback proves a distinct learning need.

Already live and no longer roadmap candidates:

- Maneno ya Kila Siku: everyday objects, home, school, and simple verbs.
- Safari na Hifadhi: national parks, animals, landscapes, camping, and tourism words.
- Vitendo na Vitenzi: everyday verbs and actions.
- Muda na Ratiba: time and routine vocabulary.

## Live Retention Priorities

- Day 1 hook: make the first completed puzzle feel rewarding and easy to understand.
- Day 2 hook: give a clear Daily Puzzle streak reason to come back.
- Day 3 hook: show progress toward a badge, category mastery, or saved-word review.
- Week 1 hook: rotate themed challenges so the app feels alive even without accounts or online services.
- Ongoing learning hook: bring saved words back only when due and make short review sprints feel achievable.

## Release Cadence

Use small, safe content releases:

- Weekly: add or rotate Daily Puzzle / Word of the Day entries.
- Biweekly: add 10-20 reviewed vocabulary entries.
- Monthly: add a new themed challenge, pack, or category if quality is ready.

Every live content release should run:

```powershell
npm test
npm run audio:check
npm run mobile:build
npm run cap:sync
```

If app files change, bump `CACHE_NAME` in `service-worker.js` so existing installs receive the update.

## Content Quality Gate

Before shipping new vocabulary:

- Confirm Tanzanian Swahili usage.
- Keep beginner words short and common.
- Include simple example sentences.
- Avoid sensitive political claims or stereotypes.
- Check that long words fit target grid sizes.
- Add or plan pronunciation audio for high-value new words.

## What To Measure Manually First

Until analytics are added, use Play Console signals and tester/player feedback:

- Store listing visits to installs
- Crashes and ANRs
- Uninstalls after first install
- Reviews mentioning confusion, content, audio, or difficulty
- Reviews or direct feedback mentioning saved words, review timing, or memory strength
- Requests for specific word themes
- Downloads by country and source where Play Console exposes them
- Rating count and review quality
- Which launch posts or communities drive visible download bumps

Only add analytics after the privacy policy and Data Safety answers are updated.

## Review And Feedback Loop

During the first live month, ask players for feedback in human channels first:

- "Which word or category should we add next?"
- "Was any Swahili example confusing?"
- "Did the puzzle feel too easy, too hard, or just right?"
- "What would make you open it again tomorrow?"

Turn repeated feedback into small releases. Publicly thank communities when a content update ships because of their suggestions.
