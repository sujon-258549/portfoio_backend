import { z } from 'zod';

const headerButtonSchema = z.object({
  icon: z.string({ message: 'Icon is required' }),
  link: z.string({ message: 'Link is required' }),
  text: z.string({ message: 'Text is required' }),
});

const navLinkSchema = z.object({
  label: z.string({ message: 'Label is required' }),
  link: z.string({ message: 'Link is required' }),
});

const headerValidationSchema = z.object({
  body: z.object({
    type: z.literal('header'),
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
