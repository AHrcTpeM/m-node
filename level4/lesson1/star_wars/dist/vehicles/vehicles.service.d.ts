/// <reference types="multer" />
import { Films } from '../films/entities/film.entity';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';
export declare class VehiclesService {
    private readonly vehiclesRepository;
    private readonly filmsRepository;
    private readonly peopleRepository;
    private readonly imagesService;
    private readonly propsRelations;
    constructor(vehiclesRepository: Repository<Vehicles>, filmsRepository: Repository<Films>, peopleRepository: Repository<People>, imagesService: ImagesService);
    create(createVehiclesDto: CreateVehicleDto): Promise<Vehicles>;
    findAll(): Promise<CreateVehicleDto[]>;
    findOne(name: string): Promise<CreateVehicleDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(fileUploadDto: FileUploadDto): Promise<Vehicles>;
    deleteImage(name: string, image?: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Vehicles>;
    deleteFileS3(name: string, key: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
