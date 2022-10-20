import { ApiProperty } from "@nestjs/swagger";
import { People } from "../../people/entities/people.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Films } from "../../films/entities/film.entity";
import { Species } from "../../species/entities/species.entity";
import { Starships } from "../../starships/entities/starship.entity";
import { Vehicles } from "../../vehicles/entities/vehicle.entity";
import { Planets } from "../../planets/entities/planet.entity";

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: "1", description: 'ID this image' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: "img-ifwbk0fvdxq.jpeg", description: 'The name of this image' })
  url: string;

  @ManyToOne(() => People, (people) => people.images, {
    orphanedRowAction: "delete"
  }) 
  @ApiProperty({ example: ["https://localhost:3000/api/people/1/"], description: 'People resource URLs that are in this image' })
  people: People;

  @ManyToOne(() => Films, (films) => films.images, {
    orphanedRowAction: "delete"
  })
  @ApiProperty({ example: ["https://localhost:3000/api/films/1/"], description: 'Film resource URLs that are in this image' })
  films: Films;

  @ManyToOne(() => Species, (species) => species.images, {
    orphanedRowAction: "delete"
  })
  @ApiProperty({ example: ["https://localhost:3000/api/species/1/"], description: 'Species resource URLs that are in this image' })
  species: Species;

  @ManyToOne(() => Starships, (starships) => starships.images, {
    orphanedRowAction: "delete"
  })
  @ApiProperty({ example: ["https://localhost:3000/api/starships/1/"], description: 'Starships resource URLs that are in this image' })
  starships: Starships;

  @ManyToOne(() => Vehicles, (vehicles) => vehicles.images, {
    orphanedRowAction: "delete"
  })
  @ApiProperty({ example: ["https://localhost:3000/api/vehicles/1/"], description: 'Vehicles resource URLs that are in this image' })
  vehicles: Vehicles;

  @ManyToOne(() => Planets, (planets) => planets.images, {
    orphanedRowAction: "delete"
  })
  @ApiProperty({ example: ["https://localhost:3000/api/planets/1/"], description: 'Planets resource URLs that are in this image' })
  planets: Planets;
}