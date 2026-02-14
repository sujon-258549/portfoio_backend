import { Model } from 'mongoose';
import { Footer } from './footer.model';
import { DynamicContent } from './genericContent.model';
import { Contact } from './contact.model';
import { ProjectSectionHeader } from './projectSectionHeader.model';
import { Skills } from './skills.model';
import { About } from './about.model';
import { Hero } from './hero.model';
import { Education } from './education.model';
import { Experience } from './experience.model';
import { Header } from './header.model';

export const modelMapper: Record<string, Model<any>> = {
  footer: Footer,
  contact: Contact,
  'project-section-header': ProjectSectionHeader,
  skills: Skills,
  about: About,
  hero: Hero,
  education: Education,
  experience: Experience,
  generic: DynamicContent,
  header: Header,
};
