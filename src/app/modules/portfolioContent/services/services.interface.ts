export type TServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export type TServices = {
  badge: string;
  title: string;
  titleHighlight: string;
  services: TServiceItem[];
  type: 'services';
  isActive: boolean;
  slNumber?: number | string;
};
