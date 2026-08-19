import { spawn } from 'node:child_process';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.log('Playwright is not installed. Skipping phone layout test.');
  process.exit(0);
}

const port = 5178;
const server = spawn('python', ['-m', 'http.server', String(port), '-b', '127.0.0.1'], {
  stdio: 'ignore',
  shell: false,
});
const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
await sleep(1200);

const viewports = [
  { name: 'small-android', width: 320, height: 568 },
  { name: 'android', width: 360, height: 640 },
  { name: 'iphone', width: 390, height: 844 },
  { name: 'large-android', width: 412, height: 915 },
];
const screens = [
  'home-screen',
  'mode-screen',
  'category-screen',
  'progress-screen',
  'rewards-screen',
  'saved-screen',
  'settings-screen',
  'about-screen',
  'upgrades-screen',
];

async function waitForApp(page) {
  await page.waitForLoadState('networkidle');
  await page.locator('#loading').waitFor({ state: 'hidden', timeout: 15000 });
}

async function assertPhoneLayout(page, label) {
  const issues = await page.evaluate(() => {
    const active = document.querySelector('.screen.active');
    if (!active) return ['no active screen'];

    const failures = [];
    if (document.documentElement.scrollWidth > window.innerWidth + 1) {
      failures.push(`document width ${document.documentElement.scrollWidth}px exceeds viewport ${window.innerWidth}px`);
    }
    if (active.scrollWidth > window.innerWidth + 1) {
      failures.push(`${active.id} width ${active.scrollWidth}px exceeds viewport ${window.innerWidth}px`);
    }

    const controls = active.querySelectorAll('button, a, input, select, [role="button"]');
    controls.forEach(control => {
      const style = getComputedStyle(control);
      const rect = control.getBoundingClientRect();
      const visible = style.display !== 'none'
        && style.visibility !== 'hidden'
        && rect.width > 0
        && rect.height > 0
        && rect.bottom > 0
        && rect.top < window.innerHeight;
      if (!visible) return;
      const name = control.id || control.getAttribute('aria-label') || control.textContent.trim().slice(0, 32) || control.tagName;
      if (rect.left < -1 || rect.right > window.innerWidth + 1) {
        failures.push(`${name} is outside the viewport (${Math.round(rect.left)}..${Math.round(rect.right)})`);
      }
      if (style.whiteSpace === 'nowrap' && control.scrollWidth > control.clientWidth + 1) {
        failures.push(`${name} has clipped text (${control.scrollWidth}px in ${control.clientWidth}px)`);
      }
    });
    return failures;
  });
  if (issues.length) throw new Error(`${label}: ${issues.join('; ')}`);
}

const browser = await chromium.launch();
try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    await page.goto(`http://127.0.0.1:${port}/index.html?v=57&phone-layout=${viewport.name}`);
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await waitForApp(page);

    for (const language of ['sw', 'en']) {
      await page.evaluate(lang => window.setAppLanguage(lang), language);
      for (const screen of screens) {
        await page.evaluate(screenId => window.showScreen(screenId), screen);
        await page.locator(`#${screen}.active`).waitFor({ state: 'visible' });
        await assertPhoneLayout(page, `${viewport.name}/${language}/${screen}`);
      }
    }

    await page.evaluate(() => window.eval("startGame('chakula')"));
    await page.locator('#game-screen.active').waitFor({ state: 'visible' });
    await assertPhoneLayout(page, `${viewport.name}/game-screen`);
    const gridWidth = await page.locator('#word-grid').evaluate(element => element.getBoundingClientRect().width);
    if (gridWidth < 250 || gridWidth > viewport.width) {
      throw new Error(`${viewport.name}/game-screen: unexpected grid width ${gridWidth}px`);
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}

console.log(`Phone layout tests OK: ${viewports.length} viewports, 2 languages, ${screens.length + 1} screens.`);
