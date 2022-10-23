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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const film_entity_1 = require("../films/entities/film.entity");
const images_service_1 = require("../images/images.service");
const people_entity_1 = require("../people/entities/people.entity");
const typeorm_2 = require("typeorm");
const create_vehicle_dto_1 = require("./dto/create-vehicle.dto");
const vehicle_entity_1 = require("./entities/vehicle.entity");
let VehiclesService = class VehiclesService {
    constructor(vehiclesRepository, filmsRepository, peopleRepository, imagesService) {
        this.vehiclesRepository = vehiclesRepository;
        this.filmsRepository = filmsRepository;
        this.peopleRepository = peopleRepository;
        this.imagesService = imagesService;
        this.propsRelations = ['films', 'pilots', 'images'];
    }
    async create(createVehiclesDto) {
        var _a;
        const resources = [this.filmsRepository, this.peopleRepository];
        let vehicle = new vehicle_entity_1.Vehicles();
        for (let key in createVehiclesDto) {
            if (key === 'images')
                continue;
            vehicle[key] = this.propsRelations.includes(key) ? [] : createVehiclesDto[key];
        }
        await this.vehiclesRepository.save(vehicle).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        for (let i = 0; i < this.propsRelations.length - 1; i++) {
            (_a = createVehiclesDto[this.propsRelations[i]]) === null || _a === void 0 ? void 0 : _a.forEach(async (elem) => {
                const person = await resources[i].findOneBy({ url: elem });
                if (person) {
                    vehicle[this.propsRelations[i]].push(person);
                }
            });
        }
        return this.vehiclesRepository.save(vehicle).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll() {
        return this.vehiclesRepository.find({
            relations: this.propsRelations,
            relationLoadStrategy: 'query'
        })
            .then(array => {
            return array.map((person) => {
                let vehicles = new create_vehicle_dto_1.CreateVehicleDto();
                for (let key in person) {
                    vehicles[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
                }
                return vehicles;
            });
        });
    }
    async findOne(name) {
        return this.vehiclesRepository.findOne({
            relations: this.propsRelations,
            relationLoadStrategy: 'query',
            where: { name }
        })
            .then(person => {
            let vehicles = new create_vehicle_dto_1.CreateVehicleDto();
            for (let key in person) {
                vehicles[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
            }
            return vehicles;
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
        const person = await this.vehiclesRepository.findOne({
            relations: ['images'],
            relationLoadStrategy: 'query',
            where: { name }
        });
        this.imagesService.deleteFiles(person.images.map((img) => img.url));
        if (person) {
            this.propsRelations.forEach((obj) => person[obj] = []);
            await this.vehiclesRepository.save(person);
        }
        return this.vehiclesRepository.delete(name)
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
        return await this.imagesService.uploadFile('vehicles', fileUploadDto, vehicle_entity_1.Vehicles);
    }
    async deleteImage(name, image) {
        return await this.imagesService.deleteImage('vehicles', name, image);
    }
    async uploadFileS3(file, fileUploadDto) {
        return await this.imagesService.uploadFileS3('vehicles', file, fileUploadDto, vehicle_entity_1.Vehicles);
    }
    async deleteFileS3(name, key) {
        return await this.imagesService.deleteFileS3('vehicles', name, key);
    }
};
VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicles)),
    __param(1, (0, typeorm_1.InjectRepository)(film_entity_1.Films)),
    __param(2, (0, typeorm_1.InjectRepository)(people_entity_1.People)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        images_service_1.ImagesService])
], VehiclesService);
exports.VehiclesService = VehiclesService;
//# sourceMappingURL=vehicles.service.js.map