/// <reference types="multer" />
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planets } from './entities/planet.entity';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
export declare class PlanetsController {
    private readonly planetsService;
    constructor(planetsService: PlanetsService);
    create(createPlanetDto: CreatePlanetDto): Promise<Planets>;
    findAll(): Promise<CreatePlanetDto[]>;
    findOne(name: string): Promise<CreatePlanetDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(files: Array<Express.Multer.File>, updateUserDto: FilesUploadDto): Promise<Planets>;
    deleteImage(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Planets>;
    deleteFileS3(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
