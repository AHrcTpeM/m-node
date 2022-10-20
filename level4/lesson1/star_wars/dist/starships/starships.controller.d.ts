import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { Starships } from './entities/starship.entity';
export declare class StarshipsController {
    private readonly starshipsService;
    constructor(starshipsService: StarshipsService);
    create(createStarshipDto: CreateStarshipDto): Promise<Starships>;
    findAll(): Promise<Starships[]>;
    findOne(name: string): Promise<Starships>;
    remove(name: string): Promise<void>;
}
