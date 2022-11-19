import { Controller, Post, Get, Delete, Param, Body, Query, ParseIntPipe, HttpStatus, DefaultValuePipe, ValidationPipe, UseInterceptors, UploadedFiles, UploadedFile, ClassSerializerInterceptor, Put  } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiConsumes, ApiParam, getSchemaPath, ApiExtraModels, OmitType } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { CreatePeopleDto } from './dto/create-people.dto';
import { People } from './entities/people.entity';
import { PeopleService } from './people.service';
import { PaginateType } from './interfaces/interface';
import { FileUploadDto, FilesUploadDto } from '../images/dto/create-image.dto';
import { optionsDiskStorage, optionsMemoryStorage } from '../common/options';
import { ValidationPipeMy } from './interceptor/validation.pipe';
import { ApiPaginatedResponse } from '../common/paginate-response-api.decorator';
import { UpdatePeopleDto } from './dto/update-people.dto';

//@UseInterceptors(new TransformInterceptor()) // включен глобальный useGlobalInterceptors
//@ApiBearerAuth()
@ApiTags('people')
@Controller('people')
@ApiExtraModels(People, PaginateType) 
@UseInterceptors(ClassSerializerInterceptor)
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}   
  
    @Post()
    @ApiBody({ type: CreatePeopleDto })
    @ApiOperation({ summary: 'Create people' })
    @ApiResponse({ status: 201, description: 'OK', schema: {$ref: getSchemaPath(People)}})
    async create(@Body(new ValidationPipe()) createUserDto: CreatePeopleDto): Promise<People> {
      return this.peopleService.create(createUserDto);      
    }
    
    @Get()
    @ApiOperation({ summary: 'Find all' })
    @ApiQuery({
      name: 'page',
      description: "Optional parameter",
      required: false
    })
    @ApiPaginatedResponse(People)
    findAll(@Query('page', new DefaultValuePipe(1), new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) page: number): Promise<PaginateType<CreatePeopleDto>> {
      return this.peopleService.findAll(page);
    }
  
    @Get(':name')
    @ApiParam({ name: "name", example: "Luke Skywalker", description: 'The name of this person' })
    @ApiOperation({ summary: 'Find one by name' })
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: People,
    })
    findOne(@Param('name') name: string): Promise<People> {
      return this.peopleService.findOne(name);
    }
  
    @Put()
    @ApiBody({ type: UpdatePeopleDto })
    @ApiResponse({ status: 200, schema: {$ref: getSchemaPath(People)}})
    @ApiOperation({ summary: 'Update people' })
    async update(@Body() updatePeopleDto: UpdatePeopleDto): Promise<People> {
      return this.peopleService.update(updatePeopleDto);
    }
    
    @Delete(':name')
    @ApiOperation({ summary: 'Remove one people by name' })
    @ApiParam({ name: "name", example: "Luke Skywalker", description: 'The name of this person' }) 
    remove(@Param('name') name: string): Promise<{ name: string; deleted: string; }> {
      return this.peopleService.remove(name);
    }
    
    @Post('file/upload')
    @ApiOperation({ summary: 'File upload in local storage' })
    @UseInterceptors(FilesInterceptor('files', 10, optionsDiskStorage))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'Image of people',
      type: FilesUploadDto,
    })
    @ApiResponse({status: 201, type: OmitType(People, ["films", "species", "vehicles", "starships", "homeworld"])})    
    uploadFile(@UploadedFiles(
        // new ParseFilePipeBuilder()    // тоже самое делает еще на этапе FilesInterceptor
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
    @ApiResponse({status: 201, type: OmitType(People, ["films", "species", "vehicles", "starships", "homeworld"])})
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
    deleteFileS3(
      @Param('name') name: string, 
      @Query('image', new ValidationPipeMy('s3'), new DefaultValuePipe('')) image: string
      ) {
      return this.peopleService.deleteFileS3(name, image);
    }

    // @Get('file/download/:image')
    // @Header('Content-Type', 'image/jpeg')
    // @Header('Content-Disposition', 'attachment; filename="image.jpeg"')
    // getStaticFile(@Param('image') image: string): StreamableFile {      
    //   return this.peopleService.streamImage(image);
    // }
}