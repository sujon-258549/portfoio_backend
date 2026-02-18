import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

// ─── Login ───────────────────────────────────────────────────────────────────
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

// ─── Change Password (auto-login — returns new tokens) ───────────────────────
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const passwordData = req.body;
  const userData = req.user as JwtPayload & { email: string; role: string };

  const result = await AuthService.changePassword(userData, passwordData);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  // Set new refresh token cookie automatically
  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password changed successfully! You are now logged in.',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
