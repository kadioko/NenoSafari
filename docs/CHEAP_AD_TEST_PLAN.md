# Cheap Paid Ads Test Plan

> Product baseline: Neno Safari 2.13.0, Android build 38. Reconfirm budgets and platform rules before spending.

Public listing: `https://play.google.com/store/apps/details?id=com.nenosafari`

Goal: spend a small amount to learn which message and creative can produce real Android installs without pretending this is a scaled campaign.

Google Ads text assets live in `docs/GOOGLE_AD_TEXT_ASSETS.md`.

Before starting a campaign, confirm the public Play listing is serving version `2.13.0` or later and that screenshots show the same UI players receive after installation.

## Recommendation

Run Google Ads first.

Why:

- Neno Safari is live on Google Play, so Google Ads can send users directly to the Play listing.
- App campaigns support install-focused bidding and target cost per install.
- The app currently has no third-party analytics or ad SDK, so Play Console plus Google Ads is the cleanest first attribution path.

Do not start with TikTok or Reddit paid ads for a cheap test. TikTok's official budget floor is above a tiny experiment, and Reddit recommends higher ad group budgets than this first stage should carry.

## Test 1: Google Ads App Installs

Budget:

- USD 10/day
- 7 days
- Max total: USD 70

Campaign:

- Objective: App promotion
- Subtype: App installs
- Platform: Android
- App: Neno Safari / `com.nenosafari`
- Optimization: Install volume / all users
- Bid: start with target CPI if Google gives useful guidance; otherwise use maximize installs with the hard daily budget.

Countries:

- Tanzania
- Kenya
- United States
- United Kingdom
- Canada
- Germany

Creative assets:

- `assets/ad-campaign/feed-01-learn-swahili-1080x1080.png`
- `assets/ad-campaign/feed-02-find-words-1080x1080.png`
- `assets/ad-campaign/feed-03-free-offline-1080x1080.png`
- `assets/ad-campaign/feed-04-tanzania-travel-1080x1080.png`

Vertical creative assets for Meta/TikTok/Reels/Stories:

- `assets/ad-campaign/story-01-start-safari-1080x1920.png`
- `assets/ad-campaign/story-02-word-challenge-1080x1920.png`
- `assets/ad-campaign/story-03-pronunciation-1080x1920.png`
- `assets/ad-campaign/story-04-daily-progress-1080x1920.png`

Short text ideas:

```text
Learn Swahili with quick word-search puzzles.
```

```text
Find Kiswahili words. Learn meanings and pronunciation.
```

```text
Free Tanzania-inspired Swahili vocabulary game.
```

For the actual App campaign setup, use all 5 headlines and all 5 descriptions from `docs/GOOGLE_AD_TEXT_ASSETS.md`.

Decision rules:

- Pause if there are no installs after USD 20 spend.
- Pause if Play Console shows crashes or ANRs.
- Keep running if CPI is acceptable and reviews/feedback stay positive.
- Do not scale until screenshots, listing conversion, and reviews look healthy.

## Test 2: Meta Traffic Or App Promotion

Use only after the Google test or if the founder already has a strong Facebook/Instagram audience.

Budget:

- USD 5/day
- 5-7 days
- Max total: USD 25-35

Setup:

- If app install attribution is configured in Meta, use App promotion.
- If app attribution is not configured, run a simple traffic campaign to the Google Play URL and measure installs manually in Play Console.
- Target Android users only if the option is available.
- Countries: Tanzania and Kenya first, then add United States/United Kingdom if delivery is too small.

Creative:

- One short gameplay video if available.
- Otherwise use a carousel: home, puzzle, learn card.

Important limitation:

Without app attribution, Meta will report clicks, not reliable installs. Treat this as a message/creative test, not a clean CPI test.

## Skip For Now: TikTok Paid

TikTok is excellent for organic short videos, but not ideal for the first paid test.

Reason:

- TikTok's official budget guidance says campaign daily budget must exceed USD 50 and ad group daily budget must exceed USD 20.
- That means a 7-day paid test is likely too large for the current learning stage.

Use TikTok organically first:

- Post 3-5 short gameplay clips.
- Reuse the short-video scripts from `docs/LAUNCH_KIT.md`.
- Run paid TikTok only after one organic video shows traction.

## Skip For Now: Reddit Paid

Reddit can be useful for language-learning and Tanzania/travel niches, but paid Reddit is not the first choice.

Reason:

- Reddit Ads guidance recommends ad groups around USD 50/day for many setups.
- Niche communities often respond better to honest feedback posts than paid ads.

Use Reddit organically first:

- Post in communities only where self-promotion or feedback requests are allowed.
- Ask for vocabulary feedback from learners and native speakers.

## Tracking Sheet

Record this daily in `docs/LAUNCH_TRACKING.md`:

```text
Date:
Platform:
Spend:
Impressions:
Clicks:
CTR:
Installs:
CPI:
Store listing visitors:
Install conversion:
Countries:
Reviews:
Crash/ANR notes:
Best creative:
Worst creative:
Decision:
```

## Sources Checked

- Google Ads App campaigns support target cost per install and install-volume campaigns: https://support.google.com/google-ads/answer/7100895
- Google Ads setup flow for App campaigns: https://support.google.com/google-ads/answer/12575501
- Google Ads app campaign best-practice budget guidance: https://support.google.com/google-ads/answer/9176652
- TikTok App Promotion objective supports app installs: https://ads.tiktok.com/help/article/what-is-app-promotion-objective
- TikTok budget minimums: https://ads.tiktok.com/help/article/budget
- Reddit Ads budget guidance: https://business.reddithelp.com/s/article/How-much-do-Reddit-Ads-cost
