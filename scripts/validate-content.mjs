import fs from 'node:fs';

const content = fs.readFileSync(new URL('../js/content.js', import.meta.url), 'utf8');
const wordPattern = /\{\s*sw:\s*'([^']+)'\s*,(?:\s*display:\s*'([^']+)'\s*,)?\s*en:\s*'([^']*)'\s*,\s*ex:\s*'([^']*)'/g;
const seen = new Set();
const issues = [];
let count = 0;

for (const match of content.matchAll(wordPattern)) {
  const [, sw, display, en, ex] = match;
  count += 1;
  if (!/^[A-Z]+$/.test(sw)) issues.push(`${sw}: sw must be uppercase A-Z with no spaces`);
  if (!en.trim()) issues.push(`${sw}: missing English meaning`);
  if (!ex.trim()) issues.push(`${sw}: missing example sentence`);
  if (seen.has(sw)) issues.push(`${sw}: duplicate grid word`);
  seen.add(sw);
  if (display && display.length > 24) issues.push(`${sw}: display name is long for mobile`);
  if (sw.length > 14) issues.push(`${sw}: word may be too long for smaller grids`);
}

if (count < 140) issues.push(`Expected at least 140 vocabulary entries, found ${count}`);

if (issues.length) {
  console.error('Content validation failed:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`Content validation OK: ${count} entries`);
}
