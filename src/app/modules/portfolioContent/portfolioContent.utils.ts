import { Model } from 'mongoose';
import { Footer } from './footer/footer.model';
import { DynamicContent } from './generic/genericContent.model';
import { Contact } from './contact/contact.model';
import { ProjectSectionHeader } from './projectSectionHeader/projectSectionHeader.model';
import { Skills } from './skills/skills.model';
import { About } from './about/about.model';
import { Hero } from './hero/hero.model';
import { Education } from './education/education.model';
import { Experience } from './experience/experience.model';
import { Header } from './header/header.model';
import { Services } from './services/services.model';
import { BlogHeader } from './blogHeader/blogHeader.model';

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
  services: Services,
  blog_header: BlogHeader,
};
