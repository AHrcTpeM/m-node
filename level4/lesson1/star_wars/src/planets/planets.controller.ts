import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planets } from './entities/planet.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto): Promise<Planets> {
    return this.planetsService.create(createPlanetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Planets[]> {
    return this.planetsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  findOne(@Param('name') name: string): Promise<Planets> {
    return this.planetsService.findOne(name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':name')
  remove(@Param('name') name: string): Promise<void> {
    return this.planetsService.remove(name);
  }
}
