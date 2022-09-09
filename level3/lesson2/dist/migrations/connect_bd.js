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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql2"));
require("dotenv/config");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const DROP_TABLES = false;
const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_PATH, MYSQL_SCHEMA } = process.env;
const connection = mysql.createPool({
    host: MYSQL_PATH,
    user: MYSQL_USER,
    database: MYSQL_SCHEMA,
    password: MYSQL_PASSWORD,
    multipleStatements: true
}).promise();
let init = (0, fs_1.readFileSync)(path_1.default.join(__dirname + "/../../src/migrations/init_db.sql")).toString();
let insert = (0, fs_1.readFileSync)(path_1.default.join(__dirname + "/../../src/migrations/insert_data.sql")).toString();
let drop = (0, fs_1.readFileSync)(path_1.default.join(__dirname + "/../../src/migrations/drop_tables.sql")).toString();
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
        }).catch(err => {
            console.log("Ошибка при заполнении таблиц\n", err);
        });
    }
    else {
        console.log("База данных подключена");
    }
}))
    .catch(err => {
    console.log("Ошибка при работе с базой данных\n", err);
});
exports.default = connection;
