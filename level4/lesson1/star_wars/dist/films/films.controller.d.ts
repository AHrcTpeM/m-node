import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { Films } from './entities/film.entity';
export declare class FilmsController {
    private readonly filmsService;
    constructor(filmsService: FilmsService);
    create(createFilmDto: CreateFilmDto): Promise<Films>;
    findAll(): Promise<Films[]>;
    findOne(title: string): Promise<Films>;
    remove(title: string): Promise<void>;
}
