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
exports.Starships = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const film_entity_1 = require("./../../films/entities/film.entity");
const people_entity_1 = require("./../../people/entities/people.entity");
const image_entity_1 = require("../../images/entities/image.entity");
let Starships = class Starships {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)({ example: "Death Star", description: 'The name of this starship. The common name, such as "Death Star"' }),
    __metadata("design:type", String)
], Starships.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "DS-1 Orbital Battle Station", description: 'The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station"' }),
    __metadata("design:type", String)
], Starships.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Deep Space Mobile Battlestation", description: 'The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"' }),
    __metadata("design:type", String)
], Starships.prototype, "starship_class", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Imperial Department of Military Research, Sienar Fleet Systems", description: 'The manufacturer of this starship. Comma separated if more than one' }),
    __metadata("design:type", String)
], Starships.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "1000000000000", description: 'The cost of this starship new, in galactic credits' }),
    __metadata("design:type", String)
], Starships.prototype, "cost_in_credits", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "120000", description: 'The length of this starship in meters' }),
    __metadata("design:type", String)
], Starships.prototype, "length", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "342953", description: 'The number of personnel needed to run or pilot this starship' }),
    __metadata("design:type", String)
], Starships.prototype, "crew", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "843342", description: 'The number of non-essential people this starship can transport' }),
    __metadata("design:type", String)
], Starships.prototype, "passengers", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "n/a", description: 'The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight' }),
    __metadata("design:type", String)
], Starships.prototype, "max_atmosphering_speed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "4.0", description: 'The class of this starships hyperdrive' }),
    __metadata("design:type", String)
], Starships.prototype, "hyperdrive_rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "10 MGLT", description: 'The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth' }),
    __metadata("design:type", String)
], Starships.prototype, "MGLT", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "1000000000000", description: 'The maximum number of kilograms that this starship can transport' }),
    __metadata("design:type", String)
], Starships.prototype, "cargo_capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "3 years", description: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply' }),
    __metadata("design:type", String)
], Starships.prototype, "consumables", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => film_entity_1.Films, (films) => films.starships),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            referencedColumnName: "url"
        },
        inverseJoinColumn: {
            referencedColumnName: "url"
        }
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of Film URL Resources that this starship has appeared in' }),
    __metadata("design:type", Array)
], Starships.prototype, "films", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => people_entity_1.People, (people) => people.starships),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            referencedColumnName: "url"
        },
        inverseJoinColumn: {
            referencedColumnName: "url"
        }
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/people/13/"], description: 'An array of People URL Resources that this starship has been piloted by' }),
    __metadata("design:type", Array)
], Starships.prototype, "pilots", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true', unique: true }),
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/starships/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], Starships.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Images, (images) => images.starships, {
        eager: false
    }),
    (0, swagger_1.ApiProperty)({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this planet' }),
    __metadata("design:type", Array)
], Starships.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Starships.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Starships.prototype, "edited", void 0);
Starships = __decorate([
    (0, typeorm_1.Entity)()
], Starships);
exports.Starships = Starships;
//# sourceMappingURL=starship.entity.js.map