import { z } from 'zod';

const creativeSectionValidationSchema = z.object({
  body: z.object({
    badge: z.string(),
    badgeIcon: z.string(),
    title: z.string(),
    titleHighlight: z.string(),
    description: z.string(),
    isActive: z.boolean().optional(),
    type: z.literal('creative_section'),
    slNumber: z.union([z.number(), z.string()]).optional(),
  }),
});

export const CreativeSectionValidations = {
  creativeSectionValidationSchema,
};
