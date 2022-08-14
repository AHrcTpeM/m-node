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
const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_PATH, } = process.env;
const connection = mysql.createPool({
    host: MYSQL_PATH,
    user: MYSQL_USER,
    database: "usersdb2",
    password: MYSQL_PASSWORD
}).promise();
const sql = `create table if not exists users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(20),
    pass VARCHAR(20),
    session VARCHAR(255)
  )`;
const sql1 = `CREATE TABLE if not exists items
  (
      id INT PRIMARY KEY AUTO_INCREMENT,
      CustomerId INT,
      text VARCHAR(255),
      checked BOOL,
      FOREIGN KEY (CustomerId)  REFERENCES users (id)
  )`;
connection.query(sql).then((result) => {
    let status = JSON.parse(JSON.stringify(result))[0].warningStatus;
    if (!status) {
        console.log("Таблица создана1");
        const users = [['admin', 'admin', ''],
            ['user1', 'user1', '']];
        const sql2 = `INSERT INTO users(login, pass, session) VALUES ?`;
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
        const sql3 = `INSERT INTO items(CustomerId, text, checked) VALUES ?`;
        connection.query(sql3, [items]).then((results) => {
            console.log('Тестовые данные добавлены');
        });
    }
}));
// const sql4 = `SELECT * FROM items WHERE CustomerId=?`;
// const filter = 2;
// connection.query(sql4, filter).
// then((results) => {
//     console.log(results[0]);
//         // var string=JSON.stringify(results[0]);
//         // console.log('>> string: ', string );
//         // var json =  JSON.parse(string);   // JSON.parse(JSON.stringify(results[0]));
//         // console.log('>> json: ', json);
//         // console.log('>> user.name: ', json[0].text);
// });
exports.default = connection;
