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
exports.StarshipsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const starships_service_1 = require("./starships.service");
const create_starship_dto_1 = require("./dto/create-starship.dto");
const starship_entity_1 = require("./entities/starship.entity");
const platform_express_1 = require("@nestjs/platform-express");
const options_1 = require("../common/options");
const create_image_dto_1 = require("../images/dto/create-image.dto");
const validation_pipe_1 = require("../people/interceptor/validation.pipe");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles/roles.guard");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const role_enum_1 = require("../auth/roles/role.enum");
let StarshipsController = class StarshipsController {
    constructor(starshipsService) {
        this.starshipsService = starshipsService;
    }
    create(createStarshipDto) {
        return this.starshipsService.create(createStarshipDto);
    }
    findAll() {
        return this.starshipsService.findAll();
    }
    findOne(name) {
        return this.starshipsService.findOne(name);
    }
    remove(name) {
        return this.starshipsService.remove(name);
    }
    uploadFile(files, updateUserDto) {
        updateUserDto.images = files.map(elem => `http://${process.env.HOST}:${process.env.PORT}/` + elem.filename);
        return this.starshipsService.uploadFile(updateUserDto);
    }
    deleteImage(name, image) {
        return this.starshipsService.deleteImage(name, image);
    }
    uploadFileS3(file, fileUploadDto) {
        return this.starshipsService.uploadFileS3(file, fileUploadDto);
    }
    deleteFileS3(name, image) {
        return this.starshipsService.deleteFileS3(name, image);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBody)({ type: create_starship_dto_1.CreateStarshipDto }),
    (0, swagger_1.ApiOperation)({ summary: 'Create starship or update person by name' }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_starship_dto_1.CreateStarshipDto]),
    __metadata("design:returntype", Promise)
], StarshipsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find all' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StarshipsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name'),
    (0, swagger_1.ApiParam)({ name: "name", example: "A-wing", description: 'The name of this starship' }),
    (0, swagger_1.ApiOperation)({ summary: 'Find one' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found record',
        type: starship_entity_1.Starships,
    }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StarshipsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':name'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Remove one starship' }),
    (0, swagger_1.ApiParam)({ name: "name", example: "A-wing", description: 'The name of this starship' }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StarshipsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('file/upload'),
    (0, swagger_1.ApiOperation)({ summary: 'File upload in local storage' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, options_1.optionsDiskStorage)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Image of starships',
        type: create_image_dto_1.FilesUploadDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array,
        create_image_dto_1.FilesUploadDto]),
    __metadata("design:returntype", Promise)
], StarshipsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)('file/delete/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleting a image of the selected starship by name' }),
    (0, swagger_1.ApiParam)({ name: "name", example: "A-wing", description: 'The name of this starship' }),
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
], StarshipsController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Post)('file/upload-s3'),
    (0, swagger_1.ApiOperation)({ summary: 'File upload in S3' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('files', options_1.optionsMemoryStorage)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Image of starship',
        type: create_image_dto_1.FileUploadDto,
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_image_dto_1.FileUploadDto]),
    __metadata("design:returntype", void 0)
], StarshipsController.prototype, "uploadFileS3", null);
__decorate([
    (0, common_1.Delete)('file/delete-s3/:name'),
    (0, swagger_1.ApiParam)({ name: "name", example: "A-wing", description: 'The name of this starship' }),
    (0, swagger_1.ApiOperation)({ summary: 'Deleting from storage S3 a image of the selected starship by name' }),
    (0, swagger_1.ApiQuery)({
        name: 'image',
        description: "Full url address: https://mnodebucket.s3.eu-central-1.amazonaws.com/img-c3ask0z2yub.jpeg"
    }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Query)('image', new validation_pipe_1.ValidationPipeMy('s3'), new common_1.DefaultValuePipe(''))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StarshipsController.prototype, "deleteFileS3", null);
StarshipsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('starships'),
    (0, common_1.Controller)('starships'),
    __metadata("design:paramtypes", [starships_service_1.StarshipsService])
], StarshipsController);
exports.StarshipsController = StarshipsController;
//# sourceMappingURL=starships.controller.js.map