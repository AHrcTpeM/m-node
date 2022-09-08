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
        const sql = `
    SELECT *
    FROM books 
    JOIN books_authors ON books.id = books_authors.book_id
    JOIN authors ON books_authors.author_id = authors.id
    WHERE title LIKE '%${search}%' OR author LIKE '%${search}%' OR year LIKE '%${search}%';`;
        connect_bd_1.default.query(sql).then(([result]) => {
            let items = JSON.parse(JSON.stringify(result));
            //console.log('items', result);
            // let {page, search} = req.query;
            // let searchBooks = items;
            // //console.log(searchBooks);
            // if (typeof search === 'string' && search !== '') {
            //     let nsearch = search;
            //     searchBooks = items.filter((item) => item.title.toLowerCase().includes(nsearch) || item.author.toLowerCase().includes(nsearch));   
            // }     
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
        const sql = `
    UPDATE books SET view=view+1 WHERE id=${id};

    SELECT *
    FROM books 
    JOIN books_authors ON books.id = books_authors.book_id
    JOIN authors ON books_authors.author_id = authors.id
    WHERE book_id=${id};`;
        connect_bd_1.default.query(sql).then(([result]) => {
            let items = JSON.parse(JSON.stringify(result))[1][0];
            //console.log(items);    
            res.render('book', { book: items });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
}
exports.getBook = getBook;
function addClick(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { id } = req.body;
        const sql = `UPDATE books SET click=click+1 WHERE id=${id};`;
        connect_bd_1.default.query(sql).then(([result]) => {
            res.json({ status: 'OK' });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
}
exports.addClick = addClick;
