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
exports.addClick = exports.getBook = exports.getBooks = void 0;
const connect_bd_1 = __importDefault(require("../migrations/connect_bd"));
function getBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { page, search } = req.query;
        if (!search)
            search = '';
        let data = [`%${search}%`, `%${search}%`, `%${search}%`];
        const sql = `
    SELECT *, GROUP_CONCAT(author SEPARATOR ', ') as authors
    FROM books 
    JOIN books_authors ON books.id = books_authors.book_id
    JOIN authors ON books_authors.author_id = authors.id
    WHERE title LIKE ? OR author LIKE ? OR year LIKE ?
    GROUP BY book_id
    ORDER by book_id;`;
        connect_bd_1.default.query(sql, data).then(([result]) => {
            let items = JSON.parse(JSON.stringify(result));
            //console.log('items', result);  
            res.render('index', { books: items, page: page || 0, search });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
}
exports.getBooks = getBooks;
function getBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { id } = req.params;
        const data = [id, id];
        const sql = `
    UPDATE books SET view=view+1 WHERE id=?;

    SELECT *, GROUP_CONCAT(author SEPARATOR ', ') as authors
    FROM books 
    JOIN books_authors ON books.id = books_authors.book_id
    JOIN authors ON books_authors.author_id = authors.id
    WHERE book_id=?;`;
        connect_bd_1.default.query(sql, data).then(([result]) => {
            let items = JSON.parse(JSON.stringify(result))[1][0];
            //console.log(items);
            if (items.id) {
                res.render('book', { book: items });
            }
            else {
                res.status(404).render('error');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    });
}
exports.getBook = getBook;
function addClick(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { id } = req.body;
        const sql = `UPDATE books SET click=click+1 WHERE id=?;`;
        connect_bd_1.default.query(sql, id).then(([result]) => {
            res.json({ status: 'OK' });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    });
}
exports.addClick = addClick;
