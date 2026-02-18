import { Schema, model } from 'mongoose';
import { TBlogHeader } from './blogHeader.interface';

const blogHeaderSchema = new Schema<TBlogHeader>(
  {
    badge: { type: String, required: true },
    badgeIcon: { type: String, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    titleHighlight: { type: String, required: true },
    type: {
      type: String,
      required: true,
      unique: true,
      default: 'blog_header',
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const BlogHeader = model<TBlogHeader>('BlogHeader', blogHeaderSchema);
