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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarshipsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const starships_service_1 = require("./starships.service");
const create_starship_dto_1 = require("./dto/create-starship.dto");
let StarshipsController = class StarshipsController {
    constructor(starshipsService) {
        this.starshipsService = starshipsService;
    }
    create(createStarshipDto) {
        return this.starshipsService.create(createStarshipDto);
    }
    findAll() {
        return this.starshipsService.findAll();
    }
    findOne(name) {
        return this.starshipsService.findOne(name);
    }
    remove(name) {
        return this.starshipsService.remove(name);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_starship_dto_1.CreateStarshipDto]),
    __metadata("design:returntype", Promise)
], StarshipsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StarshipsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StarshipsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StarshipsController.prototype, "remove", null);
StarshipsController = __decorate([
    (0, swagger_1.ApiTags)('starships'),
    (0, common_1.Controller)('starships'),
    __metadata("design:paramtypes", [starships_service_1.StarshipsService])
], StarshipsController);
exports.StarshipsController = StarshipsController;
//# sourceMappingURL=starships.controller.js.map