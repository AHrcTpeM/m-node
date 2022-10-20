import { People } from "../../people/entities/people.entity";
import { Films } from "../../films/entities/film.entity";
import { Species } from "../../species/entities/species.entity";
import { Starships } from "../../starships/entities/starship.entity";
import { Vehicles } from "../../vehicles/entities/vehicle.entity";
import { Planets } from "../../planets/entities/planet.entity";
export declare class Images {
    id: number;
    url: string;
    people: People;
    films: Films;
    species: Species;
    starships: Starships;
    vehicles: Vehicles;
    planets: Planets;
}
