import {Sequelize} from 'sequelize-typescript';
import path from 'path';

export const sequelize = new Sequelize({
  database: 'your_database',
  dialect: 'postgres', // Change to your database dialect
  username: 'your_username',
  password: 'your_password',
  models: [path.resolve(__dirname, 'models')] // Assuming your models are in src/models
});