import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    createUser(username: string, password: string): Promise<Users>;
    findOne(username: string): Promise<Users | undefined>;
    addRoleAdmin(user: Users): Promise<Users>;
}
