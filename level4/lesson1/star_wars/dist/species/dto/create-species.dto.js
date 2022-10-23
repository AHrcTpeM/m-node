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
exports.CreateSpeciesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSpeciesDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: "Wookie", description: 'The name of this species' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mammal", description: 'The classification of this species, such as "mammal" or "reptile"' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "classification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Sentient", description: 'The designation of this species, such as "sentient"' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2.1", description: 'The average height of this species in centimeters' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "average_height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "400", description: 'The average lifespan of this species in years' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "average_lifespan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "blue, green, yellow, brown, golden, red", description: 'A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "eye_color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "black, brown", description: 'A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "hair_colors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "gray", description: 'A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "skin_colors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Shyriiwook", description: 'The language commonly spoken by this species' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/planets/14/", description: 'The URL of a planet resource, a planet that this species originates from' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "homeworld", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/people/13/"], description: 'An array of People URL Resources that are a part of this species' }),
    __metadata("design:type", Array)
], CreateSpeciesDto.prototype, "people", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of Film URL Resources that this species has appeared in' }),
    __metadata("design:type", Array)
], CreateSpeciesDto.prototype, "films", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/species/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], CreateSpeciesDto.prototype, "url", void 0);
exports.CreateSpeciesDto = CreateSpeciesDto;
//# sourceMappingURL=create-species.dto.js.map