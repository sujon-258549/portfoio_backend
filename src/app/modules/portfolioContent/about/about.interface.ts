export type TAboutHighlight = {
  title: string;
  desc: string;
  icon: string;
};

export type TAboutStat = {
  label: string;
  value: string;
  icon: string;
};

export type TAboutContent = {
  badge: string;
  badgeIcon: string;
  description: string[];
  highlights: TAboutHighlight[];
  image: string;
  name: string;
  role: string;
  stats: TAboutStat[];
  title: string;
  titleHighlight: string;
  type: 'about';
};
