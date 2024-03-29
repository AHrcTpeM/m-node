import { Module, forwardRef } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './entities/image.entity';
import { FilmsModule } from './../films/films.module';
import { StarshipsModule } from './../starships/starships.module';
import { PlanetsModule } from './../planets/planets.module';
import { SpeciesModule } from './../species/species.module';
import { VehiclesModule } from './../vehicles/vehicles.module';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Images]),
    forwardRef(() => FilmsModule), 
    forwardRef(() => PeopleModule), 
    forwardRef(() => StarshipsModule), 
    forwardRef(() => PlanetsModule), 
    forwardRef(() => SpeciesModule), 
    forwardRef(() => VehiclesModule), 
  ],
  exports: [TypeOrmModule, ImagesService],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
