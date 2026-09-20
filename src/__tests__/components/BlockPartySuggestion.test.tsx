import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlockPartySuggestion from '@/components/step/BlockPartySuggestion';

describe('BlockPartySuggestion', () => {
  it('renders the component with correct heading', () => {
    render(<BlockPartySuggestion />);

    expect(screen.getByText('Want to automate this? Use Block Party!')).toBeInTheDocument();
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

  it('discloses that the recommendation is not an ad', () => {
    render(<BlockPartySuggestion />);

    expect(screen.getByText(/Not an ad/i)).toBeInTheDocument();
  });

  it('explains free vs paid versions', () => {
    render(<BlockPartySuggestion />);

    expect(screen.getByText(/Free version scans your privacy settings/i)).toBeInTheDocument();
    expect(screen.getByText(/paid version automatically applies/i)).toBeInTheDocument();
  });
});
