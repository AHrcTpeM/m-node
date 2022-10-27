import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFilmDto } from './dto/create-film.dto';
import { Films } from './entities/film.entity';
import { People } from './../people/entities/people.entity';
import { Starships } from './../starships/entities/starship.entity';
import { Planets } from './../planets/entities/planet.entity';
import { Species } from './../species/entities/species.entity';
import { Vehicles } from '../vehicles/entities/vehicle.entity';
import { ImagesService } from '../images/images.service';
import { FileUploadDto } from '../images/dto/create-image.dto';

@Injectable()
export class FilmsService {
  private readonly propsRelations: string[];

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
    private readonly vehiclesRepository: Repository<Vehicles>,

    private readonly imagesService: ImagesService
  ) {
    this.propsRelations = ['characters', 'species', 'starships', 'vehicles', 'planets', 'images'];
  }

  async create(createfilmsDto: CreateFilmDto): Promise<Films> {
    const resources = [this.peopleRepository, this.speciesRepository, this.starshipsRepository, this.vehiclesRepository, this.planetsRepository];

    let films = new Films();
    
    for (let key in createfilmsDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      films[key] = this.propsRelations.includes(key) ? [] : createfilmsDto[key];
    }
    await this.filmsRepository.save(films).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }); // обнуляем связи, что бы не было ошибки дублирования внешних ключей

    for (let i = 0; i < this.propsRelations.length - 1; i++) {
      createfilmsDto[this.propsRelations[i]]?.forEach(async (elem) => {        
        const person = await resources[i].findOneBy({ url: elem });
        if (person) {
          films[this.propsRelations[i]].push(person);
        }        
      })
    }
    return this.filmsRepository.save(films).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(): Promise<CreateFilmDto[]> {
    return this.filmsRepository.find({ 
      relations: this.propsRelations,
      relationLoadStrategy: 'query'
    })
    .then(array => {
      return array.map((person) => {
        let films: CreateFilmDto = new CreateFilmDto();
        for (let key in person) {
          films[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
        }
        return films;
      })
    })
  }

  async findOne(name: string): Promise<CreateFilmDto> {
    return this.filmsRepository.findOne({ 
      relations: this.propsRelations,
      relationLoadStrategy: 'query',
      where: { title: name }
    })
    .then(person => {
      if (person) {
        let films: CreateFilmDto = new CreateFilmDto();
        for (let key in person) {
          films[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
        }
        return films;
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }        
    })
  }

  async remove(name: string): Promise<{ name: string; deleted: string; }> {
    const person = await this.filmsRepository.findOne({ 
      relations: ['images'],
      relationLoadStrategy: 'query',
      where: { title: name }
    });          

    if (person) {
      this.imagesService.deleteFiles(person.images.map((img) => img.url)); 
      this.propsRelations.forEach((obj) => person[obj] = []);
      await this.filmsRepository.save(person); // зануляем все связи ManyToMany и сохраняем, произойдет их удаление
    }

    return this.filmsRepository.delete(name)
    .then((result) => {
      if (result.affected) {
        return {name, deleted: 'success'};
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }      
    })
    .catch((err) => err)
  }  

//   async create(createFilmDto: CreateFilmDto): Promise<Films> {
//     let films = new Films();
//     for (let key in createFilmDto) {
//       films[key] = createFilmDto[key];
//     }
//     //films = {...createFilmDto};
//     const resources = [{'characters': this.peopleRepository}, {'starships': this.starshipsRepository}, 
//                        {'planets': this.planetsRepository}, {'species': this.speciesRepository},
//                        {'films': this.filmsRepository}];
//     resources.forEach((obj) => films[Object.keys(obj)[0]] = [])

//     await this.filmsRepository.save(films);

//     resources.forEach((obj) => {
//       createFilmDto[Object.keys(obj)[0]]?.forEach(async (elem) => {
//         const film = await Object.values(obj)[0].findOneBy({ url: elem });
//         if (film) {
//           films[Object.keys(obj)[0]].push(film);
//         }
//     })

// })
//     return this.filmsRepository.save(films);
//   }

//   async findAll(): Promise<Films[]> {
//     return await this.filmsRepository.find({
//       relations: ['characters', 'species', 'starships', 'films', 'planets'],
//       relationLoadStrategy: 'query',
//       select: {
//         ...Films,
//         characters: {
//           name: true,
//           url: true
//         },
//         species: {
//           name: true,
//           url: true
//         },
//         starships: {
//           name: true,
//           url: true
//         },
//         films: {
//           name: true,
//           url: true
//         },
//         planets: {
//           name: true,
//           url: true
//         }        
//       }
//     });
//   }

//   findOne(title: string): Promise<Films> {
//     return this.filmsRepository.findOne({ 
//       relations: ['characters', 'species', 'starships', 'films', 'planets'],
//       relationLoadStrategy: 'query',
//       select: {
//         ...Films,
//         characters: {
//           name: true,
//           url: true
//         },
//         species: {
//           name: true,
//           url: true
//         },
//         starships: {
//           name: true,
//           url: true
//         },
//         films: {
//           name: true,
//           url: true
//         },
//         planets: {
//           name: true,
//           url: true
//         }        
//       }, 
//       where: {
//         title: title
//       }
//     });
//   }

//   async remove(title: string): Promise<void> {
//     await this.filmsRepository.delete(title);
//   }  


  async uploadFile(fileUploadDto: FileUploadDto): Promise<Films> {
    return await this.imagesService.uploadFile('films', fileUploadDto, Films);
  }  

  async deleteImage(name: string, image?: string) {
    return await this.imagesService.deleteImage('films', name, image);    
  }

  async uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    return await this.imagesService.uploadFileS3('films', file, fileUploadDto, Films);
  }  

  async deleteFileS3(name: string, key: string) {
    return await this.imagesService.deleteFileS3('films', name, key);
  }
}
