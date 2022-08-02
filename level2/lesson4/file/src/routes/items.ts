import { Router } from 'express';
import fs from 'fs';
import db from '../database/database'

const router = Router();

router.get('/api/v1/items', (req, res) => {
    const indexUser = findUserIndex(req);
    if (req.query.text && db.users[indexUser].items.length > 0) {
      db.users[indexUser].items = db.users[indexUser].items.filter(i => i.text.toLowerCase().includes(req.query.text as string)); // /items?text=do
    }
    if (db.users.find(user => user.session === req.sessionID)) {
        res.json({items: db.users[indexUser].items});
    } else {
        res.status(303).send({
        error: 'forbidden'
        });
    }
})

router.post('/api/v1/items', (req, res) => {
    const indexUser = findUserIndex(req); 
    if (!req.body.text) {
        res.sendStatus(400);
        return;
    }
    const createdItem = {
        id: db.users[indexUser].makerId++,
        text: req.body.text,
        checked: false
    }
    db.users[indexUser].items.push(createdItem);
    fs.writeFile("public/text.txt", `${JSON.stringify(db)}`, (err) => {});
    res.status(201).json({id: createdItem.id});

})

router.delete('/api/v1/items/', (req, res) => {
    const indexUser = findUserIndex(req); 
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }
    db.users[indexUser].items = db.users[indexUser].items.filter(i => i.id !== +req.body.id);
    fs.writeFile("public/text.txt", `${JSON.stringify(db)}`, (err) => {});

    res.status(200).json({ "ok" : true });
})

router.put('/api/v1/items/', (req, res) => {
    const indexUser = findUserIndex(req); 
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }
    const foundItems = db.users[indexUser].items.find(i => i.id === +req.body.id);
    if (!foundItems) {
        res.sendStatus(404);
        return;
    }
    foundItems.text = req.body.text;
    foundItems.checked = req.body.checked;
    fs.writeFile("public/text.txt", `${JSON.stringify(db)}`, (err) => {});  
    res.status(200).json({ "ok" : true });
})

function findUserIndex(req: Express.Request) {
    return db.users.findIndex(user => user.session === req.sessionID); 
    //const indexUser = db.users.findIndex(user => user.cookie === req.cookies.cookieName); 
}

export default router;