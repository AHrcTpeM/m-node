import { CreatePeopleDto } from "../dto/create-people.dto";
export interface PeoplePaginate {
    "count": number;
    "next": string | null;
    "previous": string | null;
    "results": CreatePeopleDto[];
}
export declare class UserPassword {
    username: string;
    password: string;
}
