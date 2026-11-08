import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
vi.mock('../api/hooks', async (importOriginal) => ({
  ...(await importOriginal()),
  useSystemLogs: () => ({ data: null, refetch: vi.fn() }),
  useTauriLogs: () => ({ data: null, refetch: vi.fn() }),
  useNotifications: () => ({ data: null }),
  useVisibleNotifications: () => ({ data: null, notifications: [] }),
  isDismissibleNotification: () => false,
}));
vi.mock('../api/system', async (importOriginal) => ({
  ...(await importOriginal()), clearSystemLogs: vi.fn(), clearTauriLogs: vi.fn(),
}));
vi.mock('../components/NetworkToggle', () => ({ default: () => null }));
import LogsFooter from '../components/LogsFooter';
import { DONATION_MOMENT_EVENT } from '../utils/donationMoments';
import { useAppStore } from '../store';

function mount() {
  return render(<QueryClientProvider client={new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })}><LogsFooter /></QueryClientProvider>);
}

describe('fork-owned footer actions', () => {
  it('does not expose upstream payments, sponsor links or Discord', () => {
    const { container } = mount();
    expect(screen.queryByTestId('donate-moment-popover')).toBeNull();
    expect(container.innerHTML).not.toMatch(/discord\.gg|paypal|ko-fi|palash|sponsors/i);
    expect(screen.getByRole('button', { name: 'Open VoiceBlueprint Pro project information' })).toBeInTheDocument();
  });
  it('ignores inherited donation-moment events and opens project information', () => {
    mount();
    act(() => window.dispatchEvent(new CustomEvent(DONATION_MOMENT_EVENT, {
      detail: { kind: 'export', line: 0 },
    })));
    expect(screen.queryByTestId('donate-moment-popover')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Open VoiceBlueprint Pro project information' }));
    expect(useAppStore.getState().mode).toBe('donate');
  });
});
