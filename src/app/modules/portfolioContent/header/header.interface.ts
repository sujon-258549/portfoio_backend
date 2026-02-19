export type THeaderButton = {
  icon: string;
  link: string;
  text: string;
};

export type TNavLink = {
  text: string;
  link: string;
  icon: string;
  showInHeader?: boolean;
};

export type THeader = {
  type: 'header';
  isActive: boolean;
  isSideOpen: boolean;
  logo: string;
  logoAlt: string;
  logoHeight: number;
  logoWidth: number;
  navLinks: TNavLink[];
  buttons: {
    primary: THeaderButton;
    secondary: THeaderButton;
  };
  slNumber?: number | string;
};
