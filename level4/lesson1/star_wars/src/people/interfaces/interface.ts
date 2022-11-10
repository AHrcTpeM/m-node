import { ApiProperty } from "@nestjs/swagger";

export class PaginateType<Dto> {
	@ApiProperty({ example: 82 })
    count: number;
	@ApiProperty({ example: 'http://localhost:3000/people/?page=3' })
	next: string | null;
	@ApiProperty({ example: 'http://localhost:3000/people/?page=1' })
	previous: string | null;
	
	results: Dto[]
}