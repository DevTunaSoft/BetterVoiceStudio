import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { ProPage } from './pro-page';

afterEach(() => cleanup());

it('explains the fork has no inherited paid Pro or enterprise offering', () => {
  render(<ProPage />);
  expect(screen.getByRole('heading', { name: 'Independent open-source software' })).toBeVisible();
  expect(screen.getByText(/DevTunaSoft contributors/)).toBeVisible();
  expect(screen.getByText(/no official paid VoiceBlueprint Pro plan/)).toBeVisible();
  expect(screen.getByRole('link', { name: /View the project/ })).toHaveAttribute(
    'href', 'https://github.com/DevTunaSoft/VoiceBlueprint-Pro',
  );
});

it('does not show upstream prices or checkout destinations', () => {
  const { container } = render(<ProPage />);
  expect(container.innerHTML).not.toMatch(/voicestudio\.sh|palash|\$99|\$199|quantity=/i);
  expect(screen.queryByRole('button', { name: /buy|checkout|subscribe/i })).toBeNull();
});
