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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fs_1 = require("fs");
const aws_sdk_1 = require("aws-sdk");
const film_entity_1 = require("../films/entities/film.entity");
const people_entity_1 = require("../people/entities/people.entity");
const planet_entity_1 = require("../planets/entities/planet.entity");
const species_entity_1 = require("../species/entities/species.entity");
const starship_entity_1 = require("../starships/entities/starship.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const typeorm_2 = require("typeorm");
const image_entity_1 = require("./entities/image.entity");
let ImagesService = class ImagesService {
    constructor(peopleRepository, filmsRepository, starshipsRepository, planetsRepository, speciesRepository, vehiclesRepository, imagesRepository) {
        this.peopleRepository = peopleRepository;
        this.filmsRepository = filmsRepository;
        this.starshipsRepository = starshipsRepository;
        this.planetsRepository = planetsRepository;
        this.speciesRepository = speciesRepository;
        this.vehiclesRepository = vehiclesRepository;
        this.imagesRepository = imagesRepository;
        this.resources = {
            'people': this.peopleRepository,
            'films': this.filmsRepository,
            'starships': this.starshipsRepository,
            'planets': this.planetsRepository,
            'species': this.speciesRepository,
            'vehicles': this.vehiclesRepository
        };
    }
    async uploadFile(entity, fileUploadDto, target) {
        const prop = entity === 'films' ? 'title' : 'name';
        const people = await this.resources[entity].findOneBy({ [prop]: fileUploadDto.name })
            .then((result) => {
            if (result) {
                return result;
            }
            else {
                throw new common_1.HttpException("Person not found", common_1.HttpStatus.NOT_FOUND);
            }
        });
        for (let i = 0; i < fileUploadDto.images.length; i++) {
            let images = new image_entity_1.Images();
            images.url = fileUploadDto.images[i];
            images.people = people;
            await this.imagesRepository.save(images);
        }
        return await this.resources[entity].findOne({
            relations: ['images'],
            relationLoadStrategy: 'query',
            where: { [prop]: fileUploadDto.name }
        });
    }
    async deleteImage(entity, name, image) {
        const prop = entity === 'films' ? 'title' : 'name';
        const user = await this.resources[entity].findOne({
            relations: ['images'],
            relationLoadStrategy: 'query',
            where: { [prop]: name }
        })
            .then(async (result) => {
            if (result) {
                return result;
            }
            else {
                throw new common_1.HttpException("Person not found", common_1.HttpStatus.NOT_FOUND);
            }
        });
        if (image && !user.images.map((img) => img.url).includes(image)) {
            return { name, deleted: 'No image found for this resource' };
        }
        const deletedImage = image ? [image] : user.images.map((img) => img.url);
        let error = this.deleteFiles(deletedImage);
        user.images = image ?
            user.images.filter(elem => elem.url !== image) :
            user.images.filter(elem => elem.url.includes('https:'));
        await this.resources[entity].save(user);
        return { name, deleted: error };
    }
    deleteFiles(arrayFiles) {
        let error = 'success';
        arrayFiles.forEach(image => {
            image = image.replace('http://localhost:3000/', '');
            (0, fs_1.unlink)(`files/${image}`, (err) => {
                if (err) {
                    console.error(err.message);
                    error = err.message;
                }
                else {
                    console.log(`${image}-------Изображение удалено-------`);
                }
            });
        });
        return error;
    }
    async uploadFileS3(entity, file, fileUploadDto, target) {
        const s3 = new aws_sdk_1.S3();
        const ext = (file.originalname || "").replace(/^[^.]+/g, "");
        const name = Math.random().toString(36).replace("0.", "img-");
        file.originalname = `${name}${ext}`;
        const s3file = await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            ContentType: `image/${ext.slice(1)}`,
            Body: file.buffer,
            Key: file.originalname
        }).promise();
        fileUploadDto.images = [s3file.Location];
        return this.uploadFile(entity, fileUploadDto, target);
    }
    async deleteFileS3(entity, name, key) {
        const result = await this.deleteImage(entity, name, key);
        key = key.replace(`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`, '');
        const s3 = new aws_sdk_1.S3();
        const y = await s3.getObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        }).promise().catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
        });
        const x = await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        }).promise();
        return result;
    }
};
ImagesService = __decorate([
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
        typeorm_2.Repository])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map