import { Schema, model } from 'mongoose';

export type ICourse = {
  title: string;
  description: string;
  price: number;
};

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const Course = model<ICourse>('Course', courseSchema);
