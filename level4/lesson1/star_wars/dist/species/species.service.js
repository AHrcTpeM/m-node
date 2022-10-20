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
exports.SpeciesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const species_entity_1 = require("./entities/species.entity");
let SpeciesService = class SpeciesService {
    constructor(speciesRepository) {
        this.speciesRepository = speciesRepository;
    }
    async create(createSpeciesDto) {
        let species = new species_entity_1.Species();
        for (let key in createSpeciesDto) {
            species[key] = createSpeciesDto[key];
        }
        return this.speciesRepository.save(species);
    }
    async findAll() {
        return await this.speciesRepository.find();
    }
    findOne(name) {
        return this.speciesRepository.findOneBy({ name: name });
    }
    async remove(name) {
        await this.speciesRepository.delete(name);
    }
};
SpeciesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(species_entity_1.Species)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SpeciesService);
exports.SpeciesService = SpeciesService;
//# sourceMappingURL=species.service.js.map