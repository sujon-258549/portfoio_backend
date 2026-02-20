import { Schema, model } from 'mongoose';
import { TReviewSectionHeader } from './reviewSectionHeader.interface';

const reviewSectionHeaderSchema = new Schema<TReviewSectionHeader>(
  {
    badge: { type: String, required: true },
    badgeIcon: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    title: { type: String, required: true },
    titleHighlight: { type: String, required: true },
    type: {
      type: String,
      required: true,
      unique: true,
      default: 'review_section_header',
    },
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const ReviewSectionHeader = model<TReviewSectionHeader>(
  'ReviewSectionHeader',
  reviewSectionHeaderSchema,
);
