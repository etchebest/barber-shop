import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().min(3).max(120),
  email: z.email().max(160),
  password: z.string().min(6).max(50),
  role: z.enum(['admin', 'barber', 'client']),
  companyId: z.string().min(1),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
