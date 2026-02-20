import { z } from 'zod';

const aboutHighlightValidationSchema = z.object({
  title: z.string(),
  desc: z.string(),
  icon: z.string(),
});

const aboutStatValidationSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string(),
});

const aboutValidationSchema = z.object({
  body: z.object({
    badge: z.string(),
    badgeIcon: z.string(),
    description: z.array(z.string()),
    highlights: z.array(aboutHighlightValidationSchema),
    image: z.string(),
    name: z.string(),
    role: z.string(),
    stats: z.array(aboutStatValidationSchema),
    title: z.string(),
    titleHighlight: z.string(),
    type: z.literal('about'),
    isActive: z.boolean().default(true),
    slNumber: z.union([z.number(), z.string()]).optional(),
  }),
});

export const AboutValidations = {
  aboutValidationSchema,
};
