import { z } from 'zod';

const skillCategoryValidationSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  skills: z.array(z.string()),
});

const skillsValidationSchema = z.object({
  body: z.object({
    badge: z.string(),
    title: z.string(),
    titleHighlight: z.string(),
    categories: z.array(skillCategoryValidationSchema),
    type: z.literal('skills'),
  }),
});

export const SkillsValidations = {
  skillsValidationSchema,
};
