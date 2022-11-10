import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreatePlanetDto {    
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Tatooine", description: 'The name of this planet' })
  name: string;
  
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: "10465", description: 'The diameter of this planet in kilometers' })
  diameter: string;
  
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: "23", description: 'The number of standard hours it takes for this planet to complete a single rotation on its axis' })
  rotation_period: string;
  
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: "304", description: 'The number of standard days it takes for this planet to complete a single orbit of its local star' })
  orbital_period: string;
  
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: "1", description: 'A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs' })
  gravity: string;
  
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: "120000", description: 'The average population of sentient beings inhabiting this planet' })
  population: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Arid", description: 'The climate of this planet. Comma separated if diverse' })
  climate: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Dessert", description: 'The terrain of this planet. Comma separated if diverse' })
  terrain: string;
  
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: "1", description: 'The percentage of the planet surface that is naturally occurring water or bodies of water' })
  surface_water: string;
  
  @ApiProperty({ example: ["http://localhost:3000/films/1/", "http://localhost:3000/films/2/"], description: 'An array of Film URL Resources that this planet has appeared in'})
  films: string[];
  
  @ApiProperty({ example: ["http://localhost:3000/people/1/"], description: 'An array of People URL Resources that live on this planet' })
  residents: string[];
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "http://localhost:3000/planets/1/", description: 'the hypermedia URL of this resource' })
  url: string;
}
