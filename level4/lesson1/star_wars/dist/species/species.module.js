"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeciesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const species_service_1 = require("./species.service");
const species_controller_1 = require("./species.controller");
const species_entity_1 = require("./entities/species.entity");
const planets_module_1 = require("../planets/planets.module");
const people_module_1 = require("../people/people.module");
const films_module_1 = require("../films/films.module");
const starships_module_1 = require("../starships/starships.module");
const vehicles_module_1 = require("../vehicles/vehicles.module");
const images_module_1 = require("../images/images.module");
let SpeciesModule = class SpeciesModule {
};
SpeciesModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => people_module_1.PeopleModule), (0, common_1.forwardRef)(() => films_module_1.FilmsModule), (0, common_1.forwardRef)(() => starships_module_1.StarshipsModule), (0, common_1.forwardRef)(() => planets_module_1.PlanetsModule), (0, common_1.forwardRef)(() => vehicles_module_1.VehiclesModule), (0, common_1.forwardRef)(() => images_module_1.ImagesModule), typeorm_1.TypeOrmModule.forFeature([species_entity_1.Species])],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [species_controller_1.SpeciesController],
        providers: [species_service_1.SpeciesService]
    })
], SpeciesModule);
exports.SpeciesModule = SpeciesModule;
//# sourceMappingURL=species.module.js.map