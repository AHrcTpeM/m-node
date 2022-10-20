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
const film_entity_1 = require("./entities/film.entity");
const people_entity_1 = require("./../people/entities/people.entity");
const starship_entity_1 = require("./../starships/entities/starship.entity");
const planet_entity_1 = require("./../planets/entities/planet.entity");
const species_entity_1 = require("./../species/entities/species.entity");
const vehicle_entity_1 = require("./../vehicles/entities/vehicle.entity");
let FilmsService = class FilmsService {
    constructor(filmsRepository, peopleRepository, starshipsRepository, planetsRepository, speciesRepository, vehiclesRepository) {
        this.filmsRepository = filmsRepository;
        this.peopleRepository = peopleRepository;
        this.starshipsRepository = starshipsRepository;
        this.planetsRepository = planetsRepository;
        this.speciesRepository = speciesRepository;
        this.vehiclesRepository = vehiclesRepository;
    }
    async create(createFilmDto) {
        let films = new film_entity_1.Films();
        for (let key in createFilmDto) {
            films[key] = createFilmDto[key];
        }
        const resources = [{ 'characters': this.peopleRepository }, { 'starships': this.starshipsRepository },
            { 'planets': this.planetsRepository }, { 'species': this.speciesRepository },
            { 'vehicles': this.vehiclesRepository }];
        resources.forEach((obj) => films[Object.keys(obj)[0]] = []);
        await this.filmsRepository.save(films);
        resources.forEach((obj) => {
            var _a;
            (_a = createFilmDto[Object.keys(obj)[0]]) === null || _a === void 0 ? void 0 : _a.forEach(async (elem) => {
                const film = await Object.values(obj)[0].findOneBy({ url: elem });
                if (film) {
                    films[Object.keys(obj)[0]].push(film);
                }
            });
        });
        return this.filmsRepository.save(films);
    }
    async findAll() {
        return await this.filmsRepository.find({
            relations: ['characters', 'species', 'starships', 'vehicles', 'planets'],
            relationLoadStrategy: 'query',
            select: Object.assign(Object.assign({}, film_entity_1.Films), { characters: {
                    name: true,
                    url: true
                }, species: {
                    name: true,
                    url: true
                }, starships: {
                    name: true,
                    url: true
                }, vehicles: {
                    name: true,
                    url: true
                }, planets: {
                    name: true,
                    url: true
                } })
        });
    }
    findOne(title) {
        return this.filmsRepository.findOne({
            relations: ['characters', 'species', 'starships', 'vehicles', 'planets'],
            relationLoadStrategy: 'query',
            select: Object.assign(Object.assign({}, film_entity_1.Films), { characters: {
                    name: true,
                    url: true
                }, species: {
                    name: true,
                    url: true
                }, starships: {
                    name: true,
                    url: true
                }, vehicles: {
                    name: true,
                    url: true
                }, planets: {
                    name: true,
                    url: true
                } }),
            where: {
                title: title
            }
        });
    }
    async remove(title) {
        await this.filmsRepository.delete(title);
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
        typeorm_2.Repository])
], FilmsService);
exports.FilmsService = FilmsService;
//# sourceMappingURL=films.service.js.map