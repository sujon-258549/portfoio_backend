export type TBrand = {
  id: number;
  name: string;
  image: string;
};

export type TStat = {
  label: string;
  value: string;
  icon: string;
};

export type TTrustSection = {
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
  type: 'trust_section';
  brands: TBrand[];
  stats: TStat[];
  slNumber?: number | string;
};
