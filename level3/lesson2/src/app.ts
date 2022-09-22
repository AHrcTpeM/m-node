import express from "express";
import basicAuth from 'express-basic-auth';
import path from "path";
import { startCron } from "./migrations/cron_schedule";

import router from "./router/router";

startCron();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
// app.get('/', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there, paraparam!1'});
// });

app.use('/', express.static('public/'));
app.use('/book/:id', express.static('public/'));
app.use('/admin', express.static('public/'));

app.use(express.static('public/'));

app.use('/admin', basicAuth({
  users: { admin: 'admin', admin1: 'admin1' },
  challenge: true // <--- needed to actually show the login dialog!
}));

app.use(router);

app.use(function (req, res, next) {
  res.status(404).render('error');
});

app.listen(port, function () {
  console.log(`Server listens port: ${port}`);
});
