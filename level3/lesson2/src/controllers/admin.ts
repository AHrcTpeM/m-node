import { Request, Response } from "express";
import { unlink } from 'fs';
import path from 'path';

import { MyBooks } from "../interfaces/interface";
import connection from '../migrations/connect_bd'

export async function getAdmin(req: Request, res: Response) {
    let {page, search} = req.query;
    if (!search) search = '';

    const sql = `
    SELECT *
    FROM books 
    JOIN books_authors ON books.id = books_authors.book_id
    JOIN authors ON books_authors.author_id = authors.id
    WHERE title LIKE '%${search}%' OR author LIKE '%${search}%' OR year LIKE '%${search}%';`

    connection.query(sql).then(([result]) => {
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
    //console.log(req.file?.filename);
    //console.log(req.headers.host);

    const sql = `
                INSERT INTO authors(author) 
                VALUES 
                ('${req.body.author1}');

                INSERT INTO books(year, title, pages, isbn, image) 
                VALUES 
                (${req.body.year}, '${req.body.title}', ${req.body.pages}, '${req.body.isbn}', '${req.file?.filename}');

                SELECT MAX(id) FROM goodbooks.authors;
                SELECT MAX(id) FROM goodbooks.books;
                `

    connection.query(sql).then(([result]) => {
        let items = JSON.parse(JSON.stringify(result));
        //console.log('items', items[3][0]['MAX(id)']);

        const sql = `INSERT INTO books_authors(book_id, author_id) 
        VALUES 
        (${items[3][0]['MAX(id)']}, ${items[2][0]['MAX(id)']})`

        return connection.query(sql);

    })
    .then(([result]) => {
        //console.log(result);
        req.query = {search: req.body.title};
        getAdmin(req, res);
        //res.json({status: 'OK'});
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
      }); 

}

export async function deleteBook(req: Request, res: Response) {
    //console.log(req.body);

    const sql = `SELECT author_id FROM books_authors WHERE book_id = ${req.body.id};
                 SELECT image FROM books WHERE id = ${req.body.id};`

    connection.query(sql).then(([result]) => {
        let image = JSON.parse(JSON.stringify(result))[1][0].image;
        if (image.length > 10) {            
            unlink(path.join(__dirname + `/../../public/images/${image}`), (err) => {
                if (err) {
                    console.error(err)
                }})
            console.log('-------Файл удален-------');
        }

        let items = JSON.parse(JSON.stringify(result))[0][0];
        //console.log(result);
        if (items) {
            const sql = `                
                DELETE FROM books_authors WHERE book_id = ${req.body.id};
                DELETE FROM books WHERE id = ${req.body.id};
                DELETE FROM authors WHERE id = ${items.author_id};                        
                `
            return connection.query(sql);   
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