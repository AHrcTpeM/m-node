import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { Films } from './entities/film.entity';
import { People } from './../people/entities/people.entity';
import { Starships } from './../starships/entities/starship.entity';
import { Planets } from './../planets/entities/planet.entity';
import { Species } from './../species/entities/species.entity';
import { Vehicles } from './../vehicles/entities/vehicle.entity';
export declare class FilmsService {
    private readonly filmsRepository;
    private readonly peopleRepository;
    private readonly starshipsRepository;
    private readonly planetsRepository;
    private readonly speciesRepository;
    private readonly vehiclesRepository;
    constructor(filmsRepository: Repository<Films>, peopleRepository: Repository<People>, starshipsRepository: Repository<Starships>, planetsRepository: Repository<Planets>, speciesRepository: Repository<Species>, vehiclesRepository: Repository<Vehicles>);
    create(createFilmDto: CreateFilmDto): Promise<Films>;
    findAll(): Promise<Films[]>;
    findOne(title: string): Promise<Films>;
    remove(title: string): Promise<void>;
}
