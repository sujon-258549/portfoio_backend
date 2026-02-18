import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    category: z.string(),
    content: z.string(),
    date: z.string(),
    excerpt: z.string(),
    image: z.string(),
    isActive: z.boolean().optional().default(true),
    readTime: z.string(),
    slug: z.string(),
    title: z.string(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    category: z.string().optional(),
    content: z.string().optional(),
    date: z.string().optional(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    isActive: z.boolean().optional(),
    readTime: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
