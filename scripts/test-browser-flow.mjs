let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.log('Playwright is not installed. Skipping real browser flow test.');
  process.exit(0);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
try {
  await page.goto(process.env.NENO_TEST_URL || 'http://127.0.0.1:5177/index.html?v=16&browser-test=1');
  await page.locator('#home-screen.active button').filter({ hasText: /Play Now|Cheza Sasa/ }).click();
  await page.locator('#mode-screen.active').waitFor();
  await page.locator('button').filter({ hasText: /Continue|Endelea/ }).click();
  await page.locator('#category-screen.active').waitFor();
  await page.goto(process.env.NENO_TEST_URL || 'http://127.0.0.1:5177/index.html?v=16&browser-test=2');
  await page.locator('#home-screen.active button').filter({ hasText: /Daily|Fumbo/ }).click();
  await page.locator('#game-screen.active').waitFor();
  console.log('Real browser flow test OK');
} finally {
  await browser.close();
}
