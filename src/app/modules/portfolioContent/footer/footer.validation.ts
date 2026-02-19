import { z } from 'zod';

const socialLinkSchema = z.object({
  faIcon: z.string(),
  href: z.string().url(),
  label: z.string(),
  color: z.string(),
});

const quickLinkSchema = z.object({
  name: z.string(),
  href: z.string(),
});

const contactItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string(),
  href: z.string().optional(),
});

const createFooterValidationSchema = z.object({
  body: z.object({
    type: z.string(),
    logo: z.string(),
    description: z.string(),
    socialLinks: z.array(socialLinkSchema),
    linksTitle: z.string(),
    linksTitleIcon: z.string().optional(),
    quickLinks: z.array(quickLinkSchema),
    contactTitle: z.string(),
    contactTitleIcon: z.string().optional(),
    contactItems: z.array(contactItemSchema),
    craftedBy: z.string(),
    copyrightText: z.string(),
  }),
});

export const FooterValidations = {
  createFooterValidationSchema,
};
