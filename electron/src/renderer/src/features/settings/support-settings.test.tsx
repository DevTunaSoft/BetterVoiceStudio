import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

const mock = vi.hoisted(() => ({ open: vi.fn().mockResolvedValue(undefined) }));
vi.mock('@/components/bridge', () => ({
  getBridge: () => ({ files: { openExternal: mock.open } }),
}));
vi.mock('react-i18next', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-i18next')>()),
  useTranslation: () => ({ t: (key: string) => key }),
}));
import { SupportSettings } from './support-settings';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

it('shows fork-owned help destinations without upstream payment or Pro promotions', () => {
  render(<SupportSettings />);
  expect(screen.getByRole('heading', { name: 'BetterVoiceStudio' })).toBeVisible();
  const destinations = [
    ['BetterVoiceStudio source', 'https://github.com/DevTunaSoft/BetterVoiceStudio'],
    ['Report a security vulnerability privately', 'https://github.com/DevTunaSoft/BetterVoiceStudio/security/advisories/new'],
    ['Open-source credits and licenses', 'https://github.com/DevTunaSoft/BetterVoiceStudio/blob/engineering/modernization-foundation/docs/FORK_AND_ATTRIBUTION.md'],
  ];
  for (const [name, href] of destinations) {
    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
  }
  expect(screen.queryByRole('link', { name: 'Report an issue or suggest a feature' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'reportBug.label' })).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('GitHub Issues is currently disabled');
    for (const label of ['PayPal', 'Ko-fi', 'GitHub Sponsors', 'supportPlans.get_pro']) {
    expect(screen.queryByRole('link', { name: label })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: label })).not.toBeInTheDocument();
  }
});

it('does not open external pages without a user click', () => {
  render(<SupportSettings />);
  expect(mock.open).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('link', { name: 'BetterVoiceStudio source' }));
  expect(mock.open).toHaveBeenCalledWith('https://github.com/DevTunaSoft/BetterVoiceStudio');
});
