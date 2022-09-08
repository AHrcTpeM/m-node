"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const admin_1 = require("../controllers/admin");
const books_1 = require("../controllers/books");
const router = (0, express_1.Router)();
const diskStoreConfig = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, __dirname + "./public/books-page"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploader = (0, multer_1.default)({ storage: diskStoreConfig });
router.route('/admin')
    .get(admin_1.getAdmin)
    .post(admin_1.addBook)
    .post(uploader.single('image'), (req, res) => {
    var _a;
    console.log(req.headers.host);
    res.json({ uri: `${req.headers.host}/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}` });
})
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
    var _a;
    console.log(req.headers.host);
    res.json({ uri: `${req.headers.host}/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}` });
});
exports.default = router;
