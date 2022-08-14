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
    origin: [`http://localhost:${port}`, 'http://localhost:8080', 'http://localhost:3000', 'http://192.168.27.1:3000', 'http://3.74.117.171:3005', 'http://3.74.117.171:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}, from ${req.socket.remoteAddress}`);
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/', items_1.default);
app.use('/', authen_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
