import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1100, height: 760 } });
try {
  await page.goto((process.env.VOICESTUDIO_UI_URL || 'http://localhost:3912') + '/#/settings/appearance');
  await page.getByRole('link', { name: 'Support', exact: true }).click();
  await page.getByRole('heading', { name: 'BetterVoiceStudio', exact: true }).waitFor();
  await page.getByRole('heading', { name: 'Help and contribute', exact: true }).waitFor();
  const destinations = [
    ['Report an issue or suggest a feature', 'https://github.com/DevTunaSoft/BetterVoiceStudio/issues'],
    ['BetterVoiceStudio source', 'https://github.com/DevTunaSoft/BetterVoiceStudio'],
    ['Report a security vulnerability privately', 'https://github.com/DevTunaSoft/BetterVoiceStudio/security/advisories/new'],
    ['Open-source credits and licenses', 'https://github.com/DevTunaSoft/BetterVoiceStudio/blob/engineering/modernization-foundation/docs/FORK_AND_ATTRIBUTION.md'],
  ];
  for (const [name, href] of destinations) {
    assert.equal(await page.getByRole('link', { name, exact: true }).getAttribute('href'), href);
  }
  assert.equal(await page.getByRole('link', { name: /donate|paypal|ko-fi|sponsor|pro subscription/i }).count(), 0);
  assert.equal(await page.getByRole('button', { name: /donate|paypal|ko-fi|sponsor|pro subscription/i }).count(), 0);
  console.log('Fork renderer support navigation, private security, attribution and no upstream monetization: PASS.');
} finally {
  await browser.close();
}
