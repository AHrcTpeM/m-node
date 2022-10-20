import { People } from './../../people/entities/people.entity';
import { Planets } from './../../planets/entities/planet.entity';
import { Vehicles } from './../../vehicles/entities/vehicle.entity';
import { Starships } from './../../starships/entities/starship.entity';
import { Species } from './../../species/entities/species.entity';
import { Images } from '../../images/entities/image.entity';
export declare class Films {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: Date;
    species: Species[];
    starships: Starships[];
    vehicles: Vehicles[];
    characters: People[];
    planets: Planets[];
    url: string;
    images: Images[];
    created: Date;
    edited: Date;
}
