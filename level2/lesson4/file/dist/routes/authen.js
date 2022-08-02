"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const database_1 = __importDefault(require("../database/database"));
const router = (0, express_1.Router)();
router.post('/api/v1/logout', (req, res) => {
    giveMeCookie(res);
    req.session.destroy((err) => res.clearCookie('connect.sid').status(200).json({ "ok": true }));
});
router.post('/api/v1/login', (req, res) => {
    if (!req.body.login) {
        res.sendStatus(400);
        return;
    }
    const foundItems = database_1.default.users.find(i => i.login === req.body.login && i.pass === req.body.pass);
    if (!foundItems) {
        res.sendStatus(404);
        return;
    }
    //foundItems.cookie = giveMeCookie(res);
    foundItems.session = req.sessionID;
    fs_1.default.writeFile("public/text.txt", `${JSON.stringify(database_1.default)}`, (err) => { });
    //res.setHeader('Set-Cookie', 'cookie=true');
    res.status(200).json({ "ok": true });
});
router.post('/api/v1/register', (req, res) => {
    if (!req.body.login) {
        res.sendStatus(400);
        return;
    }
    if (database_1.default.users.find(i => i.login === req.body.login)) {
        res.status(302).json({ error: "User already exists" });
        return;
    }
    const createdUser = {
        login: req.body.login,
        pass: req.body.pass,
        session: '',
        makerId: 100,
        items: []
    };
    database_1.default.users.push(createdUser);
    fs_1.default.writeFile("public/text.txt", `${JSON.stringify(database_1.default)}`, (err) => { });
    //res.setHeader('Set-Cookie', 'cookie=true');
    res.status(201).json({ "ok": true });
});
function giveMeCookie(res) {
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
    return randomNumber;
}
exports.default = router;
