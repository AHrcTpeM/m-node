import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty, ArrayContains } from 'class-validator';

export class CreatePeopleDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Luke Skywalker", description: 'The name of this person' })
  name: string;
  
  @IsNumberString()
  @ApiProperty({ example: "172", description: 'The height of the person in centimeters' })
  height: string;

  @IsNumberString()
  @ApiProperty({ example: "77", description: 'The mass of the person in kilograms' })
  mass: string;
  
  @ApiProperty({ example: "blond", description: 'The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair' })
  hair_color: string;
  
  @ApiProperty({ example: "fair", description: 'The skin color of this person' })
  skin_color: string;
  
  @ApiProperty({ example: "blue", description: 'The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye' })
  eye_color: string;
  
  @ApiProperty({ example: "19BBY", description: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope' })
  birth_year: string;
  
  @ApiProperty({ example: "male", description: 'The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender' })
  gender: string;
  
  @ApiProperty({ example: "https://localhost:3000/api/planets/1/", description: 'The URL of a planet resource, a planet that this person was born on or inhabits' })
  homeworld: string;
  
  @ApiProperty({ example: ["https://localhost:3000/api/films/1/", "https://localhost:3000/api/films/2/"], description: 'An array of film resource URLs that this person has been in'})
  films: string[];
  
  @ApiProperty({ example: ["https://localhost:3000/api/species/2/"], description: 'An array of species resource URLs that this person belongs to' })
  species: string[];
  
  @ApiProperty({ example: ["https://localhost:3000/api/vehicles/14/"], description: 'An array of vehicle resource URLs that this person has piloted' })
  vehicles: string[];
  
  @ApiProperty({ example: ["https://localhost:3000/api/starships/12/"], description: 'An array of starship resource URLs that this person has piloted' })
  starships: string[];
  
  @ApiProperty({ example: ["https://localhost:3000/api/planets/1/"], description: 'An array of planet resource URLs that are in this film' })
  planets: string[];
  
  // @ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: 'the ISO 8601 date format of the time that this resource was created'})
  // created: string;
  
  // @ApiProperty({ example: "2014-12-20T21:17:56.891000Z", description: 'the ISO 8601 date format of the time that this resource was edited' })
  // edited: string;
  
  @ApiProperty({ example: "http://localhost:3000/people/1/", description: 'the hypermedia URL of this resource' })
  url: string;
  
  // @ApiProperty({ example: [], description: 'image of this resource' })
  //image?: string[];
}