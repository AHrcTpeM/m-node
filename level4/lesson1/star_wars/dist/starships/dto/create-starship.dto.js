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
exports.CreateStarshipDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateStarshipDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: "Death Star", description: 'The name of this starship. The common name, such as "Death Star"' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "DS-1 Orbital Battle Station", description: 'The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station"' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Deep Space Mobile Battlestation", description: 'The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "starship_class", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Imperial Department of Military Research, Sienar Fleet Systems", description: 'The manufacturer of this starship. Comma separated if more than one' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1000000000000", description: 'The cost of this starship new, in galactic credits' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "cost_in_credits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "120000", description: 'The length of this starship in meters' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "length", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "342953", description: 'The number of personnel needed to run or pilot this starship' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "crew", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "843342", description: 'The number of non-essential people this starship can transport' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "passengers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "n/a", description: 'The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "max_atmosphering_speed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "4.0", description: 'The class of this starships hyperdrive' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "hyperdrive_rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "10 MGLT", description: 'The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "MGLT", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1000000000000", description: 'The maximum number of kilograms that this starship can transport' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "cargo_capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "3 years", description: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "consumables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of Film URL Resources that this starship has appeared in' }),
    __metadata("design:type", Array)
], CreateStarshipDto.prototype, "films", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/people/13/"], description: 'An array of People URL Resources that this starship has been piloted by' }),
    __metadata("design:type", Array)
], CreateStarshipDto.prototype, "pilots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/people/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], CreateStarshipDto.prototype, "url", void 0);
exports.CreateStarshipDto = CreateStarshipDto;
//# sourceMappingURL=create-starship.dto.js.map