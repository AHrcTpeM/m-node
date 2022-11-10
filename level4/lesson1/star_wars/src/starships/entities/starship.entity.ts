import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Films } from './../../films/entities/film.entity';
import { People } from './../../people/entities/people.entity';
import { Images } from '../../images/entities/image.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class Starships {
  @PrimaryColumn()
  @ApiProperty({ example: "Death Star", description: 'The name of this starship. The common name, such as "Death Star"' })
  name: string;

  @Column()
  @ApiProperty({ example: "DS-1 Orbital Battle Station", description: 'The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station"' })
  model: string;

  @Column()
  @ApiProperty({ example: "Deep Space Mobile Battlestation", description: 'The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"' })
  starship_class: string;

  @Column()
  @ApiProperty({ example: "Imperial Department of Military Research, Sienar Fleet Systems", description: 'The manufacturer of this starship. Comma separated if more than one' })
  manufacturer: string;

  @Column()
  @ApiProperty({ example: "1000000000000", description: 'The cost of this starship new, in galactic credits' })
  cost_in_credits: string;

  @Column()
  @ApiProperty({ example: "120000", description: 'The length of this starship in meters' })
  length: string;

  @Column()
  @ApiProperty({ example: "342953", description: 'The number of personnel needed to run or pilot this starship' })
  crew: string;

  @Column()
  @ApiProperty({ example: "843342", description: 'The number of non-essential people this starship can transport' })
  passengers: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "n/a", description: 'The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight' })
  max_atmosphering_speed: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "4.0", description: 'The class of this starships hyperdrive'})
  hyperdrive_rating: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "10 MGLT", description: 'The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth'})
  MGLT: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "1000000000000", description: 'The maximum number of kilograms that this starship can transport'})
  cargo_capacity: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "3 years", description: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply'})
  consumables: string;

  //@Column("simple-array")
  @ManyToMany((type) => Films, (films) => films.starships)
  @JoinTable({
    joinColumn: {
    referencedColumnName: "url"
    },
    inverseJoinColumn: {
    referencedColumnName: "url"
  }
  })
  @Transform(({ value }) => value.map((elem) => elem.url))
  @ApiProperty({ example: ["http://localhost:3000/films/1/", "http://localhost:3000/films/2/"], description: 'An array of Film URL Resources that this starship has appeared in'})
  films: Films[];

  //@Column("simple-array")
  @ManyToMany((type) => People, (people) => people.starships, {onDelete: 'CASCADE'})
  @JoinTable({
    joinColumn: {
    referencedColumnName: "url"
    },
    inverseJoinColumn: {
    referencedColumnName: "url"
  }
  })
  @Transform(({ value }) => value.map((elem) => elem.url))
  @ApiProperty({ example: ["http://localhost:3000/people/13/"], description: 'An array of People URL Resources that this starship has been piloted by' })
  pilots: People[];
  
  @Column({ default: 'true', unique: true })
  @ApiProperty({ example: "http://localhost:3000/starships/1/", description: 'the hypermedia URL of this resource' })
  url: string;

  @OneToMany(() => Images, (images) => images.starships, { 
    eager: false })
  @ApiProperty({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this planet' })
  images: Images[];

  @Exclude()
  @CreateDateColumn()
  created: Date;

  @Exclude()
  @UpdateDateColumn()
  edited: Date;
}
