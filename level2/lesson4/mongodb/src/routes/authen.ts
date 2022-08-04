import { Router } from 'express';
import postModel from '../database/database'

const router = Router();

router.post('/api/v1/logout', (req, res) => {
    req.session.destroy((err) => res.clearCookie('connect.sid').status(200).json({ "ok" : true }));
})

router.post('/api/v1/login', (req, res) => {
    if (!req.body.login) {
        res.sendStatus(400);
        return;
    }

    postModel.findOne({login: req.body.login, pass: req.body.pass}).then(user => {
        if (!user) {
            res.sendStatus(404);
            return;
        }

        user.session = req.sessionID;
        postModel.findOneAndUpdate({login: req.body.login}, user, { new: true })
        .then(post => {
            res.status(200).json({ "ok" : true });
        })        
    })
})

router.post('/api/v1/register', (req, res) => {
    if (!req.body.login) {
        res.sendStatus(400);
        return;
    }
    
    postModel.findOne({ login: req.body.login }).then(user => {
        if(user) {
            res.status(302).json({error: "User already exists"});
            return;
        } else {
            const createdUser = {
                login: req.body.login,
                pass: req.body.pass,
                session: '',
                makerId: 100,
                items: []
            }
    
            postModel.insertMany(createdUser).then(function(){
                res.status(201).json({ "ok" : true });
                }).catch(function(err){
                    res.status(500).json({error: "Error adding to database"});
            });
        }    
    })
    
})

export default router;