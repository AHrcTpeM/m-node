import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Users } from '../users/entities/user.entity';
import { UserPassword } from './../people/interfaces/interface';
import { CreateUsersDto } from './../users/dto/create-users.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: UserPassword })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/registr')
  @ApiBody({ type: CreateUsersDto })
  create(@Body(new ValidationPipe()) createUserDto: CreateUsersDto): Promise<Omit<Users, "password">> {
    //console.log(createUserDto);
    return this.authService.create(createUserDto);      
  }
  
  @ApiBearerAuth()
  @Get('auth/admin:name')
  @ApiParam({ name: "name", example: "user1", description: 'The name of this user' })
  @ApiOperation({ summary: 'Giving admin role' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  addAdmin(@Param('name') name: string): Promise<Users> {
    return this.authService.addAdmin(name);
  }
}
