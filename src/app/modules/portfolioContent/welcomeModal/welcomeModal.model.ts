import { Schema, model } from 'mongoose';
import { IQuickLink, IWelcomeModal } from './welcomeModal.interface';

const quickLinkSchema = new Schema<IQuickLink>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false },
);

const welcomeModalSchema = new Schema<IWelcomeModal>(
  {
    type: { type: String, required: true, default: 'welcome_modal' },
    title: { type: String, required: true },
    titleHighlight: { type: String, required: true },
    description: { type: String, required: true },
    welcomeBadge: { type: String, required: true },
    ctaText: { type: String, required: true },
    ctaLink: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    quickLinks: [quickLinkSchema],
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const WelcomeModal = model<IWelcomeModal>(
  'WelcomeModal',
  welcomeModalSchema,
);
