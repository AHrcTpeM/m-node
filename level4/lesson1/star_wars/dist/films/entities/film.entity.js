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
exports.Films = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const people_entity_1 = require("./../../people/entities/people.entity");
const planet_entity_1 = require("./../../planets/entities/planet.entity");
const vehicle_entity_1 = require("./../../vehicles/entities/vehicle.entity");
const starship_entity_1 = require("./../../starships/entities/starship.entity");
const species_entity_1 = require("./../../species/entities/species.entity");
const image_entity_1 = require("../../images/entities/image.entity");
let Films = class Films {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)({ example: "A New Hope", description: 'The title of this film' }),
    __metadata("design:type", String)
], Films.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 4, description: 'The episode number of this film' }),
    __metadata("design:type", Number)
], Films.prototype, "episode_id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    (0, swagger_1.ApiProperty)({ example: "It is a period of civil war.\n\nRebel spaceships, striking\n\nfrom a hidden base, have won\n\ntheir first victory against\n\nthe evil Galactic Empire.", description: 'The opening paragraphs at the beginning of this film' }),
    __metadata("design:type", String)
], Films.prototype, "opening_crawl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "George Lucas", description: 'The name of the director of this film' }),
    __metadata("design:type", String)
], Films.prototype, "director", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Gary Kurtz, Rick McCallum", description: 'The name(s) of the producer(s) of this film. Comma separated' }),
    __metadata("design:type", String)
], Films.prototype, "producer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "1977-05-25", description: 'The ISO 8601 date format of film release at original creator country' }),
    __metadata("design:type", Date)
], Films.prototype, "release_date", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => species_entity_1.Species, (species) => species.films),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/species/2/"], description: 'An array of species resource URLs that are in this film' }),
    __metadata("design:type", Array)
], Films.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => starship_entity_1.Starships, (starships) => starships.films),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/starships/12/"], description: 'An array of starship resource URLs that are in this film' }),
    __metadata("design:type", Array)
], Films.prototype, "starships", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => vehicle_entity_1.Vehicles, (vehicles) => vehicles.films),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/vehicles/14/"], description: 'An array of vehicle resource URLs that are in this film' }),
    __metadata("design:type", Array)
], Films.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => people_entity_1.People, (people) => people.films),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/people/1/"], description: 'An array of people resource URLs that are in this film' }),
    __metadata("design:type", Array)
], Films.prototype, "characters", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => planet_entity_1.Planets, (planets) => planets.films),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/planets/1/"], description: 'An array of planet resource URLs that are in this film' }),
    __metadata("design:type", Array)
], Films.prototype, "planets", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true', unique: true }),
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/films/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], Films.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Images, (images) => images.films),
    (0, swagger_1.ApiProperty)({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this film' }),
    __metadata("design:type", Array)
], Films.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Films.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Films.prototype, "edited", void 0);
Films = __decorate([
    (0, typeorm_1.Entity)()
], Films);
exports.Films = Films;
//# sourceMappingURL=film.entity.js.map