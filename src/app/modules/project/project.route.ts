import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ProjectControllers } from './project.controller';
import { ProjectValidations } from './project.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(ProjectValidations.createProjectValidationSchema),
  ProjectControllers.createProject,
);

router.get('/', ProjectControllers.getAllProjects);

router.get('/:id', ProjectControllers.getSingleProject);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(ProjectValidations.updateProjectValidationSchema),
  ProjectControllers.updateProject,
);

router.delete('/:id', auth('admin'), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
