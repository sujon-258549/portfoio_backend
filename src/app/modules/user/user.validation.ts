import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string({ message: 'Password must be string' })
      .max(20, { message: 'Password cannot be more than 20 characters' }),
    role: z.enum(['admin']).optional(),
  }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    photo: z.string().url({ message: 'Photo must be a valid URL' }).optional(),
    bio: z.string().max(500).optional(),
  }),
});

// Step 1 — request OTP to change email
const requestEmailUpdateValidationSchema = z.object({
  body: z.object({
    newEmail: z.string().email({ message: 'New email must be a valid email' }),
  }),
});

// Step 2 — verify OTP and confirm email change
const verifyEmailUpdateValidationSchema = z.object({
  body: z.object({
    otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateProfileValidationSchema,
  requestEmailUpdateValidationSchema,
  verifyEmailUpdateValidationSchema,
};
