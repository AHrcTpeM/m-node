/// <reference types="multer" />
import { Films } from '../films/entities/film.entity';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { Starships } from './entities/starship.entity';
export declare class StarshipsService {
    private readonly starshipsRepository;
    private readonly filmsRepository;
    private readonly peopleRepository;
    private readonly imagesService;
    private readonly propsRelations;
    constructor(starshipsRepository: Repository<Starships>, filmsRepository: Repository<Films>, peopleRepository: Repository<People>, imagesService: ImagesService);
    create(createStarshipDto: CreateStarshipDto): Promise<Starships>;
    findAll(): Promise<CreateStarshipDto[]>;
    findOne(name: string): Promise<CreateStarshipDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(fileUploadDto: FileUploadDto): Promise<Starships>;
    deleteImage(name: string, image?: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Starships>;
    deleteFileS3(name: string, key: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
