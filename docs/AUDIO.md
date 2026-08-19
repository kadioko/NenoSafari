# Pronunciation Audio Plan

> Current release coverage: 432 of 432 puzzle and Word-of-Day pronunciation files.

Neno Safari now supports recorded pronunciation files through an optional `audio` field on a word entry.

## Live Audio Priority

For live updates, prioritize audio for words players see most often:

1. Daily Puzzle seed words
2. Word of the Day entries
3. New beginner words in existing categories
4. New category launch words

Do not block every content update on full audio coverage, but track missing files before releases.

Current live content state:

- 432 recorded MP3 files are present.
- 372 category vocabulary entries and 33 Daily Puzzle-only words have recorded audio.
- `npm run audio:check` passes with full coverage across categories, Daily Puzzle seeds, themed rotations, and Word of the Day.

Example:

```js
{ sw: 'UGALI', en: 'Maize porridge', ex: 'Ninakula ugali.', audio: 'audio/ugali.mp3' }
```

## Recording Guidelines

- Use a native Tanzanian Swahili speaker.
- Record one clean word per file.
- Keep files short, normalized, and quiet in the background.
- Prefer `.mp3` or `.m4a` for mobile app size.
- Name files with lowercase grid words, such as `ugali.mp3`.

## Fallback

If a word has no `audio` file, the app uses browser speech synthesis with `sw-TZ` where available.

## ElevenLabs Generation

The repo includes a helper script for generating pronunciation files:

```powershell
$env:ELEVENLABS_API_KEY="your-key"
$env:ELEVENLABS_VOICE_ID="your-voice-id"
npm run audio:elevenlabs
```

Check missing audio across all core, extra, and advanced vocabulary:

```powershell
npm run audio:missing
```

Generate only the next few missing words:

```powershell
$env:NENO_AUDIO_LIMIT="10"
npm run audio:elevenlabs
```

## Edge TTS Generation

For no-key generation, install the Python package once:

```powershell
python -m pip install edge-tts
```

Then generate missing MP3 files with the Tanzania Swahili voice:

```powershell
npm run audio:edge
```

Optional settings:

- `NENO_EDGE_TTS_VOICE`, default `sw-TZ-RehemaNeural`
- `NENO_EDGE_TTS_RATE`, default `+0%`
- `NENO_EDGE_TTS_VOLUME`, default `+0%`
- `NENO_AUDIO_WORDS`, comma-separated Swahili words to generate
- `NENO_AUDIO_LIMIT`, maximum number of new files to generate

Generate a specific comma-separated set:

```powershell
$env:NENO_AUDIO_WORDS="MBOGA,KARANGA,VITUMBUA"
npm run audio:elevenlabs
```

Optional settings:

- `ELEVENLABS_MODEL_ID`, default `eleven_multilingual_v2`
- `ELEVENLABS_OUTPUT_FORMAT`, default `mp3_44100_128`
- `NENO_AUDIO_DIR`, default `audio`
- `NENO_AUDIO_LIMIT`, default unset; limits newly generated files
- `NENO_AUDIO_WORDS`, default unset; comma-separated Swahili words to generate

Do not put the ElevenLabs API key into `index.html` or any public frontend file.

The shipped app never calls ElevenLabs or Edge TTS. Generation happens only on the developer machine; Android/PWA builds contain the resulting MP3 files. Rotate any API key that has been pasted into chat, logs, or a committed file.
