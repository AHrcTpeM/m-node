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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanetsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const planets_service_1 = require("./planets.service");
const create_planet_dto_1 = require("./dto/create-planet.dto");
const planet_entity_1 = require("./entities/planet.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const options_1 = require("../common/options");
const create_image_dto_1 = require("../images/dto/create-image.dto");
const validation_pipe_1 = require("../people/interceptor/validation.pipe");
const roles_guard_1 = require("../auth/roles/roles.guard");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const role_enum_1 = require("../auth/roles/role.enum");
let PlanetsController = class PlanetsController {
    constructor(planetsService) {
        this.planetsService = planetsService;
    }
    create(createPlanetDto) {
        return this.planetsService.create(createPlanetDto);
    }
    findAll() {
        return this.planetsService.findAll();
    }
    findOne(name) {
        return this.planetsService.findOne(name);
    }
    remove(name) {
        return this.planetsService.remove(name);
    }
    uploadFile(files, updateUserDto) {
        updateUserDto.images = files.map(elem => `http://${process.env.HOST}:${process.env.PORT}/` + elem.filename);
        return this.planetsService.uploadFile(updateUserDto);
    }
    deleteImage(name, image) {
        return this.planetsService.deleteImage(name, image);
    }
    uploadFileS3(file, fileUploadDto) {
        return this.planetsService.uploadFileS3(file, fileUploadDto);
    }
    deleteFileS3(name, image) {
        return this.planetsService.deleteFileS3(name, image);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBody)({ type: create_planet_dto_1.CreatePlanetDto }),
    (0, swagger_1.ApiOperation)({ summary: 'Create planet or update person by name' }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_planet_dto_1.CreatePlanetDto]),
    __metadata("design:returntype", Promise)
], PlanetsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find all' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name'),
    (0, swagger_1.ApiParam)({ name: "name", example: "Alderaan", description: 'The name of this planet' }),
    (0, swagger_1.ApiOperation)({ summary: 'Find one' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found record',
        type: planet_entity_1.Planets,
    }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':name'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Remove one planet' }),
    (0, swagger_1.ApiParam)({ name: "name", example: "Alderaan", description: 'The name of this planet' }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanetsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('file/upload'),
    (0, swagger_1.ApiOperation)({ summary: 'File upload in local storage' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, options_1.optionsDiskStorage)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Image of planets',
        type: create_image_dto_1.FilesUploadDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array,
        create_image_dto_1.FilesUploadDto]),
    __metadata("design:returntype", Promise)
], PlanetsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)('file/delete/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleting a image of the selected person by name' }),
    (0, swagger_1.ApiParam)({ name: "name", example: "Alderaan", description: 'The name of this planet' }),
    (0, swagger_1.ApiQuery)({
        name: 'image',
        description: "Optional parameter, without it, all the images will be deleted (full url address: http://localhost:3000/img-etg7x7dbi3.jpeg)",
        required: false
    }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Query)('image', new common_1.DefaultValuePipe(''), new validation_pipe_1.ValidationPipeMy('local'))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PlanetsController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Post)('file/upload-s3'),
    (0, swagger_1.ApiOperation)({ summary: 'File upload in S3' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('files', options_1.optionsMemoryStorage)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Image of planet',
        type: create_image_dto_1.FileUploadDto,
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_image_dto_1.FileUploadDto]),
    __metadata("design:returntype", void 0)
], PlanetsController.prototype, "uploadFileS3", null);
__decorate([
    (0, common_1.Delete)('file/delete-s3/:name'),
    (0, swagger_1.ApiParam)({ name: "name", example: "Alderaan", description: 'The name of this person' }),
    (0, swagger_1.ApiOperation)({ summary: 'Deleting from storage S3 a image of the selected planet by name' }),
    (0, swagger_1.ApiQuery)({
        name: 'image',
        description: "Full url address: https://mnodebucket.s3.eu-central-1.amazonaws.com/img-c3ask0z2yub.jpeg"
    }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Query)('image', new validation_pipe_1.ValidationPipeMy('s3'), new common_1.DefaultValuePipe(''))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlanetsController.prototype, "deleteFileS3", null);
PlanetsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('planets'),
    (0, common_1.Controller)('planets'),
    __metadata("design:paramtypes", [planets_service_1.PlanetsService])
], PlanetsController);
exports.PlanetsController = PlanetsController;
//# sourceMappingURL=planets.controller.js.map