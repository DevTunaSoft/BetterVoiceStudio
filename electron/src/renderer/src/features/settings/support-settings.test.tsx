import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { SupportSettings } from './support-settings';

afterEach(() => cleanup());

it('identifies the independent maintainer and fork-owned destinations', () => {
  render(<SupportSettings />);
  expect(screen.getByRole('heading', { name: 'VoiceBlueprint Pro' })).toBeVisible();
  expect(screen.getByText('Design. Clone. Create.')).toBeVisible();
  expect(screen.getByText(/Developed independently by DevTunaSoft/)).toBeVisible();
  expect(screen.getByRole('link', { name: /VoiceBlueprint Pro on GitHub/ })).toHaveAttribute(
    'href', 'https://github.com/DevTunaSoft/VoiceBlueprint-Pro',
  );
  expect(screen.getByRole('link', { name: /Issues and feature requests/ })).toHaveAttribute(
    'href', 'https://github.com/DevTunaSoft/VoiceBlueprint-Pro/issues',
  );
  expect(screen.getByRole('link', { name: /Private security reporting/ })).toHaveAttribute(
    'href', 'https://github.com/DevTunaSoft/VoiceBlueprint-Pro/security/advisories/new',
  );
});

it('never advertises upstream payments, sponsor accounts, or subscriptions', () => {
  const { container } = render(<SupportSettings />);
  expect(container.innerHTML).not.toMatch(/palash|debpalash|voicestudio\.sh|discord\.gg/i);
  expect(screen.queryByRole('link', { name: /PayPal|Ko-fi|GitHub Sponsors|Buy Pro/i })).toBeNull();
  expect(screen.getByText(/no verified VoiceBlueprint Pro donation account/i)).toBeVisible();
});
