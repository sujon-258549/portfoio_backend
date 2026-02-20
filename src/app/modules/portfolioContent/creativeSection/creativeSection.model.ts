import { Schema, model } from 'mongoose';
import { TCreativeSection } from './creativeSection.interface';

const creativeSectionSchema = new Schema<TCreativeSection>(
  {
    badge: { type: String, required: true },
    badgeIcon: { type: String, required: true },
    title: { type: String, required: true },
    titleHighlight: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    type: { type: String, required: true, default: 'creative_section' },
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const CreativeSection = model<TCreativeSection>(
  'CreativeSection',
  creativeSectionSchema,
);
