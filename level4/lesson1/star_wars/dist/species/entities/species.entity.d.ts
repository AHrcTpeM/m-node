import { People } from './../../people/entities/people.entity';
import { Films } from './../../films/entities/film.entity';
import { Images } from '../../images/entities/image.entity';
export declare class Species {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    average_lifespan: string;
    eye_color: string;
    hair_colors: string;
    skin_colors: string;
    language: string;
    homeworld: string;
    people: People[];
    films: Films[];
    url: string;
    images: Images[];
    created: Date;
    edited: Date;
}
