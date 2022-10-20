import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiConsumes, ApiProperty } from '@nestjs/swagger';

import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starships } from './entities/starship.entity';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto): Promise<Starships> {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get()
  findAll(): Promise<Starships[]> {
    return this.starshipsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<Starships> {
    return this.starshipsService.findOne(name);
  }

  @Delete(':name')
  remove(@Param('name') name: string): Promise<void> {
    return this.starshipsService.remove(name);
  }
}
