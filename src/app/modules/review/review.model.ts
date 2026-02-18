import { Schema, model } from 'mongoose';
import { TOtp, TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    role: { type: String, required: true },
    company: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const otpSchema = new Schema<TOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false },
});

// Auto-delete expired OTPs using TTL index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Review = model<TReview>('Review', reviewSchema);
export const Otp = model<TOtp>('Otp', otpSchema);
