"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const database_1 = __importDefault(require("../database/database"));
const router = (0, express_1.Router)();
router.get('/api/v1/items', (req, res) => {
    const indexUser = findUserIndex(req);
    if (req.query.text && database_1.default.users[indexUser].items.length > 0) {
        database_1.default.users[indexUser].items = database_1.default.users[indexUser].items.filter(i => i.text.toLowerCase().includes(req.query.text)); // /items?text=do
    }
    if (database_1.default.users.find(user => user.session === req.sessionID)) {
        res.json({ items: database_1.default.users[indexUser].items });
    }
    else {
        res.status(303).send({
            error: 'forbidden'
        });
    }
});
router.post('/api/v1/items', (req, res) => {
    const indexUser = findUserIndex(req);
    if (!req.body.text) {
        res.sendStatus(400);
        return;
    }
    const createdItem = {
        id: database_1.default.users[indexUser].makerId++,
        text: req.body.text,
        checked: false
    };
    database_1.default.users[indexUser].items.push(createdItem);
    fs_1.default.writeFile("public/text.txt", `${JSON.stringify(database_1.default)}`, (err) => { });
    res.status(201).json({ id: createdItem.id });
});
router.delete('/api/v1/items/', (req, res) => {
    const indexUser = findUserIndex(req);
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }
    database_1.default.users[indexUser].items = database_1.default.users[indexUser].items.filter(i => i.id !== +req.body.id);
    fs_1.default.writeFile("public/text.txt", `${JSON.stringify(database_1.default)}`, (err) => { });
    res.status(200).json({ "ok": true });
});
router.put('/api/v1/items/', (req, res) => {
    const indexUser = findUserIndex(req);
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }
    const foundItems = database_1.default.users[indexUser].items.find(i => i.id === +req.body.id);
    if (!foundItems) {
        res.sendStatus(404);
        return;
    }
    foundItems.text = req.body.text;
    foundItems.checked = req.body.checked;
    fs_1.default.writeFile("public/text.txt", `${JSON.stringify(database_1.default)}`, (err) => { });
    res.status(200).json({ "ok": true });
});
function findUserIndex(req) {
    return database_1.default.users.findIndex(user => user.session === req.sessionID);
    //const indexUser = db.users.findIndex(user => user.cookie === req.cookies.cookieName); 
}
exports.default = router;
