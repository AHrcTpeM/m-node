import { DataSource } from 'typeorm';
import 'dotenv/config';

export const CliDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsTableName: "custom_migration_table",
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true
});