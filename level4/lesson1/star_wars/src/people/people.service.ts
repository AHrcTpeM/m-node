import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';

import { CreatePeopleDto } from './dto/create-people.dto';
import { People } from './entities/people.entity';
import { PeoplePaginate } from './interfaces/interface';
import { Films } from './../films/entities/film.entity';
import { Starships } from './../starships/entities/starship.entity';
import { Planets } from './../planets/entities/planet.entity';
import { Species } from './../species/entities/species.entity';
import { Vehicles } from './../vehicles/entities/vehicle.entity';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { Images } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';


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

    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,

    private readonly imagesService: ImagesService
  ) {
    this.propsRelations = ['films', 'species', 'starships', 'vehicles', 'planets', 'images'];
  }

  async create(createPeopleDto: CreatePeopleDto): Promise<People> {
    const resources = [this.filmsRepository, this.speciesRepository, this.starshipsRepository, this.vehiclesRepository, this.planetsRepository];

    let people = new People();
    
    for (let key in createPeopleDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      people[key] = this.propsRelations.includes(key) ? [] : createPeopleDto[key];
    }
    // people.films = [];
    // people.starships = [];
    // people.planets = [];
    // people.species = [];
    // people.vehicles = [];
    await this.peopleRepository.save(people); // обнуляем связи, что бы не было ошибки дублирования внешних ключей

    for (let i = 0; i < this.propsRelations.length - 1; i++) {
      createPeopleDto[this.propsRelations[i]]?.forEach(async (elem) => {        
        const person = await resources[i].findOneBy({ url: elem });
        if (person) {
          people[this.propsRelations[i]].push(person);
        }        
      })
    }
    // for (let j = 0; j < createPeopleDto.films?.length || 0; j++) {
    //   people.films.push(await this.filmsRepository.findOneBy({ url: createPeopleDto.films[j] }));
    // }
    // for (let j = 0; j < createPeopleDto.starships?.length || 0; j++) {
    //   people.starships.push(await this.starshipsRepository.findOneBy({ url: createPeopleDto.starships[j] }));
    // }
    // for (let j = 0; j < createPeopleDto.planets?.length || 0; j++) {
    //   people.planets.push(await this.planetsRepository.findOneBy({ url: createPeopleDto.planets[j] }));
    // }
    // for (let j = 0; j < createPeopleDto.species?.length || 0; j++) {
    //   people.species.push(await this.speciesRepository.findOneBy({ url: createPeopleDto.species[j] }));
    // }
    // for (let j = 0; j < createPeopleDto.vehicles?.length || 0; j++) {
    //   people.vehicles.push(await this.vehiclesRepository.findOneBy({ url: createPeopleDto.vehicles[j] }));
    // }     
    return this.peopleRepository.save(people);
  }

  async findAll(page: number): Promise<PeoplePaginate> {
    const numPage = page < 1 ? 1 : page;
    const count = await this.peopleRepository.count();
    const topPage = Math.floor(count / 10);

    const peoplePag: PeoplePaginate = {
      count,
      next: numPage > topPage ? null:  `http://localhost:3000/people/?page=${numPage + 1}`,
      previous: numPage < 2 ? null: `http://localhost:3000/people/?page=${numPage - 1}`,
      results: await this.peopleRepository.find({
        skip: (numPage - 1) * 10,
        take: 10,
        relations: this.propsRelations,
        relationLoadStrategy: 'query', 
      })
      .then(array => {
        return array.map((person) => {
          let people: CreatePeopleDto = new CreatePeopleDto();
          for (let key in person) {
            people[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
          }
          return people;
        })
      })         // из связанных сущностей this.propsRelations выбираем только одно свойство Url
    }
    return peoplePag;
  }

  findOne(name: string): Promise<CreatePeopleDto> {
    return this.peopleRepository.findOne({ 
      relations: this.propsRelations,
      relationLoadStrategy: 'query',
      where: { name }
    })
    .then(person => {
        let people: CreatePeopleDto = new CreatePeopleDto();
        for (let key in person) {
          people[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
        }
        return people;
    })
    .then((result) => {
      if (result) {
        return result;
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }
    });
  }

  async remove(name: string): Promise<{ name: string; deleted: string; }> {
    const person = await this.peopleRepository.findOne({ 
      relations: ['images'],
      relationLoadStrategy: 'query',
      where: { name }
    });
    this.imagesService.deleteFiles(person.images.map((img) => img.url));       

    if (person) {
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

  streamImage(image: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), `files/${image}`));
    return new StreamableFile(file);
  }

  async uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    return await this.imagesService.uploadFileS3('people', file, fileUploadDto, People);
  }  

  async deleteFileS3(name: string, key: string) {
    return await this.imagesService.deleteFileS3('people', name, key);

    // const s3 = new S3();
    // const y = await s3.getObject({
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   Key: key
    // }).promise();
    // const x = await s3.deleteObject({
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   Key: key
    // }).promise();
    // return 'success';
  }
}