import { Schema, model } from 'mongoose';
import { TContactMessage } from './contactMessage.interface';

const contactMessageSchema = new Schema<TContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  },
);

export const ContactMessage = model<TContactMessage>(
  'ContactMessage',
  contactMessageSchema,
);
