import { Router } from 'express';
import postModel from '../database/database'

const router = Router();

router.get('/api/v1/items', async (req, res) => {
    let user = await await postModel.findOne({ session: req.sessionID }).then(user => user);
    if (user) {
        res.json({items: user.items});
    } else {
        res.status(303).send({
            error: 'forbidden'
        });
    }
})

router.post('/api/v1/items', (req, res) => {
    if (!req.body.text) {
        res.sendStatus(400);
        return;
    }

    postModel.findOne({ session: req.sessionID }).then((user) => {
        if (!user) {
            res.sendStatus(404);
            return;
        }

        const createdItem = {
            id: user.makerId++,
            text: req.body.text,
            checked: false
        }
        user.items.push(createdItem);
        postModel.findOneAndUpdate({ session: req.sessionID }, user, { new: true })
        .then(user => {
            res.status(201).json({id: createdItem.id});
        })
    })
})

router.delete('/api/v1/items/', (req, res) => {
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }

    postModel.findOne({ session: req.sessionID }).then((user) => {
        if (!user) {
            res.sendStatus(404);
            return;
        }

        user.items = user.items.filter(i => i.id !== +req.body.id);

        postModel.findOneAndUpdate({ session: req.sessionID }, user, { new: true })
        .then(user => {
            res.status(200).json({ "ok" : true });
        })
    })
})

router.put('/api/v1/items/', (req, res) => {
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }

    postModel.findOne({ session: req.sessionID }).then((user) => {
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

        postModel.findOneAndUpdate({ session: req.sessionID }, user, { new: true })
        .then(user => {
            res.status(200).json({ "ok" : true });
        })
    })
})

async function findUser(req: Express.Request) {
    return await postModel.findOne({ session: req.sessionID }).then(user => user);
}

export default router;