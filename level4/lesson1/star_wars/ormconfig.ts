import * as path from 'path';

import { getConfig } from './src/common/config';

const { mysql } = getConfig().databases;

export default {
  type: 'mysql',
  host: mysql.host,
  port: mysql.port,
  username: mysql.user,
  password: mysql.password,
  database: mysql.database,
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'src/database/migrations/*{.ts,.js}')],
  seeds: [path.join(__dirname, 'src/database/seeds/**/*.seed{.ts,.js}')],
};
