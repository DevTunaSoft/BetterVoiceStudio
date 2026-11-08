import { describe, expect, it, vi, beforeEach } from 'vitest';

const mock = vi.hoisted(() => ({
  confirm: vi.fn(),
  open: vi.fn(),
}));

vi.mock('./dialog', () => ({ askConfirm: mock.confirm }));
vi.mock('../api/external', () => ({ openExternal: mock.open }));

import { openBugReport } from './bugReport';
import { ISSUES_AVAILABLE } from './contactLinks';

describe('fork support when GitHub Issues is disabled', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mock.confirm.mockResolvedValue(false);
    mock.open.mockResolvedValue(undefined);
  });

  it('does not open a dead issue URL or gather diagnostics without consent', async () => {
    expect(ISSUES_AVAILABLE).toBe(false);
    await openBugReport({ error: new Error('private /home/alice/project') });
    expect(mock.confirm).toHaveBeenCalledTimes(1);
    expect(mock.open).not.toHaveBeenCalled();
  });

  it('offers troubleshooting rather than an Issues link on explicit request', async () => {
    mock.confirm.mockResolvedValue(true);
    await openBugReport();
    expect(mock.open).toHaveBeenCalledWith(
      'https://github.com/DevTunaSoft/BetterVoiceStudio/blob/engineering/modernization-foundation/docs/user-guide/troubleshooting.md',
    );
    expect(mock.open.mock.calls[0][0]).not.toContain('/issues');
  });
});
