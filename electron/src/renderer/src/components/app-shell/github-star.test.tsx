import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';

vi.mock('@/components/bridge', () => ({ getBridge: () => null }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));

import { GithubStar } from './github-star';

const REFRESH_MS = 20 * 60 * 1000;

function mount() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <GithubStar />
    </QueryClientProvider>,
  );
  return client;
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

it('does not make any third-party request until the user explicitly refreshes', async () => {
  const fetchCount = vi.fn();
  vi.stubGlobal('fetch', fetchCount);
  const client = mount();
  expect(screen.getByText('0')).toBeVisible();
  expect(fetchCount).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('link', { name: 'support.star_github' }));
  expect(fetchCount).not.toHaveBeenCalled();
  client.clear();
});

it('loads the exact live count only after each explicit refresh', async () => {
  const fetchCount = vi
    .fn()
    .mockResolvedValueOnce({ ok: true, json: async () => ({ stargazers_count: 43_768 }) })
    .mockResolvedValueOnce({ ok: true, json: async () => ({ stargazers_count: 43_769 }) });
  vi.stubGlobal('fetch', fetchCount);
  vi.useFakeTimers();
  const client = mount();

  expect(screen.getByText('0')).toBeVisible();
  expect(fetchCount).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Refresh GitHub star count' }));
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });
  expect(screen.getByText('43,768')).toBeVisible();
  expect(fetchCount).toHaveBeenCalledOnce();
  expect(fetchCount.mock.calls[0][0]).toBe(
    'https://api.github.com/repos/DevTunaSoft/BetterVoiceStudio',
  );
  expect(fetchCount.mock.calls[0][1]).toMatchObject({
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(REFRESH_MS + 1);
  });
  expect(fetchCount).toHaveBeenCalledOnce();
  fireEvent.click(screen.getByRole('button', { name: 'Refresh GitHub star count' }));
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });
  expect(fetchCount).toHaveBeenCalledTimes(2);
  vi.useRealTimers();
  await waitFor(() => expect(screen.getByText('43,769')).toBeVisible());
  expect(screen.getByRole('link', { name: 'support.star_github' })).toHaveAttribute(
    'href',
    'https://github.com/DevTunaSoft/BetterVoiceStudio',
  );
  client.clear();
});

it('keeps the last live count when a later request fails', async () => {
  const fetchCount = vi
    .fn()
    .mockResolvedValueOnce({ ok: true, json: async () => ({ stargazers_count: 45_001 }) })
    .mockRejectedValueOnce(new Error('offline'));
  vi.stubGlobal('fetch', fetchCount);
  vi.useFakeTimers();
  const client = mount();
  fireEvent.click(screen.getByRole('button', { name: 'Refresh GitHub star count' }));
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });
  expect(screen.getByText('45,001')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Refresh GitHub star count' }));
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });
  expect(fetchCount).toHaveBeenCalledTimes(2);
  expect(screen.getByText('45,001')).toBeVisible();
  client.clear();
});

it('shows the bundled count if the first request is offline', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
  vi.useFakeTimers();
  const client = mount();
  fireEvent.click(screen.getByRole('button', { name: 'Refresh GitHub star count' }));
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });
  expect(screen.getByText('0')).toBeVisible();
  client.clear();
});
