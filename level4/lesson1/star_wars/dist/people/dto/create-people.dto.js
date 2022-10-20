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
exports.CreatePeopleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePeopleDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: "Luke Skywalker", description: 'The name of this person' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({ example: "172", description: 'The height of the person in centimeters' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({ example: "77", description: 'The mass of the person in kilograms' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "mass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "blond", description: 'The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "hair_color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "fair", description: 'The skin color of this person' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "skin_color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "blue", description: 'The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "eye_color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "19BBY", description: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "birth_year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "male", description: 'The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/planets/1/", description: 'The URL of a planet resource, a planet that this person was born on or inhabits' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "homeworld", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of film resource URLs that this person has been in' }),
    __metadata("design:type", Array)
], CreatePeopleDto.prototype, "films", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/species/2/"], description: 'An array of species resource URLs that this person belongs to' }),
    __metadata("design:type", Array)
], CreatePeopleDto.prototype, "species", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/vehicles/14/"], description: 'An array of vehicle resource URLs that this person has piloted' }),
    __metadata("design:type", Array)
], CreatePeopleDto.prototype, "vehicles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/starships/12/"], description: 'An array of starship resource URLs that this person has piloted' }),
    __metadata("design:type", Array)
], CreatePeopleDto.prototype, "starships", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/planets/1/"], description: 'An array of planet resource URLs that are in this film' }),
    __metadata("design:type", Array)
], CreatePeopleDto.prototype, "planets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/people/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], CreatePeopleDto.prototype, "url", void 0);
exports.CreatePeopleDto = CreatePeopleDto;
//# sourceMappingURL=create-people.dto.js.map