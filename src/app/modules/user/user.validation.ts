import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string({
        message: 'Password must be string',
      })
      .max(20, { message: 'Password cannot be more than 20 characters' }),
    role: z.enum(['admin']).optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    role: z.enum(['admin']).optional(),
    status: z.enum(['in-progress', 'blocked']).optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
