import { Schema, model } from 'mongoose';
import { TServiceItem, TServices } from './services.interface';

const serviceItemSchema = new Schema<TServiceItem>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    features: { type: [String], required: true },
  },
  { _id: false },
);

const servicesSchema = new Schema<TServices>(
  {
    badge: { type: String, required: true },
    title: { type: String, required: true },
    titleHighlight: { type: String, required: true },
    services: { type: [serviceItemSchema], required: true },
    type: { type: String, default: 'services' },
    isActive: { type: Boolean, default: true },
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const Services = model<TServices>('Services', servicesSchema);
