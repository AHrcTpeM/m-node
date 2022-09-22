"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
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
    .post(uploader.single('image'), (0, express_validator_1.body)('title').isLength({ min: 1 }), (0, express_validator_1.body)('author1').isLength({ min: 1 }), (0, express_validator_1.body)('pages').isLength({ min: 1 }).isNumeric(), (0, express_validator_1.body)('isbn').isLength({ min: 1 }), (0, express_validator_1.body)('year').isLength({ min: 4, max: 4 }).isNumeric(), (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, admin_1.addBook)
    .patch(admin_1.softDeleteBook);
router.route('/')
    .get(books_1.getBooks)
    .post((req, res) => {
    console.log(req.headers.host);
    res.json({ status: 'OK' });
});
router.route('/book/:id')
    .get(books_1.getBook)
    .post(books_1.addClick);
exports.default = router;
