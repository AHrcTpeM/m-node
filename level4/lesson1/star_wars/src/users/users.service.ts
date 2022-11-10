import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { Role } from '../auth/roles/role.enum'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createUser(username: string, password: string): Promise<Users> {
    const user = { username, password };
    return await this.usersRepository.save(user).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  async findOne(username: string): Promise<Users | undefined> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addRoleAdmin(user: Users): Promise<Users> {
    return this.usersRepository.save(user);
  }
}