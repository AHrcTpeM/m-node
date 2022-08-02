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
router.get('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield yield database_1.default.findOne({ session: req.sessionID }).then(user => user);
    if (user) {
        res.json({ items: user.items });
    }
    else {
        res.status(303).send({
            error: 'forbidden'
        });
    }
}));
router.post('/api/v1/items', (req, res) => {
    if (!req.body.text) {
        res.sendStatus(400);
        return;
    }
    database_1.default.findOne({ session: req.sessionID }).then((user) => {
        if (!user) {
            res.sendStatus(404);
            return;
        }
        const createdItem = {
            id: user.makerId++,
            text: req.body.text,
            checked: false
        };
        user.items.push(createdItem);
        database_1.default.findOneAndUpdate({ session: req.sessionID }, user, { new: true })
            .then(user => {
            res.status(201).json({ id: createdItem.id });
        });
    });
});
router.delete('/api/v1/items/', (req, res) => {
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }
    database_1.default.findOne({ session: req.sessionID }).then((user) => {
        if (!user) {
            res.sendStatus(404);
            return;
        }
        user.items = user.items.filter(i => i.id !== +req.body.id);
        database_1.default.findOneAndUpdate({ session: req.sessionID }, user, { new: true })
            .then(user => {
            res.status(200).json({ "ok": true });
        });
    });
});
router.put('/api/v1/items/', (req, res) => {
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }
    database_1.default.findOne({ session: req.sessionID }).then((user) => {
        if (!user) {
            res.sendStatus(404);
            return;
        }
        const foundItems = user.items.find(i => i.id === +req.body.id);
        if (!foundItems) {
            res.sendStatus(404);
            return;
        }
        foundItems.text = req.body.text;
        foundItems.checked = req.body.checked;
        database_1.default.findOneAndUpdate({ session: req.sessionID }, user, { new: true })
            .then(user => {
            res.status(200).json({ "ok": true });
        });
    });
});
function findUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.findOne({ session: req.sessionID }).then(user => user);
    });
}
exports.default = router;
