"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.CliDataSource = new typeorm_1.DataSource({
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
//# sourceMappingURL=typeorm.config.js.map