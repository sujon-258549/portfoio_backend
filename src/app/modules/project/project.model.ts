import { Schema, model } from 'mongoose';
import {
  TProject,
  TProjectSolution,
  TProjectStat,
  TProjectTechnologies,
} from './project.interface';

const technologiesSchema = new Schema<TProjectTechnologies>(
  {
    frontend: { type: [String], required: true },
    backend: { type: [String], required: true },
    database: { type: [String], required: true },
    tools: { type: [String], required: true },
  },
  { _id: false },
);

const solutionSchema = new Schema<TProjectSolution>(
  {
    image: { type: String, required: false },
    text: { type: String, required: true },
  },
  { _id: false },
);

const statSchema = new Schema<TProjectStat>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const projectSchema = new Schema<TProject>(
  {
    // No explicit _id definition needed as Mongoose handles it automatically
    title: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    image: { type: String, required: true },
    imageName: { type: String },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    features: { type: [String], required: true },
    technologies: { type: technologiesSchema, required: true },
    liveUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    challenges: { type: [String], required: true },
    solutions: { type: [solutionSchema], required: true },
    duration: { type: String, required: true },
    role: { type: String, required: true },
    teamMembers: { type: [String], required: true },
    tags: { type: [String], required: true },
    stats: { type: [statSchema], required: true },
    problem: { type: String, required: true },
    plan: { type: String, required: true },
    detailedDescriptions: {
      type: [
        {
          title: { type: String, required: true },
          content: { type: String, required: true },
        },
      ],
      default: [],
    },
    gallery: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Project = model<TProject>('Project', projectSchema);
