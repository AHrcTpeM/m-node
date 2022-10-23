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
exports.FilmsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const create_film_dto_1 = require("./dto/create-film.dto");
const film_entity_1 = require("./entities/film.entity");
const people_entity_1 = require("./../people/entities/people.entity");
const starship_entity_1 = require("./../starships/entities/starship.entity");
const planet_entity_1 = require("./../planets/entities/planet.entity");
const species_entity_1 = require("./../species/entities/species.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const images_service_1 = require("../images/images.service");
let FilmsService = class FilmsService {
    constructor(filmsRepository, peopleRepository, starshipsRepository, planetsRepository, speciesRepository, vehiclesRepository, imagesService) {
        this.filmsRepository = filmsRepository;
        this.peopleRepository = peopleRepository;
        this.starshipsRepository = starshipsRepository;
        this.planetsRepository = planetsRepository;
        this.speciesRepository = speciesRepository;
        this.vehiclesRepository = vehiclesRepository;
        this.imagesService = imagesService;
        this.propsRelations = ['characters', 'species', 'starships', 'vehicles', 'planets', 'images'];
    }
    async create(createfilmsDto) {
        var _a;
        const resources = [this.peopleRepository, this.speciesRepository, this.starshipsRepository, this.vehiclesRepository, this.planetsRepository];
        let films = new film_entity_1.Films();
        for (let key in createfilmsDto) {
            if (key === 'images')
                continue;
            films[key] = this.propsRelations.includes(key) ? [] : createfilmsDto[key];
        }
        await this.filmsRepository.save(films).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        for (let i = 0; i < this.propsRelations.length - 1; i++) {
            (_a = createfilmsDto[this.propsRelations[i]]) === null || _a === void 0 ? void 0 : _a.forEach(async (elem) => {
                const person = await resources[i].findOneBy({ url: elem });
                if (person) {
                    films[this.propsRelations[i]].push(person);
                }
            });
        }
        return this.filmsRepository.save(films).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll() {
        return this.filmsRepository.find({
            relations: this.propsRelations,
            relationLoadStrategy: 'query'
        })
            .then(array => {
            return array.map((person) => {
                let films = new create_film_dto_1.CreateFilmDto();
                for (let key in person) {
                    films[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
                }
                return films;
            });
        });
    }
    async findOne(name) {
        return this.filmsRepository.findOne({
            relations: this.propsRelations,
            relationLoadStrategy: 'query',
            where: { title: name }
        })
            .then(person => {
            let films = new create_film_dto_1.CreateFilmDto();
            for (let key in person) {
                films[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
            }
            return films;
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
        const person = await this.filmsRepository.findOne({
            relations: ['images'],
            relationLoadStrategy: 'query',
            where: { title: name }
        });
        this.imagesService.deleteFiles(person.images.map((img) => img.url));
        if (person) {
            this.propsRelations.forEach((obj) => person[obj] = []);
            await this.filmsRepository.save(person);
        }
        return this.filmsRepository.delete(name)
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
        return await this.imagesService.uploadFile('films', fileUploadDto, film_entity_1.Films);
    }
    async deleteImage(name, image) {
        return await this.imagesService.deleteImage('films', name, image);
    }
    async uploadFileS3(file, fileUploadDto) {
        return await this.imagesService.uploadFileS3('films', file, fileUploadDto, film_entity_1.Films);
    }
    async deleteFileS3(name, key) {
        return await this.imagesService.deleteFileS3('films', name, key);
    }
};
FilmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(film_entity_1.Films)),
    __param(1, (0, typeorm_1.InjectRepository)(people_entity_1.People)),
    __param(2, (0, typeorm_1.InjectRepository)(starship_entity_1.Starships)),
    __param(3, (0, typeorm_1.InjectRepository)(planet_entity_1.Planets)),
    __param(4, (0, typeorm_1.InjectRepository)(species_entity_1.Species)),
    __param(5, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicles)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        images_service_1.ImagesService])
], FilmsService);
exports.FilmsService = FilmsService;
//# sourceMappingURL=films.service.js.map