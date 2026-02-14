import { Schema, model } from 'mongoose';

const dynamicSchema = new Schema(
  {
    type: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    strict: false, // Allow any fields in the top level if needed, though we'll use 'data' for the core content
  },
);

export const DynamicContent = model('DynamicContent', dynamicSchema);
