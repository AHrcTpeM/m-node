"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database/database"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const items_1 = __importDefault(require("./routes/items"));
const authen_1 = __importDefault(require("./routes/authen"));
const app = (0, express_1.default)();
const port = 3005;
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
app.use((0, express_session_1.default)({
    store: new FileStore({}),
    secret: 'keyboard dog',
    resave: true,
    saveUninitialized: true,
}));
app.use((0, cors_1.default)({
    origin: [`http://localhost:${port}`, 'http://localhost:8080', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    // console.log(req.session);
    // console.log(req.sessionID);
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get('/hello', (req, res) => {
    console.log(database_1.default);
    console.log(req.headers.cookie);
    console.log(req.cookies.cookieName);
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
    res.cookie('name', "max");
    //res.setHeader('Set-Cookie', 'testCookie=MegaCookie');
    //console.log(res.getHeader('Set-Cookie'));
    res.end(JSON.stringify(database_1.default));
});
app.use('/', items_1.default);
app.use('/', authen_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
