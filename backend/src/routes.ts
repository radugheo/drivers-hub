import { AuthController } from './controllers/auth-controller';
import { CarController } from './controllers/car-controller';
import { InspectionController } from './controllers/inspection-controller';
import { InsuranceController } from './controllers/insurance-controller';
import { ServiceController } from './controllers/service-controller';
import { UserController } from './controllers/user-controller';
import { VignetteController } from './controllers/vignette-controller';
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
  {
    method: 'put',
    route: '/updatePassword',
    controller: AuthController,
    action: 'updatePassword',
    middlewares: [isAuthenticated],
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
    method: 'put',
    route: '/users/:id',
    controller: UserController,
    action: 'update',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
    middlewares: [isAuthenticated, isAdmin],
  },
  {
    method: 'put',
    route: '/users/:id/updatePushToken',
    controller: UserController,
    action: 'updatePushToken',
    middlewares: [isAuthenticated],
  },
  {
    method: 'get',
    route: '/users/:id/pushToken',
    controller: UserController,
    action: 'getPushToken',
    middlewares: [isAuthenticated],
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
  {
    method: 'get',
    route: '/cars/:id/predict',
    controller: CarController,
    action: 'predictPrice',
  },
];

const insuranceRoutes = [
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
    method: 'delete',
    route: '/insurance/history/:id',
    controller: InsuranceController,
    action: 'removeExpired',
    middlewares: [isAuthenticated],
  },
];

const inspectionRoutes = [
  {
    method: 'put',
    route: '/inspection/active/:id',
    controller: InspectionController,
    action: 'updateActive',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/inspection/active/:id',
    controller: InspectionController,
    action: 'removeActive',
    middlewares: [isAuthenticated],
  },
  {
    method: 'get',
    route: '/inspection/history/:id',
    controller: InspectionController,
    action: 'historyByCar',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/inspection/history/:id',
    controller: InspectionController,
    action: 'removeExpired',
    middlewares: [isAuthenticated],
  },
];

const vignetteRoutes = [
  {
    method: 'put',
    route: '/vignette/active/:id',
    controller: VignetteController,
    action: 'updateActive',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/vignette/active/:id',
    controller: VignetteController,
    action: 'removeActive',
    middlewares: [isAuthenticated],
  },
  {
    method: 'get',
    route: '/vignette/history/:id',
    controller: VignetteController,
    action: 'historyByCar',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/vignette/history/:id',
    controller: VignetteController,
    action: 'removeExpired',
    middlewares: [isAuthenticated],
  },
];

const serviceRoutes = [
  {
    method: 'put',
    route: '/service/active/:id',
    controller: ServiceController,
    action: 'updateActive',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/service/active/:id',
    controller: ServiceController,
    action: 'removeActive',
    middlewares: [isAuthenticated],
  },
  {
    method: 'get',
    route: '/service/history/:id',
    controller: ServiceController,
    action: 'historyByCar',
    middlewares: [isAuthenticated],
  },
  {
    method: 'delete',
    route: '/service/history/:id',
    controller: ServiceController,
    action: 'removeExpired',
    middlewares: [isAuthenticated],
  },
];

export const Routes = [
  ...authRoutes,
  ...userRoutes,
  ...carRoutes,
  ...insuranceRoutes,
  ...inspectionRoutes,
  ...vignetteRoutes,
  ...serviceRoutes,
];
