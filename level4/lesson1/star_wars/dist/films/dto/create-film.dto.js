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
exports.CreateFilmDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFilmDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: "A New Hope", description: 'The title of this film' }),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({ example: 4, description: 'The episode number of this film' }),
    __metadata("design:type", Number)
], CreateFilmDto.prototype, "episode_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "It is a period of civil war.\n\nRebel spaceships, striking\n\nfrom a hidden base, have won\n\ntheir first victory against\n\nthe evil Galactic Empire.", description: 'The opening paragraphs at the beginning of this film' }),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "opening_crawl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "George Lucas", description: 'The name of the director of this film' }),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "director", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Gary Kurtz, Rick McCallum", description: 'The name(s) of the producer(s) of this film. Comma separated' }),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "producer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1977-05-25", description: 'The ISO 8601 date format of film release at original creator country' }),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "release_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/species/2/"], description: 'An array of species resource URLs that are in this film' }),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "species", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/starships/12/"], description: 'An array of starship resource URLs that are in this film' }),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "starships", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/vehicles/14/"], description: 'An array of vehicle resource URLs that are in this film' }),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "vehicles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/people/1/"], description: 'An array of people resource URLs that are in this film' }),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "characters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["https://localhost:3000/api/planets/1/"], description: 'An array of planet resource URLs that are in this film' }),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "planets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://localhost:3000/api/films/1/", description: 'the hypermedia URL of this resource' }),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "url", void 0);
exports.CreateFilmDto = CreateFilmDto;
//# sourceMappingURL=create-film.dto.js.map