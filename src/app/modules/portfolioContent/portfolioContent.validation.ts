import { NextFunction, Request, Response } from 'express';
import { FooterValidations } from './footer.validation';
import { ContactValidations } from './contact.validation';
import { ProjectSectionHeaderValidations } from './projectSectionHeader.validation';
import { SkillsValidations } from './skills.validation';
import { AboutValidations } from './about.validation';
import { HeroValidations } from './hero.validation';
import { EducationValidations } from './education.validation';
import { ExperienceValidations } from './experience.validation';
import { HeaderValidations } from './header.validation';
import { ServicesValidations } from './services.validation';

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
