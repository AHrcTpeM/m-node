import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

import { getAdmin, addBook, deleteBook } from '../controllers/admin';
import { getBook, getBooks, addClick } from '../controllers/books';

const router = Router();

const diskStoreConfig = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname + "/../../public/images")),
    filename: (req, file, cb) => {
      //console.log(file.originalname);
      const ext = (file.originalname || "").replace(/^[^.]+/g, "");
      //console.log(ext);
      const name = Math.random().toString(36).replace("0.", "img-");
      //console.log(Math.random().toString(36));
      cb(null, `${name}${ext}`);
      //cb(null, file.originalname);
}
})

const uploader = multer({
  storage: diskStoreConfig,
  fileFilter(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
    }}
});

router.route('/admin')
.get(getAdmin)
.post(uploader.single('image'), addBook)
// .post(uploader.single('image'), (req: Request, res: Response) => {
//     console.log(req.headers.host);
//     res.json({ uri: `${req.headers.host}/${req.file?.filename}`})
// })
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
    console.log(req.body);
    console.log(req.file);
    console.log(req.file?.filename);
    res.json({ uri: `${req.headers.host}/${req.file?.filename}`});
})

export default router;