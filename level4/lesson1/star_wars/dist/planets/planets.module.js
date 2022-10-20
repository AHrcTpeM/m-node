"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanetsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const planets_service_1 = require("./planets.service");
const planets_controller_1 = require("./planets.controller");
const planet_entity_1 = require("./entities/planet.entity");
let PlanetsModule = class PlanetsModule {
};
PlanetsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([planet_entity_1.Planets])],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [planets_controller_1.PlanetsController],
        providers: [planets_service_1.PlanetsService]
    })
], PlanetsModule);
exports.PlanetsModule = PlanetsModule;
//# sourceMappingURL=planets.module.js.map