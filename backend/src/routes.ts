import { AuthController } from './controllers/auth-controller';
import { UserController } from './controllers/user-controller';
import { isAdmin, isAuthenticated } from './middlewares/auth';

const authRoutes = [
  {
    method: 'post',
    route: '/register',
    controller: AuthController,
    action: 'register',
    middlewares: [],
  },
  {
    method: 'post',
    route: '/login',
    controller: AuthController,
    action: 'login',
    middlewares: [],
  },
];

const userRoutes = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
    middlewares: [isAuthenticated],
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
    middlewares: [isAuthenticated, isAdmin],
  },
];

export const Routes = [...authRoutes, ...userRoutes];
