import { Schema, model } from 'mongoose';
import { TSkillCategory, TSkillsContent } from './skills.interface';

const skillCategorySchema = new Schema<TSkillCategory>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    icon: { type: String, required: true },
    skills: { type: [String], required: true },
  },
  { _id: false },
);

const skillsSchema = new Schema<TSkillsContent>(
  {
    badge: { type: String, required: true },
    title: { type: String, required: true },
    titleHighlight: { type: String, required: true },
    categories: { type: [skillCategorySchema], required: true },
    type: { type: String, required: true, unique: true, default: 'skills' },
  },
  {
    timestamps: true,
  },
);

export const Skills = model<TSkillsContent>('Skills', skillsSchema);
