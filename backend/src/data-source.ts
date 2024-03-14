import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'drivers-hub-db',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
