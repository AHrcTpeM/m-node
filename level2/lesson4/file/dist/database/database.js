"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let db = {
    users: [
        { login: 'admin', pass: 'admin', session: '', makerId: 100,
            items: [
                { id: 22, text: "Buy milk", checked: false },
                { id: 23, text: "Buy bread", checked: false },
                { id: 24, text: "Do the cleaning", checked: true }
            ] },
        { login: 'user1', pass: 'user1', session: '', makerId: 100,
            items: [
                { id: 25, text: "Do homework", checked: false },
                { id: 26, text: "Read smart book", checked: true }
            ] }
    ]
};
try {
    db = JSON.parse(fs_1.default.readFileSync("public/text.txt", "utf8"));
}
catch (err) {
    fs_1.default.writeFileSync("public/text.txt", `${JSON.stringify(db)}`);
}
exports.default = db;
