import { Schema, model } from 'mongoose';
import { TProjectSectionHeader } from './projectSectionHeader.interface';

const projectSectionHeaderSchema = new Schema<TProjectSectionHeader>(
  {
    badge: { type: String, required: true },
    badgeIcon: { type: String, required: true },
    completedCount: { type: String, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    titleHighlight: { type: String, required: true },
    type: {
      type: String,
      required: true,
      unique: true,
      default: 'project-section-header',
    },
  },
  {
    timestamps: true,
  },
);

export const ProjectSectionHeader = model<TProjectSectionHeader>(
  'ProjectSectionHeader',
  projectSectionHeaderSchema,
);
