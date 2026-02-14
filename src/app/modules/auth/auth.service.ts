import argon2 from 'argon2';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  if (user.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
  }

  const isPasswordMatched = await argon2.verify(
    user.password,
    payload.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
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

const changePassword = async (
  userData: { email: string; role: string },
  payload: any,
) => {
  const user = await User.findOne({ email: userData.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  if (user.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
  }

  const isPasswordMatched = await argon2.verify(
    user.password,
    payload.oldPassword,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Old password do not matched');
  }

  // Hash new password is done in pre-save hook
  user.password = payload.newPassword;
  user.isPasswordChangeRequired = false;
  user.passwordChangedAt = new Date();
  await user.save();

  return null;
};

export const AuthService = {
  loginUser,
  changePassword,
};
