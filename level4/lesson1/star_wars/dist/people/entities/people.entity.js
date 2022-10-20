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
exports.People = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const film_entity_1 = require("./../../films/entities/film.entity");
const species_entity_1 = require("./../../species/entities/species.entity");
const vehicle_entity_1 = require("./../../vehicles/entities/vehicle.entity");
const starship_entity_1 = require("./../../starships/entities/starship.entity");
const planet_entity_1 = require("./../../planets/entities/planet.entity");
const image_entity_1 = require("../../images/entities/image.entity");
let People = class People {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)({ example: "Luke Skywalker", description: 'The name of this person' }),
    __metadata("design:type", String)
], People.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "172", description: 'The height of the person in centimeters' }),
    __metadata("design:type", String)
], People.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "77", description: 'The mass of the person in kilograms' }),
    __metadata("design:type", String)
], People.prototype, "mass", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "blond", description: 'The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair' }),
    __metadata("design:type", String)
], People.prototype, "hair_color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "fair", description: 'The skin color of this person' }),
    __metadata("design:type", String)
], People.prototype, "skin_color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "blue", description: 'The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye' }),
    __metadata("design:type", String)
], People.prototype, "eye_color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "19BBY", description: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope' }),
    __metadata("design:type", String)
], People.prototype, "birth_year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "male", description: 'The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender' }),
    __metadata("design:type", String)
], People.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/planets/1/", description: 'The URL of a planet resource, a planet that this person was born on or inhabits' }),
    __metadata("design:type", String)
], People.prototype, "homeworld", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => film_entity_1.Films, (films) => films.characters, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            referencedColumnName: "url"
        },
        inverseJoinColumn: {
            referencedColumnName: "url"
        }
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of film resource URLs that this person has been in' }),
    __metadata("design:type", Array)
], People.prototype, "films", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => species_entity_1.Species, (species) => species.people),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/species/2/"], description: 'An array of species resource URLs that this person belongs to' }),
    __metadata("design:type", Array)
], People.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => vehicle_entity_1.Vehicles, (vehicles) => vehicles.pilots),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/vehicles/14/"], description: 'An array of vehicle resource URLs that this person has piloted' }),
    __metadata("design:type", Array)
], People.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => starship_entity_1.Starships, (starships) => starships.pilots),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/starships/12/"], description: 'An array of starship resource URLs that this person has piloted' }),
    __metadata("design:type", Array)
], People.prototype, "starships", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => planet_entity_1.Planets, (planets) => planets.residents),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/planets/1/"], description: 'An array of planet resource URLs that are in this film' }),
    __metadata("design:type", Array)
], People.prototype, "planets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Images, (images) => images.people),
    (0, swagger_1.ApiProperty)({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this person' }),
    __metadata("design:type", Array)
], People.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true', unique: true }),
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/people/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], People.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], People.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], People.prototype, "edited", void 0);
People = __decorate([
    (0, typeorm_1.Entity)()
], People);
exports.People = People;
//# sourceMappingURL=people.entity.js.map