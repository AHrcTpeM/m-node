import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People } from './entities/people.entity';
import { FilmsModule } from './../films/films.module';
import { StarshipsModule } from './../starships/starships.module';
import { PlanetsModule } from './../planets/planets.module';
import { SpeciesModule } from './../species/species.module';
import { VehiclesModule } from './../vehicles/vehicles.module';
import { ImagesModule } from '../images/images.module';

@Module({  
  imports: [ 
    TypeOrmModule.forFeature([People]),
    forwardRef(() => FilmsModule), 
    forwardRef(() => PlanetsModule), 
    forwardRef(() => StarshipsModule),     
    forwardRef(() => SpeciesModule), 
    forwardRef(() => VehiclesModule), 
    forwardRef(() => ImagesModule)
  ],
  exports: [TypeOrmModule],
  controllers: [PeopleController],
  providers: [PeopleService,
  // {
  //   provide: APP_GUARD,
  //   useClass: RolesGuard,
  // },
]
})
export class PeopleModule {}
