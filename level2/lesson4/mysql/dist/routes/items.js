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
const express_1 = require("express");
const database_1 = __importDefault(require("../database/database"));
const router = (0, express_1.Router)();
router.get('/api/v1/items', (req, res) => {
    findUser(req).then((user) => {
        console.log(user === null || user === void 0 ? void 0 : user.login);
        if (user) {
            const userId = user.id;
            const sql = `SELECT * FROM items WHERE CustomerId=?`;
            database_1.default.query(sql, userId).then(([result]) => {
                let items = JSON.parse(JSON.stringify(result));
                items.map((elem) => {
                    elem.checked = Boolean(elem.checked);
                    return elem;
                });
                res.json({ items: items });
            });
        }
        else {
            res.status(303).send({
                error: 'forbidden'
            });
        }
    });
});
router.post('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.text) {
        res.sendStatus(400);
        return;
    }
    const user = yield findUser(req);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    const items = [user.id, req.body.text, false];
    const sql3 = `INSERT INTO items(CustomerId, text, checked) VALUES (?)`;
    database_1.default.query(sql3, [items]).then((result) => {
        let items = JSON.parse(JSON.stringify(result))[0];
        res.status(201).json({ id: items.insertId });
    })
        .catch((err) => {
        res.sendStatus(400);
    });
}));
router.delete('/api/v1/items/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }
    const user = yield findUser(req);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    const userId = req.body.id;
    const sql = `DELETE FROM items WHERE id=?`;
    database_1.default.query(sql, userId).then(([result]) => {
        let items = JSON.parse(JSON.stringify(result));
        res.status(200).json({ "ok": true });
    });
}));
router.put('/api/v1/items/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }
    const user = yield findUser(req);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    const data = [req.body.text, req.body.checked, req.body.id];
    const sql = `UPDATE items SET text=?, checked=? WHERE id=?`;
    database_1.default.query(sql, data).then(() => {
        res.status(200).json({ "ok": true });
    });
}));
function findUser(req) {
    const sql4 = `SELECT * FROM users WHERE session=?`;
    const filter = req.sessionID;
    return database_1.default.query(sql4, filter).then(([result]) => {
        let user = JSON.parse(JSON.stringify(result))[0];
        return user;
    });
}
exports.default = router;
