"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const admin_1 = require("../controllers/admin");
const books_1 = require("../controllers/books");
const router = (0, express_1.Router)();
const diskStoreConfig = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, path_1.default.join(__dirname + "/../../public/images")),
    filename: (req, file, cb) => {
        //console.log(file.originalname);
        const ext = (file.originalname || "").replace(/^[^.]+/g, "");
        //console.log(ext);
        const name = Math.random().toString(36).replace("0.", "img-");
        //console.log(Math.random().toString(36));
        cb(null, `${name}${ext}`);
        //cb(null, file.originalname);
    }
});
const uploader = (0, multer_1.default)({
    storage: diskStoreConfig,
    fileFilter(req, file, callback) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    }
});
router.route('/admin')
    .get(admin_1.getAdmin)
    .post(uploader.single('image'), admin_1.addBook)
    // .post(uploader.single('image'), (req: Request, res: Response) => {
    //     console.log(req.headers.host);
    //     res.json({ uri: `${req.headers.host}/${req.file?.filename}`})
    // })
    .delete(admin_1.deleteBook);
// .put(update);
router.route('/')
    .get(books_1.getBooks)
    .post((req, res) => {
    console.log(req.headers.host);
    res.json({ status: 'OK' });
});
router.route('/book/:id')
    .get(books_1.getBook)
    .post(books_1.addClick);
router.post('/file', uploader.single("file"), (req, res) => {
    var _a, _b;
    console.log(req.body);
    console.log(req.file);
    console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
    res.json({ uri: `${req.headers.host}/${(_b = req.file) === null || _b === void 0 ? void 0 : _b.filename}` });
});
exports.default = router;
