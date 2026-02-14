import { z } from 'zod';

const blockUserValidationSchema = z.object({
  body: z.object({
    reason: z.string({ message: 'Reason must be a string' }).optional(),
  }),
});

export const AdminValidation = {
  blockUserValidationSchema,
};
