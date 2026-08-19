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
  { name: 'android', width: 360, height: 640, scale: 3, label: 'Android phone' },
  { name: 'ios', width: 390, height: 844, scale: 3, label: 'iPhone portrait' },
];

async function waitForApp(page) {
  await page.waitForLoadState('networkidle');
  await page.locator('#home-screen.active').waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForFunction(() => {
    const loading = document.getElementById('loading');
    return !loading || getComputedStyle(loading).display === 'none';
  }, { timeout: 15000 });
}

async function openFreshHome(page, seed) {
  await page.goto(`http://127.0.0.1:5177/index.html?v=${Date.now()}&screenshots=${seed}`);
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await waitForApp(page);
}

async function capture(page, viewportName, screenName) {
  await page.screenshot({
    path: `assets/screenshots/generated/${viewportName}-${screenName}.png`,
    fullPage: false,
  });
}

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: viewport.scale });

    await openFreshHome(page, 1);
    await capture(page, viewport.name, '01-home');

    await page.locator('#home-screen.active button').filter({ hasText: /Choose Category|Chagua Mada/ }).click();
    await page.locator('#category-screen.active').waitFor({ state: 'visible' });
    await capture(page, viewport.name, '02-categories');

    await page.locator('#category-screen.active .cat-card').first().click();
    await page.locator('#game-screen.active').waitFor({ state: 'visible' });
    await capture(page, viewport.name, '03-puzzle');

    await page.addStyleTag({
      content: `
        #word-modal {
          align-items: center !important;
          padding: 24px !important;
          background: rgba(0, 0, 0, 0.62) !important;
          transition: none !important;
        }
        #word-modal .modal-sheet {
          background: #fffdf7 !important;
          border-radius: 20px !important;
          max-width: 420px !important;
          transform: none !important;
          transition: none !important;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28) !important;
        }
        #word-modal.open .modal-sheet {
          transform: none !important;
        }
      `,
    });
    await page.evaluate(() => {
      const content = window.NenoSafariContent || {};
      const firstWord = content.CATEGORIES?.[0]?.words?.[0];
      if (firstWord && typeof window.showWordModal === 'function') {
        window.showWordModal(firstWord);
      }
    });
    await page.locator('#word-modal.open').waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForTimeout(350);
    await capture(page, viewport.name, '04-learn');

    await openFreshHome(page, 2);
    await page.locator('#home-screen.active button').filter({ hasText: /Progress|Maendeleo/ }).click();
    await page.locator('#progress-screen.active').waitFor({ state: 'visible' });
    await capture(page, viewport.name, '05-progress');

    await openFreshHome(page, 3);
    await page.locator('#home-screen.active button').filter({ hasText: /Rewards|Zawadi/ }).click();
    await page.locator('#rewards-screen.active').waitFor({ state: 'visible' });
    await capture(page, viewport.name, '06-rewards');

    await page.close();
    console.log(`Captured ${viewport.label} screenshots.`);
  }
} finally {
  await browser.close();
  server.kill();
}

console.log('Store screenshots written to assets/screenshots/generated/.');
