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
exports.SpeciesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const species_service_1 = require("./species.service");
const create_species_dto_1 = require("./dto/create-species.dto");
let SpeciesController = class SpeciesController {
    constructor(speciesService) {
        this.speciesService = speciesService;
    }
    create(createSpeciesDto) {
        return this.speciesService.create(createSpeciesDto);
    }
    findAll() {
        return this.speciesService.findAll();
    }
    findOne(name) {
        return this.speciesService.findOne(name);
    }
    remove(name) {
        return this.speciesService.remove(name);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_species_dto_1.CreateSpeciesDto]),
    __metadata("design:returntype", Promise)
], SpeciesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpeciesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpeciesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpeciesController.prototype, "remove", null);
SpeciesController = __decorate([
    (0, swagger_1.ApiTags)('species'),
    (0, common_1.Controller)('species'),
    __metadata("design:paramtypes", [species_service_1.SpeciesService])
], SpeciesController);
exports.SpeciesController = SpeciesController;
//# sourceMappingURL=species.controller.js.map