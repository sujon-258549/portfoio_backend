import { z } from 'zod';

const experienceItemValidationSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  period: z.string(),
  duration: z.string(),
  type: z.string(),
  companyType: z.string(),
  description: z.string(),
  icon: z.string(),
  achievements: z.array(z.string()),
  responsibilities: z.array(z.string()),
  technologies: z.array(z.string()),
});

const experienceValidationSchema = z.object({
  body: z.object({
    type: z.literal('experience'),
    badge: z.string(),
    badgeIcon: z.string(),
    title: z.string(),
    titleColor: z.string(),
    description: z.string(),
    experiences: z.array(experienceItemValidationSchema),
    isActive: z.boolean().default(true),
    slNumber: z.union([z.number(), z.string()]).optional(),
  }),
});

export const ExperienceValidations = {
  experienceValidationSchema,
};
