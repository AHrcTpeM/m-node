"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesModule = void 0;
const common_1 = require("@nestjs/common");
const images_service_1 = require("./images.service");
const images_controller_1 = require("./images.controller");
const typeorm_1 = require("@nestjs/typeorm");
const image_entity_1 = require("./entities/image.entity");
const films_module_1 = require("./../films/films.module");
const starships_module_1 = require("./../starships/starships.module");
const planets_module_1 = require("./../planets/planets.module");
const species_module_1 = require("./../species/species.module");
const vehicles_module_1 = require("./../vehicles/vehicles.module");
const people_module_1 = require("../people/people.module");
let ImagesModule = class ImagesModule {
};
ImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => films_module_1.FilmsModule), (0, common_1.forwardRef)(() => people_module_1.PeopleModule), (0, common_1.forwardRef)(() => starships_module_1.StarshipsModule), (0, common_1.forwardRef)(() => planets_module_1.PlanetsModule), (0, common_1.forwardRef)(() => species_module_1.SpeciesModule), (0, common_1.forwardRef)(() => vehicles_module_1.VehiclesModule),
            typeorm_1.TypeOrmModule.forFeature([image_entity_1.Images])],
        exports: [typeorm_1.TypeOrmModule, images_service_1.ImagesService],
        controllers: [images_controller_1.ImagesController],
        providers: [images_service_1.ImagesService]
    })
], ImagesModule);
exports.ImagesModule = ImagesModule;
//# sourceMappingURL=images.module.js.map