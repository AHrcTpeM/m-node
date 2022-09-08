"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql2"));
require("dotenv/config");
const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_PATH, MYSQL_SCHEMA } = process.env;
const connection = mysql.createPool({
    host: MYSQL_PATH,
    user: MYSQL_USER,
    database: MYSQL_SCHEMA,
    password: MYSQL_PASSWORD
}).promise();
const sql = `create table if not exists books(
  id INT PRIMARY KEY AUTO_INCREMENT,
  login VARCHAR(20),
  pass VARCHAR(20),
  session VARCHAR(255)
)`;
const sql1 = `CREATE TABLE if not exists author(
    id INT PRIMARY KEY AUTO_INCREMENT,
    CustomerId INT,
    text VARCHAR(255),
    checked BOOL,
    FOREIGN KEY (CustomerId)  REFERENCES books (id)
)`;
connection.query(sql).then((result) => {
    let status = JSON.parse(JSON.stringify(result))[0].warningStatus;
    if (!status) {
        console.log("Таблица создана1");
        const users = [['admin', 'admin', ''],
            ['user1', 'user1', '']];
        const sql2 = `INSERT INTO books(login, pass, session) VALUES ?`;
        connection.query(sql2, [users]).then((results) => {
            console.log('Тестовые данные добавлены');
        });
    }
})
    .then(() => connection.query(sql1).then((result) => {
    let status = JSON.parse(JSON.stringify(result))[0].warningStatus;
    if (!status) {
        console.log("Таблица создана2");
        const items = [
            [1, "Buy milk", false],
            [1, "Buy bread", true],
            [1, "Do the cleaning", false],
            [2, "Do homework", false],
            [2, "Read smart book", false]
        ];
        const sql3 = `INSERT INTO author(CustomerId, text, checked) VALUES ?`;
        connection.query(sql3, [items]).then((results) => {
            console.log('Тестовые данные добавлены');
        });
    }
}));
connection.query(`CREATE SCHEMA if not exists ${MYSQL_SCHEMA}`).then((result) => {
    console.log(JSON.parse(JSON.stringify(result))[0].warningStatus);
    if (!JSON.parse(JSON.stringify(result))[0].warningStatus) {
        console.log('CREATE SCHEMA');
    }
    else {
        console.log('SCHEMA EXISTS');
    }
});
exports.default = connection;
