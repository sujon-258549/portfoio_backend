import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CreativeValidation } from './creative.validation';
import { CreativeControllers } from './creative.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/items',
  auth('admin'),
  validateRequest(CreativeValidation.createCreativeItemValidationSchema),
  CreativeControllers.createCreativeItem,
);

router.get('/items', CreativeControllers.getAllCreativeItems);

router.get('/items/:id', CreativeControllers.getCreativeItemById);

router.put(
  '/items/:id',
  auth('admin'),
  validateRequest(CreativeValidation.updateCreativeItemValidationSchema),
  CreativeControllers.updateCreativeItem,
);

router.delete(
  '/items/:id',
  auth('admin'),
  CreativeControllers.deleteCreativeItem,
);

export const CreativeRoutes = router;
