import 'dotenv/config';

import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from './users/entities/user.entity';
import { Url } from './urls/entities/url.entity';
import { MainSeeder } from './database/seeds/main.seeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  synchronize: false,
  logging: true,
  connectTimeoutMS: 0,
  seedTracking: true,
  factories: ['src/database/factories/**/*{.ts,.js}'],
  entities: [User, Url],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/migrations/**/*.js']
      : [join(__dirname, './migrations/**/*.ts')],
  seeds: [MainSeeder],
};

export default new DataSource(options);
