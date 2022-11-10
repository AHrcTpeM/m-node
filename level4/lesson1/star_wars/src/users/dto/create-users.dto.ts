import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUsersDto {
    @IsNotEmpty()    
    @ApiProperty({ example: "admin", description: 'Login of user' })
    username: string;
  
    @IsNotEmpty()    
    @ApiProperty({ example: "admin", description: 'Password of user' })
    password: string;
}