import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';

import { getAdmin, addBook, softDeleteBook, deleteBookByCron } from '../controllers/admin';
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
.post(
  uploader.single('image'),  
  body('title').isLength({ min: 1 }),
  body('author1').isLength({ min: 1 }),
  body('pages').isLength({  min: 1 }).isNumeric(),
  body('isbn').isLength({  min: 1 }),
  body('year').isLength({ min: 4, max: 4 }).isNumeric(),
  (req: Request, res: Response, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addBook
)
.patch(softDeleteBook);

router.route('/')
.get(getBooks)
.post((req: Request, res: Response) => {
    console.log(req.headers.host);
    res.json({status: 'OK'});
  });

router.route('/book/:id')
.get(getBook)
.post(addClick);

export default router;