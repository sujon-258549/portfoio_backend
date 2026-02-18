export type TSkillCategory = {
  id: string;
  title: string;
  icon: string;
  skills: string[];
};

export type TSkillsContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  categories: TSkillCategory[];
  type: 'skills';
  isActive: boolean;
};
