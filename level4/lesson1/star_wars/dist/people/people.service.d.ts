/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePeopleDto } from './dto/create-people.dto';
import { People } from './entities/people.entity';
import { PeoplePaginate } from './interfaces/interface';
import { Films } from './../films/entities/film.entity';
import { Starships } from './../starships/entities/starship.entity';
import { Planets } from './../planets/entities/planet.entity';
import { Species } from './../species/entities/species.entity';
import { Vehicles } from './../vehicles/entities/vehicle.entity';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { Images } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
export declare class PeopleService {
    private readonly peopleRepository;
    private readonly filmsRepository;
    private readonly starshipsRepository;
    private readonly planetsRepository;
    private readonly speciesRepository;
    private readonly vehiclesRepository;
    private readonly imagesRepository;
    private readonly imagesService;
    private readonly propsRelations;
    constructor(peopleRepository: Repository<People>, filmsRepository: Repository<Films>, starshipsRepository: Repository<Starships>, planetsRepository: Repository<Planets>, speciesRepository: Repository<Species>, vehiclesRepository: Repository<Vehicles>, imagesRepository: Repository<Images>, imagesService: ImagesService);
    create(createPeopleDto: CreatePeopleDto): Promise<People>;
    findAll(page: number): Promise<PeoplePaginate>;
    findOne(name: string): Promise<CreatePeopleDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(fileUploadDto: FileUploadDto): Promise<People>;
    deleteImage(name: string, image?: string): Promise<{
        name: string;
        deleted: string;
    }>;
    streamImage(image: string): StreamableFile;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<People>;
    deleteFileS3(name: string, key: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
