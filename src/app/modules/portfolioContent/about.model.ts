import { Schema, model } from 'mongoose';
import { TAboutContent, TAboutHighlight, TAboutStat } from './about.interface';

const aboutHighlightSchema = new Schema<TAboutHighlight>(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false },
);

const aboutStatSchema = new Schema<TAboutStat>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false },
);

const aboutSchema = new Schema<TAboutContent>(
  {
    badge: { type: String, required: true },
    badgeIcon: { type: String, required: true },
    description: { type: [String], required: true },
    highlights: { type: [aboutHighlightSchema], required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    stats: { type: [aboutStatSchema], required: true },
    title: { type: String, required: true },
    titleHighlight: { type: String, required: true },
    type: { type: String, required: true, unique: true, default: 'about' },
  },
  {
    timestamps: true,
  },
);

export const About = model<TAboutContent>('About', aboutSchema);
