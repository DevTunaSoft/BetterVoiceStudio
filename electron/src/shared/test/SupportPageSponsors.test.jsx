import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const { openExternal } = vi.hoisted(() => ({ openExternal: vi.fn() }));
vi.mock('../api/external', () => ({ openExternal }));

import SupportPage from '../pages/SupportPage';
import { REPO_URL, SECURITY_URL } from '../utils/contactLinks';

beforeEach(() => openExternal.mockClear());

describe('fork support page sponsor and monetization isolation', () => {
  it('does not promote the original project sponsor roster or donation requests', () => {
    render(<SupportPage initialView="support" onBack={() => {}} />);
    expect(screen.queryByTestId('sponsors-empty')).toBeNull();
    expect(screen.queryByText(/Be the first to sponsor VoiceStudio|Your logo here|Donate to VoiceStudio Project/i)).toBeNull();
    expect(screen.queryByRole('button', { name: /become a sponsor|donate|paypal|ko-fi/i })).toBeNull();
  });

  it('still exposes real source, credits and security support actions', () => {
    render(<SupportPage initialView="support" onBack={() => {}} />);
    expect(screen.getByRole('button', { name: 'Fork source' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Credits and licenses' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Security reporting' })).toBeInTheDocument();
  });

  it('routes source and security actions through the shared external opener', () => {
    render(<SupportPage initialView="support" onBack={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fork source' }));
    fireEvent.click(screen.getByRole('button', { name: 'Security reporting' }));
    expect(openExternal).toHaveBeenCalledTimes(2);
    expect(openExternal).toHaveBeenNthCalledWith(1, REPO_URL);
    expect(openExternal).toHaveBeenNthCalledWith(2, SECURITY_URL);
  });
});
