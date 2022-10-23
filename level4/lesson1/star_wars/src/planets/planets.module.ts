import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Planets } from './entities/planet.entity';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';
import { StarshipsModule } from '../starships/starships.module';
import { SpeciesModule } from '../species/species.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [forwardRef(() => PeopleModule), forwardRef(() => FilmsModule), forwardRef(() => StarshipsModule), forwardRef(() => SpeciesModule), forwardRef(() => VehiclesModule), forwardRef(() => ImagesModule), TypeOrmModule.forFeature([Planets])],
  exports: [TypeOrmModule],
  controllers: [PlanetsController],
  providers: [PlanetsService]
})
export class PlanetsModule {}
