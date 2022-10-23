import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadDto } from 'src/images/dto/create-image.dto';
import { Repository } from 'typeorm';

import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planets } from './entities/planet.entity';
import { Films } from '../films/entities/film.entity';
import { People } from './../people/entities/people.entity';
import { ImagesService } from '../images/images.service';

@Injectable()
export class PlanetsService {
  private readonly propsRelations: string[];

  constructor(
    @InjectRepository(Planets)
    private readonly planetRepository: Repository<Planets>,

    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,

    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,

    private readonly imagesService: ImagesService    
  ) {
    this.propsRelations = ['films', 'residents', 'images'];
  }

  async create(createplanetsDto: CreatePlanetDto): Promise<Planets> {
    const resources = [this.filmsRepository,  this.peopleRepository];

    let planets = new Planets();
    
    for (let key in createplanetsDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      planets[key] = this.propsRelations.includes(key) ? [] : createplanetsDto[key];
    }
    await this.planetRepository.save(planets).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }); // обнуляем связи, что бы не было ошибки дублирования внешних ключей

    for (let i = 0; i < this.propsRelations.length - 1; i++) {
      createplanetsDto[this.propsRelations[i]]?.forEach(async (elem) => {        
        const person = await resources[i].findOneBy({ url: elem });
        if (person) {
          planets[this.propsRelations[i]].push(person);
        }        
      })
    }
    return this.planetRepository.save(planets).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(): Promise<CreatePlanetDto[]> {
    return this.planetRepository.find({ 
      relations: this.propsRelations,
      relationLoadStrategy: 'query'
    })
    .then(array => {
      return array.map((person) => {
        let planets: CreatePlanetDto = new CreatePlanetDto();
        for (let key in person) {
          planets[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
        }
        return planets;
      })
    })
  }

  async findOne(name: string): Promise<CreatePlanetDto> {
    return this.planetRepository.findOne({ 
      relations: this.propsRelations,
      relationLoadStrategy: 'query',
      where: { name }
    })
    .then(person => {
        let planets: CreatePlanetDto = new CreatePlanetDto();
        for (let key in person) {
          planets[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
        }
        return planets;
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
    const person = await this.planetRepository.findOne({ 
      relations: ['images'],
      relationLoadStrategy: 'query',
      where: { name }
    });
    this.imagesService.deleteFiles(person.images.map((img) => img.url));       

    if (person) {
      this.propsRelations.forEach((obj) => person[obj] = []);
      await this.planetRepository.save(person); // зануляем все связи ManyToMany и сохраняем, произойдет их удаление
    }

    return this.planetRepository.delete(name)
    .then((result) => {
      if (result.affected) {
        return {name, deleted: 'success'};
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }      
    })
    .catch((err) => err)
  }  


  async uploadFile(fileUploadDto: FileUploadDto): Promise<Planets> {
    return await this.imagesService.uploadFile('planets', fileUploadDto, Planets);
  }  

  async deleteImage(name: string, image?: string) {
    return await this.imagesService.deleteImage('planets', name, image);    
  }

  async uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    return await this.imagesService.uploadFileS3('planets', file, fileUploadDto, Planets);
  }  

  async deleteFileS3(name: string, key: string) {
    return await this.imagesService.deleteFileS3('planets', name, key);
  }
}