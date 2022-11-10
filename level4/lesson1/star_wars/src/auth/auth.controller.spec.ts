import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let spyService: AuthService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => { }),
        getProfile: jest.fn(() => { }),
        create: jest.fn(() => { }),
        addAdmin: jest.fn(() => { }),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [ApiServiceProvider],
    }).compile();

    controller = app.get<AuthController>(AuthController);
    spyService = app.get<AuthService>(AuthService);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("calling login method", () => {
    const req = new CreateUsersDto();
    controller.login(req);
    expect(spyService.login).toHaveBeenCalled();
  })

  it("calling getProfile method", () => {
    const user = 'Luke';
    const req = {user};
    expect(controller.getProfile(req)).toBe(user);
  })

  it("calling create method", () => {
    const dto = new CreateUsersDto();
    controller.create(dto);
    expect(spyService.create).toHaveBeenCalledWith(dto);
  })

  it("calling addAdmin method", () => {
    const name = 'Luke';
    controller.addAdmin(name);
    expect(spyService.addAdmin).toHaveBeenCalledWith(name);
  })
});