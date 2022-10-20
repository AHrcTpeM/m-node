/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { People } from './entities/people.entity';
import { PeopleService } from './people.service';
import { PeoplePaginate } from './interfaces/interface';
import { FileUploadDto, FilesUploadDto } from '../images/dto/create-image.dto';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    create(createUserDto: CreatePeopleDto): Promise<People>;
    findAll(page: number): Promise<PeoplePaginate>;
    findOne(name: string): Promise<CreatePeopleDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    getStaticFile(image: string): StreamableFile;
    uploadFile(files: Array<Express.Multer.File>, updateUserDto: FilesUploadDto): Promise<People>;
    deleteImage(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<People>;
    deleteFileS3(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
