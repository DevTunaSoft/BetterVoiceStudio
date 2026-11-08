import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('fork support and bug-report links use the fork, not upstream accounts', () => {
  const contact = read('src/shared/utils/contactLinks.js');
  const bug = read('src/shared/utils/bugReport.js');
  const stars = read('src/renderer/src/components/app-shell/github-star.tsx');
  for (const source of [contact, bug, stars]) {
    assert.match(source, /DevTunaSoft\/BetterVoiceStudio/);
    assert.doesNotMatch(source, /github\.com\/debpalash\/VoiceStudio|api\.github\.com\/repos\/debpalash\/VoiceStudio/);
  }
  assert.doesNotMatch(stars, /43_638/);
});

test('current desktop support pages do not offer upstream payment or Pro actions', () => {
  const settings = read('src/renderer/src/features/settings/support-settings.tsx');
  const legacy = read('src/shared/pages/SupportPage.jsx');
  const shortcut = read('src/renderer/src/components/app-shell/support-shortcut.tsx');
  for (const source of [settings, legacy, shortcut]) {
    assert.doesNotMatch(source, /GITHUB_SPONSORS_URL|KOFI_URL|PAYPAL_URL|SPONSOR_CONTACT|SPONSOR_TIERS|DonationGoal|GoalBar|navigate\(\{ to: '\/pro' \}\)/);
  }
  assert.match(settings, /BetterVoiceStudio/);
  assert.match(legacy, /original project and third-party authors retain credit/i);
});
