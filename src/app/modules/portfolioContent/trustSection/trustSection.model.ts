import { Schema, model } from 'mongoose';
import { TBrand, TStat, TTrustSection } from './trustSection.interface';

const brandSchema = new Schema<TBrand>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const statSchema = new Schema<TStat>({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
});

const trustSectionSchema = new Schema<TTrustSection>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    type: {
      type: String,
      required: true,
      unique: true,
      default: 'trust_section',
    },
    brands: [brandSchema],
    stats: [statSchema],
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const TrustSection = model<TTrustSection>(
  'TrustSection',
  trustSectionSchema,
);
