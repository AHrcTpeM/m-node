import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cC...',
    description: 'Access token',
  })
  accessToken: string;
}

export class InfoDto {
  @ApiProperty({example: 1})
  userId: number;

  @ApiProperty({example: 'BigBoss'})
  username: string;

  @ApiProperty({example: 'user'})
  roles: string;
}