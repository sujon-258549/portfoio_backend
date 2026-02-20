import { z } from 'zod';

const workflowStepValidationSchema = z.object({
  id: z.string(),
  stepNumber: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  image: z.string().optional(),
});

const workflowValidationSchema = z.object({
  body: z.object({
    badge: z.string(),
    badgeIcon: z.string(),
    title: z.string(),
    titleHighlight: z.string(),
    description: z.string(),
    isActive: z.boolean().optional().default(true),
    steps: z.array(workflowStepValidationSchema),
    type: z.literal('workflow'),
    slNumber: z.union([z.number(), z.string()]).optional(),
  }),
});

export const WorkflowValidations = {
  workflowValidationSchema,
};
