/// <reference types="multer" />
import { Films } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Planets } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Starships } from '../starships/entities/starship.entity';
import { Vehicles } from '../vehicles/entities/vehicle.entity';
import { EntityTarget, Repository } from 'typeorm';
import { Images } from './entities/image.entity';
import { FileUploadDto } from './dto/create-image.dto';
export declare class ImagesService {
    private readonly peopleRepository;
    private readonly filmsRepository;
    private readonly starshipsRepository;
    private readonly planetsRepository;
    private readonly speciesRepository;
    private readonly vehiclesRepository;
    private readonly imagesRepository;
    private readonly resources;
    constructor(peopleRepository: Repository<People>, filmsRepository: Repository<Films>, starshipsRepository: Repository<Starships>, planetsRepository: Repository<Planets>, speciesRepository: Repository<Species>, vehiclesRepository: Repository<Vehicles>, imagesRepository: Repository<Images>);
    uploadFile<T>(entity: string, fileUploadDto: FileUploadDto, target: EntityTarget<T>): Promise<T>;
    deleteImage(entity: string, name: string, image?: string): Promise<{
        name: string;
        deleted: string;
    }>;
    deleteFiles(arrayFiles: string[]): string;
    uploadFileS3<T>(entity: string, file: Express.Multer.File, fileUploadDto: FileUploadDto, target: EntityTarget<T>): Promise<T>;
    deleteFileS3(entity: string, name: string, key: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
