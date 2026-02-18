import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { emailUpdateOtpTemplate, sendEmail } from '../../utils/sendEmail';
import { IUser } from './user.interface';
import { User } from './user.model';

// ─── Register ────────────────────────────────────────────────────────────────
const registerUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

// ─── Get Me ──────────────────────────────────────────────────────────────────
const getMe = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

// ─── Update Profile (name, photo URL, bio) ───────────────────────────────────
const updateMyProfile = async (
  email: string,
  payload: Pick<IUser, 'name' | 'photo' | 'bio'>,
) => {
  const { name, photo, bio } = payload;
  const updateData: Partial<IUser> = {};
  if (name !== undefined) updateData.name = name;
  if (photo !== undefined) updateData.photo = photo;
  if (bio !== undefined) updateData.bio = bio;

  const result = await User.findOneAndUpdate({ email }, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  return result;
};

// ─── Request Email Update — sends OTP to the NEW email ───────────────────────
const requestEmailUpdate = async (email: string, newEmail: string) => {
  console.log(email, newEmail);
  // Check new email is not already taken
  const existing = await User.findOne({ email: newEmail });
  if (existing) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This email is already in use by another account.',
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Save pending email + OTP (use $set to update hidden fields)
  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        pendingEmail: newEmail,
        emailUpdateOtp: otp,
        emailUpdateOtpExpiresAt: expiresAt,
      },
    },
  );

  // Send OTP to the NEW email
  const html = emailUpdateOtpTemplate({
    name: user.name,
    otp,
    newEmail,
  });
  await sendEmail(newEmail, html, 'Confirm Your New Email Address ✔');

  return { message: 'OTP sent to your new email address.' };
};

// ─── Verify Email Update OTP — finalizes the email change ────────────────────
const verifyEmailUpdate = async (email: string, otp: string) => {
  const user = await User.findOne({ email }).select(
    '+pendingEmail +emailUpdateOtp +emailUpdateOtpExpiresAt',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  if (!user.pendingEmail || !user.emailUpdateOtp) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'No pending email update. Please request a new OTP.',
    );
  }

  if (
    user.emailUpdateOtpExpiresAt &&
    user.emailUpdateOtpExpiresAt < new Date()
  ) {
    // Clear expired OTP
    await User.findOneAndUpdate(
      { email },
      {
        $unset: {
          pendingEmail: '',
          emailUpdateOtp: '',
          emailUpdateOtpExpiresAt: '',
        },
      },
    );
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'OTP has expired. Please request a new one.',
    );
  }

  if (user.emailUpdateOtp !== otp) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Invalid OTP. Please try again.',
    );
  }

  const newEmail = user.pendingEmail;

  // Apply the email change and clear OTP fields
  const updated = await User.findOneAndUpdate(
    { email },
    {
      $set: { email: newEmail },
      $unset: {
        pendingEmail: '',
        emailUpdateOtp: '',
        emailUpdateOtpExpiresAt: '',
      },
    },
    { new: true },
  );

  return updated;
};

export const UserServices = {
  registerUserIntoDB,
  getMe,
  updateMyProfile,
  requestEmailUpdate,
  verifyEmailUpdate,
};
