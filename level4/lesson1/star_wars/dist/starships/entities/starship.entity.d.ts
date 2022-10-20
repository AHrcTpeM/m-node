import { Films } from './../../films/entities/film.entity';
import { People } from './../../people/entities/people.entity';
import { Images } from '../../images/entities/image.entity';
export declare class Starships {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: Films[];
    pilots: People[];
    url: string;
    images: Images[];
    created: Date;
    edited: Date;
}
