import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { verifyToken } from './middlewares/jwt';

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
    middlewares: [verifyToken],
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
    middlewares: [verifyToken],
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
    middlewares: [verifyToken],
  },
];

export const Routes = [...authRoutes, ...userRoutes];
