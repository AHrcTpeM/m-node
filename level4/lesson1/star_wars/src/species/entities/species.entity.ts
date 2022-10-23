import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { People } from './../../people/entities/people.entity';
import { Films } from './../../films/entities/film.entity';
import { Images } from '../../images/entities/image.entity';

@Entity()
export class Species {
  @PrimaryColumn()
  @ApiProperty({ example: "Wookie", description: 'The name of this species' })
  name: string;

  @Column()
  @ApiProperty({ example: "Mammal", description: 'The classification of this species, such as "mammal" or "reptile"' })
  classification: string;

  @Column()
  @ApiProperty({ example: "Sentient", description: 'The designation of this species, such as "sentient"' })
  designation: string;

  @Column()
  @ApiProperty({ example: "2.1", description: 'The average height of this species in centimeters' })
  average_height: string;

  @Column()
  @ApiProperty({ example: "400", description: 'The average lifespan of this species in years' })
  average_lifespan: string;

  @Column({default: 'n/a'})
  @ApiProperty({ example: "blue, green, yellow, brown, golden, red", description: 'A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes' })
  eye_color: string;

  @Column()
  @ApiProperty({ example: "black, brown", description: 'A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair' })
  hair_colors: string;

  @Column()
  @ApiProperty({ example: "gray", description: 'A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin' })
  skin_colors: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "Shyriiwook", description: 'The language commonly spoken by this species' })
  language: string;

  @Column({ nullable: true, default: 'true' })
  @ApiProperty({ example: "https://localhost:3000/api/planets/14/", description: 'The URL of a planet resource, a planet that this species originates from'})
  homeworld: string;

  //@Column("simple-array")
  @ManyToMany((type) => People, (people) => people.species)
  @JoinTable({
    joinColumn: {
    referencedColumnName: "url"
    },
    inverseJoinColumn: {
    referencedColumnName: "url"
  }
  })
  @ApiProperty({ example: ["https://localhost:3000/api/people/13/"], description: 'An array of People URL Resources that are a part of this species' })
  people: People[];

  //@Column("simple-array")
  @ManyToMany((type) => Films, (films) => films.species)
  @JoinTable({
    joinColumn: {
    referencedColumnName: "url"
    },
    inverseJoinColumn: {
    referencedColumnName: "url"
  }
  })
  @ApiProperty({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of Film URL Resources that this species has appeared in'})
  films: Films[];

  @Column({ default: 'true', unique: true })
  @ApiProperty({ example: "https://localhost:3000/api/species/1/", description: 'the hypermedia URL of this resource' })
  url: string;

  @OneToMany(() => Images, (images) => images.species, { 
    eager: false })
  @ApiProperty({ example: ["http://localhost:3000/img-io9at1aivg.jpeg"], description: 'An array of images resource URLs that are in this planet' })
  images: Images[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;
}
