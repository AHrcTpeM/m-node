"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8080;
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use((req, res, next) => {
    res.status(404).type('text/plain');
    res.send('Not found');
});
app.listen(port, function () {
    console.log(`Server listens port: ${port}`);
});
