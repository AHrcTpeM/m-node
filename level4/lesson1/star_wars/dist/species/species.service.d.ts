import { Repository } from 'typeorm';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';
export declare class SpeciesService {
    private readonly speciesRepository;
    constructor(speciesRepository: Repository<Species>);
    create(createSpeciesDto: CreateSpeciesDto): Promise<Species>;
    findAll(): Promise<Species[]>;
    findOne(name: string): Promise<Species>;
    remove(name: string): Promise<void>;
}
