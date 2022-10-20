"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsMemoryStorage = exports.optionsDiskStorage = void 0;
const multer_1 = require("multer");
exports.optionsDiskStorage = {
    storage: (0, multer_1.diskStorage)({
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
        }
        else {
            callback(null, false);
        }
    }
};
exports.optionsMemoryStorage = {
    storage: (0, multer_1.memoryStorage)(),
    fileFilter(req, file, callback) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    }
};
//# sourceMappingURL=options.js.map