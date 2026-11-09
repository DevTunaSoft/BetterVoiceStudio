import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
const { openExternal } = vi.hoisted(() => ({ openExternal: vi.fn() }));
vi.mock('../api/external', () => ({ openExternal }));
import { ContactSections } from '../pages/ContactPage';

const REPO = 'https://github.com/DevTunaSoft/VoiceBlueprint-Pro';
beforeEach(() => openExternal.mockClear());

describe('independent fork contact sections', () => {
  it('shows only official project channels', () => {
    const { container } = render(<ContactSections />);
    for (const name of ['Report a bug', 'Request a feature or ask', 'Report a security issue', 'VoiceBlueprint Pro project']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Open bug reporter' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open GitHub Issues' })).toHaveAttribute('href', `${REPO}/issues`);
    expect(screen.getByRole('link', { name: 'Report privately' })).toHaveAttribute('href', `${REPO}/security/advisories/new`);
    expect(container.innerHTML).not.toMatch(/palash|discord|voicestudio\.sh|paypal|ko-fi/i);
  });
  it('opens fork links through the external opener', () => {
    render(<ContactSections />);
    fireEvent.click(screen.getByRole('link', { name: 'Project repository' }));
    expect(openExternal).toHaveBeenCalledWith(REPO);
  });
  it('navigates to the internal project information section', () => {
    const onSupport = vi.fn();
    render(<ContactSections onSupport={onSupport} />);
    fireEvent.click(screen.getByRole('button', { name: 'See ways to support' }));
    expect(onSupport).toHaveBeenCalledOnce();
  });
});
