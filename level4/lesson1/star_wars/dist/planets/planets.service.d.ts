import { Repository } from 'typeorm';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planets } from './entities/planet.entity';
export declare class PlanetsService {
    private readonly planetRepository;
    constructor(planetRepository: Repository<Planets>);
    create(createPlanetDto: CreatePlanetDto): Promise<Planets>;
    findAll(): Promise<Planets[]>;
    findOne(name: string): Promise<Planets>;
    remove(name: string): Promise<void>;
}
