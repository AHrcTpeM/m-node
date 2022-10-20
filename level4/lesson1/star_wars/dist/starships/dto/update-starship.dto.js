"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStarshipDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_starship_dto_1 = require("./create-starship.dto");
class UpdateStarshipDto extends (0, swagger_1.PartialType)(create_starship_dto_1.CreateStarshipDto) {
}
exports.UpdateStarshipDto = UpdateStarshipDto;
//# sourceMappingURL=update-starship.dto.js.map