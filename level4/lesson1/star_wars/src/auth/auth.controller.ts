import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiProperty, ApiOkResponse } from '@nestjs/swagger';
import { Users } from '../users/entities/user.entity';
import { CreateUsersDto } from './../users/dto/create-users.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';
import { InfoDto, TokenDto } from './roles/auth';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: CreateUsersDto })
  @ApiOkResponse({type: TokenDto})
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'User information' })
  @ApiOkResponse({type: InfoDto})
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/registr')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: CreateUsersDto })
  @ApiResponse({status: 201, type: InfoDto})
  create(@Body(new ValidationPipe()) createUserDto: CreateUsersDto): Promise<Omit<Users, "password">> {
    return this.authService.create(createUserDto);      
  }
  
  @ApiBearerAuth()
  @Get('auth/admin:name')
  @ApiParam({ name: "name", example: "user1", description: 'The name of this user' })
  @ApiOperation({ summary: 'Giving admin role' })
  @ApiOkResponse({type: InfoDto})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  addAdmin(@Param('name') name: string): Promise<Omit<Users, "password">> {
    return this.authService.addAdmin(name);
  }
}
