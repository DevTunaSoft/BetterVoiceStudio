import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

const mock = vi.hoisted(() => ({ bridge: null as null | { files: { openExternal: ReturnType<typeof vi.fn> } } }));
vi.mock('@/components/bridge', () => ({ getBridge: () => mock.bridge }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
import { GithubStar } from './github-star';

afterEach(() => {
  cleanup();
  mock.bridge = null;
  vi.unstubAllGlobals();
});

it('links to the fork and never polls GitHub without a user action', () => {
  const fetchCount = vi.fn();
  vi.stubGlobal('fetch', fetchCount);
  render(<GithubStar />);
  expect(screen.getByRole('link', { name: 'support.star_github' })).toHaveAttribute(
    'href', 'https://github.com/DevTunaSoft/VoiceBlueprint-Pro',
  );
  expect(screen.queryByText(/43,638/)).toBeNull();
  expect(fetchCount).not.toHaveBeenCalled();
});

it('opens the fork in the desktop host only when clicked', () => {
  const openExternal = vi.fn().mockResolvedValue(undefined);
  mock.bridge = { files: { openExternal } };
  render(<GithubStar />);
  expect(openExternal).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('link', { name: 'support.star_github' }));
  expect(openExternal).toHaveBeenCalledWith('https://github.com/DevTunaSoft/VoiceBlueprint-Pro');
});
