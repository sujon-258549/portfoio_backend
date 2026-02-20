import { z } from 'zod';

const faqItemValidationSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

const faqValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    isActive: z.boolean().optional().default(true),
    type: z.literal('faq'),
    faqs: z.array(faqItemValidationSchema),
    slNumber: z.union([z.number(), z.string()]).optional(),
  }),
});

export const FAQValidations = {
  faqValidationSchema,
};
