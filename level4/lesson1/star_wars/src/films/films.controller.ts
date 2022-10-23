import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, DefaultValuePipe, UploadedFile, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiConsumes, ApiProperty, ApiParam } from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { Films } from './entities/film.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { optionsDiskStorage, optionsMemoryStorage } from '../common/options';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
import { ValidationPipeMy } from '../people/interceptor/validation.pipe';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: CreateFilmDto })
  @ApiOperation({ summary: 'Create film or update person by name' })
  create(@Body(new ValidationPipe()) createFilmDto: CreateFilmDto): Promise<Films> {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all' })
  findAll(): Promise<CreateFilmDto[]> {
    return this.filmsService.findAll();
  }

  @Get(':title')
  @ApiParam({ name: "title", example: "A New Hope", description: 'The name of this film' })
  @ApiOperation({ summary: 'Find one' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Films,
  })
  findOne(@Param('title') title: string): Promise<CreateFilmDto> {
    return this.filmsService.findOne(title);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
  //   return this.filmsService.update(+id, updateFilmDto);
  // }

  @Delete(':title')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Remove one film' })
  @ApiParam({ name: "title", example: "A New Hope", description: 'The name of this film' })    
  remove(@Param('title') title: string): Promise<{ name: string; deleted: string; }> {
    return this.filmsService.remove(title);
  }


  @Post('file/upload')
  @ApiOperation({ summary: 'File upload in local storage' })
  @UseInterceptors(FilesInterceptor('files', 10, optionsDiskStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of films',
    type: FilesUploadDto,
  })
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>,
  @Body() updateUserDto: FilesUploadDto): Promise<Films> {
    updateUserDto.images = files.map(elem => `http://${process.env.HOST}:${process.env.PORT}/` + elem.filename);
    return this.filmsService.uploadFile(updateUserDto);
  }

  @Delete('file/delete/:name')
  @ApiOperation({ summary: 'Deleting a image of the selected person by name' })
  @ApiParam({ name: "name", example: "A New Hope", description: 'The title of this films' })    
  @ApiQuery({
    name: 'image',
    description: "Optional parameter, without it, all the images will be deleted (full url address: http://localhost:3000/img-etg7x7dbi3.jpeg)",
    required: false
  })
  deleteImage(@Param('name') name: string, @Query('image', new DefaultValuePipe(''), new ValidationPipeMy('local')) image: string): Promise<{ name: string; deleted: string; }> {
    return this.filmsService.deleteImage(name, image);
  }

  @Post('file/upload-s3')
  @ApiOperation({ summary: 'File upload in S3' })
  @UseInterceptors(FileInterceptor('files', optionsMemoryStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of people',
    type: FileUploadDto,
  })
  uploadFileS3(@UploadedFile() file: Express.Multer.File,
  @Body() fileUploadDto: FileUploadDto) {
    return this.filmsService.uploadFileS3(file, fileUploadDto);
  }

  @Delete('file/delete-s3/:name')
  @ApiParam({ name: "name", example: "A New Hope", description: 'The name of this person' })
  @ApiOperation({ summary: 'Deleting from storage S3 a image of the selected films by title' })
  @ApiQuery({
    name: 'image',
    description: "Full url address: https://mnodebucket.s3.eu-central-1.amazonaws.com/img-c3ask0z2yub.jpeg"
  })
  deleteFileS3(@Param('name') name: string, @Query('image', new ValidationPipeMy('s3'), new DefaultValuePipe('')) image: string) {
    return this.filmsService.deleteFileS3(name, image);
  }
}
