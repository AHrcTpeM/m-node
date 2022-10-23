/// <reference types="multer" />
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehiclesDto: CreateVehicleDto): Promise<Vehicles>;
    findAll(): Promise<CreateVehicleDto[]>;
    findOne(name: string): Promise<CreateVehicleDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(files: Array<Express.Multer.File>, updateUserDto: FilesUploadDto): Promise<Vehicles>;
    deleteImage(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Vehicles>;
    deleteFileS3(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
