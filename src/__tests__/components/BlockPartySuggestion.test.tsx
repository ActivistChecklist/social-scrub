import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlockPartySuggestion from '@/components/step/BlockPartySuggestion';

describe('BlockPartySuggestion', () => {
  it('renders the component with correct heading', () => {
    render(<BlockPartySuggestion />);

    expect(screen.getByText('Automate your settings scan with Block Party')).toBeInTheDocument();
  });

  it('shows the promo code JOINTHEPARTY', () => {
    render(<BlockPartySuggestion />);

    expect(screen.getByText('JOINTHEPARTY')).toBeInTheDocument();
  });

  it('includes a link to Block Party', () => {
    render(<BlockPartySuggestion />);

    const links = screen.getAllByRole('link', { name: /Block Party|Try Block Party/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', 'https://www.blockpartyapp.com');
  });

  it('shows the not affiliated disclaimer', () => {
    render(<BlockPartySuggestion />);

    expect(screen.getByText(/not affiliated with Block Party/i)).toBeInTheDocument();
  });

  it('explains free vs paid versions', () => {
    render(<BlockPartySuggestion />);

    expect(screen.getByText(/Free:/)).toBeInTheDocument();
    expect(screen.getByText(/Paid:/)).toBeInTheDocument();
    expect(screen.getByText(/Scans your privacy settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Automatically applies/i)).toBeInTheDocument();
  });
});
