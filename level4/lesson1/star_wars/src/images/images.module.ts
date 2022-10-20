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
  imports: [forwardRef(() => FilmsModule), forwardRef(() => PeopleModule), StarshipsModule, PlanetsModule, SpeciesModule, VehiclesModule, ImagesModule, 
  TypeOrmModule.forFeature([Images])],
  exports: [TypeOrmModule, ImagesService],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
