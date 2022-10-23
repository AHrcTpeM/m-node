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
exports.Species = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const people_entity_1 = require("./../../people/entities/people.entity");
const film_entity_1 = require("./../../films/entities/film.entity");
const image_entity_1 = require("../../images/entities/image.entity");
let Species = class Species {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)({ example: "Wookie", description: 'The name of this species' }),
    __metadata("design:type", String)
], Species.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Mammal", description: 'The classification of this species, such as "mammal" or "reptile"' }),
    __metadata("design:type", String)
], Species.prototype, "classification", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Sentient", description: 'The designation of this species, such as "sentient"' }),
    __metadata("design:type", String)
], Species.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "2.1", description: 'The average height of this species in centimeters' }),
    __metadata("design:type", String)
], Species.prototype, "average_height", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "400", description: 'The average lifespan of this species in years' }),
    __metadata("design:type", String)
], Species.prototype, "average_lifespan", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'n/a' }),
    (0, swagger_1.ApiProperty)({ example: "blue, green, yellow, brown, golden, red", description: 'A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes' }),
    __metadata("design:type", String)
], Species.prototype, "eye_color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "black, brown", description: 'A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair' }),
    __metadata("design:type", String)
], Species.prototype, "hair_colors", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "gray", description: 'A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin' }),
    __metadata("design:type", String)
], Species.prototype, "skin_colors", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "Shyriiwook", description: 'The language commonly spoken by this species' }),
    __metadata("design:type", String)
], Species.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/planets/14/", description: 'The URL of a planet resource, a planet that this species originates from' }),
    __metadata("design:type", String)
], Species.prototype, "homeworld", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => people_entity_1.People, (people) => people.species),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            referencedColumnName: "url"
        },
        inverseJoinColumn: {
            referencedColumnName: "url"
        }
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/people/13/"], description: 'An array of People URL Resources that are a part of this species' }),
    __metadata("design:type", Array)
], Species.prototype, "people", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => film_entity_1.Films, (films) => films.species),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            referencedColumnName: "url"
        },
        inverseJoinColumn: {
            referencedColumnName: "url"
        }
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of Film URL Resources that this species has appeared in' }),
    __metadata("design:type", Array)
], Species.prototype, "films", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true', unique: true }),
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/species/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], Species.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Images, (images) => images.species, {
        eager: false
    }),
    (0, swagger_1.ApiProperty)({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this planet' }),
    __metadata("design:type", Array)
], Species.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Species.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Species.prototype, "edited", void 0);
Species = __decorate([
    (0, typeorm_1.Entity)()
], Species);
exports.Species = Species;
//# sourceMappingURL=species.entity.js.map