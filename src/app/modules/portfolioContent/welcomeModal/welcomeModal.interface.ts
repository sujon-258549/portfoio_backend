import { Document } from 'mongoose';

export interface IQuickLink {
  id: string;
  label: string;
  icon: string;
}

export interface IWelcomeModal extends Document {
  ctaLink: string;
  ctaText: string;
  description: string;
  isActive: boolean;
  quickLinks: IQuickLink[];
  title: string;
  titleHighlight: string;
  type: 'welcome_modal';
  welcomeBadge: string;
}
