import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewControllers } from './review.controller';
import { ReviewValidations } from './review.validation';

const router = express.Router();

// Public routes
router.post(
  '/send-otp',
  validateRequest(ReviewValidations.sendOtpValidationSchema),
  ReviewControllers.sendOtp,
);

router.post(
  '/verify-otp',
  validateRequest(ReviewValidations.verifyOtpValidationSchema),
  ReviewControllers.verifyOtp,
);

router.post(
  '/',
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
);

router.get('/', ReviewControllers.getAllReviews);

// Admin-only routes
router.patch('/:id', auth('admin'), ReviewControllers.updateReview);
router.delete('/:id', auth('admin'), ReviewControllers.deleteReview);

export const ReviewRoutes = router;
