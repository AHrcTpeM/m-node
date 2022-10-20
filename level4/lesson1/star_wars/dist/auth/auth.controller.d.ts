import { Users } from '../users/entities/user.entity';
import { CreateUsersDto } from './../users/dto/create-users.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    create(createUserDto: CreateUsersDto): Promise<Omit<Users, "password">>;
    addAdmin(name: string): Promise<Users>;
}
