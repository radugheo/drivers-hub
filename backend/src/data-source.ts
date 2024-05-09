import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Car } from './entities/Car';
import { User } from './entities/User';
import { ActiveInsurance } from './entities/ActiveInsurance';
import { InsuranceHistory } from './entities/InsuranceHistory';
import { ActiveInspection } from './entities/ActiveInspection';
import { InspectionHistory } from './entities/InspectionHistory';
import { ActiveService } from './entities/ActiveService';
import { ServiceHistory } from './entities/ServiceHistory';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'drivers-hub-db',
  ssl: process.env.DB_SSL? { rejectUnauthorized: false } : false,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Car,
    ActiveInsurance,
    InsuranceHistory,
    ActiveInspection,
    InspectionHistory,
    ActiveService,
    ServiceHistory,
  ],
  migrations: [],
  subscribers: [],
});
