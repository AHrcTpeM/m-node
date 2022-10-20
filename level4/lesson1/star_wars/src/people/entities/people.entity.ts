import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Films } from './../../films/entities/film.entity';
import { Species } from './../../species/entities/species.entity';
import { Vehicles } from './../../vehicles/entities/vehicle.entity';
import { Starships } from './../../starships/entities/starship.entity';
import { Planets } from './../../planets/entities/planet.entity';
import { Images } from '../../images/entities/image.entity';

@Entity()
export class People {
  @PrimaryColumn()
  @ApiProperty({ example: "Luke Skywalker", description: 'The name of this person' })
  name: string;

  @Column()
  @ApiProperty({ example: "172", description: 'The height of the person in centimeters' })
  height: string;

  @Column()
  @ApiProperty({ example: "77", description: 'The mass of the person in kilograms' })
  mass: string;

  @Column()
  @ApiProperty({ example: "blond", description: 'The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair' })
  hair_color: string;

  @Column()
  @ApiProperty({ example: "fair", description: 'The skin color of this person' })
  skin_color: string;

  @Column()
  @ApiProperty({ example: "blue", description: 'The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye' })
  eye_color: string;

  @Column()
  @ApiProperty({ example: "19BBY", description: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope' })
  birth_year: string;

  @Column()
  @ApiProperty({ example: "male", description: 'The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender' })
  gender: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "https://localhost:3000/api/planets/1/", description: 'The URL of a planet resource, a planet that this person was born on or inhabits' })
  homeworld: string;

  //@Column("simple-array")
  @ManyToMany((type) => Films, (films) => films.characters, {cascade: true})
  @JoinTable({
    joinColumn: {
    referencedColumnName: "url"
    },
    inverseJoinColumn: {
    referencedColumnName: "url"
  }
  })
  @ApiProperty({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of film resource URLs that this person has been in'})
  films: Films[];

  //@Column("simple-array")
  @ManyToMany((type) => Species, (species) => species.people)
  @ApiProperty({ example: ["https://localhost:3000/api/species/2/"], description: 'An array of species resource URLs that this person belongs to' })
  species: Species[];

  //@Column("simple-array")
  @ManyToMany((type) => Vehicles, (vehicles) => vehicles.pilots)
  @ApiProperty({ example: ["https://localhost:3000/api/vehicles/14/"], description: 'An array of vehicle resource URLs that this person has piloted' })
  vehicles: Vehicles[];

  //@Column("simple-array")
  @ManyToMany((type) => Starships, (starships) => starships.pilots)
  @ApiProperty({ example: ["https://localhost:3000/api/starships/12/"], description: 'An array of starship resource URLs that this person has piloted' })
  starships: Starships[];

  @ManyToMany((type) => Planets, (planets) => planets.residents)
  @ApiProperty({ example: ["https://localhost:3000/api/planets/1/"], description: 'An array of planet resource URLs that are in this film' })
  planets: Planets[];

  @OneToMany(() => Images, (images) => images.people)
  @ApiProperty({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this person' })
  images: Images[];

  @Column({ default: 'true', unique: true })
  @ApiProperty({ example: "https://localhost:3000/api/people/1/", description: 'the hypermedia URL of this resource' })
  url: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;


}