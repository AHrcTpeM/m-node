import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query, DefaultValuePipe, UploadedFile, UseGuards, ValidationPipe, ClassSerializerInterceptor, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiConsumes, ApiParam, ApiExtraModels, getSchemaPath, OmitType } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { optionsDiskStorage, optionsMemoryStorage } from '../common/options';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
import { ValidationPipeMy } from '../people/interceptor/validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('species')
@Controller('species')
@ApiExtraModels(Species) 
@UseInterceptors(ClassSerializerInterceptor)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: CreateSpeciesDto })
  @ApiOperation({ summary: 'Create species' })
  @ApiResponse({ status: 201, description: 'OK', schema: {$ref: getSchemaPath(Species)}})
  create(@Body(new ValidationPipe()) createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all' })
  @ApiResponse({status: 200, type: Species})
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Species>> {
    return this.speciesService.findAll({ page, limit });
  }

  @Get(':name')
  @ApiParam({ name: "name", example: "Aleena", description: 'The name of this species' })
  @ApiOperation({ summary: 'Find one by name' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Species,
  })
  findOne(@Param('name') name: string): Promise<CreateSpeciesDto> {
    return this.speciesService.findOne(name);
  }
    
  @Put()
  @Roles(Role.Admin)
  @ApiBody({ type: UpdateSpeciesDto })
  @ApiResponse({ status: 200, schema: {$ref: getSchemaPath(Species)}})
  @ApiOperation({ summary: 'Update species' })
  async update(@Body() updateSpeciesDto: UpdateSpeciesDto): Promise<Species> {
    return this.speciesService.update(updateSpeciesDto);
  }

  @Delete(':name')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Remove one species by name' })
  @ApiParam({ name: "name", example: "Aleena", description: 'The name of this species' })    
  remove(@Param('name') name: string): Promise<{ name: string; deleted: string; }> {
    return this.speciesService.remove(name);
  }

  @Post('file/upload')
  @ApiOperation({ summary: 'File upload in local storage' })
  @UseInterceptors(FilesInterceptor('files', 10, optionsDiskStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of species',
    type: FilesUploadDto,
  })
  @ApiResponse({status: 201, type: OmitType(Species, ["people", "films"])})
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>,
  @Body() updateUserDto: FilesUploadDto): Promise<Species> {
    updateUserDto.images = files.map(elem => `http://${process.env.HOST}:${process.env.PORT}/` + elem.filename);
    return this.speciesService.uploadFile(updateUserDto);
  }

  @Delete('file/delete/:name')
  @ApiOperation({ summary: 'Deleting a image of the selected species by name' })
  @ApiParam({ name: "name", example: "Aleena", description: 'The name of this species' })    
  @ApiQuery({
    name: 'image',
    description: "Optional parameter, without it, all the images will be deleted (full url address: http://localhost:3000/img-etg7x7dbi3.jpeg)",
    required: false
  })
  deleteImage(@Param('name') name: string, @Query('image', new DefaultValuePipe(''), new ValidationPipeMy('local')) image: string): Promise<{ name: string; deleted: string; }> {
    return this.speciesService.deleteImage(name, image);
  }

  @Post('file/upload-s3')
  @ApiOperation({ summary: 'File upload in S3' })
  @UseInterceptors(FileInterceptor('files', optionsMemoryStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of species',
    type: FileUploadDto,
  })
  @ApiResponse({status: 201, type: OmitType(Species, ["people", "films"])})
  uploadFileS3(@UploadedFile() file: Express.Multer.File,
  @Body() fileUploadDto: FileUploadDto) {
    return this.speciesService.uploadFileS3(file, fileUploadDto);
  }

  @Delete('file/delete-s3/:name')
  @ApiParam({ name: "name", example: "Aleena", description: 'The name of this species' })
  @ApiOperation({ summary: 'Deleting from storage S3 a image of the selected species by name' })
  @ApiQuery({
    name: 'image',
    description: "Full url address: https://mnodebucket.s3.eu-central-1.amazonaws.com/img-c3ask0z2yub.jpeg"
  })
  deleteFileS3(@Param('name') name: string, @Query('image', new ValidationPipeMy('s3'), new DefaultValuePipe('')) image: string) {
    return this.speciesService.deleteFileS3(name, image);
  }
}
