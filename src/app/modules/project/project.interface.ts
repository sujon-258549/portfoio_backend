export type TProjectTechnologies = {
  frontend: string[];
  backend: string[];
  database: string[];
  tools: string[];
};

export type TProjectSolution = {
  image: string;
  text: string;
};

export type TProjectStat = {
  label: string;
  value: string;
};

export type TDetailedDescription = {
  title: string;
  content: string;
};

export type TProject = {
  _id?: string;
  title: string;
  category: string;
  thumbnail: string;
  image: string;
  imageName?: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  technologies: TProjectTechnologies;
  liveUrl: string;
  githubUrl: string;
  challenges: string[];
  solutions: TProjectSolution[];
  duration: string;
  role: string;
  teamMembers: string[];
  tags: string[];
  stats: TProjectStat[];
  problem: string;
  plan: string;
  detailedDescriptions: TDetailedDescription[];
  gallery: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  isActive: boolean;
};
