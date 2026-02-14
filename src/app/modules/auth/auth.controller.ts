import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: false, // Set to true in production
    httpOnly: true,
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

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  const userData = req.user as JwtPayload & { email: string; role: string };
  const result = await AuthService.changePassword(userData, passwordData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password is changed successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
