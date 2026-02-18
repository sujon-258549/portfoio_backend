import { Schema, model } from 'mongoose';
import { TContact, TContactCard } from './contact.interface';

const contactCardSchema = new Schema<TContactCard>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const contactSchema = new Schema<TContact>(
  {
    type: { type: String, required: true },
    badge: { type: String, required: true },
    badgeIcon: { type: String, required: true },
    title: { type: String, required: true },
    titleColor: { type: String, required: true },
    contactCards: [contactCardSchema],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Contact = model<TContact>('Contact', contactSchema);
