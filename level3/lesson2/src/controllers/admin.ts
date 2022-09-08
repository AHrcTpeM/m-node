import { Request, Response } from "express";
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

        // let {page, search} = req.query;
        // let searchBooks = items;
        // //console.log(searchBooks);
        // if (typeof search === 'string' && search !== '') {
        //     let nsearch = search;
        //     searchBooks = items.filter((item) => item.title.toLowerCase().includes(nsearch) || item.author.toLowerCase().includes(nsearch));   
        // }        
        res.render('admin', {books: items, page: page || 0, search})
    }).catch(err =>{
        console.log(err);
        res.status(500).json(err);
      });
}

export async function addBook(req: Request, res: Response) {
    console.log(req.body);
    //console.log(req.headers.host);

    const sql = `
                INSERT INTO authors(author) 
                VALUES 
                ('${req.body.author1}');

                INSERT INTO books(year, title, pages, isbn) 
                VALUES 
                (${req.body.year}, '${req.body.title}', ${req.body.pages}, '${req.body.isbn}');

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
        res.json({status: 'OK'});
    }).catch(err =>{
        console.log(err);
        res.status(500).json(err);
      }); 

}

export async function deleteBook(req: Request, res: Response) {
    //console.log(req.body);

    const sql = `SELECT author_id FROM books_authors WHERE book_id = ${req.body.id};`

    connection.query(sql).then(([result]) => {
        let items = JSON.parse(JSON.stringify(result))[0];
        //console.log(items);
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
        res.status(500).json(err);
      });
    
}