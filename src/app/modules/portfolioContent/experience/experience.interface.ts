export type TExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  type: string;
  companyType: string;
  description: string;
  icon: string;
  achievements: string[];
  responsibilities: string[];
  technologies: string[];
};

export type TExperienceContent = {
  type: 'experience';
  badge: string;
  badgeIcon: string;
  title: string;
  titleColor: string;
  description: string;
  experiences: TExperienceItem[];
};
