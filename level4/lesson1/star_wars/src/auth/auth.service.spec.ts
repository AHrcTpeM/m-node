import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { Users } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Role } from './roles/role.enum';

describe('UsersService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    const ApiUsersProvider = {
      provide: UsersService,
      useFactory: () => ({
        findOne: jest.fn(() => { }),
        createUser: jest.fn(() => { }),
        addRoleAdmin: jest.fn(() => { }),
      })
    }
    // const ApiJwtProvider = {
    //   provide: JwtService,
    //   useFactory: () => ({
    //     sign: jest.fn(() => { }),
    //   })
    // }  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ AuthService, ApiUsersProvider, JwtService ],
      }).compile();
  
      service = module.get<AuthService>(AuthService);
      usersService = module.get<UsersService>(UsersService);
      jwtService = module.get<JwtService>(JwtService);      
    })
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should call validateUser method with expected params', async () => {
        const username = 'username';
        const password = 'password';
        const usersServiceFindOneSpy = jest.spyOn(usersService, 'findOne');
        expect(await service.validateUser(username, password)).toBeNull();
        expect(usersServiceFindOneSpy).toHaveBeenCalledWith(username);
    });
    
    it('should call login method with expected params', async () => {
      const access_token = 'access_token';
      const user = new Users();
      const jwtServiceSignSpy = jest.spyOn(jwtService, 'sign').mockReturnValue(access_token);
      expect(await service.login(user)).toEqual({access_token})
      expect(jwtServiceSignSpy).toHaveBeenCalled();
    });

    it('should call create method with expected params', async () => {
        const dto = new CreateUsersDto();
        dto.password = 'password';
        const user = new Users();
        user.password = 'password1';
        user.username = 'Luke';
        const usersServiceCreateUserSpy = jest
            .spyOn(usersService, 'createUser')
            .mockReturnValue(Promise.resolve(user));
        expect(await service.create(dto)).toEqual({username: user.username});
        expect(usersServiceCreateUserSpy).toHaveBeenCalled();
    });

    it('should call addAdmin method with expected params', async () => {
      const username = 'username';
      let user = new Users();
      const usersServiceFindOneSpy = jest.spyOn(usersService, 'findOne').mockReturnValue(Promise.resolve(user));
      const usersServiceAddRoleAdminSpy = await jest.spyOn(usersService, 'addRoleAdmin').mockReturnValue(Promise.resolve(user));
      expect(await service.addAdmin(username)).toEqual(user);
      expect(usersServiceFindOneSpy).toHaveBeenCalledWith(username);
      expect(usersServiceAddRoleAdminSpy).toHaveBeenCalled();      
  });
})