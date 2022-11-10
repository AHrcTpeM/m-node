import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsDate, IsString } from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "A New Hope", description: 'The title of this film' })
  title: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 4, description: 'The episode number of this film' })
  episode_id: number;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "It is a period of civil war.\n\nRebel spaceships, striking\n\nfrom a hidden base, have won\n\ntheir first victory against\n\nthe evil Galactic Empire.", description: 'The opening paragraphs at the beginning of this film' })
  opening_crawl: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "George Lucas", description: 'The name of the director of this film' })
  director: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Gary Kurtz, Rick McCallum", description: 'The name(s) of the producer(s) of this film. Comma separated' })
  producer: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "1977-05-25", description: 'The ISO 8601 date format of film release at original creator country' })
  release_date: string;
  
  @ApiProperty({ example: ["http://localhost:3000/species/2/"], description: 'An array of species resource URLs that are in this film' })
  species: string[];
  
  @ApiProperty({ example: ["http://localhost:3000/starships/12/"], description: 'An array of starship resource URLs that are in this film' })
  starships: string[];
  
  @ApiProperty({ example: ["http://localhost:3000/vehicles/14/"], description: 'An array of vehicle resource URLs that are in this film' })
  vehicles: string[];
  
  @ApiProperty({ example: ["http://localhost:3000/people/1/"], description: 'An array of people resource URLs that are in this film' })
  characters: string[];
  
  @ApiProperty({ example: ["http://localhost:3000/planets/1/"], description: 'An array of planet resource URLs that are in this film' })
  planets: string[];
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "http://localhost:3000/films/1/", description: 'the hypermedia URL of this resource' })
  url: string;
}
