/// <reference types="multer" />
import { Films } from '../films/entities/film.entity';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';
export declare class SpeciesService {
    private readonly speciesRepository;
    private readonly filmsRepository;
    private readonly peopleRepository;
    private readonly imagesService;
    private readonly propsRelations;
    constructor(speciesRepository: Repository<Species>, filmsRepository: Repository<Films>, peopleRepository: Repository<People>, imagesService: ImagesService);
    create(createspeciesDto: CreateSpeciesDto): Promise<Species>;
    findAll(): Promise<CreateSpeciesDto[]>;
    findOne(name: string): Promise<CreateSpeciesDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(fileUploadDto: FileUploadDto): Promise<Species>;
    deleteImage(name: string, image?: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Species>;
    deleteFileS3(name: string, key: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
