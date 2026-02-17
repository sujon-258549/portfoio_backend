export type THeaderButton = {
  icon: string;
  link: string;
  text: string;
};

export type TNavLink = {
  text: string;
  link: string;
};

export type THeader = {
  type: 'header';
  logo: string;
  logoAlt: string;
  logoHeight: number;
  logoWidth: number;
  navLinks: TNavLink[];
  buttons: {
    primary: THeaderButton;
    secondary: THeaderButton;
  };
};
