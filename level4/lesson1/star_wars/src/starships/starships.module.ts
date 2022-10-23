import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { Starships } from './entities/starship.entity';
import { PlanetsModule } from '../planets/planets.module';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { SpeciesModule } from '../species/species.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [forwardRef(() => PeopleModule), forwardRef(() => FilmsModule), forwardRef(() => PlanetsModule), forwardRef(() => SpeciesModule), forwardRef(() => VehiclesModule), forwardRef(() => ImagesModule), TypeOrmModule.forFeature([Starships])],
  exports: [TypeOrmModule],
  controllers: [StarshipsController],
  providers: [StarshipsService]
})
export class StarshipsModule {}
