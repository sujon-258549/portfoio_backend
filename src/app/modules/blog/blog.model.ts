import { Schema, model } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    category: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    readTime: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<TBlog>('Blog', blogSchema);
