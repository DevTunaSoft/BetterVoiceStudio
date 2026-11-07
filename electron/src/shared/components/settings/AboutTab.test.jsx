import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import AboutTab from './AboutTab';
import { REPO_URL, CREDITS_URL } from '../../utils/contactLinks';
import { openExternal } from '../../api/external';
import { useAppStore } from '../../store';

vi.mock('../../api/external', () => ({ openExternal: vi.fn() }));

const noop = () => {};
const baseProps = {
  appVersion: '0.0.0-test',
  tauriVersion: null,
  info: { has_hf_token: true },
  checkForUpdates: noop,
  updateState: 'idle',
  selfCheck: null,
  selfCheckRunning: false,
  runSelfCheck: noop,
  bundleBuilding: false,
  saveDiagnosticBundle: noop,
  copyDiagnostics: noop,
};

describe('AboutTab — external links', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('the GitHub button opens the canonical repo (derived from the shared REPO_URL constant)', () => {
    render(<AboutTab {...baseProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'BetterVoiceStudio on GitHub' }));
    expect(openExternal).toHaveBeenCalledWith(REPO_URL);
    // Belt-and-braces: the constant itself must point at this project, not a
    // lookalike (the original bug linked github.com/k2-fsa/OmniVoice).
    expect(REPO_URL).toBe('https://github.com/DevTunaSoft/BetterVoiceStudio');
  });

  it('identifies the fork and credits upstream contributors without advertising commercial licenses', () => {
    render(<AboutTab {...baseProps} />);
    expect(screen.getByText('BetterVoiceStudio')).toBeInTheDocument();
    expect(screen.getByText(/independent, local-first open-source modernization fork of VoiceStudio/i)).toBeInTheDocument();
    expect(screen.getByText(/Original authors and contributors retain attribution/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /commercial license|pro subscription/i })).toBeNull();
    expect(screen.queryByText(/^VoiceStudio$/)).toBeNull();
  });

  it('opens the fork credits and licenses page, not upstream commercial offerings', () => {
    render(<AboutTab {...baseProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Credits and licenses' }));
    expect(openExternal).toHaveBeenCalledWith(CREDITS_URL);
    expect(CREDITS_URL).toContain('/docs/FORK_AND_ATTRIBUTION.md');
    expect(CREDITS_URL).toContain(REPO_URL);
  });

  it('has no "Model card" link — the app is multi-engine with no single model card', () => {
    render(<AboutTab {...baseProps} />);
    expect(screen.queryByRole('button', { name: /model card/i })).toBeNull();
  });
});

describe('AboutTab — fixable problems deep-link into Settings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAppStore.getState().setMode('launchpad');
    useAppStore.getState().setPendingSettingsTab(null);
  });

  it('HF token "no" offers an Open API credentials action instead of dead-ending', () => {
    render(<AboutTab {...baseProps} info={{ has_hf_token: false }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open API credentials' }));
    expect(useAppStore.getState().mode).toBe('settings');
    expect(useAppStore.getState().pendingSettingsTab).toBe('credentials');
  });

  it('HF token "yes" renders no Credentials action', () => {
    render(<AboutTab {...baseProps} info={{ has_hf_token: true }} />);
    expect(screen.queryByRole('button', { name: 'Open API credentials' })).toBeNull();
  });

  it('a failing self-check renders an "Open <category>" button for its fix destination', () => {
    const selfCheck = {
      checks: [
        {
          id: 'ffmpeg',
          label: 'ffmpeg',
          status: 'fail',
          detail: 'not found on PATH or FFMPEG_PATH',
          hint: 'Dubbing and audio conversion need ffmpeg.',
        },
        { id: 'python', label: 'Python runtime', status: 'ok', detail: '3.12', hint: null },
      ],
      summary: { ok: false, failures: 1 },
    };
    render(<AboutTab {...baseProps} selfCheck={selfCheck} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Network' }));
    expect(useAppStore.getState().mode).toBe('settings');
    expect(useAppStore.getState().pendingSettingsTab).toBe('network');
  });

  it('passing checks render no deep-link button', () => {
    const selfCheck = {
      checks: [
        { id: 'ffmpeg', label: 'ffmpeg', status: 'ok', detail: '/usr/bin/ffmpeg', hint: null },
      ],
      summary: { ok: true, failures: 0 },
    };
    render(<AboutTab {...baseProps} selfCheck={selfCheck} />);
    expect(screen.queryByRole('button', { name: /^Open / })).toBeNull();
  });
});
