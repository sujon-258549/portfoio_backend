export type TContactCard = {
  icon: string;
  title: string;
  value: string;
};

export type TContact = {
  type: string;
  badge: string;
  badgeIcon: string;
  title: string;
  titleColor: string;
  contactCards: TContactCard[];
  isActive: boolean;
  slNumber?: number | string;
};
