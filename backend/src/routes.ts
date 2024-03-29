import { AuthController } from './controllers/auth-controller';
import { CarController } from './controllers/car-controller';
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

const carRoutes = [
  {
    method: 'get',
    route: '/cars',
    controller: CarController,
    action: 'all',
    middlewares: [isAuthenticated],
  },
  {
    method: 'get',
    route: '/cars/:id',
    controller: CarController,
    action: 'one',
    middlewares: [isAuthenticated],
  },
  {
    method: 'post',
    route: '/cars',
    controller: CarController,
    action: 'save',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/cars/:id',
    controller: CarController,
    action: 'remove',
    middlewares: [isAuthenticated],
  },
  {
    method: 'put',
    route: '/cars/:id',
    controller: CarController,
    action: 'update',
    middlewares: [isAuthenticated],
  },
  {
    method: 'post',
    route: '/cars/:id/insurance',
    controller: CarController,
    action: 'addInsurance',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/cars/:id/insurance',
    controller: CarController,
    action: 'removeInsurance',
    middlewares: [isAuthenticated],
  },
];

export const Routes = [...authRoutes, ...userRoutes, ...carRoutes];
