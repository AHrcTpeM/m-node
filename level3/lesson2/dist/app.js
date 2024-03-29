"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const cron_schedule_1 = require("./migrations/cron_schedule");
const router_1 = __importDefault(require("./router/router"));
(0, cron_schedule_1.startCron)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = 3000;
app.set('views', './views');
app.set('view engine', 'ejs');
// app.get('/', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there, paraparam!1'});
// });
app.use('/', express_1.default.static('public/'));
app.use('/book/:id', express_1.default.static('public/'));
app.use('/admin', express_1.default.static('public/'));
app.use(express_1.default.static('public/'));
app.use('/admin', (0, express_basic_auth_1.default)({
    users: { admin: 'admin', admin1: 'admin1' },
    challenge: true // <--- needed to actually show the login dialog!
}));
app.use(router_1.default);
app.use(function (req, res, next) {
    res.status(404).render('error');
});
app.listen(port, function () {
    console.log(`Server listens port: ${port}`);
});
