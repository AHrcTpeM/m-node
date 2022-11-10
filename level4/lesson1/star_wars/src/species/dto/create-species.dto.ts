import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateSpeciesDto {    
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Wookie", description: 'The name of this species' })
  name: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Mammal", description: 'The classification of this species, such as "mammal" or "reptile"' })
  classification: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Sentient", description: 'The designation of this species, such as "sentient"' })
  designation: string;
  
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: "2.1", description: 'The average height of this species in centimeters' })
  average_height: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "400", description: 'The average lifespan of this species in years' })
  average_lifespan: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "blue, green, yellow, brown, golden, red", description: 'A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes' })
  eye_color: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "black, brown", description: 'A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair' })
  hair_colors: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "gray", description: 'A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin' })
  skin_colors: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Shyriiwook", description: 'The language commonly spoken by this species' })
  language: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "http://localhost:3000/planets/14/", description: 'The URL of a planet resource, a planet that this species originates from'})
  homeworld: string;
  
  @ApiProperty({ example: ["http://localhost:3000/people/13/"], description: 'An array of People URL Resources that are a part of this species' })
  people: string[];
  
  @ApiProperty({ example: ["http://localhost:3000/films/1/", "http://localhost:3000/films/2/"], description: 'An array of Film URL Resources that this species has appeared in'})
  films: string[];
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "http://localhost:3000/species/1/", description: 'the hypermedia URL of this resource' })
  url: string;
}
