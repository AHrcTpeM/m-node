import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { Users } from '../users/entities/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    create(createUserDto: CreateUsersDto): Promise<Omit<Users, "password">>;
    addAdmin(username: string): Promise<Users>;
}
