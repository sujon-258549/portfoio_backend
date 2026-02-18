import { z } from 'zod';

const sendOtpValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
});

const verifyOtpValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    code: z.string().length(6),
  }),
});

const createReviewValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    role: z.string(),
    company: z.string(),
    content: z.string(),
    rating: z.number().min(1).max(5),
  }),
});

export const ReviewValidations = {
  sendOtpValidationSchema,
  verifyOtpValidationSchema,
  createReviewValidationSchema,
};
