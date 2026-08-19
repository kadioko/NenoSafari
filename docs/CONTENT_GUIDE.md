# Content Guide

> Current inventory baseline: 14 categories and 372 category vocabulary entries.

## Live Content Strategy

The live app should prioritize vocabulary depth before broad category expansion.

Current target:

- Keep the 14 live categories strong.
- Maintain at least 20 reviewed words per category and deepen high-demand topics carefully.
- Expand Daily Puzzle and Word of the Day first because they create return visits.
- Add new categories only when they are clearly useful and have enough reviewed words.

Recently added category groups that must stay maintained:

- Maneno ya Kila Siku: everyday objects, home, school, and simple verbs.
- Safari na Hifadhi: national parks, tourism, landscapes, and safari vocabulary.
- Vitendo na Vitenzi: useful verbs and actions.
- Muda na Ratiba: time, planning, and daily routines.

## Voice

The game should use friendly Tanzanian Swahili. Keep the language natural, respectful, and useful for learners.

Prefer:

- Common everyday words
- Tanzanian usage
- Short example sentences
- Positive cultural notes
- Beginner-friendly vocabulary first

Avoid:

- Offensive words
- Tribal stereotypes
- Sensitive political claims
- Rare or overly formal words for beginner puzzles
- Kenyan-heavy slang when a Tanzanian equivalent is expected
- Long words in beginner puzzles

## Word Entry Rules

Each entry should include:

- `sw`: uppercase Swahili word used in the grid
- `en`: short English meaning
- `ex`: simple Swahili example sentence
- `note`: optional cultural or usage note
- `pron`: optional pronunciation guide

Example:

```js
{
  sw: "SIMBA",
  en: "Lion",
  ex: "Simba anaishi mbugani.",
  note: "Simba ni mmoja wa wanyama maarufu katika hifadhi za Tanzania.",
  pron: "SEEM-bah"
}
```

## Grid Word Formatting

- Use uppercase letters.
- Avoid spaces in `sw` when possible.
- For names with spaces, use a compact form in the grid.

Example:

```js
{
  sw: "DARESSALAAM",
  en: "Dar es Salaam, Tanzania largest city",
  ex: "Dar es Salaam ni jiji kubwa la biashara."
}
```

The UI can later support a separate `display` field if we want to show "Dar es Salaam" while using `DARESSALAAM` in the grid.

## Sentence Guidelines

Good example sentences are:

- Short
- Natural
- Positive or neutral
- Easy for learners to understand
- Related to the word meaning

Examples:

- "Ninakula ugali na samaki."
- "Karibu Tanzania."
- "Mama anaenda sokoni."
- "Basi linaenda Dodoma."

## Category Guidelines

Each category should contain at least 20 reviewed words across base, extra, and advanced pools so higher difficulties can vary the selection. The current app has 372 category entries across 14 categories.

Recommended mix:

- 10-12 very common words
- 6-8 medium words
- 4 slightly advanced words

Daily Puzzle and Word of the Day pools should grow faster than the category list because they make the app feel active after launch.

Every playable word must also have a matching pronunciation file before release. Run `npm run audio:check`; the current baseline is 405 of 405 MP3 files.

## Review Checklist

Before adding new vocabulary:

- Does the word fit the category?
- Is it common in Tanzania?
- Is the English meaning clear?
- Is the sentence grammatically simple?
- Is the note respectful and accurate?
- Can the word fit on the target difficulty grid?
- Does `npm run test:content` pass?
- Does `npm run audio:check` still report complete playable-word coverage?
