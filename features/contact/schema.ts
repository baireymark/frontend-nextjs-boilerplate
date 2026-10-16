import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name').max(100, 'Use 100 characters or fewer'),
  email: z.email('Enter a valid email address'),
  message: z
    .string()
    .trim()
    .min(10, 'Write at least 10 characters')
    .max(2000, 'Use 2,000 characters or fewer'),
});

export type ContactInput = z.infer<typeof contactSchema>;
