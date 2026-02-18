import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { otpEmailTemplate, sendEmail } from '../../utils/sendEmail';
import { TReview } from './review.interface';
import { Otp, Review } from './review.model';

// ─── Step 3: Send OTP ───────────────────────────────────────────────────────
const sendOtp = async (name: string, email: string): Promise<void> => {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Remove any existing OTP for this email
  await Otp.deleteMany({ email });

  // Save new OTP
  await Otp.create({ email, otp, expiresAt, verified: false });

  // Send email
  const html = otpEmailTemplate({ name, otp });
  await sendEmail(email, html, 'Your Review Verification Code ✔');
};

// ─── Step 5: Verify OTP ─────────────────────────────────────────────────────
const verifyOtp = async (email: string, code: string): Promise<void> => {
  const record = await Otp.findOne({ email });

  if (!record) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'No OTP found for this email. Please request a new one.',
    );
  }

  if (record.expiresAt < new Date()) {
    await Otp.deleteMany({ email });
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'OTP has expired. Please request a new one.',
    );
  }

  if (record.otp !== code) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Invalid OTP. Please try again.',
    );
  }

  // Mark as verified
  await Otp.updateOne({ email }, { verified: true });
};

// ─── Step 7: Submit Review ───────────────────────────────────────────────────
const createReview = async (payload: TReview) => {
  // Ensure the email was OTP-verified
  const otpRecord = await Otp.findOne({ email: payload.email, verified: true });

  if (!otpRecord) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Email not verified. Please complete OTP verification first.',
    );
  }

  const result = await Review.create(payload);

  // Clean up the OTP record after successful submission
  await Otp.deleteMany({ email: payload.email });

  return result;
};

// ─── Admin: Get All Reviews ──────────────────────────────────────────────────
const getAllReviews = async (isAdmin: boolean = false) => {
  const query = isAdmin ? {} : { isActive: true };
  const result = await Review.find(query).sort({ createdAt: -1 });
  return result;
};

// ─── Admin: Update Review ────────────────────────────────────────────────────
const updateReview = async (id: string, payload: Partial<TReview>) => {
  const result = await Review.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Review not found!');
  }

  return result;
};

// ─── Admin: Delete Review ────────────────────────────────────────────────────
const deleteReview = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};

export const ReviewServices = {
  sendOtp,
  verifyOtp,
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
