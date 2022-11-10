import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Films } from './../../films/entities/film.entity';
import { People } from './../../people/entities/people.entity';
import { Images } from '../../images/entities/image.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class Planets {
  @PrimaryColumn()
  @ApiProperty({ example: "Tatooine", description: 'The name of this planet' })
  name: string;

  @Column()
  @ApiProperty({ example: "10465", description: 'The diameter of this planet in kilometers' })
  diameter: string;

  @Column()
  @ApiProperty({ example: "23", description: 'The number of standard hours it takes for this planet to complete a single rotation on its axis' })
  rotation_period: string;

  @Column()
  @ApiProperty({ example: "304", description: 'The number of standard days it takes for this planet to complete a single orbit of its local star' })
  orbital_period: string;

  @Column()
  @ApiProperty({ example: "1", description: 'A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs' })
  gravity: string;

  @Column()
  @ApiProperty({ example: "120000", description: 'The average population of sentient beings inhabiting this planet' })
  population: string;

  @Column()
  @ApiProperty({ example: "Arid", description: 'The climate of this planet. Comma separated if diverse' })
  climate: string;

  @Column()
  @ApiProperty({ example: "Dessert", description: 'The terrain of this planet. Comma separated if diverse' })
  terrain: string;

  @Column({ default: 'true' })
  @ApiProperty({ example: "1", description: 'The percentage of the planet surface that is naturally occurring water or bodies of water' })
  surface_water: string;

  //@Column("simple-array")
  @ManyToMany((type) => Films, (films) => films.planets)
  @JoinTable({
    joinColumn: {
    referencedColumnName: "url"
    },
    inverseJoinColumn: {
    referencedColumnName: "url"
  }
  })
  @ApiProperty({ example: ["http://localhost:3000/films/1/", "http://localhost:3000/films/2/"], description: 'An array of Film URL Resources that this planet has appeared in'})
  @Transform(({ value }) => value.map((elem) => elem.url))
  films: Films[];
  
  @OneToMany(() => People, (people) => people.homeworld)
  @JoinColumn({ referencedColumnName: "url" })
  @ApiProperty({ example: ["http://localhost:3000/people/1/"], description: 'An array of People URL Resources that live on this planet' })
  @Transform(({ value }) => value.map((elem) => elem.url))
  residents: People[];

  @Column({ default: 'true', unique: true })
  @ApiProperty({ example: "http://localhost:3000/planets/1/", description: 'the hypermedia URL of this resource' })
  url: string;

  @OneToMany(() => Images, (images) => images.planets, { 
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
