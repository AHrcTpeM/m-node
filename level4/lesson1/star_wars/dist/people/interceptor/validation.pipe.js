"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipeMy = void 0;
const common_1 = require("@nestjs/common");
let ValidationPipeMy = class ValidationPipeMy {
    constructor(type) {
        this.type = type;
    }
    transform(value, metadata) {
        const url = this.type === 's3' ?
            `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/` :
            `http://${process.env.HOST}:${process.env.PORT}/`;
        const regexp = new RegExp(url);
        const bool = value === '' ? true : regexp.test(value);
        if (!bool)
            throw new common_1.HttpException("Wrong image address", common_1.HttpStatus.BAD_REQUEST);
        return value;
    }
};
ValidationPipeMy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ValidationPipeMy);
exports.ValidationPipeMy = ValidationPipeMy;
//# sourceMappingURL=validation.pipe.js.map