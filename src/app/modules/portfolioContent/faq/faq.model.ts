import { Schema, model } from 'mongoose';
import { TFAQ, TFAQItem } from './faq.interface';

const faqItemSchema = new Schema<TFAQItem>({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const faqSchema = new Schema<TFAQ>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    type: {
      type: String,
      required: true,
      unique: true,
      default: 'faq',
    },
    faqs: [faqItemSchema],
    slNumber: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const FAQ = model<TFAQ>('FAQ', faqSchema);
