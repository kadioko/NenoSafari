import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.log('Playwright is not installed. Skipping screenshot capture.');
  console.log('Install later with: npm i -D playwright');
  process.exit(0);
}

await fs.mkdir('assets/screenshots/generated', { recursive: true });

const server = spawn('python', ['-m', 'http.server', '5177', '-b', '127.0.0.1'], {
  stdio: 'ignore',
  shell: false,
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
await sleep(1200);

const browser = await chromium.launch();
const viewports = [
  { name: 'android', width: 1080, height: 1920, scale: 1 },
  { name: 'ios', width: 1170, height: 2532, scale: 1 },
];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: viewport.scale });
    await page.goto('http://127.0.0.1:5177/index.html?v=16&screenshots=1');
    await page.screenshot({ path: `assets/screenshots/generated/${viewport.name}-home.png`, fullPage: true });
    await page.locator('#home-screen.active button').filter({ hasText: /Progress|Maendeleo/ }).click();
    await page.screenshot({ path: `assets/screenshots/generated/${viewport.name}-progress.png`, fullPage: true });
    await page.goto('http://127.0.0.1:5177/index.html?v=16&screenshots=2');
    await page.locator('#home-screen.active button').filter({ hasText: /Rewards|Zawadi/ }).click();
    await page.screenshot({ path: `assets/screenshots/generated/${viewport.name}-rewards.png`, fullPage: true });
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}

console.log('Store screenshots written to assets/screenshots/generated/.');
