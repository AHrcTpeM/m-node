import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsDate } from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty()
  @ApiProperty({ example: "A New Hope", description: 'The title of this film' })
  title: string;

  @IsInt()
  @ApiProperty({ example: 4, description: 'The episode number of this film' })
  episode_id: number;
  
  @ApiProperty({ example: "It is a period of civil war.\n\nRebel spaceships, striking\n\nfrom a hidden base, have won\n\ntheir first victory against\n\nthe evil Galactic Empire.", description: 'The opening paragraphs at the beginning of this film' })
  opening_crawl: string;
  
  @ApiProperty({ example: "George Lucas", description: 'The name of the director of this film' })
  director: string;
  
  @ApiProperty({ example: "Gary Kurtz, Rick McCallum", description: 'The name(s) of the producer(s) of this film. Comma separated' })
  producer: string;
  
  @IsDate()
  @ApiProperty({ example: "1977-05-25", description: 'The ISO 8601 date format of film release at original creator country' })
  release_date: Date;
  
  @ApiProperty({ example: ["https://localhost:3000/api/species/2/"], description: 'An array of species resource URLs that are in this film' })
  species: string[];
  
  @ApiProperty({ example: ["https://localhost:3000/api/starships/12/"], description: 'An array of starship resource URLs that are in this film' })
  starships: string[];
  
  @ApiProperty({ example: ["https://localhost:3000/api/vehicles/14/"], description: 'An array of vehicle resource URLs that are in this film' })
  vehicles: string[];
  
  @ApiProperty({ example: ["https://localhost:3000/api/people/1/"], description: 'An array of people resource URLs that are in this film' })
  characters: string[];
  
  @ApiProperty({ example: ["https://localhost:3000/api/planets/1/"], description: 'An array of planet resource URLs that are in this film' })
  planets: string[];
  
  @ApiProperty({ example: "https://localhost:3000/api/films/1/", description: 'the hypermedia URL of this resource' })
  url: string;
  
  // @ApiProperty({ example: "2014-12-10T14:23:31.880000Z", description: 'the ISO 8601 date format of the time that this resource was created'})
  // created: string;
  
  // @ApiProperty({ example: "2014-12-12T11:24:39.858000Z", description: 'the ISO 8601 date format of the time that this resource was edited' })
  // edited: string;
}
