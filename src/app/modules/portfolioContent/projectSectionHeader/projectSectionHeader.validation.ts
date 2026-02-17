import { z } from 'zod';

const projectSectionHeaderValidationSchema = z.object({
  body: z.object({
    badge: z.string(),
    badgeIcon: z.string(),
    completedCount: z.string(),
    description: z.string(),
    title: z.string(),
    titleHighlight: z.string(),
    type: z.literal('project-section-header'),
  }),
});

export const ProjectSectionHeaderValidations = {
  projectSectionHeaderValidationSchema,
};
