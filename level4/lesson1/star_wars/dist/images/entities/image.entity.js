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
exports.Images = void 0;
const swagger_1 = require("@nestjs/swagger");
const people_entity_1 = require("../../people/entities/people.entity");
const typeorm_1 = require("typeorm");
const film_entity_1 = require("../../films/entities/film.entity");
const species_entity_1 = require("../../species/entities/species.entity");
const starship_entity_1 = require("../../starships/entities/starship.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
const planet_entity_1 = require("../../planets/entities/planet.entity");
let Images = class Images {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: "1", description: 'ID this image' }),
    __metadata("design:type", Number)
], Images.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)({ example: "img-ifwbk0fvdxq.jpeg", description: 'The name of this image' }),
    __metadata("design:type", String)
], Images.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => people_entity_1.People, (people) => people.images, {
        orphanedRowAction: "delete"
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/people/1/"], description: 'People resource URLs that are in this image' }),
    __metadata("design:type", people_entity_1.People)
], Images.prototype, "people", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => film_entity_1.Films, (films) => films.images, {
        orphanedRowAction: "delete"
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/films/1/"], description: 'Film resource URLs that are in this image' }),
    __metadata("design:type", film_entity_1.Films)
], Images.prototype, "films", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => species_entity_1.Species, (species) => species.images, {
        orphanedRowAction: "delete"
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/species/1/"], description: 'Species resource URLs that are in this image' }),
    __metadata("design:type", species_entity_1.Species)
], Images.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => starship_entity_1.Starships, (starships) => starships.images, {
        orphanedRowAction: "delete"
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/starships/1/"], description: 'Starships resource URLs that are in this image' }),
    __metadata("design:type", starship_entity_1.Starships)
], Images.prototype, "starships", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicles, (vehicles) => vehicles.images, {
        orphanedRowAction: "delete"
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/vehicles/1/"], description: 'Vehicles resource URLs that are in this image' }),
    __metadata("design:type", vehicle_entity_1.Vehicles)
], Images.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => planet_entity_1.Planets, (planets) => planets.images, {
        orphanedRowAction: "delete"
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/planets/1/"], description: 'Planets resource URLs that are in this image' }),
    __metadata("design:type", planet_entity_1.Planets)
], Images.prototype, "planets", void 0);
Images = __decorate([
    (0, typeorm_1.Entity)()
], Images);
exports.Images = Images;
//# sourceMappingURL=image.entity.js.map