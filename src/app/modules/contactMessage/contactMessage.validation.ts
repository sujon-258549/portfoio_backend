import { z } from 'zod';

const createContactMessageValidationSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Name is required',
    }),
    email: z.string().email('Invalid email address').optional(),
    phone: z.string().optional(),
    subject: z.string({
      message: 'Subject is required',
    }),
    message: z.string({
      message: 'Message is required',
    }),
  }),
});

export const ContactMessageValidations = {
  createContactMessageValidationSchema,
};
