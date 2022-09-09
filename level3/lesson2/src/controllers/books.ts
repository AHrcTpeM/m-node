import { Request, Response } from "express";
import books from '../database/database';
import { MyBooks } from "../interfaces/interface";
import connection from '../migrations/connect_bd'

export async function getBooks(req: Request, res: Response) {
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
        //console.log('items', result);  
        res.render('index', {books: items, page: page || 0, search})
    }).catch(err =>{
        console.log(err);
        res.status(500).json(err);
      });
}

export async function getBook(req: Request, res: Response) {
    let {id} = req.params;

    const sql = `
    UPDATE books SET view=view+1 WHERE id=${id};

    SELECT *
    FROM books 
    JOIN books_authors ON books.id = books_authors.book_id
    JOIN authors ON books_authors.author_id = authors.id
    WHERE book_id=${id};`

    connection.query(sql).then(([result]) => {
        let items: MyBooks[] = JSON.parse(JSON.stringify(result))[1][0];
        //console.log(items);    
        res.render('book', {book: items})
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
      });

}

export async function addClick(req: Request, res: Response) {
    let {id} = req.body;

    const sql = `UPDATE books SET click=click+1 WHERE id=${id};`

    connection.query(sql).then(([result]) => {
        res.json({status: 'OK'});
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
      });

}