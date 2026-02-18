import { z } from 'zod';

const serviceItemValidationSchema = z.object({
  id: z.string({
    message: 'ID is required',
  }),
  title: z.string({
    message: 'Title is required',
  }),
  description: z.string({
    message: 'Description is required',
  }),
  icon: z.string({
    message: 'Icon is required',
  }),
  features: z.array(z.string(), {
    message: 'Features are required',
  }),
});

const servicesValidationSchema = z.object({
  body: z.object({
    badge: z.string({
      message: 'Badge is required',
    }),
    title: z.string({
      message: 'Title is required',
    }),
    titleHighlight: z.string({
      message: 'Title highlight is required',
    }),
    services: z.array(serviceItemValidationSchema, {
      message: 'Services are required',
    }),
    type: z.literal('services'),
    isActive: z.boolean().default(true).optional(),
  }),
});

export const ServicesValidations = {
  servicesValidationSchema,
};
