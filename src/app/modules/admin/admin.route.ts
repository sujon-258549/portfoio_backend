import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { AdminControllers } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

// Get all users
router.get('/users', auth('admin'), AdminControllers.getAllUsers);

// Get single user
router.get('/users/:id', auth('admin'), AdminControllers.getSingleUser);

// Block/Unblock user (toggle)
router.patch(
  '/users/:id/block',
  auth('admin'),
  validateRequest(AdminValidation.blockUserValidationSchema),
  AdminControllers.blockUser,
);

// Soft delete user
router.delete('/users/:id', auth('admin'), AdminControllers.deleteUser);

export const AdminRoutes = router;
