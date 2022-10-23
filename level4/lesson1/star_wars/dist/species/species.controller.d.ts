/// <reference types="multer" />
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
export declare class SpeciesController {
    private readonly speciesService;
    constructor(speciesService: SpeciesService);
    create(createSpeciesDto: CreateSpeciesDto): Promise<Species>;
    findAll(): Promise<CreateSpeciesDto[]>;
    findOne(name: string): Promise<CreateSpeciesDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(files: Array<Express.Multer.File>, updateUserDto: FilesUploadDto): Promise<Species>;
    deleteImage(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Species>;
    deleteFileS3(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
