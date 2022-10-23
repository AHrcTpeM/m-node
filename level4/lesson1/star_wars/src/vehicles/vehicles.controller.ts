import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query, DefaultValuePipe, UploadedFile, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiConsumes, ApiProperty, ApiParam } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { optionsDiskStorage, optionsMemoryStorage } from '../common/options';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
import { ValidationPipeMy } from '../people/interceptor/validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: CreateVehicleDto })
  @ApiOperation({ summary: 'Create vehicle or update person by name' })
  create(@Body(new ValidationPipe()) createVehiclesDto: CreateVehicleDto): Promise<Vehicles> {
    return this.vehiclesService.create(createVehiclesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all' })
  findAll(): Promise<CreateVehicleDto[]> {
    return this.vehiclesService.findAll();
  }

  @Get(':name')
  @ApiParam({ name: "name", example: "Armored Assault Tank", description: 'The name of this vehicle' })
  @ApiOperation({ summary: 'Find one' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Vehicles,
  })
  findOne(@Param('name') name: string): Promise<CreateVehicleDto> {
    return this.vehiclesService.findOne(name);
  }

  @Delete(':name')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Remove one vehicle' })
  @ApiParam({ name: "name", example: "Armored Assault Tank", description: 'The name of this vehicle' })
  remove(@Param('name') name: string): Promise<{ name: string; deleted: string; }> {
    return this.vehiclesService.remove(name);
  }


  @Post('file/upload')
  @ApiOperation({ summary: 'File upload in local storage' })
  @UseInterceptors(FilesInterceptor('files', 10, optionsDiskStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of vehicle',
    type: FilesUploadDto,
  })
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>,
  @Body() updateUserDto: FilesUploadDto): Promise<Vehicles> {
    updateUserDto.images = files.map(elem => `http://${process.env.HOST}:${process.env.PORT}/` + elem.filename);
    return this.vehiclesService.uploadFile(updateUserDto);
  }

  @Delete('file/delete/:name')
  @ApiOperation({ summary: 'Deleting a image of the selected vehicle by name' })
  @ApiParam({ name: "name", example: "Armored Assault Tank", description: 'The name of this vehicle' })    
  @ApiQuery({
    name: 'image',
    description: "Optional parameter, without it, all the images will be deleted (full url address: http://localhost:3000/img-etg7x7dbi3.jpeg)",
    required: false
  })
  deleteImage(@Param('name') name: string, @Query('image', new DefaultValuePipe(''), new ValidationPipeMy('local')) image: string): Promise<{ name: string; deleted: string; }> {
    return this.vehiclesService.deleteImage(name, image);
  }

  @Post('file/upload-s3')
  @ApiOperation({ summary: 'File upload in S3' })
  @UseInterceptors(FileInterceptor('files', optionsMemoryStorage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of vehicle',
    type: FileUploadDto,
  })
  uploadFileS3(@UploadedFile() file: Express.Multer.File,
  @Body() fileUploadDto: FileUploadDto) {
    return this.vehiclesService.uploadFileS3(file, fileUploadDto);
  }

  @Delete('file/delete-s3/:name')
  @ApiParam({ name: "name", example: "Armored Assault Tank", description: 'The name of this vehicle' })
  @ApiOperation({ summary: 'Deleting from storage S3 a image of the selected vehicle by name' })
  @ApiQuery({
    name: 'image',
    description: "Full url address: https://mnodebucket.s3.eu-central-1.amazonaws.com/img-c3ask0z2yub.jpeg"
  })
  deleteFileS3(@Param('name') name: string, @Query('image', new ValidationPipeMy('s3'), new DefaultValuePipe('')) image: string) {
    return this.vehiclesService.deleteFileS3(name, image);
  }
}
