export type TWorkflowStep = {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
};

export type TWorkflow = {
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  isActive: boolean;
  steps: TWorkflowStep[];
  type: 'workflow';
  slNumber?: number | string;
};
