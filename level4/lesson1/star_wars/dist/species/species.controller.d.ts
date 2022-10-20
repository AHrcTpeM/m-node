import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';
export declare class SpeciesController {
    private readonly speciesService;
    constructor(speciesService: SpeciesService);
    create(createSpeciesDto: CreateSpeciesDto): Promise<Species>;
    findAll(): Promise<Species[]>;
    findOne(name: string): Promise<Species>;
    remove(name: string): Promise<void>;
}
