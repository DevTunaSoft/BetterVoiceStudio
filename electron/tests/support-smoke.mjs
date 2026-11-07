import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1100, height: 760 } });
try {
  await page.goto((process.env.VOICESTUDIO_UI_URL || 'http://localhost:3912') + '/#/settings/appearance');
  await page.getByRole('link', { name: 'Support', exact: true }).click();
  await page.getByRole('heading', { name: 'BetterVoiceStudio', exact: true }).waitFor();
  await page.getByRole('heading', { name: 'Report a bug', exact: true }).waitFor({ timeout: 10000 }).catch(async (error) => {
    const headings = await page.getByRole('heading').allTextContents();
    const links = await page.getByRole('link').allTextContents();
    throw new Error(`Fork contact section missing: headings=${JSON.stringify(headings)} links=${JSON.stringify(links)}; ${error.message}`);
  });
  assert.equal(
    await page.getByRole('link', { name: 'Open GitHub Issues', exact: true }).getAttribute('href'),
    'https://github.com/DevTunaSoft/BetterVoiceStudio/issues',
  );
  assert.equal(
    await page.getByRole('link', { name: 'Report privately', exact: true }).getAttribute('href'),
    'https://github.com/DevTunaSoft/BetterVoiceStudio/security/advisories/new',
  );
  assert.equal(await page.getByRole('button', { name: 'Fork source' }).count(), 1);
  assert.equal(await page.getByRole('button', { name: 'Credits and licenses' }).count(), 1);
  assert.equal(await page.getByRole('button', { name: /donate|paypal|ko-fi|become a sponsor/i }).count(), 0);
  console.log('Fork support navigation, bug reporting, private security and attribution passed; no external page opened.');
} finally {
  await browser.close();
}
