import express from 'express';
import auth from '../../middlewares/auth';
import { PortfolioContentControllers } from './portfolioContent.controller';
import { dynamicValidateRequest } from './portfolioContent.validation';

const router = express.Router();

router.get('/', PortfolioContentControllers.getContent);

router.post(
  '/upsert-content',
  auth('admin'),
  dynamicValidateRequest,
  PortfolioContentControllers.updateContent,
);

export const PortfolioContentRoutes = router;
