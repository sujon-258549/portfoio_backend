import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

// POST /api/reviews/send-otp
const sendOtp = catchAsync(async (req: Request, res: Response) => {
  const { name, email } = req.body;
  await ReviewServices.sendOtp(name, email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Verification code sent to your email.',
    data: null,
  });
});

// POST /api/reviews/verify-otp
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { email, code } = req.body;
  await ReviewServices.verifyOtp(email, code);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Email verified successfully.',
    data: null,
  });
});

// POST /api/reviews
const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.createReview(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Review submitted successfully.',
    data: result,
  });
});

// GET /api/reviews
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      if (decoded.role === 'admin') {
        isAdmin = true;
      }
    } catch {
      // Ignore invalid token — treat as public
    }
  }

  const result = await ReviewServices.getAllReviews(isAdmin);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reviews retrieved successfully.',
    data: result,
  });
});

// PATCH /api/reviews/:id
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ReviewServices.updateReview(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review updated successfully.',
    data: result,
  });
});

// DELETE /api/reviews/:id
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ReviewServices.deleteReview(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review deleted successfully.',
    data: result,
  });
});

export const ReviewControllers = {
  sendOtp,
  verifyOtp,
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
