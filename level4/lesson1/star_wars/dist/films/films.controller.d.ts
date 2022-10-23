/// <reference types="multer" />
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { Films } from './entities/film.entity';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
export declare class FilmsController {
    private readonly filmsService;
    constructor(filmsService: FilmsService);
    create(createFilmDto: CreateFilmDto): Promise<Films>;
    findAll(): Promise<CreateFilmDto[]>;
    findOne(title: string): Promise<CreateFilmDto>;
    remove(title: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(files: Array<Express.Multer.File>, updateUserDto: FilesUploadDto): Promise<Films>;
    deleteImage(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Films>;
    deleteFileS3(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
