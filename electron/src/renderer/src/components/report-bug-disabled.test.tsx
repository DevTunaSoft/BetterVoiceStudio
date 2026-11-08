import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

const mock = vi.hoisted(() => ({
  diagnostics: vi.fn().mockResolvedValue('safe setup diagnostics'),
  saveData: vi.fn().mockResolvedValue(undefined),
  open: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@shared/utils/contactLinks', () => ({ ISSUES_AVAILABLE: false }));
vi.mock('./bridge', () => ({
  getBridge: () => ({
    backend: { getSetupDiagnostics: mock.diagnostics },
    files: { saveData: mock.saveData, openExternal: mock.open },
  }),
}));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string, options?: { defaultValue?: string }) => options?.defaultValue || key }),
}));

import { ReportBug } from './report-bug';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

it('does not offer a dead issue submission or gather diagnostics on render', () => {
  render(<ReportBug />);
  expect(screen.getByRole('status')).toHaveTextContent('GitHub Issues is disabled');
  expect(screen.queryByRole('button', { name: /report a bug/i })).not.toBeInTheDocument();
  expect(mock.diagnostics).not.toHaveBeenCalled();
  expect(mock.open).not.toHaveBeenCalled();
});

it('only saves local diagnostics when explicitly requested', async () => {
  render(<ReportBug />);
  fireEvent.click(screen.getByRole('button', { name: 'Save setup diagnostics' }));
  await waitFor(() => expect(mock.saveData).toHaveBeenCalledTimes(1));
  expect(mock.diagnostics).toHaveBeenCalledTimes(1);
  expect(mock.open).not.toHaveBeenCalled();
});
