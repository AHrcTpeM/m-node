import { Films } from './../../films/entities/film.entity';
import { People } from './../../people/entities/people.entity';
import { Images } from '../../images/entities/image.entity';
export declare class Vehicles {
    name: string;
    model: string;
    vehicle_class: string;
    manufacturer: string;
    length: string;
    cost_in_credits: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables: string;
    films: Films[];
    pilots: People[];
    url: string;
    images: Images[];
    created: Date;
    edited: Date;
}
