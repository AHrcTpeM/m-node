import { Repository } from 'typeorm';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { Starships } from './entities/starship.entity';
export declare class StarshipsService {
    private readonly starshipsRepository;
    constructor(starshipsRepository: Repository<Starships>);
    create(createStarshipDto: CreateStarshipDto): Promise<Starships>;
    findAll(): Promise<Starships[]>;
    findOne(name: string): Promise<Starships>;
    remove(name: string): Promise<void>;
}
