import { ApiProperty } from "@nestjs/swagger";
import { CreatePeopleDto } from "../dto/create-people.dto";
import { People } from "../entities/people.entity";

export interface PeoplePaginate {
    "count": number,
	"next": string | null,
	"previous": string | null,
	"results": CreatePeopleDto[]
}

export class UserPassword {
	@ApiProperty({ example: "john", description: 'the hypermedia URL of this resource' })
	username: string;

	@ApiProperty({ example: "changeme", description: 'the hypermedia URL of this resource' })
	password: string
}