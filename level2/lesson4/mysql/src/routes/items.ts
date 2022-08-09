import { Router } from 'express';
import connection from '../database/database'

const router = Router();

router.get('/api/v1/items', (req, res) => {
    findUser(req).then((user) => {
        console.log(user?.login);
        if (user) {
            const userId = user.id;
            const sql = `SELECT * FROM items WHERE CustomerId=?`            
            connection.query(sql, userId).then(([result]) => {
                let items = JSON.parse(JSON.stringify(result));
                items.map((elem: {checked: boolean}) => {
                    elem.checked = Boolean(elem.checked);
                    return elem;
                })
                res.json({items: items});
            })
        } else {
            res.status(303).send({
                error: 'forbidden'
            })
        }
    })
})

router.post('/api/v1/items', async (req, res) => {
    if (!req.body.text) {
        res.sendStatus(400);
        return;
    }
    const user = await findUser(req);
    if (!user) {
        res.sendStatus(404);
        return;
    }

    const items: [number, string, boolean] = [user.id, req.body.text, false];

    const sql3 = `INSERT INTO items(CustomerId, text, checked) VALUES (?)`;

    connection.query(sql3, [items]).then((result) => {
        let items = JSON.parse(JSON.stringify(result))[0];
        res.status(201).json({id: items.insertId})
    })
    .catch((err) => {
        res.sendStatus(400);
    }) 
})

router.delete('/api/v1/items/', async (req, res) => {
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }

    const user = await findUser(req);
    if (!user) {
        res.sendStatus(404);
        return;
    }

    const userId = req.body.id;
    const sql = `DELETE FROM items WHERE id=?`;    
    connection.query(sql, userId).then(([result]) => {
        let items = JSON.parse(JSON.stringify(result));
        res.status(200).json({ "ok" : true });
    })
})

router.put('/api/v1/items/', async (req, res) => {
    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }

    const user = await findUser(req);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    
    const data: [string, boolean, number] = [req.body.text, req.body.checked, req.body.id];
    const sql = `UPDATE items SET text=?, checked=? WHERE id=?`;

    connection.query(sql, data).then(() => {
        res.status(200).json({ "ok" : true })
    })
})

function findUser(req: Express.Request) {
    const sql4 = `SELECT * FROM users WHERE session=?`;
    const filter = req.sessionID;
    
    return connection.query(sql4, filter).then(([result]) => {
        let user = JSON.parse(JSON.stringify(result))[0];
        return user;
    })
}

export default router;