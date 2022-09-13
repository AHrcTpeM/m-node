import * as mysql from "mysql2";
import 'dotenv/config';
import { readFileSync } from 'fs';
import path from 'path';

const NAME_DUMP = readFileSync(path.join(__dirname + "/../../../src/migrations/backup/nameDump.txt"));

const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PATH,
  MYSQL_SCHEMA
} = process.env;

const connection = mysql.createPool({
  host: MYSQL_PATH,
  user: MYSQL_USER,
  database: MYSQL_SCHEMA,
  password: MYSQL_PASSWORD,
  multipleStatements: true
}).promise();

let drop = readFileSync(path.join(__dirname + "/../../../src/migrations/drop_tables.sql")).toString();
let backup = readFileSync(path.join(__dirname + "/../../../src/migrations/backup/"+ NAME_DUMP)).toString();

connection.query(drop).then(() => {
  console.log('Таблицы удалены');
}).then(() => connection.query(backup).then(() => {
    console.log('Таблицы восстановлены');
    connection.end();
}))