import argon2 from 'argon2';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { passwordChangedTemplate, sendEmail } from '../../utils/sendEmail';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

// ─── Login ───────────────────────────────────────────────────────────────────
const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
  }

  if (user.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }

  const isPasswordMatched = await argon2.verify(
    user.password,
    payload.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.isPasswordChangeRequired,
  };
};

// ─── Change Password — auto-login after success ───────────────────────────────
const changePassword = async (
  userData: { email: string; role: string },
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.findOne({ email: userData.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
  }

  if (user.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }

  const isPasswordMatched = await argon2.verify(
    user.password,
    payload.oldPassword,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Old password does not match');
  }

  // Hash new password via pre-save hook
  user.password = payload.newPassword;
  user.isPasswordChangeRequired = false;
  user.passwordChangedAt = new Date();
  await user.save();

  // ── Auto-login: generate fresh tokens ──────────────────────────────────────
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  // Send notification email (fire-and-forget — do not block response)
  const html = passwordChangedTemplate({ name: user.name });
  sendEmail(user.email, html, '🔐 Password Changed Successfully').catch(() => {
    // Silently ignore email errors
  });

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: false,
  };
};

export const AuthService = {
  loginUser,
  changePassword,
};
