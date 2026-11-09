import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
vi.mock('../api/external', () => ({ openExternal: vi.fn() }));
import SupportPage from '../pages/SupportPage';

const clickTab = (name) => {
  const tab = screen.getByRole('tab', { name });
  fireEvent.pointerDown(tab, { button: 0, ctrlKey: false, pointerType: 'mouse' });
  fireEvent.mouseDown(tab, { button: 0 });
  fireEvent.click(tab);
};

describe('independent fork support hub', () => {
  it('renders a three-tab project information hub without old payments', () => {
    const { container } = render(<SupportPage onBack={() => {}} />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tab', { name: 'Project' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: /VoiceBlueprint Pro — Design/ })).toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/palash|voicestudio\.sh|paypal|ko-fi/i);
  });
  it('respects route changes and preserves navigation', () => {
    const { rerender } = render(<SupportPage onBack={() => {}} initialView="support" />);
    rerender(<SupportPage onBack={() => {}} initialView="contact" />);
    expect(screen.getByRole('tab', { name: 'Contact' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: 'Report a bug' })).toBeInTheDocument();
    clickTab('Licensing');
    expect(screen.getByRole('heading', { name: 'VoiceBlueprint Pro licensing' })).toBeInTheDocument();
  });
});
