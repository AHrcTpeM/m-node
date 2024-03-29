import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query, UploadedFile, DefaultValuePipe, UseGuards, ValidationPipe, ClassSerializerInterceptor, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiConsumes, ApiProperty, ApiParam, ApiExtraModels, getSchemaPath, OmitType } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { Starships } from './entities/starship.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { optionsDiskStorage, optionsMemoryStorage } from '../common/options';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
import { ValidationPipeMy } from '../people/interceptor/validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { UpdateStarshipDto } from './dto/update-starship.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('starships')
@Controller('starships')
@ApiExtraModels(Starships) 
@UseInterceptors(ClassSerializerInterceptor)
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: CreateStarshipDto })
  @ApiOperation({ summary: 'Create starship' })
  @ApiResponse({ status: 201, description: 'OK', schema: {$ref: getSchemaPath(Starships)}})
  create(@Body(new ValidationPipe()) createStarshipDto: CreateStarshipDto): Promise<Starships> {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all' })
  @ApiResponse({status: 200, type: Starships})
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Starships>> {
    return this.starshipsService.findAll({ page, limit });
  }

  @Get(':name')
  @ApiParam({ name: "name", example: "A-wing", description: 'The name of this starship' })
  @ApiOperation({ summary: 'Find one by name' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Starships,
  })
  findOne(@Param('name') name: string): Promise<CreateStarshipDto> {
    return this.starshipsService.findOne(name);
  }

  @Put()
  @Roles(Role.Admin)
  @ApiBody({ type: UpdateStarshipDto })
  @ApiResponse({ status: 200, schema: {$ref: getSchemaPath(Starships)}})
  @ApiOperation({ summary: 'Update starship' })
  async update(@Body() updateStarshipDto: UpdateStarshipDto): Promise<Starships> {
    return this.starshipsService.update(updateStarshipDto);
  }

  @Delete(':name')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Remove one starship by name' })
  @ApiParam({ name: "name", example: "A-wing", description: 'The name of this starship' })    
  remove(@Param('name') name: string): Promise<{ name: string; deleted: string; }> {
    return this.starshipsService.remove(name);
  }


  @Post('file/upload')
  @ApiOperation({ summary: 'File upload in local storage' })
  @UseInterceptors(FilesInterceptor('files', 10, optionsDiskStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of starships',
    type: FilesUploadDto,
  })
  @ApiResponse({status: 201, type: OmitType(Starships, ["pilots", "films"])})
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>,
  @Body() updateUserDto: FilesUploadDto): Promise<Starships> {
    updateUserDto.images = files.map(elem => `http://${process.env.HOST}:${process.env.PORT}/` + elem.filename);
    return this.starshipsService.uploadFile(updateUserDto);
  }

  @Delete('file/delete/:name')
  @ApiOperation({ summary: 'Deleting a image of the selected starship by name' })
  @ApiParam({ name: "name", example: "A-wing", description: 'The name of this starship' })    
  @ApiQuery({
    name: 'image',
    description: "Optional parameter, without it, all the images will be deleted (full url address: http://localhost:3000/img-etg7x7dbi3.jpeg)",
    required: false
  })
  deleteImage(@Param('name') name: string, @Query('image', new DefaultValuePipe(''), new ValidationPipeMy('local')) image: string): Promise<{ name: string; deleted: string; }> {
    return this.starshipsService.deleteImage(name, image);
  }

  @Post('file/upload-s3')
  @ApiOperation({ summary: 'File upload in S3' })
  @UseInterceptors(FileInterceptor('files', optionsMemoryStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of starship',
    type: FileUploadDto,
  })
  @ApiResponse({status: 201, type: OmitType(Starships, ["pilots", "films"])})
  uploadFileS3(@UploadedFile() file: Express.Multer.File,
  @Body() fileUploadDto: FileUploadDto) {
    return this.starshipsService.uploadFileS3(file, fileUploadDto);
  }

  @Delete('file/delete-s3/:name')
  @ApiParam({ name: "name", example: "A-wing", description: 'The name of this starship' })
  @ApiOperation({ summary: 'Deleting from storage S3 a image of the selected starship by name' })
  @ApiQuery({
    name: 'image',
    description: "Full url address: https://mnodebucket.s3.eu-central-1.amazonaws.com/img-c3ask0z2yub.jpeg"
  })
  deleteFileS3(@Param('name') name: string, @Query('image', new ValidationPipeMy('s3'), new DefaultValuePipe('')) image: string) {
    return this.starshipsService.deleteFileS3(name, image);
  }
}
