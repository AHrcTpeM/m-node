/// <reference types="multer" />
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { Films } from './entities/film.entity';
import { People } from './../people/entities/people.entity';
import { Starships } from './../starships/entities/starship.entity';
import { Planets } from './../planets/entities/planet.entity';
import { Species } from './../species/entities/species.entity';
import { Vehicles } from '../vehicles/entities/vehicle.entity';
import { ImagesService } from '../images/images.service';
import { FileUploadDto } from '../images/dto/create-image.dto';
export declare class FilmsService {
    private readonly filmsRepository;
    private readonly peopleRepository;
    private readonly starshipsRepository;
    private readonly planetsRepository;
    private readonly speciesRepository;
    private readonly vehiclesRepository;
    private readonly imagesService;
    private readonly propsRelations;
    constructor(filmsRepository: Repository<Films>, peopleRepository: Repository<People>, starshipsRepository: Repository<Starships>, planetsRepository: Repository<Planets>, speciesRepository: Repository<Species>, vehiclesRepository: Repository<Vehicles>, imagesService: ImagesService);
    create(createfilmsDto: CreateFilmDto): Promise<Films>;
    findAll(): Promise<CreateFilmDto[]>;
    findOne(name: string): Promise<CreateFilmDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(fileUploadDto: FileUploadDto): Promise<Films>;
    deleteImage(name: string, image?: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Films>;
    deleteFileS3(name: string, key: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
