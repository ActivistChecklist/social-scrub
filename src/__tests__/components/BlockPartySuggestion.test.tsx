import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlockPartySuggestion from '@/components/step/BlockPartySuggestion';

describe('BlockPartySuggestion', () => {
  it('renders the component with platform name', () => {
    render(<BlockPartySuggestion platformName="Facebook" />);

    expect(screen.getByText('Automate this with Block Party')).toBeInTheDocument();
    expect(screen.getByText(/Facebook/)).toBeInTheDocument();
  });

  it('shows the promo code JOINTHEPARTY', () => {
    render(<BlockPartySuggestion platformName="Instagram" />);

    expect(screen.getByText('JOINTHEPARTY')).toBeInTheDocument();
  });

  it('includes a link to Block Party', () => {
    render(<BlockPartySuggestion platformName="Twitter" />);

    const links = screen.getAllByRole('link', { name: /Block Party|Get Block Party/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', 'https://www.blockpartyapp.com');
  });

  it('shows the no-commission disclaimer', () => {
    render(<BlockPartySuggestion platformName="LinkedIn" />);

    expect(screen.getByText(/don't get any commission/i)).toBeInTheDocument();
  });

  it('lists Block Party benefits', () => {
    render(<BlockPartySuggestion platformName="TikTok" />);

    expect(screen.getByText(/filters out harassment/i)).toBeInTheDocument();
    expect(screen.getByText(/one click/i)).toBeInTheDocument();
    expect(screen.getByText(/Free tier/i)).toBeInTheDocument();
  });
});
