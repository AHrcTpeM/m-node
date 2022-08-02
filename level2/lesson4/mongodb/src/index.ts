import express from 'express';
import path from 'path';
import session from 'express-session';
import sessionStore from 'session-file-store';

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

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
})

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routerItems);
app.use('/', routerAuthen);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})