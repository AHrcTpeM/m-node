import { Request, Response } from "express";
import { MyBooks } from "../interfaces/interface";
import connection from '../migrations/connect_bd'

export async function getBooks(req: Request, res: Response) {
    let {page, search} = req.query;
    if (!search) search = '';

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
        //console.log('items', result);  
        res.render('index', {books: items, page: page || 0, search})
    }).catch(err =>{
        console.log(err);
        res.status(500).json(err);
      });
}

export async function getBook(req: Request, res: Response) {
    let {id} = req.params;

    const data = [id, id];
    const sql = `
    UPDATE books SET view=view+1 WHERE id=?;

    SELECT *, GROUP_CONCAT(author SEPARATOR ', ') as authors
    FROM books 
    JOIN books_authors ON books.id = books_authors.book_id
    JOIN authors ON books_authors.author_id = authors.id
    WHERE book_id=?;`

    connection.query(sql, data).then(([result]) => {
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

    const sql = `UPDATE books SET click=click+1 WHERE id=?;`

    connection.query(sql, id).then(([result]) => {
        res.json({status: 'OK'});
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
      });

}