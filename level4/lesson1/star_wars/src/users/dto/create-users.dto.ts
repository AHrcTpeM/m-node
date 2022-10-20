import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUsersDto {
    @IsNotEmpty()    
    @ApiProperty({ example: "Skywalker", description: 'Login of user' })
    username: string;
  
    @IsNotEmpty()    
    @ApiProperty({ example: "pass1234", description: 'Password of user' })
    password: string;
}