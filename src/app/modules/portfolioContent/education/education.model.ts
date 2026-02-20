import { Schema, model } from 'mongoose';
import { TEducationContent, TEducationItem } from './education.interface';

const educationItemSchema = new Schema<TEducationItem>(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String, required: true },
    period: { type: String, required: true },
    grade: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    isMain: { type: Boolean, required: true },
    highlights: { type: [String], required: true },
    courses: { type: [String], required: true },
  },
  { _id: false },
);

const educationSchema = new Schema<TEducationContent>(
  {
    type: { type: String, required: true, unique: true, default: 'education' },
    badge: { type: String, required: true },
    badgeIcon: { type: String, required: true },
    title: { type: String, required: true },
    titleColor: { type: String, required: true },
    description: { type: String, required: true },
    education: { type: [educationItemSchema], required: true },
    isActive: { type: Boolean, default: true },
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const Education = model<TEducationContent>('Education', educationSchema);
