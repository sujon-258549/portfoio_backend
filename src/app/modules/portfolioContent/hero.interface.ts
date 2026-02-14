export type THeroButton = {
  text: string;
  link: string;
  icon: string;
};

export type THeroSocialLink = {
  icon: string;
  url: string;
  platform: string;
};

export type THeroTechStack = {
  name: string;
  icon: string;
  color?: string;
};

export type THeroContent = {
  greeting: string;
  name: string;
  nameHighlight: string;
  description: string;
  rotatingTexts: string[];
  buttons: {
    primary: THeroButton;
    secondary: THeroButton;
  };
  socialLinks: THeroSocialLink[];
  techHighlights: string[];
  techStack: THeroTechStack[];
  type: 'hero';
};
