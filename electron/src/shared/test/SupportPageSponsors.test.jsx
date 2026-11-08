import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
vi.mock('../api/external', () => ({ openExternal: vi.fn() }));
import SupportPage from '../pages/SupportPage';
import { SPONSORS, SPONSOR_CONTACT } from '../config/sponsors';

describe('independent fork sponsorship safety', () => {
  it('does not inherit upstream sponsor roster or checkout', () => {
    expect(SPONSORS).toEqual([]);
    expect(SPONSOR_CONTACT.githubSponsors).toBe('');
    expect(SPONSOR_CONTACT.githubIssue).toBe('');
    const { container } = render(<SupportPage onBack={() => {}} />);
    expect(screen.getByText(/No official donations, sponsors, paid plans/)).toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/palash|voicestudio\.sh|paypal|ko-fi/i);
  });
});
