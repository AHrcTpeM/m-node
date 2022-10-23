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
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs_1 = require("fs");
const path_1 = require("path");
const create_people_dto_1 = require("./dto/create-people.dto");
const people_entity_1 = require("./entities/people.entity");
const film_entity_1 = require("./../films/entities/film.entity");
const starship_entity_1 = require("./../starships/entities/starship.entity");
const planet_entity_1 = require("./../planets/entities/planet.entity");
const species_entity_1 = require("./../species/entities/species.entity");
const vehicle_entity_1 = require("./../vehicles/entities/vehicle.entity");
const image_entity_1 = require("../images/entities/image.entity");
const images_service_1 = require("../images/images.service");
let PeopleService = class PeopleService {
    constructor(peopleRepository, filmsRepository, starshipsRepository, planetsRepository, speciesRepository, vehiclesRepository, imagesRepository, imagesService) {
        this.peopleRepository = peopleRepository;
        this.filmsRepository = filmsRepository;
        this.starshipsRepository = starshipsRepository;
        this.planetsRepository = planetsRepository;
        this.speciesRepository = speciesRepository;
        this.vehiclesRepository = vehiclesRepository;
        this.imagesRepository = imagesRepository;
        this.imagesService = imagesService;
        this.propsRelations = ['films', 'species', 'starships', 'vehicles', 'planets', 'images'];
    }
    async create(createPeopleDto) {
        var _a;
        const resources = [this.filmsRepository, this.speciesRepository, this.starshipsRepository, this.vehiclesRepository, this.planetsRepository];
        let people = new people_entity_1.People();
        for (let key in createPeopleDto) {
            if (key === 'images')
                continue;
            people[key] = this.propsRelations.includes(key) ? [] : createPeopleDto[key];
        }
        await this.peopleRepository.save(people).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        for (let i = 0; i < this.propsRelations.length - 1; i++) {
            (_a = createPeopleDto[this.propsRelations[i]]) === null || _a === void 0 ? void 0 : _a.forEach(async (elem) => {
                const person = await resources[i].findOneBy({ url: elem });
                if (person) {
                    people[this.propsRelations[i]].push(person);
                }
            });
        }
        return this.peopleRepository.save(people).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll(page) {
        const numPage = page < 1 ? 1 : page;
        const count = await this.peopleRepository.count();
        const topPage = Math.floor(count / 10);
        const peoplePag = {
            count,
            next: numPage > topPage ? null : `http://localhost:3000/people/?page=${numPage + 1}`,
            previous: numPage < 2 ? null : `http://localhost:3000/people/?page=${numPage - 1}`,
            results: await this.peopleRepository.find({
                skip: (numPage - 1) * 10,
                take: 10,
                relations: this.propsRelations,
                relationLoadStrategy: 'query',
            })
                .then(array => {
                return array.map((person) => {
                    let people = new create_people_dto_1.CreatePeopleDto();
                    for (let key in person) {
                        people[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
                    }
                    return people;
                });
            })
        };
        return peoplePag;
    }
    findOne(name) {
        return this.peopleRepository.findOne({
            relations: this.propsRelations,
            relationLoadStrategy: 'query',
            where: { name }
        })
            .then(person => {
            let people = new create_people_dto_1.CreatePeopleDto();
            for (let key in person) {
                people[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
            }
            return people;
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
        const person = await this.peopleRepository.findOne({
            relations: ['images'],
            relationLoadStrategy: 'query',
            where: { name }
        });
        this.imagesService.deleteFiles(person.images.map((img) => img.url));
        if (person) {
            this.propsRelations.forEach((obj) => person[obj] = []);
            await this.peopleRepository.save(person);
        }
        return this.peopleRepository.delete(name)
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
        return await this.imagesService.uploadFile('people', fileUploadDto, people_entity_1.People);
    }
    async deleteImage(name, image) {
        return await this.imagesService.deleteImage('people', name, image);
    }
    streamImage(image) {
        const file = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), `files/${image}`));
        return new common_1.StreamableFile(file);
    }
    async uploadFileS3(file, fileUploadDto) {
        return await this.imagesService.uploadFileS3('people', file, fileUploadDto, people_entity_1.People);
    }
    async deleteFileS3(name, key) {
        return await this.imagesService.deleteFileS3('people', name, key);
    }
};
PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(people_entity_1.People)),
    __param(1, (0, typeorm_1.InjectRepository)(film_entity_1.Films)),
    __param(2, (0, typeorm_1.InjectRepository)(starship_entity_1.Starships)),
    __param(3, (0, typeorm_1.InjectRepository)(planet_entity_1.Planets)),
    __param(4, (0, typeorm_1.InjectRepository)(species_entity_1.Species)),
    __param(5, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicles)),
    __param(6, (0, typeorm_1.InjectRepository)(image_entity_1.Images)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        images_service_1.ImagesService])
], PeopleService);
exports.PeopleService = PeopleService;
//# sourceMappingURL=people.service.js.map