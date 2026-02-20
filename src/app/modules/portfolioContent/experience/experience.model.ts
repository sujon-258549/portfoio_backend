import { Schema, model } from 'mongoose';
import { TExperienceContent, TExperienceItem } from './experience.interface';

const experienceItemSchema = new Schema<TExperienceItem>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    period: { type: String, required: true },
    duration: { type: String, required: true },
    type: { type: String, required: true },
    companyType: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    achievements: { type: [String], required: true },
    responsibilities: { type: [String], required: true },
    technologies: { type: [String], required: true },
  },
  { _id: false },
);

const experienceSchema = new Schema<TExperienceContent>(
  {
    type: { type: String, required: true, unique: true, default: 'experience' },
    badge: { type: String, required: true },
    badgeIcon: { type: String, required: true },
    title: { type: String, required: true },
    titleColor: { type: String, required: true },
    description: { type: String, required: true },
    experiences: { type: [experienceItemSchema], required: true },
    isActive: { type: Boolean, default: true },
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const Experience = model<TExperienceContent>(
  'Experience',
  experienceSchema,
);
