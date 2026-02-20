import { z } from 'zod';

const brandValidationSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
});

const statValidationSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string(),
});

const trustSectionValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    isActive: z.boolean().optional().default(true),
    type: z.literal('trust_section'),
    brands: z.array(brandValidationSchema),
    stats: z.array(statValidationSchema),
    slNumber: z.union([z.number(), z.string()]).optional(),
  }),
});

export const TrustSectionValidations = {
  trustSectionValidationSchema,
};
