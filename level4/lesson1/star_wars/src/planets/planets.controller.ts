import { Controller, Get, Post, Body, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, Query, DefaultValuePipe, UploadedFile, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planets } from './entities/planet.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { optionsDiskStorage, optionsMemoryStorage } from '../common/options';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
import { ValidationPipeMy } from '../people/interceptor/validation.pipe';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: CreatePlanetDto })
  @ApiOperation({ summary: 'Create planet or update person by name' })
  create(@Body(new ValidationPipe()) createPlanetDto: CreatePlanetDto): Promise<Planets> {
    return this.planetsService.create(createPlanetDto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Find all' })
  findAll(): Promise<CreatePlanetDto[]> {
    return this.planetsService.findAll();
  }
  
  @Get(':name')
  @ApiParam({ name: "name", example: "Alderaan", description: 'The name of this planet' })
  @ApiOperation({ summary: 'Find one' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Planets,
  })
  findOne(@Param('name') name: string): Promise<CreatePlanetDto> {
    return this.planetsService.findOne(name);
  }
  
  @Delete(':name')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Remove one planet' })
  @ApiParam({ name: "name", example: "Alderaan", description: 'The name of this planet' })    
  remove(@Param('name') name: string): Promise<{ name: string; deleted: string; }> {
    return this.planetsService.remove(name);
  }


  @Post('file/upload')
  @ApiOperation({ summary: 'File upload in local storage' })
  @UseInterceptors(FilesInterceptor('files', 10, optionsDiskStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of planets',
    type: FilesUploadDto,
  })
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>,
  @Body() updateUserDto: FilesUploadDto): Promise<Planets> {
    updateUserDto.images = files.map(elem => `http://${process.env.HOST}:${process.env.PORT}/` + elem.filename);
    return this.planetsService.uploadFile(updateUserDto);
  }

  @Delete('file/delete/:name')
  @ApiOperation({ summary: 'Deleting a image of the selected person by name' })
  @ApiParam({ name: "name", example: "Alderaan", description: 'The name of this planet' })    
  @ApiQuery({
    name: 'image',
    description: "Optional parameter, without it, all the images will be deleted (full url address: http://localhost:3000/img-etg7x7dbi3.jpeg)",
    required: false
  })
  deleteImage(@Param('name') name: string, @Query('image', new DefaultValuePipe(''), new ValidationPipeMy('local')) image: string): Promise<{ name: string; deleted: string; }> {
    return this.planetsService.deleteImage(name, image);
  }

  @Post('file/upload-s3')
  @ApiOperation({ summary: 'File upload in S3' })
  @UseInterceptors(FileInterceptor('files', optionsMemoryStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of planet',
    type: FileUploadDto,
  })
  uploadFileS3(@UploadedFile() file: Express.Multer.File,
  @Body() fileUploadDto: FileUploadDto) {
    return this.planetsService.uploadFileS3(file, fileUploadDto);
  }

  @Delete('file/delete-s3/:name')
  @ApiParam({ name: "name", example: "Alderaan", description: 'The name of this person' })
  @ApiOperation({ summary: 'Deleting from storage S3 a image of the selected planet by name' })
  @ApiQuery({
    name: 'image',
    description: "Full url address: https://mnodebucket.s3.eu-central-1.amazonaws.com/img-c3ask0z2yub.jpeg"
  })
  deleteFileS3(@Param('name') name: string, @Query('image', new ValidationPipeMy('s3'), new DefaultValuePipe('')) image: string) {
    return this.planetsService.deleteFileS3(name, image);
  }
}
