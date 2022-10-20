import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Films } from './../../films/entities/film.entity';
import { People } from './../../people/entities/people.entity';
import { Images } from '../../images/entities/image.entity';

@Entity()
export class Vehicles {
  @PrimaryColumn()
  @ApiProperty({ example: "Sand Crawler", description: 'The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike"' })
  name: string;

  @Column()
  @ApiProperty({ example: "Digger Crawler", description: 'The model or official name of this vehicle. Such as "All-Terrain Attack Transport"' })
  model: string;

  @Column()
  @ApiProperty({ example: "wheeled", description: 'The class of this vehicle, such as "Wheeled" or "Repulsorcraft"' })
  vehicle_class: string;

  @Column()
  @ApiProperty({ example: "Corellia Mining Corporation", description: 'The manufacturer of this vehicle. Comma separated if more than one' })
  manufacturer: string;

  @Column()
  @ApiProperty({ example: "36.8", description: 'The length of this vehicle in meters' })
  length: string;

  @Column()
  @ApiProperty({ example: "150000", description: 'The cost of this vehicle new, in Galactic Credits' })
  cost_in_credits: string;

  @Column()
  @ApiProperty({ example: "46", description: 'The number of personnel needed to run or pilot this vehicle' })
  crew: string;

  @Column()
  @ApiProperty({ example: "30", description: 'The number of non-essential people this vehicle can transport' })
  passengers: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "30", description: 'The maximum speed of this vehicle in the atmosphere' })
  max_atmosphering_speed: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "50000", description: 'The maximum number of kilograms that this vehicle can transport' })
  cargo_capacity: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "2 months", description: 'The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply' })
  consumables: string;

  //@Column("simple-array")
  @ManyToMany((type) => Films, (films) => films.vehicles
  // , { eager: true}
  )
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
  @ManyToMany((type) => People, (people) => people.vehicles, {
    eager: true
  })
  @JoinTable({
    joinColumn: {
    referencedColumnName: "url"
    },
    inverseJoinColumn: {
    referencedColumnName: "url"
    }
  })
  @ApiProperty({ example: ["https://localhost:3000/api/people/2/"], description: 'An array of People URL Resources that this vehicle has been piloted by' })
  pilots: People[];

  @Column({ default: 'true', unique: true })
  @ApiProperty({ example: "https://localhost:3000/api/people/1/", description: 'the hypermedia URL of this resource' })
  url: string;

  @OneToMany(() => Images, (images) => images.films)
  @ApiProperty({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this planet' })
  images: Images[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;
}
