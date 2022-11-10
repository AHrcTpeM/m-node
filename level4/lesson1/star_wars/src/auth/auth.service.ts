import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare, genSalt }  from 'bcrypt';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { Users } from '../users/entities/user.entity';
import { Role } from './roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) return null;
    const match  = await compare(pass, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(createUserDto: CreateUsersDto): Promise<Omit<Users, "password">> {
    return hash(createUserDto.password, await genSalt()).then(async (hash) => {
      const user = await this.usersService.createUser(createUserDto.username, hash);
      const { password, ...result } = user;
      return result;
    });
  }

  async addAdmin(username: string): Promise<Omit<Users, "password">> {
    let user = await this.usersService.findOne(username);
    user.roles = Role.Admin;
    user = await this.usersService.addRoleAdmin(user);
    const { password, ...result } = user;
    return result;
  }
}