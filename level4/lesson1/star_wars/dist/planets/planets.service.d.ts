/// <reference types="multer" />
import { FileUploadDto } from 'src/images/dto/create-image.dto';
import { Repository } from 'typeorm';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planets } from './entities/planet.entity';
import { Films } from '../films/entities/film.entity';
import { People } from './../people/entities/people.entity';
import { ImagesService } from '../images/images.service';
export declare class PlanetsService {
    private readonly planetRepository;
    private readonly filmsRepository;
    private readonly peopleRepository;
    private readonly imagesService;
    private readonly propsRelations;
    constructor(planetRepository: Repository<Planets>, filmsRepository: Repository<Films>, peopleRepository: Repository<People>, imagesService: ImagesService);
    create(createplanetsDto: CreatePlanetDto): Promise<Planets>;
    findAll(): Promise<CreatePlanetDto[]>;
    findOne(name: string): Promise<CreatePlanetDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(fileUploadDto: FileUploadDto): Promise<Planets>;
    deleteImage(name: string, image?: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Planets>;
    deleteFileS3(name: string, key: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
