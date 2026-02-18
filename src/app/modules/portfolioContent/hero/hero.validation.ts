import { z } from 'zod';

const heroButtonValidationSchema = z.object({
  text: z.string(),
  link: z.string(),
  icon: z.string(),
});

const heroSocialLinkValidationSchema = z.object({
  icon: z.string(),
  url: z.string(),
  platform: z.string(),
});

const heroTechStackValidationSchema = z.object({
  name: z.string(),
  icon: z.string(),
  color: z.string().optional(),
});

const heroValidationSchema = z.object({
  body: z.object({
    greeting: z.string(),
    name: z.string(),
    nameHighlight: z.string(),
    description: z.string(),
    rotatingTexts: z.array(z.string()),
    buttons: z.object({
      primary: heroButtonValidationSchema,
      secondary: heroButtonValidationSchema,
    }),
    socialLinks: z.array(heroSocialLinkValidationSchema),
    techHighlights: z.array(z.string()),
    techStack: z.array(heroTechStackValidationSchema),
    type: z.literal('hero'),
    isActive: z.boolean().default(true),
  }),
});

export const HeroValidations = {
  heroValidationSchema,
};
