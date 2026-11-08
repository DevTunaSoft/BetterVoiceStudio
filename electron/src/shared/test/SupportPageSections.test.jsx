import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

const { openExternal } = vi.hoisted(() => ({ openExternal: vi.fn() }));
vi.mock('../api/external', () => ({ openExternal }));

import SupportPage from '../pages/SupportPage';
import { REPO_URL, SECURITY_URL } from '../utils/contactLinks';

beforeEach(() => openExternal.mockClear());

describe('fork support page and legacy route compatibility', () => {
  it('renders accessible support channels instead of upstream monetization tabs', () => {
    render(<SupportPage onBack={() => {}} />);
    expect(screen.getByRole('heading', { name: 'BetterVoiceStudio' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Report a bug' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Report a security issue' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: /Support|Commercial License/i })).toBeNull();
    expect(screen.queryByText(/Donate to VoiceStudio Project/i)).toBeNull();
  });

  it('retains the contact route without losing the support channels', () => {
    const { rerender } = render(<SupportPage onBack={() => {}} initialView="support" />);
    rerender(<SupportPage onBack={() => {}} initialView="contact" />);
    expect(screen.getByRole('heading', { name: 'Report a bug' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Security reporting' })).toBeInTheDocument();
  });

  it('explains license limitations instead of advertising an unsupported commercial license', () => {
    render(<SupportPage onBack={() => {}} initialView="license" />);
    expect(screen.getByText(/does not offer the original project's commercial licenses or Pro subscriptions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Credits and licenses' })).toBeInTheDocument();
    expect(screen.queryByText(/License VoiceStudio for your organization/i)).toBeNull();
  });

  it('preserves navigation and opens only fork-owned support destinations', () => {
    const onBack = vi.fn();
    render(<SupportPage onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(onBack).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', { name: 'Fork source' }));
    fireEvent.click(screen.getByRole('button', { name: 'Security reporting' }));
    expect(openExternal).toHaveBeenNthCalledWith(1, REPO_URL);
    expect(openExternal).toHaveBeenNthCalledWith(2, SECURITY_URL);
  });
});
