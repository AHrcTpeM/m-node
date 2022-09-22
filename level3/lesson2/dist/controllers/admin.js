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
exports.softDeleteBook = exports.deleteBookByCron = exports.addBook = exports.getAdmin = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const connect_bd_1 = __importDefault(require("../migrations/connect_bd"));
function getAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.query.logout) {
            res.status(401).end(); // отправляем статус 401 для выхода из авторизации
            return;
        }
        let { page, search } = req.query;
        if (!search)
            search = '';
        //  WHERE title LIKE '%${search}%' OR author LIKE '%${search}%' OR year LIKE '%${search}%'
        // WHERE title LIKE ? OR author LIKE ? OR year LIKE ?
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
            //console.log('items', items);
            res.render('admin', { books: items, page: page || 0, search });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    });
}
exports.getAdmin = getAdmin;
function addBook(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        //console.log('body', req.body);
        // let authors = [req.body.author1, req.body.author2, req.body.author3]
        // authors = authors.filter(item => item !== '');
        //console.log(req.file?.filename);
        //console.log(req.headers.host);
        let data = [req.body.author1, req.body.author2, req.body.author3, req.body.year, req.body.title, req.body.pages, req.body.isbn, ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || 'images_may_del', req.body.author1, req.body.author2, req.body.author3];
        const sql = `
                INSERT IGNORE INTO authors(author) VALUES (?);    
                INSERT IGNORE INTO authors(author) VALUES (?); 
                INSERT IGNORE INTO authors(author) VALUES (?); 

                INSERT INTO books(year, title, pages, isbn, image) 
                VALUES 
                (?, ?, ?, ?, ?);

                SELECT MAX(id) FROM goodbooks.books;
                SELECT id FROM goodbooks.authors where author = ?;
                SELECT id FROM goodbooks.authors where author = ?;
                SELECT id FROM goodbooks.authors where author = ?;                
                `;
        connect_bd_1.default.query(sql, data).then(([result]) => {
            let items = JSON.parse(JSON.stringify(result));
            //console.log(result);
            //console.log('items', items[4][0]['MAX(id)']);
            let id1 = items[5][0]['id'];
            let id2 = items[6][0]['id'];
            let id3 = items[7][0]['id'];
            if (id2 === 1) { // автор == ''
                id2 = id1;
                id3 = id1;
            }
            if (id3 === 1) {
                id3 = id1;
            }
            const sql = `INSERT IGNORE INTO books_authors(book_id, author_id) 
        VALUES 
        (${items[4][0]['MAX(id)']}, ${id1}),
        (${items[4][0]['MAX(id)']}, ${id2}),
        (${items[4][0]['MAX(id)']}, ${id3})`;
            return connect_bd_1.default.query(sql);
        })
            .then(([result]) => {
            //console.log(result);
            req.query = { search: req.body.title };
            getAdmin(req, res); // res.redirect("/");
            //res.json({status: 'OK'});
        }).catch(err => {
            console.log(err);
            const error = { error: 'duplicate' };
            getAdmin(req, res);
            //res.status(500).json({error: err});
        });
    });
}
exports.addBook = addBook;
function deleteBookByCron() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT id FROM books WHERE deleted = 1;`;
        connect_bd_1.default.query(sql).then(([result]) => {
            let items = JSON.parse(JSON.stringify(result));
            let arrayId = items.map(elem => elem.id);
            //console.log(arrayId);
            const sql1 = `SELECT author_id FROM books_authors WHERE book_id IN ?;
                 SELECT image FROM books WHERE id IN ?;`;
            return connect_bd_1.default.query(sql1, [[arrayId], [arrayId]]).then(([result]) => {
                //console.log(result);
                let image = JSON.parse(JSON.stringify(result))[1];
                let arrayImg = image.map(elem => elem.image);
                //console.log(arrayImg);
                arrayImg.forEach(image => {
                    if (image.length > 10) { // отсекаем начальные данные и undefined         
                        (0, fs_1.unlink)(path_1.default.join(__dirname + `/../../public/images/${image}`), (err) => {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                console.log('-------Изображение удалено-------');
                            }
                        });
                    }
                });
                let items = JSON.parse(JSON.stringify(result))[0];
                let arrayAuthorId = items.map(elem => elem.author_id);
                //console.log(arrayAuthorId);
                if (items) {
                    const data = [[arrayId], [arrayId], [arrayAuthorId]];
                    const sql = `                
                    DELETE FROM books_authors WHERE book_id IN ?;
                    DELETE FROM books WHERE id IN ?;
                    DELETE IGNORE FROM authors WHERE id IN ?;                      
                    `;
                    return connect_bd_1.default.query(sql, data);
                }
            });
        })
            .then((result) => {
            //console.log(result);
            console.log('Книги удалены');
        })
            .catch(err => {
            console.log(err);
        });
    });
}
exports.deleteBookByCron = deleteBookByCron;
function softDeleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE books
                 SET deleted = NOT deleted
                 WHERE id = ?;`;
        connect_bd_1.default.query(sql, req.body.id)
            .then((result) => {
            res.json({ status: 'OK' });
        })
            .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    });
}
exports.softDeleteBook = softDeleteBook;
// export async function deleteBook(req: Request, res: Response) {
//     //console.log(req.body);
//     const data = [req.body.id, req.body.id]
//     const sql = `SELECT author_id FROM books_authors WHERE book_id = ?;
//                  SELECT image FROM books WHERE id = ?;`
//     connection.query(sql, data).then(([result]) => {
//         let image = JSON.parse(JSON.stringify(result))[1][0].image;
//         if (image.length > 10) {   // отсекаем начальные данные и undefined         
//             unlink(path.join(__dirname + `/../../public/images/${image}`), (err) => {
//                 if (err) {
//                     console.error(err)
//                 }})
//             console.log('-------Изображение удалено-------');
//         }
//         let items = JSON.parse(JSON.stringify(result))[0];
//         //console.log(result);
//         if (items) {
//             const data = [req.body.id, req.body.id, items[0].author_id, items[1]?.author_id || -1, items[2]?.author_id || -1];
//             const sql = `                
//                 DELETE FROM books_authors WHERE book_id = ?;
//                 DELETE FROM books WHERE id = ?;
//                 DELETE IGNORE FROM authors WHERE id = ?;
//                 DELETE IGNORE FROM authors WHERE id = ?;
//                 DELETE IGNORE FROM authors WHERE id = ?;                        
//                 `
//             return connection.query(sql, data);   
//         }        
//     })
//     .then((result) => {
//         //console.log('Книга удалена');
//         res.json({status: 'OK'});
//     })
//     .catch(err =>{
//         console.log(err);
//         res.status(500).json({error: err});
//       });
// }
