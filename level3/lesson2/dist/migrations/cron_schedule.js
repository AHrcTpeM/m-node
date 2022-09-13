"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const mysqldump_1 = __importDefault(require("mysqldump"));
const fs_1 = require("fs");
require("dotenv/config");
const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_PATH, MYSQL_SCHEMA } = process.env;
function startCron() {
    node_cron_1.default.schedule('*/10 * * * * *', () => __awaiter(this, void 0, void 0, function* () {
        let name = getDate() + '-dump.sql';
        (0, fs_1.writeFileSync)("src/migrations/backup/nameDump.txt", name); // запысываем имя последнего бэкап
        console.log('startDump', name);
        yield (0, mysqldump_1.default)({
            connection: {
                host: MYSQL_PATH,
                user: MYSQL_USER || "",
                password: MYSQL_PASSWORD || "",
                database: MYSQL_SCHEMA || "",
            },
            dumpToFile: (`src/migrations/backup/${name}`),
        });
        console.log("endDump");
    }));
}
exports.startCron = startCron;
function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hr = today.getHours();
    let mt = today.getMinutes();
    return hr + '-' + mt + '_' + dd + '-' + mm + '-' + yyyy;
}
