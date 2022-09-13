import * as mysql from "mysql2";
import 'dotenv/config';

const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PATH,
  MYSQL_SCHEMA
} = process.env;

var connection = mysql.createConnection({
  host: MYSQL_PATH,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
});

connection.connect(function(err) {
    if (err) throw err;
    connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_SCHEMA}`, function (err, result) {
        if (err) throw err;
        console.log("База данных создана/готова");
        connection.end();
    });
});

