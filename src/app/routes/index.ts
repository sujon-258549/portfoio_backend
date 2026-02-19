import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { PortfolioContentRoutes } from '../modules/portfolioContent/portfolioContent.route';
import { ContactMessageRoutes } from '../modules/contactMessage/contactMessage.route';
import { ProjectRoutes } from '../modules/project/project.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { CreativeRoutes } from '../modules/creative/creative.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/dynamic-content',
    route: PortfolioContentRoutes,
  },
  {
    path: '/contact-messages',
    route: ContactMessageRoutes,
  },
  {
    path: '/projects',
    route: ProjectRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/creative',
    route: CreativeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
