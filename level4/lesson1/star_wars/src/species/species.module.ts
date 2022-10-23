import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { Species } from './entities/species.entity';
import { PlanetsModule } from '../planets/planets.module';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [forwardRef(() => PeopleModule), forwardRef(() => FilmsModule), forwardRef(() => StarshipsModule), forwardRef(() => PlanetsModule), forwardRef(() => VehiclesModule), forwardRef(() => ImagesModule), TypeOrmModule.forFeature([Species])],
  exports: [TypeOrmModule],
  controllers: [SpeciesController],
  providers: [SpeciesService]
})
export class SpeciesModule {}
