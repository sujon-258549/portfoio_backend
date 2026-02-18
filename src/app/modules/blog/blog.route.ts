import express from 'express';
import auth from '../../middlewares/auth';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.get('/', BlogControllers.getAllBlogs);
router.get('/:id', BlogControllers.getSingleBlog);

router.delete('/:id', auth('admin'), BlogControllers.deleteBlog);

export const BlogRoutes = router;
