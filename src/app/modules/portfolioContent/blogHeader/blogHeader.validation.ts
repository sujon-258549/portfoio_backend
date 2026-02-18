import { z } from 'zod';

const blogHeaderValidationSchema = z.object({
  body: z.object({
    badge: z.string(),
    badgeIcon: z.string(),
    description: z.string(),
    title: z.string(),
    titleHighlight: z.string(),
    type: z.literal('blog_header'),
    isActive: z.boolean().optional().default(true),
  }),
});

export const BlogHeaderValidations = {
  blogHeaderValidationSchema,
};
