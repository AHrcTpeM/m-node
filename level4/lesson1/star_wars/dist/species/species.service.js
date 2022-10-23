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
const film_entity_1 = require("../films/entities/film.entity");
const images_service_1 = require("../images/images.service");
const people_entity_1 = require("../people/entities/people.entity");
const typeorm_2 = require("typeorm");
const create_species_dto_1 = require("./dto/create-species.dto");
const species_entity_1 = require("./entities/species.entity");
let SpeciesService = class SpeciesService {
    constructor(speciesRepository, filmsRepository, peopleRepository, imagesService) {
        this.speciesRepository = speciesRepository;
        this.filmsRepository = filmsRepository;
        this.peopleRepository = peopleRepository;
        this.imagesService = imagesService;
        this.propsRelations = ['films', 'people', 'images'];
    }
    async create(createspeciesDto) {
        var _a;
        const resources = [this.filmsRepository, this.peopleRepository];
        let species = new species_entity_1.Species();
        for (let key in createspeciesDto) {
            if (key === 'images')
                continue;
            species[key] = this.propsRelations.includes(key) ? [] : createspeciesDto[key];
        }
        await this.speciesRepository.save(species).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        for (let i = 0; i < this.propsRelations.length - 1; i++) {
            (_a = createspeciesDto[this.propsRelations[i]]) === null || _a === void 0 ? void 0 : _a.forEach(async (elem) => {
                const person = await resources[i].findOneBy({ url: elem });
                if (person) {
                    species[this.propsRelations[i]].push(person);
                }
            });
        }
        return this.speciesRepository.save(species).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll() {
        return this.speciesRepository.find({
            relations: this.propsRelations,
            relationLoadStrategy: 'query'
        })
            .then(array => {
            return array.map((person) => {
                let species = new create_species_dto_1.CreateSpeciesDto();
                for (let key in person) {
                    species[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
                }
                return species;
            });
        });
    }
    async findOne(name) {
        return this.speciesRepository.findOne({
            relations: this.propsRelations,
            relationLoadStrategy: 'query',
            where: { name }
        })
            .then(person => {
            let species = new create_species_dto_1.CreateSpeciesDto();
            for (let key in person) {
                species[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
            }
            return species;
        })
            .then((result) => {
            if (result) {
                return result;
            }
            else {
                throw new common_1.HttpException("Person not found", common_1.HttpStatus.NOT_FOUND);
            }
        });
    }
    async remove(name) {
        const person = await this.speciesRepository.findOne({
            relations: ['images'],
            relationLoadStrategy: 'query',
            where: { name }
        });
        this.imagesService.deleteFiles(person.images.map((img) => img.url));
        if (person) {
            this.propsRelations.forEach((obj) => person[obj] = []);
            await this.speciesRepository.save(person);
        }
        return this.speciesRepository.delete(name)
            .then((result) => {
            if (result.affected) {
                return { name, deleted: 'success' };
            }
            else {
                throw new common_1.HttpException("Person not found", common_1.HttpStatus.NOT_FOUND);
            }
        })
            .catch((err) => err);
    }
    async uploadFile(fileUploadDto) {
        return await this.imagesService.uploadFile('species', fileUploadDto, species_entity_1.Species);
    }
    async deleteImage(name, image) {
        return await this.imagesService.deleteImage('species', name, image);
    }
    async uploadFileS3(file, fileUploadDto) {
        return await this.imagesService.uploadFileS3('species', file, fileUploadDto, species_entity_1.Species);
    }
    async deleteFileS3(name, key) {
        return await this.imagesService.deleteFileS3('species', name, key);
    }
};
SpeciesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(species_entity_1.Species)),
    __param(1, (0, typeorm_1.InjectRepository)(film_entity_1.Films)),
    __param(2, (0, typeorm_1.InjectRepository)(people_entity_1.People)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        images_service_1.ImagesService])
], SpeciesService);
exports.SpeciesService = SpeciesService;
//# sourceMappingURL=species.service.js.map