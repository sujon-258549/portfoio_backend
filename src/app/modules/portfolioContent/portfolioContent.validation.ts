import { NextFunction, Request, Response } from 'express';
import { FooterValidations } from './footer/footer.validation';
import { ContactValidations } from './contact/contact.validation';
import { ProjectSectionHeaderValidations } from './projectSectionHeader/projectSectionHeader.validation';
import { SkillsValidations } from './skills/skills.validation';
import { AboutValidations } from './about/about.validation';
import { HeroValidations } from './hero/hero.validation';
import { EducationValidations } from './education/education.validation';
import { ExperienceValidations } from './experience/experience.validation';
import { HeaderValidations } from './header/header.validation';
import { ServicesValidations } from './services/services.validation';
import { BlogHeaderValidations } from './blogHeader/blogHeader.validation';

import catchAsync from '../../utils/catchAsync';

export const validationMapper: Record<string, any> = {
  footer: FooterValidations.createFooterValidationSchema,
  contact: ContactValidations.createContactValidationSchema,
  'project-section-header':
    ProjectSectionHeaderValidations.projectSectionHeaderValidationSchema,
  skills: SkillsValidations.skillsValidationSchema,
  about: AboutValidations.aboutValidationSchema,
  hero: HeroValidations.heroValidationSchema,
  education: EducationValidations.educationValidationSchema,
  experience: ExperienceValidations.experienceValidationSchema,
  header: HeaderValidations.headerValidationSchema,
  services: ServicesValidations.servicesValidationSchema,
  blog_header: BlogHeaderValidations.blogHeaderValidationSchema,
};

export const dynamicValidateRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const contentType = req.body.type as string;
    const schema = validationMapper[contentType];

    if (schema) {
      console.log('--- Dynamic Validation Debug ---');
      console.log('Content Type:', contentType);
      console.log('Body:', JSON.stringify(req.body, null, 2));

      await schema.parseAsync({
        body: req.body,
      });
    }

    next();
  },
);
