import { Schema, model } from 'mongoose';
import {
  THeroButton,
  THeroContent,
  THeroSocialLink,
  THeroTechStack,
} from './hero.interface';

const heroButtonSchema = new Schema<THeroButton>(
  {
    text: { type: String, required: true },
    link: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false },
);

const heroSocialLinkSchema = new Schema<THeroSocialLink>(
  {
    icon: { type: String, required: true },
    url: { type: String, required: true },
    platform: { type: String, required: true },
  },
  { _id: false },
);

const heroTechStackSchema = new Schema<THeroTechStack>(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String },
  },
  { _id: false },
);

const heroSchema = new Schema<THeroContent>(
  {
    greeting: { type: String, required: true },
    name: { type: String, required: true },
    nameHighlight: { type: String, required: true },
    description: { type: String, required: true },
    rotatingTexts: { type: [String], required: true },
    buttons: {
      primary: { type: heroButtonSchema, required: true },
      secondary: { type: heroButtonSchema, required: true },
    },
    socialLinks: { type: [heroSocialLinkSchema], required: true },
    techHighlights: { type: [String], required: true },
    techStack: { type: [heroTechStackSchema], required: true },
    type: { type: String, required: true, unique: true, default: 'hero' },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Hero = model<THeroContent>('Hero', heroSchema);
