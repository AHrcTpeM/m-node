import express from 'express';
import path from 'path';
import session from 'express-session';
import sessionStore from 'session-file-store';
import cors from 'cors';

import routerItems from './routes/items'
import routerAuthen from './routes/authen'

const app = express();
const port: number = 3005;

const FileStore = sessionStore(session);
app.use(session({
  store: new FileStore({}),
  secret: 'keyboard dog',
  resave: true,
  saveUninitialized: true,
}));

app.use(cors({
  origin: [`http://localhost:${port}`, 'http://localhost:8080', 'http://localhost:3000', 'http://192.168.27.1:3000', 'http://3.74.117.171:3005', 'http://3.74.117.171:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}, from ${req.socket.remoteAddress}`);
  next();
})

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routerItems);
app.use('/', routerAuthen);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})