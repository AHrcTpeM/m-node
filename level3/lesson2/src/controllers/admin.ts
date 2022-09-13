import { Request, Response } from "express";
import { unlink } from 'fs';
import path from 'path';

import { MyBooks } from "../interfaces/interface";
import connection from '../migrations/connect_bd'

export async function getAdmin(req: Request, res: Response) {
    if (req.query.logout) {
        res.status(401).end();   // отправляем статус 401 для выхода из авторизации
        return;
    }

    let {page, search} = req.query;
    if (!search) search = '';
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
    ORDER by book_id;`

    connection.query(sql, data).then(([result]) => {
        let items: MyBooks[] = JSON.parse(JSON.stringify(result));
        //console.log('items', items);
        res.render('admin', {books: items, page: page || 0, search})
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
      });
}

export async function addBook(req: Request, res: Response) {
    //console.log('body', req.body);

    // let authors = [req.body.author1, req.body.author2, req.body.author3]
    // authors = authors.filter(item => item !== '');

    //console.log(req.file?.filename);
    //console.log(req.headers.host);
    
    let data = [req.body.author1, req.body.author2, req.body.author3, req.body.year, req.body.title, req.body.pages, req.body.isbn, req.file?.filename, req.body.author1, req.body.author2, req.body.author3];

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
                `

    connection.query(sql, data).then(([result]) => {
        let items = JSON.parse(JSON.stringify(result));
        //console.log(result);
        //console.log('items', items[4][0]['MAX(id)']);
        let id1 = items[5][0]['id'];
        let id2 = items[6][0]['id'];
        let id3 = items[7][0]['id'];
        if (id2 === 1) {  // автор == ''
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
        (${items[4][0]['MAX(id)']}, ${id3})`

        return connection.query(sql);

    })
    .then(([result]) => {
        //console.log(result);
        req.query = {search: req.body.title};
        getAdmin(req, res);  // res.redirect("/");
        //res.json({status: 'OK'});
    }).catch(err =>{
        console.log(err);
        const error = {error: 'duplicate'}
        getAdmin(req, res);
        //res.status(500).json({error: err});
      }); 

}

export async function deleteBook(req: Request, res: Response) {
    //console.log(req.body);

    const data = [req.body.id, req.body.id]
    const sql = `SELECT author_id FROM books_authors WHERE book_id = ?;
                 SELECT image FROM books WHERE id = ?;`

    connection.query(sql, data).then(([result]) => {
        let image = JSON.parse(JSON.stringify(result))[1][0].image;
        if (image.length > 10) {   // отсекаем начальные данные и undefined         
            unlink(path.join(__dirname + `/../../public/images/${image}`), (err) => {
                if (err) {
                    console.error(err)
                }})
            console.log('-------Изображение удалено-------');
        }

        let items = JSON.parse(JSON.stringify(result))[0];
        //console.log(result);
        if (items) {
            const data = [req.body.id, req.body.id, items[0].author_id, items[1]?.author_id || -1, items[2]?.author_id || -1];
            const sql = `                
                DELETE FROM books_authors WHERE book_id = ?;
                DELETE FROM books WHERE id = ?;
                DELETE IGNORE FROM authors WHERE id = ?;
                DELETE IGNORE FROM authors WHERE id = ?;
                DELETE IGNORE FROM authors WHERE id = ?;                        
                `
            return connection.query(sql, data);   
        }        
    })
    .then((result) => {
        //console.log('Книга удалена');
        res.json({status: 'OK'});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
      });
    
}