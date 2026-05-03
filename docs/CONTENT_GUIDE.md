# Content Guide

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

Each category should contain at least 12 words so higher difficulties can pick enough words.

Recommended mix:

- 6 very common words
- 4 medium words
- 2 slightly advanced words

## Review Checklist

Before adding new vocabulary:

- Does the word fit the category?
- Is it common in Tanzania?
- Is the English meaning clear?
- Is the sentence grammatically simple?
- Is the note respectful and accurate?
- Can the word fit on the target difficulty grid?

