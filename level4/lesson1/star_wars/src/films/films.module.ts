import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Films } from './entities/film.entity';
import { PeopleModule } from './../people/people.module';
import { StarshipsModule } from './../starships/starships.module';
import { PlanetsModule } from './../planets/planets.module';
import { SpeciesModule } from './../species/species.module';
import { VehiclesModule } from './../vehicles/vehicles.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [forwardRef(() => PeopleModule), forwardRef(() => StarshipsModule), forwardRef(() => PlanetsModule), forwardRef(() => SpeciesModule), forwardRef(() => VehiclesModule), forwardRef(() => ImagesModule), TypeOrmModule.forFeature([Films])],
  exports: [TypeOrmModule],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule {}
