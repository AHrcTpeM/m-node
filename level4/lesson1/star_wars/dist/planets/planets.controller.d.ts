import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planets } from './entities/planet.entity';
export declare class PlanetsController {
    private readonly planetsService;
    constructor(planetsService: PlanetsService);
    create(createPlanetDto: CreatePlanetDto): Promise<Planets>;
    findAll(): Promise<Planets[]>;
    findOne(name: string): Promise<Planets>;
    remove(name: string): Promise<void>;
}
