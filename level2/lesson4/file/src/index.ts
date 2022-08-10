import express from 'express';
import path from 'path';
import session from 'express-session';
import sessionStore from 'session-file-store';
import cors from 'cors';

import db from './database/database'
import cookieParser  from 'cookie-parser';
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
  origin: [`http://localhost:${port}`, 'http://localhost:8080', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  // console.log(req.session);
  // console.log(req.sessionID);
  next();
})

app.use(express.static(path.join(__dirname, '../public')));

app.get('/hello', (req, res) => {
  console.log(db);
  console.log(req.headers.cookie);
  console.log(req.cookies.cookieName);

  let randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);
  res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
  res.cookie('name', "max")
  //res.setHeader('Set-Cookie', 'testCookie=MegaCookie');
  //console.log(res.getHeader('Set-Cookie'));
  res.end(JSON.stringify(db));
})

app.use('/', routerItems);
app.use('/', routerAuthen);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})