import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const { openExternal } = vi.hoisted(() => ({ openExternal: vi.fn() }));
vi.mock('../api/external', () => ({ openExternal }));

import { ContactSections } from '../pages/ContactPage';
import { REPO_URL, ISSUES_URL, SECURITY_URL } from '../utils/contactLinks';

beforeEach(() => openExternal.mockClear());

describe('fork-owned contact sections', () => {
  it('provides issue, feature and private security guidance without upstream promotions', () => {
    render(<ContactSections />);
    for (const name of ['Report a bug', 'Request a feature or ask', 'Report a security issue']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: /open bug reporter/i })).toBeInTheDocument();
    expect(screen.queryByText(/Donate to VoiceStudio Project|Join the Discord|Become a sponsor/i)).toBeNull();
  });

  it('routes each public and private support channel to this fork', () => {
    render(<ContactSections />);
    expect(screen.getByRole('link', { name: 'Open GitHub Issues' })).toHaveAttribute('href', ISSUES_URL);
    expect(screen.getByRole('link', { name: 'Report privately' })).toHaveAttribute('href', SECURITY_URL);
    expect(screen.getByRole('link', { name: /BetterVoiceStudio source/i })).toHaveAttribute('href', REPO_URL);
    expect(ISSUES_URL).toBe('https://github.com/DevTunaSoft/BetterVoiceStudio/issues');
    expect(SECURITY_URL).toBe('https://github.com/DevTunaSoft/BetterVoiceStudio/security/advisories/new');
  });

  it('uses the secure external opener without double browser navigation', () => {
    render(<ContactSections />);
    const link = screen.getByRole('link', { name: 'Report privately' });
    expect(link).toHaveAttribute('rel', 'noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
    fireEvent.click(link);
    expect(openExternal).toHaveBeenCalledTimes(1);
    expect(openExternal).toHaveBeenCalledWith(SECURITY_URL);
  });

  it('retains accessible original-project credits without a donation CTA', () => {
    render(<ContactSections />);
    const credits = screen.getByRole('link', { name: 'Credits and attribution' });
    expect(credits.getAttribute('href')).toContain('/docs/FORK_AND_ATTRIBUTION.md');
    expect(credits.getAttribute('href')).toContain(REPO_URL);
    expect(screen.queryByRole('button', { name: /ways to support/i })).toBeNull();
  });
});
