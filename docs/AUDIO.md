# Pronunciation Audio Plan

Neno Safari now supports recorded pronunciation files through an optional `audio` field on a word entry.

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

Optional settings:

- `ELEVENLABS_MODEL_ID`, default `eleven_multilingual_v2`
- `ELEVENLABS_OUTPUT_FORMAT`, default `mp3_44100_128`
- `NENO_AUDIO_DIR`, default `audio`

Do not put the ElevenLabs API key into `index.html` or any public frontend file.
