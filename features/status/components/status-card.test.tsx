import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import type { ReactNode } from 'react';

import { server } from '@/tests/fixtures/server';
import { useStatusSettings } from '../store';
import { StatusCard } from './status-card';

function renderWithQuery(ui: ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('StatusCard', () => {
  beforeEach(() => useStatusSettings.setState({ autoRefresh: false }));

  it('shows operational status from the API', async () => {
    renderWithQuery(<StatusCard />);
    expect(await screen.findByText('Operational')).toBeInTheDocument();
  });

  it('shows an error when the API fails', async () => {
    server.use(http.get('*/api/health', () => new HttpResponse(null, { status: 500 })));
    renderWithQuery(<StatusCard />);
    expect(await screen.findByText('The API is unreachable.')).toBeInTheDocument();
  });

  it('toggles auto-refresh in the shared store', async () => {
    renderWithQuery(<StatusCard />);
    const toggle = screen.getByRole('button', { name: /auto-refresh/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(useStatusSettings.getState().autoRefresh).toBe(true);
  });
});
