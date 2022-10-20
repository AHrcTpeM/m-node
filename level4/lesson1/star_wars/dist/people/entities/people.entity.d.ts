import { Films } from './../../films/entities/film.entity';
import { Species } from './../../species/entities/species.entity';
import { Vehicles } from './../../vehicles/entities/vehicle.entity';
import { Starships } from './../../starships/entities/starship.entity';
import { Planets } from './../../planets/entities/planet.entity';
import { Images } from '../../images/entities/image.entity';
export declare class People {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: Films[];
    species: Species[];
    vehicles: Vehicles[];
    starships: Starships[];
    planets: Planets[];
    images: Images[];
    url: string;
    created: Date;
    edited: Date;
}
