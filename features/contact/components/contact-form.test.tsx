import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContactForm } from './contact-form';

vi.mock('../actions', () => ({
  submitContact: vi.fn(() =>
    Promise.resolve({
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors: { email: ['Enter a valid email address'] },
    }),
  ),
}));

describe('ContactForm', () => {
  it('shows server-side field errors next to the right field', async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    const email = await screen.findByLabelText('Email');
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(email).toHaveAccessibleDescription('Enter a valid email address');
    expect(screen.getByRole('status')).toHaveTextContent('Please fix the highlighted fields.');
  });
});
