import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1100, height: 760 } });
try {
  await page.goto((process.env.VOICESTUDIO_UI_URL || 'http://localhost:3912') + '/#/settings/appearance');
  await page.getByRole('link', { name: 'Support', exact: true }).click();
  await page.getByRole('heading', { name: 'Project and support', exact: true }).waitFor();
  assert.equal(
    await page.getByRole('link', { name: 'VoiceBlueprint Pro on GitHub' }).getAttribute('href'),
    'https://github.com/DevTunaSoft/VoiceBlueprint-Pro',
  );
  assert.equal(
    await page.getByRole('link', { name: 'Private security reporting' }).getAttribute('href'),
    'https://github.com/DevTunaSoft/VoiceBlueprint-Pro/security/advisories/new',
  );
  assert.match(await page.locator('.support-studio').innerText(), /no verified VoiceBlueprint Pro donation account/i);
  assert.equal(await page.getByRole('link', { name: /PayPal|GitHub Sponsors/i }).count(), 0);
  console.log('Independent support identity, fork-owned security and no upstream donation links passed.');
} finally {
  await browser.close();
}
