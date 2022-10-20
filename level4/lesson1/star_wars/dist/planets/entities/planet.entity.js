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
exports.Planets = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const film_entity_1 = require("./../../films/entities/film.entity");
const people_entity_1 = require("./../../people/entities/people.entity");
const image_entity_1 = require("../../images/entities/image.entity");
let Planets = class Planets {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)({ example: "Tatooine", description: 'The name of this planet' }),
    __metadata("design:type", String)
], Planets.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "10465", description: 'The diameter of this planet in kilometers' }),
    __metadata("design:type", String)
], Planets.prototype, "diameter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "23", description: 'The number of standard hours it takes for this planet to complete a single rotation on its axis' }),
    __metadata("design:type", String)
], Planets.prototype, "rotation_period", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "304", description: 'The number of standard days it takes for this planet to complete a single orbit of its local star' }),
    __metadata("design:type", String)
], Planets.prototype, "orbital_period", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "1", description: 'A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs' }),
    __metadata("design:type", String)
], Planets.prototype, "gravity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "120000", description: 'The average population of sentient beings inhabiting this planet' }),
    __metadata("design:type", String)
], Planets.prototype, "population", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Arid", description: 'The climate of this planet. Comma separated if diverse' }),
    __metadata("design:type", String)
], Planets.prototype, "climate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Dessert", description: 'The terrain of this planet. Comma separated if diverse' }),
    __metadata("design:type", String)
], Planets.prototype, "terrain", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "1", description: 'The percentage of the planet surface that is naturally occurring water or bodies of water' }),
    __metadata("design:type", String)
], Planets.prototype, "surface_water", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => film_entity_1.Films, (films) => films.planets),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            referencedColumnName: "url"
        },
        inverseJoinColumn: {
            referencedColumnName: "url"
        }
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of Film URL Resources that this planet has appeared in' }),
    __metadata("design:type", Array)
], Planets.prototype, "films", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => people_entity_1.People, (people) => people.planets),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            referencedColumnName: "url"
        },
        inverseJoinColumn: {
            referencedColumnName: "url"
        }
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/people/1/"], description: 'An array of People URL Resources that live on this planet' }),
    __metadata("design:type", Array)
], Planets.prototype, "residents", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true', unique: true }),
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/people/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], Planets.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Images, (images) => images.films),
    (0, swagger_1.ApiProperty)({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this planet' }),
    __metadata("design:type", Array)
], Planets.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Planets.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Planets.prototype, "edited", void 0);
Planets = __decorate([
    (0, typeorm_1.Entity)()
], Planets);
exports.Planets = Planets;
//# sourceMappingURL=planet.entity.js.map