import * as mysql from "mysql2";
import 'dotenv/config';
import { readFileSync } from 'fs';
import path from 'path';

const DROP_TABLES = false;  // true - drop table and init again

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

let init = readFileSync(path.join(__dirname + "/../../src/migrations/init_db.sql")).toString();
let insert = readFileSync(path.join(__dirname + "/../../src/migrations/insert_data.sql")).toString();
let drop = readFileSync(path.join(__dirname + "/../../src/migrations/drop_tables.sql")).toString();

//let backup = readFileSync(path.join(__dirname + "/../../src/migrations/backup/dump.sql")).toString();

let sql = DROP_TABLES ? drop : 'USE goodbooks';

connection.query(sql).then((results) => {
  console.log('Первичная настройка таблиц');
})
.then(() => connection.query(init).then(([result]) => {
  //console.log(result);
  let status = JSON.parse(JSON.stringify(result))[0].warningStatus;
  if (!status) {
    console.log("Таблицы созданы");
    connection.query(insert).then((results) => {
        console.log('Тестовые данные добавлены');
    }).catch(err =>{
      console.log("Ошибка при заполнении таблиц\n", err);
    });
  } else {
    console.log("База данных подключена");
  }
}))
.catch(err =>{
  console.log("Ошибка при работе с базой данных\n", err);
});


export default connection;