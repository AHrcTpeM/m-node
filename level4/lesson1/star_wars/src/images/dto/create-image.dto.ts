import { ApiProperty } from "@nestjs/swagger";

export class FilesUploadDto {
  @ApiProperty({ example: "Luke Skywalker", description: 'The name of this person' })
  name: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];

  images: string[];
}

export class FileUploadDto {
  @ApiProperty({ example: "Luke Skywalker", description: 'The name of this person' })
  name: string;

  @ApiProperty({ type: 'file', items: { type: 'string', format: 'binary' } })
  files: any;

  images: string[];
}