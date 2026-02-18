import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

// ─── Register ────────────────────────────────────────────────────────────────
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

// ─── Get Me ──────────────────────────────────────────────────────────────────
const getMe = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const result = await UserServices.getMe(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

// ─── Update Profile (name, photo URL, bio) ───────────────────────────────────
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const result = await UserServices.updateMyProfile(email, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

// ─── Request Email Update — Step 1 ───────────────────────────────────────────
const requestEmailUpdate = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const { newEmail } = req.body;
  const result = await UserServices.requestEmailUpdate(email, newEmail);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result.message,
    data: null,
  });
});

// ─── Verify Email Update — Step 2 ────────────────────────────────────────────
const verifyEmailUpdate = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const { otp } = req.body;
  const result = await UserServices.verifyEmailUpdate(email, otp);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Email updated successfully',
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  getMe,
  updateMyProfile,
  requestEmailUpdate,
  verifyEmailUpdate,
};
