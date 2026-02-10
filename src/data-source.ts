import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
});
