import { z } from 'zod';

const createCreativeItemValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    image: z.string(),
    link: z.string(),
  }),
});

const updateCreativeItemValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
  }),
});

export const CreativeValidation = {
  createCreativeItemValidationSchema,
  updateCreativeItemValidationSchema,
};
