import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';

class RepositoryFake {
    public async save(): Promise<void> {}
    public async findOneBy(): Promise<void> {}
}

describe('UsersService', () => {
    let service: UsersService;
    let usersRepositorySpy: Repository<Users>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ UsersService,
          {
            provide: getRepositoryToken(Users),
            useClass: RepositoryFake,
          },
         ],
      }).compile();
  
      service = module.get<UsersService>(UsersService);
      usersRepositorySpy = module.get(getRepositoryToken(Users));
    })
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should call createUser method with expected params', async () => {
        const username = 'username';
        const password = 'password';
        const usersRepositorySaveSpy = jest.spyOn(usersRepositorySpy, 'save');
        await service.createUser(username, password);
        expect(usersRepositorySaveSpy).toHaveBeenCalledWith({ username, password });
    });
    
    it('should call findOne method with expected params', async () => {
        const username = 'username';
        const usersRepositoryFindOneBySpy = jest.spyOn(usersRepositorySpy, 'findOneBy');
        await service.findOne(username);
        expect(usersRepositoryFindOneBySpy).toHaveBeenCalledWith({username});
    });

    it('should call addRoleAdmin method with expected params', async () => {
        const user = new Users();
        const usersRepositorySaveSpy = jest.spyOn(usersRepositorySpy, 'save');
        await service.addRoleAdmin(user);
        expect(usersRepositorySaveSpy).toHaveBeenCalledWith(user);
    });
})