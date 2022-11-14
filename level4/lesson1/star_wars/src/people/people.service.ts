import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePeopleDto } from './dto/create-people.dto';
import { People } from './entities/people.entity';
import { PaginateType } from './interfaces/interface';
import { Films } from '../films/entities/film.entity';
import { Starships } from '../starships/entities/starship.entity';
import { Planets } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicles } from '../vehicles/entities/vehicle.entity';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { UpdatePeopleDto } from './dto/update-people.dto';


@Injectable()
export class PeopleService {
  private readonly propsRelations: string[];

  constructor(    
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,

    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,

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
    this.propsRelations = ['films', 'species', 'starships', 'vehicles', 'images'];
  }

  async create(createPeopleDto: CreatePeopleDto): Promise<People> {
    const resources = [this.filmsRepository, this.speciesRepository, this.starshipsRepository, this.vehiclesRepository, this.planetsRepository];

    const existsPeople = await this.peopleRepository.findOne({where: {name: createPeopleDto.name}});
    if (existsPeople) throw new HttpException("Person already exists", HttpStatus.FORBIDDEN);
    let people = new People();
    
    for (let key in createPeopleDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      people[key] = this.propsRelations.includes(key) ? [] : createPeopleDto[key];
    }
    
    people.homeworld = createPeopleDto['homeworld'] ?
                        await this.planetsRepository.findOne({where :{ url:  createPeopleDto['homeworld'] }}) :
                        null;
    
    await Promise.all(this.propsRelations.map(async (key) => {
      if (!createPeopleDto[key]) {
         people[key] = [];
      } else {
        await Promise.all(createPeopleDto[key].map(async (elem) => {        
          const person = await resources[this.propsRelations.indexOf(key)].findOneBy({ url: elem });
          if (person) {
            people[key].push(person);
          }
        }))
      }
    }))
    return this.peopleRepository.save(people).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  async update(updatePeopleDto: UpdatePeopleDto) {
    const resources = [this.filmsRepository, this.speciesRepository, this.starshipsRepository, this.vehiclesRepository, this.planetsRepository];

    const people = await this.peopleRepository.findOneBy({name: updatePeopleDto.name});
    if (!people) throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
    
    for (let key in updatePeopleDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      people[key] = this.propsRelations.includes(key) ? [] : updatePeopleDto[key]; // зануляем только те которые передаем!
    }
    await this.peopleRepository.save(people);

    people.homeworld = updatePeopleDto['homeworld'] ?
                        await this.planetsRepository.findOne({where :{ url:  updatePeopleDto['homeworld'] }}) :
                        null;
                        
    await Promise.all(this.propsRelations.map(async (key) => {
      if (updatePeopleDto[key]) {
        await Promise.all(updatePeopleDto[key].map(async (elem) => {        
          const person = await resources[this.propsRelations.indexOf(key)].findOneBy({ url: elem });
          if (person) {
            people[key].push(person);
          }
        }))
      }
    }))
    return this.peopleRepository.save(people).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(page: number): Promise<PaginateType<CreatePeopleDto>> {
    const numPage = page < 1 ? 1 : page;
    const count = await this.peopleRepository.count();
    const topPage = Math.floor(count / 10);

    const peoplePag: PaginateType<CreatePeopleDto> = {
      count,
      next: numPage > topPage ? null:  `http://localhost:3000/people/?page=${numPage + 1}`,
      previous: numPage < 2 ? null: `http://localhost:3000/people/?page=${numPage - 1}`,
      results: await this.peopleRepository.find({
        skip: (numPage - 1) * 10,
        take: 10,
        relations: [...this.propsRelations, 'homeworld'],
        relationLoadStrategy: 'query', 
      })
      .then(array => {
        return array.map((person) => {
          let people: CreatePeopleDto = new CreatePeopleDto();
          for (let key in person) {
            people[key] = this.propsRelations.includes(key) && person[key] ? 
                          person[key].map((elem) => elem.url) : 
                          key !== 'homeworld'? person[key] : person[key]?.url;
          }
          return people;
        })
      })         // из связанных сущностей this.propsRelations выбираем только одно свойство Url
    }
    return peoplePag;
  }

  findOne(name: string): Promise<People> {
    const url =  `http://${process.env.HOST}:${process.env.PORT}/people/${+name}/`;
    return this.peopleRepository.findOne({ 
      relations: [...this.propsRelations, 'homeworld'],
      relationLoadStrategy: 'query',
      where: [{ name }, { url }]
    })
    .then(person => {
        if (person) {
          return person;
        } else {
          throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
        }        
    })
  }

  async remove(name: string): Promise<{ name: string; deleted: string; }> {
    const person = await this.peopleRepository.findOne({ 
      relations: ['images'],
      relationLoadStrategy: 'query',
      where: { name }
    });
    if (person) {
      this.imagesService.deleteFiles(person.images.map((img) => img.url)); 
      this.propsRelations.forEach((obj) => person[obj] = []);
      await this.peopleRepository.save(person); // зануляем все связи ManyToMany и сохраняем, произойдет их удаление
    }

    return this.peopleRepository.delete(name)
    .then((result) => {
      if (result.affected) {
        return {name, deleted: 'success'};
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }      
    })
    .catch((err) => err)
  }

  async uploadFile(fileUploadDto: FileUploadDto): Promise<People> {
    return await this.imagesService.uploadFile('people', fileUploadDto, People);
  }  

  async deleteImage(name: string, image?: string) {
    return await this.imagesService.deleteImage('people', name, image);    
  }

  async uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    return await this.imagesService.uploadFileS3('people', file, fileUploadDto, People);
  }  

  async deleteFileS3(name: string, key: string) {
    return await this.imagesService.deleteFileS3('people', name, key);
  }

  // streamImage(image: string): StreamableFile {
  //   const file = createReadStream(join(process.cwd(), `files/${image}`)); // работает без Interceptor { data: users }
  //   return new StreamableFile(file);
  // }
}