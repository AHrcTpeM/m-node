import { Controller, Post, Get, Header, Delete, Param, Body, Query, ParseIntPipe, HttpStatus, DefaultValuePipe, ValidationPipe, UseInterceptors, UploadedFiles, UploadedFile, StreamableFile, UseGuards  } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { CreatePeopleDto } from './dto/create-people.dto';
import { People } from './entities/people.entity';
import { PeopleService } from './people.service';
import { PeoplePaginate } from './interfaces/interface';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { FileUploadDto, FilesUploadDto } from '../images/dto/create-image.dto';
import { optionsDiskStorage, optionsMemoryStorage } from '../common/options';
import { Roles } from '../auth/roles/roles.decorator'
import { Role } from '../auth/roles//role.enum'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ValidationPipeMy } from './interceptor/validation.pipe';


//@UseInterceptors(new TransformInterceptor()) // включен глобальный useGlobalInterceptors
@ApiBearerAuth()
@ApiTags('people')
@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}   
  
    @Post()
    @ApiBody({ type: CreatePeopleDto })
    @ApiOperation({ summary: 'Create people or update person by name' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(@Body(new ValidationPipe()) createUserDto: CreatePeopleDto): Promise<People> {
      //console.log(createUserDto);
      return this.peopleService.create(createUserDto);      
    }
    
    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Find all' })
    @ApiQuery({
      name: 'page',
      description: "Optional parameter",
      required: false
    })
    findAll(@Query('page', new DefaultValuePipe(1), new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) page: number): Promise<PeoplePaginate> {
      return this.peopleService.findAll(page);
    }
  
    @Get(':name')
    @ApiParam({ name: "name", example: "Luke Skywalker", description: 'The name of this person' })
    @ApiOperation({ summary: 'Find one' })
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: People,
    })
    findOne(@Param('name') name: string): Promise<CreatePeopleDto> {
      return this.peopleService.findOne(name);
    }
  
    @Delete(':name')
    @ApiOperation({ summary: 'Remove one people' })
    remove(@Param('name') name: string): Promise<{ name: string; deleted: string; }> {
      return this.peopleService.remove(name);
    }

    @Get('file/download:image')
    @Header('Content-Type', 'image/jpeg')
    @Header('Content-Disposition', 'attachment; filename="image.jpeg"')
    getStaticFile(@Param('image') image: string): StreamableFile {      
      return this.peopleService.streamImage(image);
    }  

    @Post('file/upload')
    @ApiOperation({ summary: 'File upload in local storage' })
    @UseInterceptors(FilesInterceptor('files', 10, optionsDiskStorage))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'Image of people',
      type: FilesUploadDto,
    })
    uploadFile(@UploadedFiles(
        // new ParseFilePipeBuilder()
        //   .addFileTypeValidator({
        //     fileType: /jpeg|png/
        //   })
        //   .build({
        //     fileIsRequired: false,
        //   }),
    ) files: Array<Express.Multer.File>,
    @Body() updateUserDto: FilesUploadDto): Promise<People> {
      updateUserDto.images = files.map(elem => `http://${process.env.HOST}:${process.env.PORT}/` + elem.filename);
      return this.peopleService.uploadFile(updateUserDto);
    }

    @Delete('file/delete/:name')
    @ApiOperation({ summary: 'Deleting a image of the selected person by name' })
    @ApiParam({ name: "name", example: "Luke Skywalker", description: 'The name of this person' })    
    @ApiQuery({
      name: 'image',
      description: "Optional parameter, without it, all the images will be deleted (full url address: http://localhost:3000/img-etg7x7dbi3.jpeg)",
      required: false
    })
    deleteImage(@Param('name') name: string, @Query('image', new DefaultValuePipe(''), new ValidationPipeMy('local')) image: string): Promise<{ name: string; deleted: string; }> {
      console.log('image', image);
      return this.peopleService.deleteImage(name, image);
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
      return this.peopleService.uploadFileS3(file, fileUploadDto);
    }

    @Delete('file/delete-s3/:name')
    @ApiParam({ name: "name", example: "Luke Skywalker", description: 'The name of this person' })
    @ApiOperation({ summary: 'Deleting from storage S3 a image of the selected person by name' })
    @ApiQuery({
      name: 'image',
      description: "Full url address: https://mnodebucket.s3.eu-central-1.amazonaws.com/img-c3ask0z2yub.jpeg"
    })
    deleteFileS3(@Param('name') name: string, @Query('image', new ValidationPipeMy('s3'), new DefaultValuePipe('')) image: string) {
      return this.peopleService.deleteFileS3(name, image);
    }

}