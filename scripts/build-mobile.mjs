import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outputDir = path.join(root, 'www');

const requiredEntries = [
  'index.html',
  'manifest.json',
  'app-icon.svg',
  'privacy-policy.html',
  'service-worker.js',
  'js',
  'assets'
];

const optionalEntries = [
  'audio'
];

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function copyRecursive(source, destination) {
  const stats = await fs.stat(source);

  if (stats.isDirectory()) {
    await fs.mkdir(destination, { recursive: true });
    const children = await fs.readdir(source);
    await Promise.all(
      children.map((child) =>
        copyRecursive(path.join(source, child), path.join(destination, child))
      )
    );
    return;
  }

  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(source, destination);
}

await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });

for (const entry of requiredEntries) {
  const source = path.join(root, entry);
  if (!(await exists(source))) {
    throw new Error(`Missing required mobile build entry: ${entry}`);
  }
  await copyRecursive(source, path.join(outputDir, entry));
}

const copiedOptionalEntries = [];
for (const entry of optionalEntries) {
  const source = path.join(root, entry);
  if (await exists(source)) {
    await copyRecursive(source, path.join(outputDir, entry));
    copiedOptionalEntries.push(entry);
  }
}

console.log(`Mobile web build written to ${path.relative(root, outputDir) || outputDir}`);
if (copiedOptionalEntries.length > 0) {
  console.log(`Included optional entries: ${copiedOptionalEntries.join(', ')}`);
}
