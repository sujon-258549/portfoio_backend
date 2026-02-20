import { z } from 'zod';

const quickLinkValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  label: z.string().min(1, 'Label is required'),
  icon: z.string().min(1, 'Icon is required'),
});

const welcomeModalValidationSchema = z.object({
  body: z.object({
    type: z.literal('welcome_modal'),
    title: z.string().min(1, 'Title is required'),
    titleHighlight: z.string().min(1, 'Title highlight is required'),
    description: z.string().min(1, 'Description is required'),
    welcomeBadge: z.string().min(1, 'Welcome badge is required'),
    ctaText: z.string().min(1, 'CTA text is required'),
    ctaLink: z.string().min(1, 'CTA link is required'),
    isActive: z.boolean().default(true).optional(),
    quickLinks: z.array(quickLinkValidationSchema),
    slNumber: z.union([z.number(), z.string()]).optional(),
  }),
});

export const WelcomeModalValidations = {
  welcomeModalValidationSchema,
};
