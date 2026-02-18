import { z } from 'zod';

const headerButtonSchema = z.object({
  icon: z.string({ message: 'Icon is required' }),
  link: z.string({ message: 'Link is required' }),
  text: z.string({ message: 'Text is required' }),
});

const navLinkSchema = z.object({
  text: z.string({ message: 'Text is required' }),
  link: z.string({ message: 'Link is required' }),
  icon: z.string({ message: 'Icon is required' }),
  showInHeader: z.boolean().optional(),
});

const headerValidationSchema = z.object({
  body: z.object({
    type: z.literal('header'),
    isActive: z.boolean().optional(),
    isSideOpen: z.boolean().optional(),
    logo: z.string({ message: 'Logo is required' }),
    logoAlt: z.string({ message: 'Logo alt is required' }),
    logoHeight: z.number({ message: 'Logo height is required' }),
    logoWidth: z.number({ message: 'Logo width is required' }),
    navLinks: z.array(navLinkSchema),
    buttons: z.object({
      primary: headerButtonSchema,
      secondary: headerButtonSchema,
    }),
  }),
});

export const HeaderValidations = {
  headerValidationSchema,
};
