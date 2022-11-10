import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "Sand Crawler", description: 'The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike"' })
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "Digger Crawler", description: 'The model or official name of this vehicle. Such as "All-Terrain Attack Transport"' })
    model: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "wheeled", description: 'The class of this vehicle, such as "Wheeled" or "Repulsorcraft"' })
    vehicle_class: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "Corellia Mining Corporation", description: 'The manufacturer of this vehicle. Comma separated if more than one' })
    manufacturer: string;
    
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ example: "36.8", description: 'The length of this vehicle in meters' })
    length: string;
    
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ example: "150000", description: 'The cost of this vehicle new, in Galactic Credits' })
    cost_in_credits: string;
    
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ example: "46", description: 'The number of personnel needed to run or pilot this vehicle' })
    crew: string;
    
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ example: "30", description: 'The number of non-essential people this vehicle can transport' })
    passengers: string;
    
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ example: "30", description: 'The maximum speed of this vehicle in the atmosphere' })
    max_atmosphering_speed: string;
    
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ example: "50000", description: 'The maximum number of kilograms that this vehicle can transport' })
    cargo_capacity: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "2 months", description: 'The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply' })
    consumables: string;
    
    @ApiProperty({ example: ["http://localhost:3000/films/1/", "http://localhost:3000/films/2/"], description: 'An array of film resource URLs that this person has been in'})
    films: string[];
    
    @ApiProperty({ example: ["http://localhost:3000/people/2/"], description: 'An array of People URL Resources that this vehicle has been piloted by' })
    pilots: string[];
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "http://localhost:3000/vehicles/1/", description: 'the hypermedia URL of this resource' })
    url: string;
}
