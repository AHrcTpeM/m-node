import { Router, Request, Response } from 'express';
import multer from 'multer';
import { getAdmin, addBook, deleteBook } from '../controllers/admin';
import { getBook, getBooks, addClick } from '../controllers/books';

const router = Router();

const diskStoreConfig = multer.diskStorage({
    destination: (req, file, cb) => cb(null, __dirname + "./public/books-page"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
}
})
const uploader = multer({storage: diskStoreConfig});

router.route('/admin')
.get(getAdmin)
.post(addBook)
.post(uploader.single('image'), (req: Request, res: Response) => {
    console.log(req.headers.host);
    res.json({ uri: `${req.headers.host}/${req.file?.filename}`})
})
.delete(deleteBook)
// .put(update);

router.route('/')
.get(getBooks)
.post((req: Request, res: Response) => {
    console.log(req.headers.host);
    res.json({status: 'OK'});
  });

router.route('/book/:id')
.get(getBook)
.post(addClick);

router.post('/file',  uploader.single("file"), (req: Request, res: Response) => {
    console.log(req.headers.host);
      res.json({ uri: `${req.headers.host}/${req.file?.filename}`});
  })

export default router;