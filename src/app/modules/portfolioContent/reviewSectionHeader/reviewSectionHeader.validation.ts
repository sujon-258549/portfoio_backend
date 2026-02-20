import { z } from 'zod';

const reviewSectionHeaderValidationSchema = z.object({
  body: z.object({
    badge: z.string(),
    badgeIcon: z.string(),
    description: z.string(),
    isActive: z.boolean().optional().default(true),
    title: z.string(),
    titleHighlight: z.string(),
    type: z.literal('review_section_header'),
    slNumber: z.union([z.number(), z.string()]).optional(),
  }),
});

export const ReviewSectionHeaderValidations = {
  reviewSectionHeaderValidationSchema,
};
