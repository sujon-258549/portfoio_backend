import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { AuthControllers } from '../auth/auth.controller';
import { AuthValidation } from '../auth/auth.validation';

const router = express.Router();

// Register
router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.registerUser,
);

// Get my profile
router.get('/me', auth('admin', 'user'), UserControllers.getMe);

// Update profile (name, photo URL, bio)
router.patch(
  '/update-profile',
  auth('admin', 'user'),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserControllers.updateMyProfile,
);

// Step 1: Request email update — sends OTP to new email
router.post(
  '/request-email-update',
  auth('admin', 'user'),
  validateRequest(UserValidation.requestEmailUpdateValidationSchema),
  UserControllers.requestEmailUpdate,
);

// Step 2: Verify OTP and confirm email change
router.post(
  '/verify-email-update',
  auth('admin', 'user'),
  validateRequest(UserValidation.verifyEmailUpdateValidationSchema),
  UserControllers.verifyEmailUpdate,
);

// Change password (auto-login — returns new tokens)
router.post(
  '/change-password',
  auth('admin', 'user'),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const UserRoutes = router;
