/// <reference types="multer" />
export declare const optionsDiskStorage: {
    storage: import("multer").StorageEngine;
    fileFilter(req: any, file: any, callback: any): void;
};
export declare const optionsMemoryStorage: {
    storage: import("multer").StorageEngine;
    fileFilter(req: any, file: any, callback: any): void;
};
