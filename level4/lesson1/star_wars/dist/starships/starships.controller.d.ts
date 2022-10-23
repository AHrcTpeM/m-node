/// <reference types="multer" />
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { Starships } from './entities/starship.entity';
import { FilesUploadDto, FileUploadDto } from '../images/dto/create-image.dto';
export declare class StarshipsController {
    private readonly starshipsService;
    constructor(starshipsService: StarshipsService);
    create(createStarshipDto: CreateStarshipDto): Promise<Starships>;
    findAll(): Promise<CreateStarshipDto[]>;
    findOne(name: string): Promise<CreateStarshipDto>;
    remove(name: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFile(files: Array<Express.Multer.File>, updateUserDto: FilesUploadDto): Promise<Starships>;
    deleteImage(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
    uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto): Promise<Starships>;
    deleteFileS3(name: string, image: string): Promise<{
        name: string;
        deleted: string;
    }>;
}
