import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Films } from './entities/film.entity';
import { People } from './../people/entities/people.entity';
import { Starships } from './../starships/entities/starship.entity';
import { Planets } from './../planets/entities/planet.entity';
import { Species } from './../species/entities/species.entity';
import { Vehicles } from './../vehicles/entities/vehicle.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,

    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,

    @InjectRepository(Starships)
    private readonly starshipsRepository: Repository<Starships>,

    @InjectRepository(Planets)
    private readonly planetsRepository: Repository<Planets>,

    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,

    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<Films> {
    let films = new Films();
    for (let key in createFilmDto) {
      films[key] = createFilmDto[key];
    }
    //films = {...createFilmDto};
    const resources = [{'characters': this.peopleRepository}, {'starships': this.starshipsRepository}, 
                       {'planets': this.planetsRepository}, {'species': this.speciesRepository},
                       {'vehicles': this.vehiclesRepository}];
    resources.forEach((obj) => films[Object.keys(obj)[0]] = [])

    await this.filmsRepository.save(films);

    resources.forEach((obj) => {
      createFilmDto[Object.keys(obj)[0]]?.forEach(async (elem) => {
        const film = await Object.values(obj)[0].findOneBy({ url: elem });
        if (film) {
          films[Object.keys(obj)[0]].push(film);
        }
    })

})
    return this.filmsRepository.save(films);
  }

  async findAll(): Promise<Films[]> {
    return await this.filmsRepository.find({
      relations: ['characters', 'species', 'starships', 'vehicles', 'planets'],
      relationLoadStrategy: 'query',
      select: {
        ...Films,
        characters: {
          name: true,
          url: true
        },
        species: {
          name: true,
          url: true
        },
        starships: {
          name: true,
          url: true
        },
        vehicles: {
          name: true,
          url: true
        },
        planets: {
          name: true,
          url: true
        }        
      }
    });
  }

  findOne(title: string): Promise<Films> {
    return this.filmsRepository.findOne({ 
      relations: ['characters', 'species', 'starships', 'vehicles', 'planets'],
      relationLoadStrategy: 'query',
      select: {
        ...Films,
        characters: {
          name: true,
          url: true
        },
        species: {
          name: true,
          url: true
        },
        starships: {
          name: true,
          url: true
        },
        vehicles: {
          name: true,
          url: true
        },
        planets: {
          name: true,
          url: true
        }        
      }, 
      where: {
        title: title
      }
    });
  }

  async remove(title: string): Promise<void> {
    await this.filmsRepository.delete(title);
  }  
}
