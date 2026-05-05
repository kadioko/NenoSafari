import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;
const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
const outputFormat = process.env.ELEVENLABS_OUTPUT_FORMAT || 'mp3_44100_128';
const outDir = process.env.NENO_AUDIO_DIR || 'audio';

if (!apiKey || !voiceId) {
  console.error('Missing ELEVENLABS_API_KEY or ELEVENLABS_VOICE_ID.');
  console.error('Example: $env:ELEVENLABS_API_KEY="..."; $env:ELEVENLABS_VOICE_ID="..."; npm run audio:elevenlabs');
  process.exit(1);
}

const sandbox = { window: {} };
vm.runInNewContext(await fs.readFile('js/content.js', 'utf8'), sandbox, { filename: 'js/content.js' });

const { CATEGORIES } = sandbox.window.NenoSafariContent;
const words = new Map();
for (const category of CATEGORIES) {
  for (const word of category.words) {
    words.set(word.sw, word);
  }
}

await fs.mkdir(outDir, { recursive: true });

function displayWord(word) {
  if (word.display) return word.display;
  if (Array.isArray(word.parts) && word.parts.length) return word.parts.join(' ');
  return word.sw;
}

function audioName(word) {
  return `${word.sw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mp3`;
}

for (const word of words.values()) {
  const filePath = path.join(outDir, audioName(word));
  try {
    await fs.access(filePath);
    console.log(`Skip existing ${filePath}`);
    continue;
  } catch {}

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${outputFormat}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'content-type': 'application/json',
      accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: displayWord(word),
      model_id: modelId,
      voice_settings: {
        stability: 0.65,
        similarity_boost: 0.75,
        style: 0,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`ElevenLabs failed for ${word.sw}: ${response.status} ${body}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(filePath, buffer);
  console.log(`Wrote ${filePath}`);
}

console.log(`Generated pronunciation audio for ${words.size} entries.`);
