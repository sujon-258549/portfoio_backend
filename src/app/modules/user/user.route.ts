import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.registerUser,
);

router.get('/me', auth('admin', 'user'), UserControllers.getMe);

router.patch(
  '/update-profile',
  auth('admin', 'user'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateMyProfile,
);

export const UserRoutes = router;
