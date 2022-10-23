import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicles } from './entities/vehicle.entity';
import { PlanetsModule } from '../planets/planets.module';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { SpeciesModule } from '../species/species.module';
import { ImagesModule } from '../images/images.module';
import { StarshipsModule } from '../starships/starships.module';

@Module({
  imports: [forwardRef(() => PeopleModule), forwardRef(() => FilmsModule), forwardRef(() => StarshipsModule), forwardRef(() => SpeciesModule), forwardRef(() => PlanetsModule), forwardRef(() => ImagesModule), TypeOrmModule.forFeature([Vehicles])],
  exports: [TypeOrmModule],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule {}
