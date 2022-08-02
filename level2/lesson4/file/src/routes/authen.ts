import express, { Router } from 'express';
import fs from 'fs';
import db from '../database/database'

const router = Router();

router.post('/api/v1/logout', (req, res) => {
    giveMeCookie(res);
    req.session.destroy((err) => res.clearCookie('connect.sid').status(200).json({ "ok" : true }));
})

router.post('/api/v1/login', (req, res) => {
    if (!req.body.login) {
        res.sendStatus(400);
        return;
    }

    const foundItems = db.users.find(i => i.login === req.body.login && i.pass === req.body.pass);
    if (!foundItems) {
        res.sendStatus(404);
        return;
    }

    //foundItems.cookie = giveMeCookie(res);
    foundItems.session = req.sessionID;
    fs.writeFile("public/text.txt", `${JSON.stringify(db)}`, (err) => {});

    //res.setHeader('Set-Cookie', 'cookie=true');
    res.status(200).json({ "ok" : true });
})

router.post('/api/v1/register', (req, res) => {
    if (!req.body.login) {
        res.sendStatus(400);
        return;
    }
    
    if(db.users.find(i => i.login === req.body.login)) {
        res.status(302).json({error: "User already exists"});
        return;
    }    

    const createdUser = {
        login: req.body.login,
        pass: req.body.pass,
        session: '',
        makerId: 100,
        items: []
    }

    db.users.push(createdUser);
    fs.writeFile("public/text.txt", `${JSON.stringify(db)}`, (err) => {});
    //res.setHeader('Set-Cookie', 'cookie=true');
    res.status(201).json({ "ok" : true });
    
})

function giveMeCookie(res: express.Response) {
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
    return randomNumber;
}
export default router;