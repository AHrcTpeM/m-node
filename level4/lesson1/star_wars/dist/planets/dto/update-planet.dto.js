"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlanetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_planet_dto_1 = require("./create-planet.dto");
class UpdatePlanetDto extends (0, swagger_1.PartialType)(create_planet_dto_1.CreatePlanetDto) {
}
exports.UpdatePlanetDto = UpdatePlanetDto;
//# sourceMappingURL=update-planet.dto.js.map