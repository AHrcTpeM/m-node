import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Planets } from './entities/planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planets])],
  exports: [TypeOrmModule],
  controllers: [PlanetsController],
  providers: [PlanetsService]
})
export class PlanetsModule {}
