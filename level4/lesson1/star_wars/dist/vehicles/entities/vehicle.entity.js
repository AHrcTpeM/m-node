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
exports.Vehicles = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const film_entity_1 = require("./../../films/entities/film.entity");
const people_entity_1 = require("./../../people/entities/people.entity");
const image_entity_1 = require("../../images/entities/image.entity");
let Vehicles = class Vehicles {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)({ example: "Sand Crawler", description: 'The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike"' }),
    __metadata("design:type", String)
], Vehicles.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Digger Crawler", description: 'The model or official name of this vehicle. Such as "All-Terrain Attack Transport"' }),
    __metadata("design:type", String)
], Vehicles.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "wheeled", description: 'The class of this vehicle, such as "Wheeled" or "Repulsorcraft"' }),
    __metadata("design:type", String)
], Vehicles.prototype, "vehicle_class", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Corellia Mining Corporation", description: 'The manufacturer of this vehicle. Comma separated if more than one' }),
    __metadata("design:type", String)
], Vehicles.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "36.8", description: 'The length of this vehicle in meters' }),
    __metadata("design:type", String)
], Vehicles.prototype, "length", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "150000", description: 'The cost of this vehicle new, in Galactic Credits' }),
    __metadata("design:type", String)
], Vehicles.prototype, "cost_in_credits", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "46", description: 'The number of personnel needed to run or pilot this vehicle' }),
    __metadata("design:type", String)
], Vehicles.prototype, "crew", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "30", description: 'The number of non-essential people this vehicle can transport' }),
    __metadata("design:type", String)
], Vehicles.prototype, "passengers", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "30", description: 'The maximum speed of this vehicle in the atmosphere' }),
    __metadata("design:type", String)
], Vehicles.prototype, "max_atmosphering_speed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "50000", description: 'The maximum number of kilograms that this vehicle can transport' }),
    __metadata("design:type", String)
], Vehicles.prototype, "cargo_capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true' }),
    (0, swagger_1.ApiProperty)({ example: "2 months", description: 'The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply' }),
    __metadata("design:type", String)
], Vehicles.prototype, "consumables", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => film_entity_1.Films, (films) => films.vehicles),
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
], Vehicles.prototype, "films", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => people_entity_1.People, (people) => people.vehicles, {
        eager: true
    }),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            referencedColumnName: "url"
        },
        inverseJoinColumn: {
            referencedColumnName: "url"
        }
    }),
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/people/2/"], description: 'An array of People URL Resources that this vehicle has been piloted by' }),
    __metadata("design:type", Array)
], Vehicles.prototype, "pilots", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'true', unique: true }),
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/people/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], Vehicles.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Images, (images) => images.films),
    (0, swagger_1.ApiProperty)({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this planet' }),
    __metadata("design:type", Array)
], Vehicles.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vehicles.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Vehicles.prototype, "edited", void 0);
Vehicles = __decorate([
    (0, typeorm_1.Entity)()
], Vehicles);
exports.Vehicles = Vehicles;
//# sourceMappingURL=vehicle.entity.js.map