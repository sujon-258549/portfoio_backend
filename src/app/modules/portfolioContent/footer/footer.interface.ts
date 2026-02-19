export type TSocialLink = {
  faIcon: string;
  href: string;
  label: string;
  color: string;
};

export type TQuickLink = {
  name: string;
  href: string;
};

export type TContactItem = {
  label: string;
  value: string;
  icon: string;
  href?: string;
};

export type TFooter = {
  type: string;
  logo: string;
  description: string;
  socialLinks: TSocialLink[];
  linksTitle: string;
  linksTitleIcon?: string;
  quickLinks: TQuickLink[];
  contactTitle: string;
  contactTitleIcon?: string;
  contactItems: TContactItem[];
  craftedBy: string;
  copyrightText: string;
};
