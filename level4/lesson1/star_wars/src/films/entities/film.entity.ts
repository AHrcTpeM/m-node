import { Column, Entity, PrimaryColumn, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { People } from './../../people/entities/people.entity';
import { Planets } from './../../planets/entities/planet.entity';
import { Vehicles } from './../../vehicles/entities/vehicle.entity';
import { Starships } from './../../starships/entities/starship.entity';
import { Species } from './../../species/entities/species.entity';
import { Images } from '../../images/entities/image.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class Films {
  @PrimaryColumn()
  @ApiProperty({ example: "A New Hope", description: 'The title of this film' })
  title: string;

  @Column()
  @ApiProperty({ example: 4, description: 'The episode number of this film' })
  episode_id: number;

  @Column("text")
  @ApiProperty({ example: "It is a period of civil war.\n\nRebel spaceships, striking\n\nfrom a hidden base, have won\n\ntheir first victory against\n\nthe evil Galactic Empire.", description: 'The opening paragraphs at the beginning of this film' })
  opening_crawl: string;

  @Column()
  @ApiProperty({ example: "George Lucas", description: 'The name of the director of this film' })
  director: string;

  @Column()
  @ApiProperty({ example: "Gary Kurtz, Rick McCallum", description: 'The name(s) of the producer(s) of this film. Comma separated' })
  producer: string;

  @Column()
  @ApiProperty({ example: "1977-05-25", description: 'The ISO 8601 date format of film release at original creator country' })
  release_date: Date;

  //@Column("simple-array")
  @ManyToMany((type) => Species, (species) => species.films)
  @ApiProperty({ example: ["http://localhost:3000/species/2/"], description: 'An array of species resource URLs that are in this film' })
  @Transform(({ value }) => value.map((elem) => elem.url))
  species: Species[];
  
  @ManyToMany((type) => Starships, (starships) => starships.films)
  @ApiProperty({ example: ["http://localhost:3000/starships/12/"], description: 'An array of starship resource URLs that are in this film' })
  @Transform(({ value }) => value.map((elem) => elem.url))
  starships: Starships[];
  
  @ManyToMany((type) => Vehicles, (vehicles) => vehicles.films)
  @ApiProperty({ example: ["http://localhost:3000/vehicles/14/"], description: 'An array of vehicle resource URLs that are in this film' })
  @Transform(({ value }) => value.map((elem) => elem.url))
  vehicles: Vehicles[];
  
  @ManyToMany((type) => People, (people) => people.films, {onDelete: 'CASCADE'})
  @ApiProperty({ example: ["http://localhost:3000/people/1/"], description: 'An array of people resource URLs that are in this film' })
  @Transform(({ value }) => value.map((elem) => elem.url))
  characters: People[];
  
  @ManyToMany((type) => Planets, (planets) => planets.films)
  @ApiProperty({ example: ["http://localhost:3000/planets/1/"], description: 'An array of planet resource URLs that are in this film' })
  @Transform(({ value }) => value.map((elem) => elem.url))
  planets: Planets[];

  @Column({ default: 'true', unique: true })
  @ApiProperty({ example: "http://localhost:3000/films/1/", description: 'the hypermedia URL of this resource' })
  url: string;

  @OneToMany(() => Images, (images) => images.films, { 
    eager: false })
  @ApiProperty({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this film' })
  images: Images[];

  @Exclude()
  @CreateDateColumn()
  created: Date;

  @Exclude()
  @UpdateDateColumn()
  edited: Date;
}
