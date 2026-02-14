import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ContactMessageControllers } from './contactMessage.controller';
import { ContactMessageValidations } from './contactMessage.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(
    ContactMessageValidations.createContactMessageValidationSchema,
  ),
  ContactMessageControllers.createContactMessage,
);

router.get('/', auth('admin'), ContactMessageControllers.getAllContactMessages);

export const ContactMessageRoutes = router;
