import { Schema, model } from 'mongoose';
import { TCreativeItem } from './creative.interface';

const creativeItemSchema = new Schema<TCreativeItem>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const CreativeItem = model<TCreativeItem>(
  'CreativeItem',
  creativeItemSchema,
);
