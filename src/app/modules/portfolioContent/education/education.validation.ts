import { z } from 'zod';

const educationItemValidationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  location: z.string(),
  period: z.string(),
  grade: z.string(),
  description: z.string(),
  icon: z.string(),
  isMain: z.boolean(),
  highlights: z.array(z.string()),
  courses: z.array(z.string()),
});

const educationValidationSchema = z.object({
  body: z.object({
    type: z.literal('education'),
    badge: z.string(),
    badgeIcon: z.string(),
    title: z.string(),
    titleColor: z.string(),
    description: z.string(),
    education: z.array(educationItemValidationSchema),
  }),
});

export const EducationValidations = {
  educationValidationSchema,
};
