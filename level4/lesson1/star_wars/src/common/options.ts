import { diskStorage, memoryStorage } from 'multer';

export const optionsDiskStorage = {
  storage: diskStorage({
    destination: './files',
    filename: (req, file, cb) => {
      const ext = (file.originalname || "").replace(/^[^.]+/g, "");
      const name = Math.random().toString(36).replace("0.", "img-");
      cb(null, `${name}${ext}`);
}
  }),
  fileFilter(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
    }}
}

export const optionsMemoryStorage = {
  storage: memoryStorage(),
  fileFilter(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
    }}
}