export type TEducationItem = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  description: string;
  icon: string;
  isMain: boolean;
  highlights: string[];
  courses: string[];
};

export type TEducationContent = {
  type: 'education';
  badge: string;
  badgeIcon: string;
  title: string;
  titleColor: string;
  description: string;
  education: TEducationItem[];
  isActive: boolean;
  slNumber?: number | string;
};
