import { AuthController } from './controllers/auth-controller';
import { CarController } from './controllers/car-controller';
import { InsuranceController } from './controllers/insurance-controller';
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
    route: '/cars/owner/:id',
    controller: CarController,
    action: 'allByOwner',
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
];

const insuranceRoutes = [
  {
    method: 'get',
    route: '/insurance/active/:id',
    controller: InsuranceController,
    action: 'activeByCar',
    middlewares: [isAuthenticated],
  },
  {
    method: 'post',
    route: '/insurance/active',
    controller: InsuranceController,
    action: 'saveActive',
    middlewares: [isAuthenticated],
  },
  {
    method: 'put',
    route: '/insurance/active/:id',
    controller: InsuranceController,
    action: 'updateActive',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/insurance/active/:id',
    controller: InsuranceController,
    action: 'removeActive',
    middlewares: [isAuthenticated],
  },
  {
    method: 'get',
    route: '/insurance/history/:id',
    controller: InsuranceController,
    action: 'historyByCar',
    middlewares: [isAuthenticated],
  },
  {
    method: 'post',
    route: '/insurance/history',
    controller: InsuranceController,
    action: 'expire',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/insurance/history/:id',
    controller: InsuranceController,
    action: 'removeExpired',
    middlewares: [isAuthenticated],
  },
];

export const Routes = [...authRoutes, ...userRoutes, ...carRoutes, ...insuranceRoutes];
