"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.addBook = exports.getAdmin = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const connect_bd_1 = __importDefault(require("../migrations/connect_bd"));
function getAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { page, search } = req.query;
        if (!search)
            search = '';
        const sql = `
    SELECT *
    FROM books 
    JOIN books_authors ON books.id = books_authors.book_id
    JOIN authors ON books_authors.author_id = authors.id
    WHERE title LIKE '%${search}%' OR author LIKE '%${search}%' OR year LIKE '%${search}%';`;
        connect_bd_1.default.query(sql).then(([result]) => {
            let items = JSON.parse(JSON.stringify(result));
            //console.log('items', items);
            res.render('admin', { books: items, page: page || 0, search });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
}
exports.getAdmin = getAdmin;
function addBook(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        //console.log('body', req.body);
        //console.log(req.file?.filename);
        //console.log(req.headers.host);
        const sql = `
                INSERT INTO authors(author) 
                VALUES 
                ('${req.body.author1}');

                INSERT INTO books(year, title, pages, isbn, image) 
                VALUES 
                (${req.body.year}, '${req.body.title}', ${req.body.pages}, '${req.body.isbn}', '${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}');

                SELECT MAX(id) FROM goodbooks.authors;
                SELECT MAX(id) FROM goodbooks.books;
                `;
        connect_bd_1.default.query(sql).then(([result]) => {
            let items = JSON.parse(JSON.stringify(result));
            //console.log('items', items[3][0]['MAX(id)']);
            const sql = `INSERT INTO books_authors(book_id, author_id) 
        VALUES 
        (${items[3][0]['MAX(id)']}, ${items[2][0]['MAX(id)']})`;
            return connect_bd_1.default.query(sql);
        })
            .then(([result]) => {
            //console.log(result);
            req.query = { search: req.body.title };
            getAdmin(req, res);
            //res.json({status: 'OK'});
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
}
exports.addBook = addBook;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(req.body);
        const sql = `SELECT author_id FROM books_authors WHERE book_id = ${req.body.id};
                 SELECT image FROM books WHERE id = ${req.body.id};`;
        connect_bd_1.default.query(sql).then(([result]) => {
            let image = JSON.parse(JSON.stringify(result))[1][0].image;
            if (image.length > 10) {
                (0, fs_1.unlink)(path_1.default.join(__dirname + `/../../public/images/${image}`), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                console.log('-------Файл удален-------');
            }
            let items = JSON.parse(JSON.stringify(result))[0][0];
            //console.log(result);
            if (items) {
                const sql = `                
                DELETE FROM books_authors WHERE book_id = ${req.body.id};
                DELETE FROM books WHERE id = ${req.body.id};
                DELETE FROM authors WHERE id = ${items.author_id};                        
                `;
                return connect_bd_1.default.query(sql);
            }
        })
            .then((result) => {
            //console.log('Книга удалена');
            res.json({ status: 'OK' });
        })
            .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
}
exports.deleteBook = deleteBook;
