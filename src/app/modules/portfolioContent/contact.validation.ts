import { z } from 'zod';

const contactCardValidationSchema = z.object({
  icon: z.string(),
  title: z.string(),
  value: z.string(),
});

const createContactValidationSchema = z.object({
  body: z.object({
    type: z.string(),
    badge: z.string(),
    badgeIcon: z.string(),
    title: z.string(),
    titleColor: z.string(),
    contactCards: z.array(contactCardValidationSchema),
  }),
});

export const ContactValidations = {
  createContactValidationSchema,
};
