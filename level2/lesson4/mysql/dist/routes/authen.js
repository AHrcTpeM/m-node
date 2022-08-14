"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../database/database"));
const router = (0, express_1.Router)();
router.post('/api/v1/logout', (req, res) => {
    req.session.destroy((err) => res.clearCookie('connect.sid').status(200).json({ "ok": true }));
});
router.post('/api/v1/login', (req, res) => {
    if (!req.body.login) {
        res.sendStatus(400);
        return;
    }
    const sql4 = `SELECT * FROM users WHERE login=? AND pass=?`;
    const filter = [req.body.login, req.body.pass];
    database_1.default.query(sql4, filter).then(([result]) => {
        let user = JSON.parse(JSON.stringify(result));
        if (!user.length) {
            res.status(404).json({ "error": 'not found' });
            return;
        }
        const update = [req.sessionID, user[0].id];
        const sql = `UPDATE users SET session=? WHERE id=?`;
        database_1.default.query(sql, update)
            .then((results) => {
            res.status(200).json({ "ok": true });
        })
            .catch(err => {
            res.sendStatus(401);
        });
    })
        .catch(err => {
        res.sendStatus(400);
    });
});
router.post('/api/v1/register', (req, res) => {
    if (!req.body.login) {
        res.sendStatus(400);
        return;
    }
    const sql4 = `SELECT * FROM users WHERE login=?`;
    const filter = req.body.login;
    database_1.default.query(sql4, filter).then(result => {
        let user = JSON.parse(JSON.stringify(result))[0];
        if (user.length) {
            res.status(302).json({ error: "User already exists" });
            return;
        }
        else {
            const sql2 = `INSERT INTO users(login, pass, session) VALUES (?)`;
            const user = [req.body.login, req.body.pass, ''];
            database_1.default.query(sql2, [user]).then((results) => {
                res.status(201).json({ "ok": true });
            })
                .catch(function (err) {
                res.status(500).json({ error: "Error adding to database" });
            });
        }
    });
});
exports.default = router;
